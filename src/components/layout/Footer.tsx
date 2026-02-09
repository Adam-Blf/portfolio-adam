'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import { personalInfo } from '@/lib/data'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useI18n()

  const navItems = [
    { href: '/', key: 'home' },
    { href: '/evolution', key: 'timeline' },
    { href: '/pokedex', key: 'projects' },
    { href: '/types', key: 'skills' },
    { href: '/formation', key: 'formation' },
    { href: '/centre-pokemon', key: 'contact' },
  ]

  return (
    <footer style={{ background: 'var(--pokedex-red-dark)' }}>
      {/* Top hinge */}
      <div className="pokedex-hinge" />

      <div className="container-wide py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">

          {/* Left: D-Pad */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="pokedex-dpad" aria-hidden="true">
              <button className="pokedex-dpad-btn pokedex-dpad-up" tabIndex={-1} aria-hidden="true">
                <ChevronUp size={14} />
              </button>
              <button className="pokedex-dpad-btn pokedex-dpad-left" tabIndex={-1} aria-hidden="true">
                <ChevronLeft size={14} />
              </button>
              <div className="pokedex-dpad-center" />
              <button className="pokedex-dpad-btn pokedex-dpad-right" tabIndex={-1} aria-hidden="true">
                <ChevronRight size={14} />
              </button>
              <button className="pokedex-dpad-btn pokedex-dpad-down" tabIndex={-1} aria-hidden="true">
                <ChevronDown size={14} />
              </button>
            </div>
            {/* Brand below d-pad */}
            <Link href="/" className="inline-block group mt-2">
              <Image
                src="/logo-adam.svg"
                alt="Adam Beloucif"
                width={28}
                height={28}
                className="h-6 w-auto transition-opacity group-hover:opacity-80 brightness-0 invert"
              />
            </Link>
          </div>

          {/* Center: Speaker grille + nav */}
          <div className="flex-1">
            {/* Speaker grille pattern */}
            <div className="mb-4" aria-hidden="true">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-[2px] rounded-full mb-[3px]"
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    width: `${60 + i * 8}%`,
                    maxWidth: '200px',
                  }}
                />
              ))}
            </div>

            {/* Nav links */}
            <nav className="flex flex-wrap gap-x-4 gap-y-2 mb-3" aria-label="Footer navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>

            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Right: Contact as screen readouts */}
          <div className="flex-shrink-0">
            <div
              className="pokedex-screen p-3 text-xs space-y-2"
              style={{
                minWidth: '180px',
                fontFamily: 'var(--font-mono), monospace',
                color: 'var(--pokedex-dark)',
                fontSize: '0.7rem',
              }}
            >
              <div className="flex items-center gap-1.5">
                <span style={{ color: 'var(--pokedex-screen-dark)' }}>EMAIL:</span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:underline truncate"
                  style={{ color: 'var(--pokedex-dark)' }}
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: 'var(--pokedex-screen-dark)' }}>GITHUB:</span>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: 'var(--pokedex-dark)' }}
                  aria-label={`GitHub ${t('footer.opensInNewWindow')}`}
                >
                  Adam-Blf
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: 'var(--pokedex-screen-dark)' }}>LINKEDIN:</span>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: 'var(--pokedex-dark)' }}
                  aria-label={`LinkedIn ${t('footer.opensInNewWindow')}`}
                >
                  adambeloucif
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: 'var(--pokedex-screen-dark)' }}>LOC:</span>
                <span>Paris, FR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-6 pt-4 flex flex-wrap justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {t('footer.copyright', { year: currentYear })}
          </p>
          <p className="text-xs flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span
              className="inline-block w-2 h-2 rounded-full pokedex-led pokedex-led-green"
              style={{ width: 8, height: 8 }}
            />
            Online
          </p>
        </div>
      </div>
    </footer>
  )
}
