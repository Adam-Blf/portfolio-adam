'use client'

import { useEffect, useRef, useState, useCallback, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { animate, stagger } from 'animejs'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Terminal, MapPin, Building2 } from 'lucide-react'
import { personalInfo } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useI18n } from '@/lib/i18n'

interface GitHubStats {
  projectCount: number
  languageCount: number
  totalCommits: number
  totalStars: number
}

const CyberpunkBackground = dynamic(
  () => import('@/components/three/CyberpunkBackground').catch(() => {
    // Return a fallback component if import fails
    return { default: () => null }
  }),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-br from-[--bg-deep] via-[--bg-surface] to-[--bg-deep]" />
    ),
  }
)

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
  const scrollRef = useRef<HTMLButtonElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    projectCount: 37,
    languageCount: 25,
    totalCommits: 500,
    totalStars: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useI18n()

  // Fetch GitHub stats with caching
  useEffect(() => {
    const CACHE_KEY = 'github-stats'
    const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

    async function fetchGitHubStats() {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setGithubStats(data)
            setIsLoading(false)
            return
          }
        }
      } catch (e) {
        // Cache read failed, continue with fetch
      }

      try {
        const response = await fetch('https://api.github.com/users/Adam-Blf/repos?per_page=100&sort=updated', {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        })
        if (!response.ok) {
          setIsLoading(false)
          return
        }

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
        })

        // Total stars
        const totalStars = filteredRepos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0)

        // Fetch commit counts (limited to avoid rate limiting)
        let totalCommits = 0
        const topRepos = filteredRepos.slice(0, 15) // Top 15 repos only
        await Promise.all(
          topRepos.map(async (repo: any) => {
            try {
              const contribRes = await fetch(
                `https://api.github.com/repos/Adam-Blf/${repo.name}/contributors?per_page=1`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
              )
              if (contribRes.ok) {
                const contributors = await contribRes.json()
                if (Array.isArray(contributors)) {
                  totalCommits += contributors.reduce((s: number, c: any) => s + (c.contributions || 0), 0)
                }
              }
            } catch {
              // Skip failed repos
            }
          })
        )

        // Estimate total commits for all repos
        const avgCommitsPerRepo = totalCommits / topRepos.length
        const estimatedTotal = Math.round(avgCommitsPerRepo * filteredRepos.length)

        const stats = {
          projectCount: filteredRepos.length,
          languageCount: languages.size,
          totalCommits: estimatedTotal,
          totalStars
        }

        setGithubStats(stats)

        // Cache the results
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: stats, timestamp: Date.now() }))
        } catch (e) {
          // Cache write failed, continue
        }
      } catch (err) {
        console.error('Failed to fetch GitHub stats:', err)
      } finally {
        setIsLoading(false)
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

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Entry animations
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Helper to show all hidden elements (fallback)
    const showAllElements = () => {
      container.querySelectorAll('.terminal-header, .name-char, .hero-role, .hero-photo, .hero-info, .hero-cta, .hero-metric, .hero-footer').forEach((el) => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
    }

    // If reduced motion is preferred, show everything immediately
    if (prefersReducedMotion) {
      showAllElements()
      return
    }

    try {
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

      // Fallback: ensure all elements are visible after animation duration
      setTimeout(showAllElements, 2000)

    } catch (e) {
      console.error('Animation error:', e)
      showAllElements()
    }

    // Scroll indicator WAAPI
    if (scrollRef.current && !prefersReducedMotion) {
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
  }, [prefersReducedMotion])

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
        <ErrorBoundary>
          <CyberpunkBackground variant="hero" />
        </ErrorBoundary>
      </div>

      {/* Gradient overlays - more dramatic */}
      <div className="absolute inset-0 bg-gradient-to-b from-[--bg-deep]/50 via-transparent to-[--bg-deep] z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[--bg-deep]/70 via-transparent to-transparent z-[1]" />

      {/* Scanline effect overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-30">
        <div className="w-full h-full" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,176,0,0.03) 2px, rgba(255,176,0,0.03) 4px)'
        }} />
      </div>

      {/* Terminal header bar */}
      <header className="terminal-header relative z-10 pt-28 pb-6 anim-hidden">
        <div className="container-wide">
          <div className="flex items-center justify-between text-[--text-muted]">
            <div className="flex items-center gap-3">
              <Terminal size={14} className="text-accent" />
              <span className="font-mono text-xs tracking-wider">
                <TypeWriter text="~/adam-beloucif/portfolio" delay={800} speed={30} />
              </span>
            </div>
            <div className="status-online" aria-label={t('hero.status')}>
              <span className="status-dot" aria-hidden="true" />
              <span className="font-mono text-xs">{t('hero.status')}</span>
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
              {/* Name - Bold Syne typography */}
              <h1 className="text-display leading-[0.8]">
                <span className="block overflow-hidden">
                  {'Adam'.split('').map((char, i) => (
                    <span
                      key={i}
                      className="name-char inline-block glitch-text anim-hidden"
                      data-text={char}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="block overflow-hidden relative">
                  {'Beloucif'.split('').map((char, i) => (
                    <span
                      key={i}
                      className="name-char inline-block text-accent neon-glow-subtle anim-hidden"
                    >
                      {char}
                    </span>
                  ))}
                  {/* Accent decoration */}
                  <span className="absolute -right-4 top-0 text-[0.3em] text-highlight font-mono tracking-tight opacity-60">
                    .dev
                  </span>
                </span>
              </h1>

              {/* Role - with corner brackets */}
              <div className="hero-role anim-hidden">
                <div className="corner-brackets inline-block">
                  <p className="text-title font-light tracking-tight">
                    <span className="text-[--text-primary]">Data Engineer</span>
                    <span className="text-accent mx-3">//</span>
                    <span className="text-highlight">Fullstack Dev</span>
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="hero-info max-w-lg space-y-6 anim-hidden">
                <p className="text-body-lg">
                  {(() => {
                    const tagline = t('hero.tagline')
                    const parts = tagline.split(/\{(data|code)\}/g)
                    return parts.map((part, i) => {
                      if (part === 'data') return <span key={i} className="text-accent font-medium">data</span>
                      if (part === 'code') return <span key={i} className="text-highlight font-medium">code</span>
                      return <span key={i}>{part}</span>
                    })
                  })()}
                  {' '}{t('hero.education')}
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

              {/* CTAs - Bold styling */}
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticElement
                  as={Link}
                  href="/pokedex"
                  className="hero-cta btn btn-primary group relative overflow-hidden anim-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="font-semibold">{t('hero.cta')}</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-highlight to-accent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity" />
                </MagneticElement>

                <MagneticElement
                  as={Link}
                  href="/centre-pokemon"
                  className="hero-cta btn btn-outline group anim-hidden"
                >
                  <span className="accent-underline">{t('hero.ctaSecondary')}</span>
                </MagneticElement>
              </div>
            </div>

            {/* Right - Photo with geometric frame */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                className="hero-photo relative perspective-card anim-hidden"
                style={{
                  transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                {/* Glow effect - more intense */}
                <div className="absolute inset-0 bg-accent/30 blur-[80px] scale-125" />

                {/* Geometric frame decoration */}
                <div className="absolute -inset-8 border border-accent/30 rotate-6" style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)' }} />
                <div className="absolute -inset-6 border border-highlight/20 -rotate-3" style={{ clipPath: 'polygon(5% 0%, 100% 0%, 100% 95%, 95% 100%, 0% 100%, 0% 5%)' }} />

                {/* Photo container - hexagonal clip */}
                <div className="perspective-card-inner relative w-60 h-60 md:w-80 md:h-80 overflow-hidden shadow-2xl" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }}>
                  <Image
                    src="/images/adam-photo.jpg"
                    alt="Adam Beloucif"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-highlight/10" />
                </div>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent" />

                {/* Status indicator */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[--bg-card] backdrop-blur-lg border border-[--border] rounded-full flex items-center gap-2">
                  <span className="status-dot" />
                  <span className="font-mono text-xs text-[--text-secondary]">Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics row - Bold Neo-Editorial style */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-16 bg-[--border]"
            aria-live="polite"
            aria-busy={isLoading}
          >
            {[
              { value: String(githubStats.projectCount), label: t('hero.metrics.projects'), suffix: '+', loading: isLoading, color: 'accent' },
              { value: String(githubStats.totalCommits), label: t('hero.metrics.commits'), suffix: '+', loading: isLoading, color: 'highlight' },
              { value: '3', label: t('hero.metrics.experience'), suffix: '+', loading: false, color: 'tertiary' },
              { value: String(githubStats.languageCount), label: t('hero.metrics.technologies'), suffix: '', loading: isLoading, color: 'success' },
            ].map((metric, idx) => (
              <div
                key={metric.label}
                className="hero-metric bg-[--bg-surface] p-6 relative group cursor-default anim-hidden"
              >
                {/* Hover line accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-[--${metric.color}] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />

                <p className="font-mono text-4xl md:text-5xl font-bold tracking-tight" aria-label={`${metric.value}${metric.suffix} ${metric.label}`}>
                  {metric.loading ? (
                    <span className="inline-block w-12 h-10 bg-[--bg-elevated] rounded skeleton" aria-hidden="true" />
                  ) : (
                    <>
                      <span className={`text-[--${metric.color}]`} aria-hidden="true">{metric.value}</span>
                      <span className="text-[--text-muted] text-xl" aria-hidden="true">{metric.suffix}</span>
                    </>
                  )}
                </p>
                <p className="text-caption mt-2 opacity-60 group-hover:opacity-100 transition-opacity">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <footer className="hero-footer relative z-10 border-t border-[--border] py-5 anim-hidden">
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
              aria-label={t('hero.scroll')}
              className="flex items-center gap-3 text-[--text-muted] cursor-pointer hover:text-accent transition-colors"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="font-mono text-xs tracking-wider hidden md:inline">{t('hero.scroll')}</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </footer>
    </section>
  )
}
