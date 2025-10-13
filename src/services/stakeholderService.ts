// Stakeholder management service for privacy compliance
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

export interface Stakeholder {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'parent' | 'guardian' | 'student' | 'staff' | 'administrator' | 'external';
  organization_id: string;
  student_connections?: string[]; // Array of student IDs
  permissions: string[];
  access_level: 'read' | 'write' | 'admin';
  status: 'active' | 'suspended' | 'pending' | 'inactive';
  last_access?: string;
  created_at: string;
  updated_at: string;
}

export interface StakeholderAccess {
  id: string;
  stakeholder_id: string;
  resource_type: 'student_records' | 'assessment_results' | 'training_progress' | 'privacy_portal' | 'reports';
  resource_id: string;
  access_level: 'read' | 'write' | 'admin';
  granted_by: string;
  granted_at: string;
  expires_at?: string;
  is_active: boolean;
}

export interface StakeholderActivity {
  id: string;
  stakeholder_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
}

class StakeholderService {
  // Create stakeholder
  async createStakeholder(stakeholderData: Omit<Stakeholder, 'id' | 'created_at' | 'updated_at'>): Promise<Stakeholder> {
    try {
      const { data, error } = await supabase
        .from('stakeholders')
        .insert([{
          ...stakeholderData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log stakeholder creation
      auditService.logStakeholderCreation(stakeholderData.organization_id, data.id);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'createStakeholder', 
        organizationId: stakeholderData.organization_id 
      });
      throw error;
    }
  }

  // Get stakeholders for organization
  async getStakeholders(organizationId: string, role?: string, status?: string): Promise<Stakeholder[]> {
    try {
      let query = supabase
        .from('stakeholders')
        .select('*')
        .eq('organization_id', organizationId);

      if (role) {
        query = query.eq('role', role);
      }

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
        context: 'getStakeholders', 
        organizationId 
      });
      throw error;
    }
  }

  // Get stakeholder by ID
  async getStakeholder(id: string): Promise<Stakeholder | null> {
    try {
      const { data, error } = await supabase
        .from('stakeholders')
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
      errorService.logError(error as Error, { context: 'getStakeholder', stakeholderId: id });
      throw error;
    }
  }

  // Update stakeholder
  async updateStakeholder(id: string, updates: Partial<Stakeholder>): Promise<Stakeholder> {
    try {
      const { data, error } = await supabase
        .from('stakeholders')
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

      // Log stakeholder update
      auditService.logStakeholderUpdate(data.organization_id, id);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'updateStakeholder', 
        stakeholderId: id 
      });
      throw error;
    }
  }

  // Grant access to stakeholder
  async grantAccess(accessData: Omit<StakeholderAccess, 'id' | 'granted_at'>): Promise<StakeholderAccess> {
    try {
      const { data, error } = await supabase
        .from('stakeholder_access')
        .insert([{
          ...accessData,
          granted_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log access grant
      auditService.logAccessGrant(accessData.stakeholder_id, accessData.resource_type, accessData.resource_id);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'grantAccess', 
        stakeholderId: accessData.stakeholder_id 
      });
      throw error;
    }
  }

  // Revoke access from stakeholder
  async revokeAccess(accessId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('stakeholder_access')
        .update({
          is_active: false
        })
        .eq('id', accessId);

      if (error) {
        throw error;
      }

      // Log access revocation
      auditService.logAccessRevocation(accessId);
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'revokeAccess', 
        accessId 
      });
      throw error;
    }
  }

  // Get stakeholder access
  async getStakeholderAccess(stakeholderId: string): Promise<StakeholderAccess[]> {
    try {
      const { data, error } = await supabase
        .from('stakeholder_access')
        .select('*')
        .eq('stakeholder_id', stakeholderId)
        .eq('is_active', true)
        .order('granted_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getStakeholderAccess', 
        stakeholderId 
      });
      throw error;
    }
  }

  // Log stakeholder activity
  async logActivity(activityData: Omit<StakeholderActivity, 'id' | 'timestamp'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('stakeholder_activity')
        .insert([{
          ...activityData,
          timestamp: new Date().toISOString()
        }]);

      if (error) {
        throw error;
      }
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'logActivity', 
        stakeholderId: activityData.stakeholder_id 
      });
      throw error;
    }
  }

  // Get stakeholder activity
  async getStakeholderActivity(stakeholderId: string, limit: number = 50): Promise<StakeholderActivity[]> {
    try {
      const { data, error } = await supabase
        .from('stakeholder_activity')
        .select('*')
        .eq('stakeholder_id', stakeholderId)
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getStakeholderActivity', 
        stakeholderId 
      });
      throw error;
    }
  }

  // Get stakeholder statistics
  async getStakeholderStats(organizationId: string): Promise<{
    totalStakeholders: number;
    stakeholdersByRole: Record<string, number>;
    stakeholdersByStatus: Record<string, number>;
    activeStakeholders: number;
    recentActivity: number;
    accessGrants: number;
    accessRevocations: number;
  }> {
    try {
      const { data: stakeholders, error: stakeholdersError } = await supabase
        .from('stakeholders')
        .select('*')
        .eq('organization_id', organizationId);

      if (stakeholdersError) {
        throw stakeholdersError;
      }

      const { data: access, error: accessError } = await supabase
        .from('stakeholder_access')
        .select('*')
        .eq('organization_id', organizationId);

      if (accessError) {
        throw accessError;
      }

      const { data: activity, error: activityError } = await supabase
        .from('stakeholder_activity')
        .select('*')
        .eq('organization_id', organizationId);

      if (activityError) {
        throw activityError;
      }

      const stakeholderList = stakeholders || [];
      const accessList = access || [];
      const activityList = activity || [];

      const totalStakeholders = stakeholderList.length;
      
      const stakeholdersByRole = stakeholderList.reduce((acc, stakeholder) => {
        acc[stakeholder.role] = (acc[stakeholder.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const stakeholdersByStatus = stakeholderList.reduce((acc, stakeholder) => {
        acc[stakeholder.status] = (acc[stakeholder.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const activeStakeholders = stakeholderList.filter(s => s.status === 'active').length;

      // Recent activity (last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const recentActivity = activityList.filter(a => 
        new Date(a.timestamp) > thirtyDaysAgo
      ).length;

      const accessGrants = accessList.filter(a => a.is_active).length;
      const accessRevocations = accessList.filter(a => !a.is_active).length;

      return {
        totalStakeholders,
        stakeholdersByRole,
        stakeholdersByStatus,
        activeStakeholders,
        recentActivity,
        accessGrants,
        accessRevocations
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getStakeholderStats', 
        organizationId 
      });
      throw error;
    }
  }

  // Suspend stakeholder
  async suspendStakeholder(id: string, reason: string, suspendedBy: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('stakeholders')
        .update({
          status: 'suspended',
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Revoke all active access
      await supabase
        .from('stakeholder_access')
        .update({
          is_active: false
        })
        .eq('stakeholder_id', id)
        .eq('is_active', true);

      // Log suspension
      auditService.logStakeholderSuspension(suspendedBy, id, reason);
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'suspendStakeholder', 
        stakeholderId: id 
      });
      throw error;
    }
  }

  // Reactivate stakeholder
  async reactivateStakeholder(id: string, reactivatedBy: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('stakeholders')
        .update({
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Log reactivation
      auditService.logStakeholderReactivation(reactivatedBy, id);
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'reactivateStakeholder', 
        stakeholderId: id 
      });
      throw error;
    }
  }
}

export const stakeholderService = new StakeholderService();