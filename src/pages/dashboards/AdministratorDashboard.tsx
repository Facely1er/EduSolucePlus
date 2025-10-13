import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle,
  AlertTriangle,
  TrendingUp, 
  Clock, 
  Users, 
  FileText, 
  BarChart3,
  Target,
  Award,
  Settings,
  UserCheck,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  getUpcomingDeadlines, 
  getCriticalUpcomingEvents
} from '../../data/business_regulatory_calendar';
import { ResetDemoDataSection } from '../../components/common/ResetDemoDataSection';

export function AdministratorDashboard() {
  // Mock data for demonstration
  const overallMaturity = 68;
  const staffCompliance = 78;

  // Get compliance events relevant to administrators
  const adminRoles = [
    'Superintendent', 'Principal', 'Registrar', 'Student Services', 'Special Education Director',
    'Data Manager', 'Curriculum Director', 'Assessment Coordinator', 'Title IX Coordinator',
    'Human Resources', 'Compliance Officer', 'Procurement Officer', 'Data Privacy Officer',
    'Privacy Officer', 'Section 504 Coordinator', 'Facilities Manager', 'ADA Coordinator',
    'Records Manager', 'McKinney-Vento Coordinator', 'Administrators'
  ];

  const upcomingDeadlines = getUpcomingDeadlines(120).filter(event => 
    event.applicableToRoles.some(role => adminRoles.includes(role))
  ).slice(0, 6);

  const criticalEvents = getCriticalUpcomingEvents().filter(event => 
    event.applicableToRoles.some(role => adminRoles.includes(role))
  ).slice(0, 4);


  const priorityActions = [
    {
      title: 'Implement COPPA Vendor Assessment',
      description: 'Develop formal vendor evaluation process for COPPA compliance',
      priority: 'high' as const,
      estimatedTime: '2-3 weeks',
      dueDate: '2025-03-31',
      relatedEvent: 'coppa-vendor-audit-q1-2025'
    },
    {
      title: 'Update Emergency Disclosure Procedures',
      description: 'Create comprehensive emergency protocols with oversight mechanisms',
      priority: 'medium' as const,
      estimatedTime: '1-2 weeks',
      dueDate: '2025-02-15',
      relatedEvent: null
    },
    {
      title: 'Prepare FERPA Annual Notice',
      description: 'Update and prepare FERPA annual notice for SY 2025-26 distribution',
      priority: 'high' as const,
      estimatedTime: '3-4 weeks',
      dueDate: '2025-08-15',
      relatedEvent: 'ferpa-annual-notice-2025'
    }
  ];

  const complianceBreakdown = [
    { regulation: 'FERPA', score: 75, areas: 10, color: 'bg-blue-500' },
    { regulation: 'COPPA', score: 62, areas: 8, color: 'bg-amber-500' },
    { regulation: 'GDPR', score: 45, areas: 12, color: 'bg-red-500' },
    { regulation: 'General', score: 70, areas: 15, color: 'bg-green-500' }
  ];

  const staffOverview = [
    { role: 'Teachers', total: 45, completed: 38, percentage: 84 },
    { role: 'IT Staff', total: 8, completed: 6, percentage: 75 },
    { role: 'Administrators', total: 12, completed: 10, percentage: 83 }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      case 'high':
        return 'text-orange-600 dark:text-orange-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
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
            <h1 className="text-3xl font-bold mb-2">Administrator Dashboard</h1>
            <p className="text-muted-foreground">
              Institutional privacy compliance overview and management
            </p>
          </div>
    
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Target className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {overallMaturity}%
            </span>
          </div>
          <h3 className="font-semibold mb-1">Overall Maturity</h3>
          <p className="text-sm text-muted-foreground">Level 4 - Managed</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {staffCompliance}%
            </span>
          </div>
          <h3 className="font-semibold mb-1">Staff Compliance</h3>
          <p className="text-sm text-muted-foreground">Training completion rate</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {criticalEvents.length}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Critical Deadlines</h3>
          <p className="text-sm text-muted-foreground">Next 60 days</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              +12%
            </span>
          </div>
          <h3 className="font-semibold mb-1">Improvement</h3>
          <p className="text-sm text-muted-foreground">Since last quarter</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Compliance Deadlines */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-red-500" />
                Upcoming Compliance Deadlines
              </h2>
              <Link to="/calendar">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingDeadlines.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{event.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span className={`font-medium ${
                            new Date(event.date).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-muted-foreground'
                          }`}>
                            {formatDate(event.date)}
                          </span>
                        </div>
                        <Badge variant={getRegulationBadgeVariant(event.regulation)}>
                          {event.regulation}
                        </Badge>
                        <span className={`text-xs font-medium ${getPriorityColor(event.priority)}`}>
                          {event.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Legal Reference:</strong> {event.legalReference}
                  </div>
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                    <strong>Consequences:</strong> {event.consequences}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Action Plan & Roadmap */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-500" />
                Compliance Action Plan & Roadmap
              </h2>
            </div>
            
            <div className="space-y-4">
              {priorityActions.map((action, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{action.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Est. Time: {action.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {action.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <Badge level={action.priority === 'high' ? 'advanced' : 'intermediate'}>
                      {action.priority}
                    </Badge>
                  </div>
                  {action.relatedEvent && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
                      <AlertCircle className="h-3 w-3 inline mr-1" />
                      Related to compliance deadline: {action.relatedEvent}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Breakdown */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Regulatory Compliance</h2>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {complianceBreakdown.map((item) => (
                <div key={item.regulation} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.regulation}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.score}% ({item.areas} areas)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Overview */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Staff Training Overview</h2>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {staffOverview.map((staff) => (
                <div key={staff.role} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{staff.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {staff.completed} of {staff.total} completed training
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{staff.percentage}%</div>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full bg-primary-500"
                        style={{ width: `${staff.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Critical Alerts */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-lg border-2 border-red-200 dark:border-red-800 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-red-800 dark:text-red-200">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Deadlines
            </h2>
            <div className="space-y-3">
              {criticalEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-red-900/20 p-3 rounded border">
                  <h3 className="font-medium text-sm mb-1">{event.title}</h3>
                  <div className="text-xs text-muted-foreground mb-1">
                    Due: {formatDate(event.date)}
                  </div>
                  <Badge variant={getRegulationBadgeVariant(event.regulation)}>
                    {event.regulation}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/assessments/administrator" className="block" title="Take administrator privacy assessments">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Take administrator assessment
                </Button>
              </Link>
              <Link to="/role/administrator?tab=training" className="block" title="Access administrator training content">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Professional development guides
                </Button>
              </Link>
              <Link to="/privacy/obligations" className="block" title="Manage compliance obligations and deadlines">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Compliance obligations
                </Button>
              </Link>
              <Link to="/privacy/reports" className="block" title="Generate compliance reports">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate compliance reports
                </Button>
              </Link>
            </div>
          </div>

          {/* Achievement */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-3">
              <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-lg font-semibold">Achievement</h2>
            </div>
            <p className="text-sm mb-3">
              Congratulations! Your institution has reached Level 4 maturity in FERPA compliance.
            </p>
            <Button size="sm" variant="outline">
              View Certificate
            </Button>
          </div>
        </div>
      </div>

      {/* Reset Demo Data */}
      <ResetDemoDataSection className="mt-8" />
      
    </div>
  );
}