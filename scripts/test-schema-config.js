#!/usr/bin/env node

/**
 * Schema Isolation Test Script
 * 
 * This script tests the schema differentiation and isolation features
 * to ensure that organizations cannot access each other's data.
 * 
 * Usage:
 *   node scripts/test-schema-config.js [options]
 * 
 * Options:
 *   --test-isolation    Test data isolation between organizations
 *   --test-rls          Test Row Level Security policies
 *   --test-performance  Test schema performance
 *   --all               Run all tests
 *   --help              Show this help message
 */

const { createClient } = require('@supabase/supabase-js');

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

class SchemaTester {
  constructor() {
    this.testResults = [];
  }

  async runAllTests() {
    console.log('🧪 Starting Schema Isolation Tests...');
    console.log('');

    try {
      await this.testSchemaDifferentiation();
      await this.testDataIsolation();
      await this.testRLSPolicies();
      await this.testPerformance();
      await this.testSchemaHealth();

      this.printResults();

    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
      process.exit(1);
    }
  }

  async testSchemaDifferentiation() {
    console.log('🔍 Testing Schema Differentiation...');

    try {
      // Test 1: Check if differentiation is enabled
      const { data: isEnabled, error } = await supabase.rpc('is_schema_differentiation_enabled');
      
      if (error) {
        this.addResult('Schema Differentiation', false, `Function not available: ${error.message}`);
        return;
      }

      if (!isEnabled) {
        this.addResult('Schema Differentiation', false, 'Schema differentiation is not enabled');
        return;
      }

      // Test 2: Check if organization schemas exist
      const { data: schemas, error: schemaError } = await supabase
        .from('organization_schemas')
        .select('*');

      if (schemaError) {
        this.addResult('Schema Differentiation', false, `Failed to get schemas: ${schemaError.message}`);
        return;
      }

      if (!schemas || schemas.length === 0) {
        this.addResult('Schema Differentiation', false, 'No organization schemas found');
        return;
      }

      const existingSchemas = schemas.filter(s => s.schema_exists);
      this.addResult('Schema Differentiation', true, `Found ${existingSchemas.length}/${schemas.length} organization schemas`);

    } catch (error) {
      this.addResult('Schema Differentiation', false, `Test failed: ${error.message}`);
    }
  }

  async testDataIsolation() {
    console.log('🔒 Testing Data Isolation...');

    try {
      // Get all organizations
      const { data: organizations, error: orgError } = await supabase
        .from('organizations')
        .select('id, name')
        .limit(2);

      if (orgError || !organizations || organizations.length < 2) {
        this.addResult('Data Isolation', false, 'Need at least 2 organizations to test isolation');
        return;
      }

      const [org1, org2] = organizations;
      
      // Test: Try to access org1 data from org2 context
      const schema1 = `edusoluce_org_${org1.id.replace(/-/g, '_')}`;
      const schema2 = `edusoluce_org_${org2.id.replace(/-/g, '_')}`;

      // Create clients for each schema
      const client1 = supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        db: { schema: schema1 }
      });

      const client2 = supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
        db: { schema: schema2 }
      });

      // Test data isolation
      const { data: org1Data, error: org1Error } = await client1.from('profiles').select('*');
      const { data: org2Data, error: org2Error } = await client2.from('profiles').select('*');

      if (org1Error || org2Error) {
        this.addResult('Data Isolation', false, `Schema access error: ${org1Error?.message || org2Error?.message}`);
        return;
      }

      // Check if data is properly isolated
      const org1Ids = org1Data?.map(p => p.id) || [];
      const org2Ids = org2Data?.map(p => p.id) || [];
      
      const overlap = org1Ids.filter(id => org2Ids.includes(id));
      
      if (overlap.length > 0) {
        this.addResult('Data Isolation', false, `Data overlap detected: ${overlap.length} shared records`);
      } else {
        this.addResult('Data Isolation', true, `No data overlap between ${org1.name} and ${org2.name}`);
      }

    } catch (error) {
      this.addResult('Data Isolation', false, `Test failed: ${error.message}`);
    }
  }

  async testRLSPolicies() {
    console.log('🛡️ Testing RLS Policies...');

    try {
      // Get organization schemas
      const { data: schemas, error: schemaError } = await supabase
        .from('organization_schemas')
        .select('*')
        .limit(1);

      if (schemaError || !schemas || schemas.length === 0) {
        this.addResult('RLS Policies', false, 'No schemas available for RLS testing');
        return;
      }

      const schema = schemas[0];
      const schemaName = schema.schema_name;

      // Test RLS policies by checking table policies
      const { data: policies, error: policyError } = await supabase
        .rpc('get_table_policies', { schema_name: schemaName });

      if (policyError) {
        this.addResult('RLS Policies', false, `Failed to get policies: ${policyError.message}`);
        return;
      }

      if (!policies || policies.length === 0) {
        this.addResult('RLS Policies', false, 'No RLS policies found');
        return;
      }

      // Check for required policies
      const requiredTables = ['profiles', 'assessment_results', 'training_progress'];
      const missingPolicies = [];

      for (const table of requiredTables) {
        const tablePolicies = policies.filter(p => p.table_name === table);
        if (tablePolicies.length === 0) {
          missingPolicies.push(table);
        }
      }

      if (missingPolicies.length > 0) {
        this.addResult('RLS Policies', false, `Missing policies for tables: ${missingPolicies.join(', ')}`);
      } else {
        this.addResult('RLS Policies', true, `Found ${policies.length} RLS policies across all tables`);
      }

    } catch (error) {
      this.addResult('RLS Policies', false, `Test failed: ${error.message}`);
    }
  }

  async testPerformance() {
    console.log('⚡ Testing Schema Performance...');

    try {
      const startTime = Date.now();

      // Test 1: Schema listing performance
      const { data: schemas, error: schemaError } = await supabase
        .from('organization_schemas')
        .select('*');

      const schemaTime = Date.now() - startTime;

      if (schemaError) {
        this.addResult('Schema Performance', false, `Schema listing failed: ${schemaError.message}`);
        return;
      }

      // Test 2: Cross-schema query performance
      const queryStartTime = Date.now();
      
      const promises = schemas.slice(0, 3).map(async (schema) => {
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
          db: { schema: schema.schema_name }
        });
        return client.from('profiles').select('count').limit(1);
      });

      await Promise.all(promises);
      const queryTime = Date.now() - queryStartTime;

      // Performance thresholds
      const schemaThreshold = 1000; // 1 second
      const queryThreshold = 2000; // 2 seconds

      let performanceIssues = [];
      
      if (schemaTime > schemaThreshold) {
        performanceIssues.push(`Schema listing slow: ${schemaTime}ms`);
      }
      
      if (queryTime > queryThreshold) {
        performanceIssues.push(`Cross-schema queries slow: ${queryTime}ms`);
      }

      if (performanceIssues.length > 0) {
        this.addResult('Schema Performance', false, performanceIssues.join(', '));
      } else {
        this.addResult('Schema Performance', true, `Schema listing: ${schemaTime}ms, Queries: ${queryTime}ms`);
      }

    } catch (error) {
      this.addResult('Schema Performance', false, `Test failed: ${error.message}`);
    }
  }

  async testSchemaHealth() {
    console.log('🏥 Testing Schema Health...');

    try {
      // Get schema statistics
      const { data: stats, error: statsError } = await supabase
        .rpc('get_schema_statistics');

      if (statsError) {
        this.addResult('Schema Health', false, `Failed to get statistics: ${statsError.message}`);
        return;
      }

      // Check for health issues
      const issues = [];
      
      if (stats.total_organizations === 0) {
        issues.push('No organizations found');
      }
      
      if (stats.schemas_created === 0) {
        issues.push('No schemas created');
      }
      
      if (stats.schemas_pending > 0) {
        issues.push(`${stats.schemas_pending} schemas pending creation`);
      }

      if (issues.length > 0) {
        this.addResult('Schema Health', false, issues.join(', '));
      } else {
        this.addResult('Schema Health', true, `Healthy: ${stats.schemas_created}/${stats.total_organizations} schemas created`);
      }

    } catch (error) {
      this.addResult('Schema Health', false, `Test failed: ${error.message}`);
    }
  }

  addResult(testName, passed, message) {
    this.testResults.push({
      test: testName,
      passed,
      message,
      timestamp: new Date().toISOString()
    });
  }

  printResults() {
    console.log('');
    console.log('📊 Test Results Summary:');
    console.log('');

    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;

    this.testResults.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.message}`);
    });

    console.log('');
    console.log(`📈 Overall: ${passed}/${total} tests passed`);

    if (passed === total) {
      console.log('🎉 All tests passed! Schema differentiation is working correctly.');
    } else {
      console.log('⚠️  Some tests failed. Please review the issues above.');
    }

    console.log('');
    console.log('Next steps:');
    console.log('1. Fix any failing tests');
    console.log('2. Run migration script if needed');
    console.log('3. Deploy with proper environment variables');
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    testIsolation: args.includes('--test-isolation'),
    testRLS: args.includes('--test-rls'),
    testPerformance: args.includes('--test-performance'),
    all: args.includes('--all') || (!args.includes('--help') && args.length === 0),
    help: args.includes('--help')
  };

  return options;
}

// Main execution
async function main() {
  const options = parseArgs();

  if (options.help) {
    console.log(`
Schema Isolation Test Script

Usage:
  node scripts/test-schema-config.js [options]

Options:
  --test-isolation    Test data isolation between organizations
  --test-rls          Test Row Level Security policies
  --test-performance  Test schema performance
  --all               Run all tests (default)
  --help              Show this help message

Environment Variables:
  VITE_SUPABASE_URL              Your Supabase project URL
  SUPABASE_SERVICE_ROLE_KEY      Your Supabase service role key

Examples:
  # Run all tests
  node scripts/test-schema-config.js --all

  # Test only data isolation
  node scripts/test-schema-config.js --test-isolation

  # Test RLS policies
  node scripts/test-schema-config.js --test-rls
`);
    process.exit(0);
  }

  const tester = new SchemaTester();
  await tester.runAllTests();
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Test script failed:', error.message);
    process.exit(1);
  });
}

module.exports = { SchemaTester };