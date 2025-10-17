# EduSoluce Schema Differentiation Configuration

## Environment Variables for Schema Isolation

Add these environment variables to your Vercel deployment:

```env
# Core Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Schema Differentiation Settings
VITE_ENABLE_SCHEMA_DIFFERENTIATION=true
VITE_SUPABASE_SCHEMA=edusoluce_public
VITE_SUPABASE_ORGANIZATION_SCHEMA=edusoluce_org

# Application Configuration
VITE_APP_URL=https://your-domain.vercel.app
VITE_ENVIRONMENT=production

# Optional Configuration
VITE_SUPPORT_EMAIL=support@edusoluce-africa.com
VITE_CONTACT_PHONE=+225 XX XX XX XX XX
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=false
VITE_ENABLE_OFFLINE=true
VITE_MAX_RETRIES=3
VITE_REQUEST_TIMEOUT=30000
```

## Schema Structure

### 1. **Public Schema** (`edusoluce_public`)
- Core application tables
- Shared resources
- System configuration
- User authentication

### 2. **Organization Schemas** (`edusoluce_org_[org_id]`)
- Organization-specific data
- User profiles
- Assessment results
- Training progress
- Privacy records

### 3. **Schema Naming Convention**
- **Public**: `edusoluce_public`
- **Organizations**: `edusoluce_org_[uuid]` (e.g., `edusoluce_org_123e4567_e89b_12d3_a456_426614174000`)

## Database Migration Steps

### Step 1: Run Core Migrations
```sql
-- Run these migrations in order:
-- 1. supabase/migrations/20250115000000_setup_differentiated_schemas.sql
-- 2. supabase/migrations/20250115000001_create_missing_tables.sql
-- 3. supabase/migrations/20250115000002_create_notifications_table.sql
```

### Step 2: Create Organization Schemas
```sql
-- For each organization, run:
SELECT create_organization_schema('your-organization-uuid');
```

### Step 3: Migrate Existing Data
```sql
-- Migrate data to organization-specific schemas:
SELECT migrate_organization_data('your-organization-uuid');
```

## Schema Isolation Benefits

### ✅ **Data Isolation**
- Each organization's data is completely separate
- No cross-organization data leakage
- Independent schema evolution

### ✅ **Security**
- Row Level Security (RLS) policies per schema
- Organization-specific access controls
- Audit logging per organization

### ✅ **Performance**
- Smaller table sizes per organization
- Optimized indexes per schema
- Reduced query complexity

### ✅ **Scalability**
- Easy to add new organizations
- Independent backup/restore per organization
- Horizontal scaling potential

## Implementation Guide

### 1. **Update Environment Configuration**
```typescript
// src/config/environment.ts
const schemaConfig = {
  default: import.meta.env.VITE_SUPABASE_SCHEMA || 'edusoluce_public',
  organization: import.meta.env.VITE_SUPABASE_ORGANIZATION_SCHEMA || 'edusoluce_org',
  differentiationEnabled: import.meta.env.VITE_ENABLE_SCHEMA_DIFFERENTIATION === 'true'
};
```

### 2. **Update Supabase Client**
```typescript
// src/lib/supabase.ts
export const schemaManager = {
  default: 'edusoluce_public',
  organization: 'edusoluce_org',
  enabled: true,
  
  getSchema(context: 'default' | 'organization' | 'user' = 'default'): string {
    if (!this.enabled) {
      return this.default;
    }
    
    switch (context) {
      case 'organization':
        return this.organization;
      case 'user':
        return `${this.organization}.user_data`;
      default:
        return this.default;
    }
  }
};
```

### 3. **Update Service Layer**
```typescript
// src/services/schemaService.ts
export class SchemaService {
  static getOrganizationSchema(organizationId: string): string {
    return `edusoluce_org_${organizationId.replace(/-/g, '_')}`;
  }
  
  static async createOrganizationSchema(organizationId: string): Promise<string> {
    const { data, error } = await supabase.rpc('create_organization_schema', {
      org_id: organizationId
    });
    
    if (error) throw error;
    return data;
  }
}
```

## Testing Schema Isolation

### 1. **Verify Schema Creation**
```sql
-- Check if schemas exist:
SELECT * FROM organization_schemas;
```

### 2. **Test Data Isolation**
```sql
-- Verify data is isolated:
SELECT COUNT(*) FROM edusoluce_org_[org_id].profiles;
SELECT COUNT(*) FROM edusoluce_org_[other_org_id].profiles;
```

### 3. **Test RLS Policies**
```sql
-- Verify RLS is working:
SET ROLE authenticated;
SELECT * FROM edusoluce_org_[org_id].profiles;
-- Should only return data for the authenticated user's organization
```

## Migration Script Usage

### Dry Run (Recommended First)
```bash
npm run migrate:schemas:dry-run
```

### Migrate All Organizations
```bash
npm run migrate:schemas
```

### Migrate Specific Organization
```bash
npm run migrate:schemas -- --org-id 123e4567-e89b-12d3-a456-426614174000
```

## Monitoring & Maintenance

### 1. **Schema Health Check**
```sql
-- Check schema status:
SELECT 
  organization_id,
  organization_name,
  schema_name,
  schema_exists,
  CASE 
    WHEN schema_exists THEN 'Healthy'
    ELSE 'Needs Attention'
  END as status
FROM organization_schemas;
```

### 2. **Performance Monitoring**
```sql
-- Monitor table sizes:
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname LIKE 'edusoluce_org_%'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### 3. **Backup Strategy**
- **Public Schema**: Daily backups
- **Organization Schemas**: Weekly backups per organization
- **Critical Data**: Real-time replication

## Troubleshooting

### Common Issues:

1. **Schema Not Found**
   - Verify migration was run
   - Check organization ID format
   - Ensure RLS policies are correct

2. **Permission Denied**
   - Verify user has access to organization
   - Check RLS policies
   - Ensure proper authentication

3. **Migration Failures**
   - Check for data conflicts
   - Verify foreign key constraints
   - Review error logs

## Security Considerations

### ✅ **Implemented Security**
- Row Level Security (RLS) on all tables
- Organization-specific access controls
- Audit logging for all operations
- Encrypted connections (TLS)

### 🔒 **Additional Security**
- Regular security audits
- Schema access monitoring
- Data encryption at rest
- Backup encryption

---

*This configuration ensures complete data isolation between organizations while maintaining optimal performance and security.*
