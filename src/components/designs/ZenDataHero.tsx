'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin } from 'lucide-react'

/**
 * ZEN DATA - Minimalist Japanese Aesthetic
 *
 * Design Philosophy:
 * - Ma (間): Embrace negative space as a design element
 * - Wabi-sabi: Find beauty in imperfection and simplicity
 * - Ink-wash inspired gradients and textures
 * - Slow, contemplative animations
 */

// Ink drop animation component
function InkDrop({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    el.animate([
      { transform: 'scale(0)', opacity: 0 },
      { transform: 'scale(1)', opacity: 0.15 },
      { transform: 'scale(2)', opacity: 0 }
    ], {
      duration: 4000,
      delay,
      iterations: Infinity,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    })
  }, [delay])

  return (
    <div
      ref={ref}
      className="absolute rounded-full bg-gradient-radial from-amber-500/30 to-transparent"
      style={{
        width: '400px',
        height: '400px',
        filter: 'blur(60px)',
      }}
    />
  )
}

// Vertical Japanese text decoration
function VerticalText({ text, className }: { text: string; className?: string }) {
  return (
    <div className={`writing-vertical text-[10px] tracking-[0.5em] text-stone-400 font-mono ${className}`}>
      {text}
    </div>
  )
}

export default function ZenDataHero() {
  const containerRef = useRef<HTMLElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
    const container = containerRef.current
    if (!container) return

    // Gentle fade-in animations
    const chars = container.querySelectorAll('.char')
    if (chars.length > 0) {
      animate(chars, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: stagger(60, { start: 500 }),
        easing: 'cubicBezier(0.4, 0, 0.2, 1)'
      })
    }

    // Subtitle line
    const subtitle = container.querySelector('.subtitle-line')
    if (subtitle) {
      animate(subtitle, {
        scaleX: [0, 1],
        duration: 1200,
        delay: 1200,
        easing: 'cubicBezier(0.4, 0, 0.2, 1)'
      })
    }

    // Content reveal
    const content = container.querySelectorAll('.reveal-content')
    animate(content, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: stagger(150, { start: 1400 }),
      easing: 'cubicBezier(0.4, 0, 0.2, 1)'
    })
  }, [])

  const name = "Adam Beloucif"

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0C0A09 0%, #1C1917 50%, #0C0A09 100%)'
      }}
    >
      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Ink drops - meditative floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4">
          <InkDrop delay={0} />
        </div>
        <div className="absolute bottom-1/3 right-1/4">
          <InkDrop delay={2000} />
        </div>
      </div>

      {/* Vertical decorative lines */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-700/30 to-transparent" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-700/30 to-transparent" />

      {/* Vertical Japanese-style text */}
      <VerticalText
        text="DATA • ENGINEER • 2025"
        className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block"
      />
      <VerticalText
        text="FULLSTACK • DEVELOPER"
        className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block"
      />

      {/* Main content */}
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: Typography */}
          <div className="lg:col-span-7 space-y-12">
            {/* Small label */}
            <div className="reveal-content flex items-center gap-4 opacity-0">
              <div className="w-12 h-px bg-amber-500/60" />
              <span className="text-xs tracking-[0.3em] text-stone-500 font-mono uppercase">
                Portfolio 2025
              </span>
            </div>

            {/* Name - Split into characters for animation */}
            <h1 className="relative">
              <span className="block text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight">
                {name.split('').map((char, i) => (
                  <span
                    key={i}
                    className={`char inline-block opacity-0 ${char === ' ' ? 'w-4' : ''}`}
                    style={{ color: i >= 5 ? '#FFB000' : '#FAFAF9' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>

              {/* Decorative line under name */}
              <div className="subtitle-line absolute -bottom-4 left-0 h-[2px] w-32 bg-gradient-to-r from-amber-500 to-transparent origin-left scale-x-0" />
            </h1>

            {/* Role */}
            <div className="reveal-content opacity-0 space-y-1 pt-4">
              <p className="text-xl md:text-2xl text-stone-300 font-light tracking-wide">
                Data Engineer
              </p>
              <p className="text-lg text-stone-500 font-light">
                & Fullstack Developer
              </p>
            </div>

            {/* Bio - Haiku-like brevity */}
            <p className="reveal-content opacity-0 text-stone-400 text-lg leading-relaxed max-w-md font-light">
              Transforming raw data into strategic decisions.
              <br />
              Building intelligent systems with precision.
            </p>

            {/* Location */}
            <div className="reveal-content opacity-0 flex items-center gap-2 text-stone-500 text-sm">
              <MapPin size={14} className="text-amber-500/60" />
              <span>Paris, France</span>
              <span className="mx-2">•</span>
              <span>GHT Psy Sud</span>
            </div>

            {/* CTAs - Minimal */}
            <div className="reveal-content opacity-0 flex items-center gap-8 pt-4">
              <Link
                href="/projects"
                className="group flex items-center gap-3 text-amber-500 hover:text-amber-400 transition-colors"
              >
                <span className="text-sm tracking-wide">View Work</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="text-stone-500 hover:text-stone-300 text-sm tracking-wide transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right: Photo with zen frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="reveal-content opacity-0 relative">
              {/* Outer frame - asymmetric */}
              <div className="absolute -inset-6 border border-stone-800"
                   style={{ clipPath: 'polygon(0 5%, 95% 0, 100% 95%, 5% 100%)' }} />

              {/* Inner glow */}
              <div className="absolute inset-0 bg-amber-500/10 blur-3xl" />

              {/* Photo */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 overflow-hidden bg-stone-900">
                <Image
                  src="/images/adam-photo.jpg"
                  alt="Adam Beloucif"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
              </div>

              {/* Corner accent */}
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-amber-500/60" />
              <div className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-amber-500/60" />

              {/* Status */}
              <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom metrics - Minimal */}
        <div className="reveal-content opacity-0 mt-24 pt-12 border-t border-stone-800/50">
          <div className="flex flex-wrap justify-center lg:justify-start gap-16">
            {[
              { value: '37+', label: 'Projects' },
              { value: '3+', label: 'Years' },
              { value: '25', label: 'Technologies' },
            ].map((metric) => (
              <div key={metric.label} className="text-center lg:text-left">
                <p className="text-3xl font-light text-stone-200 font-mono">{metric.value}</p>
                <p className="text-xs text-stone-600 tracking-wider uppercase mt-1">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator - Subtle */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="reveal-content opacity-0 flex flex-col items-center gap-2 text-stone-600">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-stone-600 to-transparent animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </section>
  )
}
