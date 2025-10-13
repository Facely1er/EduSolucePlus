import React from 'react';
import { Shield, Users, Laptop, Book, CheckCircle, Info } from 'lucide-react';
import { Button } from '../ui/Button';

interface RoleDetailCardProps {
  roleType: 'administrator' | 'teacher' | 'it-staff' | 'student';
  className?: string;
}

export function RoleDetailCard({ roleType, className = '' }: RoleDetailCardProps) {
  // Role information data
  const roleData = {
    administrator: {
      title: 'Administrator Role',
      icon: Shield,
      description: 'For principals, superintendents, and educational leadership responsible for institution-wide compliance and governance.',
      responsibilities: [
        'Overall compliance management',
        'Policy development and implementation',
        'Staff training and oversight',
        'Resource allocation for privacy initiatives',
        'Reporting to stakeholders and regulators'
      ],
      benefits: [
        'Comprehensive compliance dashboard',
        'Policy templates and frameworks',
        'Compliance calendar with important deadlines',
        'Staff training management tools',
        'Institutional risk assessment'
      ]
    },
    teacher: {
      title: 'Teacher Role',
      icon: Users,
      description: 'For classroom educators who handle student information and need to understand privacy best practices in educational settings.',
      responsibilities: [
        'Protecting student information in the classroom',
        'Evaluating educational technology for privacy',
        'Communicating with parents about student data',
        'Teaching digital citizenship to students',
        'Implementing classroom-level privacy practices'
      ],
      benefits: [
        'Classroom privacy best practices',
        'EdTech evaluation guides',
        'Parent communication templates',
        'Lesson plans on digital citizenship',
        'Student data handling procedures'
      ]
    },
    'it-staff': {
      title: 'IT Staff Role',
      icon: Laptop,
      description: 'For technology coordinators and IT personnel who manage systems, data security, and technical infrastructure.',
      responsibilities: [
        'Securing educational technology systems',
        'Managing user access and permissions',
        'Evaluating vendor security practices',
        'Implementing technical safeguards',
        'Responding to security incidents'
      ],
      benefits: [
        'Security configuration guides',
        'Vendor security assessment tools',
        'Data breach response procedures',
        'Technical compliance checklists',
        'System security dashboards'
      ]
    },
    student: {
      title: 'Student Role',
      icon: Book,
      description: 'For students learning about digital privacy, their rights, and how to protect their information online.',
      responsibilities: [
        'Understanding personal privacy rights',
        'Managing digital footprint and online presence',
        'Protecting personal information online',
        'Practicing good digital citizenship',
        'Recognizing privacy risks and threats'
      ],
      benefits: [
        'Interactive privacy lessons',
        'Digital footprint management tools',
        'Social media privacy guides',
        'Privacy rights explanations',
        'Online safety resources'
      ]
    }
  };

  const roleInfo = roleData[roleType];
  const Icon = roleInfo.icon;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border shadow-sm ${className}`}>
      <div className="p-6 border-b flex items-center gap-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold">{roleInfo.title}</h3>
      </div>
      
      <div className="p-6">
        <p className="text-muted-foreground mb-6">{roleInfo.description}</p>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium">Key Responsibilities</h4>
          </div>
          <ul className="space-y-2 ml-7">
            {roleInfo.responsibilities.map((item, index) => (
              <li key={`resp-${index}`} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-medium">Platform Benefits</h4>
          </div>
          <ul className="space-y-2 ml-7">
            {roleInfo.benefits.map((item, index) => (
              <li key={`ben-${index}`} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <Button size="sm" variant="outline" className="w-full">
          Learn more about this role
        </Button>
      </div>
    </div>
  );
}