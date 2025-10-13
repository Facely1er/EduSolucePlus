import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function CallToActionSection() {
  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Experience EduSoluce™
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
     Ready to see EduSoluce™ in action? Explore our interactive platform to understand how our solution can transform your institution's privacy compliance approach.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/onboarding" title="Begin your EduSoluce™ journey">
            <Button size="lg" className="font-medium">
              Start your compliance journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/assessment" title="Evaluate your privacy compliance knowledge">
            <Button size="lg" variant="outline" className="font-medium">
              Take a privacy assessment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}