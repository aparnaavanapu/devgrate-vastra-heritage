import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter, Great_Vibes } from 'next/font/google';
import { UIProvider } from '@/store/ui-store';
import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { CartDrawer } from '@/components/layout/cart-drawer';
import { SearchOverlay } from '@/components/layout/search-overlay';
import { siteConfig } from '@/data/site';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-script',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['sarees', 'silk sarees', 'kanjivaram', 'banarasi', 'bridal sarees', 'handloom', 'Indian sarees', 'premium sarees'],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80' }],
  },
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}>
      <body className="bg-ivory text-charcoal font-sans antialiased">
        <UIProvider>
          <SmoothScroll>
            <AnnouncementBar />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
          </SmoothScroll>
        </UIProvider>
      </body>
    </html>
  );
}
