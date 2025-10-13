import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, FileText, Calendar, BookOpen, Search, X, RefreshCw } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { exportService } from '../services/exportService';
import { useNotifications, createNotification } from '../contexts/NotificationContext';

interface Resource {
  id: string;
  title: string;
  description: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  version: string;
  updated: string;
  regulations: ('FERPA' | 'COPPA' | 'GDPR' | 'HIPAA' | 'PPRA' | 'General')[];
  roles?: ('administrator' | 'teacher' | 'it-staff' | 'student' | 'general')[];
  color: string;
}

export function ResourcesPage() {
  const { type } = useParams<{ type?: string }>();
  
  // State for filtering
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRegulations, setSelectedRegulations] = React.useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [selectedFileTypes, setSelectedFileTypes] = React.useState<string[]>([]);
  const { addNotification } = useNotifications();
  const [isDownloading, setIsDownloading] = useState(false);

  // All resources data
  const ferpaResources: Resource[] = [
    {
      id: 'ferpa-1',
      title: 'FERPA Consent Template',
      description: 'Customizable template for obtaining parental consent for disclosure of educational records',
      fileType: 'PDF',
      version: 'v2.1',
      updated: 'March 15, 2025',
      regulations: ['FERPA'],
      roles: ['administrator', 'teacher'],
      color: 'bg-blue-500'
    },
    {
      id: 'ferpa-2',
      title: 'FERPA Parent Notification Letter',
      description: 'Template for annual FERPA notifications required to be sent to parents/students',
      fileType: 'DOCX',
      version: 'v1.2',
      updated: 'January 15, 2025',
      regulations: ['FERPA'],
      roles: ['administrator', 'teacher'],
      color: 'bg-blue-500'
    },
    {
      id: 'ferpa-3',
      title: 'Student Data Inventory Template',
      description: 'Spreadsheet template for cataloging all student data collected and stored',
      fileType: 'XLSX',
      version: 'v1.8',
      updated: 'March 5, 2025',
      regulations: ['FERPA'],
      roles: ['administrator', 'it-staff'],
      color: 'bg-blue-500'
    },
    {
      id: 'ferpa-4',
      title: 'EdTech Vendor Assessment',
      description: 'Questionnaire for evaluating third-party vendors\' data privacy practices',
      fileType: 'PDF',
      version: 'v2.3',
      updated: 'April 12, 2025',
      regulations: ['FERPA'],
      roles: ['administrator', 'it-staff'],
      color: 'bg-blue-500'
    },
    {
      id: 'ferpa-5',
      title: 'Data Breach Response Plan',
      description: 'Template and guidelines for creating a comprehensive data breach response plan',
      fileType: 'DOCX',
      version: 'v2.0',
      updated: 'February 10, 2025',
      regulations: ['FERPA'],
      roles: ['administrator', 'it-staff'],
      color: 'bg-blue-500'
    },
    {
      id: 'ferpa-6',
      title: 'Student Privacy Rights Guide',
      description: 'Student-friendly guide explaining their rights under FERPA',
      fileType: 'PDF',
      version: 'v1.0',
      updated: 'February 28, 2025',
      regulations: ['FERPA'],
      roles: ['student', 'teacher'],
      color: 'bg-blue-500'
    }
  ];

  const coppaResources: Resource[] = [
    {
      id: 'coppa-1',
      title: 'COPPA Compliance Checklist',
      description: 'Step-by-step checklist for ensuring compliance with COPPA requirements',
      fileType: 'PDF',
      version: 'v1.5',
      updated: 'January 20, 2025',
      regulations: ['COPPA'],
      roles: ['administrator', 'teacher'],
      color: 'bg-amber-500'
    },
    {
      id: 'coppa-2',
      title: 'COPPA Parent Permission Form',
      description: 'Template for obtaining parental consent for online services used by students under 13',
      fileType: 'PDF',
      version: 'v2.5',
      updated: 'April 5, 2025',
      regulations: ['COPPA'],
      roles: ['administrator', 'teacher'],
      color: 'bg-amber-500'
    },
    {
      id: 'coppa-3',
      title: 'Age Verification Procedures',
      description: 'Guidelines for implementing age verification systems in educational technology',
      fileType: 'DOCX',
      version: 'v1.3',
      updated: 'March 18, 2025',
      regulations: ['COPPA'],
      roles: ['administrator', 'it-staff'],
      color: 'bg-amber-500'
    },
    {
      id: 'coppa-4',
      title: 'COPPA Safe Harbor Guidelines',
      description: 'Best practices for implementing safe harbor provisions under COPPA',
      fileType: 'PDF',
      version: 'v1.7',
      updated: 'February 22, 2025',
      regulations: ['COPPA'],
      roles: ['administrator'],
      color: 'bg-amber-500'
    },
    {
      id: 'coppa-5',
      title: 'Data Collection Audit Template',
      description: 'Spreadsheet for auditing data collection practices for children under 13',
      fileType: 'XLSX',
      version: 'v2.1',
      updated: 'March 30, 2025',
      regulations: ['COPPA'],
      roles: ['administrator', 'it-staff'],
      color: 'bg-amber-500'
    },
    {
      id: 'coppa-6',
      title: 'Parent Notification Scripts',
      description: 'Templates for communicating with parents about COPPA compliance',
      fileType: 'DOCX',
      version: 'v1.9',
      updated: 'April 8, 2025',
      regulations: ['COPPA'],
      roles: ['teacher'],
      color: 'bg-amber-500'
    }
  ];

  const gdprResources: Resource[] = [
    {
      id: 'gdpr-1',
      title: 'GDPR School Privacy Policy',
      description: 'Comprehensive privacy policy template compliant with GDPR requirements',
      fileType: 'DOCX',
      version: 'v3.2',
      updated: 'April 2, 2025',
      regulations: ['GDPR'],
      roles: ['administrator'],
      color: 'bg-green-500'
    },
    {
      id: 'gdpr-2',
      title: 'Data Retention Policy Template',
      description: 'Template for creating a comprehensive data retention policy',
      fileType: 'DOCX',
      version: 'v1.7',
      updated: 'March 25, 2025',
      regulations: ['GDPR'],
      roles: ['administrator', 'it-staff'],
      color: 'bg-green-500'
    },
    {
      id: 'gdpr-3',
      title: 'GDPR Consent Forms',
      description: 'Templates for obtaining valid consent under GDPR requirements',
      fileType: 'PDF',
      version: 'v2.4',
      updated: 'April 15, 2025',
      regulations: ['GDPR'],
      roles: ['administrator', 'teacher'],
      color: 'bg-green-500'
    },
    {
      id: 'gdpr-4',
      title: 'Data Processing Register',
      description: 'Spreadsheet for maintaining records of processing activities',
      fileType: 'XLSX',
      version: 'v1.6',
      updated: 'March 12, 2025',
      regulations: ['GDPR'],
      roles: ['administrator', 'it-staff'],
      color: 'bg-green-500'
    },
    {
      id: 'gdpr-5',
      title: 'Data Subject Rights Procedures',
      description: 'Guidelines for handling data subject requests under GDPR',
      fileType: 'DOCX',
      version: 'v2.1',
      updated: 'February 18, 2025',
      regulations: ['GDPR'],
      roles: ['administrator'],
      color: 'bg-green-500'
    },
    {
      id: 'gdpr-6',
      title: 'GDPR Impact Assessment Template',
      description: 'Template for conducting Data Protection Impact Assessments',
      fileType: 'PDF',
      version: 'v1.8',
      updated: 'April 20, 2025',
      regulations: ['GDPR'],
      roles: ['administrator', 'it-staff'],
      color: 'bg-green-500'
    }
  ];

  // Additional resources with HIPAA and PPRA
  const additionalResources: Resource[] = [
    {
      id: 'hipaa-1',
      title: 'HIPAA Privacy Notice Template',
      description: 'Template for healthcare privacy notices in educational settings',
      fileType: 'PDF',
      version: 'v1.0',
      updated: 'March 1, 2025',
      regulations: ['HIPAA'],
      roles: ['administrator'],
      color: 'bg-pink-500'
    },
    {
      id: 'ppra-1',
      title: 'PPRA Parent Notification Form',
      description: 'Template for notifying parents about student surveys and assessments',
      fileType: 'DOCX',
      version: 'v2.0',
      updated: 'February 15, 2025',
      regulations: ['PPRA'],
      roles: ['administrator', 'teacher'],
      color: 'bg-indigo-500'
    }
  ];

  // Combine all resources
  const allResources = [...ferpaResources, ...coppaResources, ...gdprResources, ...additionalResources];

  // Determine current resources based on type parameter
  const getCurrentResources = () => {
    switch (type) {
      case 'ferpa':
        return ferpaResources;
      case 'coppa':
        return coppaResources;
      case 'gdpr':
        return gdprResources;
      default:
        return allResources;
    }
  };

  const currentResources = getCurrentResources();

  // Filter resources based on search and filters
  const filteredResources = currentResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegulations = selectedRegulations.length === 0 || 
                              resource.regulations.some(reg => selectedRegulations.includes(reg));
    
    const matchesRoles = selectedRoles.length === 0 || 
                        (resource.roles && resource.roles.some(role => selectedRoles.includes(role)));
    
    const matchesFileTypes = selectedFileTypes.length === 0 || 
                            selectedFileTypes.includes(resource.fileType);
    
    return matchesSearch && matchesRegulations && matchesRoles && matchesFileTypes;
  });

  // Handle checkbox changes
  const handleCheckboxChange = (value: string, type: 'regulations' | 'roles' | 'fileTypes') => {
    const setters = {
      regulations: setSelectedRegulations,
      roles: setSelectedRoles,
      fileTypes: setSelectedFileTypes
    };
    
    const getters = {
      regulations: selectedRegulations,
      roles: selectedRoles,
      fileTypes: selectedFileTypes
    };
    
    const currentValues = getters[type];
    const setter = setters[type];
    
    if (currentValues.includes(value)) {
      setter(currentValues.filter(item => item !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRegulations([]);
    setSelectedRoles([]);
    setSelectedFileTypes([]);
  };

  const handleDownload = async (resourceId: string) => {
    setIsDownloading(true);
    try {
      // Map resource IDs to sample resource types
      const resourceTypeMap: Record<string, string> = {
        'ferpa-1': 'consent-forms',
        'ferpa-2': 'ferpa-guide',
        'ferpa-3': 'data-inventory',
        'ferpa-4': 'vendor-assessment',
        'ferpa-5': 'incident-response',
        'ferpa-6': 'ferpa-guide',
        'coppa-1': 'coppa-checklist',
        'coppa-2': 'consent-forms',
        'coppa-3': 'coppa-checklist',
        'coppa-4': 'coppa-checklist',
        'coppa-5': 'data-inventory',
        'coppa-6': 'training-materials',
        'gdpr-1': 'privacy-policy',
        'gdpr-2': 'privacy-policy',
        'gdpr-3': 'consent-forms',
        'gdpr-4': 'data-inventory',
        'gdpr-5': 'privacy-policy',
        'gdpr-6': 'vendor-assessment',
        'hipaa-1': 'training-materials',
        'ppra-1': 'consent-forms'
      };
      
      const resourceType = resourceTypeMap[resourceId] || 'ferpa-guide';
      await exportService.generateSampleResource(resourceType as 'ferpa-guide' | 'coppa-guide' | 'ccpa-guide' | 'gdpr-guide' | 'hipaa-guide' | 'template' | 'checklist' | 'policy');
      
      addNotification(createNotification.systemUpdate(
        `Resource ${resourceId} has been downloaded`,
        '/resources'
      ));
    } catch (error) {
      console.error('Download failed:', error);
      addNotification({
        type: 'error',
        title: 'Download Failed',
        message: 'There was an error downloading the resource',
        timestamp: Date.now(),
        read: false,
        category: 'system'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`${resource.color} p-3 rounded-lg flex-shrink-0`}>
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-foreground">{resource.title}</h3>
            <div className="flex items-center gap-2 ml-4">
              <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {resource.fileType}
              </span>
              <span className="text-xs text-muted-foreground">{resource.version}</span>
            </div>
          </div>
          <p className="text-muted-foreground mb-3">{resource.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {resource.regulations.map((reg) => (
              <Badge 
                key={reg} 
                variant={reg.toLowerCase() as 'default' | 'secondary' | 'destructive' | 'outline'}
              >
                {reg}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Calendar className="h-3 w-3" />
              <span>Updated: {resource.updated}</span>
            </div>
            <Button
              onClick={() => handleDownload(resource.id)}
              size="sm"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isDownloading ? 'Downloading...' : 'Download Resource'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const getPageTitle = () => {
    switch (type) {
      case 'ferpa':
        return 'FERPA Resources';
      case 'coppa':
        return 'COPPA Resources';
      case 'gdpr':
        return 'GDPR Resources';
      default:
        return 'Resource Library';
    }
  };

  const getPageDescription = () => {
    switch (type) {
      case 'ferpa':
        return 'Family Educational Rights and Privacy Act compliance materials and guidance';
      case 'coppa':
        return 'Children\'s Online Privacy Protection Act compliance materials for protecting children under 13';
      case 'gdpr':
        return 'General Data Protection Regulation compliance materials for European data protection';
      default:
        return 'Access comprehensive templates, guides, and tools to support your educational compliance efforts';
    }
  };

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Resource Categories */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Resource Categories
              </h3>
              <nav className="space-y-2">
                <Link
                  to="/resources"
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    !type 
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  All Resources
                </Link>
                <Link
                  to="/resources/ferpa"
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    type === 'ferpa' 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    FERPA
                  </div>
                </Link>
                <Link
                  to="/resources/coppa"
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    type === 'coppa' 
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    COPPA
                  </div>
                </Link>
                <Link
                  to="/resources/gdpr"
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    type === 'gdpr' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    GDPR
                  </div>
                </Link>
              </nav>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-4">Search Resources</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                {(selectedRegulations.length > 0 || selectedRoles.length > 0 || selectedFileTypes.length > 0) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* Regulations Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-3">Regulations</h4>
                <div className="space-y-2">
                  {['FERPA', 'COPPA', 'GDPR', 'HIPAA', 'PPRA'].map((regulation) => (
                    <label key={regulation} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRegulations.includes(regulation)}
                        onChange={() => handleCheckboxChange(regulation, 'regulations')}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm">{regulation}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Roles Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-3">Roles</h4>
                <div className="space-y-2">
                  {['administrator', 'teacher', 'it-staff', 'student'].map((role) => (
                    <label key={role} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleCheckboxChange(role, 'roles')}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm capitalize">{role.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* File Types Filter */}
              <div>
                <h4 className="font-medium text-sm mb-3">File Types</h4>
                <div className="space-y-2">
                  {['PDF', 'DOCX', 'XLSX'].map((fileType) => (
                    <label key={fileType} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFileTypes.includes(fileType)}
                        onChange={() => handleCheckboxChange(fileType, 'fileTypes')}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm">{fileType}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedRegulations.length > 0 || selectedRoles.length > 0 || selectedFileTypes.length > 0) && (
              <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">Active Filters</h3>
                <div className="space-y-2">
                  {selectedRegulations.map((regulation) => (
                    <div key={regulation} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                      <span className="text-sm">{regulation}</span>
                      <button
                        onClick={() => handleCheckboxChange(regulation, 'regulations')}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedRoles.map((role) => (
                    <div key={role} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                      <span className="text-sm capitalize">{role.replace('-', ' ')}</span>
                      <button
                        onClick={() => handleCheckboxChange(role, 'roles')}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {selectedFileTypes.map((fileType) => (
                    <div key={fileType} className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                      <span className="text-sm">{fileType}</span>
                      <button
                        onClick={() => handleCheckboxChange(fileType, 'fileTypes')}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Resources */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Related Resources
              </h3>
              <nav className="space-y-2">
                <Link to="/resources/privacy-regulations" className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800">
                  Privacy Regulations
                </Link>
                <Link to="/resources/professional-guides" className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800">
                  Professional Guides
                </Link>
                <Link to="/resources/tools-templates" className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800">
                  Tools & Templates
                </Link>
                <Link to="/calendar" className="block px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800">
                  Compliance Calendar
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
            <p className="text-muted-foreground">{getPageDescription()}</p>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredResources.length} of {currentResources.length} resources
              {searchTerm && ` for "${searchTerm}"`}
            </p>
            {filteredResources.length > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                💡 Tip: Click on any resource to download it instantly. All resources are regularly updated to reflect the latest compliance requirements.
              </div>
            )}
          </div>

          {/* Quick Start Guide */}
          {!type && filteredResources.length > 0 && (
            <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Getting Started with Privacy Resources
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">1. Identify Your Needs</h4>
                  <p className="text-muted-foreground">Use the filters to find resources specific to your role and regulations.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">2. Download Templates</h4>
                  <p className="text-muted-foreground">Click the download button to get customizable templates and guides.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">3. Customize & Implement</h4>
                  <p className="text-muted-foreground">Adapt the resources to your institution's specific requirements.</p>
                </div>
              </div>
            </div>
          )}

          {/* Resources Grid */}
          <div className="space-y-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  onClick={handleClearFilters}
                  variant="outline"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}