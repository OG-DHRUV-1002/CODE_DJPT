
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import SessionTimer from './SessionTimer';
import { sendSessionEndEmail } from '@/lib/emailService'; 

export interface FooterProps {
  userEmail?: string; // Make userEmail optional as it might not always be available
}

export const Footer: FC<FooterProps> = ({ userEmail = "dhruvhadal@gmail.com" }) => { // Default for testing
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [sessionExpired, setSessionExpired] = useState(false);
  const [emailNotificationSent, setEmailNotificationSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSessionEnd = async () => {
    setSessionExpired(true);
    // Only attempt to send email if userEmail is provided and email hasn't been sent/attempted
    if (userEmail && !emailNotificationSent) {
      try {
        await sendSessionEndEmail(userEmail);
        console.log("Session end email notification initiated for:", userEmail);
        setEmailNotificationSent(true); // Mark as sent/attempted
        setEmailError(null);
      } catch (error) {
        console.error("Failed to send session end email:", error);
        setEmailNotificationSent(true); // Mark as attempted to prevent retries
        if (error instanceof Error) {
          setEmailError(`Failed to send notification: ${error.message}`);
        } else {
          setEmailError("Failed to send notification due to an unknown error.");
        }
      }
    } else if (!userEmail && !emailNotificationSent) {
      console.warn("User email not provided. Cannot send session end notification.");
      // setEmailNotificationSent(true); // Mark as "attempted" to avoid console spam if handleSessionEnd is called multiple times
    }
  };

  // Function to simulate sending a test email (for development/testing)
  // This should ideally be triggered by a user action if kept for production.
  const sendTestEmail = async () => {
    if (userEmail) {
      try {
        await sendSessionEndEmail(userEmail); // Or a more generic sendEmail function
        alert(`Test email initiated to ${userEmail}. Check console for mock details.`);
      } catch (error) {
        alert(`Failed to send test email: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      alert("User email not set. Cannot send test email.");
    }
  };


  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm space-y-2 md:space-y-0">
        <div className="text-center md:text-left">
          All Rights Reserved for CODE_DJPT by Dhruv {currentYear}
        </div>
        {/* For testing email functionality - remove or secure this for production */}
        { 
        process.env.NODE_ENV === 'development' && userEmail && (
          <button onClick={sendTestEmail} className="text-xs underline px-2 py-1 my-1 md:my-0 bg-secondary hover:bg-accent text-secondary-foreground hover:text-accent-foreground rounded">Send Test Email</button>
        )}
        
        <div className="text-center md:text-right">
          <SessionTimer onSessionEnd={handleSessionEnd} />
          {sessionExpired && (
            <div className="mt-1 text-xs">
              <p className="text-destructive">
                Session has ended. Please refresh if you experience issues.
              </p>
              {userEmail && emailNotificationSent && !emailError && (
                <p className="text-green-600">Notification email process initiated for {userEmail}.</p>
              )}
              {emailError && (
                <p className="text-destructive">{emailError}</p>
              )}
              {!userEmail && sessionExpired && (
                 <p className="text-amber-600">User email not available for notification.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
