import { Code2 } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Link
          href="/"
          className="flex items-center text-primary-foreground hover:text-accent-foreground transition-colors"
        >
          <Code2 className="h-8 w-8 text-accent mr-2" />
          <span className="text-3xl font-bold tracking-tight">CODE_DJPT</span>
          <span className="ml-2 text-sm font-light opacity-70 self-end pb-1">SVUD - P1</span>
        </Link>
      </div>
    </header>
  );
}
