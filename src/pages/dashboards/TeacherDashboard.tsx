import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Shield, 
  CheckCircle, 
  Clock, 
  FileText, 
  GraduationCap,
  AlertCircle,
  Star,
  Calendar,
  Laptop,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  getUpcomingDeadlines
} from '../../data/business_regulatory_calendar';
import { ResetDemoDataSection } from '../../components/common/ResetDemoDataSection';

export function TeacherDashboard() {
  // Mock data for teacher dashboard
  const myProgress = 72;
  const completedTraining = 4;
  const totalTraining = 6;
  const studentsInClass = 28;
  const upcomingDeadlines = 2;

  // Get compliance events relevant to teachers
  const teacherRoles = [
    'Teacher', 'All Staff', 'Principal', 'Curriculum Director', 'Assessment Coordinator',
    'Enrollment Staff', 'Administrators'
  ];

  const relevantDeadlines = getUpcomingDeadlines(90).filter(event => 
    event.applicableToRoles.some(role => teacherRoles.includes(role))
  ).slice(0, 4);

  const recentActivities = [
    {
      id: 'ferpa-classroom',
      title: 'FERPA for Classroom Teachers',
      type: 'Assessment',
      score: 85,
      completedAt: '2025-01-02',
      regulation: 'ferpa' as const
    },
    {
      id: 'edtech-privacy',
      title: 'EdTech Privacy Evaluation',
      type: 'Training Module',
      progress: 60,
      regulation: 'general' as const
    }
  ];

  const myClasses = [
    { name: '3rd Grade - Room 12A', students: 24, privacyCompliant: 100 },
    { name: '3rd Grade - Room 12B', students: 22, privacyCompliant: 95 },
    { name: 'After School Program', students: 15, privacyCompliant: 100 }
  ];

  const upcomingTasks = [
    {
      title: 'Complete COPPA Training',
      dueDate: '2025-01-15',
      priority: 'high' as const,
      type: 'Training',
      relatedEvent: 'coppa-vendor-audit-q1-2025'
    },
    {
      title: 'Review Student Work Display Policy',
      dueDate: '2025-01-20',
      priority: 'medium' as const,
      type: 'Policy Review',
      relatedEvent: null
    },
    {
      title: 'Update Parent Communication Consent',
      dueDate: '2025-01-25',
      priority: 'medium' as const,
      type: 'Documentation',
      relatedEvent: null
    },
    {
      title: 'Prepare for FERPA Annual Notice',
      dueDate: '2025-08-15',
      priority: 'high' as const,
      type: 'Compliance',
      relatedEvent: 'ferpa-annual-notice-2025'
    }
  ];

  const quickTips = [
    {
      title: 'Directory Information',
      tip: 'Always check the opt-out list before sharing student information publicly.',
      icon: <Shield className="h-4 w-4 text-blue-500" />
    },
    {
      title: 'Digital Tools',
      tip: 'Verify COPPA compliance before using new apps with students under 13.',
      icon: <Laptop className="h-4 w-4 text-green-500" />
    },
    {
      title: 'Parent Communication',
      tip: 'Use secure channels when discussing student academic performance.',
      icon: <Users className="h-4 w-4 text-purple-500" />
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
            <h1 className="text-3xl font-bold mb-2">Teacher Dashboard</h1>
            <p className="text-muted-foreground">
              Your privacy compliance progress and classroom management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Ms. Johnson</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {myProgress}%
            </span>
          </div>
          <h3 className="font-semibold mb-1">My Progress</h3>
          <p className="text-sm text-muted-foreground">Privacy training completion</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold">
              {completedTraining}/{totalTraining}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Training Modules</h3>
          <p className="text-sm text-muted-foreground">Completed this semester</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {studentsInClass}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Students</h3>
          <p className="text-sm text-muted-foreground">In my classes</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {relevantDeadlines.length}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Upcoming</h3>
          <p className="text-sm text-muted-foreground">Compliance deadlines</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Compliance Dates for Teachers */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Key Compliance Dates for Teachers
              </h2>
              <Link to="/calendar">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {relevantDeadlines.map((event) => (
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

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activity.type} • {activity.score ? `Score: ${activity.score}%` : `Progress: ${activity.progress}%`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={activity.regulation}>
                      {activity.regulation.toUpperCase()}
                    </Badge>
                    {activity.score && <span className="font-semibold">{activity.score}%</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Classes */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">My Classes</h2>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {myClasses.map((classInfo, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{classInfo.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {classInfo.students} students
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{classInfo.privacyCompliant}% Compliant</span>
                    </div>
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
              <Link to="/assessments/teacher" className="block" title="Take teacher privacy assessments">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Take teacher assessment
                </Button>
              </Link>
              <Link to="/resources/professional-guides" className="block" title="Access teacher privacy training guides">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Professional development guides
                </Button>
              </Link>
              <Link to="/privacy/consent" className="block" title="Manage student consent records">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage consent records
                </Button>
              </Link>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{task.title}</h3>
                    <Badge level={task.priority === 'high' ? 'advanced' : 'intermediate'}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {task.type}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
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

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Privacy Tips</h2>
            <div className="space-y-4">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">{tip.title}</h3>
                    <p className="text-xs text-muted-foreground">{tip.tip}</p>
                  </div>
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