// Comprehensive validation utilities for production use
import { z } from 'zod';

// Email validation schema
export const emailSchema = z.string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')
  .max(254, 'Email address is too long');

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

// Name validation schema
export const nameSchema = z.string()
  .min(1, 'Name is required')
  .max(100, 'Name is too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

// Organization validation schema
export const organizationSchema = z.string()
  .max(200, 'Organization name is too long')
  .optional();

// Role validation schema
export const roleSchema = z.enum(['administrator', 'teacher', 'it-staff', 'student'], {
  errorMap: () => ({ message: 'Please select a valid role' })
});

// Data subject request validation
export const dataSubjectRequestSchema = z.object({
  requestType: z.enum(['access', 'rectification', 'erasure', 'portability', 'objection', 'restriction', 'opt_out', 'consent_withdrawal', 'directory_opt_out']),
  requesterName: nameSchema,
  requesterEmail: emailSchema,
  requesterRelationship: z.enum(['parent', 'guardian', 'student', 'representative']).optional(),
  studentIdentifier: z.string().min(1, 'Student identifier is required').max(50),
  requestDetails: z.string().min(10, 'Please provide more details about your request').max(2000),
  urgentRequest: z.boolean().optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'mail']).optional()
});

// Privacy incident validation
export const privacyIncidentSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  incidentType: z.enum(['data_breach', 'unauthorized_access', 'data_loss', 'system_compromise', 'privacy_violation', 'consent_violation', 'vendor_incident']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string().min(20, 'Please provide a detailed description').max(5000),
  affectedIndividualsCount: z.number().min(0).max(1000000),
  dataTypesAffected: z.array(z.string()).min(1, 'Please select at least one data type'),
  discoveryDate: z.string().min(1, 'Discovery date is required'),
  incidentDate: z.string().optional(),
  reporterName: nameSchema,
  reporterEmail: emailSchema,
  reporterRole: z.string().min(1, 'Reporter role is required')
});

// Vendor assessment validation
export const vendorAssessmentSchema = z.object({
  vendorName: z.string().min(1, 'Vendor name is required').max(200),
  serviceDescription: z.string().min(10, 'Please provide a service description').max(1000),
  dataTypesProcessed: z.array(z.string()).min(1, 'Please select data types processed'),
  studentDataAccess: z.boolean(),
  applicableRegulations: z.array(z.string()).min(1, 'Please select applicable regulations'),
  contractStartDate: z.string().min(1, 'Contract start date is required'),
  contractEndDate: z.string().min(1, 'Contract end date is required'),
  privacyPolicyUrl: z.string().url('Please enter a valid URL').optional(),
  securityCertifications: z.array(z.string()).optional(),
  assessmentNotes: z.string().max(2000).optional()
});

// Consent record validation
export const consentRecordSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required').max(50),
  studentName: nameSchema,
  parentGuardianName: nameSchema.optional(),
  parentGuardianEmail: emailSchema.optional(),
  consentType: z.string().min(1, 'Consent type is required'),
  purpose: z.enum(['educational_services', 'student_assessment', 'administrative', 'communications', 'safety_security', 'compliance', 'research', 'marketing', 'other']),
  serviceProvider: z.string().min(1, 'Service provider is required').max(200),
  consentGiven: z.boolean(),
  expiryDate: z.string().optional(),
  renewalRequired: z.boolean()
});

// Generic form validation utility
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: string[] } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};

// Sanitization utilities
export const sanitizeHtml = (input: string): string => {
  // Basic HTML sanitization - in production, use a library like DOMPurify
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .trim();
};

export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
};

// Input validation for search terms
export const validateSearchTerm = (term: string): boolean => {
  if (!term || term.length < 2) return false;
  if (term.length > 100) return false;
  // Prevent SQL injection attempts
  if (/[<>'"\\]/g.test(term)) return false;
  return true;
};

// Rate limiting utility
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const requestTimes = this.requests.get(key)!;
    // Remove old requests outside the window
    const validRequests = requestTimes.filter(time => time > windowStart);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
  
  reset(key: string): void {
    this.requests.delete(key);
  }
}

export const rateLimiter = new RateLimiter();