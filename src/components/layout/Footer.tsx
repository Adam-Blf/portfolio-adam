'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import { personalInfo } from '@/lib/data'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useI18n()

  const navItems = [
    { href: '/', key: 'home' },
    { href: '/frise', key: 'timeline' },
    { href: '/projets', key: 'projects' },
    { href: '/competences', key: 'skills' },
    { href: '/contact', key: 'contact' },
  ]

  return (
    <footer className="py-12" style={{ backgroundColor: 'var(--bg-surface, #1a1a1a)' }}>
      <div className="container-wide">
        {/* Top row: logo + nav + contact in horizontal layout */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16 mb-8">

          {/* Brand */}
          <div className="shrink-0">
            <Link href="/" className="inline-block group">
              <Image
                src="/logo-adam.svg"
                alt="Adam Beloucif"
                width={40}
                height={40}
                className="h-8 w-auto transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="mt-3 text-xs max-w-[200px] leading-relaxed" style={{ color: 'var(--text-muted, #808080)' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Nav links - horizontal */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs transition-colors hover:text-white"
                style={{ color: 'var(--text-muted, #808080)' }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Contact + social - pushed right */}
          <div className="md:ml-auto flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--text-muted, #808080)' }}
            >
              {personalInfo.email}
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--text-muted, #808080)' }}
              aria-label={`GitHub ${t('footer.opensInNewWindow')}`}
            >
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: 'var(--text-muted, #808080)' }}
              aria-label={`LinkedIn ${t('footer.opensInNewWindow')}`}
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-wrap justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted, #808080)' }}>
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-xs flex items-center gap-2" style={{ color: 'var(--text-muted, #808080)' }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent, #E50914)' }} />
            Paris, France
          </p>
        </div>
      </div>
    </footer>
  )
}
