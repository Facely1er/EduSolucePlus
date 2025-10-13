// Security utilities for production deployment
import { environment } from '../config/environment';

// Content Security Policy configuration
export const cspConfig = {
  directives: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for development - remove in production
      'https://cdn.jsdelivr.net',
      'https://unpkg.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'https://images.pexels.com',
      'https://ui-avatars.com'
    ],
    'connect-src': [
      "'self'",
      environment.supabaseUrl,
      'https://api.pexels.com'
    ],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': environment.production ? [] : undefined
  }
};

// Generate CSP header string
export const generateCSPHeader = (): string => {
  return Object.entries(cspConfig.directives)
    .filter(([_, value]) => value !== undefined)
    .map(([directive, sources]) => 
      `${directive} ${Array.isArray(sources) ? sources.join(' ') : sources}`
    )
    .join('; ');
};

// Session security utilities
export class SessionSecurity {
  private static readonly SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours
  private static readonly IDLE_TIMEOUT = 2 * 60 * 60 * 1000; // 2 hours

  static startSessionMonitoring(): void {
    if (!environment.production) return;

    let lastActivity = Date.now();
    
    // Track user activity
    const updateActivity = () => {
      lastActivity = Date.now();
      localStorage.setItem('last_activity', lastActivity.toString());
    };

    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Check for session timeout
    const checkTimeout = () => {
      const now = Date.now();
      const lastActivityTime = parseInt(localStorage.getItem('last_activity') || '0');
      const timeSinceActivity = now - Math.max(lastActivity, lastActivityTime);

      if (timeSinceActivity > this.IDLE_TIMEOUT) {
        this.handleSessionTimeout();
      }
    };

    setInterval(checkTimeout, 60000); // Check every minute
  }

  private static handleSessionTimeout(): void {
    localStorage.removeItem('supabase.auth.token');
    localStorage.setItem('session_expired', 'true');
    window.location.href = '/login?reason=timeout';
  }

  static validateSession(): boolean {
    const sessionStart = localStorage.getItem('session_start');
    if (!sessionStart) return false;

    const sessionAge = Date.now() - parseInt(sessionStart);
    return sessionAge < this.SESSION_TIMEOUT;
  }

  static initializeSession(): void {
    localStorage.setItem('session_start', Date.now().toString());
    localStorage.setItem('last_activity', Date.now().toString());
  }
}

// Data sanitization utilities
export const sanitizeUserInput = (input: string): string => {
  if (input == null || input === undefined) {
    return '';
  }
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/data:/gi, '') // Remove data: URLs
    .slice(0, 1000); // Limit length
};

// File upload security
export const validateFileUpload = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' };
  }



  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not allowed' };
  }

  // Check file extension matches MIME type
  const hasExtension = file.name.includes('.');
  const extension = hasExtension ? file.name.split('.').pop()?.toLowerCase() : undefined;
  const mimeToExtension: Record<string, string[]> = {
    'application/pdf': ['pdf'],
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'text/plain': ['txt'],
    'application/msword': ['doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx']
  };

  const validExtensions = mimeToExtension[file.type] || [];
  

  
  // Only check extension if file actually has one
  if (hasExtension && extension && validExtensions.length > 0 && !validExtensions.includes(extension)) {
    return { valid: false, error: 'File extension does not match file type' };
  }

  return { valid: true };
};

// API request security wrapper
export const secureApiCall = async <T>(
  apiCall: () => Promise<T>,
  options: {
    retries?: number;
    timeout?: number;
    rateLimitKey?: string;
  } = {}
): Promise<T> => {
  const { retries = 3, timeout = 30000, rateLimitKey } = options;

  // Rate limiting
  if (rateLimitKey && environment.production) {
    // Implementation would depend on your rate limiting strategy
    console.log('Rate limit check for:', rateLimitKey);
  }

  let lastError: Error;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Create a timeout promise
      let timeoutId: NodeJS.Timeout;
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Request timeout')), timeout);
      });
      
      // Race the API call against the timeout
      const result = await Promise.race([
        apiCall().finally(() => clearTimeout(timeoutId)),
        timeoutPromise
      ]);
      
      clearTimeout(timeoutId);
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt === retries - 1) {
        throw lastError;
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw lastError!;
};