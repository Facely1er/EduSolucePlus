// Vendor management service for privacy compliance
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

export interface Vendor {
  id: string;
  name: string;
  contact_email: string;
  contact_phone?: string;
  website?: string;
  vendor_type: 'edtech' | 'cloud_service' | 'data_processor' | 'security_tool' | 'other';
  data_categories: string[];
  services_provided: string[];
  privacy_policy_url?: string;
  data_processing_agreement_url?: string;
  organization_id: string;
  status: 'active' | 'inactive' | 'pending_review' | 'suspended';
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  last_assessment_date?: string;
  next_assessment_due?: string;
  created_at: string;
  updated_at: string;
}

export interface VendorAssessment {
  id: string;
  vendor_id: string;
  assessment_type: 'initial' | 'annual' | 'incident_triggered' | 'contract_renewal';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assessor_id: string;
  assessment_date: string;
  due_date: string;
  completed_date?: string;
  overall_score: number;
  risk_factors: VendorRiskFactor[];
  recommendations: string[];
  compliance_status: 'compliant' | 'non_compliant' | 'needs_improvement';
  created_at: string;
  updated_at: string;
}

export interface VendorRiskFactor {
  category: string;
  description: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  mitigation_required: boolean;
  mitigation_actions: string[];
}

export interface VendorContract {
  id: string;
  vendor_id: string;
  contract_type: 'service_agreement' | 'data_processing_agreement' | 'privacy_agreement' | 'security_agreement';
  contract_url?: string;
  start_date: string;
  end_date: string;
  auto_renewal: boolean;
  key_terms: string[];
  data_sharing_scope: string[];
  compliance_requirements: string[];
  created_at: string;
  updated_at: string;
}

class VendorService {
  // Create new vendor
  async createVendor(vendorData: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>): Promise<Vendor> {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .insert([{
          ...vendorData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log vendor creation
      auditService.logVendorCreation(vendorData.organization_id, data.id);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'createVendor', 
        organizationId: vendorData.organization_id 
      });
      throw error;
    }
  }

  // Get vendors for organization
  async getVendors(organizationId: string, status?: string): Promise<Vendor[]> {
    try {
      let query = supabase
        .from('vendors')
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
        context: 'getVendors', 
        organizationId 
      });
      throw error;
    }
  }

  // Get vendor by ID
  async getVendor(id: string): Promise<Vendor | null> {
    try {
      const { data, error } = await supabase
        .from('vendors')
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
      errorService.logError(error as Error, { context: 'getVendor', vendorId: id });
      throw error;
    }
  }

  // Update vendor
  async updateVendor(id: string, updates: Partial<Vendor>): Promise<Vendor> {
    try {
      const { data, error } = await supabase
        .from('vendors')
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

      // Log vendor update
      auditService.logVendorUpdate(data.organization_id, id);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'updateVendor', 
        vendorId: id 
      });
      throw error;
    }
  }

  // Create vendor assessment
  async createAssessment(assessmentData: Omit<VendorAssessment, 'id' | 'created_at' | 'updated_at'>): Promise<VendorAssessment> {
    try {
      const { data, error } = await supabase
        .from('vendor_assessments')
        .insert([{
          ...assessmentData,
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
        context: 'createAssessment', 
        vendorId: assessmentData.vendor_id 
      });
      throw error;
    }
  }

  // Get vendor assessments
  async getVendorAssessments(vendorId: string): Promise<VendorAssessment[]> {
    try {
      const { data, error } = await supabase
        .from('vendor_assessments')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('assessment_date', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getVendorAssessments', 
        vendorId 
      });
      throw error;
    }
  }

  // Create vendor contract
  async createContract(contractData: Omit<VendorContract, 'id' | 'created_at' | 'updated_at'>): Promise<VendorContract> {
    try {
      const { data, error } = await supabase
        .from('vendor_contracts')
        .insert([{
          ...contractData,
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
        context: 'createContract', 
        vendorId: contractData.vendor_id 
      });
      throw error;
    }
  }

  // Get vendor contracts
  async getVendorContracts(vendorId: string): Promise<VendorContract[]> {
    try {
      const { data, error } = await supabase
        .from('vendor_contracts')
        .select('*')
        .eq('vendor_id', vendorId)
        .order('start_date', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getVendorContracts', 
        vendorId 
      });
      throw error;
    }
  }

  // Get vendor statistics
  async getVendorStats(organizationId: string): Promise<{
    totalVendors: number;
    vendorsByStatus: Record<string, number>;
    vendorsByRiskLevel: Record<string, number>;
    vendorsByType: Record<string, number>;
    overdueAssessments: number;
    expiringContracts: number;
  }> {
    try {
      const { data: vendors, error: vendorsError } = await supabase
        .from('vendors')
        .select('*')
        .eq('organization_id', organizationId);

      if (vendorsError) {
        throw vendorsError;
      }

      const { data: assessments, error: assessmentsError } = await supabase
        .from('vendor_assessments')
        .select('*')
        .eq('organization_id', organizationId);

      if (assessmentsError) {
        throw assessmentsError;
      }

      const { data: contracts, error: contractsError } = await supabase
        .from('vendor_contracts')
        .select('*')
        .eq('organization_id', organizationId);

      if (contractsError) {
        throw contractsError;
      }

      const vendorList = vendors || [];
      const assessmentList = assessments || [];
      const contractList = contracts || [];

      const totalVendors = vendorList.length;
      
      const vendorsByStatus = vendorList.reduce((acc, vendor) => {
        acc[vendor.status] = (acc[vendor.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const vendorsByRiskLevel = vendorList.reduce((acc, vendor) => {
        acc[vendor.risk_level] = (acc[vendor.risk_level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const vendorsByType = vendorList.reduce((acc, vendor) => {
        acc[vendor.vendor_type] = (acc[vendor.vendor_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const now = new Date();
      const overdueAssessments = assessmentList.filter(assessment => 
        new Date(assessment.due_date) < now && assessment.status !== 'completed'
      ).length;

      const expiringContracts = contractList.filter(contract => {
        const endDate = new Date(contract.end_date);
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        return endDate <= thirtyDaysFromNow && endDate > now;
      }).length;

      return {
        totalVendors,
        vendorsByStatus,
        vendorsByRiskLevel,
        vendorsByType,
        overdueAssessments,
        expiringContracts
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getVendorStats', 
        organizationId 
      });
      throw error;
    }
  }

  // Update vendor risk level
  async updateVendorRiskLevel(vendorId: string, riskLevel: Vendor['risk_level'], reason: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({
          risk_level: riskLevel,
          updated_at: new Date().toISOString()
        })
        .eq('id', vendorId);

      if (error) {
        throw error;
      }

      // Log risk level update
      auditService.logVendorRiskUpdate(vendorId, riskLevel, reason);
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'updateVendorRiskLevel', 
        vendorId 
      });
      throw error;
    }
  }
}

export const vendorService = new VendorService();