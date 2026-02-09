'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

const domains = [
  { label: 'DATA', color: 'var(--accent-cyan)' },
  { label: 'FULLSTACK', color: 'var(--accent-violet)' },
  { label: 'IA', color: 'var(--accent-warm)' },
]

export default function MinimalProHero() {
  const { t } = useI18n()

  return (
    <section className="py-8 md:py-16">
      <div className="container-wide">
        <div className="glass-card p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
            {/* Photo */}
            <div className="shrink-0">
              <div
                className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden relative"
                style={{
                  border: '3px solid var(--border)',
                  boxShadow: '0 0 30px rgba(0, 240, 255, 0.15)',
                }}
              >
                <Image
                  src="/images/adam-photo.jpg"
                  alt="Adam Beloucif"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1
                className="font-mono font-black text-2xl md:text-4xl uppercase tracking-wide mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                ADAM BELOUCIF
              </h1>
              <p className="font-mono text-sm md:text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
                {t('hero.role')}
              </p>

              {/* Domain pills */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {domains.map((d) => (
                  <span
                    key={d.label}
                    className="font-mono text-xs font-bold px-3 py-1 rounded-full"
                    style={{
                      color: d.color,
                      border: `1px solid ${d.color}`,
                      backgroundColor: `color-mix(in srgb, ${d.color} 10%, transparent)`,
                    }}
                  >
                    {d.label}
                  </span>
                ))}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--success)', boxShadow: '0 0 8px var(--success-glow)' }}
                />
                <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  {t('hero.status')}
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  href="/projects"
                  className="glass-card font-mono text-sm font-bold px-5 py-2.5 inline-flex items-center gap-2 rounded-lg transition-all hover:shadow-lg"
                  style={{ color: 'var(--accent-cyan)', borderColor: 'var(--border-accent)' }}
                >
                  {t('hero.exploreProjects')}
                </Link>
                <Link
                  href="/contact"
                  className="glass-card font-mono text-sm font-bold px-5 py-2.5 inline-flex items-center gap-2 rounded-lg transition-all hover:shadow-lg"
                  style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}
                >
                  {t('hero.getInTouch')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
