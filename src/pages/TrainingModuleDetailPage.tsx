import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Users,
  Award,
  CheckCircle,
  Play,
  Star,
  Calendar,
  Target,
  FileText,
  HelpCircle,
  ExternalLink,
  Download,
  Share2,
  Bookmark,
  ChevronRight,
  User,
  GraduationCap,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { LoadingState } from '../common/LoadingState';
import { ProgressTracker } from '../common/ProgressTracker';
import {
  trainingModules,
  learningPaths,
  type TrainingModule,
} from '../data/trainingModulesData';
import { useNotifications, createNotification } from '../contexts/NotificationContext';
import { useUser } from '../hooks/useSupabase';
import { useTrainingProgress } from '../hooks/useSupabase';


export function TrainingModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState<TrainingModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { user, loading: userLoading } = useUser();
  const { addNotification } = useNotifications();
  const { startModule, updateProgress, getModuleProgress } = useTrainingProgress(user?.id);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulate loading module data
    const loadModule = async () => {
      setLoading(true);
      // In real implementation, this would be an API call
      const foundModule = trainingModules.find(m => m.id === moduleId);
      if (foundModule) {
        // If user is logged in, check for any existing progress
        if (user?.id) {
          const userProgress = getModuleProgress(moduleId || '');
          if (userProgress) {
            setModule({
              ...foundModule,
              status: userProgress.status,
              progress: userProgress.progress
            });
          } else {
            setModule(foundModule);
          }
        } else {
          // For unauthenticated users, just load the module
          setModule(foundModule);
        }
      }
      setLoading(false);
    };

    if (moduleId) {
      loadModule();
    }
  }, [moduleId, user?.id, getModuleProgress]);

  const handleEnroll = async () => {
    setEnrolling(true);
    
    try {
      // If user is logged in, save progress to database
      if (user?.id && module) {
        const { error } = await startModule(module.id, module.title);
        if (error) {
          console.error('Error starting module:', error);
          addNotification({
            type: 'error',
            title: 'Error',
            message: 'Failed to start module. Please try again.',
            timestamp: Date.now(),
            read: false,
            category: 'training'
          });
        } else {
          // Update local state
          setModule(prev => prev ? { ...prev, status: 'in-progress', progress: 0 } : null);
          addNotification({
            type: 'success',
            title: 'Module Started',
            message: `You've started ${module.title}`,
            timestamp: Date.now(),
            read: false,
            category: 'training'
          });
        }
      } else {
        // For anonymous users, just update UI state without saving
        if (module) {
          setModule(prev => prev ? { ...prev, status: 'in-progress', progress: 0 } : null);
          setShowLoginPrompt(true);
        }
      }
    } catch (err) {
      console.error('Error in handleEnroll:', err);
    }
    
    setEnrolling(false);
  };

  const handleContinue = () => {
    // Navigate to first incomplete lesson
    const nextLesson = module?.syllabus.find(item => !item.completed);
    if (nextLesson) {
      // In real implementation, navigate to lesson detail page
      console.log('Navigate to lesson:', nextLesson.id);
    }
  };

  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false);
  };

  const handleGoToLogin = () => {
    navigate('/login', { state: { from: location, returnToModule: moduleId } });
  };

  const getStatusButton = () => {
    if (!module) return null;

    switch (module.status) {
      case 'not-started':
        return (
          <Button 
            size="lg" 
            onClick={() => navigate(`/training/${module.id}/interactive`)}
            disabled={enrolling}
            className="w-full sm:w-auto"
          >
            {enrolling ? 'Starting...' : 'Start Interactive Training'}
          </Button>
        );
      case 'in-progress':
        return (
          <Button 
            size="lg" 
            onClick={() => navigate(`/training/${module.id}/interactive`)}
            className="w-full sm:w-auto"
          >
            <Play className="h-4 w-4 mr-2" />
            Continue Interactive Training
          </Button>
        );
      case 'completed':
        return (
          <div className="flex gap-2">
            <Button 
              size="lg" 
              variant="outline"
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate(`/training/${module.id}/interactive`)}
              className="flex-1"
            >
              Review Again
            </Button>
          </div>
        );
      default:
        return (
          <Button 
            size="lg" 
            onClick={() => navigate(`/training/${module.id}/interactive`)}
            className="w-full sm:w-auto"
          >
            Start Interactive Training
          </Button>
        );
    }
  };

  // Find related learning paths
  const relatedPaths = learningPaths.filter(path => 
    path.moduleIds.includes(moduleId || '')
  );

  // Convert syllabus to progress steps
  const progressSteps = module?.syllabus.map((item, index) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    status: item.completed ? 'completed' as const : 
             index === 0 && module.status === 'in-progress' ? 'current' as const : 
             'upcoming' as const,
    progress: item.completed ? 100 : 
              index === 0 && module.status === 'in-progress' ? 25 : undefined
  })) || [];

  // Login prompt for anonymous users
  const renderLoginPrompt = () => {
    if (!showLoginPrompt) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border w-full max-w-md shadow-xl">
          <div className="p-6">
            <div className="text-center mb-4">
              <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Progress Saving is Limited</h3>
              <p className="text-muted-foreground">
                You're using EduSoluce™ without an account. You can view and complete training modules, 
                but your progress won't be saved between sessions or across devices.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-amber-800 dark:text-amber-300 text-sm mb-6">
              <p>
                To save your progress and earn certificates, please create a free account or log in.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline"
                onClick={handleLoginPromptClose}
                className="sm:flex-1"
              >
                Continue as Guest
              </Button>
              <Button 
                onClick={handleGoToLogin}
                className="sm:flex-1"
              >
                Log In or Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingState loading={true} />
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Module not found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The training module you're looking for doesn't exist.
            </p>
            <Link to="/training">
              <Button>Back to Training</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge variant={module.regulation} className="bg-white/20 text-white border-white/30">
                  {module.regulation.toUpperCase()}
                </Badge>
                <Badge level={module.level} className="bg-white/20 text-white border-white/30">
                  {module.level}
                </Badge>
                {module.featured && (
                  <Badge variant="general" className="bg-white/20 text-white border-white/30">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{module.title}</h1>
              <p className="text-blue-100 text-lg mb-6 max-w-3xl">
                {module.longDescription}
              </p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{module.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{module.enrollmentCount} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>{module.popularity} rating</span>
                </div>
                {module.certification && (
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span>Certificate</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-64">
              {getStatusButton()}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex-1 sm:flex-none lg:flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex-1 sm:flex-none lg:flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Primary Content */}
          <div className="flex-1 space-y-8">
            {/* Learning Objectives */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Learning Objectives
              </h2>
              <ul className="space-y-3">
                {module.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Syllabus with Progress Tracker */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Course Syllabus
              </h2>
              
              <ProgressTracker 
                steps={progressSteps}
                orientation="vertical"
                showProgress={true}
              />
              
              {!user && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">Create an account to save progress</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        You can view and complete this training module as a guest, but your progress won't be saved.
                        Create a free account to track your progress and earn certificates.
                      </p>
                      <div className="mt-3">
                        <Link to="/login">
                          <Button size="sm" variant="outline">
                            Log In or Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Instructor Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Instructor
              </h2>
              
              <div className="flex items-start gap-4">
                <img
                  src={module.instructor.avatar}
                  alt={module.instructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(module.instructor.name)}&background=6366f1&color=ffffff`;
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{module.instructor.name}</h3>
                  <p className="text-muted-foreground mb-2">{module.instructor.title}</p>
                  <p className="text-sm mb-4">{module.instructor.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {module.instructor.credentials.map((credential, index) => (
                      <Badge key={index} variant="general" className="text-xs">
                        {credential}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-600" />
                Course Details
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Format & Duration</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <span className="capitalize">{module.format.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{module.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="capitalize">{module.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="capitalize">{module.category.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Certification & Credits</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificate:</span>
                      <span>{module.certification ? 'Yes' : 'No'}</span>
                    </div>
                    {module.cpe_credits && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CPE Credits:</span>
                        <span>{module.cpe_credits}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>{new Date(module.lastUpdated).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completion Rate:</span>
                      <span>{module.completionRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Roles */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Target Audience
              </h2>
              
              <div className="flex flex-wrap gap-2">
                {module.targetRoles.map((role) => (
                  <Badge key={role} variant="general" className="capitalize">
                    {role.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:w-80 space-y-6">
            {/* Progress Overview (if enrolled) */}
            {module.status !== 'not-started' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Your Progress
                </h3>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {module.progress || 0}%
                  </div>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress || 0}%` }}
                  />
                </div>
                
                {module.estimatedCompletion && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Est. completion: {module.estimatedCompletion}</span>
                  </div>
                )}
              </div>
            )}

            {/* Prerequisites */}
            {module.prerequisites.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-yellow-600" />
                  Prerequisites
                </h3>
                
                <ul className="space-y-2">
                  {module.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {module.achievements.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Achievements
                </h3>
                
                <div className="space-y-3">
                  {module.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-yellow-600 font-medium">{achievement.points} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Learning Paths */}
            {relatedPaths.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  Learning Paths
                </h3>
                
                <div className="space-y-3">
                  {relatedPaths.map((path) => (
                    <Link
                      key={path.id}
                      to={`/learning-paths/${path.id}`}
                      className="block p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      title={`Explore ${path.title} learning path`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{path.title}</h4>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">{path.description}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{path.moduleIds.length} modules</span>
                        <span>•</span>
                        <span>{path.duration}h</span>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Link to="/learning-paths" title="Browse all available learning paths">
                    <Button variant="outline" size="sm" className="w-full">
                      View all learning paths
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Help & Support */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-gray-600" />
                Need Help?
              </h3>
              
              <div className="space-y-3">
                <Link to="/faq" className="block" title="Frequently asked questions about training">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Training FAQ
                  </Button>
                </Link>
                <Link to="/resources" className="block" title="Download additional learning resources">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download resources
                  </Button>
                </Link>
                <Link to="/contact" className="block" title="Contact our support team">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Technical support
                  </Button>
                </Link>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">
                  Related assessments
                </p>
                <Link to="/assessment" title="Test your knowledge with privacy assessments">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                    Take related assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Login prompt modal */}
      {renderLoginPrompt()}
    </div>
  );
}