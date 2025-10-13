import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Notification } from '../data/trainingModulesData';
import { notificationStorage } from '../utils/storage';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
  getNotificationsByCategory: (category: string) => Notification[];
  refreshNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshNotifications = useCallback(() => {
    const storedNotifications = notificationStorage.getNotifications();
    setNotifications(storedNotifications);
  }, []);

  // Load notifications from storage on mount
  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  // Update unread count when notifications change
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const addNotification = useCallback((notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const notification: Notification = {
      ...notificationData,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      read: false,
      priority: notificationData.priority || 'medium',
      category: notificationData.category || 'system'
    };

    if (notificationStorage.addNotification(notification)) {
      setNotifications(prev => [notification, ...prev]);
    }
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    if (notificationStorage.markAsRead(notificationId)) {
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    }
  }, []);

  const markAllAsRead = useCallback(() => {
    if (notificationStorage.markAllAsRead()) {
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
    }
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    if (notificationStorage.removeNotification(notificationId)) {
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    }
  }, []);

  const clearAllNotifications = useCallback(() => {
    if (notificationStorage.clearNotifications()) {
      setNotifications([]);
    }
  }, []);

  const getNotificationsByCategory = useCallback((category: string) => {
    return notifications.filter(n => n.category === category);
  }, [notifications]);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
    getNotificationsByCategory,
    refreshNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Utility functions for creating common notification types
export const createNotification = {
  trainingCompleted: (moduleTitle: string, link?: string): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
    type: 'success',
    title: 'Training Completed!',
    message: `Congratulations! You completed "${moduleTitle}".`,
    category: 'training',
    priority: 'medium',
    icon: '🎓',
    link
  }),

  assessmentCompleted: (assessmentTitle: string, score: number, link?: string): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
    type: 'success',
    title: 'Assessment Completed!',
    message: `You scored ${score}% on "${assessmentTitle}".`,
    category: 'assessment',
    priority: 'medium',
    icon: '✅',
    link
  }),

  complianceDeadline: (eventTitle: string, daysUntil: number, link?: string): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
    type: daysUntil <= 7 ? 'warning' : 'info',
    title: 'Compliance Deadline Approaching',
    message: `"${eventTitle}" is due in ${daysUntil} days.`,
    category: 'compliance',
    priority: daysUntil <= 7 ? 'high' : 'medium',
    icon: '📅',
    link
  }),

  certificateEarned: (certificateName: string, link?: string): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
    type: 'success',
    title: 'Certificate Earned!',
    message: `You've earned the "${certificateName}" certificate.`,
    category: 'training',
    priority: 'high',
    icon: '🏆',
    link
  }),

  systemUpdate: (message: string, link?: string): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
    type: 'info',
    title: 'System Update',
    message,
    category: 'system',
    priority: 'low',
    icon: '🔄',
    link
  }),

  dataReset: (): Omit<Notification, 'id' | 'timestamp' | 'read'> => ({
    type: 'info',
    title: 'Demo Data Reset',
    message: 'All demo data has been successfully reset to initial state.',
    category: 'system',
    priority: 'medium',
    icon: '🔄',
    expiresAt: Date.now() + (5 * 60 * 1000) // Expires in 5 minutes
  })
};