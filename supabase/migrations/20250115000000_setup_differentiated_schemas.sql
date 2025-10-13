/*
  # Setup Differentiated Schemas for Existing Supabase Project
  
  This migration sets up schema differentiation for an existing Supabase project
  to support multiple organizations with isolated data.
  
  1. Create organization-specific schemas
  2. Set up RLS policies for schema isolation
  3. Create helper functions for schema management
  4. Migrate existing data to appropriate schemas
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a function to generate organization-specific schema names
CREATE OR REPLACE FUNCTION get_organization_schema_name(org_id uuid)
RETURNS text AS $$
BEGIN
  RETURN 'org_' || replace(org_id::text, '-', '_');
END;
$$ LANGUAGE plpgsql;

-- Create a function to create organization-specific schemas
CREATE OR REPLACE FUNCTION create_organization_schema(org_id uuid)
RETURNS text AS $$
DECLARE
  schema_name text;
BEGIN
  schema_name := get_organization_schema_name(org_id);
  
  -- Create the schema if it doesn't exist
  EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', schema_name);
  
  -- Create tables in the organization schema (copy structure from public schema)
  -- Profiles table
  EXECUTE format('
    CREATE TABLE IF NOT EXISTS %I.profiles (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
      role text NOT NULL,
      full_name text,
      email text,
      department text,
      avatar_url text,
      settings jsonb DEFAULT ''{}'',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )', schema_name);
  
  -- Assessment results table
  EXECUTE format('
    CREATE TABLE IF NOT EXISTS %I.assessment_results (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES %I.profiles(id) ON DELETE CASCADE,
      assessment_type text NOT NULL,
      assessment_id text NOT NULL,
      area_id text NOT NULL,
      area_title text NOT NULL,
      current_level integer NOT NULL,
      target_level integer,
      score numeric NOT NULL,
      gap_indicators text[],
      remediation_actions jsonb DEFAULT ''{}'',
      responses jsonb DEFAULT ''{}'',
      completed_at timestamptz DEFAULT now(),
      created_at timestamptz DEFAULT now()
    )', schema_name, schema_name);
  
  -- Training progress table
  EXECUTE format('
    CREATE TABLE IF NOT EXISTS %I.training_progress (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES %I.profiles(id) ON DELETE CASCADE,
      module_id text NOT NULL,
      module_title text NOT NULL,
      status text DEFAULT ''not-started'',
      progress integer DEFAULT 0,
      current_lesson_id text,
      syllabus_progress jsonb DEFAULT ''{}'',
      quiz_scores jsonb DEFAULT ''{}'',
      started_at timestamptz,
      completed_at timestamptz,
      last_accessed timestamptz DEFAULT now(),
      created_at timestamptz DEFAULT now(),
      offline_id text
    )', schema_name, schema_name);
  
  -- Data subject requests table
  EXECUTE format('
    CREATE TABLE IF NOT EXISTS %I.data_subject_requests (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
      user_id uuid REFERENCES %I.profiles(id) ON DELETE SET NULL,
      request_type text NOT NULL,
      requester_name text NOT NULL,
      requester_email text NOT NULL,
      requester_relationship text,
      student_identifier text,
      request_details jsonb DEFAULT ''{}'',
      applicable_regulations text[] DEFAULT ''{}'',
      status text DEFAULT ''submitted'',
      submitted_at timestamptz DEFAULT now(),
      due_date timestamptz NOT NULL,
      completed_at timestamptz,
      assigned_to uuid REFERENCES %I.profiles(id) ON DELETE SET NULL,
      notes text,
      response_data jsonb DEFAULT ''{}'',
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )', schema_name, schema_name, schema_name);
  
  -- Enable RLS on all tables
  EXECUTE format('ALTER TABLE %I.profiles ENABLE ROW LEVEL SECURITY', schema_name);
  EXECUTE format('ALTER TABLE %I.assessment_results ENABLE ROW LEVEL SECURITY', schema_name);
  EXECUTE format('ALTER TABLE %I.training_progress ENABLE ROW LEVEL SECURITY', schema_name);
  EXECUTE format('ALTER TABLE %I.data_subject_requests ENABLE ROW LEVEL SECURITY', schema_name);
  
  -- Create RLS policies for organization isolation
  EXECUTE format('
    CREATE POLICY "Organization members can view profiles"
      ON %I.profiles
      FOR SELECT
      TO authenticated
      USING (organization_id = %L)
  ', schema_name, org_id);
  
  EXECUTE format('
    CREATE POLICY "Organization members can manage profiles"
      ON %I.profiles
      FOR ALL
      TO authenticated
      USING (organization_id = %L)
  ', schema_name, org_id);
  
  EXECUTE format('
    CREATE POLICY "Users can view their own assessment results"
      ON %I.assessment_results
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid())
  ', schema_name);
  
  EXECUTE format('
    CREATE POLICY "Users can manage their own assessment results"
      ON %I.assessment_results
      FOR ALL
      TO authenticated
      USING (user_id = auth.uid())
  ', schema_name);
  
  EXECUTE format('
    CREATE POLICY "Users can view their own training progress"
      ON %I.training_progress
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid())
  ', schema_name);
  
  EXECUTE format('
    CREATE POLICY "Users can manage their own training progress"
      ON %I.training_progress
      FOR ALL
      TO authenticated
      USING (user_id = auth.uid())
  ', schema_name);
  
  EXECUTE format('
    CREATE POLICY "Organization members can view data subject requests"
      ON %I.data_subject_requests
      FOR SELECT
      TO authenticated
      USING (organization_id = %L)
  ', schema_name, org_id);
  
  EXECUTE format('
    CREATE POLICY "Administrators can manage data subject requests"
      ON %I.data_subject_requests
      FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM %I.profiles 
          WHERE id = auth.uid() 
          AND role = ''administrator'' 
          AND organization_id = %L
        )
      )
  ', schema_name, schema_name, org_id);
  
  -- Create indexes for performance
  EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_profiles_organization_id ON %I.profiles(organization_id)', schema_name, schema_name);
  EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_assessment_results_user_id ON %I.assessment_results(user_id)', schema_name, schema_name);
  EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_training_progress_user_id ON %I.training_progress(user_id)', schema_name, schema_name);
  EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_data_subject_requests_organization_id ON %I.data_subject_requests(organization_id)', schema_name, schema_name);
  
  -- Add triggers for updated_at
  EXECUTE format('
    CREATE TRIGGER update_%I_profiles_updated_at
      BEFORE UPDATE ON %I.profiles
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column()
  ', schema_name, schema_name);
  
  EXECUTE format('
    CREATE TRIGGER update_%I_data_subject_requests_updated_at
      BEFORE UPDATE ON %I.data_subject_requests
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column()
  ', schema_name, schema_name);
  
  RETURN schema_name;
END;
$$ LANGUAGE plpgsql;

-- Create a function to migrate existing data to organization schemas
CREATE OR REPLACE FUNCTION migrate_organization_data(org_id uuid)
RETURNS void AS $$
DECLARE
  schema_name text;
BEGIN
  schema_name := get_organization_schema_name(org_id);
  
  -- Create the organization schema first
  PERFORM create_organization_schema(org_id);
  
  -- Migrate profiles data
  EXECUTE format('
    INSERT INTO %I.profiles (id, organization_id, role, full_name, email, department, avatar_url, settings, created_at, updated_at)
    SELECT id, organization_id, role, full_name, email, department, avatar_url, settings, created_at, updated_at
    FROM profiles
    WHERE organization_id = %L
    ON CONFLICT (id) DO NOTHING
  ', schema_name, org_id);
  
  -- Migrate assessment results
  EXECUTE format('
    INSERT INTO %I.assessment_results (id, user_id, assessment_type, assessment_id, area_id, area_title, current_level, target_level, score, gap_indicators, remediation_actions, responses, completed_at, created_at)
    SELECT ar.id, ar.user_id, ar.assessment_type, ar.assessment_id, ar.area_id, ar.area_title, ar.current_level, ar.target_level, ar.score, ar.gap_indicators, ar.remediation_actions, ar.responses, ar.completed_at, ar.created_at
    FROM assessment_results ar
    JOIN profiles p ON ar.user_id = p.id
    WHERE p.organization_id = %L
    ON CONFLICT (id) DO NOTHING
  ', schema_name, org_id);
  
  -- Migrate training progress
  EXECUTE format('
    INSERT INTO %I.training_progress (id, user_id, module_id, module_title, status, progress, current_lesson_id, syllabus_progress, quiz_scores, started_at, completed_at, last_accessed, created_at, offline_id)
    SELECT tp.id, tp.user_id, tp.module_id, tp.module_title, tp.status, tp.progress, tp.current_lesson_id, tp.syllabus_progress, tp.quiz_scores, tp.started_at, tp.completed_at, tp.last_accessed, tp.created_at, tp.offline_id
    FROM training_progress tp
    JOIN profiles p ON tp.user_id = p.id
    WHERE p.organization_id = %L
    ON CONFLICT (id) DO NOTHING
  ', schema_name, org_id);
  
  -- Migrate data subject requests
  EXECUTE format('
    INSERT INTO %I.data_subject_requests (id, organization_id, user_id, request_type, requester_name, requester_email, requester_relationship, student_identifier, request_details, applicable_regulations, status, submitted_at, due_date, completed_at, assigned_to, notes, response_data, created_at, updated_at)
    SELECT id, organization_id, user_id, request_type, requester_name, requester_email, requester_relationship, student_identifier, request_details, applicable_regulations, status, submitted_at, due_date, completed_at, assigned_to, notes, response_data, created_at, updated_at
    FROM data_subject_requests
    WHERE organization_id = %L
    ON CONFLICT (id) DO NOTHING
  ', schema_name, org_id);
  
END;
$$ LANGUAGE plpgsql;

-- Create a function to get the appropriate schema for a user
CREATE OR REPLACE FUNCTION get_user_schema(user_id uuid)
RETURNS text AS $$
DECLARE
  org_id uuid;
  schema_name text;
BEGIN
  -- Get the user's organization
  SELECT organization_id INTO org_id
  FROM profiles
  WHERE id = user_id;
  
  IF org_id IS NULL THEN
    RETURN 'public';
  END IF;
  
  schema_name := get_organization_schema_name(org_id);
  
  -- Create the schema if it doesn't exist
  PERFORM create_organization_schema(org_id);
  
  RETURN schema_name;
END;
$$ LANGUAGE plpgsql;

-- Create a function to check if schema differentiation is enabled
CREATE OR REPLACE FUNCTION is_schema_differentiation_enabled()
RETURNS boolean AS $$
BEGIN
  -- This can be controlled by a configuration table or environment variable
  -- For now, we'll assume it's enabled if the function exists
  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Create a view to list all organization schemas
CREATE OR REPLACE VIEW organization_schemas AS
SELECT 
  o.id as organization_id,
  o.name as organization_name,
  get_organization_schema_name(o.id) as schema_name,
  CASE 
    WHEN EXISTS (
      SELECT 1 FROM information_schema.schemata 
      WHERE schema_name = get_organization_schema_name(o.id)
    ) THEN true 
    ELSE false 
  END as schema_exists
FROM organizations o;

-- Add a comment explaining the migration
COMMENT ON FUNCTION create_organization_schema(uuid) IS 'Creates a new organization-specific schema with all necessary tables and RLS policies';
COMMENT ON FUNCTION migrate_organization_data(uuid) IS 'Migrates existing data from public schema to organization-specific schema';
COMMENT ON FUNCTION get_user_schema(uuid) IS 'Returns the appropriate schema name for a given user based on their organization';
COMMENT ON VIEW organization_schemas IS 'Lists all organizations and their corresponding schema information';