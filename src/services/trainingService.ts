// Training service for managing privacy compliance training modules
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'privacy' | 'security' | 'compliance' | 'technical';
  regulation: 'ferpa' | 'coppa' | 'gdpr' | 'ccpa' | 'general';
  targetRole: 'administrator' | 'teacher' | 'it-staff' | 'student';
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: TrainingContent[];
  prerequisites: string[];
  learningObjectives: string[];
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface TrainingContent {
  id: string;
  type: 'video' | 'reading' | 'quiz' | 'interactive' | 'assignment';
  title: string;
  content: string;
  duration: number; // in minutes
  order: number;
  required: boolean;
}

export interface TrainingProgress {
  id: string;
  module_id: string;
  user_id: string;
  organization_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
  progress_percentage: number;
  current_content_id: string;
  completed_content: string[];
  time_spent: number; // in minutes
  started_at: string;
  last_accessed: string;
  completed_at?: string;
}

export interface TrainingCertificate {
  id: string;
  module_id: string;
  user_id: string;
  organization_id: string;
  issued_at: string;
  expires_at?: string;
  certificate_url: string;
}

class TrainingService {
  // Get all available training modules
  async getModules(role?: string, category?: string): Promise<TrainingModule[]> {
    try {
      let query = supabase
        .from('training_modules')
        .select('*')
        .eq('is_active', true);

      if (role) {
        query = query.eq('target_role', role);
      }

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { context: 'getModules' });
      throw error;
    }
  }

  // Get training module by ID
  async getModule(id: string): Promise<TrainingModule | null> {
    try {
      const { data, error } = await supabase
        .from('training_modules')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw error;
      }

      return data;
    } catch (error) {
      errorService.logError(error as Error, { context: 'getModule', moduleId: id });
      throw error;
    }
  }

  // Start a training module
  async startModule(moduleId: string, userId: string, organizationId: string): Promise<TrainingProgress> {
    try {
      // Check if progress already exists
      const { data: existingProgress } = await supabase
        .from('training_progress')
        .select('*')
        .eq('module_id', moduleId)
        .eq('user_id', userId)
        .single();

      if (existingProgress) {
        return existingProgress;
      }

      // Get module to find first content
      const module = await this.getModule(moduleId);
      if (!module) {
        throw new Error('Training module not found');
      }

      const firstContent = module.content.sort((a, b) => a.order - b.order)[0];

      const { data, error } = await supabase
        .from('training_progress')
        .insert([{
          module_id: moduleId,
          user_id: userId,
          organization_id: organizationId,
          status: 'in_progress',
          progress_percentage: 0,
          current_content_id: firstContent.id,
          completed_content: [],
          time_spent: 0,
          started_at: new Date().toISOString(),
          last_accessed: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log training start
      auditService.logTrainingStart(userId, moduleId, organizationId);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'startModule', 
        moduleId, 
        userId, 
        organizationId 
      });
      throw error;
    }
  }

  // Update training progress
  async updateProgress(
    progressId: string, 
    contentId: string, 
    timeSpent: number,
    completed: boolean = false
  ): Promise<void> {
    try {
      const { data: progress, error: fetchError } = await supabase
        .from('training_progress')
        .select('*')
        .eq('id', progressId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      const module = await this.getModule(progress.module_id);
      if (!module) {
        throw new Error('Training module not found');
      }

      const completedContent = [...progress.completed_content];
      if (completed && !completedContent.includes(contentId)) {
        completedContent.push(contentId);
      }

      const progressPercentage = Math.round((completedContent.length / module.content.length) * 100);
      const status = progressPercentage === 100 ? 'completed' : 'in_progress';

      const { error } = await supabase
        .from('training_progress')
        .update({
          progress_percentage: progressPercentage,
          current_content_id: contentId,
          completed_content: completedContent,
          time_spent: progress.time_spent + timeSpent,
          status: status,
          last_accessed: new Date().toISOString(),
          completed_at: status === 'completed' ? new Date().toISOString() : null
        })
        .eq('id', progressId);

      if (error) {
        throw error;
      }

      // If completed, generate certificate
      if (status === 'completed') {
        await this.generateCertificate(progress.module_id, progress.user_id, progress.organization_id);
      }
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'updateProgress', 
        progressId, 
        contentId 
      });
      throw error;
    }
  }

  // Get user's training progress
  async getUserProgress(userId: string, organizationId: string): Promise<TrainingProgress[]> {
    try {
      const { data, error } = await supabase
        .from('training_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('organization_id', organizationId)
        .order('last_accessed', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getUserProgress', 
        userId, 
        organizationId 
      });
      throw error;
    }
  }

  // Get training certificates
  async getCertificates(userId: string, organizationId: string): Promise<TrainingCertificate[]> {
    try {
      const { data, error } = await supabase
        .from('training_certificates')
        .select('*')
        .eq('user_id', userId)
        .eq('organization_id', organizationId)
        .order('issued_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getCertificates', 
        userId, 
        organizationId 
      });
      throw error;
    }
  }

  // Generate training certificate
  private async generateCertificate(
    moduleId: string, 
    userId: string, 
    organizationId: string
  ): Promise<void> {
    try {
      const module = await this.getModule(moduleId);
      if (!module) {
        throw new Error('Training module not found');
      }

      const certificateId = `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const certificateUrl = `/certificates/${certificateId}.pdf`;

      const { error } = await supabase
        .from('training_certificates')
        .insert([{
          id: certificateId,
          module_id: moduleId,
          user_id: userId,
          organization_id: organizationId,
          issued_at: new Date().toISOString(),
          certificate_url: certificateUrl
        }]);

      if (error) {
        throw error;
      }

      // Log certificate generation
      auditService.logCertificateGeneration(userId, moduleId, organizationId);
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'generateCertificate', 
        moduleId, 
        userId, 
        organizationId 
      });
      throw error;
    }
  }

  // Get organization's training statistics
  async getOrganizationStats(organizationId: string): Promise<{
    totalModules: number;
    completedModules: number;
    averageProgress: number;
    totalTrainingHours: number;
    topPerformingModules: string[];
  }> {
    try {
      const { data, error } = await supabase
        .from('training_progress')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) {
        throw error;
      }

      const progress = data || [];
      const totalModules = progress.length;
      const completedModules = progress.filter(p => p.status === 'completed').length;
      const averageProgress = totalModules > 0 
        ? progress.reduce((sum, p) => sum + p.progress_percentage, 0) / totalModules 
        : 0;
      const totalTrainingHours = progress.reduce((sum, p) => sum + p.time_spent, 0) / 60;

      // This would need more complex logic to determine top performing modules
      const topPerformingModules: string[] = [];

      return {
        totalModules,
        completedModules,
        averageProgress: Math.round(averageProgress),
        totalTrainingHours: Math.round(totalTrainingHours * 10) / 10,
        topPerformingModules
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getOrganizationStats', 
        organizationId 
      });
      throw error;
    }
  }
}

export const trainingService = new TrainingService();