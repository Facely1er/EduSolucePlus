// Error handling service for centralized error management
interface ErrorInfo {
  message: string;
  code?: string;
  context?: Record<string, unknown>;
  timestamp: number;
  userId?: string;
  sessionId?: string;
}

interface ErrorReport {
  id: string;
  error: ErrorInfo;
  stack?: string;
  userAgent?: string;
  url?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  resolvedAt?: number;
  resolvedBy?: string;
}

class ErrorService {
  private errors: ErrorReport[] = [];
  private maxErrors = 1000; // Keep only last 1000 errors

  // Log an error
  logError(error: Error, context?: Record<string, unknown>): string {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const errorReport: ErrorReport = {
      id: errorId,
      error: {
        message: error.message,
        code: error.name,
        context,
        timestamp: Date.now(),
        userId: this.getCurrentUserId(),
        sessionId: this.getCurrentSessionId()
      },
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      severity: this.determineSeverity(error),
      resolved: false
    };

    this.errors.unshift(errorReport);
    
    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error logged:', errorReport);
    }

    // In production, you might want to send to an error reporting service
    // this.sendToErrorReportingService(errorReport);

    return errorId;
  }

  // Get all errors
  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  // Get errors by severity
  getErrorsBySeverity(severity: ErrorReport['severity']): ErrorReport[] {
    return this.errors.filter(error => error.severity === severity);
  }

  // Get unresolved errors
  getUnresolvedErrors(): ErrorReport[] {
    return this.errors.filter(error => !error.resolved);
  }

  // Mark error as resolved
  resolveError(errorId: string, resolvedBy?: string): boolean {
    const error = this.errors.find(e => e.id === errorId);
    if (error) {
      error.resolved = true;
      error.resolvedAt = Date.now();
      error.resolvedBy = resolvedBy;
      return true;
    }
    return false;
  }

  // Clear all errors
  clearErrors(): void {
    this.errors = [];
  }

  // Get error statistics
  getErrorStats() {
    const total = this.errors.length;
    const resolved = this.errors.filter(e => e.resolved).length;
    const unresolved = total - resolved;
    
    const bySeverity = this.errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      resolved,
      unresolved,
      bySeverity
    };
  }

  private determineSeverity(error: Error): ErrorReport['severity'] {
    // Simple severity determination based on error type
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return 'high';
    }
    if (error.name === 'NetworkError' || error.message.includes('network')) {
      return 'medium';
    }
    if (error.name === 'ValidationError') {
      return 'low';
    }
    return 'medium';
  }

  private getCurrentUserId(): string | undefined {
    // Get user ID from your auth context or localStorage
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).id : undefined;
    } catch {
      return undefined;
    }
  }

  private getCurrentSessionId(): string | undefined {
    // Get session ID from your session management
    try {
      return sessionStorage.getItem('sessionId') || undefined;
    } catch {
      return undefined;
    }
  }

  // Create a user-friendly error message
  createUserFriendlyMessage(error: Error): string {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }
    
    if (error.message.includes('permission') || error.message.includes('unauthorized')) {
      return 'You do not have permission to perform this action. Please contact your administrator.';
    }
    
    if (error.message.includes('validation') || error.message.includes('invalid')) {
      return 'Please check your input and try again.';
    }
    
    if (error.message.includes('timeout')) {
      return 'The request timed out. Please try again.';
    }
    
    // Default message
    return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
  }
}

export const errorService = new ErrorService();