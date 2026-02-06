'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { animate, stagger } from 'animejs'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Terminal, MapPin, Building2 } from 'lucide-react'
import { personalInfo } from '@/lib/data'

interface GitHubStats {
  projectCount: number
  languageCount: number
}

const HeroBackground = dynamic(() => import('@/components/three/HeroBackground'), {
  ssr: false,
  loading: () => null,
})

// Typing effect component
function TypeWriter({ text, delay = 0, speed = 40 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [displayed, text, speed, started])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}

// Magnetic hover effect
function MagneticElement({ children, className, as: Component = 'div', ...props }: { children: React.ReactNode; className?: string; as?: any; [key: string]: any }) {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.2, y: y * 0.2 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 })
  }, [])

  return (
    <Component
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
      }}
      {...props}
    >
      {children}
    </Component>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [githubStats, setGithubStats] = useState<GitHubStats>({ projectCount: 37, languageCount: 25 })

  // Fetch GitHub stats
  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const response = await fetch('https://api.github.com/users/Adam-Blf/repos?per_page=100&sort=updated', {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        })
        if (!response.ok) return

        const repos = await response.json()
        const excludedRepos = ['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam']
        const filteredRepos = repos.filter((repo: any) =>
          !excludedRepos.includes(repo.name) &&
          !repo.fork &&
          !repo.archived
        )

        // Count unique languages
        const languages = new Set<string>()
        filteredRepos.forEach((repo: any) => {
          if (repo.language) languages.add(repo.language)
          if (repo.topics) repo.topics.forEach((t: string) => languages.add(t))
        })

        setGithubStats({
          projectCount: filteredRepos.length,
          languageCount: Math.min(languages.size, 30)
        })
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err)
      }
    }
    fetchGitHubStats()
  }, [])

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  // Entry animations
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const easing = 'cubicBezier(0.22, 1, 0.36, 1)'

    // Terminal header
    const terminalHeader = container.querySelector('.terminal-header')
    if (terminalHeader) {
      animate(terminalHeader, {
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 600,
        easing,
      })
    }

    // Name letters stagger
    const nameChars = container.querySelectorAll('.name-char')
    if (nameChars.length > 0) {
      animate(nameChars, {
        translateY: [80, 0],
        rotateX: [45, 0],
        opacity: [0, 1],
        duration: 700,
        easing,
        delay: stagger(40, { start: 300 }),
      })
    }

    // Role line
    const heroRole = container.querySelector('.hero-role')
    if (heroRole) {
      animate(heroRole, {
        translateX: [-40, 0],
        opacity: [0, 1],
        duration: 600,
        easing,
        delay: 500,
      })
    }

    // Photo
    const heroPhoto = container.querySelector('.hero-photo')
    if (heroPhoto) {
      animate(heroPhoto, {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 700,
        easing,
        delay: 400,
      })
    }

    // Info section
    const heroInfo = container.querySelector('.hero-info')
    if (heroInfo) {
      animate(heroInfo, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing,
        delay: 600,
      })
    }

    // CTAs
    const heroCtas = container.querySelectorAll('.hero-cta')
    if (heroCtas.length > 0) {
      animate(heroCtas, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing,
        delay: stagger(100, { start: 800 }),
      })
    }

    // Metrics
    const heroMetrics = container.querySelectorAll('.hero-metric')
    if (heroMetrics.length > 0) {
      animate(heroMetrics, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 500,
        easing,
        delay: stagger(80, { start: 1000 }),
      })
    }

    // Footer
    const heroFooter = container.querySelector('.hero-footer')
    if (heroFooter) {
      animate(heroFooter, {
        opacity: [0, 1],
        duration: 500,
        easing,
        delay: 1200,
      })
    }

    // Scroll indicator WAAPI
    if (scrollRef.current) {
      scrollRef.current.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: 'translateY(10px)', opacity: 0.4 },
        { transform: 'translateY(0)', opacity: 1 },
      ], {
        duration: 2000,
        iterations: Infinity,
        easing: 'ease-in-out',
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative flex flex-col overflow-hidden"
    >
      {/* Three.js Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <HeroBackground />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[--bg-deep]/30 via-transparent to-[--bg-deep] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[--bg-deep]/60 via-transparent to-transparent z-[1]" />

      {/* Terminal header bar */}
      <header className="terminal-header relative z-10 pt-28 pb-6" style={{ opacity: 0 }}>
        <div className="container-wide">
          <div className="flex items-center justify-between text-[--text-muted]">
            <div className="flex items-center gap-3">
              <Terminal size={14} className="text-accent" />
              <span className="font-mono text-xs tracking-wider">
                <TypeWriter text="~/adam-beloucif/portfolio" delay={800} speed={30} />
              </span>
            </div>
            <div className="status-online">
              <span className="status-dot" />
              <span className="font-mono text-xs">AVAILABLE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center relative z-10 py-8">
        <div className="container-wide w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left - Name & Title */}
            <div className="lg:col-span-7 space-y-8">
              {/* Name */}
              <h1 className="text-display leading-[0.85]">
                <span className="block overflow-hidden">
                  {'Adam'.split('').map((char, i) => (
                    <span
                      key={i}
                      className="name-char inline-block"
                      style={{ opacity: 0 }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="block overflow-hidden text-accent">
                  {'Beloucif'.split('').map((char, i) => (
                    <span
                      key={i}
                      className="name-char inline-block"
                      style={{ opacity: 0 }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </h1>

              {/* Role */}
              <div className="hero-role flex items-center gap-4" style={{ opacity: 0 }}>
                <div className="divider-accent" />
                <p className="text-title text-[--text-secondary]">
                  Data Engineer
                  <span className="text-[--text-muted]"> & </span>
                  <span className="text-highlight">Fullstack Dev</span>
                </p>
              </div>

              {/* Info */}
              <div className="hero-info max-w-lg space-y-6" style={{ opacity: 0 }}>
                <p className="text-body-lg">
                  Je transforme la <span className="text-accent font-medium">data</span> en décisions
                  et le <span className="text-highlight font-medium">code</span> en impact.
                  M1 Data Engineering & IA @ EFREI Paris.
                </p>

                <div className="flex items-center gap-4 text-sm text-[--text-muted] font-mono">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    Paris, France
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[--text-muted]" />
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} />
                    GHT Psy Sud
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticElement as={Link} href="/projets" className="hero-cta btn btn-primary group">
                  <span>Voir les projets</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticElement>

                <MagneticElement as={Link} href="/contact" className="hero-cta btn btn-outline">
                  <span>Me contacter</span>
                </MagneticElement>
              </div>
            </div>

            {/* Right - Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                className="hero-photo relative"
                style={{
                  opacity: 0,
                  transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl scale-110" />

                {/* Photo container */}
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-[--border-accent] shadow-lg">
                  <Image
                    src="/images/adam-photo.jpg"
                    alt="Adam Beloucif"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border border-[--accent] opacity-20 scale-125 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-[--border]">
            {[
              { value: String(githubStats.projectCount), label: 'Projets GitHub', suffix: '+' },
              { value: '3', label: 'Ans d\'experience', suffix: '+' },
              { value: '8', label: 'Certifications', suffix: '' },
              { value: String(githubStats.languageCount), label: 'Technologies', suffix: '+' },
            ].map((metric, i) => (
              <div key={metric.label} className="hero-metric metric" style={{ opacity: 0 }}>
                <p className="metric-value">
                  {metric.value}
                  <span className="text-[--text-muted] text-lg">{metric.suffix}</span>
                </p>
                <p className="metric-label">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <footer className="hero-footer relative z-10 border-t border-[--border] py-5" style={{ opacity: 0 }}>
        <div className="container-wide">
          <div className="flex items-center justify-between">
            {/* Social links */}
            <div className="flex items-center gap-6">
              {[
                { href: personalInfo.github, icon: Github, label: 'GitHub' },
                { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.email}`, icon: Mail, label: 'Email' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-[--text-secondary] hover:text-accent transition-colors group"
                  aria-label={link.label}
                >
                  <link.icon size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-mono hidden sm:inline">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Scroll indicator */}
            <button
              ref={scrollRef}
              type="button"
              aria-label="Défiler vers le bas"
              className="flex items-center gap-3 text-[--text-muted] cursor-pointer hover:text-accent transition-colors"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="font-mono text-xs tracking-wider hidden md:inline">SCROLL</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </footer>
    </section>
  )
}
