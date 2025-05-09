"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';

interface SessionTimerProps {
  // Duration in seconds for the countdown
  initialDurationInSeconds?: number;
  // Message to display when the timer expires
  expiryMessage?: string;
  // Message to display while timer is active
  activeMessagePrefix?: string;
}

const DEFAULT_DURATION_SECONDS = 6 * 60 * 60; // 6 hours
const DEFAULT_EXPIRY_MESSAGE = "Session may be inactive. Consider refreshing if issues occur.";
const DEFAULT_ACTIVE_MESSAGE_PREFIX = "Time until potential session refresh: ";

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const SessionTimer: FC<SessionTimerProps> = ({
  initialDurationInSeconds = DEFAULT_DURATION_SECONDS,
  expiryMessage = DEFAULT_EXPIRY_MESSAGE,
  activeMessagePrefix = DEFAULT_ACTIVE_MESSAGE_PREFIX,
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client to avoid hydration issues
    setIsClient(true);
    setTimeLeft(initialDurationInSeconds);
  }, [initialDurationInSeconds]);

  useEffect(() => {
    if (!isClient || timeLeft === null || timeLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime !== null && prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isClient]);

  if (!isClient || timeLeft === null) {
    // Render nothing or a placeholder on the server/initial client render before timeLeft is set
    return null; 
  }

  return (
    <div className="text-xs text-muted-foreground">
      {timeLeft > 0 ? (
        <span>{activeMessagePrefix}{formatTime(timeLeft)}</span>
      ) : (
        <span>{expiryMessage}</span>
      )}
    </div>
  );
};

export default SessionTimer;