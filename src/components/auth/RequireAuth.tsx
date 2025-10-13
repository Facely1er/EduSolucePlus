import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingState } from '../../common/LoadingState';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export function RequireAuth({ 
  children, 
  allowedRoles, 
  redirectTo = '/login' 
}: RequireAuthProps) {
  const { user, profile, isLoading, checkingSession } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading || checkingSession) {
    return (
      <LoadingState 
        loading={true} 
        loadingMessage="Verifying authentication..." 
      />
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access if specified
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = profile?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirect to unauthorized page or dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

// Convenience components for specific roles
export function RequireAdministrator({ children }: { children: React.ReactNode }) {
  return <RequireAuth allowedRoles={['administrator']}>{children}</RequireAuth>;
}

export function RequireTeacher({ children }: { children: React.ReactNode }) {
  return <RequireAuth allowedRoles={['teacher']}>{children}</RequireAuth>;
}

export function RequireITStaff({ children }: { children: React.ReactNode }) {
  return <RequireAuth allowedRoles={['it-staff']}>{children}</RequireAuth>;
}

export function RequireStudent({ children }: { children: React.ReactNode }) {
  return <RequireAuth allowedRoles={['student']}>{children}</RequireAuth>;
}

export function RequireStaff({ children }: { children: React.ReactNode }) {
  return <RequireAuth allowedRoles={['administrator', 'teacher', 'it-staff']}>{children}</RequireAuth>;
}