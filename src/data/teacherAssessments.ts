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

export const teacherAssessments: Assessment[] = [
  {
    id: 'ferpa-classroom-teachers',
    title: 'FERPA for Classroom Teachers',
    description: 'How FERPA affects daily classroom procedures and parent communications',
    questions: 10,
    estimatedTime: 20,
    regulation: 'ferpa',
    level: 'beginner',
    areas: [
      {
        id: 'education-records-understanding',
        title: 'Education Records Understanding',
        description: 'How well do you understand what constitutes education records in your classroom?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Unclear about what constitutes education records; treats all student information the same'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic understanding but inconsistent application in daily practice'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding with consistent identification of education records'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive understanding with systematic record management'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level understanding with mentoring capabilities for other teachers'
          }
        ],
        gapIndicators: [
          'Confusion about what documents are education records',
          'Inconsistent handling of student work',
          'Unclear about personal notes vs. official records',
          'No systematic approach to record classification'
        ],
        remediationActions: {
          'Level 1→2': 'Complete basic FERPA training focused on education records definition',
          'Level 2→3': 'Implement systematic approach to identifying and categorizing records',
          'Level 3→4': 'Develop comprehensive record management procedures',
          'Level 4→5': 'Become a FERPA mentor and help train other teachers'
        }
      },
      {
        id: 'parent-communication-compliance',
        title: 'Parent Communication Compliance',
        description: 'How effectively do you manage FERPA compliance in parent communications?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Inconsistent communication practices; unclear about disclosure rules'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic understanding but occasional compliance issues'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic approach to parent communications with FERPA awareness'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive communication protocols with documentation'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary communication practices with continuous improvement'
          }
        ],
        gapIndicators: [
          'Unclear about what can be shared with parents',
          'Inconsistent verification of parent identity',
          'No documentation of communications',
          'Confusion about custodial vs. non-custodial parent rights'
        ],
        remediationActions: {
          'Level 1→2': 'Develop basic parent communication guidelines',
          'Level 2→3': 'Implement systematic communication protocols',
          'Level 3→4': 'Add comprehensive documentation and verification procedures',
          'Level 4→5': 'Establish best practice sharing and continuous improvement'
        }
      },
      {
        id: 'classroom-disclosure-management',
        title: 'Classroom Disclosure Management',
        description: 'How do you handle student information disclosures within the classroom setting?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Ad hoc approach to sharing student information; no clear guidelines'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but inconsistent application of disclosure rules'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear procedures for classroom disclosures with regular application'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Systematic disclosure management with documentation'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary disclosure practices with peer mentoring'
          }
        ],
        gapIndicators: [
          'Unclear about legitimate educational interest',
          'Inconsistent handling of substitute teachers',
          'No procedures for student teacher access',
          'Confusion about peer grading rules'
        ],
        remediationActions: {
          'Level 1→2': 'Establish basic disclosure guidelines for classroom',
          'Level 2→3': 'Implement clear procedures for all classroom scenarios',
          'Level 3→4': 'Add systematic documentation and tracking',
          'Level 4→5': 'Develop mentoring program for other teachers'
        }
      },
      {
        id: 'student-work-privacy',
        title: 'Student Work Privacy',
        description: 'How do you protect student privacy when handling and displaying student work?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No consideration of privacy when displaying or sharing student work'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but inconsistent privacy protection'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear procedures for protecting student work privacy'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive privacy protection with student/parent consent'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary privacy practices with innovative protection methods'
          }
        ],
        gapIndicators: [
          'Public display of graded work with names',
          'No consent for work sharing',
          'Unclear about peer review privacy',
          'No procedures for digital work sharing'
        ],
        remediationActions: {
          'Level 1→2': 'Develop basic privacy guidelines for student work',
          'Level 2→3': 'Implement systematic privacy protection procedures',
          'Level 3→4': 'Add comprehensive consent and documentation processes',
          'Level 4→5': 'Develop innovative privacy protection methods'
        }
      },
      {
        id: 'directory-information-classroom',
        title: 'Directory Information in Classroom',
        description: 'How do you handle directory information disclosures in your classroom?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Unclear about directory information; no systematic approach'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic understanding but inconsistent application'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding with systematic application'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive management with opt-out tracking'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary directory information management'
          }
        ],
        gapIndicators: [
          'Unclear what constitutes directory information',
          'No awareness of opt-out students',
          'Inconsistent handling of class lists',
          'No procedures for external requests'
        ],
        remediationActions: {
          'Level 1→2': 'Learn directory information definitions and rules',
          'Level 2→3': 'Implement systematic directory information procedures',
          'Level 3→4': 'Add comprehensive opt-out tracking and management',
          'Level 4→5': 'Develop exemplary practices and share with colleagues'
        }
      }
    ]
  },
  {
    id: 'edtech-privacy-evaluation',
    title: 'EdTech Privacy Evaluation',
    description: 'How to evaluate educational technology tools for privacy compliance',
    questions: 12,
    estimatedTime: 25,
    regulation: 'general',
    level: 'intermediate',
    areas: [
      {
        id: 'privacy-policy-assessment',
        title: 'Privacy Policy Assessment',
        description: 'How effectively do you evaluate privacy policies of educational technology tools?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Rarely or never review privacy policies before using EdTech tools'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Occasionally review policies but lack systematic evaluation criteria'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic policy review with basic evaluation criteria'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive policy evaluation with documented assessment'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level policy analysis with risk assessment capabilities'
          }
        ],
        gapIndicators: [
          'No privacy policy review process',
          'Unclear evaluation criteria',
          'No documentation of assessments',
          'Limited understanding of privacy risks'
        ],
        remediationActions: {
          'Level 1→2': 'Develop habit of reviewing privacy policies',
          'Level 2→3': 'Create systematic evaluation criteria and checklist',
          'Level 3→4': 'Implement comprehensive assessment with documentation',
          'Level 4→5': 'Develop expert-level analysis and risk assessment skills'
        }
      },
      {
        id: 'data-collection-practices',
        title: 'Data Collection Practices',
        description: 'How well do you understand and evaluate data collection practices of EdTech tools?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No awareness of what data is collected by EdTech tools'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but limited evaluation of data collection'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic evaluation of data collection practices'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive understanding with risk assessment'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level analysis of data collection and usage'
          }
        ],
        gapIndicators: [
          'Unclear about data collection scope',
          'No evaluation of data necessity',
          'Limited understanding of data usage',
          'No consideration of data minimization'
        ],
        remediationActions: {
          'Level 1→2': 'Learn to identify what data EdTech tools collect',
          'Level 2→3': 'Develop systematic data collection evaluation process',
          'Level 3→4': 'Add comprehensive risk assessment capabilities',
          'Level 4→5': 'Become expert in data collection analysis and best practices'
        }
      },
      {
        id: 'vendor-security-assessment',
        title: 'Vendor Security Assessment',
        description: 'How do you evaluate the security practices of EdTech vendors?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No consideration of vendor security practices'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but limited security evaluation'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic security assessment with basic criteria'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive security evaluation with documentation'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level security assessment with risk analysis'
          }
        ],
        gapIndicators: [
          'No security evaluation process',
          'Unclear security criteria',
          'Limited understanding of security risks',
          'No documentation of security assessments'
        ],
        remediationActions: {
          'Level 1→2': 'Learn basic security evaluation criteria',
          'Level 2→3': 'Develop systematic security assessment process',
          'Level 3→4': 'Implement comprehensive evaluation with documentation',
          'Level 4→5': 'Develop expert-level security analysis capabilities'
        }
      },
      {
        id: 'student-consent-management',
        title: 'Student Consent Management',
        description: 'How do you manage student and parent consent for EdTech tool usage?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No systematic consent process for EdTech tools'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic consent process but inconsistent application'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic consent process with clear procedures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive consent management with tracking'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary consent management with dynamic updates'
          }
        ],
        gapIndicators: [
          'No consent process for new tools',
          'Unclear consent requirements',
          'No tracking of consent status',
          'Limited parent communication about tools'
        ],
        remediationActions: {
          'Level 1→2': 'Develop basic consent process for EdTech tools',
          'Level 2→3': 'Implement systematic consent procedures',
          'Level 3→4': 'Add comprehensive consent tracking and management',
          'Level 4→5': 'Develop dynamic consent management with real-time updates'
        }
      },
      {
        id: 'alternative-tool-evaluation',
        title: 'Alternative Tool Evaluation',
        description: 'How do you identify and evaluate privacy-friendly alternatives to EdTech tools?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No consideration of alternative tools or privacy implications'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but limited alternative evaluation'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic evaluation of alternatives with privacy criteria'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive alternative assessment with comparison matrix'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level alternative evaluation with innovation focus'
          }
        ],
        gapIndicators: [
          'No alternative tool research',
          'Limited privacy-focused evaluation',
          'No comparison methodology',
          'Unclear selection criteria'
        ],
        remediationActions: {
          'Level 1→2': 'Begin researching privacy-friendly alternatives',
          'Level 2→3': 'Develop systematic alternative evaluation process',
          'Level 3→4': 'Create comprehensive comparison and selection methodology',
          'Level 4→5': 'Become expert in innovative privacy-friendly tool identification'
        }
      }
    ]
  },
  {
    id: 'student-data-protection-classroom',
    title: 'Student Data Protection in the Classroom',
    description: 'Best practices for securing student information in your classroom',
    questions: 8,
    estimatedTime: 15,
    regulation: 'general',
    level: 'beginner',
    areas: [
      {
        id: 'physical-security-measures',
        title: 'Physical Security Measures',
        description: 'How do you protect physical student records and information in your classroom?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No systematic physical security measures for student information'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic security measures but inconsistent application'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic physical security with clear procedures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive physical security with monitoring'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary physical security with continuous improvement'
          }
        ],
        gapIndicators: [
          'Student records left unsecured',
          'No locked storage for sensitive information',
          'Unclear desk and workspace security',
          'No procedures for substitute teachers'
        ],
        remediationActions: {
          'Level 1→2': 'Implement basic physical security measures',
          'Level 2→3': 'Develop systematic security procedures',
          'Level 3→4': 'Add comprehensive monitoring and controls',
          'Level 4→5': 'Establish exemplary security practices with continuous improvement'
        }
      },
      {
        id: 'digital-security-practices',
        title: 'Digital Security Practices',
        description: 'How do you protect digital student information and maintain cybersecurity?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Minimal digital security awareness; basic password practices'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic digital security but inconsistent application'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic digital security with regular practices'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive digital security with advanced measures'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level digital security with mentoring capabilities'
          }
        ],
        gapIndicators: [
          'Weak password practices',
          'No device security measures',
          'Unclear about phishing risks',
          'No backup and recovery procedures'
        ],
        remediationActions: {
          'Level 1→2': 'Implement strong password and basic security practices',
          'Level 2→3': 'Develop systematic digital security procedures',
          'Level 3→4': 'Add advanced security measures and monitoring',
          'Level 4→5': 'Become digital security expert and mentor others'
        }
      },
      {
        id: 'information-sharing-protocols',
        title: 'Information Sharing Protocols',
        description: 'How do you manage secure sharing of student information with authorized parties?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Ad hoc information sharing without clear protocols'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic sharing guidelines but inconsistent application'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear sharing protocols with systematic application'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive sharing protocols with documentation'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary sharing practices with security optimization'
          }
        ],
        gapIndicators: [
          'Unclear sharing authorization',
          'No secure sharing methods',
          'Limited documentation of sharing',
          'No verification procedures'
        ],
        remediationActions: {
          'Level 1→2': 'Develop basic information sharing guidelines',
          'Level 2→3': 'Implement systematic sharing protocols',
          'Level 3→4': 'Add comprehensive documentation and verification',
          'Level 4→5': 'Optimize sharing practices with advanced security measures'
        }
      },
      {
        id: 'incident-response-procedures',
        title: 'Incident Response Procedures',
        description: 'How prepared are you to respond to potential data security incidents?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No incident response plan; reactive approach to security issues'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic incident awareness but limited response procedures'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear incident response procedures with defined steps'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive incident response with regular training'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary incident response with continuous improvement'
          }
        ],
        gapIndicators: [
          'No incident response plan',
          'Unclear escalation procedures',
          'Limited incident documentation',
          'No post-incident analysis'
        ],
        remediationActions: {
          'Level 1→2': 'Learn basic incident response procedures',
          'Level 2→3': 'Develop clear incident response plan',
          'Level 3→4': 'Implement comprehensive response with training',
          'Level 4→5': 'Establish exemplary practices with continuous improvement'
        }
      }
    ]
  },
  {
    id: 'coppa-classroom-apps',
    title: 'COPPA and Classroom Apps',
    description: 'Understanding COPPA requirements when using apps with students under 13',
    questions: 10,
    estimatedTime: 20,
    regulation: 'coppa',
    level: 'intermediate',
    areas: [
      {
        id: 'coppa-applicability-understanding',
        title: 'COPPA Applicability Understanding',
        description: 'How well do you understand when COPPA applies to classroom technology use?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Limited or no understanding of COPPA requirements'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic COPPA awareness but unclear application'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding of COPPA applicability'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive COPPA knowledge with systematic application'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level COPPA understanding with mentoring capabilities'
          }
        ],
        gapIndicators: [
          'Unclear when COPPA applies',
          'Limited age verification awareness',
          'No understanding of school exception',
          'Confusion about consent requirements'
        ],
        remediationActions: {
          'Level 1→2': 'Complete basic COPPA training for educators',
          'Level 2→3': 'Develop clear understanding of COPPA applicability',
          'Level 3→4': 'Implement systematic COPPA compliance procedures',
          'Level 4→5': 'Become COPPA expert and mentor other teachers'
        }
      },
      {
        id: 'age-verification-procedures',
        title: 'Age Verification Procedures',
        description: 'How do you verify student ages for COPPA compliance?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No systematic age verification process'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic age awareness but inconsistent verification'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic age verification with clear procedures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive age verification with documentation'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary age verification with automated systems'
          }
        ],
        gapIndicators: [
          'No age verification process',
          'Unclear student age information',
          'No documentation of verification',
          'Inconsistent application across tools'
        ],
        remediationActions: {
          'Level 1→2': 'Establish basic age verification procedures',
          'Level 2→3': 'Implement systematic verification with documentation',
          'Level 3→4': 'Add comprehensive verification and tracking',
          'Level 4→5': 'Deploy automated age verification systems'
        }
      },
      {
        id: 'parental-consent-classroom',
        title: 'Parental Consent in Classroom',
        description: 'How do you manage parental consent for COPPA-covered applications?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No systematic parental consent process'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic consent process but inconsistent application'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic consent process with clear procedures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive consent management with tracking'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary consent management with dynamic updates'
          }
        ],
        gapIndicators: [
          'No parental consent process',
          'Unclear consent requirements',
          'No consent tracking system',
          'Limited parent communication'
        ],
        remediationActions: {
          'Level 1→2': 'Develop basic parental consent procedures',
          'Level 2→3': 'Implement systematic consent process',
          'Level 3→4': 'Add comprehensive consent tracking and management',
          'Level 4→5': 'Deploy dynamic consent management system'
        }
      },
      {
        id: 'app-evaluation-coppa',
        title: 'App Evaluation for COPPA',
        description: 'How do you evaluate classroom apps for COPPA compliance?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No COPPA evaluation of classroom apps'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic COPPA awareness but limited app evaluation'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic COPPA evaluation with clear criteria'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive app evaluation with documentation'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level app evaluation with risk assessment'
          }
        ],
        gapIndicators: [
          'No COPPA app evaluation',
          'Unclear evaluation criteria',
          'Limited compliance assessment',
          'No documentation of evaluations'
        ],
        remediationActions: {
          'Level 1→2': 'Learn basic COPPA app evaluation criteria',
          'Level 2→3': 'Develop systematic evaluation process',
          'Level 3→4': 'Implement comprehensive evaluation with documentation',
          'Level 4→5': 'Become expert in COPPA app evaluation and risk assessment'
        }
      },
      {
        id: 'data-minimization-classroom',
        title: 'Data Minimization in Classroom',
        description: 'How do you implement data minimization principles when using apps with young students?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No consideration of data minimization principles'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but limited implementation'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic data minimization with clear practices'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive data minimization with monitoring'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary data minimization with continuous optimization'
          }
        ],
        gapIndicators: [
          'No data minimization practices',
          'Unclear about necessary data',
          'No evaluation of data collection',
          'Limited privacy-by-design thinking'
        ],
        remediationActions: {
          'Level 1→2': 'Learn data minimization principles',
          'Level 2→3': 'Implement systematic data minimization practices',
          'Level 3→4': 'Add comprehensive monitoring and optimization',
          'Level 4→5': 'Establish exemplary practices with continuous improvement'
        }
      }
    ]
  }
];