// Rate limiting utility for preventing abuse
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private defaultLimit = 10; // requests per window
  private defaultWindow = 60000; // 1 minute in milliseconds

  // Check if request is allowed
  isAllowed(key: string, limit?: number, window?: number): boolean {
    const maxRequests = limit || this.defaultLimit;
    const windowMs = window || this.defaultWindow;
    const now = Date.now();
    
    const entry = this.limits.get(key);
    
    if (!entry) {
      // First request
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return true;
    }
    
    if (now > entry.resetTime) {
      // Window has expired, reset
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return true;
    }
    
    if (entry.count >= maxRequests) {
      // Rate limit exceeded
      return false;
    }
    
    // Increment count
    entry.count++;
    return true;
  }

  // Get remaining requests
  getRemaining(key: string, limit?: number, window?: number): number {
    const maxRequests = limit || this.defaultLimit;
    const windowMs = window || this.defaultWindow;
    const now = Date.now();
    
    const entry = this.limits.get(key);
    
    if (!entry || now > entry.resetTime) {
      return maxRequests;
    }
    
    return Math.max(0, maxRequests - entry.count);
  }

  // Get reset time
  getResetTime(key: string): number | null {
    const entry = this.limits.get(key);
    return entry ? entry.resetTime : null;
  }

  // Clear rate limit for a key
  clear(key: string): void {
    this.limits.delete(key);
  }

  // Clear all rate limits
  clearAll(): void {
    this.limits.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}

// Create singleton instance
export const rateLimiter = new RateLimiter();

// Clean up expired entries every 5 minutes
setInterval(() => {
  rateLimiter.cleanup();
}, 5 * 60 * 1000);

// Rate limiting decorator for functions
export function withRateLimit(
  key: string,
  limit?: number,
  window?: number
) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      if (!rateLimiter.isAllowed(key, limit, window)) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      
      return method.apply(this, args);
    };
  };
}

// Rate limiting hook for React components
export function useRateLimit(
  key: string,
  limit?: number,
  window?: number
) {
  const isAllowed = rateLimiter.isAllowed(key, limit, window);
  const remaining = rateLimiter.getRemaining(key, limit, window);
  const resetTime = rateLimiter.getResetTime(key);
  
  return {
    isAllowed,
    remaining,
    resetTime,
    clear: () => rateLimiter.clear(key)
  };
}