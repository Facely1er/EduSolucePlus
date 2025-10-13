import React, { useState, useEffect } from 'react';
import { WifiOff, AlertCircle, CheckCircle } from 'lucide-react';

interface OfflineStatusIndicatorProps {
  className?: string;
}

export function OfflineStatusIndicator({ className = '' }: OfflineStatusIndicatorProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showStatus, setShowStatus] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowStatus(true);
      // Hide status after 3 seconds
      setTimeout(() => setShowStatus(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatus(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load last sync time from localStorage
    const savedSyncTime = localStorage.getItem('lastSyncTime');
    if (savedSyncTime) {
      setLastSyncTime(savedSyncTime);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't render anything if online and status is not being shown
  if (isOnline && !showStatus) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        showStatus ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      } ${className}`}
    >
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg text-sm font-medium ${
          isOnline
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
        }`}
      >
        {isOnline ? (
          <>
            <CheckCircle className="h-4 w-4" />
            <span>Back online</span>
            {lastSyncTime && (
              <span className="text-xs opacity-75">
                Last sync: {new Date(lastSyncTime).toLocaleTimeString()}
              </span>
            )}
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>You're offline</span>
            <AlertCircle className="h-3 w-3" />
          </>
        )}
      </div>
    </div>
  );
}