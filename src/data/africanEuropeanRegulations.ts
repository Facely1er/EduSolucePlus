// Réglementations Africaines et Européennes en Matière de Protection des Données
// Base de données complète des réglementations applicables aux institutions éducatives africaines

export interface PrivacyRegulation {
  id: string;
  name: string;
  fullName: string;
  fullNameFr?: string; // Nom français
  jurisdiction: string;
  scope: string;
  applicability: string[];
  keyRequirements: string[];
  keyRequirementsFr?: string[]; // Exigences en français
  penalties: string;
  penaltiesFr?: string;
  effectiveDate: string;
  lastUpdated: string;
  educationalExceptions: string[];
  color: string;
  icon: string;
  regulatoryAuthority: string;
  resources: {
    officialText: string;
    officialTextFr?: string;
    guidance: string;
    summary: string;
  };
  languages: string[]; // ['fr', 'en']
  region: 'africa' | 'europe' | 'international';
}

export const africanEuropeanRegulations: PrivacyRegulation[] = [
  {
    id: 'gdpr',
    name: 'RGPD / GDPR',
    fullName: 'General Data Protection Regulation',
    fullNameFr: 'Règlement Général sur la Protection des Données',
    jurisdiction: 'Union Européenne (27 États membres)',
    scope: 'Toute organisation traitant des données de résidents UE',
    applicability: [
      'Universités avec partenariats européens',
      'Institutions avec étudiants européens',
      'Plateformes EdTech avec présence UE',
      'Projets de recherche collaboratifs Europe-Afrique'
    ],
    keyRequirements: [
      'Base légale pour tout traitement',
      'Droits des personnes concernées (accès, rectification, effacement, portabilité)',
      'Consentement explicite pour catégories sensibles',
      'Analyse d\'impact (AIPD/DPIA) pour traitements à risque',
      'Notification de violation sous 72 heures',
      'Désignation d\'un DPO si requis',
      'Privacy by design et by default'
    ],
    keyRequirementsFr: [
      'Base légale pour tout traitement',
      'Droits des personnes (accès, rectification, effacement, portabilité)',
      'Consentement explicite catégories sensibles',
      'AIPD pour traitements à risque',
      'Notification violation 72h',
      'Désignation DPO si requis',
      'Privacy by design/default'
    ],
    penalties: 'Jusqu\'à 20 millions € ou 4% du CA annuel mondial',
    penaltiesFr: 'Jusqu\'à 20 millions € ou 4% du CA annuel mondial',
    effectiveDate: '2018-05-25',
    lastUpdated: '2024-01-01',
    educationalExceptions: [
      'Recherche scientifique et statistique',
      'Intérêt légitime éducatif',
      'Mission de service public'
    ],
    color: 'blue',
    icon: 'shield',
    regulatoryAuthority: 'CEPD (Comité Européen de la Protection des Données)',
    resources: {
      officialText: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
      officialTextFr: 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679',
      guidance: 'https://edpb.europa.eu/edpb_fr',
      summary: '/resources/gdpr-summary-africa.pdf'
    },
    languages: ['fr', 'en'],
    region: 'europe'
  },
  
  {
    id: 'ci-data-protection',
    name: 'Loi Ivoirienne Protection Données',
    fullName: 'Loi n° 2013-450 relative à la protection des données à caractère personnel',
    fullNameFr: 'Loi n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel',
    jurisdiction: 'Côte d\'Ivoire',
    scope: 'Tout traitement de données personnelles en Côte d\'Ivoire',
    applicability: [
      'Toutes les institutions éducatives ivoiriennes',
      'Universités publiques et privées',
      'Organismes de recherche',
      'Fournisseurs de services éducatifs',
      'ESATIC et établissements similaires'
    ],
    keyRequirements: [
      'Déclaration préalable auprès de l\'ARTCI pour tout traitement',
      'Autorisation préalable de l\'ARTCI pour données sensibles',
      'Consentement informé de la personne concernée',
      'Mesures de sécurité techniques et organisationnelles',
      'Restrictions sur les transferts transfrontaliers',
      'Respect des droits d\'accès, rectification, opposition',
      'Conservation limitée des données'
    ],
    keyRequirementsFr: [
      'Déclaration préalable ARTCI',
      'Autorisation ARTCI données sensibles',
      'Consentement informé',
      'Sécurité technique et organisationnelle',
      'Restrictions transferts transfrontaliers',
      'Droits accès, rectification, opposition',
      'Conservation limitée'
    ],
    penalties: 'Amendes jusqu\'à 10 millions FCFA + sanctions pénales possibles',
    penaltiesFr: 'Amendes jusqu\'à 10 millions FCFA + sanctions pénales',
    effectiveDate: '2013-06-19',
    lastUpdated: '2013-06-19',
    educationalExceptions: [
      'Recherche scientifique avec garanties appropriées',
      'Archives historiques',
      'Statistiques publiques'
    ],
    color: 'orange',
    icon: 'shield-check',
    regulatoryAuthority: 'ARTCI (Autorité de Régulation des Télécommunications/TIC de Côte d\'Ivoire)',
    resources: {
      officialText: 'https://www.artci.ci/loi-protection-donnees-personnelles',
      officialTextFr: 'https://www.artci.ci/loi-protection-donnees-personnelles',
      guidance: 'https://www.artci.ci/guides',
      summary: '/resources/ci-data-protection-summary.pdf'
    },
    languages: ['fr'],
    region: 'africa'
  },
  
  {
    id: 'malabo-convention',
    name: 'Convention de Malabo',
    fullName: 'African Union Convention on Cyber Security and Personal Data Protection',
    fullNameFr: 'Convention de l\'Union Africaine sur la Cybersécurité et la Protection des Données Personnelles',
    jurisdiction: 'Union Africaine (États signataires)',
    scope: 'Cadre panafricain pour cybersécurité et protection données',
    applicability: [
      'Institutions dans pays ayant ratifié',
      'Collaborations éducatives inter-africaines',
      'Transferts de données intra-africains',
      'Plateformes EdTech panafricaines'
    ],
    keyRequirements: [
      'Principes harmonisés de protection des données',
      'Mesures de cybersécurité',
      'Équipes nationales de réponse aux incidents (CERT)',
      'Règles sur flux de données transfrontaliers',
      'Cadre pour transactions électroniques',
      'Lutte contre la cybercriminalité'
    ],
    keyRequirementsFr: [
      'Principes harmonisés protection données',
      'Mesures cybersécurité',
      'CERT nationaux',
      'Flux transfrontaliers',
      'Transactions électroniques',
      'Lutte cybercriminalité'
    ],
    penalties: 'Sanctions selon législations nationales',
    penaltiesFr: 'Sanctions selon législations nationales',
    effectiveDate: '2014-06-27',
    lastUpdated: '2014-06-27',
    educationalExceptions: [
      'Coopération académique inter-africaine',
      'Recherche collaborative'
    ],
    color: 'green',
    icon: 'globe',
    regulatoryAuthority: 'Union Africaine - États membres',
    resources: {
      officialText: 'https://au.int/en/treaties/african-union-convention-cyber-security-and-personal-data-protection',
      officialTextFr: 'https://au.int/fr/treaties/convention-de-lunion-africaine-sur-la-cybersecurite-et-la-protection-des-donnees',
      guidance: 'https://au.int/cybersecurity',
      summary: '/resources/malabo-convention-summary.pdf'
    },
    languages: ['fr', 'en', 'ar', 'pt'],
    region: 'africa'
  },
  
  {
    id: 'ecowas-data-protection',
    name: 'Acte Additionnel CEDEAO',
    fullName: 'ECOWAS Supplementary Act A/SA.1/01/10 on Personal Data Protection',
    fullNameFr: 'Acte Additionnel A/SA.1/01/10 de la CEDEAO relatif à la protection des données à caractère personnel',
    jurisdiction: 'CEDEAO / ECOWAS (15 États membres)',
    scope: 'Cadre régional ouest-africain pour protection des données',
    applicability: [
      'Institutions dans pays CEDEAO',
      'Collaborations universitaires ouest-africaines',
      'Programmes d\'échange régionaux',
      'Mobilité étudiante CEDEAO'
    ],
    keyRequirements: [
      'Principes de protection des données harmonisés',
      'Exigences de consentement',
      'Obligations de sécurité des données',
      'Règles transferts transfrontaliers régionaux',
      'Autorités de supervision nationales'
    ],
    keyRequirementsFr: [
      'Principes harmonisés',
      'Consentement',
      'Sécurité données',
      'Transferts régionaux',
      'Autorités supervision'
    ],
    penalties: 'Selon législations nationales des États membres',
    penaltiesFr: 'Selon législations nationales',
    effectiveDate: '2010-02-16',
    lastUpdated: '2010-02-16',
    educationalExceptions: [
      'Mobilité académique CEDEAO',
      'Programmes d\'échange régionaux'
    ],
    color: 'amber',
    icon: 'users',
    regulatoryAuthority: 'CEDEAO - Autorités nationales',
    resources: {
      officialText: 'https://www.ecowas.int/wp-content/uploads/2015/01/Supplementary-Act-on-Personal-Data-Protection.pdf',
      officialTextFr: 'https://www.ecowas.int/acte-additionnel-protection-donnees/',
      guidance: 'https://www.ecowas.int/data-protection/',
      summary: '/resources/ecowas-data-protection-summary.pdf'
    },
    languages: ['fr', 'en'],
    region: 'africa'
  },
  
  {
    id: 'france-cnil',
    name: 'RGPD France (CNIL)',
    fullName: 'RGPD - Mise en œuvre France par la CNIL',
    fullNameFr: 'Règlement Général sur la Protection des Données - Mise en œuvre France',
    jurisdiction: 'France',
    scope: 'Application du RGPD en France',
    applicability: [
      'Institutions avec partenariats français',
      'Programmes d\'échange avec France',
      'Utilisation de services français',
      'Collaborations recherche franco-africaines'
    ],
    keyRequirements: [
      'Toutes exigences RGPD',
      'Déclarations spécifiques CNIL si requis',
      'Respect des délibérations CNIL',
      'Coopération avec la CNIL',
      'Conformité Loi Informatique et Libertés'
    ],
    keyRequirementsFr: [
      'Exigences RGPD',
      'Déclarations CNIL',
      'Délibérations CNIL',
      'Coopération CNIL',
      'Loi Informatique et Libertés'
    ],
    penalties: 'Sanctions RGPD appliquées par la CNIL',
    penaltiesFr: 'Sanctions RGPD par CNIL',
    effectiveDate: '2018-05-25',
    lastUpdated: '2024-01-01',
    educationalExceptions: [
      'Recherche scientifique',
      'Archivage historique',
      'Statistiques publiques'
    ],
    color: 'indigo',
    icon: 'flag',
    regulatoryAuthority: 'CNIL (Commission Nationale de l\'Informatique et des Libertés)',
    resources: {
      officialText: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037085952',
      officialTextFr: 'https://www.cnil.fr/fr/reglement-europeen-protection-donnees',
      guidance: 'https://www.cnil.fr/fr/reglement-europeen-sur-la-protection-des-donnees-un-guide-pour-accompagner-les-collectivites',
      summary: '/resources/cnil-education-guide.pdf'
    },
    languages: ['fr'],
    region: 'europe'
  }
];

// Fonctions utilitaires
export const getRegulationsByRegion = (region: 'africa' | 'europe' | 'international') => {
  return africanEuropeanRegulations.filter(reg => reg.region === region);
};

export const getRegulationsForInstitution = (institutionCountry: string, hasEUPartnerships: boolean = false) => {
  const regulations = africanEuropeanRegulations.filter(reg => 
    reg.jurisdiction.toLowerCase().includes(institutionCountry.toLowerCase())
  );
  
  if (hasEUPartnerships) {
    regulations.push(...africanEuropeanRegulations.filter(reg => reg.id === 'gdpr'));
  }
  
  return regulations;
};

export const getRegulationsForESATIC = () => {
  return africanEuropeanRegulations.filter(reg => 
    ['gdpr', 'ci-data-protection', 'ecowas-data-protection', 'malabo-convention', 'france-cnil'].includes(reg.id)
  );
};

export const getRegulationById = (id: string): PrivacyRegulation | undefined => {
  return africanEuropeanRegulations.find(reg => reg.id === id);
};

// Exporter aussi pour compatibilité avec le code existant
export const regulations = africanEuropeanRegulations;

