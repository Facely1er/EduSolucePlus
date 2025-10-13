import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface LoadingStateProps {
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  children?: React.ReactNode;
  loadingMessage?: string;
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
}

export function LoadingState({
  loading = false,
  error = null,
  onRetry,
  children,
  loadingMessage = 'Loading...',
  emptyMessage = 'No data available',
  emptyAction
}: LoadingStateProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <Loader2 className="h-10 w-10 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" />
          <p className="text-muted-foreground">{loadingMessage}</p>
          
          {/* Diagnostic info in development mode */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm text-left">
              <details>
                <summary className="cursor-pointer text-blue-700 dark:text-blue-300 font-medium">Loading Diagnostics</summary>
                <div className="mt-2 text-xs">
                  <p className="mb-1">Network Status: {navigator.onLine ? 'Online' : 'Offline'}</p>
                  <p className="mb-1">Browser: {navigator.userAgent}</p>
                  <p>Please contact support if this loading continues for more than 10 seconds.</p>
                </div>
              </details>
            </div>
          )}
          
          {/* Loading for more than 10 seconds - show additional info */}
          <LoadingTimer duration={10000} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 shadow-sm max-w-md text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4 text-center">{error}</p>
          
          {/* Additional info in development mode */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-left">
              <details>
                <summary className="cursor-pointer text-red-700 dark:text-red-300 font-medium">Error Details</summary>
                <div className="mt-2 text-xs">
                  <p className="mb-1">Network Status: {navigator.onLine ? 'Online' : 'Offline'}</p>
                  <p>Error: {error}</p>
                </div>
              </details>
            </div>
          )}
          
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!children) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
          {emptyAction && (
            <Button onClick={emptyAction.onClick} className="mt-4">
              {emptyAction.label}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Skeleton loaders for different content types - exported for use in dashboards and data loading
export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-full"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-6 bg-gray-200 dark:bg-gray-700 rounded flex-1"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
}

// Component that shows additional info if loading takes too long
function LoadingTimer({ duration = 10000 }: { duration?: number }) {
  const [showHelp, setShowHelp] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelp(true);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration]);
  
  if (!showHelp) return null;
  
  return (
    <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm">
      <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Still loading...</h4>
      <p className="text-amber-700 dark:text-amber-400 mb-3">
        This is taking longer than expected. You can try:
      </p>
      <ul className="list-disc pl-5 text-amber-700 dark:text-amber-400 space-y-1 mb-3">
        <li>Refreshing the page</li>
        <li>Checking your internet connection</li>
        <li>Clearing your browser cache</li>
      </ul>
      <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
        <RefreshCw className="h-3 w-3 mr-2" />
        Refresh Page
      </Button>
    </div>
  );
}