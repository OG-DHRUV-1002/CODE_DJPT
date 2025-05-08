import { Code2 } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary-foreground hover:text-accent-foreground transition-colors">
          <Code2 className="h-7 w-7 text-accent" />
          CODE_DJPT
        </Link>
      </div>
    </header>
  );
}

