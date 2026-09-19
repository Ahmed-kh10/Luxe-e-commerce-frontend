import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { SessionWarningBanner } from '@/components/auth/session-warning-banner';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif-luxury',
  display: 'swap',
  // Explicit fallback stack sized close to Playfair Display reduces the
  // visible layout jump when the real font finishes loading.
  fallback: ['Georgia', 'serif'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-clean',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

export const metadata: Metadata = {
  title: {
    default: 'Luxe — Premium E-commerce',
    template: '%s — Luxe',
  },
  description: 'An exceptionally polished, premium e-commerce experience.',
  openGraph: {
    title: 'Luxe — Premium E-commerce',
    description: 'Considered design, exceptional craftsmanship.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies the saved theme before React hydrates or the browser
            paints — prevents a flash of the wrong theme on every load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('luxury_store_theme');
                if (theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <Providers>
          <Navbar />
          <SessionWarningBanner />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
