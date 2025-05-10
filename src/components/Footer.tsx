"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import SessionTimer from './SessionTimer';
// Removed emailService import as email functionality was dropped.

export interface FooterProps {
  // userEmail?: string; // Removed as per previous request
}

export const Footer: FC<FooterProps> = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [sessionExpired, setSessionExpired] = useState(false);
  // Removed emailNotificationSent and emailError states

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSessionEnd = () => {
    setSessionExpired(true);
    // No email sending logic as it was removed
    console.log("Session has ended. User should refresh if experiencing issues.");
    // Optionally, show a toast or other UI indication if desired
  };
  
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm space-y-2 md:space-y-0">
        <div className="text-center md:text-left">
          All Rights Reserved for CODE_DJPT by Dhruv © {currentYear}
        </div>
        
        {/* Removed Test Email Button */}
        
        <div className="text-center md:text-right">
          <SessionTimer 
            initialDurationInSeconds={6 * 60 * 60} // 6 hours
            onSessionEnd={handleSessionEnd} 
          />
          {sessionExpired && (
            <div className="mt-1 text-xs">
              <p className="text-destructive">
                Session has ended. Please refresh if you experience issues.
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
