"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
// Removed emailService import as email functionality was dropped.

export interface FooterProps {
  // userEmail?: string; // Removed as per previous request
}

export const Footer: FC<FooterProps> = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  // Removed sessionExpired and handleSessionEnd as SessionTimer is removed

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm space-y-2 md:space-y-0">
        <div className="text-center md:text-left">
          All Rights Reserved for CODE_DJPT by Dhruv © {currentYear}
        </div>
        
        {/* Removed Test Email Button */}
        
        <div className="text-center md:text-right">
          {/* SessionTimer component removed */}
        </div>
      </div>
    </footer>
  );
}
