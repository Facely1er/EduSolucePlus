import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextCarousel } from '../ui/TextCarousel';

export function HeroSection() {
  const carouselTexts = [
    "EduSoluce™ assists educational institutions in protecting student data and maintaining compliance with FERPA, COPPA, GDPR, and other privacy regulations.",
    "Navigate the complex world of educational privacy regulations with confidence and clarity.",
    "Address compliance challenges to build trust with students and parents.",
    "Manage privacy with role-specific guidance for administrators, teachers, and IT staff."
  ];

  const features = [
    'Customized role evaluations',
    'Ready-to-use resources & toolkits',
    'Interactive learning modules'
  ];

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5" 
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full px-4 py-2 mb-8">
          <Shield className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Educational Privacy Simplified</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
         Simplified Compliance{' '}
          <br className="hidden md:block" />
          <span className="text-primary-600 dark:text-primary-400">With Confidence</span>
        </h1>

        <TextCarousel 
          texts={carouselTexts}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10"
          interval={6000}
        />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link to="/onboarding">
            <Button size="lg" className="font-medium">
              Start your privacy journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/assessment">
            <Button size="lg" variant="outline" className="font-medium" title="Evaluate your privacy compliance knowledge">
              Take a privacy assessment
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <CheckCircle className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}