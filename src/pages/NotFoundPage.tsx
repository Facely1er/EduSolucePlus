import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Shield,
  HelpCircle
} from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  const popularRoutes = [
    { path: '/', label: 'Home', icon: Home, description: 'Main landing page' },
    { path: '/dashboard', label: 'Dashboard', icon: Shield, description: 'User dashboard' },
    { path: '/training', label: 'Training', icon: BookOpen, description: 'Training modules' },
    { path: '/assessment', label: 'Assessment', icon: Shield, description: 'Compliance assessments' },
    { path: '/how-it-works', label: 'How It Works', icon: HelpCircle, description: 'Learn about EduSoluce™' },
    { path: '/contact', label: 'Contact', icon: HelpCircle, description: 'Get support' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="h-12 w-12 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h1>
          <p className="text-xl text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-muted-foreground">
            Check the URL for typos or use the navigation below to find what you need.
          </p>
        </div>

        {/* Popular Routes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Popular Pages</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {popularRoutes.map((route) => (
              <Link 
                key={route.path} 
                to={route.path}
                className="block p-4 border rounded-lg hover:bg-accent hover:border-accent-foreground transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                    <route.icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">{route.label}</h3>
                    <p className="text-sm text-muted-foreground">{route.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button onClick={() => navigate(-1)} className="flex-1 sm:flex-none">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button asChild className="flex-1 sm:flex-none">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 sm:flex-none">
            <Link to="/contact">
              <HelpCircle className="h-4 w-4 mr-2" />
              Get Help
            </Link>
          </Button>
        </div>

        {/* Search Suggestion */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-3">Can't find what you're looking for?</h3>
          <p className="text-muted-foreground mb-4">
            Try searching our site or browse through our main sections to find the information you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/training">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Training
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/resources">
                <Search className="h-4 w-4 mr-2" />
                Explore Resources
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/how-it-works">
                <HelpCircle className="h-4 w-4 mr-2" />
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-sm text-muted-foreground">
          <p>
            Still having trouble? Our support team is here to help.
          </p>
          <Button 
            variant="link" 
            className="p-0 h-auto text-sm"
            onClick={() => navigate('/contact')}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}