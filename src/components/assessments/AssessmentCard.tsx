import React from 'react';
import { Link } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface AssessmentCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  numAssessments: number;
  link: string;
}

export function AssessmentCard({ icon: Icon, title, description, numAssessments, link }: AssessmentCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/30">
          <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="text-right">
          <Icon className="h-12 w-12 text-gray-200 dark:text-gray-700" />
        </div>
      </div>
      
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <div className="mb-6">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold text-primary-600 dark:text-primary-400">{numAssessments}</span> assessments available to help you understand and implement privacy best practices in your role.
        </p>
      </div>
      
      <Link to={link} className="block">
        <Button 
          className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          title={`Start ${title.toLowerCase()} to evaluate your privacy compliance knowledge`}
        >
          View Assessments
        </Button>
      </Link>
    </div>
  );
}