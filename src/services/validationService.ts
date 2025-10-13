// Comprehensive data validation service for EduSoluce backend
import { z } from 'zod';

// Base validation schemas
export const emailSchema = z.string().email('Invalid email format');
export const uuidSchema = z.string().uuid('Invalid UUID format');
export const phoneSchema = z.string().regex(/^\+?[\d\s\-()]+$/, 'Invalid phone number format');
export const urlSchema = z.string().url('Invalid URL format');

// Organization validation
export const organizationTypeSchema = z.enum(['school', 'district', 'university', 'college', 'other']);
export const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required').max(255, 'Name too long'),
  type: organizationTypeSchema,
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional()
  }).optional(),
  contact_info: z.object({
    phone: phoneSchema.optional(),
    email: emailSchema.optional(),
    website: urlSchema.optional()
  }).optional(),
  settings: z.record(z.any()).optional(),
  compliance_settings: z.record(z.any()).optional()
});

// User profile validation
export const userRoleSchema = z.enum(['administrator', 'teacher', 'it-staff', 'student']);
export const profileSchema = z.object({
  id: uuidSchema,
  organization_id: uuidSchema.optional(),
  role: userRoleSchema,
  full_name: z.string().min(1, 'Full name is required').max(255, 'Name too long'),
  email: emailSchema,
  department: z.string().max(100, 'Department name too long').optional(),
  avatar_url: urlSchema.optional(),
  settings: z.record(z.any()).optional()
});

// Assessment validation
export const assessmentTypeSchema = z.enum(['administrator', 'teacher', 'it-staff', 'student']);
export const assessmentResultSchema = z.object({
  user_id: uuidSchema,
  assessment_type: assessmentTypeSchema,
  assessment_id: z.string().min(1, 'Assessment ID is required'),
  area_id: z.string().min(1, 'Area ID is required'),
  area_title: z.string().min(1, 'Area title is required'),
  current_level: z.number().int().min(0).max(5, 'Level must be between 0 and 5'),
  target_level: z.number().int().min(0).max(5, 'Target level must be between 0 and 5').optional(),
  score: z.number().int().min(0).max(100, 'Score must be between 0 and 100'),
  gap_indicators: z.array(z.string()).optional(),
  remediation_actions: z.record(z.any()).optional(),
  responses: z.record(z.any()).optional()
});

// Training progress validation
export const trainingStatusSchema = z.enum(['not-started', 'in-progress', 'completed']);
export const trainingProgressSchema = z.object({
  user_id: uuidSchema,
  module_id: z.string().min(1, 'Module ID is required'),
  module_title: z.string().min(1, 'Module title is required'),
  status: trainingStatusSchema,
  progress: z.number().int().min(0).max(100, 'Progress must be between 0 and 100'),
  current_lesson_id: z.string().optional(),
  syllabus_progress: z.record(z.any()).optional(),
  quiz_scores: z.record(z.number()).optional()
});

// Compliance tracking validation
export const complianceStatusSchema = z.enum(['pending', 'in-progress', 'completed', 'overdue']);
export const complianceTrackingSchema = z.object({
  organization_id: uuidSchema,
  event_id: z.string().min(1, 'Event ID is required'),
  event_title: z.string().min(1, 'Event title is required'),
  status: complianceStatusSchema,
  assigned_to: uuidSchema.optional(),
  due_date: z.string().datetime('Invalid date format'),
  documentation: z.record(z.any()).optional(),
  notes: z.string().optional()
});

// Data subject request validation
export const requestTypeSchema = z.enum([
  'access', 'rectification', 'erasure', 'portability', 
  'objection', 'restriction', 'opt_out', 'consent_withdrawal', 'directory_opt_out'
]);
export const relationshipSchema = z.enum(['parent', 'guardian', 'student', 'representative']);
export const dataSubjectRequestSchema = z.object({
  organization_id: uuidSchema,
  user_id: uuidSchema.optional(),
  request_type: requestTypeSchema,
  requester_name: z.string().min(1, 'Requester name is required').max(255, 'Name too long'),
  requester_email: emailSchema,
  requester_relationship: relationshipSchema.optional(),
  student_identifier: z.string().optional(),
  request_details: z.record(z.any()).optional(),
  applicable_regulations: z.array(z.string()).optional(),
  assigned_to: uuidSchema.optional(),
  notes: z.string().optional()
});

// Consent record validation
export const consentPurposeSchema = z.enum([
  'educational_services', 'student_assessment', 'administrative',
  'communications', 'safety_security', 'compliance', 'research',
  'marketing', 'other'
]);
export const consentRecordSchema = z.object({
  organization_id: uuidSchema,
  student_id: z.string().min(1, 'Student ID is required'),
  student_name: z.string().optional(),
  parent_guardian_name: z.string().optional(),
  parent_guardian_email: emailSchema.optional(),
  consent_type: z.string().min(1, 'Consent type is required'),
  purpose: consentPurposeSchema,
  service_provider: z.string().optional(),
  consent_given: z.boolean(),
  consent_date: z.string().datetime().optional(),
  withdrawal_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  renewal_required: z.boolean().optional(),
  applicable_regulations: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional()
});

// Privacy incident validation
export const incidentTypeSchema = z.enum([
  'data_breach', 'unauthorized_access', 'data_loss', 'system_compromise',
  'privacy_violation', 'consent_violation', 'vendor_incident'
]);
export const severitySchema = z.enum(['low', 'medium', 'high', 'critical']);
export const incidentStatusSchema = z.enum(['open', 'investigating', 'contained', 'resolved', 'closed']);
export const privacyIncidentSchema = z.object({
  organization_id: uuidSchema,
  incident_type: incidentTypeSchema,
  severity: severitySchema,
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  description: z.string().min(1, 'Description is required'),
  affected_individuals_count: z.number().int().min(0).optional(),
  data_types_affected: z.array(z.string()).optional(),
  discovery_date: z.string().datetime('Invalid date format'),
  incident_date: z.string().datetime().optional(),
  containment_date: z.string().datetime().optional(),
  resolution_date: z.string().datetime().optional(),
  reported_to_authorities: z.boolean().optional(),
  notification_authorities: z.array(z.string()).optional(),
  individuals_notified: z.boolean().optional(),
  notification_method: z.string().optional(),
  cause_analysis: z.string().optional(),
  remediation_actions: z.array(z.any()).optional(),
  lessons_learned: z.string().optional(),
  status: incidentStatusSchema.optional(),
  assigned_to: uuidSchema.optional(),
  applicable_regulations: z.array(z.string()).optional()
});

// Vendor assessment validation
export const vendorAssessmentStatusSchema = z.enum(['pending', 'in-progress', 'completed', 'failed']);
export const vendorAssessmentSchema = z.object({
  organization_id: uuidSchema,
  vendor_name: z.string().min(1, 'Vendor name is required').max(255, 'Name too long'),
  vendor_contact: z.string().optional(),
  service_description: z.string().min(1, 'Service description is required'),
  data_types_processed: z.array(z.string()).optional(),
  compliance_framework: z.string().min(1, 'Compliance framework is required'),
  assessment_date: z.string().datetime('Invalid date format'),
  assessor_id: uuidSchema.optional(),
  overall_score: z.number().int().min(0).max(100).optional(),
  security_score: z.number().int().min(0).max(100).optional(),
  privacy_score: z.number().int().min(0).max(100).optional(),
  compliance_score: z.number().int().min(0).max(100).optional(),
  findings: z.record(z.any()).optional(),
  recommendations: z.array(z.any()).optional(),
  status: vendorAssessmentStatusSchema.optional(),
  next_assessment_date: z.string().datetime().optional()
});

// Notification preferences validation
export const notificationPreferencesSchema = z.object({
  user_id: uuidSchema,
  email_notifications: z.boolean().optional(),
  push_notifications: z.boolean().optional(),
  compliance_alerts: z.boolean().optional(),
  incident_alerts: z.boolean().optional(),
  deadline_reminders: z.boolean().optional(),
  weekly_digest: z.boolean().optional(),
  preferences: z.record(z.any()).optional()
});

// Audit log validation
export const auditLogSchema = z.object({
  organization_id: uuidSchema,
  user_id: uuidSchema.optional(),
  session_id: z.string().min(1, 'Session ID is required'),
  action: z.string().min(1, 'Action is required'),
  resource_type: z.string().min(1, 'Resource type is required'),
  resource_id: z.string().min(1, 'Resource ID is required'),
  details: z.record(z.any()).optional(),
  ip_address: z.string().ip().optional(),
  user_agent: z.string().optional(),
  success: z.boolean(),
  error_message: z.string().optional()
});

// Validation service class
export class ValidationService {
  // Generic validation method
  validate<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    errors?: string[];
  } {
    try {
      const result = schema.parse(data);
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
        };
      }
      return {
        success: false,
        errors: ['Validation failed']
      };
    }
  }

  // Safe validation method that doesn't throw
  safeValidate<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    error?: z.ZodError;
  } {
    const result = schema.safeParse(data);
    return {
      success: result.success,
      data: result.success ? result.data : undefined,
      error: result.success ? undefined : result.error
    };
  }

  // Sanitize input data
  sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      // Remove potentially dangerous characters
      return input
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim();
    }
    
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeInput(item));
    }
    
    if (input && typeof input === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(input)) {
        sanitized[key] = this.sanitizeInput(value);
      }
      return sanitized;
    }
    
    return input;
  }

  // Validate and sanitize
  validateAndSanitize<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    errors?: string[];
  } {
    const sanitizedData = this.sanitizeInput(data);
    return this.validate(schema, sanitizedData);
  }

  // Specific validation methods
  validateOrganization = (data: unknown) => this.validate(organizationSchema, data);
  validateProfile = (data: unknown) => this.validate(profileSchema, data);
  validateAssessmentResult = (data: unknown) => this.validate(assessmentResultSchema, data);
  validateTrainingProgress = (data: unknown) => this.validate(trainingProgressSchema, data);
  validateComplianceTracking = (data: unknown) => this.validate(complianceTrackingSchema, data);
  validateDataSubjectRequest = (data: unknown) => this.validate(dataSubjectRequestSchema, data);
  validateConsentRecord = (data: unknown) => this.validate(consentRecordSchema, data);
  validatePrivacyIncident = (data: unknown) => this.validate(privacyIncidentSchema, data);
  validateVendorAssessment = (data: unknown) => this.validate(vendorAssessmentSchema, data);
  validateNotificationPreferences = (data: unknown) => this.validate(notificationPreferencesSchema, data);
  validateAuditLog = (data: unknown) => this.validate(auditLogSchema, data);

  // Validate with sanitization
  validateAndSanitizeOrganization = (data: unknown) => this.validateAndSanitize(organizationSchema, data);
  validateAndSanitizeProfile = (data: unknown) => this.validateAndSanitize(profileSchema, data);
  validateAndSanitizeAssessmentResult = (data: unknown) => this.validateAndSanitize(assessmentResultSchema, data);
  validateAndSanitizeTrainingProgress = (data: unknown) => this.validateAndSanitize(trainingProgressSchema, data);
  validateAndSanitizeComplianceTracking = (data: unknown) => this.validateAndSanitize(complianceTrackingSchema, data);
  validateAndSanitizeDataSubjectRequest = (data: unknown) => this.validateAndSanitize(dataSubjectRequestSchema, data);
  validateAndSanitizeConsentRecord = (data: unknown) => this.validateAndSanitize(consentRecordSchema, data);
  validateAndSanitizePrivacyIncident = (data: unknown) => this.validateAndSanitize(privacyIncidentSchema, data);
  validateAndSanitizeVendorAssessment = (data: unknown) => this.validateAndSanitize(vendorAssessmentSchema, data);
  validateAndSanitizeNotificationPreferences = (data: unknown) => this.validateAndSanitize(notificationPreferencesSchema, data);
  validateAndSanitizeAuditLog = (data: unknown) => this.validateAndSanitize(auditLogSchema, data);
}

// Export singleton instance
export const validationService = new ValidationService();

// Export schemas for use in other services
export {
  organizationSchema,
  profileSchema,
  assessmentResultSchema,
  trainingProgressSchema,
  complianceTrackingSchema,
  dataSubjectRequestSchema,
  consentRecordSchema,
  privacyIncidentSchema,
  vendorAssessmentSchema,
  notificationPreferencesSchema,
  auditLogSchema
};