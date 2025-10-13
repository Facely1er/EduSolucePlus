import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Target, TrendingUp, Award } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface AssessmentResult {
  areaId: string;
  areaName: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  recommendations: string[];
}

interface AssessmentResultsProps {
  assessmentId: string;
  overallScore: number;
  results: AssessmentResult[];
  completedAt: string;
  timeSpent: number;
  onRetake?: () => void;
  onViewRecommendations?: () => void;
}

export function AssessmentResults({
  overallScore,
  results,
  completedAt,
  timeSpent,
  onRetake,
  onViewRecommendations
}: AssessmentResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Award className="h-5 w-5 text-green-600 dark:text-green-400" />;
    if (score >= 70) return <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    if (score >= 50) return <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
    return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
  };

  const getStatusBadge = (status: AssessmentResult['status']) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Good</Badge>;
      case 'needs-improvement':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Needs Improvement</Badge>;
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</Badge>;
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
      {/* Overall Score */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          {getScoreIcon(overallScore)}
        </div>
        <h2 className="text-3xl font-bold mb-2">Assessment Complete!</h2>
        <div className="text-6xl font-bold mb-2">
          <span className={getScoreColor(overallScore)}>{overallScore}%</span>
        </div>
        <p className="text-muted-foreground mb-4">
          Completed on {new Date(completedAt).toLocaleDateString()} • {formatTime(timeSpent)}
        </p>
        <div className="flex gap-2 justify-center">
          {onRetake && (
            <Button variant="outline" onClick={onRetake}>
              Retake Assessment
            </Button>
          )}
          {onViewRecommendations && (
            <Button onClick={onViewRecommendations}>
              View Recommendations
            </Button>
          )}
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Detailed Results</h3>
        {results.map((result) => (
          <div key={result.areaId} className="bg-white dark:bg-gray-900 rounded-lg border p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{result.areaName}</h4>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                  {result.score}%
                </span>
                {getStatusBadge(result.status)}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  result.score >= 90 ? 'bg-green-500' :
                  result.score >= 70 ? 'bg-blue-500' :
                  result.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${result.score}%` }}
              />
            </div>

            {result.recommendations.length > 0 && (
              <div className="mt-3">
                <h5 className="text-sm font-medium text-muted-foreground mb-2">Recommendations:</h5>
                <ul className="space-y-1">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Target className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          Next Steps
        </h3>
        <p className="text-muted-foreground mb-4">
          Based on your assessment results, we recommend focusing on the areas that need improvement. 
          Use our training modules and resources to strengthen your privacy compliance knowledge.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Training Modules
          </Button>
          <Button variant="outline" size="sm">
            Download Resources
          </Button>
        </div>
      </div>
    </div>
  );
}