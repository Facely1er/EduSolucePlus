#!/usr/bin/env node

/**
 * Test script to verify schema differentiation configuration
 * 
 * This script tests the schema differentiation setup without making any changes.
 * It verifies that the configuration is correct and the necessary functions are available.
 */

const { createClient } = require('@supabase/supabase-js');

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_SUPABASE_URL');
  console.error('   VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = SUPABASE_SERVICE_KEY ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY) : null;

class SchemaConfigTester {
  constructor() {
    this.results = {
      environment: false,
      connection: false,
      migrationFunctions: false,
      organizations: false,
      schemas: false
    };
  }

  async run() {
    console.log('🧪 Testing Schema Differentiation Configuration');
    console.log('=' .repeat(50));
    console.log('');

    try {
      await this.testEnvironment();
      await this.testConnection();
      await this.testMigrationFunctions();
      await this.testOrganizations();
      await this.testSchemas();
      
      this.printResults();
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      process.exit(1);
    }
  }

  async testEnvironment() {
    console.log('1️⃣ Testing environment configuration...');
    
    const requiredVars = [
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY',
      'VITE_SUPABASE_SCHEMA',
      'VITE_SUPABASE_ORGANIZATION_SCHEMA',
      'VITE_ENABLE_SCHEMA_DIFFERENTIATION'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      console.log(`   ❌ Missing environment variables: ${missing.join(', ')}`);
      return;
    }

    console.log('   ✅ All required environment variables are set');
    console.log(`   📊 Schema differentiation: ${process.env.VITE_ENABLE_SCHEMA_DIFFERENTIATION}`);
    console.log(`   📊 Default schema: ${process.env.VITE_SUPABASE_SCHEMA}`);
    console.log(`   📊 Organization schema: ${process.env.VITE_SUPABASE_ORGANIZATION_SCHEMA}`);
    
    this.results.environment = true;
  }

  async testConnection() {
    console.log('\n2️⃣ Testing Supabase connection...');
    
    try {
      const { data, error } = await supabase.from('organizations').select('count').limit(1);
      
      if (error) {
        console.log(`   ❌ Connection failed: ${error.message}`);
        return;
      }

      console.log('   ✅ Successfully connected to Supabase');
      this.results.connection = true;
      
    } catch (error) {
      console.log(`   ❌ Connection error: ${error.message}`);
    }
  }

  async testMigrationFunctions() {
    console.log('\n3️⃣ Testing migration functions...');
    
    if (!supabaseAdmin) {
      console.log('   ⚠️  Service role key not provided, skipping admin function tests');
      return;
    }

    try {
      const { data, error } = await supabaseAdmin.rpc('is_schema_differentiation_enabled');
      
      if (error) {
        console.log(`   ❌ Migration functions not available: ${error.message}`);
        console.log('   💡 Run: supabase db push');
        return;
      }

      console.log('   ✅ Migration functions are available');
      this.results.migrationFunctions = true;
      
    } catch (error) {
      console.log(`   ❌ Error testing migration functions: ${error.message}`);
    }
  }

  async testOrganizations() {
    console.log('\n4️⃣ Testing organizations...');
    
    try {
      const { data: organizations, error } = await supabase
        .from('organizations')
        .select('id, name, created_at')
        .limit(5);

      if (error) {
        console.log(`   ❌ Failed to fetch organizations: ${error.message}`);
        return;
      }

      if (organizations.length === 0) {
        console.log('   ⚠️  No organizations found');
        return;
      }

      console.log(`   ✅ Found ${organizations.length} organizations`);
      organizations.forEach(org => {
        console.log(`      - ${org.name} (${org.id})`);
      });
      
      this.results.organizations = true;
      
    } catch (error) {
      console.log(`   ❌ Error fetching organizations: ${error.message}`);
    }
  }

  async testSchemas() {
    console.log('\n5️⃣ Testing organization schemas...');
    
    if (!supabaseAdmin) {
      console.log('   ⚠️  Service role key not provided, skipping schema tests');
      return;
    }

    try {
      const { data: schemas, error } = await supabaseAdmin
        .from('organization_schemas')
        .select('*');

      if (error) {
        console.log(`   ❌ Failed to fetch schema information: ${error.message}`);
        return;
      }

      if (schemas.length === 0) {
        console.log('   ⚠️  No organization schemas found');
        console.log('   💡 Run migration: npm run migrate:schemas');
        return;
      }

      console.log(`   ✅ Found ${schemas.length} organization schemas`);
      schemas.forEach(schema => {
        const status = schema.schema_exists ? '✅' : '❌';
        console.log(`      ${status} ${schema.organization_name}: ${schema.schema_name}`);
      });
      
      this.results.schemas = true;
      
    } catch (error) {
      console.log(`   ❌ Error testing schemas: ${error.message}`);
    }
  }

  printResults() {
    console.log('\n' + '=' .repeat(50));
    console.log('📊 Test Results Summary');
    console.log('=' .repeat(50));
    
    const tests = [
      { name: 'Environment Configuration', result: this.results.environment },
      { name: 'Supabase Connection', result: this.results.connection },
      { name: 'Migration Functions', result: this.results.migrationFunctions },
      { name: 'Organizations', result: this.results.organizations },
      { name: 'Organization Schemas', result: this.results.schemas }
    ];

    tests.forEach(test => {
      const status = test.result ? '✅' : '❌';
      console.log(`${status} ${test.name}`);
    });

    const passed = tests.filter(t => t.result).length;
    const total = tests.length;

    console.log(`\n📈 Overall: ${passed}/${total} tests passed`);

    if (passed === total) {
      console.log('\n🎉 All tests passed! Your schema differentiation setup is ready.');
    } else {
      console.log('\n⚠️  Some tests failed. Please address the issues above.');
      
      if (!this.results.migrationFunctions) {
        console.log('\n💡 To fix migration functions:');
        console.log('   supabase db push');
      }
      
      if (!this.results.schemas) {
        console.log('\n💡 To create organization schemas:');
        console.log('   npm run migrate:schemas');
      }
    }
  }
}

// Run the test
if (require.main === module) {
  const tester = new SchemaConfigTester();
  tester.run().catch(error => {
    console.error('❌ Test script failed:', error.message);
    process.exit(1);
  });
}

module.exports = { SchemaConfigTester };