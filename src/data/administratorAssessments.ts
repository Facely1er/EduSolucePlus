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

export const administratorAssessments: Assessment[] = [
  {
    id: 'ferpa-fundamentals-administrators',
    title: 'FERPA Fundamentals for Administrators',
    description: 'Comprehensive assessment of FERPA knowledge for educational administrators',
    questions: 15,
    estimatedTime: 30,
    regulation: 'ferpa',
    level: 'intermediate',
    areas: [
      {
        id: 'education-records-management',
        title: 'Education Records Management',
        description: 'How effectively does your institution manage education records under FERPA?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Ad hoc records management; unclear policies and procedures'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic records management with some documented procedures'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic records management with clear policies and procedures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive records management with monitoring and compliance tracking'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary records management with continuous improvement and best practices'
          }
        ],
        gapIndicators: [
          'Unclear what constitutes education records',
          'No centralized records management system',
          'Inconsistent access controls',
          'Limited staff training on records handling',
          'No audit trail for record access'
        ],
        remediationActions: {
          'Level 1→2': 'Develop basic FERPA policy and identify all education records systems',
          'Level 2→3': 'Implement systematic records management procedures and staff training',
          'Level 3→4': 'Add comprehensive monitoring, audit trails, and compliance tracking',
          'Level 4→5': 'Establish continuous improvement process and industry best practices'
        }
      },
      {
        id: 'directory-information-policies',
        title: 'Directory Information Policies',
        description: 'How well does your institution manage directory information disclosure policies?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No clear directory information policy; inconsistent disclosure practices'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic directory information policy but limited implementation'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear directory information policy with systematic implementation'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive directory information management with opt-out tracking'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary directory information practices with continuous monitoring'
          }
        ],
        gapIndicators: [
          'No defined directory information categories',
          'Unclear annual notification process',
          'No opt-out tracking system',
          'Inconsistent disclosure practices',
          'Limited staff awareness of directory information rules'
        ],
        remediationActions: {
          'Level 1→2': 'Define directory information categories and establish basic notification procedures',
          'Level 2→3': 'Implement systematic annual notification and opt-out procedures',
          'Level 3→4': 'Add comprehensive opt-out tracking and staff training',
          'Level 4→5': 'Establish continuous monitoring and optimization of directory practices'
        }
      },
      {
        id: 'staff-training-awareness',
        title: 'Staff Training and Awareness',
        description: 'How effective is your institution\'s FERPA training and awareness program?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Limited or no FERPA training; staff unaware of responsibilities'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic training provided but not comprehensive or regular'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic training program with regular updates and role-specific content'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive training with competency assessment and tracking'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary training program with continuous improvement and mentoring'
          }
        ],
        gapIndicators: [
          'No formal FERPA training program',
          'Staff unclear about FERPA requirements',
          'No tracking of training completion',
          'Limited role-specific training',
          'No competency assessment or refresher training'
        ],
        remediationActions: {
          'Level 1→2': 'Develop basic FERPA training program for all staff',
          'Level 2→3': 'Implement role-specific training with regular updates',
          'Level 3→4': 'Add competency assessment and tracking systems',
          'Level 4→5': 'Establish mentoring program and continuous improvement process'
        }
      },
      {
        id: 'vendor-third-party-management',
        title: 'Vendor and Third-Party Management',
        description: 'How effectively does your institution manage FERPA compliance with vendors and third parties?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No systematic vendor assessment; limited FERPA compliance oversight'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic vendor agreements but limited FERPA-specific requirements'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic vendor assessment with FERPA compliance requirements'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive vendor management with ongoing monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary vendor management with continuous risk assessment'
          }
        ],
        gapIndicators: [
          'No vendor FERPA compliance assessment',
          'Limited data processing agreements',
          'Unclear vendor access controls',
          'No ongoing vendor monitoring',
          'Limited incident response coordination with vendors'
        ],
        remediationActions: {
          'Level 1→2': 'Develop vendor assessment process and basic FERPA requirements',
          'Level 2→3': 'Implement systematic vendor evaluation with comprehensive agreements',
          'Level 3→4': 'Add ongoing monitoring and performance management',
          'Level 4→5': 'Establish continuous risk assessment and vendor optimization'
        }
      },
      {
        id: 'audit-compliance-monitoring',
        title: 'Audit and Compliance Monitoring',
        description: 'How robust are your institution\'s FERPA audit and compliance monitoring capabilities?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No systematic audit or monitoring; reactive approach to compliance'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic compliance monitoring with limited audit capabilities'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic audit and monitoring with regular compliance assessments'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive audit program with continuous monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary audit and monitoring with predictive compliance management'
          }
        ],
        gapIndicators: [
          'No regular compliance audits',
          'Limited monitoring of FERPA compliance',
          'No metrics or KPIs for privacy compliance',
          'Unclear incident response procedures',
          'No continuous improvement process'
        ],
        remediationActions: {
          'Level 1→2': 'Establish basic compliance monitoring and periodic audits',
          'Level 2→3': 'Implement systematic audit program with clear metrics',
          'Level 3→4': 'Add continuous monitoring and automated compliance tracking',
          'Level 4→5': 'Establish predictive compliance management and optimization'
        }
      }
    ]
  },
  {
    id: 'privacy-governance-framework',
    title: 'Privacy Governance Framework',
    description: 'Assessment of institutional privacy governance and leadership',
    questions: 12,
    estimatedTime: 25,
    regulation: 'general',
    level: 'advanced',
    areas: [
      {
        id: 'privacy-leadership-structure',
        title: 'Privacy Leadership Structure',
        description: 'How well established is your institution\'s privacy leadership and governance structure?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No designated privacy leadership; unclear accountability'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic privacy roles assigned but limited authority or resources'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear privacy leadership with defined roles and responsibilities'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive privacy governance with executive support'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary privacy leadership with strategic integration'
          }
        ],
        gapIndicators: [
          'No designated privacy officer or lead',
          'Unclear privacy governance structure',
          'Limited executive support for privacy initiatives',
          'No privacy committee or working group',
          'Insufficient resources for privacy program'
        ],
        remediationActions: {
          'Level 1→2': 'Designate privacy officer and establish basic governance structure',
          'Level 2→3': 'Formalize privacy roles and secure executive support',
          'Level 3→4': 'Implement comprehensive governance with adequate resources',
          'Level 4→5': 'Establish strategic privacy leadership and innovation'
        }
      },
      {
        id: 'emergency-disclosure-protocols',
        title: 'Emergency Disclosure Protocols',
        description: 'How prepared is your institution to handle emergency disclosure situations?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No emergency disclosure procedures; unclear decision-making process'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic emergency procedures but limited staff awareness'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear emergency disclosure procedures with staff training'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive emergency protocols with oversight mechanisms'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary emergency response with continuous improvement'
          }
        ],
        gapIndicators: [
          'No emergency disclosure procedures',
          'Unclear decision-making authority',
          'Limited staff training on emergency situations',
          'No documentation requirements for emergency disclosures',
          'No post-incident review process'
        ],
        remediationActions: {
          'Level 1→2': 'Develop emergency disclosure procedures and decision-making framework',
          'Level 2→3': 'Implement staff training and clear documentation requirements',
          'Level 3→4': 'Add oversight mechanisms and post-incident review processes',
          'Level 4→5': 'Establish continuous improvement and best practice sharing'
        }
      },
      {
        id: 'policy-development-implementation',
        title: 'Policy Development and Implementation',
        description: 'How comprehensive and effective are your institution\'s privacy policies?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Minimal privacy policies; unclear implementation'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic policies exist but limited comprehensiveness or implementation'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Comprehensive policies with systematic implementation'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Advanced policy framework with regular review and updates'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary policy framework with continuous optimization'
          }
        ],
        gapIndicators: [
          'Outdated or incomplete privacy policies',
          'Policies not aligned with current regulations',
          'Limited stakeholder input in policy development',
          'No regular policy review process',
          'Unclear policy implementation procedures'
        ],
        remediationActions: {
          'Level 1→2': 'Update policies to align with current regulations and best practices',
          'Level 2→3': 'Implement comprehensive policy framework with stakeholder input',
          'Level 3→4': 'Establish regular review and update procedures',
          'Level 4→5': 'Create continuous optimization process with industry benchmarking'
        }
      },
      {
        id: 'compliance-reporting-metrics',
        title: 'Compliance Reporting and Metrics',
        description: 'How effectively does your institution measure and report on privacy compliance?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No compliance metrics or reporting; limited visibility into compliance status'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic compliance reporting with limited metrics'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic compliance reporting with comprehensive metrics'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Advanced reporting with dashboard and trend analysis'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary reporting with predictive analytics and benchmarking'
          }
        ],
        gapIndicators: [
          'No compliance metrics or KPIs',
          'Limited reporting to leadership',
          'No trend analysis or benchmarking',
          'Unclear compliance status visibility',
          'No data-driven decision making for privacy'
        ],
        remediationActions: {
          'Level 1→2': 'Establish basic compliance metrics and reporting framework',
          'Level 2→3': 'Implement comprehensive metrics with regular leadership reporting',
          'Level 3→4': 'Add dashboard and trend analysis capabilities',
          'Level 4→5': 'Establish predictive analytics and industry benchmarking'
        }
      },
      {
        id: 'incident-response-management',
        title: 'Incident Response Management',
        description: 'How prepared is your institution to respond to privacy incidents and data breaches?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No incident response plan; reactive approach to privacy incidents'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic incident response procedures but limited testing or training'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Comprehensive incident response plan with regular testing'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Advanced incident response with coordination and communication plans'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary incident response with continuous improvement'
          }
        ],
        gapIndicators: [
          'No written incident response plan',
          'Unclear escalation procedures',
          'Limited staff training on incident response',
          'No testing or simulation exercises',
          'No post-incident analysis process'
        ],
        remediationActions: {
          'Level 1→2': 'Develop comprehensive incident response plan and procedures',
          'Level 2→3': 'Implement regular training and testing of incident response',
          'Level 3→4': 'Add advanced coordination and communication capabilities',
          'Level 4→5': 'Establish continuous improvement and best practice sharing'
        }
      }
    ]
  },
  {
    id: 'multi-regulation-compliance',
    title: 'Multi-Regulation Privacy Compliance',
    description: 'Assessment of compliance across multiple privacy regulations applicable to educational institutions',
    questions: 18,
    estimatedTime: 35,
    regulation: 'general',
    level: 'advanced',
    areas: [
      {
        id: 'regulatory-landscape-awareness',
        title: 'Regulatory Landscape Awareness',
        description: 'How well does your institution understand the full privacy regulatory landscape?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Limited awareness of privacy regulations beyond basic FERPA'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness of multiple regulations but limited implementation'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding of applicable regulations with systematic compliance'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive regulatory compliance with integrated approach'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Expert regulatory knowledge with strategic compliance planning'
          }
        ],
        gapIndicators: [
          'Unaware of state-specific privacy laws',
          'No assessment of international regulation applicability',
          'Limited understanding of regulation interactions',
          'No systematic tracking of regulatory changes',
          'Unclear compliance prioritization across regulations'
        ],
        remediationActions: {
          'Level 1→2': 'Conduct comprehensive regulatory landscape assessment',
          'Level 2→3': 'Develop multi-regulation compliance framework',
          'Level 3→4': 'Implement integrated compliance management approach',
          'Level 4→5': 'Establish strategic regulatory intelligence and planning'
        }
      },
      {
        id: 'cross-border-data-management',
        title: 'Cross-Border Data Management',
        description: 'How effectively does your institution handle international data transfers and GDPR compliance?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No consideration of international data transfer requirements'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but limited implementation of international requirements'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic approach to international data transfers with GDPR compliance'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive international data management with monitoring'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary international data management with strategic planning'
          }
        ],
        gapIndicators: [
          'No inventory of international data transfers',
          'Unclear GDPR applicability assessment',
          'No data processing agreements for international transfers',
          'Limited understanding of adequacy decisions',
          'No monitoring of international data flows'
        ],
        remediationActions: {
          'Level 1→2': 'Assess international data transfers and GDPR applicability',
          'Level 2→3': 'Implement systematic international data management procedures',
          'Level 3→4': 'Add comprehensive monitoring and agreement management',
          'Level 4→5': 'Establish strategic international data governance'
        }
      }
    ]
  },
  {
    id: 'strategic-privacy-management',
    title: 'Strategic Privacy Management',
    description: 'Assessment of strategic approach to privacy as institutional priority',
    questions: 10,
    estimatedTime: 20,
    regulation: 'general',
    level: 'advanced',
    areas: [
      {
        id: 'privacy-culture-development',
        title: 'Privacy Culture Development',
        description: 'How effectively has your institution developed a culture of privacy awareness?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Privacy viewed as compliance burden; limited cultural integration'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Growing privacy awareness but not fully integrated into culture'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Privacy culture emerging with systematic awareness programs'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Strong privacy culture with widespread awareness and engagement'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary privacy culture with innovation and thought leadership'
          }
        ],
        gapIndicators: [
          'Privacy seen only as compliance requirement',
          'Limited staff engagement with privacy initiatives',
          'No privacy champions or advocates',
          'Unclear privacy value proposition',
          'No integration of privacy into institutional mission'
        ],
        remediationActions: {
          'Level 1→2': 'Develop privacy awareness campaign and identify champions',
          'Level 2→3': 'Implement systematic culture development with leadership support',
          'Level 3→4': 'Establish comprehensive engagement and recognition programs',
          'Level 4→5': 'Create innovation program and thought leadership initiatives'
        }
      },
      {
        id: 'technology-privacy-integration',
        title: 'Technology and Privacy Integration',
        description: 'How well integrated are privacy considerations in your technology planning and implementation?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Privacy considered after technology implementation; reactive approach'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic privacy review of technology but not systematic'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic privacy integration in technology planning'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive privacy-by-design implementation'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary privacy integration with innovation and optimization'
          }
        ],
        gapIndicators: [
          'No privacy impact assessments for new technology',
          'Privacy not considered in technology procurement',
          'Limited privacy-by-design implementation',
          'No systematic review of existing technology',
          'Unclear privacy requirements for technology projects'
        ],
        remediationActions: {
          'Level 1→2': 'Establish privacy impact assessment process for technology',
          'Level 2→3': 'Implement systematic privacy integration in technology planning',
          'Level 3→4': 'Deploy comprehensive privacy-by-design framework',
          'Level 4→5': 'Establish innovation and optimization program for privacy technology'
        }
      },
      {
        id: 'stakeholder-engagement-communication',
        title: 'Stakeholder Engagement and Communication',
        description: 'How effectively does your institution engage stakeholders on privacy matters?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Limited stakeholder engagement; privacy communication reactive'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic stakeholder communication but not systematic'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic stakeholder engagement with clear communication'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive stakeholder engagement with feedback integration'
          },
          {
            level: 'Level 5 - Optimized (81-100%)',
            percentage: '81-100%',
            description: 'Exemplary stakeholder engagement with continuous dialogue'
          }
        ],
        gapIndicators: [
          'No systematic parent/student privacy communication',
          'Limited staff engagement on privacy initiatives',
          'No feedback mechanisms for privacy concerns',
          'Unclear privacy communication strategy',
          'No transparency reporting on privacy practices'
        ],
        remediationActions: {
          'Level 1→2': 'Develop privacy communication strategy and stakeholder outreach',
          'Level 2→3': 'Implement systematic engagement with feedback mechanisms',
          'Level 3→4': 'Establish comprehensive stakeholder dialogue and transparency',
          'Level 4→5': 'Create continuous engagement and thought leadership program'
        }
      }
    ]
  }
];