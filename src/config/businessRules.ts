// Business rules and compliance logic
export const businessRules = {
  // Data retention periods by regulation and data type
  dataRetention: {
    ferpa: {
      permanent: ['transcripts', 'diplomas', 'immunization_records'],
      seven_years: ['disciplinary_records', 'special_education_records'],
      three_years: ['directory_information', 'temporary_records'],
      one_year: ['behavioral_logs', 'assessment_data']
    },
    coppa: {
      immediate_deletion: ['unnecessary_personal_data'],
      consent_period: ['consented_data_collection'],
      educational_exception: ['school_authorized_data']
    },
    ccpa: {
      twelve_months: ['personal_information_categories'],
      twenty_four_months: ['service_provider_data'],
      deletion_upon_request: ['consumer_data']
    }
  },

  // Response timeframes for data subject requests
  responseTimeframes: {
    ferpa: {
      access: 45, // days
      amendment: 45,
      hearing: 30
    },
    gdpr: {
      access: 30,
      rectification: 30,
      erasure: 30,
      portability: 30,
      objection: 30
    },
    ccpa: {
      access: 45,
      deletion: 45,
      opt_out: 15
    },
    cpra: {
      access: 45,
      deletion: 45,
      correction: 45,
      opt_out: 15,
      sensitive_data_limit: 15
    }
  },

  // Notification requirements for privacy incidents
  breachNotification: {
    ferpa: {
      threshold: 0, // Any breach involving education records
      timeline: 'without unreasonable delay',
      authorities: ['Department of Education'],
      individuals: 'if harm likely'
    },
    ccpa: {
      threshold: 500, // 500 or more California residents
      timeline: 72, // hours to attorney general
      authorities: ['California Attorney General'],
      individuals: 'without unreasonable delay'
    },
    gdpr: {
      threshold: 0, // Any breach likely to result in risk
      timeline: 72, // hours to supervisory authority
      individual_timeline: 30, // days when high risk
      authorities: ['Data Protection Authority'],
      individuals: 'when high risk to rights and freedoms'
    }
  },

  // Consent requirements by regulation and age
  consentRequirements: {
    coppa: {
      age_threshold: 13,
      consent_method: 'verifiable_parental_consent',
      school_exception: true
    },
    gdpr: {
      age_threshold: 16, // Can be lowered by member states to 13
      consent_method: 'clear_affirmative_action',
      parental_consent_required: true
    },
    ccpa: {
      age_threshold: 16,
      opt_in_required: true,
      parental_consent: 'between_13_16'
    }
  },

  // Vendor assessment scoring weights
  vendorAssessment: {
    securityMeasures: 0.30,
    privacyPolicy: 0.20,
    dataMinimization: 0.15,
    consentMechanisms: 0.15,
    incidentResponse: 0.10,
    certifications: 0.10
  },

  // Risk scoring thresholds
  riskThresholds: {
    low: 80, // 80-100 score
    medium: 60, // 60-79 score
    high: 40, // 40-59 score
    critical: 0 // 0-39 score
  },

  // Automation rules for compliance obligations
  automationRules: {
    annual_notices: {
      trigger: 'calendar_date',
      advance_notice: 90, // days
      auto_generate: true
    },
    vendor_assessments: {
      trigger: 'contract_renewal',
      advance_notice: 60,
      auto_generate: false
    },
    consent_renewals: {
      trigger: 'expiry_date',
      advance_notice: 30,
      auto_remind: true
    },
    incident_escalation: {
      trigger: 'severity_threshold',
      auto_escalate: true,
      escalation_levels: ['privacy_officer', 'legal_counsel', 'executive_leadership']
    }
  }
};

// Business rule validation functions
export const validateBusinessRules = {
  // Validate data retention compliance
  isRetentionCompliant(dataType: string, retentionPeriod: number, regulation: string): boolean {
    const rules = businessRules.dataRetention[regulation as keyof typeof businessRules.dataRetention];
    if (!rules) return true; // No specific rules for this regulation
    
    // Check if data type has specific retention requirements
    for (const [period, types] of Object.entries(rules)) {
      if (Array.isArray(types) && types.includes(dataType)) {
        const requiredDays = this.getRetentionDays(period);
        return retentionPeriod >= requiredDays;
      }
    }
    
    return true; // No specific requirements found
  },

  // Convert retention period names to days
  getRetentionDays(period: string): number {
    const periodMap: Record<string, number> = {
      immediate_deletion: 0,
      one_year: 365,
      three_years: 365 * 3,
      seven_years: 365 * 7,
      twelve_months: 365,
      twenty_four_months: 730,
      permanent: Infinity
    };
    
    return periodMap[period] || 365; // Default to 1 year
  },

  // Validate response timeframe compliance
  isResponseTimeCompliant(
    requestType: string, 
    regulation: string, 
    responseTime: number
  ): boolean {
    const timeframes = businessRules.responseTimeframes[regulation as keyof typeof businessRules.responseTimeframes];
    if (!timeframes) return true;
    
    const requiredTime = timeframes[requestType as keyof typeof timeframes];
    if (typeof requiredTime !== 'number') return true;
    
    return responseTime <= requiredTime;
  },

  // Validate consent requirements
  isConsentRequired(age: number, regulation: string): boolean {
    const rules = businessRules.consentRequirements[regulation as keyof typeof businessRules.consentRequirements];
    if (!rules) return false;
    
    return age < rules.age_threshold;
  },

  // Calculate vendor risk score
  calculateVendorRisk(assessmentScores: Record<string, number>): number {
    const weights = businessRules.vendorAssessment;
    let totalScore = 0;
    let totalWeight = 0;
    
    Object.entries(weights).forEach(([category, weight]) => {
      if (assessmentScores[category] !== undefined) {
        totalScore += assessmentScores[category] * weight;
        totalWeight += weight;
      }
    });
    
    return totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  }
};