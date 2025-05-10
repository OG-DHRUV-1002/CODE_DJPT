
"use client";

import type { FC } from 'react';

// Props are kept for compatibility with Footer.tsx,
// even though initialDurationInSeconds and onSessionEnd are not used for the static "6 HRS" display.
export interface SessionTimerProps {
  initialDurationInSeconds?: number;
  onSessionEnd?: () => void;
  className?: string;
}

export const SessionTimer: FC<SessionTimerProps> = ({
  className,
  // initialDurationInSeconds, // unused
  // onSessionEnd, // unused
}) => {
  // The original timer logic (useState, useEffect, formatTime) has been removed.
  // The component now always displays the static text "6 HRS".
  // This means the onSessionEnd callback will not be triggered by this component anymore,
  // and the sessionExpired state in Footer.tsx will not be updated by this timer.

  return (
    <div className={className}>
      <span>6 HRS</span>
    </div>
  );
};

export default SessionTimer;
