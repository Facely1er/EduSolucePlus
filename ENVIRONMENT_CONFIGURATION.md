# EduSoluce Environment Configuration

## Production Environment Variables for Vercel

Add these environment variables to your Vercel project settings:

```env
# Core Supabase Configuration
VITE_SUPABASE_URL=https://snrpdosiuwmdaegxkqux.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucnBkb3NpdXdtZGFlZ3hrcXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTA5MTYsImV4cCI6MjA3NDc4NjkxNn0.tl_ipfmxSwMNLBQ-QeqQPyp_w6xvocTtXqaFGHHFwe0

# Schema Differentiation Settings
VITE_ENABLE_SCHEMA_DIFFERENTIATION=true
VITE_SUPABASE_SCHEMA=edusoluce_public
VITE_SUPABASE_ORGANIZATION_SCHEMA=edusoluce_org

# Application Configuration
VITE_APP_URL=https://edusoluce-africa.vercel.app
VITE_ENVIRONMENT=production

# African Market Configuration
VITE_APP_LOCALE=fr-CI
VITE_APP_TIMEZONE=Africa/Abidjan
VITE_APP_CURRENCY=XOF
VITE_APP_REGION=africa

# Contact Information
VITE_SUPPORT_EMAIL=support@edusoluce-africa.com
VITE_CONTACT_PHONE=+225 XX XX XX XX XX

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=false
VITE_ENABLE_OFFLINE=true
VITE_MAX_RETRIES=3
VITE_REQUEST_TIMEOUT=30000

# Regulatory Configuration
VITE_ENABLE_RGPD_MODE=true
VITE_ENABLE_ARTCI_INTEGRATION=true
VITE_ARTCI_API_URL=https://www.artci.ci/api

# Backend Configuration
VITE_BACKEND_URL=https://api.edusoluce-africa.com
VITE_API_VERSION=v1
```

## Development Environment (.env.local)

Create a `.env.local` file for local development:

```env
# Core Supabase Configuration
VITE_SUPABASE_URL=https://snrpdosiuwmdaegxkqux.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucnBkb3NpdXdtZGFlZ3hrcXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTA5MTYsImV4cCI6MjA3NDc4NjkxNn0.tl_ipfmxSwMNLBQ-QeqQPyp_w6xvocTtXqaFGHHFwe0

# Schema Differentiation Settings
VITE_ENABLE_SCHEMA_DIFFERENTIATION=true
VITE_SUPABASE_SCHEMA=edusoluce_public
VITE_SUPABASE_ORGANIZATION_SCHEMA=edusoluce_org

# Application Configuration
VITE_APP_URL=http://localhost:4173
VITE_ENVIRONMENT=development

# African Market Configuration
VITE_APP_LOCALE=fr-CI
VITE_APP_TIMEZONE=Africa/Abidjan
VITE_APP_CURRENCY=XOF
VITE_APP_REGION=africa

# Contact Information
VITE_SUPPORT_EMAIL=support@edusoluce-africa.com
VITE_CONTACT_PHONE=+225 XX XX XX XX XX

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_SENTRY=false
VITE_ENABLE_OFFLINE=true
VITE_MAX_RETRIES=3
VITE_REQUEST_TIMEOUT=30000

# Regulatory Configuration
VITE_ENABLE_RGPD_MODE=true
VITE_ENABLE_ARTCI_INTEGRATION=true
VITE_ARTCI_API_URL=https://www.artci.ci/api

# Backend Configuration
VITE_BACKEND_URL=http://localhost:3001
VITE_API_VERSION=v1
```

## Service Role Key (for migrations)

For running migrations and admin operations, you'll also need the service role key:

```env
# Add this to your local .env.local file only (NEVER commit this)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Environment Validation

The application will validate these environment variables on startup:

### Required Variables:
- ✅ `VITE_SUPABASE_URL` - Your Supabase project URL
- ✅ `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- ✅ `VITE_APP_URL` - Your application URL
- ✅ `VITE_ENVIRONMENT` - Environment (development/production)

### Optional Variables (with defaults):
- `VITE_SUPABASE_SCHEMA` - Default: `edusoluce_public`
- `VITE_SUPABASE_ORGANIZATION_SCHEMA` - Default: `edusoluce_org`
- `VITE_ENABLE_SCHEMA_DIFFERENTIATION` - Default: `true`
- `VITE_APP_LOCALE` - Default: `fr-CI`
- `VITE_APP_TIMEZONE` - Default: `Africa/Abidjan`
- `VITE_APP_CURRENCY` - Default: `XOF`
- `VITE_APP_REGION` - Default: `africa`

## Deployment Checklist

### 1. Vercel Environment Variables
- [ ] Add all production environment variables to Vercel
- [ ] Verify `VITE_APP_URL` matches your Vercel domain
- [ ] Set `VITE_ENVIRONMENT=production`

### 2. Local Development
- [ ] Create `.env.local` file with development settings
- [ ] Add service role key for migrations
- [ ] Test local development with `npm run dev`

### 3. Database Setup
- [ ] Run migrations in Supabase SQL Editor
- [ ] Test schema differentiation
- [ ] Verify RLS policies

### 4. Testing
- [ ] Run `npm run test:schemas` to verify configuration
- [ ] Test data isolation between organizations
- [ ] Verify authentication flow

## Security Notes

### ✅ **Safe to Commit**
- `VITE_SUPABASE_URL` - Public URL
- `VITE_SUPABASE_ANON_KEY` - Anonymous key (safe for frontend)
- All other `VITE_*` variables

### ❌ **Never Commit**
- `SUPABASE_SERVICE_ROLE_KEY` - Keep this secret
- Any keys with admin privileges
- Production secrets

## Next Steps

1. **Add to Vercel**: Copy the production environment variables to your Vercel project
2. **Create .env.local**: Add the development variables for local testing
3. **Run Migrations**: Execute the SQL migrations in Supabase
4. **Test Deployment**: Deploy and verify everything works
5. **Monitor**: Check logs and performance after deployment

---

*Configuration complete! Your EduSoluce project is ready for deployment with proper schema differentiation.*
