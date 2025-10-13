import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  Download, 
  ExternalLink, 
  ChevronRight,
  BookOpen,
  Clock,
  Info
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export function PrivacyRegulationsPage() {
  const regulations = [
    {
      id: 'ferpa',
      title: 'FERPA Resources',
      description: 'Family Educational Rights and Privacy Act compliance materials and guidance',
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      color: 'bg-blue-500',
      count: 12,
      link: '/resources/ferpa'
    },
    {
      id: 'coppa',
      title: 'COPPA Resources',
      description: 'Children\'s Online Privacy Protection Act compliance materials for protecting children under 13',
      icon: <Shield className="h-8 w-8 text-amber-500" />,
      color: 'bg-amber-500',
      count: 8,
      link: '/resources/coppa'
    },
    {
      id: 'gdpr',
      title: 'GDPR Resources',
      description: 'General Data Protection Regulation compliance materials for European data protection',
      icon: <Shield className="h-8 w-8 text-green-500" />,
      color: 'bg-green-500',
      count: 10,
      link: '/resources/gdpr'
    },
    {
      id: 'other',
      title: 'Other Privacy Regulations',
      description: 'Resources for additional privacy regulations including PPRA, HIPAA, and state-specific laws',
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      color: 'bg-purple-500',
      count: 15,
      link: '/resources'
    }
  ];

  const featuredResources = [
    {
      title: 'FERPA Compliance Guide',
      category: 'ferpa',
      description: 'Comprehensive guide to Family Educational Rights and Privacy Act requirements',
      type: 'PDF',
      updated: 'March 15, 2025',
      downloadLink: '#',
      featured: true
    },
    {
      title: 'COPPA Vendor Assessment Template',
      category: 'coppa',
      description: 'Template for evaluating educational technology vendors for COPPA compliance',
      type: 'DOCX',
      updated: 'February 8, 2025',
      downloadLink: '#',
      featured: true
    },
    {
      title: 'GDPR Data Subject Rights Flowchart',
      category: 'gdpr',
      description: 'Visual guide to managing data subject rights requests under GDPR',
      type: 'PDF',
      updated: 'January 22, 2025',
      downloadLink: '#',
      featured: true
    }
  ];

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Privacy Regulations</h1>
        <p className="text-muted-foreground">
          Access comprehensive resources to help your institution comply with educational privacy regulations
        </p>
      </div>

      {/* Regulations Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {regulations.map((regulation) => (
          <Link 
            key={regulation.id} 
            to={regulation.link}
            className="bg-white dark:bg-gray-800 rounded-lg border hover:shadow-md transition-shadow p-6 flex items-start gap-4"
          >
            <div className={`p-4 ${regulation.color} bg-opacity-10 dark:bg-opacity-20 rounded-lg`}>
              {regulation.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{regulation.title}</h3>
                <Badge variant="outline">{regulation.count} resources</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{regulation.description}</p>
              <div className="flex justify-end">
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Resources */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Featured Privacy Resources</h2>
          <Link to="/resources">
            <Button variant="outline" size="sm">
              View All Resources
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredResources.map((resource, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant={resource.category as 'ferpa' | 'coppa' | 'gdpr' | 'general'}>
                  {resource.category.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {resource.type}
                </span>
              </div>
              
              <h3 className="font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Updated: {resource.updated}</span>
                </div>
                
                <a href={resource.downloadLink}>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reference Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Quick Reference</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">FERPA Basics</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Protects student education records</li>
              <li>• Applies to all educational institutions</li>
              <li>• Requires written consent for disclosure</li>
              <li>• Directory information exceptions</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-semibold mb-2 text-amber-600 dark:text-amber-400">COPPA Essentials</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Protects children under 13</li>
              <li>• Requires parental consent</li>
              <li>• Applies to online services</li>
              <li>• Safe harbor programs available</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">GDPR Key Points</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Applies to EU data subjects</li>
              <li>• Requires lawful basis for processing</li>
              <li>• Data subject rights must be honored</li>
              <li>• Data Protection Impact Assessments</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Other Regulations</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• HIPAA for health information</li>
              <li>• PPRA for surveys and assessments</li>
              <li>• State-specific privacy laws</li>
              <li>• International regulations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance Guidance */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-800/40 rounded-full mt-1">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Need Personalized Compliance Guidance?</h2>
            <p className="text-muted-foreground mb-4">
              Our privacy assessment tools can help you identify gaps in your compliance program and provide targeted resources.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/assessment" title="Take privacy assessments to identify compliance gaps">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Take privacy assessment
                </Button>
              </Link>
              <Link to="/resources/professional-guides" title="Access interactive training guides">
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Professional development guides
                </Button>
              </Link>
              <Link to="/privacy-policy" title="Access the privacy self-service portal">
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Updates Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Recent Updates & News</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">March 2025</Badge>
              <span className="text-xs text-muted-foreground">Regulatory Update</span>
            </div>
            <h3 className="font-semibold mb-2">New FERPA Guidance on AI and Machine Learning</h3>
            <p className="text-sm text-muted-foreground mb-3">
              The Department of Education has released updated guidance on how FERPA applies to artificial intelligence and machine learning systems in educational settings.
            </p>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="text-xs">February 2025</Badge>
              <span className="text-xs text-muted-foreground">Best Practice</span>
            </div>
            <h3 className="font-semibold mb-2">COPPA Compliance Checklist Updated</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Our comprehensive COPPA compliance checklist has been updated to include new requirements and best practices for 2025.
            </p>
            <Button variant="outline" size="sm">
              View Checklist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}