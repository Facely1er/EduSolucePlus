import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Laptop, Book } from 'lucide-react';
import { AssessmentCard } from './AssessmentCard';
import { Button } from '../ui/Button';

export function AssessmentSection() {
  const assessments = [
    {
      icon: Shield,
      title: 'Administrator Assessments',
      description: 'For principals, superintendents, and other administrative staff',
      numAssessments: 5,
      link: '/assessments/administrator'
    },
    {
      icon: Users,
      title: 'Teacher Assessments',
      description: 'For classroom teachers and instructional staff',
      numAssessments: 4,
      link: '/assessments/teacher'
    },
    {
      icon: Laptop,
      title: 'IT Staff Assessments',
      description: 'For technology coordinators and support personnel',
      numAssessments: 6,
      link: '/assessments/it-staff'
    },
    {
      icon: Book,
      title: 'Student Assessments',
      description: 'For students to learn about digital privacy',
      numAssessments: 3,
      link: '/assessments/student'
    }
  ];

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Privacy Compliance Assessments
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Role-specific assessments designed to evaluate your institution's compliance with 
            educational privacy regulations including FERPA, COPPA, GDPR, and more.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {assessments.map((assessment, index) => (
            <AssessmentCard
              key={index}
              icon={assessment.icon}
              title={assessment.title}
              description={assessment.description}
              numAssessments={assessment.numAssessments}
              link={assessment.link}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Need help choosing the right assessment? Learn more about our comprehensive approach.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/how-it-works" title="Learn how our assessment process works">
              <Button variant="outline">
                How assessments work
              </Button>
            </Link>
            <Link to="/resources/professional-guides" title="Access training guides to improve your assessment scores">
              <Button variant="outline">
                Professional development guides
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}