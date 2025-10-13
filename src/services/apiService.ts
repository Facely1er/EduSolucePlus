// Comprehensive API service for EduSoluce backend operations
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';
import { complianceService } from './complianceService';
import { dataRightsService } from './dataRightsService';

// Type definitions for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Organization management
export class OrganizationService {
  async createOrganization(organizationData: {
    name: string;
    type: 'school' | 'district' | 'university' | 'college' | 'other';
    address?: Record<string, any>;
    contact_info?: Record<string, any>;
    settings?: Record<string, any>;
    compliance_settings?: Record<string, any>;
  }, userId: string): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .insert([organizationData])
        .select()
        .single();

      if (error) throw error;

      // Update user's organization_id
      await supabase
        .from('profiles')
        .update({ organization_id: data.id })
        .eq('id', userId);

      auditService.logDataAccess(userId, 'organization', data.id, 'created');
      
      return { success: true, data, message: 'Organization created successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create organization';
      errorService.reportError(error as Error, {
        component: 'OrganizationService',
        action: 'createOrganization',
        severity: 'high',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  async getOrganization(organizationId: string, userId: string): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', organizationId)
        .single();

      if (error) throw error;

      auditService.logDataAccess(userId, 'organization', organizationId, 'viewed');
      
      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch organization';
      errorService.reportError(error as Error, {
        component: 'OrganizationService',
        action: 'getOrganization',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  async updateOrganization(
    organizationId: string, 
    updates: Record<string, any>, 
    userId: string
  ): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .update(updates)
        .eq('id', organizationId)
        .select()
        .single();

      if (error) throw error;

      auditService.logDataAccess(userId, 'organization', organizationId, 'updated');
      
      return { success: true, data, message: 'Organization updated successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update organization';
      errorService.reportError(error as Error, {
        component: 'OrganizationService',
        action: 'updateOrganization',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }
}

// Consent management
export class ConsentService {
  async createConsentRecord(consentData: {
    organization_id: string;
    student_id: string;
    student_name?: string;
    parent_guardian_name?: string;
    parent_guardian_email?: string;
    consent_type: string;
    purpose: string;
    service_provider?: string;
    consent_given: boolean;
    consent_date?: string;
    expiry_date?: string;
    renewal_required?: boolean;
    applicable_regulations?: string[];
    metadata?: Record<string, any>;
  }, userId: string): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('consent_records')
        .insert([consentData])
        .select()
        .single();

      if (error) throw error;

      auditService.logDataAccess(userId, 'consent_record', data.id, 'created');
      
      return { success: true, data, message: 'Consent record created successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create consent record';
      errorService.reportError(error as Error, {
        component: 'ConsentService',
        action: 'createConsentRecord',
        severity: 'high',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  async getConsentRecords(
    organizationId: string, 
    filters?: {
      student_id?: string;
      consent_type?: string;
      purpose?: string;
      status?: 'active' | 'expired' | 'withdrawn';
    },
    userId: string
  ): Promise<ApiResponse> {
    try {
      let query = supabase
        .from('consent_records')
        .select('*')
        .eq('organization_id', organizationId);

      if (filters?.student_id) {
        query = query.eq('student_id', filters.student_id);
      }
      if (filters?.consent_type) {
        query = query.eq('consent_type', filters.consent_type);
      }
      if (filters?.purpose) {
        query = query.eq('purpose', filters.purpose);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      auditService.logDataAccess(userId, 'consent_records', organizationId, 'viewed');
      
      return { success: true, data: data || [] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch consent records';
      errorService.reportError(error as Error, {
        component: 'ConsentService',
        action: 'getConsentRecords',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  async withdrawConsent(consentId: string, userId: string): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('consent_records')
        .update({ 
          consent_given: false, 
          withdrawal_date: new Date().toISOString() 
        })
        .eq('id', consentId)
        .select()
        .single();

      if (error) throw error;

      auditService.logDataAccess(userId, 'consent_record', consentId, 'withdrawn');
      
      return { success: true, data, message: 'Consent withdrawn successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to withdraw consent';
      errorService.reportError(error as Error, {
        component: 'ConsentService',
        action: 'withdrawConsent',
        severity: 'high',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }
}

// Privacy incident management
export class IncidentService {
  async createIncident(incidentData: {
    organization_id: string;
    incident_type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    affected_individuals_count?: number;
    data_types_affected?: string[];
    discovery_date: string;
    incident_date?: string;
    applicable_regulations?: string[];
    assigned_to?: string;
  }, userId: string): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('privacy_incidents')
        .insert([incidentData])
        .select()
        .single();

      if (error) throw error;

      auditService.logIncidentReport(userId, data.id, incidentData.severity);
      
      return { success: true, data, message: 'Incident created successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create incident';
      errorService.reportError(error as Error, {
        component: 'IncidentService',
        action: 'createIncident',
        severity: 'critical',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  async getIncidents(
    organizationId: string, 
    filters?: {
      severity?: string;
      status?: string;
      incident_type?: string;
      assigned_to?: string;
    },
    userId: string
  ): Promise<ApiResponse> {
    try {
      let query = supabase
        .from('privacy_incidents')
        .select('*')
        .eq('organization_id', organizationId);

      if (filters?.severity) {
        query = query.eq('severity', filters.severity);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.incident_type) {
        query = query.eq('incident_type', filters.incident_type);
      }
      if (filters?.assigned_to) {
        query = query.eq('assigned_to', filters.assigned_to);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      auditService.logDataAccess(userId, 'privacy_incidents', organizationId, 'viewed');
      
      return { success: true, data: data || [] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch incidents';
      errorService.reportError(error as Error, {
        component: 'IncidentService',
        action: 'getIncidents',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  async updateIncident(
    incidentId: string, 
    updates: Record<string, any>, 
    userId: string
  ): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('privacy_incidents')
        .update(updates)
        .eq('id', incidentId)
        .select()
        .single();

      if (error) throw error;

      auditService.logDataAccess(userId, 'privacy_incident', incidentId, 'updated');
      
      return { success: true, data, message: 'Incident updated successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update incident';
      errorService.reportError(error as Error, {
        component: 'IncidentService',
        action: 'updateIncident',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }
}

// Vendor assessment management
export class VendorService {
  async createVendorAssessment(assessmentData: {
    organization_id: string;
    vendor_name: string;
    vendor_contact?: string;
    service_description: string;
    data_types_processed?: string[];
    compliance_framework: string;
    assessment_date: string;
    assessor_id?: string;
    overall_score?: number;
    security_score?: number;
    privacy_score?: number;
    compliance_score?: number;
    findings?: Record<string, any>;
    recommendations?: any[];
    next_assessment_date?: string;
  }, userId: string): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('vendor_assessments')
        .insert([assessmentData])
        .select()
        .single();

      if (error) throw error;

      auditService.logVendorAssessment(userId, data.id, assessmentData.overall_score || 0);
      
      return { success: true, data, message: 'Vendor assessment created successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create vendor assessment';
      errorService.reportError(error as Error, {
        component: 'VendorService',
        action: 'createVendorAssessment',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  async getVendorAssessments(
    organizationId: string, 
    filters?: {
      status?: string;
      vendor_name?: string;
      compliance_framework?: string;
    },
    userId: string
  ): Promise<ApiResponse> {
    try {
      let query = supabase
        .from('vendor_assessments')
        .select('*')
        .eq('organization_id', organizationId);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.vendor_name) {
        query = query.ilike('vendor_name', `%${filters.vendor_name}%`);
      }
      if (filters?.compliance_framework) {
        query = query.eq('compliance_framework', filters.compliance_framework);
      }

      const { data, error } = await query.order('assessment_date', { ascending: false });

      if (error) throw error;

      auditService.logDataAccess(userId, 'vendor_assessments', organizationId, 'viewed');
      
      return { success: true, data: data || [] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch vendor assessments';
      errorService.reportError(error as Error, {
        component: 'VendorService',
        action: 'getVendorAssessments',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }
}

// Notification preferences management
export class NotificationService {
  async getNotificationPreferences(userId: string): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return { success: true, data: data || null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch notification preferences';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'getNotificationPreferences',
        severity: 'low',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  async updateNotificationPreferences(
    preferences: {
      email_notifications?: boolean;
      push_notifications?: boolean;
      compliance_alerts?: boolean;
      incident_alerts?: boolean;
      deadline_reminders?: boolean;
      weekly_digest?: boolean;
      preferences?: Record<string, any>;
    },
    userId: string
  ): Promise<ApiResponse> {
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .upsert([{
          user_id: userId,
          ...preferences
        }])
        .select()
        .single();

      if (error) throw error;

      auditService.logDataAccess(userId, 'notification_preferences', userId, 'updated');
      
      return { success: true, data, message: 'Notification preferences updated successfully' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update notification preferences';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'updateNotificationPreferences',
        severity: 'low',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }
}

// Main API service that combines all services
export class ApiService {
  public organizations: OrganizationService;
  public consent: ConsentService;
  public incidents: IncidentService;
  public vendors: VendorService;
  public notifications: NotificationService;
  public compliance: typeof complianceService;
  public dataRights: typeof dataRightsService;

  constructor() {
    this.organizations = new OrganizationService();
    this.consent = new ConsentService();
    this.incidents = new IncidentService();
    this.vendors = new VendorService();
    this.notifications = new NotificationService();
    this.compliance = complianceService;
    this.dataRights = dataRightsService;
  }

  // Health check endpoint
  async healthCheck(): Promise<ApiResponse> {
    try {
      const { error } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      if (error) throw error;

      return { 
        success: true, 
        data: { 
          status: 'healthy', 
          timestamp: new Date().toISOString(),
          database: 'connected'
        } 
      };
    } catch {
      return { 
        success: false, 
        error: 'Health check failed',
        data: { 
          status: 'unhealthy', 
          timestamp: new Date().toISOString(),
          database: 'disconnected'
        }
      };
    }
  }

  // Get dashboard statistics
  async getDashboardStats(organizationId: string, userId: string): Promise<ApiResponse> {
    try {
      const [
        complianceMetrics,
        requestStats,
        incidentStats,
        vendorStats
      ] = await Promise.all([
        this.compliance.getComplianceMetrics(organizationId),
        this.dataRights.getRequestStatistics(organizationId),
        this.incidents.getIncidents(organizationId, {}, userId),
        this.vendors.getVendorAssessments(organizationId, {}, userId)
      ]);

      const stats = {
        compliance: complianceMetrics,
        dataRights: requestStats,
        incidents: {
          total: incidentStats.data?.length || 0,
          critical: incidentStats.data?.filter((i: any) => i.severity === 'critical').length || 0,
          open: incidentStats.data?.filter((i: any) => i.status === 'open').length || 0
        },
        vendors: {
          total: vendorStats.data?.length || 0,
          pending: vendorStats.data?.filter((v: any) => v.status === 'pending').length || 0,
          completed: vendorStats.data?.filter((v: any) => v.status === 'completed').length || 0
        }
      };

      return { success: true, data: stats };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard stats';
      errorService.reportError(error as Error, {
        component: 'ApiService',
        action: 'getDashboardStats',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();