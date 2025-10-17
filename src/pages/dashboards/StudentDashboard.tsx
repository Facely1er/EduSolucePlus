import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Shield, 
  Star, 
  CheckCircle, 
  Clock, 
  FileText, 
  User,
  Trophy,
  Target,
  Smartphone,
  Lock,
  Eye,
  Award,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  getUpcomingDeadlines
} from '../../data/business_regulatory_calendar';
import { ResetDemoDataSection } from '../../components/common/ResetDemoDataSection';

export function StudentDashboard() {
  // Mock data for student dashboard
  const privacyScore = 78;
  const completedLessons = 8;
  const totalLessons = 12;
  const streakDays = 5;
  const badgesEarned = 6;

  // Get compliance events relevant to students and parents
  const studentRelevantEvents = getUpcomingDeadlines(180).filter(event => 
    event.title.toLowerCase().includes('ferpa annual notice') ||
    event.title.toLowerCase().includes('ppra') ||
    event.title.toLowerCase().includes('survey notification') ||
    event.description.toLowerCase().includes('parent') ||
    event.description.toLowerCase().includes('student')
  ).slice(0, 3);

  const recentActivities = [
    {
      id: 'privacy-rights',
      title: 'Student Privacy Rights',
      type: 'Assessment',
      score: 85,
      completedAt: '2025-01-02',
      points: 50
    },
    {
      id: 'digital-privacy',
      title: 'Digital Privacy Basics',
      type: 'Lesson',
      progress: 75,
      points: 30
    },
    {
      id: 'social-media',
      title: 'Social Media Privacy',
      type: 'Interactive Game',
      score: 92,
      completedAt: '2025-01-01',
      points: 40
    }
  ];

  const achievements = [
    { name: 'Privacy Protector', description: 'Completed first privacy assessment', icon: '🛡️', earned: true },
    { name: 'Digital Detective', description: 'Found all privacy settings in the game', icon: '🔍', earned: true },
    { name: 'Password Pro', description: 'Created a strong password', icon: '🔐', earned: true },
    { name: 'Social Media Sage', description: 'Mastered social media privacy', icon: '📱', earned: false },
    { name: 'Privacy Champion', description: 'Complete all privacy modules', icon: '🏆', earned: false }
  ];

  const upcomingLessons = [
    {
      title: 'App Permissions',
      description: 'Learn how to manage app permissions safely',
      estimatedTime: '10 minutes',
      difficulty: 'beginner' as const
    },
    {
      title: 'Online Tracking',
      description: 'Understand how websites track your activity',
      estimatedTime: '15 minutes',
      difficulty: 'intermediate' as const
    },
    {
      title: 'Digital Footprint',
      description: 'Learn about your digital footprint',
      estimatedTime: '12 minutes',
      difficulty: 'beginner' as const
    }
  ];

  const privacyGoals = [
    {
      title: 'Review Privacy Settings',
      description: 'Check and update privacy settings on all your social media accounts',
      dueDate: 'This week',
      priority: 'high' as const,
      completed: false
    },
    {
      title: 'Create Strong Passwords',
      description: 'Update weak passwords and enable two-factor authentication',
      dueDate: 'Next week',
      priority: 'medium' as const,
      completed: true
    },
    {
      title: 'Learn About FERPA Rights',
      description: 'Understand your educational privacy rights as a student',
      dueDate: 'This month',
      priority: 'medium' as const,
      completed: false
    }
  ];

  const privacyTips = [
    {
      title: 'Check Your Privacy Settings',
      tip: 'Review your social media privacy settings monthly to keep your information safe.',
      icon: <Eye className="h-4 w-4 text-blue-500" />
    },
    {
      title: 'Think Before You Share',
      tip: 'Ask yourself: Would I be okay if everyone could see this post?',
      icon: <Smartphone className="h-4 w-4 text-green-500" />
    },
    {
      title: 'Use Strong Passwords',
      tip: 'Create unique passwords for each account and use a password manager.',
      icon: <Lock className="h-4 w-4 text-purple-500" />
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
            <h1 className="text-3xl font-bold mb-2">Mon Tableau de Bord Confidentialité</h1>
            <p className="text-muted-foreground">
              Suivez votre parcours d'apprentissage et obtenez des réalisations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Alex Chen</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {privacyScore}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Privacy Score</h3>
          <p className="text-sm text-muted-foreground">Your privacy knowledge level</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-2xl font-bold">
              {completedLessons}/{totalLessons}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Lessons</h3>
          <p className="text-sm text-muted-foreground">Completed this month</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {streakDays}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Day Streak</h3>
          <p className="text-sm text-muted-foreground">Learning consistently</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {badgesEarned}
            </span>
          </div>
          <h3 className="font-semibold mb-1">Badges</h3>
          <p className="text-sm text-muted-foreground">Achievements unlocked</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Important Privacy Dates */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-500" />
                Important Privacy Dates
              </h2>
            </div>
            
            <div className="space-y-4">
              {studentRelevantEvents.map((event) => (
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
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 p-2 rounded mt-2">
                    <AlertCircle className="h-3 w-3 inline mr-1" />
                    This affects your privacy rights as a student
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Privacy Goals */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-500" />
                Your Privacy Goals
              </h2>
            </div>
            
            <div className="space-y-4">
              {privacyGoals.map((goal, index) => (
                <div key={index} className={`border rounded-lg p-4 ${goal.completed ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        goal.completed 
                          ? 'border-green-500 bg-green-500' 
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {goal.completed && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-medium text-sm mb-1 ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {goal.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">{goal.description}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Due: {goal.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge level={goal.priority === 'high' ? 'advanced' : 'intermediate'}>
                      {goal.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-gray-50 dark:bg-gray-950 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
              <Star className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      {activity.type === 'Assessment' ? <FileText className="h-5 w-5" /> :
                       activity.type === 'Lesson' ? <BookOpen className="h-5 w-5" /> :
                       <Target className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {activity.type} • {activity.score ? `Score: ${activity.score}%` : `Progress: ${activity.progress}%`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">+{activity.points} pts</div>
                      {activity.score && <div className="text-xs text-muted-foreground">{activity.score}%</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Achievements</h2>
              <Award className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-4 border rounded-lg ${
                  achievement.earned ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' : 
                  'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{achievement.name}</h3>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
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
            <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
            <div className="space-y-3">
              <Link to="/assessments/student" className="block" title="Take student privacy assessments">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Take privacy assessment
                </Button>
              </Link>
              <Link to="/training" className="block" title="Access interactive privacy training modules">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Interactive privacy lessons
                </Button>
              </Link>
              <Link to="/learning-paths" className="block" title="Explore structured learning paths">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Learning paths
                </Button>
              </Link>
            </div>
          </div>

          {/* Upcoming Lessons */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Up Next</h2>
            <div className="space-y-4">
              {upcomingLessons.map((lesson, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{lesson.title}</h3>
                    <Badge level={lesson.difficulty}>
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {lesson.estimatedTime}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Tips */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Privacy Tips</h2>
            <div className="space-y-4">
              {privacyTips.map((tip, index) => (
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