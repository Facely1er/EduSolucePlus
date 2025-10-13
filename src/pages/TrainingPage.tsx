import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle,
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Grid,
  List,
  User, 
  Shield,
  FileText,
  Target,
  GraduationCap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { LoadingState } from '../common/LoadingState';
import {
  trainingModules,
  trainingCategories,
  regulationTypes,
  skillLevels,
  targetRoles,
  type TrainingModule
} from '../data/trainingModulesData';

// Supabase integration
import { useUser, useTrainingProgress } from '../hooks/useSupabase';

interface FilterState {
  search: string;
  category: string;
  regulation: string;
  level: string;
  role: string;
  status: string;
}

interface TrainingModuleCardProps {
  module: TrainingModule & { status?: string; progress?: number; lastAccessed?: string };
  viewMode: 'grid' | 'list';
  isAuthenticated: boolean;
}

export function TrainingPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    regulation: '',
    level: '',
    role: '',
    status: ''
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const [forceShowContent, setForceShowContent] = useState(false);

  // Supabase hooks
  const { user, loading: userLoading, error: userError } = useUser();
  const { 
    progress: trainingProgress, 
    loading: progressLoading, 
    error: progressError 
  } = useTrainingProgress(user?.id);
  


  // Timeout mechanism to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userLoading && !forceShowContent) {
        console.warn('User loading timeout reached, forcing content display');
        setForceShowContent(true);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timer);
  }, [userLoading, forceShowContent]);


  // More resilient loading logic
  const shouldShowLoading = React.useCallback(() => {
    // Don't block on user loading if we've forced content or if user loading is taking too long
    if (forceShowContent) return false;
    
    // Only show loading if we're actually waiting for critical data
    // User loading should not block the page indefinitely
    return progressLoading || (userLoading && user === undefined);
  }, [forceShowContent, progressLoading, userLoading, user]);

  const overallLoading = shouldShowLoading();
  const overallError = userError || progressError;

  // Debug info effect (development only)
  useEffect(() => {
    if (import.meta.env.DEV) {
      let info = `userLoading: ${userLoading}, progressLoading: ${progressLoading}\n`;
      info += `forceShowContent: ${forceShowContent}\n`;
      info += `shouldShowLoading: ${shouldShowLoading()}\n`;
      info += `userError: ${userError ? JSON.stringify(userError) : 'none'}\n`;
      info += `progressError: ${progressError || 'none'}\n`;
      info += `user: ${user ? 'logged in' : user === null ? 'not logged in' : 'undefined'}\n`;
      info += `network: ${navigator.onLine ? 'online' : 'offline'}`;
      
      console.log('Training page debug info:', info);
    }
  }, [userLoading, progressLoading, userError, progressError, user, forceShowContent, shouldShowLoading]);

  // Merge static modules with user progress
  const modulesWithProgress = useMemo(() => {
    if (!user || !trainingProgress || trainingProgress.length === 0) {
      if (import.meta.env.DEV) {
        console.log('Using static training modules (no user or progress)');
      }
      return trainingModules.map(module => ({
        ...module,
        status: 'not-started',
        progress: 0
      }));
    }
    
    if (import.meta.env.DEV) {
      console.log('Merging user progress with modules');
    }
    return trainingModules.map(module => {
      const userProgress = trainingProgress.find(p => p.module_id === module.id);
      return {
        ...module,
        status: userProgress?.status || 'not-started',
        progress: userProgress?.progress || 0,
        lastAccessed: userProgress?.last_accessed
      };
    });
  }, [trainingProgress, user]);

  // Filter modules based on current filters and user progress
  const filteredModules = useMemo(() => {
    return modulesWithProgress.filter(module => {
      if (filters.search && !module.title.toLowerCase().includes(filters.search.toLowerCase()) && 
          !module.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.category && module.category !== filters.category) return false;
      if (filters.regulation && module.regulation !== filters.regulation) return false;
      if (filters.level && module.level !== filters.level) return false;
      if (filters.role && !module.targetRoles.includes(filters.role as 'administrator' | 'teacher' | 'it-staff' | 'student')) return false;
      if (filters.status) {
        if (filters.status === 'completed' && module.status !== 'completed') return false;
        if (filters.status === 'in-progress' && module.status !== 'in-progress') return false;
        if (filters.status === 'not-started' && module.status !== 'not-started') return false;
      }
      return true;
    });
  }, [filters, modulesWithProgress]);

  // Get modules by status
  const inProgressModules = user ? modulesWithProgress.filter(module => module.status === 'in-progress') : [];
  const completedModules = user ? modulesWithProgress.filter(module => module.status === 'completed') : []; 

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: '',
      regulation: '',
      level: '',
      role: '',
      status: ''
    });
  }, []);

  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  
  // Helper function to retry loading
  const handleRetry = useCallback(() => {
    setForceShowContent(false);
    window.location.reload();
  }, []);



  // If there's a critical error and no content is available, show error
  if (overallError && !forceShowContent && modulesWithProgress.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          <LoadingState
            loading={false}
            error="Could not load training data. Please try again later."
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Only show loading if we don't have basic content to display */}
        {overallLoading && !forceShowContent ? (
          <LoadingState
            loading={true}
            error={null}
            onRetry={handleRetry}
          />
        ) : (
          <>
            {/* Show loading warning if forced to show content */}
            {forceShowContent && userLoading && (
              <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      Some features may be limited due to connection issues. User data is still loading.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
        
            
            {/* Header Section */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-4"> Professional Development Guides</h1>
                <p className="text-blue-100 mb-6 max-w-2xl">
                  Stay compliant and enhance your skills with our comprehensive guides,covering 
                  privacy regulations, cybersecurity, and best practices for educational technology.
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span className="text-sm font-medium">Modules</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{trainingModules.length}</p>
                  </div>
                  
                  {user ? (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-sm font-medium">In Progress</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">{inProgressModules.length}</p>
                    </div>
                  ) : (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5" />
                        <span className="text-sm font-medium">Guest Mode</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">Active</p>
                    </div>
                  )}
                  
                  {user ? (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Award className="h-5 w-5" /> 
                        <span className="text-sm font-medium">Guides Completed</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">{completedModules.length}</p>
                    </div>
                  ) : (
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span className="text-sm font-medium">Privacy</span>
                      </div>
                      <p className="text-2xl font-bold mt-2">Protected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search training modules..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                      value={filters.search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-1">
                        {Object.values(filters).filter(v => v !== '').length}
                      </Badge>
                    )}
                  </Button>
                  
                  <div className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                    <Button
                      size="sm"
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      onClick={() => setViewMode('grid')}
                      className="p-2"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      onClick={() => setViewMode('list')}
                      className="p-2"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={filters.category}
                        onChange={(e) => updateFilter('category', e.target.value)}
                      >
                        <option value="">All Categories</option>
                        {trainingCategories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Regulation
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={filters.regulation}
                        onChange={(e) => updateFilter('regulation', e.target.value)}
                      >
                        <option value="">All Regulations</option>
                        {regulationTypes.map(regulation => (
                          <option key={regulation.id} value={regulation.id}>{regulation.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Level
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={filters.level}
                        onChange={(e) => updateFilter('level', e.target.value)}
                      >
                        <option value="">All Levels</option>
                        {skillLevels.map(level => (
                          <option key={level.id} value={level.id}>{level.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Target Role
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={filters.role}
                        onChange={(e) => updateFilter('role', e.target.value)}
                      >
                        <option value="">All Roles</option>
                        {targetRoles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    {user && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Status
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          value={filters.status}
                          onChange={(e) => updateFilter('status', e.target.value)}
                        >
                          <option value="">All Status</option>
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    )}
                  </div>
                  
                  {hasActiveFilters && (
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" onClick={clearFilters} className="flex items-center space-x-2">
                        <X className="h-4 w-4" />
                        <span>Clear Filters</span>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Training Modules Grid/List */}
            <div className="space-y-6">
              {filteredModules.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No modules found</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter criteria.
                  </p>
                  <div className="mt-4 space-y-2">
                    <Link to="/learning-paths" title="Explore structured learning paths">
                      <Button variant="outline">
                        Explore learning paths
                      </Button>
                    </Link>
                    <Link to="/assessment" title="Take assessments to get personalized training recommendations">
                      <Button variant="outline">
                        Take assessment for recommendations
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
                }>
                  {filteredModules.map((module) => (
                    <TrainingModuleCard 
                      key={module.id} 
                      module={module} 
                      viewMode={viewMode}
                      isAuthenticated={!!user}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Related Content Links */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4">Enhance Your Learning Journey</h3>
              <p className="text-muted-foreground mb-6">
                Maximize your privacy education with our additional resources and structured learning paths.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/learning-paths" title="Explore structured learning paths for comprehensive skill development">
                  <Button variant="outline">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Browse learning paths
                  </Button>
                </Link>
                <Link to="/resources" title="Access downloadable templates and tools">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Download resources
                  </Button>
                </Link>
                <Link to="/assessment" title="Assess your current knowledge and get personalized recommendations">
                  <Button variant="outline">
                    <Target className="mr-2 h-4 w-4" />
                    Test your knowledge
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TrainingModuleCard({ module, viewMode: _viewMode, isAuthenticated }: TrainingModuleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'not-started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const ProgressBar = ({ progress = 0 }: { progress?: number }) => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
      <div
        className="bg-primary-600 h-1.5 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <Link 
      to={`/training/${module.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex items-center justify-between mb-4">
        {isAuthenticated && module.status && (
          <Badge className={getStatusColor(module.status)}>
            {module.status?.replace('-', ' ')}
          </Badge>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {module.duration} min
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {module.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
        {module.description}
      </p>
      
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            {module.category}
          </Badge>
          <Badge variant={module.regulation} className="text-xs">
            {module.regulation.toUpperCase()}
          </Badge>
          <Badge level={module.level} className="text-xs">
            {module.level}
          </Badge>
        </div>
        
        {isAuthenticated && module.status === 'in-progress' && module.progress !== undefined && (
          <ProgressBar progress={module.progress} />
        )}
      </div>
    </Link>
  );
}