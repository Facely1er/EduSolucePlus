// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Handle missing environment variables gracefully
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const defaultSchema = import.meta.env.VITE_SUPABASE_SCHEMA || 'edusoluce_public';
const organizationSchema = import.meta.env.VITE_SUPABASE_ORGANIZATION_SCHEMA || 'edusoluce_org';
const enableSchemaDifferentiation = import.meta.env.VITE_ENABLE_SCHEMA_DIFFERENTIATION === 'true';

// Extensive logging during development only
if (import.meta.env.DEV) {
  console.log('Supabase initialization:');
  console.log('- URL defined:', !!supabaseUrl);
  console.log('- Key defined:', !!supabaseAnonKey);
  console.log('- Default schema:', defaultSchema);
  console.log('- Organization schema:', organizationSchema);
  console.log('- Schema differentiation enabled:', enableSchemaDifferentiation);
}

// Log warning if environment variables are missing (always log this critical error)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing. Please check your .env file.');
}

// Create client with proper error handling and schema support
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (...args) => {
      // Log fetch attempts in development only
      if (import.meta.env.DEV) {
        console.log('Supabase fetch:', args[0]);
      }
      return fetch(...args);
    }
  },
  db: {
    schema: defaultSchema
  }
});

// Schema management utilities
export const schemaManager = {
  default: defaultSchema,
  organization: organizationSchema,
  enabled: enableSchemaDifferentiation,
  
  // Get the appropriate schema based on context
  getSchema(context: 'default' | 'organization' | 'user' = 'default'): string {
    if (!enableSchemaDifferentiation) {
      return defaultSchema;
    }
    
    switch (context) {
      case 'organization':
        return organizationSchema;
      case 'user':
        // For user-specific data, we might use a combination
        return `${organizationSchema}.user_data`;
      default:
        return defaultSchema;
    }
  },
  
  // Create a client with a specific schema
  createClientWithSchema(schema: string): SupabaseClient {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
      db: {
        schema: schema
      }
    });
  }
};

// Export version that works offline by providing fallbacks (for future use)
// const getOfflineCompatibleSupabase = () => {
//   // Check if online
//   if (!navigator.onLine) {
//     if (import.meta.env.DEV) {
//       console.log('Offline mode: Supabase operations will be queued');
//     }
//     // In offline mode, we'd queue operations for later sync
//     // This is a simplified example
//   }
//   return supabase;
// };

// Database types based on your schema
export interface Profile {
  id: string
  organization_id?: string
  role: 'administrator' | 'teacher' | 'it-staff' | 'student'
  full_name?: string
  email?: string
  department?: string
  avatar_url?: string
  settings?: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface AssessmentResult {
  id: string
  user_id: string
  assessment_type: 'administrator' | 'teacher' | 'it-staff' | 'student'
  assessment_id: string
  area_id: string
  area_title: string
  current_level: number
  target_level?: number
  score: number
  gap_indicators?: string[]
  remediation_actions?: Record<string, string>
  responses?: Record<string, unknown>
  completed_at: string
  created_at: string
}

export interface TrainingProgress {
  id: string
  user_id: string
  module_id: string
  module_title: string
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number
  current_lesson_id?: string
  syllabus_progress?: Record<string, unknown>
  quiz_scores?: Record<string, number>
  started_at?: string
  completed_at?: string
  last_accessed: string
  created_at: string
  offline_id?: string;
}

// interface DataSubjectRequest {
//   id: string
//   organization_id: string
//   user_id?: string
//   request_type: 'access' | 'rectification' | 'erasure' | 'portability' | 'objection' | 'restriction' | 'opt_out' | 'consent_withdrawal' | 'directory_opt_out'
//   requester_name: string
//   requester_email: string
//   requester_relationship?: string
//   student_identifier?: string
//   request_details?: Record<string, unknown>
//   applicable_regulations?: string[]
//   status: 'submitted' | 'under_review' | 'in_progress' | 'completed' | 'rejected' | 'partially_fulfilled'
//   submitted_at: string
//   due_date: string
//   completed_at?: string
//   assigned_to?: string
//   notes?: string
//   response_data?: Record<string, unknown>
//   verification_status?: string
//   communication_log?: unknown[]
//   created_at: string
//   updated_at: string
// }

// interface ConsentRecord {
//   id: string
//   organization_id: string
//   student_id: string
//   student_name?: string
//   parent_guardian_name?: string
//   parent_guardian_email?: string
//   consent_type: string
//   purpose: 'educational_services' | 'student_assessment' | 'administrative' | 'communications' | 'safety_security' | 'compliance' | 'research' | 'marketing' | 'other'
//   service_provider?: string
//   consent_given: boolean
//   consent_date?: string
//   withdrawal_date?: string
//   expiry_date?: string
//   renewal_required: boolean
//   applicable_regulations?: string[]
//   metadata?: Record<string, unknown>
//   created_at: string
//   updated_at: string
// }

// interface PrivacyIncident {
//   id: string
//   organization_id: string
//   incident_number: string
//   incident_type: 'data_breach' | 'unauthorized_access' | 'data_loss' | 'system_compromise' | 'privacy_violation' | 'consent_violation' | 'vendor_incident'
//   severity: 'low' | 'medium' | 'high' | 'critical'
//   title: string
//   description: string
//   affected_individuals_count: number
//   data_types_affected?: string[]
//   discovery_date: string
//   incident_date?: string
//   containment_date?: string
//   resolution_date?: string
//   reported_to_authorities: boolean
//   notification_authorities?: string[]
//   individuals_notified: boolean
//   notification_method?: string
//   cause_analysis?: string
//   remediation_actions?: unknown[]
//   lessons_learned?: string
//   status: string
//   assigned_to?: string
//   applicable_regulations?: string[]
//   created_at: string
//   updated_at: string
// }

// interface ComplianceTracking {
//   id: string
//   organization_id: string
//   event_id: string
//   event_title: string
//   status: 'pending' | 'in-progress' | 'completed' | 'overdue'
//   assigned_to?: string
//   due_date: string
//   completed_at?: string
//   documentation?: Record<string, unknown>
//   notes?: string
//   created_at: string
//   updated_at: string
// }