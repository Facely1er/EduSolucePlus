import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'ferpa' | 'coppa' | 'gdpr' | 'ccpa' | 'cpra' | 'pipeda' | 'bipa' | 'shield' | 'sopipa' | 'vcdpa' | 'general';
  level?: 'beginner' | 'intermediate' | 'advanced';
  className?: string;
}

export function Badge({ children, variant = "default", level, className = "" }: BadgeProps) {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'ferpa':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800';
      case 'coppa':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800';
      case 'gdpr':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800';
      case 'ccpa':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800';
      case 'cpra':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800';
      case 'pipeda':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800';
      case 'bipa':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800';
      case 'shield':
        return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800';
      case 'sopipa':
        return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800';
      case 'vcdpa':
        return 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800';
      case 'general':
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getLevelStyles = (): string => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const styles = level ? getLevelStyles() : getVariantStyles();

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${styles} ${className}`}>
      {children}
    </span>
  );
}