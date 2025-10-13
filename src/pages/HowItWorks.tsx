import React from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  BookOpen,
  BarChart2,
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Brain,
  Puzzle,
  FileCheck,
  LayoutDashboard,
  GraduationCap,
  Mail
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';


export function HowItWorksPage() {
  const features = [
    {
      icon: FileCheck,
      title: 'Privacy Assessments',
      description: 'Role-specific assessments to evaluate your institution\'s compliance with FERPA, COPPA, GDPR, and more. Identify strengths and areas for improvement.',
      link: '/assessment'
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Access a library of downloadable templates, checklists, and guides to implement best practices and navigate complex regulations.',
      link: '/resources'
    },
    {
      icon: GraduationCap,
      title: 'Training Modules',
      description: 'Engage with interactive training content and learning paths for staff development on privacy, data protection, and digital citizenship.',
      link: '/training'
    },
    {
      icon: LayoutDashboard,
      title: 'Compliance Dashboard',
      description: 'Track your institution\'s overall compliance posture, monitor progress, and identify key risk areas with visual analytics and reporting tools.',
      link: '/dashboard'
    },
    {
      icon: Puzzle,
      title: 'Ecosystem Integration',
      description: 'Seamlessly connect with the broader ERMITS Resilience Operating System™ for advanced threat intelligence, vendor risk management, and strategic advisory.',
      link: '/integration'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Assessment & Discovery',
      description: 'Begin with role-specific assessments to identify compliance gaps and establish baseline understanding.',
      icon: Target,
      features: ['FERPA, COPPA, GDPR assessments', 'Role-based questionnaires', 'Automated gap analysis', 'Compliance scoring']
    },
    {
      step: 2,
      title: 'Learning & Development',
      description: 'Access tailored guidance modules and resources to build knowledge and implement best practices.',
      icon: Brain,
      features: ['Interactive guidance modules', 'Downloadable templates', 'Video tutorials', 'Certification programs']
    },
    {
      step: 3,
      title: 'Implementation & Action',
      description: 'Apply learned concepts with practical tools and resources for immediate implementation.',
      icon: Zap,
      features: ['Policy templates', 'Implementation checklists', 'Vendor assessment tools', 'Incident response plans']
    },
    {
      step: 4,
      title: 'Monitoring & Improvement',
      description: 'Track progress with dashboards and analytics to ensure ongoing compliance and continuous improvement.',
      icon: BarChart2,
      features: ['Real-time dashboards', 'Progress tracking', 'Compliance reporting', 'Performance analytics']
    }
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb />

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How EduSoluce™ Works
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            EduSoluce™ simplifies educational privacy compliance, empowering institutions to protect student data and build a culture of digital resilience.
          </p>
        </div>

        {/* Overview Section */}
      </div>
    
      {/* Full-width Overview Section - Light */}
      <section className="bg-gray-50 dark:bg-gray-950 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="mt-4">
                <Link to="/assessment" title="Start your privacy compliance assessment">
                  <Button variant="outline" size="sm">
                    Begin assessment
                  </Button>
                </Link>
              </div>
            <div className="flex flex-col items-center">
              <Lightbulb className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Assess & Identify</h3>
              <p className="text-muted-foreground">
                Start with role-specific assessments to pinpoint compliance gaps and areas needing attention.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Learn & Apply</h3>
              <div className="mt-4">
                <Link to="/training" title="Access professional development guides">
                  <Button variant="outline" size="sm">
                    Start training
                  </Button>
                </Link>
              </div>
              <p className="text-muted-foreground">
                Access tailored guidance modules and a rich resource library to build knowledge and skills.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <BarChart2 className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monitor & Improve</h3>
              <p className="text-muted-foreground">
                Utilize dashboards and reporting to track progress, ensure ongoing compliance, and foster continuous improvement.
              </p>
              <div className="mt-4">
                <Link to="/resources" title="Access implementation tools and templates">
                  <Button variant="outline" size="sm">
                    View resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Detailed Process Steps */}
      </div>
      
      {/* Step-by-Step Process - Full Width Section */}
      <section className="w-full bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Step-by-Step Process</h2>
        <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2">
                  <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full mr-4">
                        <step.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">Step {step.step}</div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full flex items-center justify-center">
                    <step.icon className="h-24 w-24 text-primary-400" />
                  </div>
                </div>
              </div>
            ))}
        </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Core Features Section */}
      </div>
    
      {/* Full-width Core Features Section */}
      <section className="w-full bg-gray-50 dark:bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg border p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <feature.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2 text-center">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 text-center">{feature.description}</p>
                <Link to={feature.link} className="block" title={`Learn more about ${feature.title}`}>
                  <Button variant="outline" className="w-full" aria-label={`Explore ${feature.title} features`}>
                    {feature.title === 'Privacy Assessments' ? 'Take an assessment' :
                     feature.title === 'Resource Library' ? 'Browse resources' :
                     feature.title === 'Training Modules' ? 'Start training' :
                     feature.title === 'Compliance Dashboard' ? 'View dashboard' :
                     `Explore ${feature.title}`
                    } <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    
   

      {/* Full-width CTA Section */}
      <section className="w-full bg-primary-600 dark:bg-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-6 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-3xl mx-auto">
            Join educational institutions that use EduSoluce™ to simplify compliance, protect student data, and build a culture of digital resilience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-medium bg-white/20 border-white/30 text-white hover:bg-white/30">
                Contact Us <Mail className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button size="lg" className="font-medium bg-white text-primary-600 hover:bg-gray-100">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        </section>
    </>
  );
}