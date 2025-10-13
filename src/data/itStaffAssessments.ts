// Note: Assessment scores are for educational purposes only and do not guarantee compliance with any specific law or regulation

interface CurrentState {
  level: string;
  percentage: string;
  description: string;
}

interface AssessmentArea {
  id: string;
  title: string;
  description: string;
  currentStates: CurrentState[];
  gapIndicators: string[];
  remediationActions: {
    [key: string]: string;
  };
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: number;
  estimatedTime: number;
  regulation: 'ferpa' | 'coppa' | 'gdpr' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
  areas: AssessmentArea[];
  lastCompleted?: string;
}

export const itStaffAssessments: Assessment[] = [
  {
    id: 'network-security-fundamentals',
    title: 'Network Security Fundamentals for Educational IT',
    description: 'Assessment of network security knowledge and implementation in educational environments',
    questions: 12,
    estimatedTime: 25,
    regulation: 'general',
    level: 'intermediate',
    areas: [
      {
        id: 'network-security-architecture',
        title: 'Network Security Architecture',
        description: 'How robust is your institution\'s network security architecture?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic network setup with minimal security measures'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Some security measures in place but not comprehensive'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic network security with documented architecture'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive security architecture with monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary security architecture with continuous optimization'
          }
        ],
        gapIndicators: [
          'No network segmentation strategy',
          'Inadequate firewall configuration',
          'Missing intrusion detection systems',
          'No network monitoring capabilities',
          'Unclear security policies for network access'
        ],
        remediationActions: {
          'Level 1→2': 'Implement basic firewall and access controls',
          'Level 2→3': 'Deploy comprehensive network security architecture',
          'Level 3→4': 'Add monitoring and intrusion detection capabilities',
          'Level 4→5': 'Establish continuous optimization and threat intelligence'
        }
      },
      {
        id: 'access-control-systems',
        title: 'Access Control Systems',
        description: 'How effectively do you manage user access to educational systems and data?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic username/password authentication with limited access controls'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Role-based access with some multi-factor authentication'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Comprehensive access control with systematic role management'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Advanced access control with automated provisioning and monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Zero-trust architecture with continuous access verification'
          }
        ],
        gapIndicators: [
          'No multi-factor authentication',
          'Unclear role-based access controls',
          'No automated user provisioning/deprovisioning',
          'Limited access monitoring and logging',
          'No regular access reviews or certifications'
        ],
        remediationActions: {
          'Level 1→2': 'Implement multi-factor authentication and basic role-based access',
          'Level 2→3': 'Deploy comprehensive identity and access management system',
          'Level 3→4': 'Add automated provisioning and continuous monitoring',
          'Level 4→5': 'Implement zero-trust architecture with adaptive authentication'
        }
      },
      {
        id: 'data-encryption-protection',
        title: 'Data Encryption and Protection',
        description: 'How comprehensively is student and institutional data encrypted and protected?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic encryption for some systems; inconsistent data protection'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Encryption in place but not comprehensive across all systems'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic encryption with documented key management'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive encryption with advanced key management'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'End-to-end encryption with zero-knowledge architecture'
          }
        ],
        gapIndicators: [
          'No encryption at rest for student data',
          'Limited encryption in transit',
          'No key management procedures',
          'Unclear data classification for encryption',
          'No encryption monitoring or compliance checking'
        ],
        remediationActions: {
          'Level 1→2': 'Implement encryption at rest and in transit for all student data',
          'Level 2→3': 'Deploy comprehensive encryption with key management',
          'Level 3→4': 'Add advanced encryption monitoring and compliance automation',
          'Level 4→5': 'Implement zero-knowledge encryption architecture'
        }
      },
      {
        id: 'backup-disaster-recovery',
        title: 'Backup and Disaster Recovery',
        description: 'How robust are your data backup and disaster recovery capabilities?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic backup procedures with limited testing or recovery planning'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Regular backups with some recovery procedures'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Comprehensive backup and recovery with regular testing'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Advanced backup and recovery with automated systems'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary backup and recovery with zero-downtime capabilities'
          }
        ],
        gapIndicators: [
          'No regular backup testing',
          'Unclear recovery time objectives',
          'Limited geographic backup distribution',
          'No automated backup verification',
          'Unclear backup retention policies'
        ],
        remediationActions: {
          'Level 1→2': 'Establish regular backup testing and basic recovery procedures',
          'Level 2→3': 'Implement comprehensive backup strategy with documented recovery plans',
          'Level 3→4': 'Deploy automated backup and recovery systems',
          'Level 4→5': 'Establish zero-downtime recovery capabilities'
        }
      },
      {
        id: 'security-monitoring-incident-response',
        title: 'Security Monitoring and Incident Response',
        description: 'How effective are your security monitoring and incident response capabilities?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Limited monitoring; reactive incident response'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic monitoring with informal incident response'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic monitoring with documented incident response'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Advanced monitoring with coordinated incident response'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'AI-powered monitoring with automated incident response'
          }
        ],
        gapIndicators: [
          'No 24/7 security monitoring',
          'Limited incident detection capabilities',
          'No automated alerting systems',
          'Unclear incident escalation procedures',
          'No threat intelligence integration'
        ],
        remediationActions: {
          'Level 1→2': 'Implement basic security monitoring and incident procedures',
          'Level 2→3': 'Deploy comprehensive SIEM with documented response plans',
          'Level 3→4': 'Add advanced threat detection and coordinated response',
          'Level 4→5': 'Implement AI-powered monitoring with automated response'
        }
      },
      {
        id: 'vendor-security-management',
        title: 'Vendor Security Management',
        description: 'How effectively do you assess and manage the security of educational technology vendors?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Limited vendor security assessment; minimal oversight'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic vendor security requirements but inconsistent enforcement'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic vendor security assessment with clear requirements'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive vendor security management with ongoing monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Continuous vendor security optimization with threat intelligence'
          }
        ],
        gapIndicators: [
          'No vendor security assessment process',
          'Limited security requirements in contracts',
          'No ongoing vendor security monitoring',
          'Unclear vendor incident response coordination',
          'No vendor security performance metrics'
        ],
        remediationActions: {
          'Level 1→2': 'Develop vendor security assessment framework and requirements',
          'Level 2→3': 'Implement systematic vendor security management',
          'Level 3→4': 'Add continuous monitoring and performance management',
          'Level 4→5': 'Establish continuous optimization with threat intelligence'
        }
      }
    ]
  },
  {
    id: 'technical-privacy-implementation',
    title: 'Technical Privacy Implementation',
    description: 'Assessment of technical implementation of privacy controls and safeguards',
    questions: 14,
    estimatedTime: 28,
    regulation: 'general',
    level: 'advanced',
    areas: [
      {
        id: 'technical-safeguards-implementation',
        title: 'Technical Safeguards Implementation',
        description: 'How comprehensive are your technical safeguards for protecting student data?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic technical safeguards with significant gaps'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Some technical safeguards but not comprehensive'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic technical safeguards with documented procedures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive technical safeguards with automated enforcement'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Advanced technical safeguards with AI-powered optimization'
          }
        ],
        gapIndicators: [
          'No data loss prevention systems',
          'Limited endpoint protection',
          'No automated security controls',
          'Unclear technical control documentation',
          'No security control testing procedures'
        ],
        remediationActions: {
          'Level 1→2': 'Implement basic technical safeguards and endpoint protection',
          'Level 2→3': 'Deploy comprehensive technical control framework',
          'Level 3→4': 'Add automated enforcement and monitoring',
          'Level 4→5': 'Implement AI-powered optimization and adaptive controls'
        }
      },
      {
        id: 'data-governance-technical',
        title: 'Data Governance and Classification',
        description: 'How effectively do you implement technical data governance and classification?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No data classification; limited governance controls'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic data classification with some governance controls'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic data classification with comprehensive governance'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Automated data governance with classification enforcement'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'AI-powered data governance with dynamic classification'
          }
        ],
        gapIndicators: [
          'No data classification system',
          'Unclear data handling procedures',
          'No automated data governance controls',
          'Limited data lineage tracking',
          'No data quality monitoring'
        ],
        remediationActions: {
          'Level 1→2': 'Implement data classification system and basic governance',
          'Level 2→3': 'Deploy comprehensive data governance framework',
          'Level 3→4': 'Add automated governance controls and monitoring',
          'Level 4→5': 'Implement AI-powered data governance with dynamic controls'
        }
      },
      {
        id: 'privacy-engineering',
        title: 'Privacy Engineering and Design',
        description: 'How well do you implement privacy-by-design principles in technical systems?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Privacy considerations added after system implementation'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Some privacy considerations in design but not systematic'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic privacy-by-design implementation'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive privacy engineering with automated controls'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Advanced privacy engineering with innovation and optimization'
          }
        ],
        gapIndicators: [
          'No privacy impact assessments for technical projects',
          'Privacy not considered in system design',
          'No privacy engineering standards',
          'Limited data minimization implementation',
          'No privacy testing procedures'
        ],
        remediationActions: {
          'Level 1→2': 'Integrate privacy considerations into development lifecycle',
          'Level 2→3': 'Implement systematic privacy-by-design framework',
          'Level 3→4': 'Deploy automated privacy controls and testing',
          'Level 4→5': 'Establish advanced privacy engineering and innovation'
        }
      },
      {
        id: 'cloud-security-management',
        title: 'Cloud Security and Data Management',
        description: 'How effectively do you manage security and privacy in cloud-based educational services?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic cloud usage with minimal security configuration'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Some cloud security measures but not comprehensive'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic cloud security with documented procedures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive cloud security with automated monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Advanced cloud security with multi-cloud optimization'
          }
        ],
        gapIndicators: [
          'No cloud security configuration standards',
          'Limited cloud access monitoring',
          'Unclear data residency requirements',
          'No cloud security assessment process',
          'Limited cloud incident response procedures'
        ],
        remediationActions: {
          'Level 1→2': 'Implement cloud security baseline and access controls',
          'Level 2→3': 'Deploy comprehensive cloud security framework',
          'Level 3→4': 'Add automated monitoring and compliance checking',
          'Level 4→5': 'Establish advanced cloud security optimization'
        }
      },
      {
        id: 'security-testing-validation',
        title: 'Security Testing and Validation',
        description: 'How comprehensive are your security testing and validation procedures?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Limited or no security testing; reactive vulnerability management'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic security testing with some vulnerability scanning'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic security testing with regular vulnerability assessments'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive security testing with continuous monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Advanced security testing with predictive vulnerability management'
          }
        ],
        gapIndicators: [
          'No regular penetration testing',
          'Limited vulnerability scanning',
          'No security code review process',
          'Unclear security testing procedures',
          'No red team exercises'
        ],
        remediationActions: {
          'Level 1→2': 'Implement regular vulnerability scanning and basic testing',
          'Level 2→3': 'Deploy comprehensive security testing program',
          'Level 3→4': 'Add continuous testing and automated vulnerability management',
          'Level 4→5': 'Establish predictive security testing and red team exercises'
        }
      }
    ]
  },
  {
    id: 'edtech-security-compliance',
    title: 'Educational Technology Security and Compliance',
    description: 'Assessment of security practices specific to educational technology systems',
    questions: 10,
    estimatedTime: 20,
    regulation: 'general',
    level: 'intermediate',
    areas: [
      {
        id: 'edtech-platform-security',
        title: 'EdTech Platform Security',
        description: 'How secure are the educational technology platforms your institution uses?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic EdTech security with minimal vetting of platforms'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Some security assessment of EdTech but not comprehensive'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic EdTech security assessment with clear standards'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive EdTech security with ongoing monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Advanced EdTech security with continuous optimization'
          }
        ],
        gapIndicators: [
          'No EdTech security standards',
          'Limited vendor security assessment',
          'No ongoing security monitoring of EdTech platforms',
          'Unclear data sharing agreements',
          'No EdTech incident response procedures'
        ],
        remediationActions: {
          'Level 1→2': 'Develop EdTech security standards and assessment process',
          'Level 2→3': 'Implement comprehensive vendor security evaluation',
          'Level 3→4': 'Add ongoing monitoring and performance management',
          'Level 4→5': 'Establish continuous optimization and innovation'
        }
      },
      {
        id: 'student-device-management',
        title: 'Student Device Management',
        description: 'How effectively do you manage security for student-owned and school-provided devices?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic device management with minimal security controls'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Some device security measures but not comprehensive'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic device management with security policies'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive device security with automated management'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Advanced device security with zero-trust architecture'
          }
        ],
        gapIndicators: [
          'No mobile device management (MDM) solution',
          'Limited BYOD security policies',
          'No device encryption requirements',
          'Unclear lost/stolen device procedures',
          'No device compliance monitoring'
        ],
        remediationActions: {
          'Level 1→2': 'Implement basic MDM and device security policies',
          'Level 2→3': 'Deploy comprehensive device management framework',
          'Level 3→4': 'Add automated device security and compliance monitoring',
          'Level 4→5': 'Implement zero-trust device security architecture'
        }
      },
      {
        id: 'api-integration-security',
        title: 'API and Integration Security',
        description: 'How secure are your API integrations and data exchange mechanisms?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Basic API security with minimal authentication and monitoring'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Some API security measures but not comprehensive'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic API security with documented standards'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive API security with automated monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Advanced API security with zero-trust principles'
          }
        ],
        gapIndicators: [
          'No API security standards',
          'Limited API authentication and authorization',
          'No API monitoring or logging',
          'Unclear data validation for API inputs',
          'No API rate limiting or abuse prevention'
        ],
        remediationActions: {
          'Level 1→2': 'Implement API security standards and authentication',
          'Level 2→3': 'Deploy comprehensive API security framework',
          'Level 3→4': 'Add automated API monitoring and threat detection',
          'Level 4→5': 'Implement zero-trust API security architecture'
        }
      }
    ]
  }
];