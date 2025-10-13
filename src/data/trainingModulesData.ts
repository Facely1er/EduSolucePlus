 // Training Modules Data and TypeScript Interfaces
// Integrated with existing assessment and compliance calendar systems

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  link?: string;
  icon?: string;
  priority?: 'low' | 'medium' | 'high';
  category?: 'training' | 'assessment' | 'compliance' | 'system';
  expiresAt?: number; // Optional expiration timestamp
}

export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'video' | 'reading' | 'quiz' | 'interactive' | 'assignment';
  required: boolean;
  completed?: boolean;
  resources?: {
    title: string;
    url: string;
    type: 'pdf' | 'video' | 'link' | 'document';
  }[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'privacy' | 'security' | 'compliance' | 'technical' | 'leadership';
  regulation: 'ferpa' | 'coppa' | 'gdpr' | 'general' | 'hipaa' | 'ppra';
  level: 'beginner' | 'intermediate' | 'advanced';
  targetRoles: ('administrator' | 'teacher' | 'it-staff' | 'student')[];
  duration: number; // total duration in minutes
  format: 'interactive' | 'video-series' | 'workshop' | 'self-paced' | 'hybrid';
  learningObjectives: string[];
  prerequisites: string[];
  syllabus: SyllabusItem[];
  tags: string[];
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    credentials: string[];
  };
  achievements: {
    id: string;
    title: string;
    description: string;
    points: number;
  }[];
  featured: boolean;
  popularity: number; // 1-5 rating
  enrollmentCount: number;
  completionRate: number; // percentage
  lastUpdated: string;
  progress?: number; // user's progress percentage
  status?: 'not-started' | 'in-progress' | 'completed';
  estimatedCompletion?: string; // estimated completion date
  
  // Integration with existing assessment system
  relatedAssessmentAreas?: string[]; // Links to assessment area IDs
  recommendedForMaturityLevels?: string[]; // e.g., ["Level 1→2", "Level 2→3"]
  
  // Integration with compliance calendar
  linkedComplianceEvents?: string[]; // Links to compliance calendar event IDs
  schedulingRecommendations?: {
    beforeEvent: string; // compliance event ID
    daysBeforeDeadline: number;
  }[];
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  regulation: 'ferpa' | 'coppa' | 'gdpr' | 'general' | 'hipaa' | 'ppra';
  targetRole: 'administrator' | 'teacher' | 'it-staff' | 'student';
  level: 'beginner' | 'intermediate' | 'advanced';
  moduleIds: string[];
  duration: number; // total duration in hours
  difficulty: 'easy' | 'moderate' | 'challenging';
  prerequisites: string[];
  benefits: string[];
  
  // Integration with assessment system
  addressesAssessmentAreas?: string[]; // Assessment areas this path helps with
  maturityProgression?: {
    fromLevel: string;
    toLevel: string;
    assessmentArea: string;
  }[];
}

// Training module categories and filters
export const trainingCategories = [
  { id: 'privacy', name: 'Privacy & Data Protection', icon: 'shield' },
  { id: 'security', name: 'Cybersecurity', icon: 'lock' },
  { id: 'compliance', name: 'Regulatory Compliance', icon: 'check-circle' },
  { id: 'technical', name: 'Technical Implementation', icon: 'settings' },
  { id: 'leadership', name: 'Leadership & Governance', icon: 'users' }
];

export const regulationTypes = [
  { id: 'ferpa', name: 'FERPA', color: 'blue' },
  { id: 'coppa', name: 'COPPA', color: 'amber' },
  { id: 'gdpr', name: 'GDPR', color: 'green' },
  { id: 'ccpa', name: 'CCPA', color: 'purple' },
  { id: 'cpra', name: 'CPRA', color: 'indigo' },
  { id: 'pipeda', name: 'PIPEDA', color: 'red' },
  { id: 'bipa', name: 'BIPA', color: 'emerald' },
  { id: 'shield', name: 'SHIELD', color: 'slate' },
  { id: 'sopipa', name: 'SOPIPA', color: 'orange' },
  { id: 'vcdpa', name: 'VCDPA', color: 'teal' },
  { id: 'hipaa', name: 'HIPAA', color: 'pink' },
  { id: 'ppra', name: 'PPRA', color: 'indigo' },
  { id: 'general', name: 'General', color: 'purple' }
];

export const skillLevels = [
  { id: 'beginner', name: 'Beginner', color: 'emerald' },
  { id: 'intermediate', name: 'Intermediate', color: 'amber' },
  { id: 'advanced', name: 'Advanced', color: 'red' }
];

export const targetRoles = [
  { id: 'administrator', name: 'Administrator', icon: 'user-check' },
  { id: 'teacher', name: 'Teacher', icon: 'graduation-cap' },
  { id: 'it-staff', name: 'IT Staff', icon: 'monitor' },
  { id: 'student', name: 'Student', icon: 'book-open' }
];

// Comprehensive training modules linked to existing assessment system
export const trainingModules: TrainingModule[] = [
  {
    id: 'ferpa-fundamentals-administrators',
    title: 'FERPA Fundamentals Guide for Administrators',
    description: 'Comprehensive FERPA guide specifically designed for educational administrators',
    longDescription: 'Master FERPA compliance as an administrator with this comprehensive course covering education records management, directory information policies, parental rights, staff training, disclosure procedures, vendor management, emergency protocols, audit processes, complaint handling, and technology integration.',
    category: 'compliance',
    regulation: 'ferpa',
    level: 'beginner',
    targetRoles: ['administrator'],
    duration: 120,
    format: 'interactive',
    learningObjectives: [
      'Develop comprehensive FERPA policies and procedures',
      'Implement effective education records management systems',
      'Establish proper directory information and parental rights protocols',
      'Create staff training and awareness programs',
      'Manage vendor relationships for FERPA compliance',
      'Develop incident response and audit procedures'
    ],
    prerequisites: ['Basic understanding of educational administration'],
    syllabus: [
      {
        id: 'ferpa-admin-intro',
        title: 'FERPA Overview for Administrators',
        description: 'Administrative perspective on FERPA requirements',
        duration: 20,
        type: 'video',
        required: true
      },
      {
        id: 'records-management-admin',
        title: 'Education Records Management Systems',
        description: 'Implementing systematic records management',
        duration: 25,
        type: 'interactive',
        required: true
      },
      {
        id: 'directory-policies',
        title: 'Directory Information Policy Development',
        description: 'Creating and implementing directory information policies',
        duration: 20,
        type: 'assignment',
        required: true
      },
      {
        id: 'staff-training-program',
        title: 'Staff Training Program Development',
        description: 'Building effective FERPA training programs',
        duration: 30,
        type: 'interactive',
        required: true
      },
      {
        id: 'vendor-management',
        title: 'Vendor and Third-Party Management',
        description: 'FERPA compliance in vendor relationships',
        duration: 25,
        type: 'reading',
        required: true
      },
      {
        id: 'audit-compliance',
        title: 'Audit and Compliance Monitoring',
        description: 'Developing audit and monitoring procedures',
        duration: 20,
        type: 'interactive',
        required: true
      },
      {
        id: 'ferpa-admin-assessment',
        title: 'Administrator FERPA Assessment',
        description: 'Comprehensive assessment of FERPA knowledge',
        duration: 20,
        type: 'quiz',
        required: true
      }
    ],
    instructor: {
      name: "Privacy Team",
      title: "EduSoluce Privacy Experts",
      bio: "Privacy specialists with expertise in educational compliance regulations",
      avatar: "https://ui-avatars.com/api/?name=Privacy+Team&background=3b82f6&color=ffffff",
      credentials: ["Privacy", "Compliance", "Education"]
    },
    achievements: [
      {
        id: "ferpa-basics",
        title: "FERPA Basics",
        description: "Complete the FERPA fundamentals guide",
        points: 100
      },
      {
        id: "records-expert",
        title: "Records Management Expert",
        description: "Master education records management",
        points: 150
      }
    ],
    tags: ['ferpa', 'administration', 'compliance', 'policy', 'management'],
    featured: true,
    popularity: 4.7,
    enrollmentCount: 1250,
    completionRate: 87,
    lastUpdated: '2024-12-15',
    
    // Links to existing assessment areas
    relatedAssessmentAreas: [
      'education-records-management',
      'directory-information-policies', 
      'staff-training-awareness',
      'vendor-third-party-management',
      'audit-compliance-monitoring'
    ],
    recommendedForMaturityLevels: ['Level 1→2', 'Level 2→3'],
    
    // Links to compliance calendar
    linkedComplianceEvents: ['ferpa-annual-notice-2025'],
    schedulingRecommendations: [
      {
        beforeEvent: 'ferpa-annual-notice-2025',
        daysBeforeDeadline: 90
      }
    ]
  },
  {
    id: 'coppa-digital-safety-educators',
    title: 'COPPA Digital Safety Guide for Educators',
    description: 'Essential COPPA compliance guide for teachers working with students under 13',
    longDescription: 'Learn how to implement COPPA requirements in educational technology environments. This course covers age verification, parental consent, data minimization, vendor assessment, and creating COPPA-compliant learning environments.',
    category: 'privacy',
    regulation: 'coppa',
    level: 'intermediate',
    targetRoles: ['teacher', 'administrator'],
    duration: 80,
    format: 'video-series',
    learningObjectives: [
      'Understand COPPA requirements for students under 13',
      'Implement age verification and parental consent procedures',
      'Apply data minimization principles in educational technology',
      'Evaluate third-party services for COPPA compliance',
      'Create COPPA-compliant digital learning environments'
    ],
    prerequisites: ['Basic understanding of educational technology'],
    syllabus: [
      {
        id: 'coppa-overview-educators',
        title: 'COPPA Overview for Educators',
        description: 'Understanding COPPA in educational contexts',
        duration: 20,
        type: 'video',
        required: true
      },
      {
        id: 'age-verification-methods',
        title: 'Age Verification in Schools',
        description: 'Practical age verification methods for educators',
        duration: 25,
        type: 'interactive',
        required: true
      },
      {
        id: 'parental-consent-procedures',
        title: 'Parental Consent Management',
        description: 'Implementing consent procedures in classroom settings',
        duration: 30,
        type: 'assignment',
        required: true
      },
      {
        id: 'data-minimization-practice',
        title: 'Data Minimization in Education',
        description: 'Applying minimization principles with young students',
        duration: 25,
        type: 'interactive',
        required: true
      },
      {
        id: 'coppa-assessment',
        title: 'COPPA Compliance Assessment',
        description: 'Test your COPPA implementation knowledge',
        duration: 20,
        type: 'quiz',
        required: true
      }
    ],
    instructor: {
      name: "COPPA Compliance Team",
      title: "Child Privacy Specialists",
      bio: "Specialists focused on children's online privacy protection",
      avatar: "https://ui-avatars.com/api/?name=COPPA+Team&background=f59e0b&color=ffffff",
      credentials: ["COPPA", "Child Privacy", "Education"]
    },
    achievements: [
      {
        id: "coppa-basics",
        title: "COPPA Basics",
        description: "Complete the COPPA digital safety guide",
        points: 100
      },
      {
        id: "consent-master",
        title: "Consent Master",
        description: "Master parental consent procedures",
        points: 150
      }
    ],
    tags: ['coppa', 'digital-safety', 'children', 'privacy', 'education-technology'],
    featured: true,
    popularity: 4.5,
    enrollmentCount: 980,
    completionRate: 85,
    lastUpdated: '2024-11-20',
    
    relatedAssessmentAreas: [
      'coppa-policy-framework',
      'parental-consent-mechanisms',
      'age-verification-processes',
      'data-collection-minimization'
    ],
    recommendedForMaturityLevels: ['Level 1→2', 'Level 2→3'],
    
    linkedComplianceEvents: ['coppa-vendor-audit-q1-2025'],
    schedulingRecommendations: [
      {
        beforeEvent: 'coppa-vendor-audit-q1-2025',
        daysBeforeDeadline: 60
      }
    ]
  },
  {
    id: 'cybersecurity-fundamentals-education',
    title: 'Cybersecurity Fundamentals Guide for Education',
    description: 'Essential cybersecurity guide for educational professionals',
    longDescription: 'Comprehensive cybersecurity training designed specifically for educational environments. Learn about network security, access controls, data protection, backup procedures, incident response, and security monitoring to protect student data and school systems.',
    category: 'security',
    regulation: 'general',
    level: 'beginner',
    targetRoles: ['administrator', 'teacher', 'it-staff'],
    duration: 90,
    format: 'self-paced',
    learningObjectives: [
      'Understand cybersecurity threats in educational environments',
      'Implement network security and access controls',
      'Protect student data through encryption and secure practices',
      'Develop backup and disaster recovery procedures',
      'Create incident response and security monitoring capabilities'
    ],
    prerequisites: ['Basic computer literacy'],
    syllabus: [
      {
        id: 'cyber-threats-education',
        title: 'Cybersecurity Threats in Education',
        description: 'Understanding the threat landscape for schools',
        duration: 25,
        type: 'video',
        required: true
      },
      {
        id: 'network-security-basics',
        title: 'Network Security Fundamentals',
        description: 'Basic network security for educational systems',
        duration: 30,
        type: 'interactive',
        required: true
      },
      {
        id: 'access-control-implementation',
        title: 'Access Control Implementation',
        description: 'Managing user access to educational systems',
        duration: 25,
        type: 'reading',
        required: true
      },
      {
        id: 'data-protection-methods',
        title: 'Data Protection Methods',
        description: 'Protecting student data through technical safeguards',
        duration: 30,
        type: 'interactive',
        required: true
      },
      {
        id: 'incident-response-basics',
        title: 'Incident Response Basics',
        description: 'Responding to cybersecurity incidents in schools',
        duration: 25,
        type: 'assignment',
        required: true
      },
      {
        id: 'cybersecurity-assessment',
        title: 'Cybersecurity Knowledge Assessment',
        description: 'Comprehensive cybersecurity competency test',
        duration: 15,
        type: 'quiz',
        required: true
      }
    ],
    instructor: {
      name: "Cybersecurity Team",
      title: "Educational Security Experts",
      bio: "Security professionals specialized in educational technology environments",
      avatar: "https://ui-avatars.com/api/?name=Cyber+Team&background=dc2626&color=ffffff",
      credentials: ["Cybersecurity", "Education", "Data Protection"]
    },
    achievements: [
      {
        id: "security-basics",
        title: "Security Basics",
        description: "Complete the cybersecurity fundamentals guide",
        points: 100
      },
      {
        id: "threat-defender",
        title: "Threat Defender",
        description: "Identify educational security threats",
        points: 125
      }
    ],
    tags: ['cybersecurity', 'data-protection', 'network-security', 'incident-response'],
    featured: true,
    popularity: 4.6,
    enrollmentCount: 1850,
    completionRate: 82,
    lastUpdated: '2024-10-30',
    
    relatedAssessmentAreas: [
      'network-security-architecture',
      'access-control-systems',
      'data-encryption-protection',
      'security-monitoring-incident-response'
    ],
    recommendedForMaturityLevels: ['Level 1→2', 'Level 2→3'],
    
    linkedComplianceEvents: ['cybersecurity-framework-assessment-2025', 'annual-security-awareness-training-2025'],
    schedulingRecommendations: [
      {
        beforeEvent: 'annual-security-awareness-training-2025',
        daysBeforeDeadline: 45
      }
    ]
  },
  {
    id: 'gdpr-international-compliance',
    title: 'GDPR Compliance Guide for Educational Institutions',
    description: 'Comprehensive GDPR guide for schools with international students or EU operations',
    longDescription: 'Master GDPR compliance in educational settings. This advanced course covers data processing principles, lawful basis establishment, data subject rights, privacy impact assessments, international transfers, and consent management.',
    category: 'privacy',
    regulation: 'gdpr',
    level: 'advanced',
    targetRoles: ['administrator', 'it-staff'],
    duration: 140,
    format: 'workshop',
    learningObjectives: [
      'Understand GDPR principles and educational applicability',
      'Establish lawful basis for processing student data',
      'Implement data subject rights procedures',
      'Conduct privacy impact assessments',
      'Manage international data transfers',
      'Design GDPR-compliant consent mechanisms'
    ],
    prerequisites: ['Privacy law fundamentals', 'Advanced data protection concepts'],
    syllabus: [
      {
        id: 'gdpr-education-scope',
        title: 'GDPR Scope in Education',
        description: 'When and how GDPR applies to educational institutions',
        duration: 30,
        type: 'video',
        required: true
      },
      {
        id: 'lawful-basis-education',
        title: 'Lawful Basis for Educational Data Processing',
        description: 'Establishing proper legal grounds for student data processing',
        duration: 40,
        type: 'interactive',
        required: true
      },
      {
        id: 'data-subject-rights-implementation',
        title: 'Data Subject Rights Implementation',
        description: 'Technical and procedural implementation of GDPR rights',
        duration: 45,
        type: 'assignment',
        required: true
      },
      {
        id: 'privacy-impact-assessments',
        title: 'Privacy Impact Assessments',
        description: 'Conducting PIAs for educational technology and processes',
        duration: 40,
        type: 'interactive',
        required: true
      },
      {
        id: 'international-transfers',
        title: 'International Data Transfers',
        description: 'Managing cross-border data flows under GDPR',
        duration: 35,
        type: 'reading',
        required: true
      },
      {
        id: 'consent-management-gdpr',
        title: 'GDPR Consent Management',
        description: 'Designing compliant consent mechanisms',
        duration: 30,
        type: 'interactive',
        required: true
      },
      {
        id: 'gdpr-final-assessment',
        title: 'GDPR Compliance Assessment',
        description: 'Comprehensive GDPR implementation evaluation',
        duration: 20,
        type: 'quiz',
        required: true
      }
    ],
    instructor: {
      name: "GDPR Compliance Team",
      title: "Data Protection Specialists",
      bio: "International data protection experts focusing on educational compliance",
      avatar: "https://ui-avatars.com/api/?name=GDPR+Team&background=059669&color=ffffff",
      credentials: ["GDPR", "Data Protection", "International Privacy"]
    },
    achievements: [
      {
        id: "gdpr-basics",
        title: "GDPR Basics",
        description: "Complete the GDPR compliance guide",
        points: 150
      },
      {
        id: "data-rights-expert",
        title: "Data Rights Expert",
        description: "Master data subject rights implementation",
        points: 200
      }
    ],
    tags: ['gdpr', 'international-compliance', 'data-protection', 'privacy-impact-assessment'],
    featured: false,
    popularity: 4.8,
    enrollmentCount: 450,
    completionRate: 78,
    lastUpdated: '2024-09-15',
    
    relatedAssessmentAreas: [
      'gdpr-applicability-assessment',
      'lawful-basis-establishment',
      'data-subject-rights-management',
      'privacy-impact-assessment-systems',
      'international-data-transfers'
    ],
    recommendedForMaturityLevels: ['Level 3→4', 'Level 4→5'],
    
    linkedComplianceEvents: ['gdpr-data-subject-requests-review-2025'],
    schedulingRecommendations: [
      {
        beforeEvent: 'gdpr-data-subject-requests-review-2025',
        daysBeforeDeadline: 120
      }
    ]
  },
  {
    id: 'incident-response-education',
    title: 'Incident Response Guide for Educational Institutions',
    description: 'Comprehensive incident response guide for educational data breaches and security incidents',
    longDescription: 'Learn to effectively respond to data breaches and security incidents in educational environments. This course covers incident response team organization, detection procedures, containment strategies, investigation techniques, notification requirements, and post-incident analysis.',
    category: 'security',
    regulation: 'general',
    level: 'advanced',
    targetRoles: ['administrator', 'it-staff'],
    duration: 120,
    format: 'workshop',
    learningObjectives: [
      'Establish effective incident response teams and procedures',
      'Implement detection and identification capabilities',
      'Execute containment and mitigation strategies',
      'Manage legal and regulatory notification requirements',
      'Conduct forensic investigation and evidence preservation',
      'Perform post-incident analysis and improvement'
    ],
    prerequisites: ['Cybersecurity fundamentals', 'Basic networking knowledge'],
    syllabus: [
      {
        id: 'incident-response-planning',
        title: 'Incident Response Planning',
        description: 'Developing comprehensive incident response plans',
        duration: 30,
        type: 'interactive',
        required: true
      },
      {
        id: 'detection-identification',
        title: 'Detection and Identification',
        description: 'Identifying and classifying security incidents',
        duration: 25,
        type: 'video',
        required: true
      },
      {
        id: 'containment-strategies',
        title: 'Containment and Mitigation',
        description: 'Effective containment strategies for educational environments',
        duration: 35,
        type: 'interactive',
        required: true
      },
      {
        id: 'notification-procedures',
        title: 'Notification and Communication',
        description: 'Legal and regulatory notification requirements',
        duration: 30,
        type: 'reading',
        required: true
      },
      {
        id: 'forensic-investigation',
        title: 'Forensic Investigation Basics',
        description: 'Evidence preservation and investigation techniques',
        duration: 40,
        type: 'assignment',
        required: true
      },
      {
        id: 'post-incident-analysis',
        title: 'Post-Incident Analysis',
        description: 'Learning and improvement from security incidents',
        duration: 25,
        type: 'interactive',
        required: true
      },
      {
        id: 'incident-response-simulation',
        title: 'Incident Response Simulation',
        description: 'Practical incident response exercise',
        duration: 15,
        type: 'quiz',
        required: true
      }
    ],
    instructor: {
      name: "Incident Response Team",
      title: "Security Incident Specialists",
      bio: "Security professionals specialized in educational data breach response",
      avatar: "https://ui-avatars.com/api/?name=IR+Team&background=7c3aed&color=ffffff",
      credentials: ["Incident Response", "Forensics", "Security"]
    },
    achievements: [
      {
        id: "response-readiness",
        title: "Response Readiness",
        description: "Complete the incident response guide",
        points: 150
      },
      {
        id: "incident-handler",
        title: "Incident Handler",
        description: "Successfully complete incident simulation",
        points: 200
      }
    ],
    tags: ['incident-response', 'cybersecurity', 'data-breach', 'forensics', 'emergency-procedures'],
    featured: false,
    popularity: 4.4,
    enrollmentCount: 320,
    completionRate: 75,
    lastUpdated: '2024-11-05',
    
    relatedAssessmentAreas: [
      'incident-response-team-structure',
      'breach-identification-detection',
      'containment-mitigation-procedures',
      'notification-communication-procedures',
      'forensic-investigation-capabilities'
    ],
    recommendedForMaturityLevels: ['Level 2→3', 'Level 3→4'],
    
    linkedComplianceEvents: ['incident-response-plan-update-2025', 'data-breach-response'],
    schedulingRecommendations: [
      {
        beforeEvent: 'incident-response-plan-update-2025',
        daysBeforeDeadline: 90
      }
    ]
  },
  {
    id: 'privacy-fundamentals-teachers',
    title: 'Privacy Fundamentals Guide for Teachers',
    description: 'Essential privacy guide for classroom teachers and educational staff',
    longDescription: 'Build a strong foundation in student privacy protection with this course designed specifically for classroom teachers. Learn about education records, parent communication, classroom disclosures, student work privacy, and digital privacy basics.',
    category: 'privacy',
    regulation: 'general',
    level: 'beginner',
    targetRoles: ['teacher'],
    duration: 60,
    format: 'self-paced',
    learningObjectives: [
      'Understand education records and teacher responsibilities',
      'Implement proper parent communication procedures',
      'Manage classroom information disclosures appropriately',
      'Protect student work and personal information',
      'Apply digital privacy principles in classroom technology'
    ],
    prerequisites: ['Teaching certification or educational background'],
    syllabus: [
      {
        id: 'education-records-teachers',
        title: 'Education Records for Teachers',
        description: 'Understanding what constitutes education records in classroom settings',
        duration: 15,
        type: 'video',
        required: true
      },
      {
        id: 'parent-communication-privacy',
        title: 'Parent Communication and Privacy',
        description: 'Privacy-compliant communication with parents and families',
        duration: 20,
        type: 'interactive',
        required: true
      },
      {
        id: 'classroom-disclosure-rules',
        title: 'Classroom Disclosure Management',
        description: 'Managing information sharing within classroom environments',
        duration: 15,
        type: 'reading',
        required: true
      },
      {
        id: 'student-work-protection',
        title: 'Student Work Privacy Protection',
        description: 'Protecting student privacy when handling and displaying work',
        duration: 20,
        type: 'interactive',
        required: true
      },
      {
        id: 'digital-privacy-classroom',
        title: 'Digital Privacy in the Classroom',
        description: 'Privacy considerations for classroom technology use',
        duration: 15,
        type: 'video',
        required: true
      },
      {
        id: 'teacher-privacy-assessment',
        title: 'Teacher Privacy Knowledge Check',
        description: 'Assessment of privacy fundamentals for teachers',
        duration: 5,
        type: 'quiz',
        required: true
      }
    ],
    instructor: {
      name: "Teacher Privacy Team",
      title: "Classroom Privacy Specialists",
      bio: "Education specialists focused on classroom privacy practices",
      avatar: "https://ui-avatars.com/api/?name=Teacher+Team&background=16a34a&color=ffffff",
      credentials: ["Education", "Privacy", "Classroom Technology"]
    },
    achievements: [
      {
        id: "privacy-classroom",
        title: "Privacy in the Classroom",
        description: "Complete the privacy fundamentals guide",
        points: 100
      },
      {
        id: "communication-expert",
        title: "Communication Expert",
        description: "Master parent communication privacy",
        points: 125
      }
    ],
    tags: ['teacher-training', 'classroom-privacy', 'education-records', 'parent-communication'],
    featured: true,
    popularity: 4.6,
    enrollmentCount: 2100,
    completionRate: 91,
    lastUpdated: '2024-12-01',
    
    relatedAssessmentAreas: [
      'education-records-understanding',
      'parent-communication-compliance',
      'classroom-disclosure-management',
      'student-work-privacy'
    ],
    recommendedForMaturityLevels: ['Level 1→2', 'Level 2→3'],
    
    linkedComplianceEvents: ['ferpa-annual-notice-2025'],
    schedulingRecommendations: [
      {
        beforeEvent: 'ferpa-annual-notice-2025',
        daysBeforeDeadline: 60
      }
    ]
  },
  {
    id: 'student-digital-literacy',
    title: 'Student Digital Privacy and Literacy Guide',
    description: 'Digital privacy and safety guide designed for students',
    longDescription: 'Empower students with essential digital privacy and safety knowledge. This course covers personal information protection, password security, social media privacy, online tracking awareness, and digital footprint management.',
    category: 'privacy',
    regulation: 'general',
    level: 'beginner',
    targetRoles: ['student'],
    duration: 45,
    format: 'interactive',
    learningObjectives: [
      'Understand personal information and how to protect it',
      'Create and manage strong, secure passwords',
      'Configure privacy settings on social media platforms',
      'Recognize and limit online tracking',
      'Manage digital footprint and online reputation'
    ],
    prerequisites: ['Basic computer and internet usage'],
    syllabus: [
      {
        id: 'personal-info-protection',
        title: 'Personal Information Protection',
        description: 'Understanding and protecting your personal information online',
        duration: 12,
        type: 'interactive',
        required: true
      },
      {
        id: 'password-security-students',
        title: 'Password Security for Students',
        description: 'Creating and managing secure passwords',
        duration: 10,
        type: 'video',
        required: true
      },
      {
        id: 'social-media-privacy',
        title: 'Social Media Privacy Settings',
        description: 'Configuring privacy settings on popular platforms',
        duration: 15,
        type: 'interactive',
        required: true
      },
      {
        id: 'online-tracking-awareness',
        title: 'Online Tracking Awareness',
        description: 'Understanding how websites track you and how to limit it',
        duration: 12,
        type: 'reading',
        required: true
      },
      {
        id: 'digital-footprint-management',
        title: 'Digital Footprint Management',
        description: 'Managing your online presence and digital reputation',
        duration: 8,
        type: 'interactive',
        required: true
      },
      {
        id: 'student-privacy-quiz',
        title: 'Digital Privacy Knowledge Check',
        description: 'Test your digital privacy knowledge',
        duration: 3,
        type: 'quiz',
        required: true
      }
    ],
    instructor: {
      name: "Student Privacy Team",
      title: "Digital Literacy Specialists",
      bio: "Education specialists focused on student digital literacy and privacy",
      avatar: "https://ui-avatars.com/api/?name=Student+Team&background=0891b2&color=ffffff",
      credentials: ["Digital Literacy", "Student Privacy", "Online Safety"]
    },
    achievements: [
      {
        id: "privacy-basics",
        title: "Privacy Basics",
        description: "Complete the digital privacy and literacy guide",
        points: 100
      },
      {
        id: "safety-expert",
        title: "Safety Expert",
        description: "Master online privacy practices",
        points: 125
      }
    ],
    tags: ['student-training', 'digital-literacy', 'online-safety', 'social-media', 'privacy-awareness'],
    featured: true,
    popularity: 4.7,
    enrollmentCount: 5200,
    completionRate: 88,
    lastUpdated: '2024-10-15',
    
    relatedAssessmentAreas: [
      'personal-information-protection',
      'password-security-practices',
      'privacy-settings-mastery',
      'digital-footprint-awareness'
    ],
    recommendedForMaturityLevels: ['Level 1→2', 'Level 2→3'],
    
    linkedComplianceEvents: [],
    schedulingRecommendations: []
  }
];

// Learning paths that connect to assessment system
export const learningPaths: LearningPath[] = [
  {
    id: 'privacy-fundamentals',
    title: 'Privacy Fundamentals Guide Collection',
    description: 'Complete collection of guides on educational privacy requirements and best practices',
    regulation: 'general',
    targetRole: 'teacher',
    level: 'beginner',
    moduleIds: ['privacy-fundamentals-teachers', 'ferpa-fundamentals-administrators'],
    duration: 4,
    difficulty: 'easy',
    prerequisites: ['Teaching certification or educational background'],
    benefits: [
      'Comprehensive understanding of student privacy rights',
      'Compliance with educational privacy laws',
      'Professional development resources',
      'Improved student and parent trust'
    ],
    
    addressesAssessmentAreas: [
      'education-records-understanding',
      'parent-communication-compliance',
      'student-work-privacy'
    ],
    maturityProgression: [
      {
        fromLevel: 'Level 1',
        toLevel: 'Level 3',
        assessmentArea: 'education-records-understanding'
      }
    ]
  },
  {
    id: 'administrator-compliance',
    title: 'Administrator Compliance Guide Collection',
    description: 'Comprehensive compliance resources for educational administrators',
    regulation: 'general',
    targetRole: 'administrator',
    level: 'advanced',
    moduleIds: ['ferpa-fundamentals-administrators', 'incident-response-education', 'gdpr-international-compliance'],
    duration: 10,
    difficulty: 'challenging',
    prerequisites: ['Educational administration experience', 'Basic privacy law knowledge'],
    benefits: [
      'Expert-level compliance knowledge',
      'Institutional risk mitigation',
      'Advanced compliance knowledge',
      'Leadership in privacy governance'
    ],
    
    addressesAssessmentAreas: [
      'education-records-management',
      'incident-response-team-structure',
      'gdpr-applicability-assessment'
    ],
    maturityProgression: [
      {
        fromLevel: 'Level 1',
        toLevel: 'Level 4',
        assessmentArea: 'education-records-management'
      }
    ]
  },
  {
    id: 'it-security-privacy',
    title: 'IT Security and Privacy Guide Collection',
    description: 'Technical implementation resources for privacy and security measures in educational technology',
    regulation: 'general',
    targetRole: 'it-staff',
    level: 'intermediate',
    moduleIds: ['cybersecurity-fundamentals-education', 'incident-response-education'],
    duration: 6,
    difficulty: 'moderate',
    prerequisites: ['Technical background', 'IT systems knowledge'],
    benefits: [
      'Technical privacy implementation skills',
      'Advanced security competencies',
      'Professional IT knowledge resources',
      'Career advancement opportunities'
    ],
    
    addressesAssessmentAreas: [
      'network-security-architecture',
      'technical-safeguards-implementation',
      'access-control-systems'
    ],
    maturityProgression: [
      {
        fromLevel: 'Level 1',
        toLevel: 'Level 3',
        assessmentArea: 'network-security-architecture'
      }
    ]
  },
  {
    id: 'coppa-specialist',
    title: 'COPPA Compliance Resource Collection',
    description: 'Specialized guides for COPPA compliance in K-12 environments',
    regulation: 'coppa',
    targetRole: 'teacher',
    level: 'intermediate',
    moduleIds: ['coppa-digital-safety-educators'],
    duration: 3,
    difficulty: 'moderate',
    prerequisites: ['Work with students under 13', 'Basic privacy understanding'],
    benefits: [
      'COPPA specialist knowledge',
      'Compliance with children\'s privacy laws',
      'Enhanced student protection',
      'Professional development resources'
    ],
    
    addressesAssessmentAreas: [
      'coppa-policy-framework',
      'parental-consent-mechanisms',
      'age-verification-processes'
    ],
    maturityProgression: [
      {
        fromLevel: 'Level 1',
        toLevel: 'Level 3',
        assessmentArea: 'coppa-policy-framework'
      }
    ]
  }
];

// Role-based module recommendations that link to assessment weak areas
export const roleRecommendations = {
  administrator: ['ferpa-fundamentals-administrators', 'incident-response-education', 'gdpr-international-compliance'],
  teacher: ['privacy-fundamentals-teachers', 'coppa-digital-safety-educators'],
  'it-staff': ['cybersecurity-fundamentals-education', 'incident-response-education'],
  student: ['student-digital-literacy']
};

// Featured module highlights
export const featuredModules = trainingModules.filter(module => module.featured);

// Training statistics and metrics
export const trainingStats = {
  totalModules: trainingModules.length,
  totalLearningPaths: learningPaths.length,
  averageCompletion: 85,
  totalEnrollments: trainingModules.reduce((sum, module) => sum + module.enrollmentCount, 0)
};

// Integration utilities for assessment system (for future use)
// const getTrainingForAssessmentGaps = (assessmentResults: unknown[]) => {
//   // Logic to recommend training based on assessment weak areas
//   const recommendations: string[] = [];
//   
//   assessmentResults.forEach(result => {
//     if (result.maturityLevel <= 2) { // Level 1 or 2 - needs foundational training
//       const relatedModules = trainingModules.filter(module => 
//         module.relatedAssessmentAreas?.includes(result.assessmentAreaId) &&
//         module.recommendedForMaturityLevels?.includes('Level 1→2')
//       );
//       recommendations.push(...relatedModules.map(m => m.id));
//     }
//   });
//   
//   return [...new Set(recommendations)]; // Remove duplicates
// };

// Integration utilities for compliance calendar (for future use)
// const getTrainingForComplianceDeadlines = (upcomingEvents: unknown[]) => {
//   const recommendations: string[] = [];
//   
//   upcomingEvents.forEach(event => {
//     const relatedModules = trainingModules.filter(module =>
//       module.linkedComplianceEvents?.includes(event.id)
//     );
//     recommendations.push(...relatedModules.map(m => m.id));
//   });
//   
//   return [...new Set(recommendations)];
// };