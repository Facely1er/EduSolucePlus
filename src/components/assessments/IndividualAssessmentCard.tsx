import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: number;
  estimatedTime: number;
  regulation?: 'ferpa' | 'coppa' | 'gdpr' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
  lastCompleted?: string;
}

interface IndividualAssessmentCardProps {
  assessment: Assessment;
  role: string;
}

export function IndividualAssessmentCard({ assessment, role }: IndividualAssessmentCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {assessment.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {assessment.description}
            </p>
          </div>
          <div className="flex gap-2">
            {assessment.regulation && (
              <Badge variant={assessment.regulation}>
                {assessment.regulation.toUpperCase()}
              </Badge>
            )}
            <Badge level={assessment.level}>
              {assessment.level.charAt(0).toUpperCase() + assessment.level.slice(1)}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <div className="flex gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Questions</p>
            <p className="font-medium">{assessment.questions}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Est. Time</p>
            <p className="font-medium">{assessment.estimatedTime} min</p>
          </div>
        </div>
      </div>
      
      <div className="items-center p-6 pt-0 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Last completed: {assessment.lastCompleted || 'Never'}
        </div>
        <Link to={`/assessment/${role}/${assessment.id}`} title={`Start ${assessment.title} assessment to test your knowledge`}>
          <Button className="font-medium">
            Start Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}