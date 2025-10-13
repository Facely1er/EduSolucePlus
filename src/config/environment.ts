// Environment configuration and storage keys

// Environment validation
const requiredEnvVars = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_APP_URL: import.meta.env.VITE_APP_URL || window.location.origin,
  VITE_ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT || 'development'
};

// Schema configuration
const schemaConfig = {
  default: import.meta.env.VITE_SUPABASE_SCHEMA || 'public',
  organization: import.meta.env.VITE_SUPABASE_ORGANIZATION_SCHEMA || 'organization_specific',
  differentiationEnabled: import.meta.env.VITE_ENABLE_SCHEMA_DIFFERENTIATION === 'true'
};

// Validate required environment variables
const validateEnvironment = () => {
  const missing = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
};

// Validate environment variables at runtime (not during build)
if (import.meta.env.PROD && typeof window !== 'undefined') {
  validateEnvironment();
}

export const environment = {
  production: import.meta.env.PROD,
  development: import.meta.env.DEV,
  supabaseUrl: requiredEnvVars.VITE_SUPABASE_URL,
  supabaseAnonKey: requiredEnvVars.VITE_SUPABASE_ANON_KEY,
  appUrl: requiredEnvVars.VITE_APP_URL,
  environment: requiredEnvVars.VITE_ENVIRONMENT,
  
  // African Market Configuration
  locale: {
    default: import.meta.env.VITE_APP_LOCALE || 'fr-CI', // French - Côte d'Ivoire
    timezone: import.meta.env.VITE_APP_TIMEZONE || 'Africa/Abidjan',
    currency: import.meta.env.VITE_APP_CURRENCY || 'XOF', // West African CFA franc
    region: import.meta.env.VITE_APP_REGION || 'africa'
  },
  
  // Application Info
  app: {
    name: 'EduSoluce™ Afrique',
    version: '2.0.0',
    company: 'ERMITS LLC',
    supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@edusoluce-africa.com',
    contactPhone: import.meta.env.VITE_CONTACT_PHONE || ''
  },
  
  // Regulatory Configuration
  regulatory: {
    enableRGPD: import.meta.env.VITE_ENABLE_RGPD_MODE === 'true',
    enableARTCI: import.meta.env.VITE_ENABLE_ARTCI_INTEGRATION === 'true',
    artciApiUrl: import.meta.env.VITE_ARTCI_API_URL || 'https://www.artci.ci/api',
    primaryRegulation: 'gdpr', // Can be 'gdpr', 'ci-data-protection', 'malabo-convention'
    secondaryRegulations: ['ci-data-protection', 'ecowas-data-protection', 'malabo-convention']
  },
  
  // Schema configuration
  schema: {
    default: schemaConfig.default,
    organization: schemaConfig.organization,
    differentiationEnabled: schemaConfig.differentiationEnabled
  },
  
  // Backend API configuration
  backend: {
    url: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
    apiVersion: import.meta.env.VITE_API_VERSION || 'v1'
  },
  
  // Feature flags for production
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableSentry: import.meta.env.VITE_ENABLE_SENTRY === 'true',
    enableOfflineMode: import.meta.env.VITE_ENABLE_OFFLINE !== 'false',
    enableSchemaDifferentiation: schemaConfig.differentiationEnabled,
    maxRetries: parseInt(import.meta.env.VITE_MAX_RETRIES || '3'),
    requestTimeout: parseInt(import.meta.env.VITE_REQUEST_TIMEOUT || '30000')
  }
};

export const storageKeys = {
  // Authentication
  authToken: 'auth_token',
  refreshToken: 'refresh_token',
  
  // User data
  userPreferences: 'user_preferences',
  userProfile: 'user_profile',
  
  // Progress tracking
  assessmentProgress: 'assessment_progress',
  trainingProgress: 'training_progress',
  
  // Notifications
  notifications: 'notifications',
  
  // Cache
  apiCache: 'api_cache',
  
  // Settings
  appSettings: 'app_settings'
};

// API endpoints configuration (for future use)
// const apiEndpoints = {
//   base: import.meta.env.PROD 
//     ? 'https://api.edusoluce.com' 
//     : 'http://localhost:3001',
//   
//   auth: '/auth',
//   assessments: '/assessments',
//   training: '/training',
//   compliance: '/compliance',
//   notifications: '/notifications'
// };

// Application configuration (for future use)
// const appConfig = {
//   name: 'EduSoluce™',
//   version: '1.0.0',
//   company: 'ERMITS LLC',
//   
//   // Feature flags
//   features: {
//     notifications: true,
//     darkMode: true,
//     offlineMode: true,
//     analytics: import.meta.env.PROD
//   },
//   
//   // Notification settings
//   notifications: {
//     maxCount: 50,
//     defaultTTL: 30 * 24 * 60 * 60 * 1000, // 30 days
//     categories: ['training', 'assessment', 'compliance', 'system'],
//     priorities: ['low', 'medium', 'high']
//   }
// };