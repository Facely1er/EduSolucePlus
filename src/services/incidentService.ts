// Incident management service for privacy and security incidents
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

export interface PrivacyIncident {
  id: string;
  title: string;
  description: string;
  incident_type: 'data_breach' | 'unauthorized_access' | 'data_loss' | 'system_compromise' | 'privacy_violation' | 'consent_violation' | 'vendor_incident';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'under_investigation' | 'contained' | 'resolved' | 'closed';
  reported_by: string;
  assigned_to?: string;
  organization_id: string;
  affected_individuals: number;
  data_types_affected: string[];
  potential_impact: string;
  immediate_actions: string[];
  regulatory_notifications: string[];
  internal_notifications: string[];
  evidence_collected: string[];
  timeline: IncidentTimelineEntry[];
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

export interface IncidentTimelineEntry {
  id: string;
  incident_id: string;
  timestamp: string;
  action: string;
  description: string;
  performed_by: string;
  evidence?: string;
}

export interface IncidentReport {
  id: string;
  incident_id: string;
  report_type: 'initial' | 'update' | 'final';
  content: string;
  attachments: string[];
  created_by: string;
  created_at: string;
}

class IncidentService {
  // Create new incident
  async createIncident(incidentData: Omit<PrivacyIncident, 'id' | 'created_at' | 'updated_at'>): Promise<PrivacyIncident> {
    try {
      const { data, error } = await supabase
        .from('privacy_incidents')
        .insert([{
          ...incidentData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log incident creation
      auditService.logIncidentCreation(incidentData.reported_by, data.id, incidentData.organization_id);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'createIncident', 
        organizationId: incidentData.organization_id 
      });
      throw error;
    }
  }

  // Get incidents for organization
  async getIncidents(organizationId: string, status?: string): Promise<PrivacyIncident[]> {
    try {
      let query = supabase
        .from('privacy_incidents')
        .select('*')
        .eq('organization_id', organizationId);

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getIncidents', 
        organizationId 
      });
      throw error;
    }
  }

  // Get incident by ID
  async getIncident(id: string): Promise<PrivacyIncident | null> {
    try {
      const { data, error } = await supabase
        .from('privacy_incidents')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw error;
      }

      return data;
    } catch (error) {
      errorService.logError(error as Error, { context: 'getIncident', incidentId: id });
      throw error;
    }
  }

  // Update incident
  async updateIncident(id: string, updates: Partial<PrivacyIncident>): Promise<PrivacyIncident> {
    try {
      const { data, error } = await supabase
        .from('privacy_incidents')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log incident update
      auditService.logIncidentUpdate(updates.assigned_to || 'system', id, updates.organization_id);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'updateIncident', 
        incidentId: id 
      });
      throw error;
    }
  }

  // Add timeline entry
  async addTimelineEntry(incidentId: string, entry: Omit<IncidentTimelineEntry, 'id' | 'incident_id'>): Promise<IncidentTimelineEntry> {
    try {
      const { data, error } = await supabase
        .from('incident_timeline')
        .insert([{
          ...entry,
          incident_id: incidentId
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'addTimelineEntry', 
        incidentId 
      });
      throw error;
    }
  }

  // Get incident timeline
  async getIncidentTimeline(incidentId: string): Promise<IncidentTimelineEntry[]> {
    try {
      const { data, error } = await supabase
        .from('incident_timeline')
        .select('*')
        .eq('incident_id', incidentId)
        .order('timestamp', { ascending: true });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getIncidentTimeline', 
        incidentId 
      });
      throw error;
    }
  }

  // Create incident report
  async createReport(incidentId: string, reportData: Omit<IncidentReport, 'id' | 'incident_id' | 'created_at'>): Promise<IncidentReport> {
    try {
      const { data, error } = await supabase
        .from('incident_reports')
        .insert([{
          ...reportData,
          incident_id: incidentId,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'createReport', 
        incidentId 
      });
      throw error;
    }
  }

  // Get incident reports
  async getIncidentReports(incidentId: string): Promise<IncidentReport[]> {
    try {
      const { data, error } = await supabase
        .from('incident_reports')
        .select('*')
        .eq('incident_id', incidentId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getIncidentReports', 
        incidentId 
      });
      throw error;
    }
  }

  // Get incident statistics
  async getIncidentStats(organizationId: string): Promise<{
    totalIncidents: number;
    incidentsByStatus: Record<string, number>;
    incidentsBySeverity: Record<string, number>;
    incidentsByType: Record<string, number>;
    averageResolutionTime: number; // in days
    openIncidents: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('privacy_incidents')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) {
        throw error;
      }

      const incidents = data || [];
      const totalIncidents = incidents.length;
      
      const incidentsByStatus = incidents.reduce((acc, incident) => {
        acc[incident.status] = (acc[incident.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const incidentsBySeverity = incidents.reduce((acc, incident) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const incidentsByType = incidents.reduce((acc, incident) => {
        acc[incident.incident_type] = (acc[incident.incident_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const resolvedIncidents = incidents.filter(i => i.status === 'resolved' && i.resolved_at);
      const averageResolutionTime = resolvedIncidents.length > 0
        ? resolvedIncidents.reduce((sum, incident) => {
            const created = new Date(incident.created_at);
            const resolved = new Date(incident.resolved_at!);
            return sum + (resolved.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
          }, 0) / resolvedIncidents.length
        : 0;

      const openIncidents = incidents.filter(i => 
        ['reported', 'under_investigation', 'contained'].includes(i.status)
      ).length;

      return {
        totalIncidents,
        incidentsByStatus,
        incidentsBySeverity,
        incidentsByType,
        averageResolutionTime: Math.round(averageResolutionTime * 10) / 10,
        openIncidents
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getIncidentStats', 
        organizationId 
      });
      throw error;
    }
  }

  // Escalate incident
  async escalateIncident(id: string, reason: string, escalatedBy: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('privacy_incidents')
        .update({
          severity: 'critical',
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Add timeline entry
      await this.addTimelineEntry(id, {
        timestamp: new Date().toISOString(),
        action: 'escalated',
        description: `Incident escalated: ${reason}`,
        performed_by: escalatedBy
      });

      // Log escalation
      auditService.logIncidentEscalation(escalatedBy, id);
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'escalateIncident', 
        incidentId: id 
      });
      throw error;
    }
  }
}

export const incidentService = new IncidentService();