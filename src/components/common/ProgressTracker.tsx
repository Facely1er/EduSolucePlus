import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProgressStep {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  showDescriptions?: boolean;
}

export function ProgressTracker({
  steps,
  orientation = 'horizontal',
  className = '',
  showDescriptions = true
}: ProgressTrackerProps) {
  const getStepIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'current':
        return <Clock className="h-5 w-5 text-primary" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStepStyles = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400';
      case 'current':
        return 'text-primary font-medium';
      default:
        return 'text-muted-foreground';
    }
  };

  if (orientation === 'vertical') {
    return (
      <div className={cn('space-y-4', className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {getStepIcon(step.status)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn('text-sm font-medium', getStepStyles(step.status))}>
                {step.title}
              </h3>
              {showDescriptions && step.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-2.5 top-8 w-px h-6 bg-border" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center text-center">
            <div className="flex-shrink-0 mb-2">
              {getStepIcon(step.status)}
            </div>
            <div className="max-w-32">
              <h3 className={cn('text-xs font-medium', getStepStyles(step.status))}>
                {step.title}
              </h3>
              {showDescriptions && step.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-px bg-border mx-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Progress bar component
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  className = '',
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">{label}</span>
          {showPercentage && (
            <span className="text-sm text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}