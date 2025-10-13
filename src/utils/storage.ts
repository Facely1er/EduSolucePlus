// Enhanced storage utilities with encryption and error handling
import { storageKeys } from '../config/environment';
import { Notification } from '../data/trainingModulesData';

interface StorageOptions {
  encrypt?: boolean;
  ttl?: number; // Time to live in milliseconds
  compress?: boolean;
}

interface StoredItem<T> {
  value: T;
  timestamp: number;
  ttl?: number;
  encrypted?: boolean;
}

class StorageManager {
  private storage: Storage;
  private prefix: string;

  constructor(storage: Storage = localStorage, prefix = 'edusoluce_') {
    this.storage = storage;
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private encrypt(data: string): string {
    // Simple base64 encoding for now - in production, use proper encryption
    return btoa(data);
  }

  private decrypt(data: string): string {
    try {
      return atob(data);
    } catch {
      return data; // Return as-is if decryption fails
    }
  }

  set<T>(key: string, value: T, options: StorageOptions = {}): boolean {
    try {
      const item: StoredItem<T> = {
        value,
        timestamp: Date.now(),
        ...(options.ttl && { ttl: options.ttl }),
        ...(options.encrypt && { encrypted: true }),
      };

      let serialized = JSON.stringify(item);
      
      if (options.encrypt) {
        serialized = this.encrypt(serialized);
      }

      this.storage.setItem(this.getKey(key), serialized);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const rawData = this.storage.getItem(this.getKey(key));
      if (!rawData) return defaultValue;

      let data = rawData;
      
      // Try to decrypt if it looks encrypted
      try {
        const decrypted = this.decrypt(rawData);
        if (decrypted !== rawData) {
          data = decrypted;
        }
      } catch {
        // Not encrypted or decryption failed, use as-is
      }

      const item: StoredItem<T> = JSON.parse(data);

      // Check TTL
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        this.remove(key);
        return defaultValue;
      }

      return item.value;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  remove(key: string): boolean {
    try {
      this.storage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  clear(): boolean {
    try {
      const keys = Object.keys(this.storage).filter(key => 
        key.startsWith(this.prefix)
      );
      keys.forEach(key => this.storage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  exists(key: string): boolean {
    return this.storage.getItem(this.getKey(key)) !== null;
  }

  size(): number {
    return Object.keys(this.storage).filter(key => 
      key.startsWith(this.prefix)
    ).length;
  }

  // Cleanup expired items
  cleanup(): number {
    let cleanedCount = 0;
    try {
      const keys = Object.keys(this.storage).filter(key => 
        key.startsWith(this.prefix)
      );

      keys.forEach(fullKey => {
        const key = fullKey.replace(this.prefix, '');
        const value = this.get(key); // This will auto-remove expired items
        if (value === undefined) {
          cleanedCount++;
        }
      });
    } catch (error) {
      console.error('Storage cleanup error:', error);
    }
    return cleanedCount;
  }
}

// Create storage instances
const localStorage = new StorageManager(window.localStorage);
// sessionStorage available for future use
// const sessionStorage = new StorageManager(window.sessionStorage);

// Specific storage utilities for auth (available for future use)
/* const authStorage = {
  setToken(token: string, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    return storage.set(storageKeys.authToken, token, {
      encrypt: true,
      ttl: rememberMe ? 30 * 24 * 60 * 60 * 1000 : undefined, // 30 days or session
    });
  },

  getToken(): string | undefined {
    return localStorage.get(storageKeys.authToken) || 
           sessionStorage.get(storageKeys.authToken);
  },

  removeToken() {
    localStorage.remove(storageKeys.authToken);
    sessionStorage.remove(storageKeys.authToken);
  },

  setRefreshToken(token: string, rememberMe = false) {
    const storage = rememberMe ? localStorage : sessionStorage;
    return storage.set(storageKeys.refreshToken, token, {
      encrypt: true,
      ttl: rememberMe ? 90 * 24 * 60 * 60 * 1000 : undefined, // 90 days or session
    });
  },

  getRefreshToken(): string | undefined {
    return localStorage.get(storageKeys.refreshToken) || 
           sessionStorage.get(storageKeys.refreshToken);
  },

  removeRefreshToken() {
    localStorage.remove(storageKeys.refreshToken);
    sessionStorage.remove(storageKeys.refreshToken);
  },

  clearAuth() {
    this.removeToken();
    this.removeRefreshToken();
    localStorage.remove('login_time');
    localStorage.remove('last_activity');
    localStorage.remove('last_auth_check');
  }
}; */

// User preferences storage (available for future use)
/* const preferencesStorage = {
  setPreferences(preferences: any) {
    return localStorage.set(storageKeys.userPreferences, preferences);
  },

  getPreferences(): any {
    return localStorage.get(storageKeys.userPreferences, {
      theme: 'system',
      notifications: {
        email: true,
        push: false,
        reminders: true,
      },
      privacy: {
        profileVisibility: 'institution',
        shareProgress: false,
      },
    });
  },

  removePreferences() {
    localStorage.remove(storageKeys.userPreferences);
  }
}; */

// Progress storage for offline capability
export const progressStorage = {
  // Store all assessment results for a user
  setAllAssessmentResults(userId: string, results: any[]) {
    const key = `${storageKeys.assessmentProgress}_${userId}`;
    return localStorage.set(key, results, { ttl: 30 * 24 * 60 * 60 * 1000 }); // 30 days
  },

  // Get all assessment results for a user
  getAllAssessmentResults(userId: string): any[] {
    const key = `${storageKeys.assessmentProgress}_${userId}`;
    return localStorage.get(key, []);
  },

  // Get a single assessment result 
  getAssessmentResult(userId: string, assessmentId: string): any | undefined {
    const results = this.getAllAssessmentResults(userId);
    return results.find(r => r.assessment_id === assessmentId);
  },

  // Add or update a single assessment result
  updateAssessmentResult(userId: string, result: any) {
    const results = this.getAllAssessmentResults(userId);
    const index = results.findIndex(r => r.id === result.id);
    
    if (index >= 0) {
      results[index] = result;
    } else {
      results.push(result);
    }
    
    return this.setAllAssessmentResults(userId, results);
  },

  // Remove assessment progress
  removeAssessmentResults(userId: string) {
    const key = `${storageKeys.assessmentProgress}_${userId}`;
    localStorage.remove(key);
  },

  // Store all training progress for a user
  setAllTrainingProgress(userId: string, progress: any[]) {
    const key = `${storageKeys.trainingProgress}_${userId}`;
    return localStorage.set(key, progress, { ttl: 30 * 24 * 60 * 60 * 1000 }); // 30 days
  },
  
  // Get all training progress for a user
  getAllTrainingProgress(userId: string): any[] {
    const key = `${storageKeys.trainingProgress}_${userId}`;
    return localStorage.get(key, []);
  },

  // Get progress for a specific module
  getModuleProgress(userId: string, moduleId: string): any | undefined {
    const allProgress = this.getAllTrainingProgress(userId);
    return allProgress.find(p => p.module_id === moduleId);
  },

  // Update progress for a specific module
  updateModuleProgress(userId: string, moduleProgress: any) {
    const allProgress = this.getAllTrainingProgress(userId);
    const index = allProgress.findIndex(p => p.module_id === moduleProgress.module_id);
    
    if (index >= 0) {
      allProgress[index] = moduleProgress;
    } else {
      allProgress.push(moduleProgress);
    }
    
    return this.setAllTrainingProgress(userId, allProgress);
  },

  // Remove training progress
  removeTrainingProgress(userId: string) {
    const key = `${storageKeys.trainingProgress}_${userId}`;
    localStorage.remove(key);
  }
};

// Network status utility
export const networkStatus = {
  isOnline(): boolean {
    return navigator.onLine;
  },
  
  setLastSyncTime() {
    localStorage.set('last_sync_time', Date.now());
  },
  
  getLastSyncTime(): number {
    return localStorage.get('last_sync_time', 0);
  },
  
  getSyncStatus() {
    const lastSync = this.getLastSyncTime();
    const now = Date.now();
    const diff = now - lastSync;
    
    // If last sync was more than 1 hour ago
    if (diff > 60 * 60 * 1000) {
      return 'stale';
    }
    
    return 'recent';
  }
};

// Notification storage for the notification system
export const notificationStorage = {
  addNotification(notification: Notification): boolean {
    const notifications = this.getNotifications();
    notifications.unshift(notification); // Add to beginning
    
    // Keep only the last 50 notifications to prevent storage bloat
    const trimmedNotifications = notifications.slice(0, 50);
    
    return localStorage.set(storageKeys.notifications, trimmedNotifications, {
      ttl: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
  },

  getNotifications(): Notification[] {
    const notifications = localStorage.get(storageKeys.notifications, []);
    const now = Date.now();
    
    // Filter out expired notifications
    return notifications.filter((notification: Notification) => 
      !notification.expiresAt || notification.expiresAt > now
    );
  },

  markAsRead(notificationId: string): boolean {
    const notifications = this.getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    
    if (notification) {
      notification.read = true;
      return localStorage.set(storageKeys.notifications, notifications, {
        ttl: 30 * 24 * 60 * 60 * 1000
      });
    }
    
    return false;
  },

  markAllAsRead(): boolean {
    const notifications = this.getNotifications();
    notifications.forEach(notification => {
      notification.read = true;
    });
    
    return localStorage.set(storageKeys.notifications, notifications, {
      ttl: 30 * 24 * 60 * 60 * 1000
    });
  },

  removeNotification(notificationId: string): boolean {
    const notifications = this.getNotifications();
    const filteredNotifications = notifications.filter(n => n.id !== notificationId);
    
    return localStorage.set(storageKeys.notifications, filteredNotifications, {
      ttl: 30 * 24 * 60 * 60 * 1000
    });
  },

  clearNotifications(): boolean {
    return localStorage.remove(storageKeys.notifications);
  },

  getUnreadCount(): number {
    return this.getNotifications().filter(n => !n.read).length;
  },

  getNotificationsByCategory(category: string): Notification[] {
    return this.getNotifications().filter(n => n.category === category);
  },

  getNotificationsByPriority(priority: 'low' | 'medium' | 'high'): Notification[] {
    return this.getNotifications().filter(n => n.priority === priority);
  }
};

// Utility for storage quotas and monitoring (available for future use)
/* const storageUtils = {
  // Synchronous version - returns fallback estimation immediately
  getQuotaUsage(): { used: number; total: number; percentage: number } {
    // Fallback estimation for immediate synchronous result
    const used = JSON.stringify(window.localStorage).length + 
                 JSON.stringify(window.sessionStorage).length;
    const total = 10 * 1024 * 1024; // Assume 10MB quota
    
    return {
      used,
      total,
      percentage: (used / total) * 100,
    };
  },

  // Async version - uses the Storage API for accurate results
  async getQuotaUsageAsync(): Promise<{ used: number; total: number; percentage: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage || 0,
          total: estimate.quota || 0,
          percentage: estimate.quota ? (estimate.usage! / estimate.quota) * 100 : 0,
        };
      } catch (error) {
        console.warn('Failed to get storage estimate:', error);
      }
    }
    
    // Fallback estimation
    const used = JSON.stringify(window.localStorage).length + 
                 JSON.stringify(window.sessionStorage).length;
    const total = 10 * 1024 * 1024; // Assume 10MB quota
    
    return {
      used,
      total,
      percentage: (used / total) * 100,
    };
  },

  isStorageAvailable(type: 'localStorage' | 'sessionStorage' = 'localStorage'): boolean {
    try {
      const storage = window[type];
      const test = '__storage_test__';
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // Periodic cleanup of expired items
  startCleanupInterval(intervalMs = 60 * 60 * 1000) { // Default: 1 hour
    const cleanup = () => {
      const localCleanup = localStorage.cleanup();
      const sessionCleanup = sessionStorage.cleanup();
      
      if (localCleanup > 0 || sessionCleanup > 0) {
        console.log(`Cleaned up ${localCleanup + sessionCleanup} expired storage items`);
      }
    };

    // Initial cleanup
    cleanup();
    
    // Set up interval
    return setInterval(cleanup, intervalMs);
  }
}; */

