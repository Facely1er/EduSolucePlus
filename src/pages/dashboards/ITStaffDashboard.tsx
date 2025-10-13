import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, 
  Shield, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Laptop,
  Database,
  Lock,
  HardDrive,
  Activity,
  Zap,
  Calendar,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  getUpcomingDeadlines
} from '../../data/business_regulatory_calendar';
import { ResetDemoDataSection } from '../../components/common/ResetDemoDataSection';

export function ITStaffDashboard() {
  // Mock data for IT staff dashboard
  const systemSecurity = 89;
  const activeVulnerabilities = 3;
  const dataBackupStatus = 98;
  const networkUptime = 99.8;
  const pendingUpdates = 7;

  // Get compliance events relevant to IT staff
  const itRoles = [
    'IT Director', 'IT Security', 'Chief Information Security Officer', 'Privacy Officer',
    'Emergency Coordinator', 'Communications Director', 'Records Manager', 'Technology Committee',
    'Incident Response Team', 'IT Staff', 'All Staff', 'Administrators', 'Data Privacy Officer',
    'Procurement Officer', 'ADA Coordinator'
  ];

  const itComplianceEvents = getUpcomingDeadlines(120).filter(event => 
    event.applicableToRoles.some(role => itRoles.includes(role))
  ).slice(0, 5);

  const securityMetrics = [
    { name: 'Firewall Status', status: 'active', lastCheck: '2 hours ago' },
    { name: 'Antivirus Protection', status: 'active', lastCheck: '1 hour ago' },
    { name: 'Data Encryption', status: 'active', lastCheck: '30 minutes ago' },
    { name: 'Access Controls', status: 'warning', lastCheck: '4 hours ago' }
  ];

  const systemHealth = [
    { system: 'Student Information System', status: 'healthy', uptime: '99.9%' },
    { system: 'Learning Management System', status: 'healthy', uptime: '99.7%' },
    { system: 'Email Server', status: 'warning', uptime: '98.2%' },
    { system: 'File Storage', status: 'healthy', uptime: '100%' }
  ];

  const complianceTasks = [
    {
      title: 'FERPA Data Audit',
      description: 'Review student data access logs',
      dueDate: '2025-01-15',
      priority: 'high' as const,
      relatedEvent: 'ferpa-disclosure-log-review-2025'
    },
    {
      title: 'Security Policy Update',
      description: 'Update network security policies',
      dueDate: '2025-01-20',
      priority: 'medium' as const,
      relatedEvent: null
    },
    {
      title: 'Backup Verification',
      description: 'Verify data backup integrity',
      dueDate: '2025-01-25',
      priority: 'medium' as const,
      relatedEvent: null
    },
    {
      title: 'Vendor Security Assessment',
      description: 'Complete annual vendor security reviews',
      dueDate: '2025-06-30',
      priority: 'critical' as const,
      relatedEvent: 'vendor-security-assessments-2025'
    }
  ];

  const edtechTools = [
    { name: 'Google Classroom', compliance: 'compliant', lastReview: '2024-12-15' },
    { name: 'Khan Academy', compliance: 'compliant', lastReview: '2024-12-10' },
    { name: 'Zoom Education', compliance: 'review-needed', lastReview: '2024-11-20' },
    { name: 'Flipgrid', compliance: 'compliant', lastReview: '2024-12-05' }
  ];

  const itSecurityRoadmap = [
    {
      title: 'Implement Zero Trust Architecture',
      description: 'Deploy zero trust security model for all network access',
      timeline: 'Q2 2025',
      priority: 'high' as const,
      status: 'planning'
    },
    {
      title: 'Enhanced Endpoint Detection',
      description: 'Upgrade endpoint detection and response capabilities',
      timeline: 'Q1 2025',
      priority: 'high' as const,
      status: 'in-progress'
    },
    {
      title: 'GDPR Compliance Automation',
      description: 'Automate GDPR data subject request processing',
      timeline: 'Q3 2025',
      priority: 'medium' as const,
      status: 'planning'
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getRegulationBadgeVariant = (regulation: string) => {
    switch (regulation.toLowerCase()) {
      case 'ferpa':
        return 'ferpa';
      case 'coppa':
        return 'coppa';
      case 'gdpr':
        return 'gdpr';
      case 'ppra':
        return 'ppra';
      default:
        return 'general';
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">IT Staff Dashboard</h1>
            <p className="text-muted-foreground">
              System security, compliance monitoring, and infrastructure management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Network Administrator</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {systemSecurity}%
            </span>
          </div>
          <h3 className="font-semibold mb-1">Security Score</h3>
          <p className="text-sm text-muted-foreground">Overall system security</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {activeVulnerabilities}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Vulnerabilities</h3>
          <p className="text-sm text-muted-foreground">Require attention</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <HardDrive className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {dataBackupStatus}%
            </span>
          </div>
          <h3 className="font-semibold mb-1">Backup Status</h3>
          <p className="text-sm text-muted-foreground">Data protection</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {networkUptime}%
            </span>
          </div>
          <h3 className="font-semibold mb-1">Network Uptime</h3>
          <p className="text-sm text-muted-foreground">Last 30 days</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Zap className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {pendingUpdates}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Pending Updates</h3>
          <p className="text-sm text-muted-foreground">Security patches</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* IT Compliance Calendar */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-500" />
                IT Compliance Calendar
              </h2>
              <Link to="/calendar">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {itComplianceEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{event.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className="font-medium">{formatDate(event.date)}</span>
                        </div>
                        <Badge variant={getRegulationBadgeVariant(event.regulation)}>
                          {event.regulation}
                        </Badge>
                        <span className={`text-xs font-medium ${
                          event.priority === 'critical' ? 'text-red-600 dark:text-red-400' :
                          event.priority === 'high' ? 'text-orange-600 dark:text-orange-400' :
                          'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {event.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Legal Reference:</strong> {event.legalReference}
                  </div>
                  {event.actionItems.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <strong>Key Actions:</strong> {event.actionItems.slice(0, 2).join(', ')}
                      {event.actionItems.length > 2 && '...'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* IT Security & Compliance Roadmap */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                IT Security & Compliance Roadmap
              </h2>
            </div>
            
            <div className="space-y-4">
              {itSecurityRoadmap.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Timeline: {item.timeline}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <Badge level={item.priority === 'high' ? 'advanced' : 'intermediate'}>
                      {item.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">System Health</h2>
              <Server className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {systemHealth.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      system.status === 'healthy' ? 'bg-green-500' : 
                      system.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <h3 className="font-medium">{system.system}</h3>
                      <p className="text-sm text-muted-foreground">Uptime: {system.uptime}</p>
                    </div>
                  </div>
                  <Badge level={system.status === 'healthy' ? 'beginner' : 'intermediate'}>
                    {system.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* EdTech Tools Compliance */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">EdTech Tools Compliance</h2>
              <Laptop className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {edtechTools.map((tool, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Last reviewed: {tool.lastReview}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge level={tool.compliance === 'compliant' ? 'beginner' : 'advanced'}>
                      {tool.compliance === 'compliant' ? 'Compliant' : 'Review Needed'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/assessments/it-staff" className="block" title="Take IT staff security assessments">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Take security assessment
                </Button>
              </Link>
              <Link to="/privacy/vendors" className="block" title="Assess vendor security and compliance">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Vendor assessments
                </Button>
              </Link>
              <Link to="/privacy/incidents" className="block" title="Report and manage privacy incidents">
                <Button variant="outline" className="w-full justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Privacy incidents
                </Button>
              </Link>
              <Link to="/privacy/analytics" className="block" title="View security and compliance analytics">
                <Button variant="outline" className="w-full justify-start">
                  <Lock className="mr-2 h-4 w-4" />
                  Security analytics
                </Button>
              </Link>
            </div>
          </div>

          {/* Security Metrics */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Security Status</h2>
            <div className="space-y-4">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{metric.name}</h3>
                    <p className="text-xs text-muted-foreground">{metric.lastCheck}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    metric.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Tasks */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Compliance Tasks</h2>
            <div className="space-y-4">
              {complianceTasks.map((task, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{task.title}</h3>
                    <Badge level={task.priority === 'critical' || task.priority === 'high' ? 'advanced' : 'intermediate'}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Due: {task.dueDate}
                  </div>
                  {task.relatedEvent && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      <AlertCircle className="h-3 w-3 inline mr-1" />
                      Compliance deadline related
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reset Demo Data */}
      <ResetDemoDataSection className="mt-8" />
      
    </div>
  );
}