import { useState, useEffect } from 'react';

interface LocalUser {
  id: string;
  email?: string;
  full_name?: string;
  role?: string;
  organization?: string;
  created_at: string;
}

interface NewsletterSubscription {
  email: string;
  timestamp: string;
  userId: string;
}

export function useLocalUser() {
  const [localUser, setLocalUser] = useState<LocalUser | null>(null);

  useEffect(() => {
    // Load user data from localStorage on mount
    const savedUser = localStorage.getItem('localUser');
    if (savedUser) {
      try {
        setLocalUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('localUser');
      }
    }
  }, []);

  const saveLocalUser = (userData: Partial<LocalUser>) => {
    const newUser: LocalUser = {
      id: userData.id || `local_${Date.now()}`,
      email: userData.email || '',
      full_name: userData.full_name || '',
      role: userData.role || 'student',
      organization: userData.organization || '',
      created_at: userData.created_at || new Date().toISOString(),
      ...userData
    };
    
    setLocalUser(newUser);
    localStorage.setItem('localUser', JSON.stringify(newUser));
    return newUser;
  };

  const updateLocalUser = (updates: Partial<LocalUser>) => {
    if (!localUser) return null;
    
    const updatedUser = { ...localUser, ...updates };
    setLocalUser(updatedUser);
    localStorage.setItem('localUser', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const clearLocalUser = () => {
    setLocalUser(null);
    localStorage.removeItem('localUser');
  };

  const saveNewsletterSubscription = (email: string) => {
    const subscription: NewsletterSubscription = {
      email,
      timestamp: new Date().toISOString(),
      userId: localUser?.id || 'anonymous'
    };

    // Get existing subscriptions
    const existingSubscriptions = JSON.parse(
      localStorage.getItem('newsletter_subscriptions') || '[]'
    );

    // Check if email already exists
    const emailExists = existingSubscriptions.some(
      (sub: NewsletterSubscription) => sub.email === email
    );

    if (!emailExists) {
      const updatedSubscriptions = [...existingSubscriptions, subscription];
      localStorage.setItem('newsletter_subscriptions', JSON.stringify(updatedSubscriptions));
      return true;
    }

    return false; // Email already subscribed
  };

  const getNewsletterSubscriptions = (): NewsletterSubscription[] => {
    try {
      return JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
    } catch (error) {
      console.error('Error parsing newsletter subscriptions:', error);
      return [];
    }
  };

  return {
    localUser,
    saveLocalUser,
    updateLocalUser,
    clearLocalUser,
    saveNewsletterSubscription,
    getNewsletterSubscriptions
  };
}