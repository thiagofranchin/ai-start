import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import MarketBar from '@/components/layout/MarketBar';
import { SearchProvider } from '@/components/layout/SearchProvider';
import { MarketProvider } from '@/components/layout/MarketProvider';
import CommandPalette from '@/components/layout/CommandPalette';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';
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
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Launchpad Dashboard`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} — Launchpad Dashboard`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#060912',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Pular para o conteúdo</a>
        <SearchProvider>
          <MarketProvider>
            <MarketBar />
            <div className="main-layout">
              <Sidebar />
              <main id="main" className="main-content" tabIndex={-1}>
                <TopBar />
                {children}
              </main>
            </div>
            <CommandPalette />
          </MarketProvider>
        </SearchProvider>
      </body>
    </html>
  );
}

