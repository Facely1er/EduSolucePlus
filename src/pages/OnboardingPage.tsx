import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Users, 
  Laptop, 
  Book,
  Lightbulb,
  GraduationCap,
  FileText,
  Target,
  Database
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { RoleSelectionWizard } from '../components/onboarding/RoleSelectionWizard';
import { useUser } from '../hooks/useSupabase';

export function OnboardingPage() {
  const { user, profile } = useUser();
  const [showGetStarted, setShowGetStarted] = useState(false);
  
  return (
    <div>
      <Breadcrumb />
      
      {/* Welcome Section */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to EduSoluce™</h1>
            <p className="text-blue-100 text-lg mb-6">
              Your journey to simplified educational privacy compliance starts here. EduSoluce™ helps educational institutions navigate complex privacy regulations with confidence.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {user ? (
                <Link to={profile ? `/role/${profile.role}` : '/dashboard'} title={profile ? `Access your ${profile.role.replace('-', ' ')} hub` : 'Choose your role-specific dashboard'}>
                  <Button className="bg-white text-primary-700 hover:bg-gray-100" title="Begin your privacy compliance journey">
                    {profile ? `Go to ${profile.role.replace('-', ' ')} Hub` : 'Go to Dashboard'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Button 
                    onClick={() => setShowGetStarted(true)}
                    className="bg-white text-primary-700 hover:bg-gray-100"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Link to="/login" title="Sign in to your existing account">
                    <Button variant="outline" className="border-white/30 hover:bg-white/20">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showGetStarted ? (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Select Your Role to Get Started</h2>
          <RoleSelectionWizard />
        </div>
      ) : (
        <>
          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">How EduSoluce™ Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">1. Assess</h3>
                <p className="text-muted-foreground text-sm">
                  Complete role-specific assessments to identify compliance gaps and establish your baseline understanding.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">2. Learn</h3>
                <p className="text-muted-foreground text-sm">
                  Access interactive training modules and resources tailored to your role and knowledge gaps.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">3. Implement</h3>
                <p className="text-muted-foreground text-sm">
                  Apply your knowledge with practical tools, templates, and action plans to enhance your institution's compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Role-Based Experience */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Choose Your Role-Based Experience</h2>
              <Button onClick={() => setShowGetStarted(true)} variant="outline">
                Launch Role Wizard <Lightbulb className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/role/administrator" className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Administrator</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    For principals, superintendents, and educational leaders responsible for institution-wide compliance.
                  </p>
                  <Button variant="outline" size="sm">
                    View Administrator Hub <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
              
              <Link to="/role/teacher" className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Teacher</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    For classroom educators who handle student information and educational technology.
                  </p>
                  <Button variant="outline" size="sm">
                    View Teacher Hub <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
              
              <Link to="/role/it-staff" className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <Laptop className="h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">IT Staff</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    For technology coordinators and staff who manage systems and data security.
                  </p>
                  <Button variant="outline" size="sm">
                    View IT Staff Hub <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
              
              <Link to="/role/student" className="block bg-white dark:bg-gray-800 rounded-lg border hover:shadow-lg transition-shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <Book className="h-12 w-12 text-amber-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Student</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    For students to learn about their privacy rights and digital safety practices.
                  </p>
                  <Button variant="outline" size="sm">
                    View Student Hub <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Key Benefits */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Simplified Compliance</h3>
                      <p className="text-sm text-muted-foreground">Transform complex privacy regulations into actionable steps tailored to your role.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Risk Reduction</h3>
                      <p className="text-sm text-muted-foreground">Identify and address privacy vulnerabilities before they lead to costly incidents.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Staff Development</h3>
                      <p className="text-sm text-muted-foreground">Enhance your team's privacy knowledge and skills with targeted training.</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Resource Efficiency</h3>
                      <p className="text-sm text-muted-foreground">Save time with ready-to-use templates, checklists, and implementation guides.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Confidence Building</h3>
                      <p className="text-sm text-muted-foreground">Develop confidence in your privacy practices with comprehensive assessments.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Continuous Improvement</h3>
                      <p className="text-sm text-muted-foreground">Track progress and adapt to evolving privacy requirements with ongoing support.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Get Started CTA */}
          <div className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg border p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Select your role to access a personalized dashboard with relevant assessments, training modules, and resources for your specific needs.
            </p>
            <Button onClick={() => setShowGetStarted(true)} size="lg" title="Start the role selection process">
              Choose Your Role <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                Already know what you need?
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/assessment" title="Jump straight to privacy assessments">
                  <Button variant="outline" size="sm">
                    <Target className="h-4 w-4 mr-2" />
                    Take Assessment
                  </Button>
                </Link>
                <Link to="/training" title="Browse professional development guides">
                  <Button variant="outline" size="sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Browse Training
                  </Button>
                </Link>
                <Link to="/privacy-policy" title="Access the privacy self-service portal">
                  <Button variant="outline" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    Privacy Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}