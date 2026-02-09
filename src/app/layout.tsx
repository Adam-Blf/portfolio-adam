import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { I18nProvider } from '@/lib/i18n'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-body',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

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
  verification: {
    google: 'g8ulSVAWYx-6It_gx-Olu5vTn3bsFlI0zBEV2g0DybU',
  },
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
  themeColor: '#141414',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable} ${firaCode.variable}`}>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://img.shields.io" />
        {/* 
          Inline theme detection script - prevents flash of wrong theme (FOUC).
          This is a static, self-contained script with no user input, so dangerouslySetInnerHTML
          is acceptable here. The CSP allows 'unsafe-inline' specifically for this use case.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.add('dark');
                document.documentElement.style.colorScheme = 'dark';
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Person',
                  '@id': 'https://adam.beloucif.com/#person',
                  name: 'Adam Beloucif',
                  jobTitle: 'Data Engineer & Fullstack Developer',
                  url: 'https://adam.beloucif.com',
                  sameAs: [
                    'https://github.com/Adam-Blf',
                    'https://linkedin.com/in/adambeloucif',
                  ],
                  email: 'adam.beloucif@efrei.net',
                  alumniOf: {
                    '@type': 'EducationalOrganization',
                    name: 'EFREI Paris',
                  },
                  knowsAbout: [
                    'Data Engineering',
                    'Python',
                    'Machine Learning',
                    'React',
                    'Next.js',
                    'TypeScript',
                    'SQL',
                    'Docker',
                    'NLP',
                    'Deep Learning',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://adam.beloucif.com/#website',
                  name: 'Adam Beloucif — Portfolio',
                  url: 'https://adam.beloucif.com',
                  description:
                    'Portfolio de Adam Beloucif, Data Engineer & Fullstack Developer. Projets Data, IA et Fullstack.',
                  author: {
                    '@id': 'https://adam.beloucif.com/#person',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="noise" suppressHydrationWarning>
        <ThemeProvider>
          <I18nProvider>
            {/* Skip link for accessibility */}
            <a href="#main-content" className="skip-link">
              Aller au contenu principal
            </a>
            <Header />
            <main id="main-content" tabIndex={-1}>{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
