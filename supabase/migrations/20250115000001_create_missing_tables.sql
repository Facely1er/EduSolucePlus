/*
  # Create Missing Core Tables for EduSoluce Backend
  
  This migration creates the essential tables that are referenced by other tables
  but were missing from the database schema.
  
  1. New Tables
    - `organizations` - Core organization management
    - `consent_records` - GDPR/COPPA consent tracking
    - `privacy_incidents` - Incident reporting and management
    - `vendor_assessments` - Third-party vendor compliance tracking
    - `audit_logs` - Comprehensive audit logging
    - `notification_preferences` - User notification settings
    
  2. Security
    - Enable RLS on all new tables
    - Add appropriate policies for data access
    - Add indexes for performance
    - Add triggers for audit trails
*/

-- Create organizations table (referenced by other tables)
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('school', 'district', 'university', 'college', 'other')),
  address jsonb DEFAULT '{}',
  contact_info jsonb DEFAULT '{}',
  settings jsonb DEFAULT '{}',
  compliance_settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on organizations
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Users can view their organization"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT organization_id 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Administrators can manage their organization"
  ON organizations
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'administrator'
      AND organization_id = organizations.id
    )
  );

-- Create consent_records table for GDPR/COPPA compliance
CREATE TABLE IF NOT EXISTS consent_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  student_id text NOT NULL,
  student_name text,
  parent_guardian_name text,
  parent_guardian_email text,
  consent_type text NOT NULL,
  purpose text NOT NULL CHECK (purpose IN (
    'educational_services', 'student_assessment', 'administrative', 
    'communications', 'safety_security', 'compliance', 'research', 
    'marketing', 'other'
  )),
  service_provider text,
  consent_given boolean NOT NULL,
  consent_date timestamptz,
  withdrawal_date timestamptz,
  expiry_date timestamptz,
  renewal_required boolean DEFAULT false,
  applicable_regulations text[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on consent_records
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;

-- Consent records policies
CREATE POLICY "Organization members can view consent records"
  ON consent_records
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Administrators can manage consent records"
  ON consent_records
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'administrator'
      AND organization_id = consent_records.organization_id
    )
  );

-- Create privacy_incidents table for incident management
CREATE TABLE IF NOT EXISTS privacy_incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  incident_number text UNIQUE NOT NULL,
  incident_type text NOT NULL CHECK (incident_type IN (
    'data_breach', 'unauthorized_access', 'data_loss', 'system_compromise',
    'privacy_violation', 'consent_violation', 'vendor_incident'
  )),
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  title text NOT NULL,
  description text NOT NULL,
  affected_individuals_count integer DEFAULT 0,
  data_types_affected text[] DEFAULT '{}',
  discovery_date timestamptz NOT NULL,
  incident_date timestamptz,
  containment_date timestamptz,
  resolution_date timestamptz,
  reported_to_authorities boolean DEFAULT false,
  notification_authorities text[] DEFAULT '{}',
  individuals_notified boolean DEFAULT false,
  notification_method text,
  cause_analysis text,
  remediation_actions jsonb DEFAULT '[]',
  lessons_learned text,
  status text DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'contained', 'resolved', 'closed')),
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  applicable_regulations text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on privacy_incidents
ALTER TABLE privacy_incidents ENABLE ROW LEVEL SECURITY;

-- Privacy incidents policies
CREATE POLICY "Organization members can view privacy incidents"
  ON privacy_incidents
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Administrators can manage privacy incidents"
  ON privacy_incidents
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'administrator'
      AND organization_id = privacy_incidents.organization_id
    )
  );

-- Create vendor_assessments table for third-party compliance
CREATE TABLE IF NOT EXISTS vendor_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  vendor_name text NOT NULL,
  vendor_contact text,
  service_description text NOT NULL,
  data_types_processed text[] DEFAULT '{}',
  compliance_framework text NOT NULL,
  assessment_date timestamptz NOT NULL,
  assessor_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  overall_score integer CHECK (overall_score >= 0 AND overall_score <= 100),
  security_score integer CHECK (security_score >= 0 AND security_score <= 100),
  privacy_score integer CHECK (privacy_score >= 0 AND privacy_score <= 100),
  compliance_score integer CHECK (compliance_score >= 0 AND compliance_score <= 100),
  findings jsonb DEFAULT '{}',
  recommendations jsonb DEFAULT '[]',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  next_assessment_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on vendor_assessments
ALTER TABLE vendor_assessments ENABLE ROW LEVEL SECURITY;

-- Vendor assessments policies
CREATE POLICY "Organization members can view vendor assessments"
  ON vendor_assessments
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Administrators can manage vendor assessments"
  ON vendor_assessments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'administrator'
      AND organization_id = vendor_assessments.organization_id
    )
  );

-- Create audit_logs table for comprehensive logging
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  session_id text NOT NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text NOT NULL,
  details jsonb DEFAULT '{}',
  ip_address inet,
  user_agent text,
  success boolean NOT NULL,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Audit logs policies
CREATE POLICY "Organization members can view audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );

-- Create notification_preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  email_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT true,
  compliance_alerts boolean DEFAULT true,
  incident_alerts boolean DEFAULT true,
  deadline_reminders boolean DEFAULT true,
  weekly_digest boolean DEFAULT true,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on notification_preferences
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Notification preferences policies
CREATE POLICY "Users can manage their own notification preferences"
  ON notification_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_consent_records_organization_id ON consent_records(organization_id);
CREATE INDEX IF NOT EXISTS idx_consent_records_student_id ON consent_records(student_id);
CREATE INDEX IF NOT EXISTS idx_consent_records_consent_type ON consent_records(consent_type);
CREATE INDEX IF NOT EXISTS idx_privacy_incidents_organization_id ON privacy_incidents(organization_id);
CREATE INDEX IF NOT EXISTS idx_privacy_incidents_severity ON privacy_incidents(severity);
CREATE INDEX IF NOT EXISTS idx_privacy_incidents_status ON privacy_incidents(status);
CREATE INDEX IF NOT EXISTS idx_vendor_assessments_organization_id ON vendor_assessments(organization_id);
CREATE INDEX IF NOT EXISTS idx_vendor_assessments_status ON vendor_assessments(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_organization_id ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Add updated_at triggers
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_consent_records_updated_at
  BEFORE UPDATE ON consent_records
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_privacy_incidents_updated_at
  BEFORE UPDATE ON privacy_incidents
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_vendor_assessments_updated_at
  BEFORE UPDATE ON vendor_assessments
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create function to generate incident numbers
CREATE OR REPLACE FUNCTION generate_incident_number()
RETURNS text AS $$
DECLARE
  year_part text;
  sequence_num integer;
  incident_num text;
BEGIN
  year_part := EXTRACT(year FROM now())::text;
  
  -- Get next sequence number for this year
  SELECT COALESCE(MAX(CAST(SUBSTRING(incident_number FROM '^INC-' || year_part || '-(\d+)$') AS integer)), 0) + 1
  INTO sequence_num
  FROM privacy_incidents
  WHERE incident_number LIKE 'INC-' || year_part || '-%';
  
  incident_num := 'INC-' || year_part || '-' || LPAD(sequence_num::text, 4, '0');
  
  RETURN incident_num;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate incident numbers
CREATE OR REPLACE FUNCTION set_incident_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.incident_number IS NULL OR NEW.incident_number = '' THEN
    NEW.incident_number := generate_incident_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_privacy_incident_number
  BEFORE INSERT ON privacy_incidents
  FOR EACH ROW
  EXECUTE FUNCTION set_incident_number();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Add comments for documentation
COMMENT ON TABLE organizations IS 'Core organization management for multi-tenant support';
COMMENT ON TABLE consent_records IS 'GDPR/COPPA consent tracking and management';
COMMENT ON TABLE privacy_incidents IS 'Privacy incident reporting and management';
COMMENT ON TABLE vendor_assessments IS 'Third-party vendor compliance assessments';
COMMENT ON TABLE audit_logs IS 'Comprehensive audit logging for compliance';
COMMENT ON TABLE notification_preferences IS 'User notification preferences and settings';