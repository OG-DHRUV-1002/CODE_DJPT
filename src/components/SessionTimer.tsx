// "use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';

const DEFAULT_DURATION_SECONDS = 8 * 60 * 60; // 8 hours

export interface SessionTimerProps {
  initialDurationInSeconds?: number;
  onSessionEnd?: () => void;
  className?: string;
}

export const SessionTimer: FC<SessionTimerProps> = ({
  initialDurationInSeconds = DEFAULT_DURATION_SECONDS,
  onSessionEnd,
  className,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialDurationInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onSessionEnd) {
        onSessionEnd();
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onSessionEnd]);

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0 || (h === 0 && m === 0 && s === 0) ) // ensure 00:00:00 is shown
      .join(':');
  };

  return (
    <div className={className}>
      {timeLeft > 0 ? (
        <span>Time until potential session refresh: {formatTime(timeLeft)}</span>
      ) : (
        <span>Session may be inactive. Consider refreshing.</span>
      )}
    </div>
  );
};

export default SessionTimer;
