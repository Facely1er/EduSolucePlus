// src/services/schemaService.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase, schemaManager } from '../lib/supabase';
import { environment } from '../config/environment';

export interface SchemaContext {
  organizationId?: string;
  userId?: string;
  context: 'default' | 'organization' | 'user';
}

export class SchemaService {
  private static instance: SchemaService;
  private clients: Map<string, SupabaseClient> = new Map();

  private constructor() {}

  static getInstance(): SchemaService {
    if (!SchemaService.instance) {
      SchemaService.instance = new SchemaService();
    }
    return SchemaService.instance;
  }

  /**
   * Get the appropriate Supabase client for the given context
   */
  getClient(context: SchemaContext): SupabaseClient {
    if (!environment.features.enableSchemaDifferentiation) {
      return supabase;
    }

    const schema = this.determineSchema(context);
    const clientKey = `${schema}_${context.organizationId || 'default'}`;

    if (!this.clients.has(clientKey)) {
      const client = schemaManager.createClientWithSchema(schema);
      this.clients.set(clientKey, client);
    }

    return this.clients.get(clientKey)!;
  }

  /**
   * Determine the appropriate schema based on context
   */
  private determineSchema(context: SchemaContext): string {
    if (!environment.features.enableSchemaDifferentiation) {
      return environment.schema.default;
    }

    switch (context.context) {
      case 'organization':
        return context.organizationId 
          ? `${environment.schema.organization}_${context.organizationId}`
          : environment.schema.organization;
      case 'user':
        return context.organizationId && context.userId
          ? `${environment.schema.organization}_${context.organizationId}.user_${context.userId}`
          : environment.schema.default;
      default:
        return environment.schema.default;
    }
  }

  /**
   * Execute a query with the appropriate schema context
   */
  async executeQuery<T>(
    context: SchemaContext,
    queryFn: (client: SupabaseClient) => Promise<T>
  ): Promise<T> {
    const client = this.getClient(context);
    return await queryFn(client);
  }

  /**
   * Get organization-specific data
   */
  async getOrganizationData<T>(
    organizationId: string,
    tableName: string,
    query?: any
  ): Promise<T> {
    return this.executeQuery(
      { organizationId, context: 'organization' },
      async (client) => {
        let queryBuilder = client.from(tableName);
        
        if (query) {
          queryBuilder = query(queryBuilder);
        }
        
        const { data, error } = await queryBuilder;
        
        if (error) {
          throw new Error(`Failed to fetch organization data: ${error.message}`);
        }
        
        return data as T;
      }
    );
  }

  /**
   * Get user-specific data within an organization
   */
  async getUserData<T>(
    organizationId: string,
    userId: string,
    tableName: string,
    query?: any
  ): Promise<T> {
    return this.executeQuery(
      { organizationId, userId, context: 'user' },
      async (client) => {
        let queryBuilder = client.from(tableName);
        
        if (query) {
          queryBuilder = query(queryBuilder);
        }
        
        const { data, error } = await queryBuilder;
        
        if (error) {
          throw new Error(`Failed to fetch user data: ${error.message}`);
        }
        
        return data as T;
      }
    );
  }

  /**
   * Clear cached clients (useful for testing or when switching contexts)
   */
  clearCache(): void {
    this.clients.clear();
  }

  /**
   * Get available schemas for the current configuration
   */
  getAvailableSchemas(): string[] {
    return [
      environment.schema.default,
      environment.schema.organization
    ];
  }

  /**
   * Check if schema differentiation is enabled
   */
  isSchemaDifferentiationEnabled(): boolean {
    return environment.features.enableSchemaDifferentiation;
  }
}

// Export singleton instance
export const schemaService = SchemaService.getInstance();