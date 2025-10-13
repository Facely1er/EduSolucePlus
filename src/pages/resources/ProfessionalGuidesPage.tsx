import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  BookOpen, 
  Play, 
  Clock, 
  CheckCircle, 
  Star,
  Users,
  ChevronRight,
  Search,
  Filter,
  Shield,
  Laptop,
  Book
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/ui/Breadcrumb';

// Import from training data
import { 
  trainingModules, 
  learningPaths,
  regulationTypes,
  skillLevels,
  targetRoles
} from '../../data/trainingModulesData';

export function ProfessionalGuidesPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRegulation, setSelectedRegulation] = React.useState('');
  const [selectedLevel, setSelectedLevel] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState('');
  
  // Filter modules based on search and filters
  const filteredModules = trainingModules
    .filter(module => {
      const matchesSearch = searchTerm === '' || 
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesRegulation = selectedRegulation === '' || module.regulation === selectedRegulation;
      const matchesLevel = selectedLevel === '' || module.level === selectedLevel;
      const matchesRole = selectedRole === '' || module.targetRoles.includes(selectedRole as any);
      
      return matchesSearch && matchesRegulation && matchesLevel && matchesRole;
    })
    .slice(0, 6); // Limit to 6 for the landing page
  
  // Featured learning paths
  const featuredPaths = learningPaths.slice(0, 3);
  
  // Role-specific content sections
  const roleIcons = {
    administrator: <Shield className="h-6 w-6 text-blue-500" />,
    teacher: <Users className="h-6 w-6 text-green-500" />,
    'it-staff': <Laptop className="h-6 w-6 text-purple-500" />,
    student: <Book className="h-6 w-6 text-amber-500" />
  };

  return (
    <div className="container py-8">
      <Breadcrumb />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Professional Guides</h1>
        <p className="text-muted-foreground">
          Interactive educational resources to enhance your privacy and compliance knowledge
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm"
            />
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedRegulation}
              onChange={(e) => setSelectedRegulation(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="">All Regulations</option>
              {Object.values(regulationTypes).map(regulation => (
                <option key={regulation.id} value={regulation.id}>{regulation.name}</option>
              ))}
            </select>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="">All Levels</option>
              {Object.values(skillLevels).map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="">All Roles</option>
              {Object.values(targetRoles).map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Training Modules */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <GraduationCap className="h-6 w-6 mr-2 text-primary" />
            Featured Guides
          </h2>
          <Link to="/training" title="Browse all professional development guides">
            <Button variant="outline" size="sm">
              View all training guides
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Link
              key={module.id}
              to={`/training/${module.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg border hover:shadow-md transition-shadow p-6"
              title={`Start ${module.title} training module`}
            >
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={module.regulation}>{module.regulation.toUpperCase()}</Badge>
                  <Badge level={module.level}>{module.level}</Badge>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{module.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{module.duration} min</span>
                </div>
                
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Begin training
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-primary" />
            Guide Collections
          </h2>
          <Link to="/learning-paths" title="Explore all structured learning paths">
            <Button variant="outline" size="sm">
              View all learning paths
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredPaths.map((path) => (
            <Link
              key={path.id}
              to={`/learning-paths/${path.id}`}
              className="bg-white dark:bg-gray-800 rounded-lg border hover:shadow-md transition-shadow p-6"
              title={`Start ${path.title} learning path`}
            >
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={path.regulation}>{path.regulation.toUpperCase()}</Badge>
                  <Badge level={path.level}>{path.level}</Badge>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{path.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{path.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>{path.moduleIds.length} modules</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {path.duration} hours
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Role-Based Guides */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Role-Based Guides</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {Object.keys(roleIcons).map((role) => (
            <div key={role} className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  {roleIcons[role as keyof typeof roleIcons]}
                </div>
                <h3 className="font-semibold text-lg capitalize">{role.replace('-', ' ')} Guides</h3>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Specialized training content designed specifically for {role.replace('-', ' ')}s to enhance privacy knowledge and skills.
              </p>
              
              <Link to={`/role/${role}?tab=training`}>
                <Button className="w-full" title={`Access ${role.replace('-', ' ')} specific training content`}>
                  View {role.replace('-', ' ')} training guides
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Learning Statistics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Learning Impact</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">500+</div>
            <div className="text-sm text-muted-foreground">Professionals Trained</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">95%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Training Modules</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-1">4.8/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Certification Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Professional Certification</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Privacy Compliance Certification Program</h3>
              <p className="text-muted-foreground mb-4">
                Earn industry-recognized certifications by completing our comprehensive training programs. 
                Our certifications demonstrate your expertise in educational privacy compliance and can help 
                advance your career in data protection.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Available Certifications:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• FERPA Compliance Specialist</li>
                    <li>• COPPA Implementation Expert</li>
                    <li>• GDPR Data Protection Officer</li>
                    <li>• Educational Privacy Manager</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Certification Benefits:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Industry recognition</li>
                    <li>• Career advancement</li>
                    <li>• Continuing education credits</li>
                    <li>• Professional network access</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/certificate">
                  <Button>
                    View Certifications
                  </Button>
                </Link>
                <Link to="/training">
                  <Button variant="outline">
                    Start Training
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-linking to related content */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Continue Your Learning Journey</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="font-medium mb-2">Test Your Knowledge</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Validate your understanding with role-specific assessments
            </p>
            <Link to="/assessment" title="Take privacy compliance assessments">
              <Button variant="outline" size="sm">
                Take assessments
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-2">Access Resources</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Download templates and tools for implementation
            </p>
            <Link to="/resources" title="Download privacy compliance resources">
              <Button variant="outline" size="sm">
                Browse resources
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h3 className="font-medium mb-2">Manage Privacy</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use our self-service portal for privacy management
            </p>
            <Link to="/privacy-policy" title="Access the privacy self-service portal">
              <Button variant="outline" size="sm">
                Privacy portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}