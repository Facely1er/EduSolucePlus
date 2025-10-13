import { useUser } from './useSupabase';

// Re-export useUser as useAuth for compatibility
export const useAuth = useUser;

// Also export individual functions for convenience
export const { 
  user, 
  profile, 
  loading: isLoading, 
  error, 
  signIn, 
  signUp, 
  signOut, 
  updateProfile 
} = useUser;

// Add checkingSession state for RequireAuth compatibility
export function useAuthWithSessionCheck() {
  const authData = useUser();
  
  return {
    ...authData,
    checkingSession: authData.loading
  };
}