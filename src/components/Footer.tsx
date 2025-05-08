export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} CODE_DJPT. All rights reserved.
      </div>
    </footer>
  );
}

