import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Building, 
  Users, 
  Database,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description: string;
  requiresPermission?: string[];
  badge?: {
    text: string;
    variant: 'default' | 'success' | 'warning' | 'error';
  };
}

export function PrivacyPortalSidebar() {
  const location = useLocation();

  const sidebarItems: SidebarItem[] = [
    {
      title: 'Privacy Dashboard',
      href: '/privacy/dashboard',
      icon: LayoutDashboard,
      description: 'Overview of privacy compliance status'
    },
    {
      title: 'Data Rights Portal',
      href: '/privacy/data-rights',
      icon: FileText,
      description: 'Manage data subject access requests'
    },
    {
      title: 'Compliance Obligations',
      href: '/privacy/obligations',
      icon: CheckCircle,
      description: 'Track regulatory compliance requirements',
    },
    {
      title: 'Privacy Incidents',
      href: '/privacy/incidents',
      icon: AlertTriangle,
      description: 'Report and manage privacy incidents',
    },
    {
      title: 'Vendor Assessments',
      href: '/privacy/vendors',
      icon: Building,
      description: 'Evaluate third-party privacy compliance',
    },
    {
      title: 'Consent Management',
      href: '/privacy/consent',
      icon: Users,
      description: 'Track parental consent and preferences',
    },
    {
      title: 'Automation & Analytics',
      href: '/privacy/automation',
      icon: BarChart3,
      description: 'Configure automation and view insights',
    },
    {
      title: 'Reports',
      href: '/privacy/reports',
      icon: FileText,
      description: 'Generate compliance reports',
    }
  ];

  const isActive = (href: string) => {
    return location.pathname === href || 
           (href !== '/privacy/dashboard' && location.pathname.startsWith(href));
  };

  const canAccessItem = () => {
    return true; // For now, allow access to all items
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Database className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          <div>
            <h2 className="font-bold text-lg">Privacy Portal</h2>
            <p className="text-xs text-muted-foreground">Self-Service Compliance</p>
          </div>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            if (!canAccessItem(item)) return null;
            
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-muted-foreground hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs opacity-75 truncate">{item.description}</div>
                </div>
                {item.badge && (
                  <Badge 
                    variant={item.badge.variant as 'default' | 'ferpa' | 'coppa' | 'gdpr' | 'ccpa' | 'cpra' | 'pipeda' | 'bipa' | 'shield' | 'sopipa' | 'vcdpa' | 'general'}
                    className="text-xs"
                  >
                    {item.badge.text}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-medium text-sm mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Compliance Score</span>
              <span className="font-medium text-green-600">78%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Open Requests</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Active Incidents</span>
              <span className="font-medium text-amber-600">2</span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <HelpCircle className="h-4 w-4 mr-2" />
            Privacy Portal Help
          </Button>
        </div>
      </div>
    </div>
  );
}