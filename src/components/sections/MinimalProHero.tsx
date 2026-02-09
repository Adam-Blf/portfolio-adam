'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Info } from 'lucide-react'
import GradientBackground from '@/components/backgrounds/GradientBackground'
import { useI18n } from '@/lib/i18n'

export default function MinimalProHero() {
  const containerRef = useRef<HTMLElement>(null)
  const { t } = useI18n()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const elements = container.querySelectorAll('.hero-fade')
    elements.forEach((el, index) => {
      const element = el as HTMLElement
      element.style.opacity = '0'
      element.style.transform = 'translateY(20px)'
      setTimeout(() => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }, 150 + index * 120)
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background: photo with dark gradient overlay (Netflix billboard style) */}
      <div className="absolute inset-0">
        <Image
          src="/images/adam-photo.jpg"
          alt=""
          fill
          className="object-cover object-top"
          priority
          aria-hidden="true"
        />
        {/* Netflix-style gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/90 to-[#141414]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/50" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#141414] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide pb-24 pt-40">
        <div className="max-w-2xl">
          {/* Status Badge */}
          <div className="hero-fade mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[--accent]/90 text-white text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {t('hero.openTo')}
            </span>
          </div>

          {/* Name - Netflix billboard style */}
          <h1 className="hero-fade mb-4">
            <span className="block text-[clamp(3rem,10vw,6rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-2xl">
              Adam
            </span>
            <span className="block text-[clamp(3rem,10vw,6rem)] font-black leading-[0.95] tracking-tight text-[--accent] drop-shadow-2xl">
              Beloucif
            </span>
          </h1>

          {/* Role */}
          <p className="hero-fade text-lg md:text-xl text-white/90 font-medium mb-4">
            {t('hero.role')}
          </p>

          {/* Description */}
          <p className="hero-fade text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            {t('hero.description')}
          </p>

          {/* CTAs - Netflix button style */}
          <div className="hero-fade flex flex-wrap items-center gap-3 mb-10">
            <Link
              href="/projets"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded bg-white text-black font-bold text-base hover:bg-white/80 transition-all"
            >
              <Play size={20} fill="black" />
              {t('hero.exploreProjects')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded bg-white/20 backdrop-blur-sm text-white font-bold text-base hover:bg-white/30 transition-all"
            >
              <Info size={20} />
              {t('hero.getInTouch')}
            </Link>
          </div>

          {/* Stats Row */}
          <div className="hero-fade flex gap-8 pt-6 border-t border-white/10">
            {[
              { value: '37+', label: t('hero.projects') },
              { value: '4+', label: t('hero.yearsXp') },
              { value: '25', label: t('hero.technologies') },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-white font-mono">{stat.value}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
