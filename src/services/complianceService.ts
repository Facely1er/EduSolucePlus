// Compliance management service for business logic
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

interface ComplianceObligation {
  id: string;
  regulation: string;
  title: string;
  description: string;
  frequency: 'annual' | 'quarterly' | 'monthly' | 'ongoing' | 'one-time';
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  responsibleRole: string;
  completionPercentage: number;
  evidenceRequired: string[];
  automationPossible: boolean;
  externalDependencies: string[];
}

interface ComplianceMetrics {
  overallScore: number;
  obligationsByStatus: Record<string, number>;
  obligationsByRegulation: Record<string, number>;
  overdueObligations: number;
  upcomingDeadlines: number;
  automationOpportunities: number;
}

class ComplianceService {
  // Calculate institutional compliance score
  async calculateComplianceScore(organizationId: string): Promise<number> {
    try {
      const { data: obligations, error } = await supabase
        .from('compliance_tracking')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) throw error;

      if (!obligations || obligations.length === 0) return 0;

      const totalObligations = obligations.length;
      const completedObligations = obligations.filter(o => o.status === 'completed').length;
      const overdueObligations = obligations.filter(o => 
        new Date(o.due_date) < new Date() && o.status !== 'completed'
      ).length;

      // Base score from completion rate
      const completionScore = (completedObligations / totalObligations) * 100;
      
      // Penalty for overdue obligations
      const overduePenalty = (overdueObligations / totalObligations) * 20;
      
      return Math.max(0, Math.round(completionScore - overduePenalty));
    } catch (error) {
      errorService.reportError(error as Error, {
        component: 'ComplianceService',
        action: 'calculateComplianceScore',
        severity: 'medium'
      });
      return 0;
    }
  }

  // Get compliance metrics for dashboard
  async getComplianceMetrics(organizationId: string): Promise<ComplianceMetrics> {
    try {
      const { data: obligations, error } = await supabase
        .from('compliance_tracking')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) throw error;

      const metrics: ComplianceMetrics = {
        overallScore: await this.calculateComplianceScore(organizationId),
        obligationsByStatus: {},
        obligationsByRegulation: {},
        overdueObligations: 0,
        upcomingDeadlines: 0,
        automationOpportunities: 0
      };

      if (obligations) {
        // Group by status
        obligations.forEach(obligation => {
          metrics.obligationsByStatus[obligation.status] = 
            (metrics.obligationsByStatus[obligation.status] || 0) + 1;
        });

        // Calculate overdue
        metrics.overdueObligations = obligations.filter(o => 
          new Date(o.due_date) < new Date() && o.status !== 'completed'
        ).length;

        // Calculate upcoming deadlines (next 30 days)
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        
        metrics.upcomingDeadlines = obligations.filter(o => 
          new Date(o.due_date) <= thirtyDaysFromNow && 
          new Date(o.due_date) >= new Date() &&
          o.status !== 'completed'
        ).length;
      }

      return metrics;
    } catch (error) {
      errorService.reportError(error as Error, {
        component: 'ComplianceService',
        action: 'getComplianceMetrics',
        severity: 'medium'
      });
      
      return {
        overallScore: 0,
        obligationsByStatus: {},
        obligationsByRegulation: {},
        overdueObligations: 0,
        upcomingDeadlines: 0,
        automationOpportunities: 0
      };
    }
  }

  // Create compliance obligation
  async createObligation(
    obligation: Omit<ComplianceObligation, 'id'>,
    userId: string
  ): Promise<{ success: boolean; data?: ComplianceObligation; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('compliance_tracking')
        .insert([{
          event_id: `manual_${Date.now()}`,
          event_title: obligation.title,
          status: obligation.status,
          due_date: obligation.dueDate,
          documentation: {
            description: obligation.description,
            priority: obligation.priority,
            responsibleRole: obligation.responsibleRole,
            evidenceRequired: obligation.evidenceRequired,
            automationPossible: obligation.automationPossible,
            externalDependencies: obligation.externalDependencies
          }
        }])
        .select()
        .single();

      if (error) throw error;

      auditService.logComplianceAction(userId, data.id, 'created');
      
      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create obligation';
      errorService.reportError(error as Error, {
        component: 'ComplianceService',
        action: 'createObligation',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Update obligation progress
  async updateObligationProgress(
    obligationId: string,
    updates: {
      status?: string;
      completionPercentage?: number;
      notes?: string;
    },
    userId: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: Partial<ComplianceObligation> = {};
      
      if (updates.status) updateData.status = updates.status;
      if (updates.notes) updateData.notes = updates.notes;
      if (updates.status === 'completed') updateData.completed_at = new Date().toISOString();
      
      // Store completion percentage in documentation
      if (updates.completionPercentage !== undefined) {
        const { data: existing } = await supabase
          .from('compliance_tracking')
          .select('documentation')
          .eq('id', obligationId)
          .single();
        
        updateData.documentation = {
          ...existing?.documentation,
          completionPercentage: updates.completionPercentage
        };
      }

      const { error } = await supabase
        .from('compliance_tracking')
        .update(updateData)
        .eq('id', obligationId);

      if (error) throw error;

      auditService.logComplianceAction(userId, obligationId, 'updated');
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update obligation';
      errorService.reportError(error as Error, {
        component: 'ComplianceService',
        action: 'updateObligationProgress',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Generate compliance report
  async generateComplianceReport(
    organizationId: string,
    format: 'summary' | 'detailed' = 'summary'
  ): Promise<{ success: boolean; data?: ComplianceReport; error?: string }> {
    try {
      const metrics = await this.getComplianceMetrics(organizationId);
      
      const { data: obligations, error } = await supabase
        .from('compliance_tracking')
        .select('*')
        .eq('organization_id', organizationId)
        .order('due_date', { ascending: true });

      if (error) throw error;

      const report = {
        generatedAt: new Date().toISOString(),
        organizationId,
        metrics,
        obligations: format === 'detailed' ? obligations : obligations?.slice(0, 10),
        recommendations: this.generateRecommendations(obligations || [], metrics)
      };

      return { success: true, data: report };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate report';
      errorService.reportError(error as Error, {
        component: 'ComplianceService',
        action: 'generateComplianceReport',
        severity: 'medium'
      });
      
      return { success: false, error: errorMessage };
    }
  }

  private generateRecommendations(obligations: ComplianceObligation[], metrics: ComplianceMetrics): string[] {
    const recommendations: string[] = [];
    
    if (metrics.overdueObligations > 0) {
      recommendations.push(`Address ${metrics.overdueObligations} overdue compliance obligations immediately`);
    }
    
    if (metrics.upcomingDeadlines > 5) {
      recommendations.push('Consider implementing automated compliance tracking for upcoming deadlines');
    }
    
    if (metrics.overallScore < 70) {
      recommendations.push('Focus on completing pending compliance obligations to improve overall score');
    }
    
    return recommendations;
  }

  // Check for deadline alerts
  async checkDeadlineAlerts(organizationId: string): Promise<{
    criticalAlerts: ComplianceObligation[];
    warningAlerts: ComplianceObligation[];
  }> {
    try {
      const { data: obligations, error } = await supabase
        .from('compliance_tracking')
        .select('*')
        .eq('organization_id', organizationId)
        .neq('status', 'completed');

      if (error) throw error;

      const now = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(now.getDate() + 7);
      
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(now.getDate() + 30);

      const criticalAlerts = obligations?.filter(o => 
        new Date(o.due_date) <= sevenDaysFromNow
      ) || [];
      
      const warningAlerts = obligations?.filter(o => 
        new Date(o.due_date) <= thirtyDaysFromNow && 
        new Date(o.due_date) > sevenDaysFromNow
      ) || [];

      return { criticalAlerts, warningAlerts };
    } catch (error) {
      errorService.reportError(error as Error, {
        component: 'ComplianceService',
        action: 'checkDeadlineAlerts',
        severity: 'low'
      });
      
      return { criticalAlerts: [], warningAlerts: [] };
    }
  }
}

export const complianceService = new ComplianceService();