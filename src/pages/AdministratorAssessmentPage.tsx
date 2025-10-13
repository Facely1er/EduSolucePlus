import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, BookOpen, GraduationCap, Database } from 'lucide-react';
import { IndividualAssessmentCard } from '../components/assessments/IndividualAssessmentCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { administratorAssessments } from '../data/administratorAssessments';
import { AnonymousBrowsingNotice } from '../components/auth/AnonymousBrowsingNotice';

export function AdministratorAssessmentPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRegulation, setSelectedRegulation] = React.useState<string>('all');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<string>('title');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  // Filter and sort assessments
  const filteredAssessments = (administratorAssessments || []).filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegulation = selectedRegulation === 'all' || assessment.regulation === selectedRegulation;
    const matchesLevel = selectedLevel === 'all' || assessment.level === selectedLevel;
    
    return matchesSearch && matchesRegulation && matchesLevel;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'time':
        return a.estimatedTime - b.estimatedTime;
      case 'questions':
        return a.questions - b.questions;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredAssessments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssessments = filteredAssessments.slice(startIndex, startIndex + itemsPerPage);

  const regulations = ['all', 'ferpa', 'coppa', 'gdpr', 'general'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="container py-8">
      <AnonymousBrowsingNotice />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Administrator Assessments
        </h1>
        <p className="text-muted-foreground">
          Complete these assessments to evaluate and improve your privacy compliance knowledge ({filteredAssessments.length} assessments)
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
            />
          </div>

          {/* Regulation Filter */}
          <div>
            <select
              value={selectedRegulation}
              onChange={(e) => setSelectedRegulation(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              {regulations.map(reg => (
                <option key={reg} value={reg}>
                  {reg === 'all' ? 'All Regulations' : reg.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="title">Sort by Title</option>
              <option value="time">Sort by Time</option>
              <option value="questions">Sort by Questions</option>
            </select>
          </div>
        </div>
        
        {/* Active Filters */}
        {(searchTerm || selectedRegulation !== 'all' || selectedLevel !== 'all') && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <Badge variant="general">
                Search: "{searchTerm}"
              </Badge>
            )}
            {selectedRegulation !== 'all' && (
              <Badge variant={selectedRegulation as 'default' | 'secondary' | 'destructive' | 'outline'}>
                {selectedRegulation.toUpperCase()}
              </Badge>
            )}
            {selectedLevel !== 'all' && (
              <Badge level={selectedLevel as 'beginner' | 'intermediate' | 'advanced'}>
                {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedRegulation('all');
                setSelectedLevel('all');
                setCurrentPage(1);
              }}
              className="h-6 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {paginatedAssessments.map((assessment) => (
          <IndividualAssessmentCard
            key={assessment.id}
            assessment={assessment}
            role="administrator"
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAssessments.length)} of {filteredAssessments.length} assessments
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Related Content Section */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-950 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Enhance Your Compliance Knowledge</h2>
        <p className="text-muted-foreground mb-4">
          Looking to further strengthen your institution's privacy posture? Explore our curated professional guides and comprehensive learning paths designed specifically for administrators.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/resources/professional-guides" title="Access administrator-specific training guides">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" /> 
              Professional development guides
            </Button>
          </Link>
          <Link to="/learning-paths" title="Explore structured learning paths for administrators">
            <Button variant="outline">
              <GraduationCap className="mr-2 h-4 w-4" /> 
              Learning paths
            </Button>
          </Link>
          <Link to="/privacy-policy" title="Access the privacy self-service portal">
            <Button variant="outline">
              <Database className="mr-2 h-4 w-4" /> 
              Privacy portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}