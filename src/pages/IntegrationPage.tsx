import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { 
  Puzzle, 
  Database, 
  Shield, 
  Users, 
  BookOpen, 
  BarChart3, 
  Zap,
  ArrowRight,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export function IntegrationPage() {
  const integrationFeatures = [
    {
      title: 'ERMITS Ecosystem',
      description: 'Seamless integration with ERMITS compliance and risk management platform',
      icon: Database,
      features: ['Single sign-on', 'Data synchronization', 'Unified reporting'],
      status: 'active'
    },
    {
      title: 'Privacy Management',
      description: 'Advanced privacy controls and data protection features',
      icon: Shield,
      features: ['GDPR compliance', 'Data rights management', 'Consent tracking'],
      status: 'active'
    },
    {
      title: 'Assessment Tools',
      description: 'Comprehensive assessment and evaluation capabilities',
      icon: BookOpen,
      features: ['Role-based assessments', 'Progress tracking', 'Certification'],
      status: 'active'
    },
    {
      title: 'Analytics & Reporting',
      description: 'Powerful insights and compliance reporting',
      icon: BarChart3,
      features: ['Real-time dashboards', 'Custom reports', 'Trend analysis'],
      status: 'coming-soon'
    }
  ];

  const upcomingIntegrations = [
    {
      name: 'Microsoft 365',
      description: 'Direct integration with Office applications and Teams',
      status: 'in-development'
    },
    {
      name: 'Google Workspace',
      description: 'Seamless Google Drive and Classroom integration',
      status: 'planned'
    },
    {
      name: 'Canvas LMS',
      description: 'Learning management system integration',
      status: 'planned'
    }
  ];

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Integration Hub</h1>
        <p className="text-muted-foreground">
          Connect EduSoluce™ with your existing tools and platforms for seamless compliance management
        </p>
      </div>

      {/* Current Integrations */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Integrations</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {integrationFeatures.map((integration) => (
            <div key={integration.title} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <integration.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{integration.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      integration.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                    }`}>
                      {integration.status === 'active' ? 'Active' : 'Coming Soon'}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{integration.description}</p>
                  <ul className="space-y-1">
                    {integration.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ERMITS Integration Details */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
        <h2 className="text-2xl font-semibold mb-4">ERMITS Ecosystem Integration</h2>
        <p className="text-muted-foreground mb-4">
          EduSoluce™ is built on the ERMITS platform, providing enterprise-grade compliance and risk management capabilities.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg inline-block mb-2">
              <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold">Unified Data</h4>
            <p className="text-sm text-muted-foreground">Single source of truth for all compliance data</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg inline-block mb-2">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold">Security First</h4>
            <p className="text-sm text-muted-foreground">Enterprise-grade security and encryption</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg inline-block mb-2">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold">Real-time Sync</h4>
            <p className="text-sm text-muted-foreground">Instant updates across all connected systems</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link to="/dashboard">
              <ArrowRight className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/how-it-works">
              Learn More
            </Link>
          </Button>
        </div>
      </div>

      {/* Upcoming Integrations */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Integrations</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {upcomingIntegrations.map((integration) => (
            <div key={integration.name} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{integration.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  integration.status === 'in-development' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                }`}>
                  {integration.status === 'in-development' ? 'In Development' : 'Planned'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
              <Button variant="outline" size="sm" disabled>
                {integration.status === 'in-development' ? 'Coming Soon' : 'Planned'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Resources */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
        <h2 className="text-2xl font-semibold mb-4">Integration Resources</h2>
        <p className="text-muted-foreground mb-4">
          Get help with integrations and learn how to maximize the value of EduSoluce™ in your environment.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link to="/training" title="Learn about integrations">
            <Button variant="outline" size="sm" className="w-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Training Modules
            </Button>
          </Link>
          <Link to="/resources/tools-templates" title="Integration templates and tools">
            <Button variant="outline" size="sm" className="w-full">
              <Puzzle className="h-4 w-4 mr-2" />
              Tools & Templates
            </Button>
          </Link>
          <Link to="/contact" title="Get integration support">
            <Button variant="outline" size="sm" className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Support
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            API Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}