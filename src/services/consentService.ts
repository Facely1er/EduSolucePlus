// Consent management service for privacy compliance
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

export interface ConsentRecord {
  id: string;
  individual_id: string;
  individual_type: 'student' | 'parent' | 'guardian' | 'staff';
  consent_type: 'data_collection' | 'data_processing' | 'data_sharing' | 'marketing' | 'research' | 'directory_information';
  purpose: string;
  data_categories: string[];
  processing_activities: string[];
  third_parties: string[];
  consent_method: 'explicit' | 'implied' | 'opt_in' | 'opt_out';
  consent_status: 'active' | 'withdrawn' | 'expired' | 'pending';
  given_at: string;
  withdrawn_at?: string;
  expires_at?: string;
  organization_id: string;
  evidence: string[];
  created_at: string;
  updated_at: string;
}

export interface ConsentTemplate {
  id: string;
  name: string;
  description: string;
  consent_type: ConsentRecord['consent_type'];
  purpose: string;
  data_categories: string[];
  processing_activities: string[];
  third_parties: string[];
  consent_method: ConsentRecord['consent_method'];
  default_expiry_days?: number;
  is_active: boolean;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export interface ConsentWithdrawal {
  id: string;
  consent_id: string;
  individual_id: string;
  withdrawal_reason?: string;
  withdrawal_method: 'online' | 'phone' | 'email' | 'mail' | 'in_person';
  processed_by?: string;
  processed_at: string;
  organization_id: string;
}

class ConsentService {
  // Create consent record
  async createConsent(consentData: Omit<ConsentRecord, 'id' | 'created_at' | 'updated_at'>): Promise<ConsentRecord> {
    try {
      const { data, error } = await supabase
        .from('consent_records')
        .insert([{
          ...consentData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log consent creation
      auditService.logConsentCreation(consentData.individual_id, data.id, consentData.organization_id);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'createConsent', 
        organizationId: consentData.organization_id 
      });
      throw error;
    }
  }

  // Get consent records for individual
  async getConsentRecords(individualId: string, organizationId: string): Promise<ConsentRecord[]> {
    try {
      const { data, error } = await supabase
        .from('consent_records')
        .select('*')
        .eq('individual_id', individualId)
        .eq('organization_id', organizationId)
        .order('given_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getConsentRecords', 
        individualId, 
        organizationId 
      });
      throw error;
    }
  }

  // Get active consent records
  async getActiveConsentRecords(organizationId: string, consentType?: string): Promise<ConsentRecord[]> {
    try {
      let query = supabase
        .from('consent_records')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('consent_status', 'active');

      if (consentType) {
        query = query.eq('consent_type', consentType);
      }

      const { data, error } = await query.order('given_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getActiveConsentRecords', 
        organizationId 
      });
      throw error;
    }
  }

  // Withdraw consent
  async withdrawConsent(
    consentId: string, 
    individualId: string, 
    organizationId: string,
    withdrawalData: Omit<ConsentWithdrawal, 'id' | 'consent_id' | 'individual_id' | 'organization_id' | 'processed_at'>
  ): Promise<ConsentWithdrawal> {
    try {
      // Update consent record
      const { error: updateError } = await supabase
        .from('consent_records')
        .update({
          consent_status: 'withdrawn',
          withdrawn_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', consentId);

      if (updateError) {
        throw updateError;
      }

      // Create withdrawal record
      const { data, error } = await supabase
        .from('consent_withdrawals')
        .insert([{
          ...withdrawalData,
          consent_id: consentId,
          individual_id: individualId,
          organization_id: organizationId,
          processed_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log consent withdrawal
      auditService.logConsentWithdrawal(individualId, consentId, organizationId);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'withdrawConsent', 
        consentId, 
        individualId, 
        organizationId 
      });
      throw error;
    }
  }

  // Create consent template
  async createTemplate(templateData: Omit<ConsentTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<ConsentTemplate> {
    try {
      const { data, error } = await supabase
        .from('consent_templates')
        .insert([{
          ...templateData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'createTemplate', 
        organizationId: templateData.organization_id 
      });
      throw error;
    }
  }

  // Get consent templates
  async getTemplates(organizationId: string): Promise<ConsentTemplate[]> {
    try {
      const { data, error } = await supabase
        .from('consent_templates')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getTemplates', 
        organizationId 
      });
      throw error;
    }
  }

  // Check consent validity
  async checkConsentValidity(
    individualId: string, 
    organizationId: string, 
    consentType: string,
    dataCategories: string[]
  ): Promise<{
    hasValidConsent: boolean;
    consentRecord?: ConsentRecord;
    missingConsent: string[];
  }> {
    try {
      const { data, error } = await supabase
        .from('consent_records')
        .select('*')
        .eq('individual_id', individualId)
        .eq('organization_id', organizationId)
        .eq('consent_type', consentType)
        .eq('consent_status', 'active');

      if (error) {
        throw error;
      }

      const consentRecords = data || [];
      
      if (consentRecords.length === 0) {
        return {
          hasValidConsent: false,
          missingConsent: dataCategories
        };
      }

      // Check if consent covers all required data categories
      const coveredCategories = new Set<string>();
      consentRecords.forEach(record => {
        record.data_categories.forEach(category => {
          coveredCategories.add(category);
        });
      });

      const missingConsent = dataCategories.filter(category => 
        !coveredCategories.has(category)
      );

      return {
        hasValidConsent: missingConsent.length === 0,
        consentRecord: consentRecords[0],
        missingConsent
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'checkConsentValidity', 
        individualId, 
        organizationId 
      });
      throw error;
    }
  }

  // Get consent statistics
  async getConsentStats(organizationId: string): Promise<{
    totalConsentRecords: number;
    activeConsentRecords: number;
    withdrawnConsentRecords: number;
    expiredConsentRecords: number;
    consentByType: Record<string, number>;
    consentByMethod: Record<string, number>;
    recentWithdrawals: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('consent_records')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) {
        throw error;
      }

      const consentRecords = data || [];
      const totalConsentRecords = consentRecords.length;
      
      const activeConsentRecords = consentRecords.filter(r => r.consent_status === 'active').length;
      const withdrawnConsentRecords = consentRecords.filter(r => r.consent_status === 'withdrawn').length;
      const expiredConsentRecords = consentRecords.filter(r => r.consent_status === 'expired').length;

      const consentByType = consentRecords.reduce((acc, record) => {
        acc[record.consent_type] = (acc[record.consent_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const consentByMethod = consentRecords.reduce((acc, record) => {
        acc[record.consent_method] = (acc[record.consent_method] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Get recent withdrawals (last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const recentWithdrawals = consentRecords.filter(r => 
        r.consent_status === 'withdrawn' && 
        r.withdrawn_at && 
        new Date(r.withdrawn_at) > thirtyDaysAgo
      ).length;

      return {
        totalConsentRecords,
        activeConsentRecords,
        withdrawnConsentRecords,
        expiredConsentRecords,
        consentByType,
        consentByMethod,
        recentWithdrawals
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getConsentStats', 
        organizationId 
      });
      throw error;
    }
  }

  // Expire old consent records
  async expireOldConsentRecords(organizationId: string): Promise<number> {
    try {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('consent_records')
        .update({
          consent_status: 'expired',
          updated_at: now
        })
        .eq('organization_id', organizationId)
        .eq('consent_status', 'active')
        .lt('expires_at', now)
        .select('id');

      if (error) {
        throw error;
      }

      return data?.length || 0;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'expireOldConsentRecords', 
        organizationId 
      });
      throw error;
    }
  }
}

export const consentService = new ConsentService();