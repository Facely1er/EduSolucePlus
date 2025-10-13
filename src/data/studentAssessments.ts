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

export const studentAssessments: Assessment[] = [
  {
    id: 'student-privacy-rights',
    title: 'Student Privacy Rights',
    description: 'Learn about your privacy rights as a student',
    questions: 8,
    estimatedTime: 15,
    regulation: 'general',
    level: 'beginner',
    areas: [
      {
        id: 'understanding-education-records',
        title: 'Understanding Your Education Records',
        description: 'How well do you understand what education records are and your rights regarding them?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Little to no understanding of what education records are or student rights'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness that records exist but unclear about rights'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding of education records and basic rights'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive understanding with ability to exercise rights'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert understanding with ability to help other students'
          }
        ],
        gapIndicators: [
          'Unclear what information schools keep about you',
          'Don\'t know how to access your records',
          'Unaware of who can see your information',
          'Don\'t understand your privacy rights'
        ],
        remediationActions: {
          'Level 1→2': 'Learn basic information about education records and student rights',
          'Level 2→3': 'Understand specific types of records and access procedures',
          'Level 3→4': 'Learn how to exercise your rights and request records',
          'Level 4→5': 'Become knowledgeable enough to help other students understand their rights'
        }
      },
      {
        id: 'parental-rights-transition',
        title: 'Parental Rights Transition',
        description: 'How well do you understand the transition of privacy rights from parents to students?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No understanding of when privacy rights transfer from parents to students'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness that rights change but unclear about timing'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding of when and how rights transfer'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive understanding with practical application'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert understanding with ability to navigate complex situations'
          }
        ],
        gapIndicators: [
          'Unclear when you gain privacy rights',
          'Don\'t understand eligible student status',
          'Confused about parent vs. student access',
          'Unaware of age-related changes'
        ],
        remediationActions: {
          'Level 1→2': 'Learn about eligible student status and age requirements',
          'Level 2→3': 'Understand the specific transition process and timing',
          'Level 3→4': 'Learn how to exercise your new rights effectively',
          'Level 4→5': 'Develop expertise in navigating complex rights situations'
        }
      },
      {
        id: 'directory-information-awareness',
        title: 'Directory Information Awareness',
        description: 'How well do you understand directory information and your opt-out rights?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No awareness of directory information or opt-out rights'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but unclear about specific information types'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding of directory information and opt-out process'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive understanding with active management of preferences'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert understanding with strategic privacy management'
          }
        ],
        gapIndicators: [
          'Unclear what directory information includes',
          'Don\'t know about opt-out options',
          'Unaware of public disclosure implications',
          'No active management of directory preferences'
        ],
        remediationActions: {
          'Level 1→2': 'Learn what directory information includes and why it matters',
          'Level 2→3': 'Understand opt-out process and how to exercise this right',
          'Level 3→4': 'Actively manage your directory information preferences',
          'Level 4→5': 'Develop strategic approach to privacy management'
        }
      },
      {
        id: 'complaint-process-understanding',
        title: 'Complaint Process Understanding',
        description: 'How well do you understand the process for filing privacy complaints?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No knowledge of complaint processes or where to seek help'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness that complaints can be filed but unclear about process'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding of complaint process and procedures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive understanding with confidence to file complaints'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert understanding with ability to help others navigate the process'
          }
        ],
        gapIndicators: [
          'Don\'t know where to file complaints',
          'Unclear about what constitutes a violation',
          'No knowledge of investigation process',
          'Unaware of available remedies'
        ],
        remediationActions: {
          'Level 1→2': 'Learn about available complaint processes and resources',
          'Level 2→3': 'Understand specific procedures and requirements for filing complaints',
          'Level 3→4': 'Develop confidence to file complaints when necessary',
          'Level 4→5': 'Become resource for helping other students with complaint processes'
        }
      }
    ]
  },
  {
    id: 'digital-privacy-basics',
    title: 'Digital Privacy Basics',
    description: 'Fundamental concepts of privacy in digital environments',
    questions: 10,
    estimatedTime: 20,
    regulation: 'general',
    level: 'beginner',
    areas: [
      {
        id: 'personal-information-protection',
        title: 'Personal Information Protection',
        description: 'How well do you understand what personal information is and how to protect it?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Limited understanding of what constitutes personal information'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but inconsistent protection practices'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding with systematic protection practices'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive understanding with advanced protection strategies'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert-level understanding with ability to teach others'
          }
        ],
        gapIndicators: [
          'Unclear what information is considered personal',
          'Share personal information without thinking',
          'No systematic approach to information protection',
          'Limited awareness of information value'
        ],
        remediationActions: {
          'Level 1→2': 'Learn to identify different types of personal information',
          'Level 2→3': 'Develop systematic practices for protecting personal information',
          'Level 3→4': 'Implement advanced protection strategies and risk assessment',
          'Level 4→5': 'Become expert in personal information protection and help others'
        }
      },
      {
        id: 'password-security-practices',
        title: 'Password Security Practices',
        description: 'How effectively do you create and manage secure passwords?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Weak password practices; reuse of simple passwords'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic password security but inconsistent application'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Strong password practices with systematic approach'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Advanced password security with password manager use'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert password security with multi-factor authentication'
          }
        ],
        gapIndicators: [
          'Use of weak or simple passwords',
          'Reuse passwords across multiple accounts',
          'No password manager usage',
          'Unclear about multi-factor authentication'
        ],
        remediationActions: {
          'Level 1→2': 'Learn to create strong, unique passwords',
          'Level 2→3': 'Implement systematic password management practices',
          'Level 3→4': 'Start using password manager and advanced security features',
          'Level 4→5': 'Master advanced authentication methods and help others'
        }
      },
      {
        id: 'online-tracking-awareness',
        title: 'Online Tracking Awareness',
        description: 'How well do you understand online tracking and how to limit it?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No awareness of online tracking or data collection'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but limited understanding of implications'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding with basic protection measures'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive understanding with advanced protection tools'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert understanding with sophisticated privacy tools'
          }
        ],
        gapIndicators: [
          'No awareness of cookies and tracking',
          'Don\'t understand data collection practices',
          'No use of privacy tools or settings',
          'Limited understanding of tracking implications'
        ],
        remediationActions: {
          'Level 1→2': 'Learn about cookies, tracking, and data collection',
          'Level 2→3': 'Implement basic privacy settings and tools',
          'Level 3→4': 'Use advanced privacy tools and browser extensions',
          'Level 4→5': 'Master sophisticated privacy protection techniques'
        }
      },
      {
        id: 'app-permission-management',
        title: 'App Permission Management',
        description: 'How effectively do you manage app permissions and data access?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Accept all app permissions without consideration'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but inconsistent permission management'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic approach to reviewing and managing permissions'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive permission management with regular audits'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert permission management with privacy-first approach'
          }
        ],
        gapIndicators: [
          'Accept permissions without reading',
          'Don\'t understand what permissions mean',
          'No regular review of app permissions',
          'Unclear about data access implications'
        ],
        remediationActions: {
          'Level 1→2': 'Learn to read and understand app permissions',
          'Level 2→3': 'Develop systematic approach to permission management',
          'Level 3→4': 'Implement regular permission audits and optimization',
          'Level 4→5': 'Master privacy-first app selection and management'
        }
      },
      {
        id: 'digital-footprint-awareness',
        title: 'Digital Footprint Awareness',
        description: 'How well do you understand and manage your digital footprint?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No awareness of digital footprint or long-term implications'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but limited footprint management'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding with active footprint management'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive footprint management with strategic thinking'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert footprint management with reputation awareness'
          }
        ],
        gapIndicators: [
          'No consideration of long-term digital impact',
          'Unclear about information permanence',
          'No active management of online presence',
          'Limited understanding of reputation implications'
        ],
        remediationActions: {
          'Level 1→2': 'Learn about digital footprints and their permanence',
          'Level 2→3': 'Start actively managing your online presence',
          'Level 3→4': 'Develop strategic approach to digital reputation',
          'Level 4→5': 'Master comprehensive digital footprint management'
        }
      }
    ]
  },
  {
    id: 'social-media-privacy',
    title: 'Social Media Privacy',
    description: 'Protecting your privacy on social media platforms',
    questions: 8,
    estimatedTime: 15,
    regulation: 'general',
    level: 'beginner',
    areas: [
      {
        id: 'privacy-settings-mastery',
        title: 'Privacy Settings Mastery',
        description: 'How effectively do you use privacy settings on social media platforms?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Use default settings without customization'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic privacy settings but incomplete configuration'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic privacy settings configuration across platforms'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Advanced privacy configuration with regular updates'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert privacy settings with platform-specific optimization'
          }
        ],
        gapIndicators: [
          'Never changed default privacy settings',
          'Unclear about available privacy options',
          'No regular review of settings',
          'Inconsistent settings across platforms'
        ],
        remediationActions: {
          'Level 1→2': 'Learn to locate and adjust basic privacy settings',
          'Level 2→3': 'Systematically configure privacy settings on all platforms',
          'Level 3→4': 'Implement advanced privacy configurations and regular reviews',
          'Level 4→5': 'Master platform-specific privacy optimization techniques'
        }
      },
      {
        id: 'content-sharing-awareness',
        title: 'Content Sharing Awareness',
        description: 'How thoughtfully do you consider what content to share on social media?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Share content without considering privacy implications'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but inconsistent content evaluation'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic approach to evaluating content before sharing'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive content evaluation with long-term thinking'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert content curation with strategic privacy management'
          }
        ],
        gapIndicators: [
          'Share personal information without thinking',
          'No consideration of audience or permanence',
          'Unclear about content implications',
          'No systematic content evaluation process'
        ],
        remediationActions: {
          'Level 1→2': 'Learn to pause and think before sharing content',
          'Level 2→3': 'Develop systematic content evaluation criteria',
          'Level 3→4': 'Implement comprehensive content strategy with long-term view',
          'Level 4→5': 'Master strategic content curation and privacy management'
        }
      },
      {
        id: 'friend-connection-management',
        title: 'Friend and Connection Management',
        description: 'How carefully do you manage your social media connections and friend requests?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Accept all friend requests without verification'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic caution but inconsistent connection management'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic approach to managing connections and requests'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive connection management with regular audits'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert connection management with strategic networking'
          }
        ],
        gapIndicators: [
          'Accept unknown friend requests',
          'No verification of connection identity',
          'Large number of unknown connections',
          'No regular review of connections'
        ],
        remediationActions: {
          'Level 1→2': 'Learn to verify identity before accepting connections',
          'Level 2→3': 'Develop systematic connection management practices',
          'Level 3→4': 'Implement regular connection audits and cleanup',
          'Level 4→5': 'Master strategic networking with privacy protection'
        }
      },
      {
        id: 'location-sharing-control',
        title: 'Location Sharing Control',
        description: 'How effectively do you control location sharing on social media?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'Automatic location sharing without awareness'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but inconsistent location control'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Systematic location sharing control with clear preferences'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive location privacy with strategic sharing'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert location privacy with advanced security awareness'
          }
        ],
        gapIndicators: [
          'Automatic location tagging enabled',
          'No awareness of location sharing risks',
          'Inconsistent location privacy settings',
          'No consideration of safety implications'
        ],
        remediationActions: {
          'Level 1→2': 'Learn to disable automatic location sharing',
          'Level 2→3': 'Develop systematic location sharing preferences',
          'Level 3→4': 'Implement comprehensive location privacy strategy',
          'Level 4→5': 'Master advanced location privacy and security practices'
        }
      },
      {
        id: 'platform-specific-risks',
        title: 'Platform-Specific Risk Awareness',
        description: 'How well do you understand the unique privacy risks of different social media platforms?',
        currentStates: [
          {
            level: 'Level 1 - Initial (0-20%)',
            percentage: '0-20%',
            description: 'No awareness of platform-specific privacy risks'
          },
          {
            level: 'Level 2 - Developing (21-40%)',
            percentage: '21-40%',
            description: 'Basic awareness but limited platform-specific knowledge'
          },
          {
            level: 'Level 3 - Defined (41-60%)',
            percentage: '41-60%',
            description: 'Clear understanding of major platform privacy differences'
          },
          {
            level: 'Level 4 - Managed (61-80%)',
            percentage: '61-80%',
            description: 'Comprehensive platform knowledge with tailored strategies'
          },
          {
            level: 'Level 5 - Advanced (81-100%)',
            percentage: '81-100%',
            description: 'Expert platform analysis with cutting-edge privacy awareness'
          }
        ],
        gapIndicators: [
          'Treat all platforms the same way',
          'Unclear about platform data practices',
          'No platform-specific privacy strategies',
          'Limited understanding of emerging risks'
        ],
        remediationActions: {
          'Level 1→2': 'Learn about major differences between social media platforms',
          'Level 2→3': 'Develop platform-specific privacy understanding',
          'Level 3→4': 'Create tailored privacy strategies for each platform',
          'Level 4→5': 'Master cutting-edge platform analysis and risk assessment'
        }
      }
    ]
  }
];