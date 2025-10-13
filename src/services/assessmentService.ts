// Assessment service for managing privacy compliance assessments
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: 'privacy' | 'security' | 'compliance' | 'technical';
  regulation: 'ferpa' | 'coppa' | 'gdpr' | 'ccpa' | 'general';
  targetRole: 'administrator' | 'teacher' | 'it-staff' | 'student';
  questions: AssessmentQuestion[];
  timeLimit?: number; // in minutes
  passingScore: number;
  maxAttempts?: number;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  category: string;
}

export interface AssessmentResult {
  id: string;
  assessment_id: string;
  user_id: string;
  organization_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_spent: number; // in minutes
  answers: Record<string, number>;
  completed_at: string;
  passed: boolean;
}

export interface AssessmentProgress {
  id: string;
  assessment_id: string;
  user_id: string;
  current_question: number;
  answers: Record<string, number>;
  time_spent: number;
  started_at: string;
  last_updated: string;
}

class AssessmentService {
  // Get all available assessments
  async getAssessments(role?: string, regulation?: string): Promise<Assessment[]> {
    try {
      let query = supabase
        .from('assessments')
        .select('*')
        .eq('is_active', true);

      if (role) {
        query = query.eq('target_role', role);
      }

      if (regulation) {
        query = query.eq('regulation', regulation);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { context: 'getAssessments' });
      throw error;
    }
  }

  // Get assessment by ID
  async getAssessment(id: string): Promise<Assessment | null> {
    try {
      const { data, error } = await supabase
        .from('assessments')
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
      errorService.logError(error as Error, { context: 'getAssessment', assessmentId: id });
      throw error;
    }
  }

  // Start an assessment
  async startAssessment(assessmentId: string, userId: string, organizationId: string): Promise<AssessmentProgress> {
    try {
      const { data, error } = await supabase
        .from('assessment_progress')
        .insert([{
          assessment_id: assessmentId,
          user_id: userId,
          organization_id: organizationId,
          current_question: 0,
          answers: {},
          time_spent: 0,
          started_at: new Date().toISOString(),
          last_updated: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Log assessment start
      auditService.logAssessmentStart(userId, assessmentId, organizationId);

      return data;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'startAssessment', 
        assessmentId, 
        userId, 
        organizationId 
      });
      throw error;
    }
  }

  // Update assessment progress
  async updateProgress(
    progressId: string, 
    questionId: string, 
    answer: number, 
    timeSpent: number
  ): Promise<void> {
    try {
      const { data: progress, error: fetchError } = await supabase
        .from('assessment_progress')
        .select('answers, current_question')
        .eq('id', progressId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      const updatedAnswers = {
        ...progress.answers,
        [questionId]: answer
      };

      const { error } = await supabase
        .from('assessment_progress')
        .update({
          answers: updatedAnswers,
          current_question: progress.current_question + 1,
          time_spent: timeSpent,
          last_updated: new Date().toISOString()
        })
        .eq('id', progressId);

      if (error) {
        throw error;
      }
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'updateProgress', 
        progressId, 
        questionId 
      });
      throw error;
    }
  }

  // Submit assessment
  async submitAssessment(
    progressId: string, 
    userId: string, 
    organizationId: string
  ): Promise<AssessmentResult> {
    try {
      // Get progress data
      const { data: progress, error: fetchError } = await supabase
        .from('assessment_progress')
        .select('*')
        .eq('id', progressId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Get assessment data
      const { data: assessment, error: assessmentError } = await supabase
        .from('assessments')
        .select('*')
        .eq('id', progress.assessment_id)
        .single();

      if (assessmentError) {
        throw assessmentError;
      }

      // Calculate score
      const score = this.calculateScore(assessment.questions, progress.answers);
      const passed = score >= assessment.passing_score;

      // Create result
      const { data: result, error: resultError } = await supabase
        .from('assessment_results')
        .insert([{
          assessment_id: progress.assessment_id,
          user_id: userId,
          organization_id: organizationId,
          score: score,
          total_questions: assessment.questions.length,
          correct_answers: Object.values(progress.answers).filter(
            (answer, index) => answer === assessment.questions[index].correctAnswer
          ).length,
          time_spent: progress.time_spent,
          answers: progress.answers,
          completed_at: new Date().toISOString(),
          passed: passed
        }])
        .select()
        .single();

      if (resultError) {
        throw resultError;
      }

      // Delete progress record
      await supabase
        .from('assessment_progress')
        .delete()
        .eq('id', progressId);

      // Log assessment completion
      auditService.logAssessmentCompletion(userId, progress.assessment_id, organizationId, score, passed);

      return result;
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'submitAssessment', 
        progressId, 
        userId, 
        organizationId 
      });
      throw error;
    }
  }

  // Get user's assessment results
  async getUserResults(userId: string, organizationId: string): Promise<AssessmentResult[]> {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('user_id', userId)
        .eq('organization_id', organizationId)
        .order('completed_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getUserResults', 
        userId, 
        organizationId 
      });
      throw error;
    }
  }

  // Get organization's assessment statistics
  async getOrganizationStats(organizationId: string): Promise<{
    totalAssessments: number;
    averageScore: number;
    completionRate: number;
    topPerformingAreas: string[];
    areasNeedingImprovement: string[];
  }> {
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .select('*')
        .eq('organization_id', organizationId);

      if (error) {
        throw error;
      }

      const results = data || [];
      const totalAssessments = results.length;
      const averageScore = totalAssessments > 0 
        ? results.reduce((sum, result) => sum + result.score, 0) / totalAssessments 
        : 0;
      
      const completionRate = totalAssessments > 0 
        ? (results.filter(r => r.passed).length / totalAssessments) * 100 
        : 0;

      // This would need more complex logic to determine areas
      const topPerformingAreas: string[] = [];
      const areasNeedingImprovement: string[] = [];

      return {
        totalAssessments,
        averageScore: Math.round(averageScore),
        completionRate: Math.round(completionRate),
        topPerformingAreas,
        areasNeedingImprovement
      };
    } catch (error) {
      errorService.logError(error as Error, { 
        context: 'getOrganizationStats', 
        organizationId 
      });
      throw error;
    }
  }

  // Calculate assessment score
  private calculateScore(questions: AssessmentQuestion[], answers: Record<string, number>): number {
    let correctAnswers = 0;
    let totalPoints = 0;

    questions.forEach(question => {
      totalPoints += question.points;
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers += question.points;
      }
    });

    return totalPoints > 0 ? Math.round((correctAnswers / totalPoints) * 100) : 0;
  }
}

export const assessmentService = new AssessmentService();