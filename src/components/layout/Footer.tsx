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
    { href: '/timeline', key: 'timeline' },
    { href: '/projects', key: 'projects' },
    { href: '/skills', key: 'skills' },
    { href: '/formation', key: 'formation' },
    { href: '/contact', key: 'contact' },
  ]

  return (
    <footer style={{ background: '#0a0a0f' }}>
      {/* Thin top border */}
      <div style={{ height: '1px', background: 'rgba(0, 240, 255, 0.1)' }} />

      <div className="container-wide py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">

          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block group">
              <Image
                src="/logo-adam.svg"
                alt="Adam Beloucif"
                width={28}
                height={28}
                className="h-6 w-auto transition-opacity group-hover:opacity-80"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.4))' }}
              />
            </Link>
          </div>

          {/* Center: Nav links */}
          <div className="flex-1">
            <nav className="flex flex-wrap gap-x-4 gap-y-2 mb-3" aria-label="Footer navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: 'rgba(240, 240, 240, 0.5)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#00f0ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240, 240, 240, 0.5)')}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>

            <p className="text-xs" style={{ color: 'rgba(240, 240, 240, 0.3)' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Right: Contact info */}
          <div className="flex-shrink-0">
            <div
              className="text-xs space-y-2"
              style={{
                minWidth: '180px',
                fontFamily: 'var(--font-mono), monospace',
                color: '#a0a0b0',
                fontSize: '0.7rem',
              }}
            >
              <div className="flex items-center gap-1.5">
                <span style={{ color: '#00f0ff' }}>EMAIL:</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:underline truncate transition-colors"
                  style={{ color: '#a0a0b0' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f0f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#a0a0b0')}
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: '#00f0ff' }}>GITHUB:</span>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors"
                  style={{ color: '#a0a0b0' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f0f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#a0a0b0')}
                  aria-label={`GitHub ${t('footer.opensInNewWindow')}`}
                >
                  Adam-Blf
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: '#00f0ff' }}>LINKEDIN:</span>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline transition-colors"
                  style={{ color: '#a0a0b0' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f0f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#a0a0b0')}
                  aria-label={`LinkedIn ${t('footer.opensInNewWindow')}`}
                >
                  adambeloucif
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: '#00f0ff' }}>LOC:</span>
                <span>Paris, FR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-6 pt-4 flex flex-wrap justify-between items-center gap-4"
          style={{ borderTop: '1px solid #2a2a3e' }}
        >
          <p className="text-xs" style={{ color: 'rgba(240, 240, 240, 0.3)' }}>
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-xs flex items-center gap-2" style={{ color: 'rgba(240, 240, 240, 0.4)' }}>
            <span
              className="inline-block w-2 h-2 rounded-full status-dot"
              style={{ width: 8, height: 8 }}
            />
            Online
          </p>
        </div>
      </div>
    </footer>
  )
}
