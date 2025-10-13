import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, GraduationCap, LineChart, Database, Users } from 'lucide-react';


export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Privacy Assessments',
      description: 'Role-specific assessments to evaluate your institution\'s compliance with FERPA, COPPA, GDPR and more.',
      link: '/assessment'
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Access downloadable templates, checklists, and guides to implement best practices.',
      link: '/resources'
    },
    {
      icon: GraduationCap,
      title: 'Professionnal Guides',
      description: 'Interactive guidance content for staff development on privacy and data protection.',
      link: '/training'
    },
    {
      icon: LineChart,
      title: 'Compliance Dashboard',
      description: 'Track your progress and identify areas for improvement with visual analytics.',
      link: '/dashboard'
    },
    {
      icon: Database,
      title: 'Privacy Self-Service Portal',
      description: 'Manage data rights requests, consent records, and compliance obligations in one place.',
      link: '/privacy'
    },
    {
      icon: Users,
      title: 'Stakeholder Management',
      description: 'Provide appropriate access to students, parents, and staff for their privacy rights.',
      link: '/privacy/stakeholders'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Simplify Educational Compliance
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.link}
              className="group"
              title={`Learn more about ${feature.title}`}
            >
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md group-hover:border-primary-300">
                <div className="flex flex-col space-y-1.5 p-6 pb-2">
                  <div className="mb-4">
                    <feature.icon className="h-10 w-10 text-primary-600 group-hover:text-primary-700 transition-colors" />
                  </div>
                  <h3 className="font-semibold tracking-tight text-xl group-hover:text-primary-700 transition-colors">{feature.title}</h3>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-muted-foreground text-base">{feature.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}