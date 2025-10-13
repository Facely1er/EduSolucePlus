// Role-based access control hook
import React, { useMemo } from 'react';
import { Shield } from 'lucide-react';
import { useUser } from './useSupabase';

type Permission = 
  | 'manage_users'
  | 'view_all_assessments'
  | 'manage_compliance'
  | 'view_audit_logs'
  | 'manage_incidents'
  | 'manage_vendors'
  | 'view_sensitive_data'
  | 'export_data'
  | 'manage_consent'
  | 'view_analytics'
  | 'manage_system_settings';

const rolePermissions: Record<string, Permission[]> = {
  administrator: [
    'manage_users',
    'view_all_assessments', 
    'manage_compliance',
    'view_audit_logs',
    'manage_incidents',
    'manage_vendors',
    'view_sensitive_data',
    'export_data',
    'manage_consent',
    'view_analytics',
    'manage_system_settings'
  ],
  teacher: [
    'view_all_assessments',
    'manage_consent',
    'view_analytics'
  ],
  'it-staff': [
    'manage_compliance',
    'view_audit_logs',
    'manage_incidents',
    'manage_vendors',
    'export_data',
    'view_analytics',
    'manage_system_settings'
  ],
  student: [
    'view_analytics'
  ]
};

export function usePermissions() {
  const { profile, user } = useUser();
  
  const permissions = useMemo(() => {
    if (!profile?.role) return [];
    return rolePermissions[profile.role] || [];
  }, [profile?.role]);

  const hasPermission = (permission: Permission): boolean => {
    return permissions.includes(permission);
  };

  const hasAnyPermission = (requiredPermissions: Permission[]): boolean => {
    return requiredPermissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (requiredPermissions: Permission[]): boolean => {
    return requiredPermissions.every(permission => hasPermission(permission));
  };

  // Check if user can access specific data types
  const canAccessSensitiveData = (): boolean => {
    return hasPermission('view_sensitive_data');
  };

  const canManageUsers = (): boolean => {
    return hasPermission('manage_users');
  };

  const canExportData = (): boolean => {
    return hasPermission('export_data');
  };

  const canManageCompliance = (): boolean => {
    return hasPermission('manage_compliance');
  };

  return {
    permissions,
    role: profile?.role,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessSensitiveData,
    canManageUsers,
    canExportData,
    canManageCompliance,
    isAuthenticated: !!user
  };
}

// Higher-order component for permission-based rendering
export function withPermissions<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermissions: Permission[],
  fallback?: React.ComponentType
) {
  return function PermissionWrappedComponent(props: P) {
    const { hasAllPermissions } = usePermissions();
    
    if (!hasAllPermissions(requiredPermissions)) {
      if (fallback) {
        const FallbackComponent = fallback;
        return <FallbackComponent />;
      }
      
      return (
        <div className="bg-white dark:bg-gray-900 rounded-lg border p-8 text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">
            You don't have permission to access this feature.
          </p>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}