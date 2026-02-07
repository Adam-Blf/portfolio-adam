'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, TrendingUp, GitCommit, Layers, Briefcase } from 'lucide-react'

/**
 * DATA CHRONICLE - Editorial Magazine Aesthetic
 *
 * Design Philosophy:
 * - Bold typographic hierarchy inspired by Bloomberg/Wired
 * - Data as visual design element
 * - Strong grid structure with intentional breaks
 * - Professional tech magazine feel
 */

// Animated data ticker
function DataTicker() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const items = [
    'PYTHON ▲ 90%',
    'TYPESCRIPT ▲ 85%',
    'REACT/NEXT.JS ▲ 85%',
    'SQL/PL-SQL ▲ 80%',
    'DOCKER ▲ 80%',
    'ORACLE ▲ 80%',
    'STREAMLIT ▲ 85%',
  ]

  return (
    <div className="overflow-hidden bg-zinc-900 border-y border-zinc-800 py-2">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ transform: `translateX(-${offset}%)` }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-xs font-mono text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-sm" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// Live metric card
function MetricCard({ value, label, icon: Icon, trend }: {
  value: string
  label: string
  icon: any
  trend?: string
}) {
  return (
    <div className="metric-card opacity-0 p-4 bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <Icon size={16} className="text-zinc-600 group-hover:text-amber-500 transition-colors" />
        {trend && (
          <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
            <TrendingUp size={10} />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white font-mono">{value}</p>
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">{label}</p>
    </div>
  )
}

export default function DataChronicleHero() {
  const containerRef = useRef<HTMLElement>(null)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    // Live time
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    // Animations
    const container = containerRef.current
    if (!container) return () => clearInterval(interval)

    // Headline animation
    const headlines = container.querySelectorAll('.headline-word')
    animate(headlines, {
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(80, { start: 300 }),
      easing: 'cubicBezier(0.16, 1, 0.3, 1)'
    })

    // Column content
    const columns = container.querySelectorAll('.column-content')
    animate(columns, {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(100, { start: 800 }),
      easing: 'cubicBezier(0.4, 0, 0.2, 1)'
    })

    // Metrics
    const metrics = container.querySelectorAll('.metric-card')
    animate(metrics, {
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 400,
      delay: stagger(60, { start: 1200 }),
      easing: 'cubicBezier(0.4, 0, 0.2, 1)'
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col bg-black"
    >
      {/* Top bar - Magazine header */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-amber-500 font-bold text-lg tracking-tight">DATA/CHRONICLE</span>
            <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-zinc-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              LIVE
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
            <span className="hidden sm:inline">PARIS, FR</span>
            <span className="text-amber-500">{currentTime}</span>
          </div>
        </div>
      </header>

      {/* Data ticker */}
      <DataTicker />

      {/* Main content - Editorial grid */}
      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">

          {/* Main headline area - spans 8 columns */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Category tag */}
            <div className="column-content opacity-0 flex items-center gap-3">
              <span className="px-2 py-1 bg-amber-500 text-black text-[10px] font-bold tracking-wider uppercase">
                Featured
              </span>
              <span className="text-xs text-zinc-500 font-mono">Issue #001 / 2025</span>
            </div>

            {/* Massive headline */}
            <h1 className="overflow-hidden">
              {'Adam Beloucif'.split(' ').map((word, i) => (
                <span key={i} className="block overflow-hidden">
                  <span
                    className="headline-word block text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[0.85] tracking-tighter opacity-0"
                    style={{ color: i === 1 ? '#FFB000' : '#FAFAFA' }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <div className="column-content opacity-0 border-l-4 border-amber-500 pl-4 py-2">
              <p className="text-xl md:text-2xl text-zinc-300 font-light">
                Data Engineer & Fullstack Developer
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Building intelligent systems that transform data into strategic decisions
              </p>
            </div>

            {/* Article excerpt */}
            <div className="column-content opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                  Current Position
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Ingenieur PMSI / Data Engineer at Groupe Hospitalier Fondation Vallée - Paul Guiraud.
                  Working on healthcare data systems, predictive models, and BI dashboards.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                  Education
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  M1 Data Engineering & IA at EFREI Paris. Double degree EFREI-ISIT.
                  Former BDE President managing 5,700+ students.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="column-content opacity-0 flex flex-wrap gap-4 pt-4">
              <Link
                href="/projets"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 transition-colors"
              >
                View Projects
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/frise"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 font-medium text-sm hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                View Timeline
              </Link>
            </div>
          </div>

          {/* Sidebar - 4 columns */}
          <aside className="col-span-12 lg:col-span-4 space-y-4">
            {/* Photo card */}
            <div className="column-content opacity-0 relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-800">
              <Image
                src="/images/adam-photo.jpg"
                alt="Adam Beloucif"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay with data */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Paris, France</span>
                  <span className="flex items-center gap-1 text-emerald-500">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Live metrics */}
            <div className="grid grid-cols-2 gap-2">
              <MetricCard
                value="37+"
                label="Projects"
                icon={Layers}
                trend="+12%"
              />
              <MetricCard
                value="500+"
                label="Commits"
                icon={GitCommit}
                trend="+8%"
              />
              <MetricCard
                value="3+"
                label="Years Exp"
                icon={Briefcase}
              />
              <MetricCard
                value="25"
                label="Technologies"
                icon={TrendingUp}
              />
            </div>

            {/* Quick links */}
            <div className="column-content opacity-0 p-4 bg-zinc-900/50 border border-zinc-800">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">
                Quick Access
              </h4>
              <div className="space-y-2">
                {[
                  { label: 'GitHub', href: 'https://github.com/Adam-Blf' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/adambeloucif' },
                  { label: 'Email', href: 'mailto:adam.beloucif@efrei.net' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Bottom bar */}
      <footer className="border-t border-zinc-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs font-mono text-zinc-600">
          <span>© 2025 ADAM BELOUCIF</span>
          <span className="hidden sm:inline">DATA ENGINEERING • FULLSTACK DEV • AI/ML</span>
          <span>V.2.0</span>
        </div>
      </footer>
    </section>
  )
}
