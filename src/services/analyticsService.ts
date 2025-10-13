// Analytics service for privacy compliance metrics and reporting
import { supabase } from '../lib/supabase';
import { errorService } from './errorService';

export interface AnalyticsMetric {
  id: string;
  organization_id: string;
  metric_type: string;
  metric_name: string;
  value: number;
  dimensions: Record<string, string>;
  timestamp: string;
  created_at: string;
}

export interface ComplianceScore {
  organization_id: string;
  overall_score: number;
  ferpa_score: number;
  coppa_score: number;
  gdpr_score: number;
  ccpa_score: number;
  last_updated: string;
}

export interface UserEngagement {
  user_id: string;
  organization_id: string;
  total_sessions: number;
  total_time_spent: number; // in minutes
  assessments_completed: number;
  training_modules_completed: number;
  last_activity: string;
}

export interface PrivacyIncidentMetrics {
  organization_id: string;
  total_incidents: number;
  incidents_by_severity: Record<string, number>;
  incidents_by_type: Record<string, number>;
  average_resolution_time: number; // in days
  incidents_this_month: number;
  incidents_last_month: number;
  trend: number; // percentage change
}

export interface TrainingMetrics {
  organization_id: string;
  total_modules: number;
  completed_modules: number;
  completion_rate: number;
  average_score: number;
  total_training_hours: number;
  users_trained: number;
  top_performing_modules: string[];
}

class AnalyticsService {
  // Record analytics metric
  async recordMetric(
    organizationId: string,
    metricType: string,
    metricName: string,
    value: number,
    dimensions: Record<string, string> = {}
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('analytics_metrics')
        .insert([{
          organization_id: organizationId,
          metric_type: metricType,
          metric_name: metricName,
          value: value,
          dimensions: dimensions,
          timestamp: new Date().toISOString(),
          created_at: new Date().toISOString()
        }]);

      if (error) {
        throw error;
      }
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'recordMetric', 
        organizationId, 
        metricType, 
        metricName 
      });
      throw error;
    }
  }

  // Get compliance score
  async getComplianceScore(organizationId: string): Promise<ComplianceScore | null> {
    try {
      const { data, error } = await supabase
        .from('compliance_scores')
        .select('*')
        .eq('organization_id', organizationId)
        .order('last_updated', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw error;
      }

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getComplianceScore', 
        organizationId 
      });
      throw error;
    }
  }

  // Update compliance score
  async updateComplianceScore(scoreData: Omit<ComplianceScore, 'last_updated'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('compliance_scores')
        .upsert([{
          ...scoreData,
          last_updated: new Date().toISOString()
        }]);

      if (error) {
        throw error;
      }
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'updateComplianceScore', 
        organizationId: scoreData.organization_id 
      });
      throw error;
    }
  }

  // Get user engagement metrics
  async getUserEngagement(organizationId: string, userId?: string): Promise<UserEngagement[]> {
    try {
      let query = supabase
        .from('user_engagement')
        .select('*')
        .eq('organization_id', organizationId);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query.order('last_activity', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getUserEngagement', 
        organizationId 
      });
      throw error;
    }
  }

  // Update user engagement
  async updateUserEngagement(
    userId: string,
    organizationId: string,
    updates: Partial<UserEngagement>
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_engagement')
        .upsert([{
          user_id: userId,
          organization_id: organizationId,
          ...updates,
          last_activity: new Date().toISOString()
        }]);

      if (error) {
        throw error;
      }
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'updateUserEngagement', 
        userId, 
        organizationId 
      });
      throw error;
    }
  }

  // Get privacy incident metrics
  async getPrivacyIncidentMetrics(organizationId: string): Promise<PrivacyIncidentMetrics | null> {
    try {
      const { data: incidents, error } = await supabase
        .from('privacy_incidents')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) {
        throw error;
      }

      if (!incidents || incidents.length === 0) {
        return {
          organization_id: organizationId,
          total_incidents: 0,
          incidents_by_severity: {},
          incidents_by_type: {},
          average_resolution_time: 0,
          incidents_this_month: 0,
          incidents_last_month: 0,
          trend: 0
        };
      }

      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

      const incidentsThisMonth = incidents.filter(i => 
        new Date(i.created_at) >= thisMonth
      ).length;

      const incidentsLastMonth = incidents.filter(i => 
        new Date(i.created_at) >= lastMonth && new Date(i.created_at) <= lastMonthEnd
      ).length;

      const incidentsBySeverity = incidents.reduce((acc, incident) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const incidentsByType = incidents.reduce((acc, incident) => {
        acc[incident.incident_type] = (acc[incident.incident_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const resolvedIncidents = incidents.filter(i => 
        i.status === 'resolved' && i.resolved_at
      );

      const averageResolutionTime = resolvedIncidents.length > 0
        ? resolvedIncidents.reduce((sum, incident) => {
            const created = new Date(incident.created_at);
            const resolved = new Date(incident.resolved_at!);
            return sum + (resolved.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
          }, 0) / resolvedIncidents.length
        : 0;

      const trend = incidentsLastMonth > 0 
        ? ((incidentsThisMonth - incidentsLastMonth) / incidentsLastMonth) * 100
        : 0;

      return {
        organization_id: organizationId,
        total_incidents: incidents.length,
        incidents_by_severity: incidentsBySeverity,
        incidents_by_type: incidentsByType,
        average_resolution_time: Math.round(averageResolutionTime * 10) / 10,
        incidents_this_month: incidentsThisMonth,
        incidents_last_month: incidentsLastMonth,
        trend: Math.round(trend * 10) / 10
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getPrivacyIncidentMetrics', 
        organizationId 
      });
      throw error;
    }
  }

  // Get training metrics
  async getTrainingMetrics(organizationId: string): Promise<TrainingMetrics | null> {
    try {
      const { data: progress, error } = await supabase
        .from('training_progress')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) {
        throw error;
      }

      if (!progress || progress.length === 0) {
        return {
          organization_id: organizationId,
          total_modules: 0,
          completed_modules: 0,
          completion_rate: 0,
          average_score: 0,
          total_training_hours: 0,
          users_trained: 0,
          top_performing_modules: []
        };
      }

      const totalModules = progress.length;
      const completedModules = progress.filter(p => p.status === 'completed').length;
      const completionRate = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
      const totalTrainingHours = progress.reduce((sum, p) => sum + p.time_spent, 0) / 60;
      const usersTrained = new Set(progress.map(p => p.user_id)).size;

      // Calculate average score from completed modules
      const completedProgress = progress.filter(p => p.status === 'completed');
      const averageScore = completedProgress.length > 0
        ? completedProgress.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / completedProgress.length
        : 0;

      // Get top performing modules (simplified)
      const topPerformingModules: string[] = [];

      return {
        organization_id: organizationId,
        total_modules: totalModules,
        completed_modules: completedModules,
        completion_rate: Math.round(completionRate * 10) / 10,
        average_score: Math.round(averageScore * 10) / 10,
        total_training_hours: Math.round(totalTrainingHours * 10) / 10,
        users_trained: usersTrained,
        top_performing_modules: topPerformingModules
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getTrainingMetrics', 
        organizationId 
      });
      throw error;
    }
  }

  // Get dashboard metrics
  async getDashboardMetrics(organizationId: string): Promise<{
    complianceScore: number;
    activeUsers: number;
    assessmentsCompleted: number;
    trainingHours: number;
    privacyIncidents: number;
    dataRequests: number;
    recentActivity: number;
  }> {
    try {
      const [
        complianceScore,
        userEngagement,
        trainingMetrics,
        incidentMetrics
      ] = await Promise.all([
        this.getComplianceScore(organizationId),
        this.getUserEngagement(organizationId),
        this.getTrainingMetrics(organizationId),
        this.getPrivacyIncidentMetrics(organizationId)
      ]);

      const activeUsers = userEngagement.length;
      const assessmentsCompleted = userEngagement.reduce((sum, user) => sum + user.assessments_completed, 0);
      const trainingHours = trainingMetrics?.total_training_hours || 0;
      const privacyIncidents = incidentMetrics?.total_incidents || 0;

      // Get data requests count
      const { data: dataRequests, error: dataRequestsError } = await supabase
        .from('data_subject_requests')
        .select('id')
        .eq('organization_id', organizationId);

      if (dataRequestsError) {
        throw dataRequestsError;
      }

      // Get recent activity count (last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const recentActivity = userEngagement.filter(user => 
        new Date(user.last_activity) > sevenDaysAgo
      ).length;

      return {
        complianceScore: complianceScore?.overall_score || 0,
        activeUsers,
        assessmentsCompleted,
        trainingHours,
        privacyIncidents,
        dataRequests: dataRequests?.length || 0,
        recentActivity
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getDashboardMetrics', 
        organizationId 
      });
      throw error;
    }
  }

  // Get metrics by time range
  async getMetricsByTimeRange(
    organizationId: string,
    startDate: string,
    endDate: string,
    metricType?: string
  ): Promise<AnalyticsMetric[]> {
    try {
      let query = supabase
        .from('analytics_metrics')
        .select('*')
        .eq('organization_id', organizationId)
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      if (metricType) {
        query = query.eq('metric_type', metricType);
      }

      const { data, error } = await query.order('timestamp', { ascending: true });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getMetricsByTimeRange', 
        organizationId 
      });
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();