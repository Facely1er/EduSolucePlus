import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Users,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  audience: string[];
  regulations: string[];
  frequency: 'monthly' | 'quarterly' | 'annual' | 'on-demand';
}

export function ComplianceReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [reportPeriod, setReportPeriod] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'executive-summary',
      name: 'Executive Privacy Summary',
      description: 'High-level privacy compliance overview for leadership',
      sections: [
        'Compliance Score Dashboard',
        'Risk Assessment Summary', 
        'Key Performance Indicators',
        'Strategic Recommendations',
        'Budget and Resource Planning'
      ],
      audience: ['CEO', 'Board of Directors', 'Superintendent'],
      regulations: ['FERPA', 'COPPA', 'CCPA', 'GDPR'],
      frequency: 'quarterly'
    },
    {
      id: 'regulatory-compliance',
      name: 'Regulatory Compliance Report',
      description: 'Detailed compliance status across all applicable regulations',
      sections: [
        'Regulation-by-Regulation Analysis',
        'Compliance Obligation Status',
        'Gap Analysis and Remediation',
        'Audit Trail and Evidence',
        'Upcoming Deadlines and Requirements'
      ],
      audience: ['Privacy Officer', 'Compliance Team', 'Legal Counsel'],
      regulations: ['FERPA', 'COPPA', 'CCPA', 'GDPR', 'BIPA', 'SHIELD'],
      frequency: 'monthly'
    },
    {
      id: 'data-rights-summary',
      name: 'Data Rights Activity Report',
      description: 'Summary of data subject rights requests and resolutions',
      sections: [
        'Request Volume and Types',
        'Response Time Analysis',
        'Resolution Outcomes',
        'Stakeholder Satisfaction',
        'Process Improvement Opportunities'
      ],
      audience: ['Privacy Officer', 'Student Services', 'Legal Team'],
      regulations: ['FERPA', 'CCPA', 'GDPR'],
      frequency: 'monthly'
    },
    {
      id: 'vendor-risk-assessment',
      name: 'Vendor Privacy Risk Assessment',
      description: 'Analysis of third-party vendor privacy and security risks',
      sections: [
        'Vendor Risk Distribution',
        'High-Risk Vendor Analysis',
        'Compliance Assessment Results',
        'Contract Review Status',
        'Remediation Action Plans'
      ],
      audience: ['IT Director', 'Procurement', 'Privacy Officer'],
      regulations: ['FERPA', 'COPPA', 'CCPA'],
      frequency: 'quarterly'
    },
    {
      id: 'incident-analysis',
      name: 'Privacy Incident Analysis',
      description: 'Comprehensive analysis of privacy incidents and response effectiveness',
      sections: [
        'Incident Trends and Patterns',
        'Root Cause Analysis',
        'Response Effectiveness',
        'Lessons Learned',
        'Prevention Strategy Updates'
      ],
      audience: ['Privacy Officer', 'IT Security', 'Legal Team'],
      regulations: ['FERPA', 'CCPA', 'GDPR', 'SHIELD'],
      frequency: 'quarterly'
    },
    {
      id: 'training-effectiveness',
      name: 'Privacy Training Effectiveness Report',
      description: 'Analysis of privacy training program effectiveness and outcomes',
      sections: [
        'Training Completion Rates',
        'Competency Assessment Results',
        'Behavioral Change Indicators',
        'Cost-Benefit Analysis',
        'Program Enhancement Recommendations'
      ],
      audience: ['HR Director', 'Training Coordinator', 'Privacy Officer'],
      regulations: ['FERPA', 'COPPA', 'General'],
      frequency: 'annual'
    },
    {
      id: 'board-governance',
      name: 'Board Governance Report',
      description: 'Privacy governance overview for board and oversight committees',
      sections: [
        'Privacy Program Maturity',
        'Strategic Risk Assessment',
        'Regulatory Environment Updates',
        'Resource Allocation Analysis',
        'Competitive Benchmarking'
      ],
      audience: ['Board of Directors', 'Audit Committee', 'Executive Leadership'],
      regulations: ['All Applicable'],
      frequency: 'annual'
    }
  ];

  const regulations = [
    'FERPA', 'COPPA', 'CCPA', 'CPRA', 'GDPR', 'BIPA', 'SHIELD', 'SOPIPA', 'VCDPA', 'PIPEDA'
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    
    // In production, this would generate and download the actual report
    alert('Report generated successfully! Download would begin in production.');
  };

  const selectedTemplateData = reportTemplates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Compliance Report Generator</h2>
          <p className="text-muted-foreground">Generate comprehensive privacy compliance reports</p>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Select Report Template</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`text-left p-4 border rounded-lg transition-colors ${
                selectedTemplate === template.id
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h4 className="font-medium">{template.name}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Users className="h-3 w-3" />
                  <span>For: {template.audience.slice(0, 2).join(', ')}{template.audience.length > 2 ? '...' : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3" />
                  <span className="capitalize">{template.frequency}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Report Configuration */}
      {selectedTemplateData && (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Configure Report</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Report Period</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={reportPeriod.startDate}
                  onChange={(e) => setReportPeriod(prev => ({ ...prev, startDate: e.target.value }))}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                />
                <input
                  type="date"
                  value={reportPeriod.endDate}
                  onChange={(e) => setReportPeriod(prev => ({ ...prev, endDate: e.target.value }))}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Include Regulations</label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {regulations.map((reg) => (
                  <label key={reg} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedRegulations.includes(reg)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRegulations(prev => [...prev, reg]);
                        } else {
                          setSelectedRegulations(prev => prev.filter(r => r !== reg));
                        }
                      }}
                      className="rounded border-gray-300 text-primary"
                    />
                    <span className="text-sm">{reg}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Template Details */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Report Sections</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedTemplateData.sections.map((section, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{section}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Preview Report
            </Button>
            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating || !reportPeriod.startDate || !reportPeriod.endDate}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Recent Reports */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'Q4 2024 Executive Summary', generated: '2025-01-02', type: 'executive-summary' },
            { name: 'December 2024 Compliance Report', generated: '2025-01-01', type: 'regulatory-compliance' },
            { name: 'Vendor Risk Assessment Q4', generated: '2024-12-30', type: 'vendor-risk-assessment' }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium text-sm">{report.name}</h4>
                <p className="text-xs text-muted-foreground">Generated: {report.generated}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="general" className="text-xs">PDF</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}