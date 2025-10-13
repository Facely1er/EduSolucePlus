// Comprehensive notification service for EduSoluce backend
import { supabase } from '../lib/supabase';
import { auditService } from './auditService';
import { errorService } from './errorService';

// Notification types
export type NotificationType = 
  | 'compliance_deadline'
  | 'incident_alert'
  | 'data_request'
  | 'assessment_reminder'
  | 'training_reminder'
  | 'system_alert'
  | 'security_alert'
  | 'weekly_digest';

// Notification priority levels
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

// Notification channels
export type NotificationChannel = 'email' | 'push' | 'in_app' | 'sms';

// Notification status
export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'read';

// Notification interface
export interface Notification {
  id: string;
  user_id: string;
  organization_id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  channels: NotificationChannel[];
  data?: Record<string, any>;
  status: NotificationStatus;
  scheduled_for?: string;
  sent_at?: string;
  read_at?: string;
  created_at: string;
  updated_at: string;
}

// Notification template interface
export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  title_template: string;
  message_template: string;
  channels: NotificationChannel[];
  priority: NotificationPriority;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Notification preferences interface
export interface NotificationPreferences {
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  compliance_alerts: boolean;
  incident_alerts: boolean;
  deadline_reminders: boolean;
  weekly_digest: boolean;
  preferences: Record<string, any>;
}

// Notification service class
export class NotificationService {
  private templates: Map<NotificationType, NotificationTemplate> = new Map();

  constructor() {
    this.initializeTemplates();
  }

  // Initialize default notification templates
  private initializeTemplates(): void {
    const defaultTemplates: NotificationTemplate[] = [
      {
        id: 'compliance_deadline',
        type: 'compliance_deadline',
        title_template: 'Compliance Deadline Approaching',
        message_template: 'The compliance obligation "{title}" is due on {due_date}. Please take action to ensure timely completion.',
        channels: ['email', 'in_app'],
        priority: 'high',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'incident_alert',
        type: 'incident_alert',
        title_template: 'Privacy Incident Alert',
        message_template: 'A {severity} severity privacy incident has been reported: {title}. Please review and take appropriate action.',
        channels: ['email', 'push', 'in_app'],
        priority: 'urgent',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'data_request',
        type: 'data_request',
        title_template: 'New Data Subject Request',
        message_template: 'A new {request_type} request has been submitted by {requester_name}. Please review and process within the required timeframe.',
        channels: ['email', 'in_app'],
        priority: 'high',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'assessment_reminder',
        type: 'assessment_reminder',
        title_template: 'Assessment Reminder',
        message_template: 'You have pending assessments to complete. Please log in to complete your privacy compliance assessments.',
        channels: ['email', 'in_app'],
        priority: 'medium',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'training_reminder',
        type: 'training_reminder',
        title_template: 'Training Module Reminder',
        message_template: 'You have incomplete training modules. Please continue your privacy training to maintain compliance.',
        channels: ['email', 'in_app'],
        priority: 'medium',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'system_alert',
        type: 'system_alert',
        title_template: 'System Alert',
        message_template: '{message}',
        channels: ['email', 'in_app'],
        priority: 'medium',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'security_alert',
        type: 'security_alert',
        title_template: 'Security Alert',
        message_template: 'A security event has been detected: {message}. Please review your account activity.',
        channels: ['email', 'push', 'in_app'],
        priority: 'urgent',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'weekly_digest',
        type: 'weekly_digest',
        title_template: 'Weekly Privacy Compliance Digest',
        message_template: 'Your weekly privacy compliance summary: {summary}',
        channels: ['email'],
        priority: 'low',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    defaultTemplates.forEach(template => {
      this.templates.set(template.type, template);
    });
  }

  // Create a notification
  async createNotification(
    userId: string,
    organizationId: string,
    type: NotificationType,
    title: string,
    message: string,
    options: {
      priority?: NotificationPriority;
      channels?: NotificationChannel[];
      data?: Record<string, any>;
      scheduled_for?: string;
    } = {}
  ): Promise<{ success: boolean; data?: Notification; error?: string }> {
    try {
      const template = this.templates.get(type);
      if (!template) {
        return { success: false, error: 'Notification template not found' };
      }

      const notification: Omit<Notification, 'id' | 'created_at' | 'updated_at'> = {
        user_id: userId,
        organization_id: organizationId,
        type,
        priority: options.priority || template.priority,
        title,
        message,
        channels: options.channels || template.channels,
        data: options.data || {},
        status: 'pending',
        scheduled_for: options.scheduled_for
      };

      const { data, error } = await supabase
        .from('notifications')
        .insert([notification])
        .select()
        .single();

      if (error) throw error;

      // Log notification creation
      auditService.logDataAccess(userId, 'notification', data.id, 'created');

      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create notification';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'createNotification',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Send notification using template
  async sendNotification(
    userId: string,
    organizationId: string,
    type: NotificationType,
    templateData: Record<string, any>,
    options: {
      priority?: NotificationPriority;
      channels?: NotificationChannel[];
      scheduled_for?: string;
    } = {}
  ): Promise<{ success: boolean; data?: Notification; error?: string }> {
    try {
      const template = this.templates.get(type);
      if (!template) {
        return { success: false, error: 'Notification template not found' };
      }

      // Replace template variables
      const title = this.replaceTemplateVariables(template.title_template, templateData);
      const message = this.replaceTemplateVariables(template.message_template, templateData);

      return await this.createNotification(
        userId,
        organizationId,
        type,
        title,
        message,
        {
          priority: options.priority || template.priority,
          channels: options.channels || template.channels,
          data: templateData,
          scheduled_for: options.scheduled_for
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send notification';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'sendNotification',
        severity: 'medium',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Replace template variables
  private replaceTemplateVariables(template: string, data: Record<string, any>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : match;
    });
  }

  // Get user notifications
  async getUserNotifications(
    userId: string,
    options: {
      status?: NotificationStatus;
      type?: NotificationType;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<{ success: boolean; data?: Notification[]; error?: string }> {
    try {
      let query = supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (options.status) {
        query = query.eq('status', options.status);
      }

      if (options.type) {
        query = query.eq('type', options.type);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch notifications';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'getUserNotifications',
        severity: 'low',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Mark notification as read
  async markAsRead(notificationId: string, userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ 
          status: 'read',
          read_at: new Date().toISOString()
        })
        .eq('id', notificationId)
        .eq('user_id', userId);

      if (error) throw error;

      auditService.logDataAccess(userId, 'notification', notificationId, 'read');

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to mark notification as read';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'markAsRead',
        severity: 'low',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Mark all notifications as read
  async markAllAsRead(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ 
          status: 'read',
          read_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('status', 'pending');

      if (error) throw error;

      auditService.logDataAccess(userId, 'notifications', 'all', 'read');

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to mark all notifications as read';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'markAllAsRead',
        severity: 'low',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Get notification preferences
  async getNotificationPreferences(userId: string): Promise<{ success: boolean; data?: NotificationPreferences; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return { success: true, data: data || null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch notification preferences';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'getNotificationPreferences',
        severity: 'low',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Update notification preferences
  async updateNotificationPreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>
  ): Promise<{ success: boolean; data?: NotificationPreferences; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .upsert([{
          user_id: userId,
          ...preferences
        }])
        .select()
        .single();

      if (error) throw error;

      auditService.logDataAccess(userId, 'notification_preferences', userId, 'updated');

      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update notification preferences';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'updateNotificationPreferences',
        severity: 'low',
        userId
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Send bulk notifications to organization
  async sendBulkNotification(
    organizationId: string,
    type: NotificationType,
    templateData: Record<string, any>,
    options: {
      userRoles?: string[];
      priority?: NotificationPriority;
      channels?: NotificationChannel[];
    } = {}
  ): Promise<{ success: boolean; sentCount?: number; error?: string }> {
    try {
      // Get users in organization
      let query = supabase
        .from('profiles')
        .select('id')
        .eq('organization_id', organizationId);

      if (options.userRoles && options.userRoles.length > 0) {
        query = query.in('role', options.userRoles);
      }

      const { data: users, error: usersError } = await query;

      if (usersError) throw usersError;

      if (!users || users.length === 0) {
        return { success: true, sentCount: 0 };
      }

      // Send notification to each user
      const promises = users.map(user => 
        this.sendNotification(
          user.id,
          organizationId,
          type,
          templateData,
          {
            priority: options.priority,
            channels: options.channels
          }
        )
      );

      const results = await Promise.allSettled(promises);
      const successful = results.filter(result => 
        result.status === 'fulfilled' && result.value.success
      ).length;

      return { success: true, sentCount: successful };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send bulk notification';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'sendBulkNotification',
        severity: 'medium'
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Process scheduled notifications
  async processScheduledNotifications(): Promise<{ success: boolean; processedCount?: number; error?: string }> {
    try {
      const now = new Date().toISOString();
      
      const { data: notifications, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('status', 'pending')
        .lte('scheduled_for', now)
        .limit(100);

      if (error) throw error;

      if (!notifications || notifications.length === 0) {
        return { success: true, processedCount: 0 };
      }

      // Process each notification
      let processedCount = 0;
      for (const notification of notifications) {
        try {
          // Update status to sent
          await supabase
            .from('notifications')
            .update({ 
              status: 'sent',
              sent_at: new Date().toISOString()
            })
            .eq('id', notification.id);

          // Here you would integrate with actual notification channels
          // (email service, push notification service, etc.)
          await this.deliverNotification(notification);
          
          processedCount++;
        } catch (error) {
          console.error(`Failed to process notification ${notification.id}:`, error);
          
          // Mark as failed
          await supabase
            .from('notifications')
            .update({ status: 'failed' })
            .eq('id', notification.id);
        }
      }

      return { success: true, processedCount };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process scheduled notifications';
      errorService.reportError(error as Error, {
        component: 'NotificationService',
        action: 'processScheduledNotifications',
        severity: 'medium'
      });
      
      return { success: false, error: errorMessage };
    }
  }

  // Deliver notification through appropriate channels
  private async deliverNotification(notification: Notification): Promise<void> {
    // This is a placeholder for actual notification delivery
    // In a real implementation, you would integrate with:
    // - Email service (SendGrid, AWS SES, etc.)
    // - Push notification service (Firebase, OneSignal, etc.)
    // - SMS service (Twilio, etc.)
    
    console.log(`Delivering notification ${notification.id} through channels:`, notification.channels);
    
    // Simulate delivery
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Get notification statistics
  async getNotificationStats(userId: string): Promise<{
    total: number;
    unread: number;
    byType: Record<string, number>;
    byPriority: Record<string, number>;
  }> {
    try {
      const { data: notifications, error } = await supabase
        .from('notifications')
        .select('type, priority, status')
        .eq('user_id', userId);

      if (error) throw error;

      const stats = {
        total: notifications?.length || 0,
        unread: notifications?.filter(n => n.status === 'pending').length || 0,
        byType: {} as Record<string, number>,
        byPriority: {} as Record<string, number>
      };

      notifications?.forEach(notification => {
        stats.byType[notification.type] = (stats.byType[notification.type] || 0) + 1;
        stats.byPriority[notification.priority] = (stats.byPriority[notification.priority] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Failed to get notification stats:', error);
      return { total: 0, unread: 0, byType: {}, byPriority: {} };
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService();

// Export types
export type { Notification, NotificationTemplate, NotificationPreferences };