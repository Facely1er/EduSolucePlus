#!/usr/bin/env node

/**
 * Migration script to set up differentiated schemas for existing Supabase project
 * 
 * This script helps migrate an existing Supabase project to use differentiated schemas
 * for better organization isolation and data management.
 * 
 * Usage:
 *   node scripts/migrate-to-differentiated-schemas.js [options]
 * 
 * Options:
 *   --dry-run    Show what would be migrated without making changes
 *   --org-id     Migrate specific organization (optional)
 *   --all        Migrate all organizations (default)
 *   --help       Show this help message
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to add this to your .env

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  console.error('');
  console.error('Please add these to your .env file and try again.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

class SchemaMigration {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.specificOrgId = options.orgId || null;
    this.migrateAll = options.all || false;
  }

  async run() {
    console.log('🚀 Starting schema differentiation migration...');
    console.log(`Mode: ${this.dryRun ? 'DRY RUN' : 'LIVE MIGRATION'}`);
    console.log('');

    try {
      // Step 1: Check if migration functions exist
      await this.checkMigrationFunctions();

      // Step 2: Get organizations to migrate
      const organizations = await this.getOrganizations();
      console.log(`📊 Found ${organizations.length} organizations to migrate`);
      console.log('');

      // Step 3: Migrate each organization
      for (const org of organizations) {
        await this.migrateOrganization(org);
      }

      // Step 4: Verify migration
      await this.verifyMigration();

      console.log('');
      console.log('✅ Migration completed successfully!');
      console.log('');
      console.log('Next steps:');
      console.log('1. Update your .env file with the correct Supabase credentials');
      console.log('2. Set VITE_ENABLE_SCHEMA_DIFFERENTIATION=true');
      console.log('3. Test your application with the new schema configuration');
      console.log('4. Consider removing old data from the public schema after verification');

    } catch (error) {
      console.error('❌ Migration failed:', error.message);
      process.exit(1);
    }
  }

  async checkMigrationFunctions() {
    console.log('🔍 Checking migration functions...');
    
    const { data, error } = await supabase.rpc('is_schema_differentiation_enabled');
    
    if (error) {
      console.log('⚠️  Migration functions not found. Please run the migration SQL first.');
      console.log('   Run: supabase db push');
      throw new Error('Migration functions not available');
    }
    
    console.log('✅ Migration functions are available');
  }

  async getOrganizations() {
    const { data: organizations, error } = await supabase
      .from('organizations')
      .select('id, name, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch organizations: ${error.message}`);
    }

    if (this.specificOrgId) {
      const org = organizations.find(o => o.id === this.specificOrgId);
      if (!org) {
        throw new Error(`Organization with ID ${this.specificOrgId} not found`);
      }
      return [org];
    }

    return organizations;
  }

  async migrateOrganization(organization) {
    console.log(`🏢 Migrating organization: ${organization.name} (${organization.id})`);
    
    if (this.dryRun) {
      console.log(`   [DRY RUN] Would migrate organization ${organization.id}`);
      return;
    }

    try {
      // Create organization schema
      const { data: schemaName, error: createError } = await supabase.rpc(
        'create_organization_schema',
        { org_id: organization.id }
      );

      if (createError) {
        throw new Error(`Failed to create schema: ${createError.message}`);
      }

      console.log(`   ✅ Created schema: ${schemaName}`);

      // Migrate data
      const { error: migrateError } = await supabase.rpc(
        'migrate_organization_data',
        { org_id: organization.id }
      );

      if (migrateError) {
        throw new Error(`Failed to migrate data: ${migrateError.message}`);
      }

      console.log(`   ✅ Migrated data to ${schemaName}`);

    } catch (error) {
      console.error(`   ❌ Failed to migrate organization ${organization.name}:`, error.message);
      throw error;
    }
  }

  async verifyMigration() {
    console.log('🔍 Verifying migration...');

    const { data: schemas, error } = await supabase
      .from('organization_schemas')
      .select('*');

    if (error) {
      throw new Error(`Failed to verify migration: ${error.message}`);
    }

    console.log('📋 Organization schemas:');
    schemas.forEach(schema => {
      const status = schema.schema_exists ? '✅' : '❌';
      console.log(`   ${status} ${schema.organization_name}: ${schema.schema_name}`);
    });

    const successCount = schemas.filter(s => s.schema_exists).length;
    console.log(`\n📊 Migration summary: ${successCount}/${schemas.length} schemas created successfully`);
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run'),
    all: args.includes('--all') || (!args.includes('--org-id') && !args.includes('--help')),
    help: args.includes('--help')
  };

  const orgIdIndex = args.indexOf('--org-id');
  if (orgIdIndex !== -1 && args[orgIdIndex + 1]) {
    options.orgId = args[orgIdIndex + 1];
  }

  return options;
}

// Main execution
async function main() {
  const options = parseArgs();

  if (options.help) {
    console.log(`
Schema Differentiation Migration Script

Usage:
  node scripts/migrate-to-differentiated-schemas.js [options]

Options:
  --dry-run              Show what would be migrated without making changes
  --org-id <uuid>        Migrate specific organization by ID
  --all                  Migrate all organizations (default)
  --help                 Show this help message

Environment Variables:
  VITE_SUPABASE_URL              Your Supabase project URL
  SUPABASE_SERVICE_ROLE_KEY      Your Supabase service role key

Examples:
  # Dry run to see what would be migrated
  node scripts/migrate-to-differentiated-schemas.js --dry-run

  # Migrate all organizations
  node scripts/migrate-to-differentiated-schemas.js --all

  # Migrate specific organization
  node scripts/migrate-to-differentiated-schemas.js --org-id 123e4567-e89b-12d3-a456-426614174000
`);
    process.exit(0);
  }

  const migration = new SchemaMigration(options);
  await migration.run();
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  });
}

module.exports = { SchemaMigration };