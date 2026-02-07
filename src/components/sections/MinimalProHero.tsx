'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Briefcase } from 'lucide-react'
import GradientBackground from '@/components/backgrounds/GradientBackground'
import { useI18n } from '@/lib/i18n'

export default function MinimalProHero() {
  const containerRef = useRef<HTMLElement>(null)
  const { t } = useI18n()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Simple CSS animation fallback - elements animate in via CSS
    const elements = container.querySelectorAll('.animate-in')
    elements.forEach((el, index) => {
      const element = el as HTMLElement
      element.style.animationDelay = `${index * 100}ms`
      element.classList.add('animate-fadeUp')
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex items-center overflow-hidden"
    >
      {/* Background */}
      <GradientBackground />

      {/* Content */}
      <div className="relative z-10 container-wide py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Status Badge */}
            <div className="animate-in opacity-0 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--success]/10 border border-[--success]/20 text-[--success] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[--success] animate-pulse" />
                {t('hero.openTo')}
              </span>
            </div>

            {/* Name */}
            <h1 className="animate-in opacity-0 mb-4">
              <span className="block text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-[--text-primary] font-display">
                Adam
              </span>
              <span className="block text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.1] tracking-tight gradient-text font-display">
                Beloucif
              </span>
            </h1>

            {/* Role */}
            <p className="animate-in opacity-0 text-xl md:text-2xl text-[--text-secondary] font-medium mb-6">
              {t('hero.role')}
            </p>

            {/* Description */}
            <p className="animate-in opacity-0 text-[--text-muted] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className="animate-in opacity-0 flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/projets"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[--accent] to-[--highlight] text-white font-semibold text-sm hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl"
              >
                {t('hero.exploreProjects')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[--border] text-[--text-primary] font-semibold text-sm hover:border-[--accent] hover:text-[--accent] transition-all"
              >
                <Briefcase size={16} />
                {t('hero.getInTouch')}
              </Link>
            </div>

            {/* Stats Row */}
            <div className="animate-in opacity-0 flex gap-8 pt-8 border-t border-[--border]">
              {[
                { value: '37+', label: t('hero.projects') },
                { value: '3+', label: t('hero.yearsXp') },
                { value: '25', label: t('hero.technologies') },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-bold gradient-text font-mono">{stat.value}</p>
                  <p className="text-xs text-[--text-muted] uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="animate-in opacity-0 relative">
              {/* Gradient glow behind photo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[--accent]/20 to-[--highlight]/20 rounded-2xl blur-2xl" />

              {/* Photo container */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border border-[--border] shadow-2xl">
                <Image
                  src="/images/adam-photo.jpg"
                  alt="Adam Beloucif"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[--bg-deep]/60 via-transparent to-transparent" />
              </div>

              {/* Location badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-[--bg-surface] border border-[--border] rounded-full text-sm text-[--text-secondary] shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[--success]" />
                Paris, France
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-in opacity-0">
          <span className="text-[10px] text-[--text-muted] tracking-widest uppercase">{t('hero.scroll')}</span>
          <div className="w-px h-8 bg-gradient-to-b from-[--accent] to-transparent" />
        </div>
      </div>
    </section>
  )
}
