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
    <footer className="border-t border-[--border] py-16 relative">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[--accent] to-transparent opacity-50" />

      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block group">
              <Image
                src="/logo-adam.svg"
                alt="Adam Beloucif"
                width={48}
                height={48}
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="mt-4 text-[--text-secondary] text-sm max-w-xs leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-caption mb-4">{t('footer.navigation')}</p>
            <nav className="space-y-3" aria-label="Footer navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-[--text-secondary] hover:text-accent transition-colors hover:translate-x-1 transform"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-caption mb-4">{t('footer.contact')}</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="block text-sm text-[--text-secondary] hover:text-accent transition-colors mb-4"
            >
              {personalInfo.email}
            </a>
            <div className="flex gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[--text-secondary] hover:text-accent transition-colors"
                aria-label={`GitHub ${t('footer.opensInNewWindow')}`}
              >
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[--text-secondary] hover:text-accent transition-colors"
                aria-label={`LinkedIn ${t('footer.opensInNewWindow')}`}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[--border] flex flex-wrap justify-between items-center gap-4">
          <p className="text-caption">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-caption flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[--success] animate-pulse" />
            Paris, France
          </p>
        </div>
      </div>
    </footer>
  )
}
