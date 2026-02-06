import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export const metadata: Metadata = {
  title: {
    default: 'Adam Beloucif — Data Engineer & Fullstack Developer',
    template: '%s | Adam Beloucif',
  },
  description: 'Data Engineer & Fullstack Developer spécialisé en Python, Machine Learning, et développement web moderne. M1 Data Engineering & IA @ EFREI Paris. Transforme la data en décisions et le code en impact.',
  keywords: ['Data Engineer', 'Fullstack Developer', 'Python', 'React', 'Next.js', 'Machine Learning', 'EFREI', 'Paris', 'IA', 'Portfolio', 'Développeur'],
  authors: [{ name: 'Adam Beloucif', url: 'https://github.com/Adam-Blf' }],
  creator: 'Adam Beloucif',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Adam Beloucif — Data Engineer & Fullstack Developer',
    description: 'From Data to Decisions. From Code to Impact. Portfolio de projets Data, IA et Fullstack.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Adam Beloucif Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adam Beloucif — Data Engineer',
    description: 'From Data to Decisions. From Code to Impact.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c0c' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* 
          Inline theme detection script - prevents flash of wrong theme (FOUC).
          This is a static, self-contained script with no user input, so dangerouslySetInnerHTML
          is acceptable here. The CSP allows 'unsafe-inline' specifically for this use case.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('portfolio-theme');
                  var theme = stored || 'system';
                  var resolved = theme;
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (resolved !== 'dark' && resolved !== 'light') resolved = 'dark';
                  document.documentElement.classList.add(resolved);
                  document.documentElement.style.colorScheme = resolved;
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="noise">
        <ThemeProvider defaultTheme="system">
          {/* Skip link for accessibility */}
          <a href="#main-content" className="skip-link">
            Aller au contenu principal
          </a>
          <Header />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
