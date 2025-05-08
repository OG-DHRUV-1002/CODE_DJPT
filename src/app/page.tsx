import { CodeConverter } from '@/components/CodeConverter';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CodeConverter />
      </main>
      <Footer />
    </div>
  );
}
