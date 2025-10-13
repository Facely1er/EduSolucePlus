// Data rights execution service for GDPR, CCPA, and other privacy regulations
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';
import { dataSubjectRequestSchema } from '../utils/validation';

interface DataSubjectRequest {
  id: string;
  requestType: 'access' | 'rectification' | 'erasure' | 'portability' | 'objection' | 'restriction' | 'opt_out' | 'consent_withdrawal' | 'directory_opt_out';
  requesterName: string;
  requesterEmail: string;
  requesterRelationship?: 'parent' | 'guardian' | 'student' | 'representative';
  studentIdentifier?: string;
  requestDetails: Record<string, string | number | boolean>;
  applicableRegulations: string[];
  status: 'submitted' | 'under_review' | 'in_progress' | 'completed' | 'rejected' | 'partially_fulfilled';
  submittedAt: string;
  dueDate: string;
  completedAt?: string;
  assignedTo?: string;
  notes?: string;
  responseData?: Record<string, string | number | boolean>;
}

class DataRightsService {
  // Submit new data subject request
  async submitRequest(
    requestData: Omit<DataSubjectRequest, 'id' | 'submittedAt' | 'dueDate' | 'status'>,
    organizationId: string,
    submitterId?: string
  ): Promise<{ success: boolean; data?: DataSubjectRequest; error?: string }> {
    try {
      // Validate request data
      const validation = dataSubjectRequestSchema.safeParse(requestData);
      if (!validation.success) {
        const errors = validation.error.errors.map(e => e.message).join(', ');
        return { success: false, error: `Validation failed: ${errors}` };
      }

      // Calculate due date based on request type and applicable regulations
      const dueDate = this.calculateDueDate(requestData.requestType, requestData.applicableRegulations);
      
      const { data, error } = await supabase
        .from('data_subject_requests')
        .insert([{
          organization_id: organizationId,
          user_id: submitterId,
          request_type: requestData.requestType,
          requester_name: requestData.requesterName,
          requester_email: requestData.requesterEmail,
          requester_relationship: requestData.requesterRelationship,
          student_identifier: requestData.studentIdentifier,
          request_details: requestData.requestDetails,
          applicable_regulations: requestData.applicableRegulations,
          status: 'submitted',
          due_date: dueDate,
          submitted_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Log the request submission
      auditService.logPrivacyRequest(
        submitterId || 'anonymous',
        requestData.requestType,
        data.id
      );

      // Send confirmation email (in production)
      await this.sendConfirmationEmail(requestData.requesterEmail, data.id);

      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit request';
      errorService.reportError(error as Error, {
        component: 'DataRightsService',
        action: 'submitRequest',
        severity: 'high'
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Process data subject request
  async processRequest(
    requestId: string,
    processingData: {
      status: string;
      responseData?: Record<string, unknown>;
      notes?: string;
      assignedTo?: string;
    },
    processedBy: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: Record<string, string | number | boolean> = {
        status: processingData.status,
        assigned_to: processingData.assignedTo,
        notes: processingData.notes,
        updated_at: new Date().toISOString()
      };

      if (processingData.responseData) {
        updateData.response_data = processingData.responseData;
      }

      if (processingData.status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('data_subject_requests')
        .update(updateData)
        .eq('id', requestId);

      if (error) throw error;

      auditService.logDataAccess(processedBy, 'data_subject_request', requestId, 'processed');

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
      errorService.reportError(error as Error, {
        component: 'DataRightsService',
        action: 'processRequest',
        severity: 'high'
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Get requests by organization with filtering
  async getRequests(
    organizationId: string,
    filters?: {
      status?: string;
      requestType?: string;
      assignedTo?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{ success: boolean; data?: DataSubjectRequest[]; error?: string }> {
    try {
      let query = supabase
        .from('data_subject_requests')
        .select('*')
        .eq('organization_id', organizationId);

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters?.requestType) {
        query = query.eq('request_type', filters.requestType);
      }
      
      if (filters?.assignedTo) {
        query = query.eq('assigned_to', filters.assignedTo);
      }
      
      if (filters?.startDate) {
        query = query.gte('submitted_at', filters.startDate);
      }
      
      if (filters?.endDate) {
        query = query.lte('submitted_at', filters.endDate);
      }

      const { data, error } = await query.order('submitted_at', { ascending: false });

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch requests';
      errorService.reportError(error as Error, {
        component: 'DataRightsService',
        action: 'getRequests',
        severity: 'medium'
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Calculate due date based on regulation requirements
  private calculateDueDate(requestType: string, regulations: string[]): string {
    const now = new Date();
    let maxDays = 30; // Default

    // FERPA: 45 days for access requests
    if (regulations.includes('ferpa') && requestType === 'access') {
      maxDays = 45;
    }
    
    // GDPR: 1 month (30 days) for most requests
    if (regulations.includes('gdpr')) {
      maxDays = 30;
    }
    
    // CCPA: 45 days for access, 30 days for deletion
    if (regulations.includes('ccpa')) {
      maxDays = requestType === 'access' ? 45 : 30;
    }

    // Use the longest timeline if multiple regulations apply
    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + maxDays);
    
    return dueDate.toISOString();
  }

  // Send confirmation email (mock implementation for development)
  private async sendConfirmationEmail(email: string, requestId: string): Promise<void> {
    try {
      // In production, integrate with email service
      console.log(`Sending confirmation email to ${email} for request ${requestId}`);
      
      // For now, just log the action
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }
  }

  // Get request statistics for dashboard
  async getRequestStatistics(organizationId: string): Promise<{
    totalRequests: number;
    requestsByType: Record<string, number>;
    requestsByStatus: Record<string, number>;
    averageResponseTime: number;
    overdueRequests: number;
  }> {
    try {
      const { data: requests, error } = await supabase
        .from('data_subject_requests')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) throw error;

      if (!requests || requests.length === 0) {
        return {
          totalRequests: 0,
          requestsByType: {},
          requestsByStatus: {},
          averageResponseTime: 0,
          overdueRequests: 0
        };
      }

      const requestsByType = requests.reduce((acc, req) => {
        acc[req.request_type] = (acc[req.request_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const requestsByStatus = requests.reduce((acc, req) => {
        acc[req.status] = (acc[req.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const overdueRequests = requests.filter(req => 
        new Date(req.due_date) < new Date() && req.status !== 'completed'
      ).length;

      // Calculate average response time for completed requests
      const completedRequests = requests.filter(req => req.completed_at);
      const averageResponseTime = completedRequests.length > 0 
        ? completedRequests.reduce((acc, req) => {
            const submitted = new Date(req.submitted_at);
            const completed = new Date(req.completed_at!);
            return acc + (completed.getTime() - submitted.getTime());
          }, 0) / completedRequests.length / (1000 * 60 * 60 * 24) // Convert to days
        : 0;

      return {
        totalRequests: requests.length,
        requestsByType,
        requestsByStatus,
        averageResponseTime: Math.round(averageResponseTime * 10) / 10,
        overdueRequests
      };
    } catch (error) {
      errorService.reportError(error as Error, {
        component: 'DataRightsService',
        action: 'getRequestStatistics',
        severity: 'low'
      });
      
      return {
        totalRequests: 0,
        requestsByType: {},
        requestsByStatus: {},
        averageResponseTime: 0,
        overdueRequests: 0
      };
    }
  }
}

export const dataRightsService = new DataRightsService();