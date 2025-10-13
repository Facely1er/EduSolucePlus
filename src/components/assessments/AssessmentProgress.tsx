import React from 'react';
import { CheckCircle, Clock, AlertCircle, Target } from 'lucide-react';
import { ProgressBar } from '../common/ProgressTracker';
import { Badge } from '../ui/Badge';

interface AssessmentProgressProps {
  assessmentId: string;
  currentStep: number;
  totalSteps: number;
  completedSteps: number;
  timeSpent: number;
  estimatedTimeRemaining: number;
  score?: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'paused';
  onResume?: () => void;
  onRestart?: () => void;
}

export function AssessmentProgress({
  currentStep,
  totalSteps,
  completedSteps,
  timeSpent,
  estimatedTimeRemaining,
  score,
  status,
  onResume,
  onRestart
}: AssessmentProgressProps) {
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'paused':
        return <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">In Progress</Badge>;
      case 'paused':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Paused</Badge>;
      default:
        return <Badge variant="general">Not Started</Badge>;
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <h3 className="text-lg font-semibold">Assessment Progress</h3>
        </div>
        {getStatusBadge()}
      </div>

      <div className="space-y-4">
        <ProgressBar
          value={progressPercentage}
          label={`Step ${currentStep} of ${totalSteps}`}
          showPercentage={true}
          size="md"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Time Spent:</span>
            <span className="ml-2 font-medium">{formatTime(timeSpent)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Est. Remaining:</span>
            <span className="ml-2 font-medium">{formatTime(estimatedTimeRemaining)}</span>
          </div>
        </div>

        {score !== undefined && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Score:</span>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {score}%
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {status === 'paused' && onResume && (
            <button
              onClick={onResume}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Resume Assessment
            </button>
          )}
          {onRestart && (
            <button
              onClick={onRestart}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Restart Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}