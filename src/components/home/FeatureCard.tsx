import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col space-y-1.5 p-6 pb-2">
        <div className="mb-4">
          <Icon className="h-10 w-10 text-primary-600" />
        </div>
        <h3 className="font-semibold tracking-tight text-xl">{title}</h3>
      </div>
      <div className="p-6 pt-0">
        <p className="text-muted-foreground text-base">{description}</p>
      </div>
    </div>
  );
}