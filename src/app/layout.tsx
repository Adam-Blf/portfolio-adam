import type { Metadata, Viewport } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { I18nProvider } from '@/lib/i18n'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-display',
})

const interBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
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
  metadataBase: new URL('https://adam.beloucif.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Adam Beloucif | Portfolio - Data Engineer & Fullstack Developer',
    template: '%s | Adam Beloucif',
  },
  description: 'Portfolio de Adam Beloucif, Data Engineer et Fullstack Developer specialise en Python, Machine Learning, React et Next.js. M1 Data Engineering et IA a EFREI Paris. Projets Data, IA et Fullstack.',
  keywords: [
    'Adam Beloucif', 'Data Engineer', 'Fullstack Developer', 'Python', 'React', 'Next.js',
    'Machine Learning', 'EFREI Paris', 'IA', 'Portfolio', 'Developpeur', 'TypeScript',
    'NLP', 'Deep Learning', 'Docker', 'AWS', 'Data Engineering', 'Paris',
    'alternance', 'ingenieur data', 'developpeur fullstack',
  ],
  authors: [{ name: 'Adam Beloucif', url: 'https://adam.beloucif.com' }],
  creator: 'Adam Beloucif',
  publisher: 'Adam Beloucif',
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
    title: 'Adam Beloucif | Data Engineer & Fullstack Developer',
    description: 'From Data to Decisions. From Code to Impact. Portfolio de projets Data, IA et Fullstack. 35+ projets GitHub, Python, React, Machine Learning.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://adam.beloucif.com',
    siteName: 'Adam Beloucif Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adam Beloucif | Data Engineer & Fullstack Developer',
    description: 'From Data to Decisions. From Code to Impact. Portfolio Data, IA et Fullstack.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${firaCode.variable}`}>
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
                  image: 'https://adam.beloucif.com/images/adam-photo.jpg',
                  sameAs: [
                    'https://github.com/Adam-Blf',
                    'https://linkedin.com/in/adambeloucif',
                  ],
                  email: 'adam.beloucif@efrei.net',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Paris',
                    addressCountry: 'FR',
                  },
                  alumniOf: [
                    {
                      '@type': 'EducationalOrganization',
                      name: 'EFREI Paris',
                      url: 'https://www.efrei.fr',
                    },
                    {
                      '@type': 'EducationalOrganization',
                      name: 'Universidad de Malaga',
                    },
                  ],
                  worksFor: {
                    '@type': 'Organization',
                    name: 'GHT Psy Sud',
                  },
                  knowsAbout: [
                    'Data Engineering', 'Python', 'Machine Learning',
                    'React', 'Next.js', 'TypeScript', 'SQL',
                    'Docker', 'NLP', 'Deep Learning', 'AWS',
                    'PostgreSQL', 'MongoDB',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://adam.beloucif.com/#website',
                  name: 'Adam Beloucif - Portfolio',
                  url: 'https://adam.beloucif.com',
                  description:
                    'Portfolio de Adam Beloucif, Data Engineer et Fullstack Developer. Projets Data, IA et Fullstack.',
                  author: {
                    '@id': 'https://adam.beloucif.com/#person',
                  },
                  inLanguage: 'fr-FR',
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${interBody.variable} ${firaCode.variable} font-sans noise`} suppressHydrationWarning>
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
