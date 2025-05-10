
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import SessionTimer from './SessionTimer';
import { sendSessionEndEmail } from '@/lib/emailService'; 

export interface FooterProps {
  userEmail?: string; 
}

export const Footer: FC<FooterProps> = ({ userEmail = "dhruvhadal@gmail.com" }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [sessionExpired, setSessionExpired] = useState(false);
  const [emailNotificationSent, setEmailNotificationSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSessionEnd = async () => {
    setSessionExpired(true);
    if (userEmail && !emailNotificationSent) {
      try {
        await sendSessionEndEmail(userEmail);
        console.log("Session end email notification initiated for:", userEmail);
        setEmailNotificationSent(true); 
        setEmailError(null);
      } catch (error) {
        console.error("Failed to send session end email:", error);
        setEmailNotificationSent(true); 
        if (error instanceof Error) {
          setEmailError(`Failed to send notification: ${error.message}`);
        } else {
          setEmailError("Failed to send notification due to an unknown error.");
        }
      }
    } else if (!userEmail && !emailNotificationSent) {
      console.warn("User email not provided. Cannot send session end notification.");
    }
  };

  const sendTestEmail = async () => {
    if (userEmail) {
      try {
        await sendSessionEndEmail(userEmail);
        toast({ title: `Test email initiated to ${userEmail}.`, description: "Check console for mock details."});
      } catch (error) {
        toast({ title: 'Failed to send test email', description: error instanceof Error ? error.message : 'Unknown error', variant: 'destructive' });
      }
    } else {
      toast({ title: 'User email not set', description: "Cannot send test email.", variant: 'destructive' });
    }
  };

  // Helper for useToast - can be moved to a hooks directory if used elsewhere
  const { toast } = useToast(); 
  function useToast() {
    // This is a simplified mock. In a real app, you'd import `useToast` from `@/hooks/use-toast`
    // and ensure Toaster is in your layout. For this component's context, we'll fake it.
    return {
      toast: (options: { title: string; description?: string; variant?: "default" | "destructive" }) => {
        console.log("Toast:", options);
        if (typeof window !== 'undefined' && window.alert) { // Basic alert fallback for demo
           window.alert(`${options.title}${options.description ? `\n${options.description}` : ''}`);
        }
      }
    };
  }


  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm space-y-2 md:space-y-0">
        <div className="text-center md:text-left">
          All Rights Reserved for CODE_DJPT by Dhruv © {currentYear}
        </div>
        
        { process.env.NODE_ENV === 'development' && userEmail && (
          <button 
            onClick={sendTestEmail} 
            className="text-xs underline px-2 py-1 my-1 md:my-0 bg-secondary hover:bg-accent text-secondary-foreground hover:text-accent-foreground rounded"
            aria-label="Send a test email for session end notification"
          >
            Send Test Email
          </button>
        )}
        
        <div className="text-center md:text-right">
          <SessionTimer onSessionEnd={handleSessionEnd} />
          {sessionExpired && (
            <div className="mt-1 text-xs">
              <p className="text-destructive">
                Session has ended. Please refresh if you experience issues.
              </p>
              {userEmail && emailNotificationSent && !emailError && (
                <p className="text-green-600 dark:text-green-400">Notification email process initiated for {userEmail}.</p>
              )}
              {emailError && (
                <p className="text-destructive">{emailError}</p>
              )}
              {!userEmail && sessionExpired && (
                 <p className="text-amber-600 dark:text-amber-400">User email not available for notification.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
