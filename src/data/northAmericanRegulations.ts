// North American Privacy Regulations Data
// Comprehensive database of privacy regulations applicable to educational institutions

export interface PrivacyRegulation {
  id: string;
  name: string;
  fullName: string;
  jurisdiction: string;
  scope: string;
  applicability: string[];
  keyRequirements: string[];
  penalties: string;
  effectiveDate: string;
  lastUpdated: string;
  educationalExceptions: string[];
  color: string;
  icon: string;
  resources: {
    officialText: string;
    guidance: string;
    summary: string;
  };
}

export const northAmericanRegulations: PrivacyRegulation[] = [
  {
    id: 'ferpa',
    name: 'FERPA',
    fullName: 'Family Educational Rights and Privacy Act',
    jurisdiction: 'United States (Federal)',
    scope: 'Educational institutions receiving federal funding',
    applicability: ['Public schools K-12', 'Most private schools', 'Colleges and universities'],
    keyRequirements: [
      'Annual notification of rights',
      'Access to education records',
      'Amendment rights',
      'Disclosure restrictions',
      'Directory information policies'
    ],
    penalties: 'Loss of federal education funding',
    effectiveDate: '1974-08-21',
    lastUpdated: '2021-12-01',
    educationalExceptions: [
      'School officials with legitimate educational interest',
      'Emergency health and safety situations',
      'Judicial orders and subpoenas',
      'Financial aid determinations'
    ],
    color: 'blue',
    icon: 'shield',
    resources: {
      officialText: 'https://www.ecfr.gov/title-34/subtitle-A/part-99',
      guidance: 'https://studentprivacy.ed.gov/faq/ferpa-general-guidance',
      summary: '/resources/ferpa-summary.pdf'
    }
  },
  {
    id: 'coppa',
    name: 'COPPA',
    fullName: 'Children\'s Online Privacy Protection Act',
    jurisdiction: 'United States (Federal)',
    scope: 'Online services directed to children under 13',
    applicability: ['Educational technology providers', 'Schools using online services', 'EdTech vendors'],
    keyRequirements: [
      'Parental consent for data collection',
      'Clear privacy notice',
      'Data minimization',
      'Secure data handling',
      'Parental access and deletion rights'
    ],
    penalties: 'Civil penalties up to $50,120 per violation',
    effectiveDate: '2000-04-21',
    lastUpdated: '2013-07-01',
    educationalExceptions: [
      'School-authorized educational use',
      'Internal operations of online services'
    ],
    color: 'amber',
    icon: 'users',
    resources: {
      officialText: 'https://www.ecfr.gov/title-16/chapter-I/subchapter-C/part-312',
      guidance: 'https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions',
      summary: '/resources/coppa-summary.pdf'
    }
  },
  {
    id: 'ccpa',
    name: 'CCPA',
    fullName: 'California Consumer Privacy Act',
    jurisdiction: 'California, United States',
    scope: 'Businesses processing California residents\' personal information',
    applicability: ['Large educational institutions', 'EdTech companies', 'Schools with CA students'],
    keyRequirements: [
      'Privacy notice requirements',
      'Consumer rights (access, deletion, opt-out)',
      'Non-discrimination provisions',
      'Data minimization',
      'Third-party sharing disclosures'
    ],
    penalties: 'Up to $7,500 per intentional violation',
    effectiveDate: '2020-01-01',
    lastUpdated: '2023-01-01',
    educationalExceptions: [
      'Student records covered by FERPA',
      'Employee personal information',
      'Research conducted in public interest'
    ],
    color: 'purple',
    icon: 'scale',
    resources: {
      officialText: 'https://oag.ca.gov/privacy/ccpa',
      guidance: 'https://oag.ca.gov/privacy/ccpa/regs',
      summary: '/resources/ccpa-summary.pdf'
    }
  },
  {
    id: 'cpra',
    name: 'CPRA',
    fullName: 'California Privacy Rights Act',
    jurisdiction: 'California, United States',
    scope: 'Enhanced CCPA with additional protections',
    applicability: ['All businesses subject to CCPA', 'Educational institutions in California'],
    keyRequirements: [
      'Enhanced consumer rights',
      'Sensitive personal information protections',
      'Risk assessments',
      'Data minimization requirements',
      'Privacy by design'
    ],
    penalties: 'Up to $7,500 per intentional violation plus additional fines',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-01-01',
    educationalExceptions: [
      'Student records under FERPA',
      'Research activities',
      'De-identified information'
    ],
    color: 'indigo',
    icon: 'shield-check',
    resources: {
      officialText: 'https://oag.ca.gov/privacy/cpra',
      guidance: 'https://cppa.ca.gov/',
      summary: '/resources/cpra-summary.pdf'
    }
  },
  {
    id: 'pipeda',
    name: 'PIPEDA',
    fullName: 'Personal Information Protection and Electronic Documents Act',
    jurisdiction: 'Canada (Federal)',
    scope: 'Organizations collecting personal information in course of commercial activity',
    applicability: ['Private schools', 'EdTech companies', 'Cross-border educational services'],
    keyRequirements: [
      'Consent for collection and use',
      'Purpose limitation',
      'Data minimization',
      'Individual access rights',
      'Breach notification'
    ],
    penalties: 'Up to CAD $100,000 per violation',
    effectiveDate: '2001-01-01',
    lastUpdated: '2022-09-22',
    educationalExceptions: [
      'Employee personal information in limited circumstances',
      'Publicly available information'
    ],
    color: 'red',
    icon: 'maple-leaf',
    resources: {
      officialText: 'https://laws-lois.justice.gc.ca/eng/acts/P-8.6/',
      guidance: 'https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/',
      summary: '/resources/pipeda-summary.pdf'
    }
  },
  {
    id: 'bipa',
    name: 'BIPA',
    fullName: 'Illinois Biometric Information Privacy Act',
    jurisdiction: 'Illinois, United States',
    scope: 'Collection and use of biometric identifiers',
    applicability: ['Schools using biometric systems', 'Time tracking systems', 'Security systems'],
    keyRequirements: [
      'Written consent before collecting biometrics',
      'Data retention and destruction schedule',
      'Secure storage requirements',
      'No sale of biometric data',
      'Disclosure limitations'
    ],
    penalties: '$1,000-$5,000 per violation plus attorney fees',
    effectiveDate: '2008-10-03',
    lastUpdated: '2008-10-03',
    educationalExceptions: [
      'Limited exceptions for security purposes with proper consent'
    ],
    color: 'emerald',
    icon: 'fingerprint',
    resources: {
      officialText: 'https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004',
      guidance: 'https://www2.illinois.gov/sites/ag/Pages/BIPA.aspx',
      summary: '/resources/bipa-summary.pdf'
    }
  },
  {
    id: 'shield',
    name: 'SHIELD Act',
    fullName: 'Stop Hacks and Improve Electronic Data Security Act',
    jurisdiction: 'New York, United States',
    scope: 'Businesses possessing private information of NY residents',
    applicability: ['Educational institutions', 'Any business with NY resident data'],
    keyRequirements: [
      'Reasonable data security measures',
      'Breach notification requirements',
      'Specific technical safeguards',
      'Risk assessments',
      'Employee training'
    ],
    penalties: 'Up to $20 per instance plus other damages',
    effectiveDate: '2020-03-21',
    lastUpdated: '2021-10-23',
    educationalExceptions: [
      'Compliance with federal educational privacy laws may satisfy some requirements'
    ],
    color: 'slate',
    icon: 'shield',
    resources: {
      officialText: 'https://www.nysenate.gov/legislation/bills/2019/s5575',
      guidance: 'https://ag.ny.gov/shield',
      summary: '/resources/shield-summary.pdf'
    }
  },
  {
    id: 'sopipa',
    name: 'SOPIPA',
    fullName: 'Student Online Personal Information Protection Act',
    jurisdiction: 'California, United States',
    scope: 'EdTech operators providing services to schools',
    applicability: ['Educational technology companies', 'Schools contracting with EdTech'],
    keyRequirements: [
      'Prohibition on advertising to students',
      'Restrictions on data use',
      'Security requirements',
      'Data deletion upon request',
      'Transparent privacy practices'
    ],
    penalties: 'Injunctive relief and civil penalties',
    effectiveDate: '2016-01-01',
    lastUpdated: '2016-01-01',
    educationalExceptions: [
      'Educational purposes as directed by school',
      'Maintenance and improvement of services'
    ],
    color: 'orange',
    icon: 'graduation-cap',
    resources: {
      officialText: 'https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201320140SB1177',
      guidance: 'https://www.cde.ca.gov/ls/fa/sf/sopipa.asp',
      summary: '/resources/sopipa-summary.pdf'
    }
  },
  {
    id: 'vcdpa',
    name: 'VCDPA',
    fullName: 'Virginia Consumer Data Protection Act',
    jurisdiction: 'Virginia, United States',
    scope: 'Businesses processing personal data of VA residents',
    applicability: ['Large educational institutions', 'EdTech companies with VA users'],
    keyRequirements: [
      'Consumer rights (access, correction, deletion)',
      'Data protection assessments',
      'Purpose limitation',
      'Data minimization',
      'Transparent privacy notices'
    ],
    penalties: 'Up to $7,500 per violation',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-01-01',
    educationalExceptions: [
      'Student records under FERPA',
      'Employment-related information'
    ],
    color: 'teal',
    icon: 'shield',
    resources: {
      officialText: 'https://lis.virginia.gov/cgi-bin/legp604.exe?211+ful+HB2307ER',
      guidance: 'https://www.oag.state.va.us/consumer-protection/privacy',
      summary: '/resources/vcdpa-summary.pdf'
    }
  }
];

export const getRegulationByJurisdiction = (jurisdiction: string): PrivacyRegulation[] => {
  return northAmericanRegulations.filter(reg => 
    reg.jurisdiction.toLowerCase().includes(jurisdiction.toLowerCase())
  );
};

export const getApplicableRegulations = (institutionType: string): PrivacyRegulation[] => {
  return northAmericanRegulations.filter(reg =>
    reg.applicability.some(app => 
      app.toLowerCase().includes(institutionType.toLowerCase())
    )
  );
};

export const getRegulationsByComplexity = (): { basic: PrivacyRegulation[], intermediate: PrivacyRegulation[], advanced: PrivacyRegulation[] } => {
  return {
    basic: northAmericanRegulations.filter(reg => ['ferpa', 'coppa'].includes(reg.id)),
    intermediate: northAmericanRegulations.filter(reg => ['ccpa', 'bipa', 'shield', 'sopipa'].includes(reg.id)),
    advanced: northAmericanRegulations.filter(reg => ['gdpr', 'cpra', 'pipeda', 'vcdpa'].includes(reg.id))
  };
};