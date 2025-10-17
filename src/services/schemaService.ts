// src/services/schemaService.ts
import { supabase } from '../lib/supabase';

export interface SchemaInfo {
  organizationId: string;
  organizationName: string;
  schemaName: string;
  schemaExists: boolean;
}

export class SchemaService {
  /**
   * Get the organization-specific schema name
   */
  static getOrganizationSchemaName(organizationId: string): string {
    // Convert UUID to schema-safe name (replace hyphens with underscores)
    const safeId = organizationId.replace(/-/g, '_');
    return `edusoluce_org_${safeId}`;
  }

  /**
   * Create a new organization schema with all necessary tables and policies
   */
  static async createOrganizationSchema(organizationId: string): Promise<string> {
    const { data, error } = await supabase.rpc('create_organization_schema', {
      org_id: organizationId
    });

    if (error) {
      console.error('Failed to create organization schema:', error);
      throw new Error(`Failed to create organization schema: ${error.message}`);
    }

    return data;
  }

  /**
   * Migrate existing data to organization-specific schema
   */
  static async migrateOrganizationData(organizationId: string): Promise<void> {
    const { error } = await supabase.rpc('migrate_organization_data', {
      org_id: organizationId
    });

    if (error) {
      console.error('Failed to migrate organization data:', error);
      throw new Error(`Failed to migrate organization data: ${error.message}`);
    }
  }

  /**
   * Get the appropriate schema for a user based on their organization
   */
  static async getUserSchema(userId: string): Promise<string> {
    const { data, error } = await supabase.rpc('get_user_schema', {
      user_id: userId
    });

    if (error) {
      console.error('Failed to get user schema:', error);
      throw new Error(`Failed to get user schema: ${error.message}`);
    }

    return data;
  }

  /**
   * Check if schema differentiation is enabled
   */
  static async isSchemaDifferentiationEnabled(): Promise<boolean> {
    const { data, error } = await supabase.rpc('is_schema_differentiation_enabled');

    if (error) {
      console.error('Failed to check schema differentiation status:', error);
      return false;
    }

    return data;
  }

  /**
   * Get all organization schemas and their status
   */
  static async getOrganizationSchemas(): Promise<SchemaInfo[]> {
    const { data, error } = await supabase
      .from('organization_schemas')
      .select('*')
      .order('organization_name');
        
        if (error) {
      console.error('Failed to get organization schemas:', error);
      throw new Error(`Failed to get organization schemas: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Create a Supabase client with a specific schema
   */
  static createClientWithSchema(schemaName: string) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL and Anon Key are required');
    }

    return supabase.createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      db: {
        schema: schemaName
      }
    });
  }

  /**
   * Get schema statistics for monitoring
   */
  static async getSchemaStatistics(): Promise<{
    totalOrganizations: number;
    schemasCreated: number;
    schemasPending: number;
    lastMigration: string | null;
  }> {
    const schemas = await this.getOrganizationSchemas();
    
    const totalOrganizations = schemas.length;
    const schemasCreated = schemas.filter(s => s.schemaExists).length;
    const schemasPending = totalOrganizations - schemasCreated;
    
    // Get the most recent migration timestamp
    const { data: migrationData, error } = await supabase
      .from('audit_logs')
      .select('created_at')
      .eq('action', 'schema_migration')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const lastMigration = migrationData?.created_at || null;

    return {
      totalOrganizations,
      schemasCreated,
      schemasPending,
      lastMigration
    };
  }

  /**
   * Validate schema health
   */
  static async validateSchemaHealth(organizationId: string): Promise<{
    isValid: boolean;
    issues: string[];
    recommendations: string[];
  }> {
    const issues: string[] = [];
    const recommendations: string[] = [];

    try {
      // Check if schema exists
      const schemas = await this.getOrganizationSchemas();
      const orgSchema = schemas.find(s => s.organizationId === organizationId);

      if (!orgSchema) {
        issues.push('Organization schema not found');
        recommendations.push('Run createOrganizationSchema() to create the schema');
        return { isValid: false, issues, recommendations };
      }

      if (!orgSchema.schemaExists) {
        issues.push('Schema exists in metadata but not in database');
        recommendations.push('Recreate the schema using createOrganizationSchema()');
        return { isValid: false, issues, recommendations };
      }

      // Check if required tables exist
      const schemaName = this.getOrganizationSchemaName(organizationId);
      const client = this.createClientWithSchema(schemaName);

      const requiredTables = ['profiles', 'assessment_results', 'training_progress', 'data_subject_requests'];
      
      for (const table of requiredTables) {
        const { error } = await client.from(table).select('id').limit(1);
        if (error) {
          issues.push(`Table ${table} is not accessible`);
          recommendations.push(`Check RLS policies for table ${table}`);
        }
      }

      // Check RLS policies
      const { data: policies, error: policyError } = await supabase
        .rpc('get_table_policies', { schema_name: schemaName });

      if (policyError) {
        issues.push('Unable to verify RLS policies');
        recommendations.push('Check RLS policy configuration');
      } else if (!policies || policies.length === 0) {
        issues.push('No RLS policies found');
        recommendations.push('Create RLS policies for data security');
      }

      return {
        isValid: issues.length === 0,
        issues,
        recommendations
      };

    } catch (error) {
      issues.push(`Schema validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      recommendations.push('Check database connection and permissions');
      
      return { isValid: false, issues, recommendations };
    }
  }

  /**
   * Clean up orphaned schemas (schemas without corresponding organizations)
   */
  static async cleanupOrphanedSchemas(): Promise<{
    cleaned: string[];
    errors: string[];
  }> {
    const cleaned: string[] = [];
    const errors: string[] = [];

    try {
      // Get all schemas in the database
      const { data: allSchemas, error: schemaError } = await supabase
        .rpc('get_all_schemas');

      if (schemaError) {
        errors.push(`Failed to get schemas: ${schemaError.message}`);
        return { cleaned, errors };
      }

      // Get all organization schemas
      const organizationSchemas = await this.getOrganizationSchemas();
      const validSchemaNames = organizationSchemas.map(s => s.schemaName);

      // Find orphaned schemas
      const orphanedSchemas = allSchemas.filter((schema: string) => 
        schema.startsWith('edusoluce_org_') && !validSchemaNames.includes(schema)
      );

      // Clean up orphaned schemas
      for (const schemaName of orphanedSchemas) {
        try {
          const { error } = await supabase.rpc('drop_schema', { schema_name: schemaName });
          if (error) {
            errors.push(`Failed to drop schema ${schemaName}: ${error.message}`);
          } else {
            cleaned.push(schemaName);
          }
        } catch (error) {
          errors.push(`Error dropping schema ${schemaName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      return { cleaned, errors };

    } catch (error) {
      errors.push(`Cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { cleaned, errors };
    }
  }
}

export default SchemaService;
export { SchemaService };