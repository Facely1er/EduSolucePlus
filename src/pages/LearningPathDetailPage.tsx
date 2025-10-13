import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle,
  Target,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { LoadingState } from '../common/LoadingState';
import {
  trainingModules,
  learningPaths,
  type LearningPath,
  type TrainingModule
} from '../data/trainingModulesData';

export function LearningPathDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [modules, setModules] = useState<(TrainingModule | undefined)[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    // Load learning path and associated modules
    const loadData = async () => {
      setLoading(true);
      
      if (!id) {
        setLoading(false);
        return;
      }

      // Find the learning path
      const path = learningPaths.find(p => p.id === id);
      if (!path) {
        setLoading(false);
        return;
      }

      // Get the modules in this path
      const pathModules = path.moduleIds.map(moduleId => 
        trainingModules.find(m => m.id === moduleId)
      );

      // Calculate path progress (percent of completed modules)
      const completedModules = pathModules.filter(m => m?.status === 'completed').length;
      const progressPercentage = pathModules.length > 0 
        ? Math.round((completedModules / pathModules.length) * 100) 
        : 0;

      setLearningPath(path);
      setModules(pathModules);
      setLoading(false);
    };

    loadData();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setEnrolling(false);
    // In a real app, you would update the database to mark the user as enrolled
    // and redirect to the first module or show enrollment confirmation
  };

  // Calculate expected completion time based on modules' duration
  const getTotalDuration = () => {
    return modules.reduce((sum, module) => sum + (module?.duration || 0), 0);
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

  if (!learningPath) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Learning path not found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The learning path you're looking for doesn't exist.
            </p>
            <Link to="/learning-paths">
              <Button>All Learning Paths</Button>
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

        {/* Path Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge variant={learningPath.regulation} className="bg-white/20 text-white border-white/30">
                  {learningPath.regulation.toUpperCase()}
                </Badge>
                <Badge level={learningPath.level} className="bg-white/20 text-white border-white/30">
                  {learningPath.level}
                </Badge>
                {learningPath.certification && (
                  <Badge variant="general" className="bg-white/20 text-white border-white/30">
                    <Award className="h-3 w-3 mr-1" />
                    Certification
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{learningPath.title}</h1>
              <p className="text-blue-100 text-lg mb-6 max-w-3xl">
                {learningPath.description}
              </p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{learningPath.duration} hours total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{learningPath.moduleIds.length} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>For {learningPath.targetRole.replace('-', ' ')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-64">
              <Button 
                size="lg" 
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full sm:w-auto"
              >
                {enrolling ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enrolling...
                  </>
                ) : (
                  <>Start Guide Collection<ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* About This Path */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">About This Guide Collection</h2>
              <p className="text-muted-foreground mb-6">
                {learningPath.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Benefits */}
                <div>
                  <h3 className="font-medium mb-3">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {learningPath.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Prerequisites */}
                <div>
                  <h3 className="font-medium mb-3">Prerequisites</h3>
                  <ul className="space-y-2">
                    {learningPath.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modules in This Path */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-6">Included Modules</h2>
              <div className="space-y-6">
                {modules.map((module, index) => (
                  <div 
                    key={index}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant={module?.regulation || 'general'} className="text-xs">
                          {module?.regulation?.toUpperCase() || 'GENERAL'}
                        </Badge>
                        <Badge level={module?.level || 'beginner'} className="text-xs">
                          {module?.level || 'Beginner'}
                        </Badge>
                      </div>
                      <h3 className="font-medium">{module?.title || 'Unknown Module'}</h3>
                      <p className="text-sm text-muted-foreground">{module?.description || 'No description available'}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 
                          {module?.duration || '--'} min
                        </span>
                      </div>
                    </div>
                    
                    {module ? (
                      <Link to={`/training/${module.id}`} className="flex-shrink-0" title={`Access ${module.title} professional guide`}>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Guide
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        Unavailable
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  Ready to start your learning journey?
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link to="/training" title="Browse all professional development guides">
                    <Button variant="outline" size="sm">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      All Training Guides
                    </Button>
                  </Link>
                  <Link to="/assessment" title="Test your knowledge first">
                    <Button variant="outline" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Take Assessment First
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Assessment Areas */}
            {learningPath.addressesAssessmentAreas && learningPath.addressesAssessmentAreas.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary-600" />
                  Assessment Areas Covered
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {learningPath.addressesAssessmentAreas.map((area, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h3 className="font-medium text-sm">{area.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Path Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Path Overview</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modules</span>
                  <span className="font-medium">{learningPath.moduleIds.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Duration</span>
                  <span className="font-medium">{getTotalDuration()} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span className="font-medium">{learningPath.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty</span>
                  <span className="font-medium capitalize">{learningPath.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Target Role */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Designed For</h3>
              
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="font-medium capitalize">{learningPath.targetRole.replace('-', ' ')}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  This learning path is specifically designed for {learningPath.targetRole.replace('-', ' ')} 
                  roles to help build {learningPath.regulation.toUpperCase()} compliance knowledge.
                </p>
              </div>
            </div>

            {/* Maturity Progression */}
            {learningPath.maturityProgression && learningPath.maturityProgression.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Maturity Progression
                </h3>
                
                <div className="space-y-4">
                  {learningPath.maturityProgression.map((progression, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {progression.assessmentArea.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-amber-600 dark:text-amber-400">{progression.fromLevel}</span>
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-green-600 dark:text-green-400">{progression.toLevel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Cohorts/Sessions */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-lg border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary-600" />
                Next Cohorts
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                  <div className="text-sm font-medium mb-1">September Cohort</div>
                  <div className="text-xs text-muted-foreground mb-2">Starts September 15, 2025</div>
                  <Badge variant="general" className="text-xs">10 spots left</Badge>
                </div>
                <div className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg">
                  <div className="text-sm font-medium mb-1">October Cohort</div>
                  <div className="text-xs text-muted-foreground mb-2">Starts October 12, 2025</div>
                  <Badge variant="general" className="text-xs">Open enrollment</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}