import React from 'react';
import { Link } from 'react-router-dom';
import { exportService } from '../../services/exportService';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  X,
  Puzzle,
  CheckCircle,
  Clock,
  Calendar,
  Shield
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

export function ToolsTemplatesPage() {
  // State for filtering
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRegulations, setSelectedRegulations] = React.useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [selectedFileTypes, setSelectedFileTypes] = React.useState<string[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);

  // Mock templates data
  const templates = [
    {
      id: 'data-inventory-template',
      title: 'Student Data Inventory Template',
      description: 'Comprehensive spreadsheet for cataloging all student data collected and stored by your institution',
      fileType: 'XLSX',
      version: 'v2.3',
      updated: 'March 5, 2025',
      regulations: ['FERPA', 'GDPR'],
      roles: ['administrator', 'it-staff'],
      category: 'Data Management'
    },
    {
      id: 'privacy-policy-template',
      title: 'Educational Privacy Policy Template',
      description: 'Customizable privacy policy template for educational institutions',
      fileType: 'DOCX',
      version: 'v3.1',
      updated: 'February 10, 2025',
      regulations: ['FERPA', 'COPPA', 'GDPR'],
      roles: ['administrator'],
      category: 'Policy'
    },
    {
      id: 'vendor-assessment-tool',
      title: 'EdTech Vendor Assessment Tool',
      description: 'Interactive tool for evaluating third-party vendors\' privacy and security practices',
      fileType: 'PDF',
      version: 'v2.4',
      updated: 'January 22, 2025',
      regulations: ['FERPA', 'COPPA'],
      roles: ['administrator', 'it-staff'],
      category: 'Vendor Management'
    },
    {
      id: 'dpia-template',
      title: 'Data Protection Impact Assessment Template',
      description: 'Template for conducting DPIAs for new educational technology implementations',
      fileType: 'DOCX',
      version: 'v1.8',
      updated: 'March 18, 2025',
      regulations: ['GDPR'],
      roles: ['administrator', 'it-staff'],
      category: 'Assessment'
    },
    {
      id: 'consent-form-template',
      title: 'Parental Consent Form Templates',
      description: 'Collection of customizable consent forms for various educational activities',
      fileType: 'PDF',
      version: 'v2.0',
      updated: 'February 5, 2025',
      regulations: ['FERPA', 'COPPA'],
      roles: ['administrator', 'teacher'],
      category: 'Consent'
    },
    {
      id: 'incident-response-toolkit',
      title: 'Data Breach Response Toolkit',
      description: 'Comprehensive set of tools and templates for managing data breach incidents',
      fileType: 'ZIP',
      version: 'v1.5',
      updated: 'March 25, 2025',
      regulations: ['FERPA', 'GDPR'],
      roles: ['administrator', 'it-staff'],
      category: 'Incident Response'
    }
  ];

  // Filter resources based on search and filters
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchTerm === '' || 
                         template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegulations = selectedRegulations.length === 0 || 
                              template.regulations.some(reg => selectedRegulations.includes(reg));
    
    const matchesRoles = selectedRoles.length === 0 || 
                        template.roles.some(role => selectedRoles.includes(role));
    
    const matchesFileTypes = selectedFileTypes.length === 0 || 
                            selectedFileTypes.includes(template.fileType);
    
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

  // Mock download function
  const handleDownload = (templateId: string) => {
    // Map template IDs to resource types for download
    const templateTypeMap: Record<string, string> = {
      'data-inventory-template': 'data-inventory',
      'privacy-policy-template': 'privacy-policy',
      'vendor-assessment-tool': 'vendor-assessment',
      'dpia-template': 'vendor-assessment',
      'consent-form-template': 'consent-forms',
      'incident-response-toolkit': 'breach-response'
    };

    const resourceType = templateTypeMap[templateId] || 'ferpa-guide';
    
    try {
      exportService.generateSampleResource(resourceType as any);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tools & Templates</h1>
        <p className="text-muted-foreground">
          Download practical tools and customizable templates to implement privacy best practices
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
              />
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {(selectedRegulations.length > 0 || selectedRoles.length > 0 || selectedFileTypes.length > 0) && (
              <Badge variant="secondary" className="ml-1">
                {selectedRegulations.length + selectedRoles.length + selectedFileTypes.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-750 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Regulation Filter */}
              <div>
                <h3 className="font-medium text-sm mb-3">Regulations</h3>
                <div className="space-y-2">
                  {['FERPA', 'COPPA', 'GDPR', 'HIPAA', 'PPRA'].map((regulation) => (
                    <label key={regulation} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRegulations.includes(regulation)}
                        onChange={() => handleCheckboxChange(regulation, 'regulations')}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm">{regulation}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Roles Filter */}
              <div>
                <h3 className="font-medium text-sm mb-3">Roles</h3>
                <div className="space-y-2">
                  {[
                    { id: 'administrator', label: 'Administrator' },
                    { id: 'teacher', label: 'Teacher' },
                    { id: 'it-staff', label: 'IT Staff' },
                    { id: 'student', label: 'Student' }
                  ].map((role) => (
                    <label key={role.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role.id)}
                        onChange={() => handleCheckboxChange(role.id, 'roles')}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm">{role.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* File Types Filter */}
              <div>
                <h3 className="font-medium text-sm mb-3">File Types</h3>
                <div className="space-y-2">
                  {['PDF', 'DOCX', 'XLSX', 'PPT', 'ZIP'].map((fileType) => (
                    <label key={fileType} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFileTypes.includes(fileType)}
                        onChange={() => handleCheckboxChange(fileType, 'fileTypes')}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm">{fileType}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            {(selectedRegulations.length > 0 || selectedRoles.length > 0 || selectedFileTypes.length > 0 || searchTerm) && (
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Categories Quick Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Policy', 'Data Management', 'Consent', 'Vendor Management', 'Incident Response', 'Assessment'].map((category) => (
          <Button 
            key={category}
            variant="outline"
            size="sm"
            className={category === 'All' ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' : ''}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  {template.regulations.map((reg) => (
                    <Badge 
                      key={reg}
                      variant={reg.toLowerCase() as any}
                    >
                      {reg}
                    </Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {template.fileType}
                </span>
              </div>
              
              <h3 className="font-semibold mb-2">{template.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Updated: {template.updated}</span>
                </div>
                
                <Button
                  size="sm"
                  onClick={() => handleDownload(template.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Implementation Guide Section */}
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Implementation Guide</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">Step 1: Assessment</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Use our assessment tools to identify your current compliance status and determine which templates you need.
            </p>
            <Link to="/assessment">
              <Button variant="outline" size="sm" className="w-full">
                Start Assessment
              </Button>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold">Step 2: Customize</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Download and customize the templates to match your institution's specific policies and procedures.
            </p>
            <Button variant="outline" size="sm" className="w-full" disabled>
              Download Templates
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold">Step 3: Implement</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Roll out your customized privacy policies and procedures across your institution with proper training.
            </p>
            <Link to="/training">
              <Button variant="outline" size="sm" className="w-full">
                Training Resources
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Template Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Template Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Policy Templates</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Privacy policies</li>
              <li>• Data retention policies</li>
              <li>• Consent forms</li>
              <li>• Incident response plans</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Assessment Tools</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Vendor assessments</li>
              <li>• Risk evaluations</li>
              <li>• Compliance checklists</li>
              <li>• Audit templates</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-semibold mb-2 text-amber-600 dark:text-amber-400">Data Management</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Data inventories</li>
              <li>• Processing registers</li>
              <li>• Data mapping tools</li>
              <li>• Retention schedules</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h3 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Training Materials</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Staff training guides</li>
              <li>• Student handouts</li>
              <li>• Presentation templates</li>
              <li>• Quiz materials</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Custom Templates CTA */}
      <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg border p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
            <Puzzle className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Need Custom Templates?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We can create customized tools and templates to meet your institution's specific needs and compliance requirements.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contact" title="Request custom privacy compliance tools">
            <Button>
              Request custom tools
            </Button>
          </Link>
          <Link to="/training" title="Learn how to use privacy tools effectively">
            <Button variant="outline">
              Training on tools usage
            </Button>
          </Link>
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-3">
            Explore related resources to enhance your privacy program
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/resources/privacy-regulations" title="Learn about privacy regulations">
              <Button variant="outline" size="sm">
                Privacy regulations
              </Button>
            </Link>
            <Link to="/assessment" title="Assess your current compliance status">
              <Button variant="outline" size="sm">
                Compliance assessments
              </Button>
            </Link>
            <Link to="/privacy-policy" title="Access the privacy self-service portal">
              <Button variant="outline" size="sm">
                Privacy portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}