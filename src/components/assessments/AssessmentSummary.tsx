import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Target, Award } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface AssessmentSummaryProps {
  assessmentId: string;
  title: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  completedAt: string;
  areas: {
    name: string;
    score: number;
    status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  }[];
  onRetake?: () => void;
  onViewDetails?: () => void;
  onDownloadCertificate?: () => void;
}

export function AssessmentSummary({
  title,
  totalQuestions,
  correctAnswers,
  score,
  timeSpent,
  completedAt,
  areas,
  onRetake,
  onViewDetails,
  onDownloadCertificate
}: AssessmentSummaryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Award className="h-6 w-6 text-green-600 dark:text-green-400" />;
    if (score >= 70) return <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    if (score >= 50) return <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />;
    return <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Good</Badge>;
      case 'needs-improvement':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Needs Improvement</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
      default:
        return <Badge variant="general">Unknown</Badge>;
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex items-center gap-2">
            {getScoreIcon(score)}
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Questions:</span>
            <span className="ml-2 font-medium">{correctAnswers}/{totalQuestions}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Time Spent:</span>
            <span className="ml-2 font-medium">{formatTime(timeSpent)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Completed:</span>
            <span className="ml-2 font-medium">{new Date(completedAt).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>
            <span className="ml-2 font-medium">
              {score >= 70 ? 'Passed' : 'Needs Improvement'}
            </span>
          </div>
        </div>
      </div>

      {/* Areas Breakdown */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Areas Assessment</h3>
        <div className="space-y-4">
          {areas.map((area, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{area.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xl font-bold ${getScoreColor(area.score)}`}>
                  {area.score}%
                </span>
                {getStatusBadge(area.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {onViewDetails && (
          <Button onClick={onViewDetails}>
            View Detailed Results
          </Button>
        )}
        {onRetake && (
          <Button variant="outline" onClick={onRetake}>
            Retake Assessment
          </Button>
        )}
        {onDownloadCertificate && score >= 70 && (
          <Button variant="outline" onClick={onDownloadCertificate}>
            Download Certificate
          </Button>
        )}
      </div>

      {/* Recommendations */}
      {score < 70 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 p-6">
          <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
            Recommendations
          </h3>
          <p className="text-amber-800 dark:text-amber-200 mb-4">
            Your assessment shows areas that need improvement. We recommend:
          </p>
          <ul className="space-y-2 text-amber-800 dark:text-amber-200">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              Review the training modules for areas with low scores
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              Take additional assessments to track your progress
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              Consult with your institution's privacy officer for guidance
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}