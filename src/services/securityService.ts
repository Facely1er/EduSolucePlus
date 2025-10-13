// Comprehensive security service for EduSoluce backend
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

// Security configuration
interface SecurityConfig {
  maxLoginAttempts: number;
  lockoutDuration: number; // in minutes
  sessionTimeout: number; // in minutes
  passwordMinLength: number;
  requireSpecialChars: boolean;
  requireNumbers: boolean;
  requireUppercase: boolean;
  enableTwoFactor: boolean;
  enableAuditLogging: boolean;
}

// Default security configuration
const defaultSecurityConfig: SecurityConfig = {
  maxLoginAttempts: 5,
  lockoutDuration: 30,
  sessionTimeout: 480, // 8 hours
  passwordMinLength: 8,
  requireSpecialChars: true,
  requireNumbers: true,
  requireUppercase: true,
  enableTwoFactor: false,
  enableAuditLogging: true
};

// Security event types
type SecurityEvent = 
  | 'login_attempt'
  | 'login_success'
  | 'login_failure'
  | 'account_locked'
  | 'account_unlocked'
  | 'password_change'
  | 'permission_denied'
  | 'data_access'
  | 'data_modification'
  | 'suspicious_activity'
  | 'session_timeout'
  | 'logout';

// Security event interface
interface SecurityEventData {
  event: SecurityEvent;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

// Rate limiting interface
interface RateLimit {
  key: string;
  count: number;
  resetTime: number;
}

// Security service class
export class SecurityService {
  private config: SecurityConfig;
  private rateLimits: Map<string, RateLimit> = new Map();
  private failedAttempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private lockedAccounts: Set<string> = new Set();

  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = { ...defaultSecurityConfig, ...config };
  }

  // Password validation
  validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < this.config.passwordMinLength) {
      errors.push(`Password must be at least ${this.config.passwordMinLength} characters long`);
    }

    if (this.config.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (this.config.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (this.config.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check for common weak passwords
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123',
      'password123', 'admin', 'letmein', 'welcome', 'monkey'
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push('Password is too common and easily guessable');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Rate limiting
  isRateLimited(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const rateLimit = this.rateLimits.get(key);

    if (!rateLimit || now > rateLimit.resetTime) {
      this.rateLimits.set(key, {
        key,
        count: 1,
        resetTime: now + windowMs
      });
      return false;
    }

    if (rateLimit.count >= maxRequests) {
      return true;
    }

    rateLimit.count++;
    return false;
  }

  // Account lockout management
  recordFailedLogin(userId: string, ipAddress?: string): void {
    const key = `${userId}_${ipAddress || 'unknown'}`;
    const now = Date.now();
    const attempts = this.failedAttempts.get(key) || { count: 0, lastAttempt: 0 };

    attempts.count++;
    attempts.lastAttempt = now;
    this.failedAttempts.set(key, attempts);

    if (attempts.count >= this.config.maxLoginAttempts) {
      this.lockAccount(userId);
      this.logSecurityEvent({
        event: 'account_locked',
        userId,
        ipAddress,
        severity: 'high',
        timestamp: new Date().toISOString(),
        details: { reason: 'Too many failed login attempts' }
      });
    } else {
      this.logSecurityEvent({
        event: 'login_failure',
        userId,
        ipAddress,
        severity: 'medium',
        timestamp: new Date().toISOString(),
        details: { attemptCount: attempts.count }
      });
    }
  }

  recordSuccessfulLogin(userId: string, ipAddress?: string): void {
    const key = `${userId}_${ipAddress || 'unknown'}`;
    this.failedAttempts.delete(key);
    this.unlockAccount(userId);

    this.logSecurityEvent({
      event: 'login_success',
      userId,
      ipAddress,
      severity: 'low',
      timestamp: new Date().toISOString()
    });
  }

  isAccountLocked(userId: string): boolean {
    return this.lockedAccounts.has(userId);
  }

  private lockAccount(userId: string): void {
    this.lockedAccounts.add(userId);
    // Auto-unlock after lockout duration
    setTimeout(() => {
      this.unlockAccount(userId);
    }, this.config.lockoutDuration * 60 * 1000);
  }

  private unlockAccount(userId: string): void {
    this.lockedAccounts.delete(userId);
    this.logSecurityEvent({
      event: 'account_unlocked',
      userId,
      severity: 'low',
      timestamp: new Date().toISOString()
    });
  }

  // Permission checking
  async checkPermission(
    userId: string, 
    resource: string, 
    action: string,
    organizationId?: string
  ): Promise<boolean> {
    try {
      // Get user profile with role information
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, organization_id')
        .eq('id', userId)
        .single();

      if (error || !profile) {
        this.logSecurityEvent({
          event: 'permission_denied',
          userId,
          severity: 'medium',
          timestamp: new Date().toISOString(),
          details: { reason: 'User profile not found', resource, action }
        });
        return false;
      }

      // Check organization access
      if (organizationId && profile.organization_id !== organizationId) {
        this.logSecurityEvent({
          event: 'permission_denied',
          userId,
          severity: 'high',
          timestamp: new Date().toISOString(),
          details: { reason: 'Organization access denied', resource, action, organizationId }
        });
        return false;
      }

      // Role-based permission checking
      const hasPermission = this.checkRolePermission(profile.role, resource, action);
      
      if (!hasPermission) {
        this.logSecurityEvent({
          event: 'permission_denied',
          userId,
          severity: 'medium',
          timestamp: new Date().toISOString(),
          details: { reason: 'Insufficient role permissions', role: profile.role, resource, action }
        });
      }

      return hasPermission;
    } catch (error) {
      errorService.reportError(error as Error, {
        component: 'SecurityService',
        action: 'checkPermission',
        severity: 'high',
        userId
      });
      return false;
    }
  }

  private checkRolePermission(role: string, resource: string, action: string): boolean {
    // Define role-based permissions
    const permissions: Record<string, Record<string, string[]>> = {
      administrator: {
        organizations: ['create', 'read', 'update', 'delete'],
        profiles: ['create', 'read', 'update', 'delete'],
        compliance_tracking: ['create', 'read', 'update', 'delete'],
        data_subject_requests: ['create', 'read', 'update', 'delete'],
        consent_records: ['create', 'read', 'update', 'delete'],
        privacy_incidents: ['create', 'read', 'update', 'delete'],
        vendor_assessments: ['create', 'read', 'update', 'delete'],
        audit_logs: ['read'],
        assessment_results: ['read', 'update'],
        training_progress: ['read', 'update']
      },
      'it-staff': {
        profiles: ['read', 'update'],
        compliance_tracking: ['read', 'update'],
        data_subject_requests: ['read', 'update'],
        consent_records: ['read'],
        privacy_incidents: ['create', 'read', 'update'],
        vendor_assessments: ['create', 'read', 'update'],
        assessment_results: ['read', 'update'],
        training_progress: ['read', 'update']
      },
      teacher: {
        profiles: ['read', 'update'],
        compliance_tracking: ['read'],
        data_subject_requests: ['read'],
        consent_records: ['read'],
        privacy_incidents: ['read'],
        assessment_results: ['read', 'create', 'update'],
        training_progress: ['read', 'create', 'update']
      },
      student: {
        profiles: ['read', 'update'],
        assessment_results: ['read', 'create', 'update'],
        training_progress: ['read', 'create', 'update']
      }
    };

    const rolePermissions = permissions[role];
    if (!rolePermissions) return false;

    const resourcePermissions = rolePermissions[resource];
    if (!resourcePermissions) return false;

    return resourcePermissions.includes(action);
  }

  // Data access logging
  async logDataAccess(
    userId: string,
    resourceType: string,
    resourceId: string,
    action: string,
    details?: Record<string, any>
  ): Promise<void> {
    if (!this.config.enableAuditLogging) return;

    try {
      await supabase
        .from('audit_logs')
        .insert([{
          user_id: userId,
          action: `data_${action}`,
          resource_type: resourceType,
          resource_id: resourceId,
          details: details || {},
          success: true,
          created_at: new Date().toISOString()
        }]);

      this.logSecurityEvent({
        event: 'data_access',
        userId,
        severity: 'low',
        timestamp: new Date().toISOString(),
        details: { resourceType, resourceId, action }
      });
    } catch (error) {
      console.error('Failed to log data access:', error);
    }
  }

  // Security event logging
  private logSecurityEvent(eventData: SecurityEventData): void {
    if (!this.config.enableAuditLogging) return;

    // Log to audit service
    auditService.log({
      action: eventData.event,
      resourceType: 'security',
      resourceId: eventData.userId || 'system',
      details: eventData.details || {},
      success: !eventData.event.includes('failure') && !eventData.event.includes('denied'),
      errorMessage: eventData.event.includes('failure') ? 'Security event' : undefined
    });

    // Log critical events to console
    if (eventData.severity === 'critical' || eventData.severity === 'high') {
      console.warn('Security Event:', eventData);
    }
  }

  // Input sanitization
  sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      return input
        .replace(/[<>]/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .replace(/['"]/g, '') // Remove quotes
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

  // Session validation
  async validateSession(userId: string): Promise<boolean> {
    try {
      const { data: session, error } = await supabase.auth.getSession();
      
      if (error || !session.session) {
        this.logSecurityEvent({
          event: 'session_timeout',
          userId,
          severity: 'medium',
          timestamp: new Date().toISOString()
        });
        return false;
      }

      // Check if session is expired
      const now = Date.now();
      const sessionCreated = new Date(session.session.created_at).getTime();
      const sessionAge = (now - sessionCreated) / (1000 * 60); // in minutes

      if (sessionAge > this.config.sessionTimeout) {
        this.logSecurityEvent({
          event: 'session_timeout',
          userId,
          severity: 'medium',
          timestamp: new Date().toISOString()
        });
        return false;
      }

      return true;
    } catch (error) {
      errorService.reportError(error as Error, {
        component: 'SecurityService',
        action: 'validateSession',
        severity: 'medium',
        userId
      });
      return false;
    }
  }

  // Get security statistics
  getSecurityStats(): {
    lockedAccounts: number;
    failedAttempts: number;
    rateLimitedIPs: number;
  } {
    return {
      lockedAccounts: this.lockedAccounts.size,
      failedAttempts: this.failedAttempts.size,
      rateLimitedIPs: this.rateLimits.size
    };
  }

  // Clear old rate limits and failed attempts
  cleanup(): void {
    const now = Date.now();
    
    // Clean up expired rate limits
    for (const [key, rateLimit] of this.rateLimits.entries()) {
      if (now > rateLimit.resetTime) {
        this.rateLimits.delete(key);
      }
    }

    // Clean up old failed attempts (older than 1 hour)
    for (const [key, attempts] of this.failedAttempts.entries()) {
      if (now - attempts.lastAttempt > 60 * 60 * 1000) {
        this.failedAttempts.delete(key);
      }
    }
  }

  // Update security configuration
  updateConfig(newConfig: Partial<SecurityConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current configuration
  getConfig(): SecurityConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const securityService = new SecurityService();

// Export types
export type { SecurityConfig, SecurityEvent, SecurityEventData };