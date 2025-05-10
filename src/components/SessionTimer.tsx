"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';

export interface SessionTimerProps {
  initialDurationInSeconds?: number;
  onSessionEnd?: () => void;
  className?: string;
}

const SIX_HOURS_IN_SECONDS = 6 * 60 * 60;

export const SessionTimer: FC<SessionTimerProps> = ({
  initialDurationInSeconds = SIX_HOURS_IN_SECONDS,
  onSessionEnd,
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialDurationInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onSessionEnd) {
        onSessionEnd();
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onSessionEnd]);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={className}>
      <span>
        {timeLeft > 0
          ? `Time until potential session refresh: ${formatTime(timeLeft)}`
          : "Session may be inactive"}
      </span>
    </div>
  );
};

export default SessionTimer;
