import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  TrendingUp,
  ChevronRight,
  X,
  GraduationCap,
  Target
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { LoadingState } from '../common/LoadingState';
import {
  learningPaths,
  trainingModules,
  regulationTypes,
  skillLevels,
  targetRoles,
  type LearningPath
} from '../data/trainingModulesData';

interface FilterState {
  search: string;
  regulation: string;
  level: string;
  role: string;
}

export function LearningPathsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    regulation: '',
    level: '',
    role: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading] = useState(false);

  // Filter learning paths based on current filters
  const filteredPaths = learningPaths.filter(path => {
    if (filters.search && !path.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !path.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.regulation && path.regulation !== filters.regulation) return false;
    if (filters.level && path.level !== filters.level) return false;
    if (filters.role && path.targetRole !== filters.role) return false;
    return true;
  });

  // Get module titles for each path (available for future use)
  // const getModuleTitles = (moduleIds: string[]) => {
  //   return moduleIds.map(id => {
  //     const module = trainingModules.find(m => m.id === id);
  //     return module ? module.title : 'Unknown module';
  //   });
  // };

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      regulation: '',
      level: '',
      role: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Learning Paths</h1>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Follow structured learning paths designed for specific roles and regulatory domains.
              Each path provides a comprehensive journey through multiple training modules.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <span className="text-sm font-medium">Learning Paths</span>
                </div>
                <p className="text-2xl font-bold mt-1">{learningPaths.length}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  <span className="text-sm font-medium">Target Roles</span>
                </div>
                <p className="text-2xl font-bold mt-1">{new Set(learningPaths.map(p => p.targetRole)).size}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span className="text-sm font-medium">Guide Collections</span>
                </div>
                <p className="text-2xl font-bold mt-1">{learningPaths.filter(p => p.certification).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search learning paths..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-1">
                    {Object.values(filters).filter(v => v !== '').length}
                  </Badge>
                )}
              </Button>
              
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Regulation Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Regulation
                  </label>
                  <select
                    className="w-full p-2 border border-input rounded-md bg-background text-sm"
                    value={filters.regulation}
                    onChange={(e) => updateFilter('regulation', e.target.value)}
                  >
                    <option value="">All Regulations</option>
                    {Object.values(regulationTypes).map((regulation) => (
                      <option key={regulation.id} value={regulation.id}>{regulation.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Skill Level
                  </label>
                  <select
                    className="w-full p-2 border border-input rounded-md bg-background text-sm"
                    value={filters.level}
                    onChange={(e) => updateFilter('level', e.target.value)}
                  >
                    <option value="">All Levels</option>
                    {Object.values(skillLevels).map((level) => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>
                
                {/* Role Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Target Role
                  </label>
                  <select
                    className="w-full p-2 border border-input rounded-md bg-background text-sm"
                    value={filters.role}
                    onChange={(e) => updateFilter('role', e.target.value)}
                  >
                    <option value="">All Roles</option>
                    {Object.values(targetRoles).map((role) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Learning Paths List */}
        <LoadingState loading={loading}>
          {filteredPaths.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No learning paths found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find relevant learning paths.
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters}>Clear Filters</Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPaths.map((path) => (
                <LearningPathCard key={path.id} path={path} />
              ))}
            </div>
          )}
        </LoadingState>
      </div>
    </div>
  );
}

// Learning Path Card Component
interface LearningPathCardProps {
  path: LearningPath;
}

function LearningPathCard({ path }: LearningPathCardProps) {
  const modules = path.moduleIds.map(id => 
    trainingModules.find(m => m.id === id)
  ).filter(Boolean);
  
  const totalDuration = modules.reduce((sum, module) => 
    sum + (module?.duration || 0), 0
  );
  
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge level="beginner">Easy</Badge>;
      case 'moderate':
        return <Badge level="intermediate">Moderate</Badge>;
      case 'challenging':
        return <Badge level="advanced">Challenging</Badge>;
      default:
        return <Badge variant="general">Moderate</Badge>;
    }
  };
  
  return (
    <Link
      to={`/learning-paths/${path.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
      title={`Explore ${path.title} - ${path.description}`}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Path Icon and Main Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge variant={path.regulation}>
                {path.regulation.toUpperCase()}
              </Badge>
              {getDifficultyBadge(path.difficulty)}
            </div>

            <h2 className="text-xl font-semibold mb-2">{path.title}</h2>
            <p className="text-muted-foreground mb-4">{path.description}</p>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{path.moduleIds.length} modules</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>~{path.duration} hours</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>For {path.targetRole.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
          
          {/* Progress or Enrollment */}
          <div className="flex items-center">
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
        
        {/* Module List Preview */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Included Modules</h3>
            <span className="text-sm text-muted-foreground">{totalDuration} min total</span>
          </div>
          <div className="space-y-2">
            {modules.slice(0, 3).map((module, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                <span className="text-muted-foreground">{module?.title}</span>
              </div>
            ))}
            {modules.length > 3 && (
              <div className="text-sm text-primary-600">
                +{modules.length - 3} more modules
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}