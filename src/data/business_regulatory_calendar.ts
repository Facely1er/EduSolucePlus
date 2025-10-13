// Real Educational Compliance Calendar for Business Use
// Based on actual federal and state regulatory requirements

export interface ComplianceEvent {
  id: string;
  date: Date;
  title: string;
  regulation: 'FERPA' | 'COPPA' | 'IDEA' | 'Section 504' | 'PPRA' | 'State' | 'Federal' | 'GDPR';
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  frequency: 'annual' | 'quarterly' | 'monthly' | 'ongoing' | 'one-time';
  legalReference: string;
  actionItems: string[];
  consequences: string;
  applicableToRoles: string[];
  documentationRequired: string[];
  reminderDays: number[];
}

// Real compliance calendar for 2025
export const complianceCalendar2025: ComplianceEvent[] = [
  {
    id: 'ferpa-annual-notice-2025',
    date: new Date('2025-08-15'),
    title: 'FERPA Annual Notice Distribution (SY 2025-26)',
    regulation: 'FERPA',
    description: 'Distribute annual FERPA rights notification to parents/eligible students before or at start of school year',
    priority: 'critical',
    frequency: 'annual',
    legalReference: '34 CFR §99.7(a)(1)',
    actionItems: [
      'Update annual notice with current year information',
      'Translate notice into languages spoken by 5%+ of families',
      'Distribute via student handbook, website, and direct mail',
      'Document distribution methods and dates',
      'Establish opt-out procedures for directory information'
    ],
    consequences: 'Loss of federal education funding eligibility',
    applicableToRoles: ['Superintendent', 'Principal', 'Registrar', 'Student Services'],
    documentationRequired: [
      'FERPA Annual Notice',
      'Distribution records',
      'Translation documentation',
      'Opt-out request forms'
    ],
    reminderDays: [60, 30, 14, 7]
  },
  {
    id: 'idea-annual-report-2025',
    date: new Date('2025-02-01'),
    title: 'IDEA Section 618 Annual Report to Department of Education',
    regulation: 'IDEA',
    description: 'Submit annual report on special education services, student counts, and outcomes to U.S. Department of Education',
    priority: 'critical',
    frequency: 'annual',
    legalReference: '20 USC §1418, 34 CFR §300.601-300.647',
    actionItems: [
      'Compile student enrollment data by disability category',
      'Document special education service provision',
      'Calculate graduation and dropout rates',
      'Report disciplinary actions for students with disabilities',
      'Submit via EDEN (Education Data Exchange Network)'
    ],
    consequences: 'Reduction in federal IDEA funding, compliance monitoring',
    applicableToRoles: ['Special Education Director', 'Data Manager', 'Superintendent'],
    documentationRequired: [
      'Student count data',
      'IEP service documentation',
      'Transition services data',
      'Discipline incident reports'
    ],
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'coppa-vendor-audit-q1-2025',
    date: new Date('2025-03-31'),
    title: 'COPPA Compliance Audit for Educational Technology Vendors',
    regulation: 'COPPA',
    description: 'Complete quarterly audit of all educational technology vendors serving students under 13 to ensure COPPA compliance',
    priority: 'high',
    frequency: 'quarterly',
    legalReference: '15 USC §6501-6506, 16 CFR Part 312',
    actionItems: [
      'Review all active educational technology contracts',
      'Verify parental consent documentation for students under 13',
      'Audit vendor privacy policies and data collection practices',
      'Ensure vendors have valid safe harbor certifications',
      'Document compliance status for each vendor'
    ],
    consequences: 'FTC enforcement action, civil penalties up to $43,792 per violation',
    applicableToRoles: ['IT Director', 'Privacy Officer', 'Curriculum Director'],
    documentationRequired: [
      'Vendor contracts and data processing agreements',
      'Parental consent forms',
      'Vendor privacy policy reviews',
      'COPPA compliance certifications'
    ],
    reminderDays: [30, 14, 7]
  },
  {
    id: 'state-student-data-privacy-report-2025',
    date: new Date('2025-06-30'),
    title: 'State Student Data Privacy Annual Report',
    regulation: 'State',
    description: 'Submit required annual report on student data privacy practices to state education agency (varies by state)',
    priority: 'high',
    frequency: 'annual',
    legalReference: 'State Education Code (varies by jurisdiction)',
    actionItems: [
      'Compile inventory of all student data systems',
      'Document data sharing agreements and disclosures',
      'Report security incidents and breaches',
      'Calculate privacy training completion rates',
      'Submit report through state portal'
    ],
    consequences: 'State funding penalties, compliance monitoring, public disclosure',
    applicableToRoles: ['Superintendent', 'Data Privacy Officer', 'IT Director'],
    documentationRequired: [
      'Data inventory spreadsheet',
      'Vendor agreements',
      'Incident reports',
      'Training records'
    ],
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'section-504-self-evaluation-2025',
    date: new Date('2025-07-26'),
    title: 'Section 504 Three-Year Self-Evaluation',
    regulation: 'Section 504',
    description: 'Complete required three-year self-evaluation of Section 504 compliance and accessibility',
    priority: 'high',
    frequency: 'annual',
    legalReference: '29 USC §794, 34 CFR §104.6',
    actionItems: [
      'Evaluate current Section 504 policies and procedures',
      'Assess physical accessibility of facilities',
      'Review accommodations and services provided',
      'Identify barriers and develop improvement plan',
      'Engage stakeholders in evaluation process'
    ],
    consequences: 'Loss of federal funding, OCR investigation, legal liability',
    applicableToRoles: ['Section 504 Coordinator', 'Special Education Director', 'Facilities Manager'],
    documentationRequired: [
      'Self-evaluation report',
      'Accessibility audit results',
      'Accommodation records',
      'Improvement plan'
    ],
    reminderDays: [180, 90, 60, 30]
  },
  {
    id: 'ppra-survey-notification-fall-2025',
    date: new Date('2025-09-15'),
    title: 'PPRA Survey Notification for Fall Assessments',
    regulation: 'PPRA',
    description: 'Notify parents of surveys and activities that collect protected information under PPRA',
    priority: 'medium',
    frequency: 'ongoing',
    legalReference: '20 USC §1232h, 34 CFR Part 98',
    actionItems: [
      'Review all planned surveys and assessments',
      'Identify those collecting PPRA-protected information',
      'Prepare parent notification letters',
      'Establish opt-out procedures',
      'Maintain records of notifications sent'
    ],
    consequences: 'Federal investigation, loss of funding, legal action',
    applicableToRoles: ['Curriculum Director', 'Assessment Coordinator', 'Principal'],
    documentationRequired: [
      'Survey content review',
      'Parent notifications',
      'Opt-out forms',
      'Distribution records'
    ],
    reminderDays: [30, 14]
  },
  {
    id: 'ferpa-disclosure-log-review-2025',
    date: new Date('2025-12-31'),
    title: 'Annual FERPA Disclosure Log Review and Audit',
    regulation: 'FERPA',
    description: 'Complete annual review of all education record disclosures and maintain required documentation',
    priority: 'medium',
    frequency: 'annual',
    legalReference: '34 CFR §99.32',
    actionItems: [
      'Review all disclosure logs for completeness',
      'Verify appropriate documentation for each disclosure',
      'Identify any unauthorized disclosures',
      'Update record retention schedules',
      'Train staff on disclosure logging requirements'
    ],
    consequences: 'FERPA violations, funding loss, legal liability',
    applicableToRoles: ['Registrar', 'Student Services', 'Privacy Officer'],
    documentationRequired: [
      'Disclosure logs',
      'Authorization forms',
      'Subpoenas and court orders',
      'Emergency disclosure documentation'
    ],
    reminderDays: [60, 30, 14]
  },
  {
    id: 'gdpr-data-subject-requests-review-2025',
    date: new Date('2025-05-25'),
    title: 'GDPR Data Subject Rights Annual Review',
    regulation: 'GDPR',
    description: 'Annual review of GDPR data subject request procedures and privacy policy updates (for schools with EU students)',
    priority: 'high',
    frequency: 'annual',
    legalReference: 'GDPR Articles 12-23',
    actionItems: [
      'Review and update privacy notices',
      'Audit data subject request procedures',
      'Verify lawful basis for processing',
      'Update data retention schedules',
      'Train staff on GDPR requirements'
    ],
    consequences: 'Fines up to 4% of annual revenue or €20 million',
    applicableToRoles: ['Data Protection Officer', 'Privacy Officer', 'IT Director'],
    documentationRequired: [
      'Privacy notices',
      'Data processing records',
      'Consent documentation',
      'Breach notification records'
    ],
    reminderDays: [90, 60, 30]
  },
  {
    id: 'cybersecurity-framework-assessment-2025',
    date: new Date('2025-10-01'),
    title: 'Annual Cybersecurity Framework Assessment',
    regulation: 'Federal',
    description: 'Complete annual cybersecurity assessment using NIST Framework or state requirements',
    priority: 'high',
    frequency: 'annual',
    legalReference: 'Executive Order 14028, NIST Cybersecurity Framework',
    actionItems: [
      'Conduct risk assessment using NIST Framework',
      'Review and update incident response procedures',
      'Test backup and recovery systems',
      'Assess vendor cybersecurity practices',
      'Document security controls and gaps'
    ],
    consequences: 'Increased vulnerability to cyberattacks, potential data breaches',
    applicableToRoles: ['IT Director', 'Chief Information Security Officer', 'Superintendent'],
    documentationRequired: [
      'Risk assessment report',
      'Security control documentation',
      'Incident response plan',
      'Vendor security assessments'
    ],
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'title-ix-training-2025',
    date: new Date('2025-08-01'),
    title: 'Annual Title IX Training for All Staff',
    regulation: 'Federal',
    description: 'Provide required annual Title IX training to all employees regarding sexual harassment and discrimination',
    priority: 'critical',
    frequency: 'annual',
    legalReference: 'Title IX of Education Amendments of 1972, 34 CFR Part 106',
    actionItems: [
      'Schedule training sessions for all staff',
      'Update training materials with current regulations',
      'Track completion and maintain records',
      'Provide specialized training for Title IX coordinators',
      'Document training effectiveness'
    ],
    consequences: 'OCR investigation, loss of federal funding, legal liability',
    applicableToRoles: ['Title IX Coordinator', 'Human Resources', 'All Staff'],
    documentationRequired: [
      'Training completion records',
      'Training materials',
      'Attendance documentation',
      'Competency assessments'
    ],
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'clery-act-report-2025',
    date: new Date('2025-10-01'),
    title: 'Clery Act Annual Security Report (Postsecondary Only)',
    regulation: 'Federal',
    description: 'Publish annual security report and notify campus community (applies to postsecondary institutions)',
    priority: 'critical',
    frequency: 'annual',
    legalReference: '20 USC §1092(f), 34 CFR Part 668',
    actionItems: [
      'Collect crime statistics from campus and local police',
      'Compile policy statements on security procedures',
      'Document emergency response and evacuation procedures',
      'Publish report and distribute to campus community',
      'Submit to Department of Education if required'
    ],
    consequences: 'Fines up to $59,017 per violation, loss of federal student aid eligibility',
    applicableToRoles: ['Campus Security', 'Student Affairs', 'Compliance Officer'],
    documentationRequired: [
      'Crime statistics',
      'Security policies',
      'Emergency procedures',
      'Distribution records'
    ],
    reminderDays: [120, 90, 60, 30]
  },
  {
    id: 'essa-school-report-cards-2025',
    date: new Date('2025-12-31'),
    title: 'ESSA School Report Cards Publication',
    regulation: 'Federal',
    description: 'Publish required annual school report cards under Every Student Succeeds Act',
    priority: 'high',
    frequency: 'annual',
    legalReference: '20 USC §6311(h), ESSA Section 1111(h)',
    actionItems: [
      'Compile academic achievement data',
      'Calculate graduation rates and college readiness',
      'Report teacher qualification information',
      'Include per-pupil expenditure data',
      'Publish in accessible formats and languages'
    ],
    consequences: 'State sanctions, loss of federal funding, public accountability measures',
    applicableToRoles: ['Data Manager', 'Assessment Coordinator', 'Superintendent'],
    documentationRequired: [
      'Academic performance data',
      'Demographic information',
      'Teacher qualification records',
      'Financial expenditure data'
    ],
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'mckinney-vento-identification-training-2025',
    date: new Date('2025-09-30'),
    title: 'McKinney-Vento Act Staff Training on Homeless Student Identification',
    regulation: 'Federal',
    description: 'Train staff on identifying and serving students experiencing homelessness under McKinney-Vento Act',
    priority: 'medium',
    frequency: 'annual',
    legalReference: '42 USC §11431-11435, McKinney-Vento Act',
    actionItems: [
      'Train enrollment staff on identification procedures',
      'Update homeless student identification forms',
      'Review transportation and support services',
      'Coordinate with community service providers',
      'Document training completion'
    ],
    consequences: 'Civil rights violations, loss of federal funding, legal action',
    applicableToRoles: ['McKinney-Vento Coordinator', 'Enrollment Staff', 'Social Workers'],
    documentationRequired: [
      'Training records',
      'Identification procedures',
      'Service documentation',
      'Transportation records'
    ],
    reminderDays: [60, 30, 14]
  },
  {
    id: 'annual-security-awareness-training-2025',
    date: new Date('2025-10-31'),
    title: 'Annual Cybersecurity Awareness Training for All Staff',
    regulation: 'Federal',
    description: 'Conduct mandatory cybersecurity awareness training to protect student data and school systems',
    priority: 'high',
    frequency: 'annual',
    legalReference: 'NIST Special Publication 800-50, Executive Order 14028',
    actionItems: [
      'Develop training curriculum on current threats',
      'Include phishing simulation exercises',
      'Cover password security and MFA requirements',
      'Test incident reporting procedures',
      'Document training completion and effectiveness'
    ],
    consequences: 'Increased vulnerability to cyberattacks, potential data breaches',
    applicableToRoles: ['IT Security Officer', 'All Staff', 'Administrators'],
    documentationRequired: [
      'Training completion certificates',
      'Phishing test results',
      'Security awareness assessments',
      'Incident reporting logs'
    ],
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'ada-compliance-review-2025',
    date: new Date('2025-07-26'),
    title: 'ADA Compliance Annual Review and Self-Evaluation',
    regulation: 'Federal',
    description: 'Conduct annual review of ADA compliance including digital accessibility and physical accommodations',
    priority: 'high',
    frequency: 'annual',
    legalReference: 'Americans with Disabilities Act, 42 USC §12101',
    actionItems: [
      'Audit website and digital content for WCAG compliance',
      'Review physical facility accessibility',
      'Assess accommodation request procedures',
      'Update accessibility plans and policies',
      'Train staff on accommodation requirements'
    ],
    consequences: 'DOJ investigation, legal action, accessibility lawsuits',
    applicableToRoles: ['ADA Coordinator', 'IT Director', 'Facilities Manager'],
    documentationRequired: [
      'Accessibility audit reports',
      'Accommodation records',
      'Digital accessibility testing results',
      'Policy updates'
    ],
    reminderDays: [120, 90, 60, 30]
  },
  {
    id: 'vendor-security-assessments-2025',
    date: new Date('2025-06-30'),
    title: 'Annual Third-Party Vendor Security Assessments',
    regulation: 'Federal',
    description: 'Complete annual security assessments for all vendors with access to student data or school systems',
    priority: 'critical',
    frequency: 'annual',
    legalReference: 'FERPA, state data protection laws, NIST guidelines',
    actionItems: [
      'Inventory all active vendor relationships',
      'Request current security certifications (SOC 2, ISO 27001)',
      'Review and update data processing agreements',
      'Conduct risk assessments for high-risk vendors',
      'Document security control adequacy'
    ],
    consequences: 'Data breaches, regulatory violations, loss of student data',
    applicableToRoles: ['Procurement Officer', 'IT Security', 'Privacy Officer'],
    documentationRequired: [
      'Vendor security questionnaires',
      'Security certifications',
      'Risk assessment reports',
      'Updated contracts'
    ],
    reminderDays: [120, 90, 60, 30, 14]
  },
  {
    id: 'emergency-communication-test-2025',
    date: new Date('2025-04-15'),
    title: 'Emergency Communication System Annual Test',
    regulation: 'State',
    description: 'Test emergency communication systems and update emergency contact information',
    priority: 'medium',
    frequency: 'annual',
    legalReference: 'State emergency preparedness requirements (varies by state)',
    actionItems: [
      'Test all emergency communication channels',
      'Verify parent/guardian contact information accuracy',
      'Update emergency notification procedures',
      'Train staff on emergency communication protocols',
      'Document test results and system performance'
    ],
    consequences: 'Ineffective emergency response, safety risks, state violations',
    applicableToRoles: ['Emergency Coordinator', 'Communications Director', 'IT Staff'],
    documentationRequired: [
      'System test reports',
      'Contact database updates',
      'Communication protocols',
      'Training records'
    ],
    reminderDays: [60, 30, 14, 7]
  },
  {
    id: 'data-retention-policy-review-2025',
    date: new Date('2025-03-01'),
    title: 'Annual Data Retention Policy Review and Records Disposal',
    regulation: 'FERPA',
    description: 'Review data retention schedules and securely dispose of records that have exceeded retention periods',
    priority: 'medium',
    frequency: 'annual',
    legalReference: '34 CFR §99.3, state records retention laws',
    actionItems: [
      'Review current data retention schedules',
      'Identify records eligible for disposal',
      'Coordinate secure destruction of physical and digital records',
      'Update retention policies based on legal changes',
      'Document disposal activities and certificates'
    ],
    consequences: 'Storage of unnecessary data, increased privacy risks, compliance violations',
    applicableToRoles: ['Records Manager', 'Privacy Officer', 'IT Director'],
    documentationRequired: [
      'Retention schedules',
      'Disposal certificates',
      'Policy updates',
      'Destruction logs'
    ],
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'incident-response-plan-update-2025',
    date: new Date('2025-11-15'),
    title: 'Annual Incident Response Plan Review and Tabletop Exercise',
    regulation: 'Federal',
    description: 'Review and update incident response procedures and conduct tabletop exercise',
    priority: 'high',
    frequency: 'annual',
    legalReference: 'NIST Special Publication 800-61, state breach notification laws',
    actionItems: [
      'Review current incident response procedures',
      'Update contact lists and escalation procedures',
      'Conduct tabletop exercise with response team',
      'Test communication and notification systems',
      'Document lessons learned and plan improvements'
    ],
    consequences: 'Delayed breach response, regulatory penalties, increased damage',
    applicableToRoles: ['Incident Response Team', 'IT Security', 'Legal Counsel'],
    documentationRequired: [
      'Updated response plan',
      'Exercise documentation',
      'Contact directories',
      'Improvement action plans'
    ],
    reminderDays: [90, 60, 30, 14]
  },
  {
    id: 'privacy-impact-assessments-2025',
    date: new Date('2025-08-31'),
    title: 'Privacy Impact Assessments for New Technology Implementations',
    regulation: 'FERPA',
    description: 'Complete privacy impact assessments for all new technology systems collecting student data',
    priority: 'high',
    frequency: 'ongoing',
    legalReference: 'FERPA, state privacy laws, NIST Privacy Framework',
    actionItems: [
      'Identify new technology implementations',
      'Conduct privacy impact assessments',
      'Document data flows and privacy risks',
      'Implement privacy controls and safeguards',
      'Obtain required approvals before deployment'
    ],
    consequences: 'Privacy violations, regulatory penalties, student data exposure',
    applicableToRoles: ['Privacy Officer', 'IT Director', 'Technology Committee'],
    documentationRequired: [
      'Privacy impact assessments',
      'Risk mitigation plans',
      'Approval documentation',
      'Control implementation records'
    ],
    reminderDays: [60, 30, 14]
  }
];

// Utility functions for business use
export const getEventsByPriority = (priority: 'critical' | 'high' | 'medium' | 'low'): ComplianceEvent[] => {
  return complianceCalendar2025.filter(event => event.priority === priority);
};


export const getUpcomingDeadlines = (daysAhead: number = 90): ComplianceEvent[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() + daysAhead);
  
  return complianceCalendar2025
    .filter(event => event.date <= cutoffDate && event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};


export const getCriticalUpcomingEvents = (): ComplianceEvent[] => {
  const upcoming = getUpcomingDeadlines(60);
  return upcoming.filter(event => event.priority === 'critical' || event.priority === 'high');
};
