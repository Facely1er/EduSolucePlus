// Error handling and reporting service
interface ErrorReport {
  id: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  error: {
    name: string;
    message: string;
    stack?: string;
  };
  context: {
    url: string;
    userAgent: string;
    component?: string;
    action?: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

class ErrorService {
  private errorBuffer: ErrorReport[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupGlobalErrorHandlers();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  private setupGlobalErrorHandlers(): void {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      this.reportError(event.error, {
        component: 'Global',
        action: 'Unhandled Error',
        severity: 'high'
      });
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError(new Error(event.reason), {
        component: 'Global',
        action: 'Unhandled Promise Rejection',
        severity: 'medium'
      });
    });
  }

  reportError(
    error: Error, 
    context: {
      component?: string;
      action?: string;
      severity?: 'low' | 'medium' | 'high' | 'critical';
      userId?: string;
    } = {}
  ): void {
    const errorReport: ErrorReport = {
      id: `error_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      userId: context.userId,
      sessionId: this.sessionId,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      },
      context: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        component: context.component,
        action: context.action
      },
      severity: context.severity || 'medium',
      resolved: false
    };

    this.errorBuffer.push(errorReport);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error reported:', errorReport);
    }

    // Send critical errors immediately
    if (errorReport.severity === 'critical') {
      this.sendToErrorService([errorReport]);
    }

    // Store in localStorage for development/backup
    this.storeLocalError(errorReport);
  }

  private storeLocalError(errorReport: ErrorReport): void {
    try {
      const existingErrors = JSON.parse(localStorage.getItem('error_reports') || '[]');
      existingErrors.push(errorReport);
      
      // Keep only the last 50 errors
      if (existingErrors.length > 50) {
        existingErrors.splice(0, existingErrors.length - 50);
      }
      
      localStorage.setItem('error_reports', JSON.stringify(existingErrors));
    } catch (error) {
      console.error('Failed to store error report:', error);
    }
  }

  private async sendToErrorService(errors: ErrorReport[]): Promise<void> {
    try {
      // In production, this would send to error monitoring service like Sentry
      console.log('Sending error reports to monitoring service:', errors.length);
      
      // For development, just log
      if (import.meta.env.DEV) {
        console.group('Error Reports');
        errors.forEach(error => console.error(error));
        console.groupEnd();
      }
    } catch (error) {
      console.error('Failed to send error reports:', error);
    }
  }

  async flushErrors(): Promise<void> {
    if (this.errorBuffer.length === 0) return;

    const errorsToSend = [...this.errorBuffer];
    this.errorBuffer = [];
    
    await this.sendToErrorService(errorsToSend);
  }

  // Get error statistics for monitoring
  getErrorStatistics(): {
    totalErrors: number;
    errorsBySeverity: Record<string, number>;
    recentErrors: number;
  } {
    try {
      const errors: ErrorReport[] = JSON.parse(localStorage.getItem('error_reports') || '[]');
      const last24Hours = new Date();
      last24Hours.setHours(last24Hours.getHours() - 24);
      
      const recentErrors = errors.filter(error => 
        new Date(error.timestamp) > last24Hours
      ).length;
      
      const errorsBySeverity = errors.reduce((acc, error) => {
        acc[error.severity] = (acc[error.severity] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      return {
        totalErrors: errors.length,
        errorsBySeverity,
        recentErrors
      };
    } catch (error) {
      console.error('Failed to get error statistics:', error);
      return { totalErrors: 0, errorsBySeverity: {}, recentErrors: 0 };
    }
  }
}

export const errorService = new ErrorService();

// React Error Boundary component
import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  React.useEffect(() => {
    errorService.reportError(error, {
      component: 'ErrorBoundary',
      severity: 'high'
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>
        
        {import.meta.env.DEV && (
          <details className="text-left mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
            <pre className="whitespace-pre-wrap text-xs text-red-600 dark:text-red-400">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        
        <div className="space-y-3">
          <Button onClick={resetErrorBoundary} className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: { fallback?: React.ComponentType<ErrorFallbackProps> }
) {
  return function WrappedComponent(props: P) {
    return (
      <ReactErrorBoundary
        FallbackComponent={errorBoundaryProps?.fallback || ErrorFallback}
        onError={(error, errorInfo) => {
          errorService.reportError(error, {
            component: Component.displayName || Component.name,
            severity: 'high'
          });
        }}
      >
        <Component {...props} />
      </ReactErrorBoundary>
    );
  };
}