// src/hooks/useSupabase.ts
import { useState, useEffect } from 'react'
import { supabase, type Profile, type AssessmentResult, type TrainingProgress } from '../lib/supabase'
import { SchemaService } from '../services/schemaService'
import { progressStorage, networkStatus } from '../utils/storage';

// Authentication hook
export function useUser() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Get initial session
    const loadSession = async () => {
      console.log('useUser - loadSession called');
      setLoading(true)
      setError(null)
      try {
        // Check if Supabase environment variables are set
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          console.warn('Supabase environment variables are missing. Running in demo mode.');
          // In demo mode, set no user and continue
          setUser(null);
          setProfile(null);
          setLoading(false);
          return;
        }
        
        // Check the session, with proper error handling
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          setError(sessionError)
          setLoading(false)
          return
        }
        
        setUser(session?.user ?? null)
        console.log('useUser - session loaded', { 
          hasUser: !!session?.user,
          userId: session?.user?.id
        });
        
        if (session?.user) {
          // Await the profile fetch to ensure it's loaded before setting loading to false
          await fetchProfile(session.user.id)
        } else {
          // No user, so we're done loading
          setLoading(false)
        }
      } catch (err) {
        console.error('Error loading session:', err)
        setError(err)
        setLoading(false)
      }
    }
    
    loadSession()

    // Listen for auth changes
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setLoading(true)
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await fetchProfile(session.user.id)
          } else {
            setProfile(null)
            setLoading(false)
          }
        }
      )

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    } catch (err) {
      console.error('Error setting up auth state change listener:', err)
      setError(err)
      setLoading(false)
      return () => {}; // Return empty cleanup function
    }

  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      console.log('useUser - fetchProfile called for userId:', userId);
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      // Handle specific error cases
      if (status === 401) {
        console.error('Unauthorized: Invalid API key or session');
        setError(new Error('Authentication error: Please check your Supabase credentials.'));
        setLoading(false);
        return;
      }
      
      if (error) {
        console.error('Error fetching profile:', error)
        console.log('useUser - profile fetch error:', error.message);
        setError(error)
      } else if (data) {
        console.log('useUser - profile fetched successfully:', { 
          hasData: !!data,
          role: data?.role
        });
        setProfile(data)
        setLoading(false)
        console.log('useUser - loading set to false after profile fetch complete');
      } else {
        // No profile data found
        console.log('useUser - no profile data found for user:', userId);
        setLoading(false)
        console.log('useUser - loading set to false (no profile data)');
      }
    } catch (err) {
      console.error('Error in loadSession:', err)
      setError(err)
      setLoading(false)
      console.log('useUser - loading set to false (error condition)');
    } finally {
      // Always set loading to false after profile fetch attempt completes
      // This was causing loading to be set false multiple times - already handled above
      console.log('useUser - loading set to false after profile fetch');
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, userData: { full_name: string; role: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.full_name,
          role: userData.role,
          organization_id: userData.organization || null
        }
      }
    });
    
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (data) setProfile(data)
    return { data, error }
  }

  return {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile
  }
}

// Organization-specific data hook
export function useOrganizationData(organizationId?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOrganizationData = async <T>(
    tableName: string,
    query?: (client: unknown) => unknown
  ): Promise<T | null> => {
    if (!organizationId) {
      setError('Organization ID is required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await schemaService.getOrganizationData<T>(
        organizationId,
        tableName,
        query
      );
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async <T>(
    userId: string,
    tableName: string,
    query?: (client: unknown) => unknown
  ): Promise<T | null> => {
    if (!organizationId) {
      setError('Organization ID is required');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await schemaService.getUserData<T>(
        organizationId,
        userId,
        tableName,
        query
      );
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getOrganizationData,
    getUserData,
    isSchemaDifferentiationEnabled: schemaService.isSchemaDifferentiationEnabled()
  };
}

// Assessment results hook
export function useAssessmentResults(userId?: string) {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchResultsRef = React.useRef<() => Promise<void>>();
  
  const fetchResults = React.useCallback(async () => {
    if (!userId) return;
    
    setLoading(true)
    
    try {
      // First, try to get results from local storage
      const localResults = progressStorage.getAllAssessmentResults(userId);
      if (localResults.length > 0) {
        setResults(localResults);
        setLoading(false);
      }
      
      // If online, also fetch from Supabase and update local storage
      if (navigator.onLine) {
        setIsSyncing(true);
        const { data, error } = await supabase
          .from('assessment_results')
          .select('*')
          .eq('user_id', userId)
          .order('completed_at', { ascending: false });

        if (data) {
          setResults(data);
          // Update local storage with latest results
          progressStorage.setAllAssessmentResults(userId, data);
          networkStatus.setLastSyncTime();
        }
        if (error) {
          setError(error.message);
          console.error('Error fetching assessment results:', error);
        }
        setIsSyncing(false);
      }
    } catch (err) {
      console.error('Error in fetchResults:', err);
      setError('Failed to fetch assessment results');
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  fetchResultsRef.current = fetchResults;
  
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (userId) {
      fetchResultsRef.current?.()
    } else {
      // If no userId is provided, set loading to false since there's no data to fetch
      setLoading(false)
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [userId])

  const saveResult = async (
    resultData: Omit<AssessmentResult, 'id' | 'created_at'> | Omit<AssessmentResult, 'id' | 'created_at'>[]
  ) => {
    if (!userId) {
      return { error: 'User ID is required to save assessment results', success: false };
    }

    // Handle single result or array
    const isArray = Array.isArray(resultData);
    const dataToInsert = isArray ? resultData : [resultData];

    // Ensure each result has a user_id and completed_at
    const processedData = dataToInsert.map(item => ({
      ...item,
      completed_at: item.completed_at || new Date().toISOString()
    }));

    try {
      // First, save to local storage
      processedData.forEach(item => {
        // Generate a temporary id if needed
        if (!item.id) {
          item.id = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }
        progressStorage.updateAssessmentResult(userId, item);
      });

      // Update local state
      setResults(prev => [...processedData, ...prev]);
    
      // If online, also save to Supabase
      if (navigator.onLine) {
        const { data, error } = await supabase
          .from('assessment_results')
          .insert(processedData)
          .select();

        if (data) {
          // Update local state with server IDs
          setResults(prev => {
            const newResults = [...prev];
            data.forEach(serverItem => {
              // Replace any temporary items
              const index = newResults.findIndex(r => 
                r.assessment_id === serverItem.assessment_id && 
                r.area_id === serverItem.area_id &&
                r.user_id === serverItem.user_id
              );
              if (index >= 0) {
                newResults[index] = serverItem;
              }
            });
            return newResults;
          });
          
          // Update local storage with server data
          data.forEach(item => {
            progressStorage.updateAssessmentResult(userId, item);
          });
          
          networkStatus.setLastSyncTime();
          return { data, error, success: true };
        }
        return { data: null, error, success: !error };
      }
      
      // If offline, return success with local data
      return { data: processedData, error: null, success: true };
    } catch (err) {
      console.error('Error saving assessment results:', err);
      return { data: null, error: err, success: false };
    }
  }

  const updateResult = async (id: string, updates: Partial<AssessmentResult>) => {
    try {
      // First, update in local state and storage
      const existingResult = results.find(r => r.id === id);
      if (existingResult) {
        const updatedResult = { ...existingResult, ...updates };
        
        // Update local state
        setResults(prev => prev.map(r => r.id === id ? updatedResult : r));
        
        // Update local storage
        if (userId) {
          progressStorage.updateAssessmentResult(userId, updatedResult);
        }

        // If online, also update in Supabase
        if (navigator.onLine) {
          const { data, error } = await supabase
            .from('assessment_results')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
          
          if (data) {
            // Update local state with server data
            setResults(prev => prev.map(r => r.id === id ? data : r));
            
            // Update local storage with server data
            if (userId) {
              progressStorage.updateAssessmentResult(userId, data);
            }
            
            networkStatus.setLastSyncTime();
          }
          
          return { data, error };
        }
        
        // If offline, return the local updated result
        return { data: updatedResult, error: null };
      }
    } catch (err) {
      console.error('Error updating assessment result:', err);
      return { data: null, error: err };
    }
    
    return { data: null, error: new Error('Result not found') };
  }

  return {
    results,
    loading,
    error,
    isOffline,
    isSyncing,
    saveResult,
    updateResult,
    refetch: fetchResults
  }
}

// New hook for compliance tracking (for future use)
// function useComplianceTracking(userId?: string, organizationId?: string) {
//   const [events, setEvents] = useState<unknown[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//
//   useEffect(() => {
//     if (userId) {
//       fetchEvents();
//     }
//   }, [userId, organizationId]);
//
//   const fetchEvents = async () => {
//     if (!userId) return;
//
//     setLoading(true);
//     
//     const query = supabase
//       .from('compliance_tracking')
//       .select('*');
//     
//     // The RLS policies will automatically filter based on user role and organization
//     // No need for explicit filtering here
//     
//     const { data, error } = await query.order('due_date', { ascending: true });
//
//     if (data) setEvents(data);
//     if (error) setError(error.message);
//     setLoading(false);
//   };
//
//   // Get events assigned to the user
//   const fetchAssignedEvents = async () => {
//     if (!userId) return;
//
//     setLoading(true);
//     const { data, error } = await supabase
//       .from('compliance_tracking')
//       .select('*')
//       .eq('assigned_to', userId)
//       .order('due_date', { ascending: true });
//
//     if (error) setError(error.message);
//     setLoading(false);
//     return { data, error };
//   };
//
//   // Create a new compliance event
//   const createEvent = async (event: {
//     organization_id: string;
//     event_id: string;
//     event_title: string;
//     status: 'pending' | 'in-progress' | 'completed' | 'overdue';
//     assigned_to?: string;
//     due_date: string;
//     documentation?: Record<string, unknown>;
//     notes?: string;
//   }) => {
//     const { data, error } = await supabase
//       .from('compliance_tracking')
//       .insert([event])
//       .select()
//       .single();
//
//     if (data) {
//       setEvents(prev => [data, ...prev]);
//     }
//     return { data, error, success: !error };
//   };
//
//   // Update an existing event
//   const updateEvent = async (
//     eventId: string, 
//     updates: {
//       status?: 'pending' | 'in-progress' | 'completed' | 'overdue';
//       assigned_to?: string;
//       due_date?: string;
//       completed_at?: string | null;
//       documentation?: Record<string, unknown>;
//       notes?: string;
//     }
//   ) => {
//     const { data, error } = await supabase
//       .from('compliance_tracking')
//       .update(updates)
//       .eq('id', eventId)
//       .select()
//       .single();
//
//     if (data) {
//       setEvents(prev => prev.map(e => e.id === eventId ? data : e));
//     }
//     return { data, error, success: !error };
//   };
//
//   return {
//     events,
//     loading,
//     error,
//     fetchEvents,
//     fetchAssignedEvents,
//     createEvent,
//     updateEvent
//   };
// }

// Training progress hook
export function useTrainingProgress(userId?: string) {
  const [progress, setProgress] = useState<TrainingProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchProgress = React.useCallback(async () => {
    if (!userId) return;
    
    console.log('fetchProgress called, userId:', userId, 'isOnline:', navigator.onLine);
    setLoading(true);
    
    try {
      // First, try to get progress from local storage
      const localProgress = progressStorage.getAllTrainingProgress(userId);
      console.log('Local progress data found:', localProgress.length, 'items');
      if (localProgress.length > 0) {
        setProgress(localProgress);
      }
      
      // If online, also fetch from Supabase and update local storage
      if (navigator.onLine) {
        console.log('Online, fetching from Supabase');
        setIsSyncing(true);
        const { data, error } = await supabase
          .from('training_progress')
          .select('*')
          .eq('user_id', userId)
          .order('last_accessed', { ascending: false });
        
        console.log('Supabase fetch complete, data:', data?.length, 'items, error:', error);
        if (data) {
          setProgress(data);
          // Update local storage with latest progress
          progressStorage.setAllTrainingProgress(userId, data);
          networkStatus.setLastSyncTime();
        }
        if (error) {
          console.error('Error from Supabase:', error);
          setError(error.message);
        }
        setIsSyncing(false);
      }
    } catch (err) {
      console.error('Error in fetchProgress:', err);
      setError('Failed to fetch training progress');
    } finally {
      console.log('fetchProgress complete, setting loading to false');
      setLoading(false);
    }
  }, [userId]);
  
  useEffect(() => {
    console.log('useTrainingProgress hook mounted, userId:', userId);
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (userId) {
      setLoading(true); // Only set loading to true when we have a userId
      fetchProgress();
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [userId, fetchProgress])

  const startModule = async (moduleId: string, moduleTitle: string) => {
    if (!userId) return { error: 'No user logged in' };

    try {
      // Create progress object
      const newProgress = {
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: userId,
        module_id: moduleId,
        module_title: moduleTitle,
        status: 'in-progress',
        progress: 0,
        started_at: new Date().toISOString(),
        last_accessed: new Date().toISOString(),
        created_at: new Date().toISOString()
      };
      
      // First, update local storage and state
      progressStorage.updateModuleProgress(userId, newProgress);
      
      setProgress(prev => {
        const existing = prev.find(p => p.module_id === moduleId);
        if (existing) {
          return prev.map(p => p.module_id === moduleId ? newProgress : p);
        }
        return [newProgress, ...prev];
      });
      
      // If online, also update in Supabase
      if (navigator.onLine) {
        const { data, error } = await supabase
          .from('training_progress')
          .upsert([
            {
              user_id: userId,
              module_id: moduleId,
              module_title: moduleTitle,
              status: 'in-progress',
              progress: 0,
              started_at: new Date().toISOString(),
            }
          ])
          .select()
          .single();

        if (data) {
          // Update local state with server data
          setProgress(prev => {
            const existing = prev.find(p => p.module_id === moduleId);
            if (existing) {
              return prev.map(p => p.module_id === moduleId ? data : p);
            }
            return [data, ...prev];
          });
          
          // Update local storage with server data
          progressStorage.updateModuleProgress(userId, data);
          networkStatus.setLastSyncTime();
          
          return { data, error };
        }
        
        return { data: null, error };
      }
      
      // If offline, return the local progress object
      return { data: newProgress, error: null };
    } catch (err) {
      console.error('Error starting module:', err);
      return { data: null, error: err };
    }
  }

  const updateProgress = async (
    moduleId: string,
    updates: {
      progress?: number
      current_lesson_id?: string
      syllabus_progress?: Record<string, unknown>
      status?: 'in-progress' | 'completed'
    }
  ) => {
    if (!userId) return { error: 'No user logged in' };
    
    try {
      // Get the current module progress
      const currentProgress = progress.find(p => p.module_id === moduleId);
      if (!currentProgress) {
        return { error: 'Module progress not found' };
      }

      // Create update data
      const updateData = {
        ...updates,
        last_accessed: new Date().toISOString(),
        ...(updates.status === 'completed' && { completed_at: new Date().toISOString() })
      };
      
      // Apply updates to the current progress
      const updatedProgress = {
        ...currentProgress,
        ...updateData
      };
      
      // First, update in local storage and state
      progressStorage.updateModuleProgress(userId, updatedProgress);
      
      setProgress(prev => prev.map(p => 
        p.module_id === moduleId ? updatedProgress : p
      ));

      // If online, also update in Supabase
      if (navigator.onLine) {
        const { data, error } = await supabase
          .from('training_progress')
          .update(updateData)
          .eq('user_id', userId)
          .eq('module_id', moduleId)
          .select()
          .single();

        if (data) {
          // Update local state with server data
          setProgress(prev => prev.map(p => 
            p.module_id === moduleId ? data : p
          ));
          
          // Update local storage with server data
          progressStorage.updateModuleProgress(userId, data);
          networkStatus.setLastSyncTime();
          
          return { data, error };
        }
        
        return { data: null, error };
      }
      
      // If offline, return the local updated progress
      return { data: updatedProgress, error: null };
    } catch (err) {
      console.error('Error updating module progress:', err);
      return { data: null, error: err };
    }
  }

  const getModuleProgress = (moduleId: string): TrainingProgress | undefined => {
    return progress.find(p => p.module_id === moduleId)
  }
  
  // Function to sync local changes to Supabase when coming back online
  const syncToServer = async () => {
    if (!userId || !navigator.onLine) return { success: false };
    
    setIsSyncing(true);
    // Offline sync implementation - currently handles basic connectivity
    // Future enhancement: implement conflict resolution and timestamp comparison
    try {
      // For now, just refresh data when coming back online
      await loadProgress();
      console.log('Successfully synced with server');
    } catch (error) {
      console.error('Sync failed:', error);
      return { success: false, error };
    }
    
    setIsSyncing(false);
    return { success: true };
  }

  return {
    progress,
    loading,
    error,
    isOffline,
    isSyncing,
    startModule,
    updateProgress,
    getModuleProgress,
    refetch: fetchProgress,
    syncToServer
  }
}

// Get training recommendations based on assessment gaps (for future use)
// function useTrainingRecommendations(userId?: string) {
//   const { results: assessmentResults } = useAssessmentResults(userId)
//   const { progress: trainingProgress } = useTrainingProgress(userId)
//   
//   const recommendations = assessmentResults
//     .filter(result => result.current_level <= 2) // Low maturity levels
//     .map(result => {
//       // Map assessment areas to training modules
//       const moduleRecommendations = getModuleRecommendationsForAssessmentArea(result.area_id)
//       return moduleRecommendations.filter(moduleId => {
//         const existing = trainingProgress.find(p => p.module_id === moduleId)
//         return !existing || existing.status !== 'completed'
//       })
//     })
//     .flat()
//
//   return [...new Set(recommendations)] // Remove duplicates
// }

// Helper function to map assessment areas to training modules (for future use)
// function getModuleRecommendationsForAssessmentArea(areaId: string): string[] {
//   const mappings: Record<string, string[]> = {
//     'education-records-management': ['ferpa-fundamentals-administrators'],
//     'network-security-architecture': ['cybersecurity-fundamentals-education'],
//     'coppa-policy-framework': ['coppa-digital-safety-educators'],
//     'gdpr-applicability-assessment': ['gdpr-international-compliance'],
//     // Add more mappings based on your assessment areas
//   }
//   
//   return mappings[areaId] || []
// }