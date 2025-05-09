"use client";

import { useState, useEffect } from 'react';
import SessionTimer from './SessionTimer';

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm space-y-2 md:space-y-0">
        <div className="text-center md:text-left">
          © {currentYear} CODE_DJPT - SVUD - P1. All rights reserved.
        </div>
        <div className="text-center md:text-right">
          <SessionTimer />
        </div>
      </div>
    </footer>
  );
}
