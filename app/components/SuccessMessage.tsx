'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

interface SuccessMessageProps {
  message: string;
  dismissible?: boolean;
  className?: string;
  onDismiss?: () => void;
  autoHideDuration?: number;
}

export default function SuccessMessage({
  message,
  dismissible = true,
  className = '',
  onDismiss,
  autoHideDuration = 5000, // Default auto-hide after 5 seconds
}: SuccessMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHideDuration && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, autoHideDuration);
      
      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className={`bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-green-700">{message}</p>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={handleDismiss}
                className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 