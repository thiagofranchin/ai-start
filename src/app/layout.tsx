import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MarketBar from '@/components/layout/MarketBar';
import { SearchProvider } from '@/components/layout/SearchProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ai-start — Launchpad Dashboard',
  description: 'Hub pessoal para acesso rápido a IAs, APIs, repositórios e comandos do dia a dia.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚀</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <SearchProvider>
          <MarketBar />
          <div className="main-layout">
            <Sidebar />
            <main className="main-content">
              <TopBar />
              {children}
            </main>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}

