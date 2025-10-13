// Demo data management service
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';

interface DemoDataOptions {
  includeAssessments?: boolean;
  includeTraining?: boolean;
  includeCompliance?: boolean;
  includeDataRights?: boolean;
  includeIncidents?: boolean;
  includeVendors?: boolean;
  includeConsent?: boolean;
}

interface AssessmentData {
  id: string;
  user_id: string;
  assessment_id: string;
  area_id: string;
  score: number;
  completed_at: string;
  responses: Record<string, string>;
}

interface TrainingData {
  id: string;
  user_id: string;
  module_id: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  last_accessed: string;
  completed_at?: string;
}

interface ComplianceData {
  id: string;
  regulation: string;
  score: number;
  last_audit: string;
  next_audit: string;
  status: 'compliant' | 'non-compliant' | 'at-risk';
}

interface DataRightsData {
  id: string;
  request_type: string;
  requester_name: string;
  requester_email: string;
  status: string;
  submitted_at: string;
  due_date: string;
}

interface IncidentData {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved';
  reported_at: string;
}

interface VendorData {
  id: string;
  name: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  last_assessment: string;
  next_assessment: string;
}

interface ConsentData {
  id: string;
  student_id: string;
  consent_type: string;
  granted: boolean;
  granted_at: string;
  expires_at?: string;
}

class DemoDataService {
  // Generate comprehensive demo data
  generateDemoData(userId: string, options: DemoDataOptions = {}): {
    assessments: AssessmentData[];
    training: TrainingData[];
    compliance: ComplianceData[];
    dataRights: DataRightsData[];
    incidents: IncidentData[];
    vendors: VendorData[];
    consent: ConsentData[];
  } {
    const demoData = {
      assessments: options.includeAssessments !== false ? this.generateAssessmentData(userId) : [],
      training: options.includeTraining !== false ? this.generateTrainingData(userId) : [],
      compliance: options.includeCompliance !== false ? this.generateComplianceData() : [],
      dataRights: options.includeDataRights !== false ? this.generateDataRightsData() : [],
      incidents: options.includeIncidents !== false ? this.generateIncidentData() : [],
      vendors: options.includeVendors !== false ? this.generateVendorData() : [],
      consent: options.includeConsent !== false ? this.generateConsentData() : []
    };

    // Store in localStorage for offline access
    Object.entries(demoData).forEach(([key, data]) => {
      if (data.length > 0) {
        localStorage.setItem(`demo_${key}_${userId}`, JSON.stringify(data));
      }
    });

    return demoData;
  }

  // Flush all demo data
  flushDemoData(_userId?: string): {
    flushedKeys: string[];
    totalItemsRemoved: number;
  } {
    const keys = Object.keys(localStorage);
    const demoKeys = keys.filter(key => 
      key.startsWith('demo_') || 
      key.startsWith('edusoluce_') ||
      key.includes('assessment_progress') ||
      key.includes('training_progress') ||
      key.includes('notifications') ||
      key.includes('user_preferences')
    );

    // Preserve theme and essential app settings
    const keysToFlush = demoKeys.filter(key => 
      !key.includes('theme') && 
      !key.includes('guest_user_notice_shown') &&
      !key.includes('anonymous_notice_dismissed')
    );

    keysToFlush.forEach(key => {
      localStorage.removeItem(key);
    });

    return {
      flushedKeys: keysToFlush,
      totalItemsRemoved: keysToFlush.length
    };
  }

  // Refresh demo data (flush old, generate new)
  refreshDemoData(userId: string, options: DemoDataOptions = {}): {
    flushed: number;
    generated: {
      assessments: AssessmentData[];
      training: TrainingData[];
      compliance: ComplianceData[];
      dataRights: DataRightsData[];
      incidents: IncidentData[];
      vendors: VendorData[];
      consent: ConsentData[];
    };
  } {
    const flushed = this.flushDemoData(userId);
    const generated = this.generateDemoData(userId, options);
    
    return {
      flushed: flushed.totalItemsRemoved,
      generated
    };
  }

  // Generate assessment demo data
  private generateAssessmentData(userId: string): AssessmentData[] {
    const assessmentAreas = [
      'education-records-management',
      'directory-information-policies',
      'staff-training-awareness',
      'vendor-third-party-management',
      'network-security-architecture',
      'coppa-policy-framework'
    ];

    return assessmentAreas.map((area, index) => ({
      id: uuidv4(),
      user_id: userId,
      assessment_type: 'administrator',
      assessment_id: `demo-assessment-${index + 1}`,
      area_id: area,
      area_title: area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      current_level: Math.floor(Math.random() * 5) + 1,
      score: Math.floor(Math.random() * 40) + 60, // 60-100% scores
      gap_indicators: [
        'Sample gap indicator 1',
        'Sample gap indicator 2'
      ],
      remediation_actions: {
        'Level 1→2': 'Sample remediation action',
        'Level 2→3': 'Advanced remediation action'
      },
      responses: { response: Math.floor(Math.random() * 5) },
      completed_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    }));
  }

  // Generate training demo data
  private generateTrainingData(userId: string): TrainingData[] {
    const modules = [
      'ferpa-fundamentals-administrators',
      'coppa-digital-safety-educators', 
      'cybersecurity-fundamentals-education',
      'privacy-fundamentals-teachers'
    ];

    return modules.map((moduleId, _index) => ({
      id: uuidv4(),
      user_id: userId,
      module_id: moduleId,
      module_title: moduleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      status: ['completed', 'in-progress', 'not-started'][Math.floor(Math.random() * 3)],
      progress: Math.floor(Math.random() * 100),
      current_lesson_id: `lesson-${Math.floor(Math.random() * 5) + 1}`,
      syllabus_progress: {},
      quiz_scores: {},
      started_at: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      last_accessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    }));
  }

  // Generate compliance demo data
  private generateComplianceData(): ComplianceData[] {
    return [
      {
        id: uuidv4(),
        event_id: 'ferpa-annual-notice-2025',
        event_title: 'FERPA Annual Notice Distribution',
        status: 'pending',
        due_date: '2025-08-15',
        documentation: {
          priority: 'critical',
          description: 'Distribute annual FERPA rights notification'
        },
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        event_id: 'coppa-vendor-audit-2025',
        event_title: 'COPPA Vendor Compliance Review',
        status: 'in-progress',
        due_date: '2025-03-31',
        documentation: {
          priority: 'high',
          description: 'Review all EdTech vendors for COPPA compliance'
        },
        created_at: new Date().toISOString()
      }
    ];
  }

  // Generate data rights demo data
  private generateDataRightsData(): DataRightsData[] {
    return [
      {
        id: uuidv4(),
        request_type: 'access',
        requester_name: 'Sarah Johnson',
        requester_email: 'sarah.johnson@email.com',
        student_identifier: 'Emma Johnson - STU-001',
        request_details: 'Request for student academic records and assessment results',
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        due_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: uuidv4(),
        request_type: 'erasure',
        requester_name: 'Michael Chen',
        requester_email: 'michael.chen@email.com',
        student_identifier: 'Michael Chen - STU-002',
        request_details: 'Request to delete all personal information after graduation',
        status: 'completed',
        submitted_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        completed_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }

  // Generate incident demo data
  private generateIncidentData(): IncidentData[] {
    return [
      {
        id: uuidv4(),
        incident_number: 'PRI-2025-001',
        title: 'Unauthorized Email Access',
        incident_type: 'unauthorized_access',
        severity: 'medium',
        description: 'Teacher account compromised, potential access to student communications',
        affected_individuals_count: 150,
        discovery_date: new Date().toISOString(),
        status: 'investigating',
        created_at: new Date().toISOString()
      }
    ];
  }

  // Generate vendor demo data
  private generateVendorData(): VendorData[] {
    return [
      {
        id: uuidv4(),
        vendor_name: 'Google for Education',
        service_description: 'Email and classroom management tools',
        assessment_score: 88,
        risk_level: 'low',
        compliance_status: 'compliant',
        last_assessment: new Date().toISOString(),
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        vendor_name: 'Zoom Education',
        service_description: 'Video conferencing platform',
        assessment_score: 75,
        risk_level: 'medium',
        compliance_status: 'review_needed',
        last_assessment: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      }
    ];
  }

  // Generate consent demo data
  private generateConsentData(): ConsentData[] {
    return [
      {
        id: uuidv4(),
        student_name: 'Emma Johnson',
        parent_name: 'Sarah Johnson',
        consent_type: 'directory_information',
        consent_given: false,
        withdrawal_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'withdrawn',
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        student_name: 'Michael Chen',
        parent_name: 'Lisa Chen',
        consent_type: 'edtech_usage',
        consent_given: true,
        consent_date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        created_at: new Date().toISOString()
      }
    ];
  }

  // Export demo data for backup
  async exportDemoData(userId: string): Promise<void> {
    const demoData = {
      assessments: JSON.parse(localStorage.getItem(`demo_assessments_${userId}`) || '[]'),
      training: JSON.parse(localStorage.getItem(`demo_training_${userId}`) || '[]'),
      compliance: JSON.parse(localStorage.getItem(`demo_compliance_${userId}`) || '[]'),
      dataRights: JSON.parse(localStorage.getItem(`demo_dataRights_${userId}`) || '[]'),
      incidents: JSON.parse(localStorage.getItem(`demo_incidents_${userId}`) || '[]'),
      vendors: JSON.parse(localStorage.getItem(`demo_vendors_${userId}`) || '[]'),
      consent: JSON.parse(localStorage.getItem(`demo_consent_${userId}`) || '[]'),
      exportedAt: new Date().toISOString(),
      userId
    };

    const blob = new Blob([JSON.stringify(demoData, null, 2)], { 
      type: 'application/json;charset=utf-8;' 
    });
    
    saveAs(blob, `edusoluce-demo-data-${userId}-${new Date().toISOString().split('T')[0]}.json`);
  }

  // Import demo data from backup
  async importDemoData(file: File): Promise<{
    success: boolean;
    message: string;
    data?: {
      assessments: AssessmentData[];
      training: TrainingData[];
      compliance: ComplianceData[];
      dataRights: DataRightsData[];
      incidents: IncidentData[];
      vendors: VendorData[];
      consent: ConsentData[];
    };
  }> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          
          // Validate data structure
          if (!jsonData.userId || !jsonData.exportedAt) {
            throw new Error('Invalid demo data file format');
          }

          // Restore data to localStorage
          Object.entries(jsonData).forEach(([key, data]) => {
            if (key !== 'exportedAt' && key !== 'userId' && Array.isArray(data)) {
              localStorage.setItem(`demo_${key}_${jsonData.userId}`, JSON.stringify(data));
            }
          });

          resolve({
            success: true,
            message: `Demo data imported successfully for user ${jsonData.userId}`,
            data: jsonData
          });
        } catch (error) {
          resolve({
            success: false,
            message: error instanceof Error ? error.message : 'Import failed'
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          message: 'Failed to read file'
        });
      };

      reader.readAsText(file);
    });
  }
}

export const demoDataService = new DemoDataService();