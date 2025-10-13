import React from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingStateProps {
  loading: boolean;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  loading,
  loadingMessage = 'Loading...',
  successMessage,
  errorMessage,
  className = '',
  size = 'md'
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  if (errorMessage) {
    return (
      <div className={cn('flex items-center justify-center gap-2 text-red-600 dark:text-red-400', className)}>
        <AlertCircle className={sizeClasses[size]} />
        <span className="text-sm">{errorMessage}</span>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div className={cn('flex items-center justify-center gap-2 text-green-600 dark:text-green-400', className)}>
        <CheckCircle className={sizeClasses[size]} />
        <span className="text-sm">{successMessage}</span>
      </div>
    );
  }

  if (!loading) {
    return null;
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      <span className="text-sm text-muted-foreground">{loadingMessage}</span>
    </div>
  );
}

// Full page loading component
export function PageLoadingState({ 
  loadingMessage = 'Loading page...',
  className = ''
}: { 
  loadingMessage?: string;
  className?: string;
}) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-background', className)}>
      <LoadingState loading={true} loadingMessage={loadingMessage} size="lg" />
    </div>
  );
}

// Inline loading component
export function InlineLoadingState({ 
  loadingMessage = 'Loading...',
  className = ''
}: { 
  loadingMessage?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <LoadingState loading={true} loadingMessage={loadingMessage} />
    </div>
  );
}