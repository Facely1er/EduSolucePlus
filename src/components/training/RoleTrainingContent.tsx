import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  CheckCircle, 
  Book, 
  Clock, 
  Award, 
  Calendar,
  GraduationCap,
  Target,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  trainingModules,
  learningPaths,
  type TrainingModule
} from '../../data/trainingModulesData';
import { useUser, useTrainingProgress } from '../../hooks/useSupabase';

interface RoleTrainingContentProps {
  roleType: 'administrator' | 'teacher' | 'it-staff' | 'student';
}

export function RoleTrainingContent({ roleType }: RoleTrainingContentProps) {
  const { user } = useUser();
  const { progress: trainingProgress, loading: progressLoading } = useTrainingProgress(user?.id);

  // Filter modules for this role
  const roleModules = useMemo(() => {
    return trainingModules.filter(module => 
      module.targetRoles.includes(roleType as 'administrator' | 'teacher' | 'it-staff' | 'student')
    );
  }, [roleType]);
  
  // Filter learning paths for this role
  const rolePaths = useMemo(() => {
    return learningPaths.filter(path => 
      path.targetRole === roleType
    );
  }, [roleType]);
  
  // Merge modules with progress data if user is logged in
  const modulesWithProgress = useMemo(() => {
    if (!user || !trainingProgress || trainingProgress.length === 0) {
      return roleModules.map(module => ({
        ...module,
        status: 'not-started',
        progress: 0
      }));
    }
    
    return roleModules.map(module => {
      const userProgress = trainingProgress.find(p => p.module_id === module.id);
      return {
        ...module,
        status: userProgress?.status || 'not-started',
        progress: userProgress?.progress || 0,
        lastAccessed: userProgress?.last_accessed
      };
    });
  }, [roleModules, trainingProgress, user]);
  
  // Get in-progress modules
  const inProgressModules = modulesWithProgress.filter(m => m.status === 'in-progress');
  
  // Get completed modules
  const completedModules = modulesWithProgress.filter(m => m.status === 'completed');
  
  // Get recommended modules (those that aren't started or in progress)
  const recommendedModules = modulesWithProgress.filter(m => m.status === 'not-started');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getProgressBar = (progress: number) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
      <div
        className="bg-primary-600 h-1.5 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
  
  // Function to render training module card
  const renderModuleCard = useCallback((module: TrainingModule & { status?: string, progress?: number }) => (
    <Link
      to={`/training/${module.id}`}
      key={module.id}
      className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2">
            <Badge variant={module.regulation}>{module.regulation.toUpperCase()}</Badge>
            <Badge level={module.level}>{module.level}</Badge>
          </div>
          {module.status && (
            <Badge className={getStatusColor(module.status)}>
              {module.status === 'completed' ? 'Completed' : 
               module.status === 'in-progress' ? 'In Progress' : 'Not Started'}
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold mb-2">{module.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{module.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{module.duration} min</span>
          </div>
          
          {module.status === 'in-progress' && typeof module.progress === 'number' && (
            <div className="flex-1 mx-4">
              {getProgressBar(module.progress)}
            </div>
          )}
          
          <Button size="sm" variant={module.status === 'completed' ? 'outline' : 'default'}>
            {module.status === 'completed' ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                View
              </>
            ) : module.status === 'in-progress' ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Continue
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  ), []);
  
  // Function to render learning path card
  const renderPathCard = useCallback((path: { id: string; title: string; description: string; regulation: string; level: string; difficulty: string; moduleIds: string[]; duration: number }) => (
    <Link
      to={`/learning-paths/${path.id}`}
      key={path.id}
      className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-md transition-shadow p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex gap-2">
          <Badge variant={path.regulation}>{path.regulation.toUpperCase()}</Badge>
          <Badge level={path.level}>{path.level}</Badge>
        </div>
        <Badge variant="general" className="capitalize">{path.difficulty}</Badge>
      </div>
      
      <h3 className="font-semibold mb-2">{path.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{path.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Book className="h-4 w-4 mr-1" />
            {path.moduleIds.length} modules
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {path.duration} hours
          </span>
        </div>
        
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Link>
  ), []);
  
  // Show loading state if still loading progress data
  if (progressLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading your training content...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Action Plan Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-800/40 rounded-full">
            <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-300">Your Action Plan</h2>
            <p className="text-blue-700 dark:text-blue-400 mb-4">
              Based on your role as a {roleType.replace('-', ' ')}, we've curated training modules and learning paths to help you develop your privacy and compliance knowledge.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-medium">Training Progress</h3>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Completed:</span>
                  <span className="font-medium">{completedModules.length} of {modulesWithProgress.length} modules</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${(completedModules.length / Math.max(modulesWithProgress.length, 1)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>In progress: {inProgressModules.length}</span>
                  <span>Not started: {recommendedModules.length}</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-medium">Recommended Actions</h3>
                </div>
                <ul className="space-y-1 text-sm">
                  {inProgressModules.length > 0 ? (
                    <li className="flex items-start gap-1">
                      <Play className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Continue your in-progress training</span>
                    </li>
                  ) : null}
                  
                  {recommendedModules.length > 0 ? (
                    <li className="flex items-start gap-1">
                      <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Start new training module for your role</span>
                    </li>
                  ) : null}
                  
                  {rolePaths.length > 0 ? (
                    <li className="flex items-start gap-1">
                      <Award className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                      <span>Explore learning paths for your role</span>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* In Progress Modules */}
      {inProgressModules.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Play className="h-5 w-5 text-primary-600" />
              In Progress
            </h2>
            {inProgressModules.length > 2 && (
              <Link to="/training" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                View all ({inProgressModules.length})
              </Link>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {inProgressModules.slice(0, 2).map(module => renderModuleCard(module))}
          </div>
        </div>
      )}

      {/* Recommended Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary-600" />
            Recommended Modules
          </h2>
          {recommendedModules.length > 4 && (
            <Link to="/training" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              View all ({recommendedModules.length})
            </Link>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {recommendedModules.slice(0, 4).map(module => renderModuleCard(module))}
        </div>
        {recommendedModules.length === 0 && (
          <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border">
            <Book className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium mb-1">No recommended modules available</h3>
            <p className="text-sm text-muted-foreground mb-4">
              We don't have any more module recommendations for you at this time.
            </p>
            <Link to="/training">
              <Button variant="outline">
                Browse all training modules
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Learning Paths */}
      {rolePaths.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-primary-600" />
              Learning Paths for {roleType.replace('-', ' ')}s
            </h2>
            {rolePaths.length > 2 && (
              <Link to="/learning-paths" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                View all ({rolePaths.length})
              </Link>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {rolePaths.slice(0, 2).map(path => renderPathCard(path))}
          </div>
        </div>
      )}

      {/* View All Training Modules */}
      <div className="pt-4 text-center">
        <Link to="/training">
          <Button>
            View All Training Modules
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}