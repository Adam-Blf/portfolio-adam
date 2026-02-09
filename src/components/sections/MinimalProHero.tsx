'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

const trainerStats = [
  { label: 'ATK', fullLabel: 'Data', value: 92, color: '#F08030' },
  { label: 'DEF', fullLabel: 'Backend', value: 85, color: '#6890F0' },
  { label: 'SPE', fullLabel: 'Frontend', value: 78, color: '#78C850' },
  { label: 'HP', fullLabel: 'Leadership', value: 95, color: '#F85888' },
]

export default function MinimalProHero() {
  const { t } = useI18n()

  return (
    <section className="py-8 md:py-12">
      <div className="container-wide">
        <div className="pokedex-shell p-4 md:p-6">
          {/* Top LEDs row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="pokedex-led pokedex-led-blue w-10 h-10" />
            <div className="pokedex-led pokedex-led-red w-4 h-4" />
            <div className="pokedex-led pokedex-led-yellow w-4 h-4" />
            <div className="pokedex-led pokedex-led-green w-4 h-4" />
          </div>

          {/* Main screen */}
          <div className="pokedex-screen p-5 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start relative z-10">
              {/* Photo frame */}
              <div className="shrink-0">
                <div
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-[var(--pokedex-dark)] relative"
                  style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.4), 0 0 0 3px var(--pokedex-screen-dark)' }}
                >
                  <Image
                    src="/images/adam-photo.jpg"
                    alt="Adam Beloucif"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Scanline overlay on photo */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
                    }}
                  />
                </div>
              </div>

              {/* Info panel */}
              <div className="flex-1 text-center md:text-left">
                <p className="pokedex-entry-number text-sm mb-1" style={{ color: 'var(--pokedex-dark)' }}>001</p>
                <h1
                  className="font-mono font-black text-2xl md:text-4xl uppercase tracking-wide mb-1"
                  style={{ color: 'var(--pokedex-dark)' }}
                >
                  ADAM BELOUCIF
                </h1>
                <p className="font-mono text-sm md:text-base mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {t('hero.role')}
                </p>

                {/* Type badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <span className="type-badge type-water">DATA</span>
                  <span className="type-badge type-grass">FULLSTACK</span>
                  <span className="type-badge type-dragon">IA</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <span className="pokedex-led pokedex-led-green w-3 h-3" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--pokedex-dark)' }}>
                    {t('hero.status')}
                  </span>
                </div>

                {/* Stat bars */}
                <div className="space-y-2 max-w-sm mx-auto md:mx-0">
                  {trainerStats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold w-8 text-right" style={{ color: 'var(--pokedex-dark)' }}>
                        {stat.label}
                      </span>
                      <span className="font-mono text-[10px] w-16 truncate" style={{ color: 'var(--text-muted)' }}>
                        {stat.fullLabel}
                      </span>
                      <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--pokedex-screen-dark)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold w-7 text-right" style={{ color: 'var(--pokedex-dark)' }}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            <Link href="/projects" className="pokedex-button gap-2">
              ▶ {t('hero.exploreProjects')}
            </Link>
            <Link href="/contact" className="pokedex-button gap-2">
              ✉ {t('hero.getInTouch')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
