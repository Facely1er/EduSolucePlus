import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { useNotifications, createNotification } from '../contexts/NotificationContext';
import { AdministratorDashboard } from './dashboards/AdministratorDashboard';
import { TeacherDashboard } from './dashboards/TeacherDashboard';
import { ITStaffDashboard } from './dashboards/ITStaffDashboard';
import { StudentDashboard } from './dashboards/StudentDashboard';
import { 
  CheckCircle, 
  Shield, 
  Users, 
  Laptop, 
  Book, 
  RotateCcw, 
  Trash2, 
  AlertCircle, 
  ArrowLeft 
} from 'lucide-react';

// Simple Role Selection Wizard component (you may want to create a separate file for this)
function RoleSelectionWizard() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Select the dashboard that matches your role to get started
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/role/administrator" className="group">
          <div className="p-6 border rounded-lg hover:border-primary transition-colors h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Administrator Hub</h3>
            </div>
            <p className="text-muted-foreground">
              Manage users, configure system settings, and oversee security policies
            </p>
          </div>
        </Link>
        
        <Link to="/role/teacher" className="group">
          <div className="p-6 border rounded-lg hover:border-primary transition-colors h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Teacher Hub</h3>
            </div>
            <p className="text-muted-foreground">
              Access student progress, manage assessments, and track learning outcomes
            </p>
          </div>
        </Link>
        
        <Link to="/role/it-staff" className="group">
          <div className="p-6 border rounded-lg hover:border-primary transition-colors h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Laptop className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">IT Staff Hub</h3>
            </div>
            <p className="text-muted-foreground">
              Monitor system performance, manage technical infrastructure, and support users
            </p>
          </div>
        </Link>
        
        <Link to="/role/student" className="group">
          <div className="p-6 border rounded-lg hover:border-primary transition-colors h-full">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Book className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Student Hub</h3>
            </div>
            <p className="text-muted-foreground">
              Complete assessments, track progress, and access learning materials
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { role } = useParams<{ role?: string }>();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showWizard, setShowWizard] = useState(true);
  const { addNotification } = useNotifications();

  const handleResetDemoData = () => {
    try {
      // Get all localStorage keys
      const localStorageKeys = Object.keys(localStorage);
      
      // Remove all keys except theme (which is managed by ThemeProvider)
      localStorageKeys.forEach(key => {
        if (key !== 'theme') {
          localStorage.removeItem(key);
        }
      });
      
      // Get all sessionStorage keys and clear them all
      const sessionStorageKeys = Object.keys(sessionStorage);
      sessionStorageKeys.forEach(key => {
        sessionStorage.removeItem(key);
      });
      
      setShowResetConfirm(false);
      setResetSuccess(true);
      
      // Add notification for data reset
      addNotification(createNotification.dataReset());
      
      // Hide success message after a brief moment, then reload the page
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Error resetting demo data:', error);
      alert('Error resetting demo data. Please try again.');
    }
  };

  // If no role is specified, show dashboard selection
  if (!role) {
    return (
      <div className="container py-8">
        <Breadcrumb />
        
        {/* Success Message */}
        {resetSuccess && (
          <div className="mb-8 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Demo data has been successfully reset!</span>
            </div>
          </div>
        )}
        
        {showWizard ? (
          <div>
            <RoleSelectionWizard />
            <div className="mt-4 text-center">
              <button 
                onClick={() => setShowWizard(false)} 
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Skip wizard and show simple view
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/role/administrator">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Shield className="h-6 w-6" />
                  Administrator Hub
                </Button>
              </Link>
              <Link to="/role/teacher">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Teacher Hub
                </Button>
              </Link>
              <Link to="/role/it-staff">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Laptop className="h-6 w-6" />
                  IT Staff Hub
                </Button>
              </Link>
              <Link to="/role/student">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Book className="h-6 w-6" />
                  Student Hub
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => setShowWizard(true)} 
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Show detailed role selection wizard
              </button>
            </div>
          </div>
        )}
        
        {/* Reset Demo Data Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
              <RotateCcw className="h-5 w-5" />
              Reset Demo Data
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto text-center">
              Clear all stored demo data including assessment progress, training completion, and user preferences. 
              This will reset the application to its initial state (theme settings will be preserved).
            </p>
            
            {/* Reset Demo Data Button */}
            {!showResetConfirm ? (
              <Button 
                variant="outline" 
                onClick={() => setShowResetConfirm(true)}
                className="mx-auto block border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Reset Demo Data
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 dark:text-red-300 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Confirm Reset</span>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    This action cannot be undone. All demo data will be permanently removed.
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowResetConfirm(false)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleResetDemoData}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Yes, Reset Data
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render the appropriate dashboard based on role
  switch (role) {
    case 'administrator':
      return <AdministratorDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'it-staff':
      return <ITStaffDashboard />;
    case 'student':
      return <StudentDashboard />;
    default:
      // If invalid role, show not found message
      return (
        <div className="container py-8">
          <Breadcrumb />
          <div className="text-center bg-white dark:bg-gray-900 rounded-lg border p-12">
            <div className="max-w-md mx-auto">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Dashboard Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The requested dashboard role could not be found. Please select a valid dashboard from the options below.
              </p>
              <div className="space-y-3">
                <Link to="/dashboard">
                  <Button className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard Selection
                  </Button>
                </Link>
                <Link to="/dashboard/administrator">
                  <Button variant="outline" className="w-full">
                    Administrator Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
  }
}