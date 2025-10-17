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
  regulation: 'rgpd' | 'loi-ivoirienne' | 'artci' | 'malabo-convention' | 'ecowas-data-protection' | 'cnil' | 'general';
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
  regulation: 'rgpd' | 'loi-ivoirienne' | 'artci' | 'malabo-convention' | 'ecowas-data-protection' | 'cnil' | 'general';
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
  { id: 'privacy', name: 'Protection des Données', icon: 'shield' },
  { id: 'security', name: 'Cybersécurité', icon: 'lock' },
  { id: 'compliance', name: 'Conformité Réglementaire', icon: 'check-circle' },
  { id: 'technical', name: 'Implémentation Technique', icon: 'settings' },
  { id: 'leadership', name: 'Direction & Gouvernance', icon: 'users' }
];

export const regulationTypes = [
  { id: 'rgpd', name: 'RGPD', color: 'blue' },
  { id: 'loi-ivoirienne', name: 'Loi Ivoirienne', color: 'amber' },
  { id: 'artci', name: 'ARTCI', color: 'green' },
  { id: 'malabo-convention', name: 'Convention Malabo', color: 'purple' },
  { id: 'ecowas-data-protection', name: 'CEDEAO', color: 'indigo' },
  { id: 'cnil', name: 'CNIL', color: 'red' },
  { id: 'general', name: 'Général', color: 'purple' }
];

export const skillLevels = [
  { id: 'beginner', name: 'Débutant', color: 'emerald' },
  { id: 'intermediate', name: 'Intermédiaire', color: 'amber' },
  { id: 'advanced', name: 'Avancé', color: 'red' }
];

export const targetRoles = [
  { id: 'administrator', name: 'Direction Générale', icon: 'user-check' },
  { id: 'teacher', name: 'Corps Enseignant', icon: 'graduation-cap' },
  { id: 'it-staff', name: 'Personnel IT / DSI', icon: 'monitor' },
  { id: 'student', name: 'Étudiant(e)', icon: 'book-open' }
];

// Comprehensive training modules for African/European educational institutions
export const trainingModules: TrainingModule[] = [
  {
    id: 'rgpd-fundamentals-administrators',
    title: 'Guide Fondamental RGPD pour la Direction Générale',
    description: 'Guide complet RGPD spécialement conçu pour les administrateurs d\'institutions éducatives africaines',
    longDescription: 'Maîtrisez la conformité RGPD en tant qu\'administrateur avec ce cours complet couvrant la gestion des données personnelles, les politiques de confidentialité, les droits des personnes concernées, la formation du personnel, les procédures de divulgation, la gestion des fournisseurs, les protocoles d\'urgence, les processus d\'audit, la gestion des plaintes et l\'intégration technologique.',
    category: 'compliance',
    regulation: 'rgpd',
    level: 'beginner',
    targetRoles: ['administrator'],
    duration: 120,
    format: 'interactive',
    learningObjectives: [
      'Développer des politiques et procédures RGPD complètes',
      'Implémenter des systèmes efficaces de gestion des données personnelles',
      'Établir des protocoles appropriés pour les droits des personnes concernées',
      'Créer des programmes de formation et de sensibilisation du personnel',
      'Gérer les relations avec les fournisseurs pour la conformité RGPD',
      'Développer des procédures de réponse aux incidents et d\'audit'
    ],
    prerequisites: ['Compréhension de base de l\'administration éducative'],
    syllabus: [
      {
        id: 'rgpd-admin-intro',
        title: 'Aperçu RGPD pour les Administrateurs',
        description: 'Perspective administrative sur les exigences RGPD',
        duration: 20,
        type: 'video',
        required: true
      },
      {
        id: 'donnees-management-admin',
        title: 'Systèmes de Gestion des Données Personnelles',
        description: 'Implémentation d\'une gestion systématique des données',
        duration: 25,
        type: 'interactive',
        required: true
      },
      {
        id: 'politiques-confidentialite',
        title: 'Développement de Politiques de Confidentialité',
        description: 'Création et implémentation de politiques de confidentialité',
        duration: 20,
        type: 'assignment',
        required: true
      },
      {
        id: 'programme-formation-personnel',
        title: 'Développement de Programme de Formation du Personnel',
        description: 'Construction de programmes de formation RGPD efficaces',
        duration: 30,
        type: 'interactive',
        required: true
      },
      {
        id: 'gestion-fournisseurs',
        title: 'Gestion des Fournisseurs et Tiers',
        description: 'Conformité RGPD dans les relations avec les fournisseurs',
        duration: 25,
        type: 'reading',
        required: true
      },
      {
        id: 'audit-conformite',
        title: 'Audit et Surveillance de la Conformité',
        description: 'Développement de procédures d\'audit et de surveillance',
        duration: 20,
        type: 'interactive',
        required: true
      },
      {
        id: 'evaluation-rgpd-admin',
        title: 'Évaluation RGPD Administrateur',
        description: 'Évaluation complète des connaissances RGPD',
        duration: 20,
        type: 'quiz',
        required: true
      }
    ],
    instructor: {
      name: "Équipe Confidentialité",
      title: "Experts Confidentialité EduSoluce",
      bio: "Spécialistes de la confidentialité avec expertise dans les réglementations de conformité éducative",
      avatar: "https://ui-avatars.com/api/?name=Privacy+Team&background=3b82f6&color=ffffff",
      credentials: ["Confidentialité", "Conformité", "Éducation"]
    },
    achievements: [
      {
        id: "rgpd-basics",
        title: "Bases RGPD",
        description: "Compléter le guide fondamental RGPD",
        points: 100
      },
      {
        id: "gestion-donnees-expert",
        title: "Expert en Gestion des Données",
        description: "Maîtriser la gestion des données personnelles",
        points: 150
      }
    ],
    tags: ['rgpd', 'administration', 'conformité', 'politique', 'gestion'],
    featured: true,
    popularity: 4.7,
    enrollmentCount: 1250,
    completionRate: 87,
    lastUpdated: '2025-01-15',
    
    // Links to existing assessment areas
    relatedAssessmentAreas: [
      'gestion-donnees-personnelles',
      'politiques-confidentialite', 
      'formation-sensibilisation-personnel',
      'gestion-fournisseurs-tiers',
      'audit-surveillance-conformite'
    ],
    recommendedForMaturityLevels: ['Niveau 1→2', 'Niveau 2→3'],
    
    // Links to compliance calendar
    linkedComplianceEvents: ['rgpd-notification-annuelle-2025'],
    schedulingRecommendations: [
      {
        beforeEvent: 'rgpd-notification-annuelle-2025',
        daysBeforeDeadline: 90
      }
    ]
  },
  {
    id: 'loi-ivoirienne-enseignants',
    title: 'Guide Loi Ivoirienne pour le Corps Enseignant',
    description: 'Guide essentiel de conformité à la Loi Ivoirienne pour les enseignants travaillant avec les données d\'étudiants',
    longDescription: 'Apprenez comment implémenter les exigences de la Loi Ivoirienne n° 2013-450 dans les environnements technologiques éducatifs. Ce cours couvre la gestion des données personnelles, le consentement parental, la minimisation des données, l\'évaluation des fournisseurs et la création d\'environnements d\'apprentissage conformes.',
    category: 'privacy',
    regulation: 'loi-ivoirienne',
    level: 'intermediate',
    targetRoles: ['teacher', 'administrator'],
    duration: 80,
    format: 'video-series',
    learningObjectives: [
      'Comprendre les exigences de la Loi Ivoirienne pour les étudiants',
      'Implémenter des procédures de consentement parental',
      'Appliquer les principes de minimisation des données dans la technologie éducative',
      'Évaluer les services tiers pour la conformité à la Loi Ivoirienne',
      'Créer des environnements d\'apprentissage numérique conformes'
    ],
    prerequisites: ['Compréhension de base de la technologie éducative'],
    syllabus: [
      {
        id: 'loi-ivoirienne-overview-enseignants',
        title: 'Aperçu Loi Ivoirienne pour les Enseignants',
        description: 'Comprendre la Loi Ivoirienne dans les contextes éducatifs',
        duration: 20,
        type: 'video',
        required: true
      },
      {
        id: 'consentement-parental-methodes',
        title: 'Méthodes de Consentement Parental dans les Écoles',
        description: 'Implémentation du consentement parental dans les environnements éducatifs',
        duration: 25,
        type: 'interactive',
        required: true
      },
      {
        id: 'minimisation-donnees-educatives',
        title: 'Minimisation des Données dans l\'Éducation',
        description: 'Collecte et utilisation minimales des données d\'étudiants',
        duration: 20,
        type: 'assignment',
        required: true
      },
      {
        id: 'evaluation-services-tiers',
        title: 'Évaluation des Services Tiers',
        description: 'Évaluer les outils éducatifs pour la conformité',
        duration: 15,
        type: 'reading',
        required: true
      }
    ],
    instructor: {
      name: "Équipe Conformité",
      title: "Experts Conformité EduSoluce",
      bio: "Spécialistes de la conformité avec expertise dans les réglementations africaines",
      avatar: "https://ui-avatars.com/api/?name=Compliance+Team&background=10b981&color=ffffff",
      credentials: ["Conformité", "Loi Ivoirienne", "Éducation"]
    },
    achievements: [
      {
        id: "loi-ivoirienne-basics",
        title: "Bases Loi Ivoirienne",
        description: "Compléter le guide Loi Ivoirienne",
        points: 100
      },
      {
        id: "enseignant-conforme",
        title: "Enseignant Conforme",
        description: "Maîtriser la conformité éducative",
        points: 120
      }
    ],
    tags: ['loi-ivoirienne', 'enseignants', 'conformité', 'données-étudiants', 'consentement'],
    featured: true,
    popularity: 4.5,
    enrollmentCount: 980,
    completionRate: 82,
    lastUpdated: '2025-01-15',
    
    relatedAssessmentAreas: [
      'gestion-donnees-etudiants',
      'consentement-parental',
      'minimisation-donnees',
      'evaluation-fournisseurs'
    ],
    recommendedForMaturityLevels: ['Niveau 1→2'],
    
    linkedComplianceEvents: ['loi-ivoirienne-audit-2025'],
    schedulingRecommendations: [
      {
        beforeEvent: 'loi-ivoirienne-audit-2025',
        daysBeforeDeadline: 60
      }
    ]
  },
  {
    id: 'artci-technical-implementation',
    title: 'Implémentation Technique ARTCI pour le Personnel IT',
    description: 'Guide technique pour implémenter les exigences ARTCI dans les systèmes informatiques éducatifs',
    longDescription: 'Guide complet pour le personnel IT/DSI sur l\'implémentation technique des exigences ARTCI, incluant la sécurité des données, la gestion des accès, la surveillance des systèmes, la réponse aux incidents et l\'intégration avec les systèmes éducatifs existants.',
    category: 'technical',
    regulation: 'artci',
    level: 'advanced',
    targetRoles: ['it-staff'],
    duration: 150,
    format: 'workshop',
    learningObjectives: [
      'Implémenter des mesures de sécurité techniques conformes ARTCI',
      'Configurer des systèmes de gestion des accès et authentification',
      'Mettre en place une surveillance et un monitoring des systèmes',
      'Développer des procédures de réponse aux incidents de sécurité',
      'Intégrer les exigences ARTCI dans les systèmes éducatifs existants'
    ],
    prerequisites: ['Connaissance technique des systèmes informatiques', 'Expérience en sécurité des données'],
    syllabus: [
      {
        id: 'artci-technical-overview',
        title: 'Aperçu Technique ARTCI',
        description: 'Exigences techniques de l\'ARTCI pour les systèmes informatiques',
        duration: 30,
        type: 'video',
        required: true
      },
      {
        id: 'securite-donnees-technique',
        title: 'Sécurité Technique des Données',
        description: 'Implémentation de mesures de sécurité techniques',
        duration: 40,
        type: 'interactive',
        required: true
      },
      {
        id: 'gestion-acces-authentification',
        title: 'Gestion des Accès et Authentification',
        description: 'Configuration des systèmes d\'authentification',
        duration: 35,
        type: 'workshop',
        required: true
      },
      {
        id: 'surveillance-monitoring',
        title: 'Surveillance et Monitoring des Systèmes',
        description: 'Mise en place de systèmes de surveillance',
        duration: 25,
        type: 'interactive',
        required: true
      },
      {
        id: 'reponse-incidents-securite',
        title: 'Réponse aux Incidents de Sécurité',
        description: 'Développement de procédures de réponse aux incidents',
        duration: 20,
        type: 'assignment',
        required: true
      }
    ],
    instructor: {
      name: "Équipe Technique",
      title: "Experts Techniques EduSoluce",
      bio: "Ingénieurs système avec expertise en sécurité et conformité réglementaire",
      avatar: "https://ui-avatars.com/api/?name=Tech+Team&background=8b5cf6&color=ffffff",
      credentials: ["Sécurité", "ARTCI", "Systèmes"]
    },
    achievements: [
      {
        id: "artci-technical-expert",
        title: "Expert Technique ARTCI",
        description: "Maîtriser l\'implémentation technique ARTCI",
        points: 200
      },
      {
        id: "securite-systemes",
        title: "Sécurité des Systèmes",
        description: "Implémenter la sécurité technique",
        points: 180
      }
    ],
    tags: ['artci', 'technique', 'sécurité', 'systèmes', 'implémentation'],
    featured: true,
    popularity: 4.8,
    enrollmentCount: 450,
    completionRate: 75,
    lastUpdated: '2025-01-15',
    
    relatedAssessmentAreas: [
      'securite-technique-donnees',
      'gestion-acces-systemes',
      'surveillance-monitoring',
      'reponse-incidents-techniques'
    ],
    recommendedForMaturityLevels: ['Niveau 2→3', 'Niveau 3→4'],
    
    linkedComplianceEvents: ['artci-audit-technique-2025'],
    schedulingRecommendations: [
      {
        beforeEvent: 'artci-audit-technique-2025',
        daysBeforeDeadline: 120
      }
    ]
  }
];

// Learning paths for African/European educational institutions
export const learningPaths: LearningPath[] = [
  {
    id: 'rgpd-complete-path',
    title: 'Parcours Complet RGPD',
    description: 'Parcours complet pour maîtriser la conformité RGPD dans les institutions éducatives',
    regulation: 'rgpd',
    targetRole: 'administrator',
    level: 'intermediate',
    moduleIds: ['rgpd-fundamentals-administrators'],
    duration: 2,
    difficulty: 'moderate',
    prerequisites: ['Connaissance de base de l\'administration éducative'],
    benefits: [
      'Maîtrise complète des exigences RGPD',
      'Capacité à implémenter des politiques de conformité',
      'Gestion efficace des données personnelles',
      'Formation du personnel sur la protection des données'
    ],
    addressesAssessmentAreas: ['gestion-donnees-personnelles', 'politiques-confidentialite'],
    maturityProgression: [
      {
        fromLevel: 'Niveau 1',
        toLevel: 'Niveau 3',
        assessmentArea: 'gestion-donnees-personnelles'
      }
    ]
  }
];

// Role-based module recommendations
export const roleRecommendations = {
  administrator: ['rgpd-fundamentals-administrators'],
  teacher: ['loi-ivoirienne-enseignants'],
  'it-staff': ['artci-technical-implementation'],
  student: []
};