
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import SessionTimer from './SessionTimer';
import { useToast } from '@/hooks/use-toast'; // Keep useToast if other parts of Footer might use it, or remove if not.

export interface FooterProps {
  // userEmail?: string; // Removed userEmail
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
    // Removed email sending logic
    console.log("Session has ended.");
    // You might want to show a toast here or some other UI indication
    // For example:
    // toast({ title: "Session Ended", description: "Your session may be inactive. Please refresh." });
  };

  // Removed sendTestEmail function
  
  // Keep useToast if you plan to use toasts for other things in the footer.
  // If not, this can be removed as well.
  // const { toast } = useToast(); 


  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm space-y-2 md:space-y-0">
        <div className="text-center md:text-left">
          All Rights Reserved for CODE_DJPT by Dhruv © {currentYear}
        </div>
        
        {/* Removed Test Email Button */}
        
        <div className="text-center md:text-right">
          <SessionTimer onSessionEnd={handleSessionEnd} />
          {sessionExpired && (
            <div className="mt-1 text-xs">
              <p className="text-destructive">
                Session has ended. Please refresh if you experience issues.
              </p>
              {/* Removed email notification status messages */}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

