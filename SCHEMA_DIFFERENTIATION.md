# Schema Differentiation Setup

This document explains how to set up and use differentiated schemas in your Supabase project for better organization isolation and data management.

## Overview

Schema differentiation allows you to:
- Isolate data between different organizations
- Improve security through better access controls
- Scale your application with multiple tenants
- Maintain data integrity across different contexts

## Prerequisites

- Existing Supabase project with data
- Supabase CLI installed
- Node.js and npm installed
- Service role key for your Supabase project

## Setup Instructions

### 1. Environment Configuration

First, update your `.env` file with the necessary configuration:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Schema Configuration
VITE_SUPABASE_SCHEMA=public
VITE_SUPABASE_ORGANIZATION_SCHEMA=organization_specific
VITE_ENABLE_SCHEMA_DIFFERENTIATION=true

# Service Role Key (for migration)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Run Database Migration

Apply the schema differentiation migration to your Supabase project:

```bash
# Using Supabase CLI
supabase db push

# Or manually run the migration SQL
psql -h your-db-host -U postgres -d postgres -f supabase/migrations/20250115000000_setup_differentiated_schemas.sql
```

### 3. Migrate Existing Data

Use the provided migration script to migrate your existing data:

```bash
# Dry run to see what would be migrated
node scripts/migrate-to-differentiated-schemas.js --dry-run

# Migrate all organizations
node scripts/migrate-to-differentiated-schemas.js --all

# Migrate specific organization
node scripts/migrate-to-differentiated-schemas.js --org-id <organization-id>
```

### 4. Update Application Code

The application code has been updated to support schema differentiation. Key changes include:

- **Schema Service**: `src/services/schemaService.ts` - Manages schema-specific operations
- **Updated Hooks**: `src/hooks/useSupabase.ts` - Added organization-specific data hooks
- **Environment Config**: `src/config/environment.ts` - Added schema configuration
- **Supabase Client**: `src/lib/supabase.ts` - Enhanced with schema management

## Usage

### Basic Usage

```typescript
import { schemaService } from '../services/schemaService';
import { useOrganizationData } from '../hooks/useSupabase';

// Get organization-specific data
const { getOrganizationData, getUserData } = useOrganizationData(organizationId);

// Fetch data from organization schema
const profiles = await getOrganizationData('profiles', (query) => 
  query.select('*').eq('role', 'administrator')
);

// Fetch user-specific data
const userProgress = await getUserData(userId, 'training_progress', (query) =>
  query.select('*').eq('status', 'completed')
);
```

### Advanced Usage

```typescript
import { schemaService } from '../services/schemaService';

// Create a client with specific schema
const orgClient = schemaService.createClientWithSchema('org_123e4567_e89b_12d3_a456_426614174000');

// Execute queries with context
const data = await schemaService.executeQuery(
  { organizationId: 'org-id', context: 'organization' },
  async (client) => {
    return await client.from('profiles').select('*');
  }
);
```

## Schema Structure

Each organization gets its own schema with the following structure:

```
org_<organization_id>/
├── profiles
├── assessment_results
├── training_progress
├── data_subject_requests
└── (other organization-specific tables)
```

## Security

The migration sets up Row Level Security (RLS) policies to ensure:
- Users can only access data from their organization
- Data is properly isolated between organizations
- Administrative access is controlled by role and organization

## Monitoring

Use the `organization_schemas` view to monitor your schemas:

```sql
SELECT * FROM organization_schemas;
```

This view shows:
- Organization ID and name
- Schema name
- Whether the schema exists

## Troubleshooting

### Common Issues

1. **Migration fails**: Ensure you have the service role key and proper permissions
2. **Data not appearing**: Check that the organization schema was created successfully
3. **Permission errors**: Verify RLS policies are correctly applied

### Debugging

Enable debug logging in development:

```typescript
// In your environment configuration
VITE_DEBUG_SCHEMA_DIFFERENTIATION=true
```

### Rollback

If you need to rollback the migration:

1. Disable schema differentiation: `VITE_ENABLE_SCHEMA_DIFFERENTIATION=false`
2. Your application will fall back to using the public schema
3. Data in organization schemas will remain but won't be accessed

## Best Practices

1. **Test thoroughly**: Always test with a copy of your production data first
2. **Monitor performance**: Schema differentiation may impact query performance
3. **Backup data**: Always backup your data before running migrations
4. **Gradual rollout**: Consider migrating organizations one at a time

## Support

For issues or questions:
1. Check the migration logs for error details
2. Verify your Supabase project configuration
3. Ensure all environment variables are correctly set
4. Review the RLS policies in your organization schemas

## Future Enhancements

- Automatic schema creation for new organizations
- Cross-organization data sharing capabilities
- Advanced caching strategies for schema-specific data
- Monitoring and analytics for schema usage