'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { animate, stagger } from 'animejs'
import Image from 'next/image'
import {
  experiences,
  education,
  volunteering,
  certifications,
  logoMap
} from '@/lib/data'
import {
  Briefcase,
  GraduationCap,
  Heart,
  Award,
  ChevronDown,
  MapPin,
  Calendar,
  Sparkles,
  ArrowUp
} from 'lucide-react'
import ErrorBoundary from '@/components/ErrorBoundary'

const SpaceBackground = dynamic(
  () => import('@/components/three/SpaceBackground').catch(() => {
    return { default: () => null }
  }),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 -z-10 bg-[#050508]" />,
  }
)

// Types
type EventType = 'experience' | 'education' | 'volunteering' | 'certification'

interface TimelineEvent {
  id: string
  type: EventType
  title: string
  subtitle: string
  period: string
  startDate: string
  endDate: string | null
  location?: string
  description?: string
  current?: boolean
}

// Parse date string to comparable format
const parseDate = (dateStr: string): number => {
  if (!dateStr) return 0
  const [year, month = '01'] = dateStr.split('-')
  return parseInt(year) * 100 + parseInt(month)
}

// Get year from date string
const getYear = (dateStr: string): string => {
  if (!dateStr) return ''
  return dateStr.split('-')[0]
}

// Colors and icons for event types
const eventConfig: Record<EventType, { color: string; icon: typeof Briefcase; label: string; labelFr: string }> = {
  experience: { color: '#FFB000', icon: Briefcase, label: 'Experience', labelFr: 'Expériences' },
  education: { color: '#3178C6', icon: GraduationCap, label: 'Formation', labelFr: 'Formations' },
  volunteering: { color: '#10B981', icon: Heart, label: 'Bénévolat', labelFr: 'Engagements' },
  certification: { color: '#8B5CF6', icon: Award, label: 'Certification', labelFr: 'Certifications' },
}

// Build unified timeline
const buildTimeline = (): TimelineEvent[] => {
  const events: TimelineEvent[] = []

  experiences.forEach((exp) => {
    events.push({
      id: `exp-${exp.id}`,
      type: 'experience',
      title: exp.title,
      subtitle: exp.company,
      period: exp.period,
      startDate: exp.startDate || '',
      endDate: exp.endDate || null,
      location: exp.location,
      description: exp.description,
      current: exp.current,
    })
  })

  education.forEach((edu) => {
    events.push({
      id: `edu-${edu.id}`,
      type: 'education',
      title: edu.degree,
      subtitle: edu.school,
      period: edu.period,
      startDate: edu.startDate || '',
      endDate: edu.endDate || null,
      description: edu.description,
      current: edu.current,
    })
  })

  volunteering.forEach((vol, idx) => {
    events.push({
      id: `vol-${idx}`,
      type: 'volunteering',
      title: vol.role,
      subtitle: vol.org,
      period: vol.period,
      startDate: vol.startDate || '',
      endDate: vol.endDate || null,
      description: vol.scope,
      current: !vol.endDate,
    })
  })

  const majorCerts = certifications.filter(c =>
    c.issuer === 'Microsoft' ||
    c.issuer === 'Marine Nationale' ||
    c.name.includes('Pix')
  )
  majorCerts.forEach((cert, idx) => {
    events.push({
      id: `cert-${idx}`,
      type: 'certification',
      title: cert.name,
      subtitle: cert.issuer,
      period: cert.year,
      startDate: cert.date || `${cert.year}-01`,
      endDate: null,
    })
  })

  return events.sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate))
}

// Timeline Card with WAAPI micro-interactions
function TimelineCard({
  event,
  isLeft,
  isExpanded,
  onToggle
}: {
  event: TimelineEvent
  isLeft: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const config = eventConfig[event.type]
  const Icon = config.icon
  const logo = logoMap[event.subtitle] || null

  // WAAPI hover animation
  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.animate([
      { transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 rgba(255,176,0,0)' },
      { transform: 'translateY(-4px) scale(1.01)', boxShadow: '0 20px 40px rgba(255,176,0,0.1)' }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards'
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.animate([
      { transform: 'translateY(-4px) scale(1.01)', boxShadow: '0 20px 40px rgba(255,176,0,0.1)' },
      { transform: 'translateY(0) scale(1)', boxShadow: '0 0 0 rgba(255,176,0,0)' }
    ], {
      duration: 200,
      easing: 'ease-out',
      fill: 'forwards'
    })
  }, [])

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[--bg-surface]/90 backdrop-blur-md border border-[--border]
                 cursor-pointer transition-colors duration-300 overflow-hidden
                 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      style={{
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
        borderColor: `${config.color}30`
      }}
    >
      {/* Corner cut decoration */}
      <div
        className="absolute top-0 right-0 w-5 h-5"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${config.color}40 50%)`
        }}
      />

      {/* Top accent bar with animated glow */}
      <div
        className="absolute top-0 left-0 right-5 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: config.color }}
      />
      <div
        className="absolute top-0 left-0 right-5 h-1 opacity-0 group-hover:opacity-60 blur-sm transition-opacity"
        style={{ backgroundColor: config.color }}
      />

      <div className="p-6 md:p-8">
        {/* Current badge - more geometric */}
        {event.current && (
          <div className="absolute top-4 right-8">
            <span
              className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white"
              style={{
                backgroundColor: config.color,
                clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)'
              }}
            >
              <span className="relative flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                En cours
              </span>
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          {logo ? (
            <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden bg-white border border-[--border] group-hover:scale-105 transition-transform"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}>
              <Image src={logo} alt={event.subtitle} fill className="object-contain p-2" />
            </div>
          ) : (
            <div
              className="w-14 h-14 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform"
              style={{
                backgroundColor: `${config.color}15`,
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)'
              }}
            >
              <Icon size={24} style={{ color: config.color }} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-sm font-semibold mt-1.5 tracking-wide" style={{ color: config.color }}>
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Meta - more cyberpunk style */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[--text-muted] mb-4 font-mono">
          <span className="flex items-center gap-1.5 px-2 py-1 bg-[--bg-elevated] border border-[--border]">
            <Calendar size={10} className="text-accent" />
            {event.period}
          </span>
          {event.location && (
            <span className="flex items-center gap-1.5 px-2 py-1 bg-[--bg-elevated] border border-[--border]">
              <MapPin size={10} className="text-highlight" />
              {event.location}
            </span>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <p className={`text-sm text-[--text-secondary] leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {event.description}
          </p>
        )}

        {/* Expand indicator */}
        {event.description && event.description.length > 100 && (
          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-accent/70 group-hover:text-accent transition-colors">
            <span className="w-4 h-px bg-current" />
            <ChevronDown size={12} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded ? 'COLLAPSE' : 'EXPAND'}
            <span className="flex-1 h-px bg-current opacity-30" />
          </div>
        )}

        {/* Type badge - bottom corner */}
        <div
          className="absolute bottom-0 right-0 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest opacity-50 group-hover:opacity-80 transition-opacity"
          style={{
            color: config.color,
            backgroundColor: `${config.color}15`,
            clipPath: 'polygon(12px 0, 100% 0, 100% 100%, 0 100%)'
          }}
        >
          {config.label}
        </div>
      </div>
    </div>
  )
}

// Counter animation with WAAPI
function AnimatedCounter({ end, label }: { end: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current || !valueRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          // WAAPI fade in
          ref.current?.animate([
            { opacity: 0, transform: 'translateY(20px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' })

          // Counter with anime.js
          const counter = { val: 0 }
          animate(counter, {
            val: end,
            duration: 2000,
            easing: 'outExpo',
            onUpdate: () => {
              if (valueRef.current) valueRef.current.textContent = Math.round(counter.val).toString()
            },
          })
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="text-center group" style={{ opacity: 0 }}>
      <div className="font-mono text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
        <span ref={valueRef}>0</span>
        <span className="text-accent/50">+</span>
      </div>
      <div className="text-sm text-[--text-muted] uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default function FrisePage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<EventType | 'all'>('all')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const allEvents = useMemo(() => buildTimeline(), [])

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return allEvents
    return allEvents.filter(e => e.type === filter)
  }, [allEvents, filter])

  const eventsByYear = useMemo(() => {
    const grouped: Record<string, TimelineEvent[]> = {}
    filteredEvents.forEach(event => {
      const year = getYear(event.startDate)
      if (!grouped[year]) grouped[year] = []
      grouped[year].push(event)
    })
    return grouped
  }, [filteredEvents])

  const years = useMemo(() =>
    Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a)),
    [eventsByYear]
  )

  const countByType = useMemo(() => ({
    experience: allEvents.filter(e => e.type === 'experience').length,
    education: allEvents.filter(e => e.type === 'education').length,
    volunteering: allEvents.filter(e => e.type === 'volunteering').length,
    certification: allEvents.filter(e => e.type === 'certification').length,
  }), [allEvents])

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Header animation with anime.js
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const elements = header.querySelectorAll('[data-animate]')
    elements.forEach(el => (el as HTMLElement).style.opacity = '0')

    animate(elements, {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      delay: stagger(100),
    })
  }, [])

  // Timeline items scroll animation
  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target as HTMLElement

            animate(item, {
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 700,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            })

            observer.unobserve(item)
          }
        })
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    timeline.querySelectorAll('.timeline-item').forEach((item) => {
      (item as HTMLElement).style.opacity = '0'
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [filteredEvents])

  // Filter change animation
  const handleFilterChange = useCallback((newFilter: EventType | 'all') => {
    setFilter(newFilter)
    setExpandedCard(null)

    // Animate filter pills with WAAPI
    document.querySelectorAll('.filter-pill').forEach((pill, i) => {
      pill.animate([
        { transform: 'scale(0.95)' },
        { transform: 'scale(1)' }
      ], { duration: 200, delay: i * 30, easing: 'ease-out' })
    })
  }, [])

  return (
    <>
      {/* Three.js Space Background */}
      <ErrorBoundary>
        <SpaceBackground variant="default" />
      </ErrorBoundary>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-accent text-white shadow-lg
                    flex items-center justify-center transition-all duration-300
                    hover:scale-110 hover:shadow-xl ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Retour en haut"
      >
        <ArrowUp size={20} />
      </button>

      <main className="pt-32 pb-24 relative z-10">
        <div className="container-wide">

          {/* Header - Bold Neo-Editorial */}
          <div ref={headerRef} className="mb-24">
            <div data-animate className="flex items-center gap-3 mb-6">
              <span className="text-caption text-accent">// Parcours</span>
              <span className="w-16 h-px bg-accent" />
              <Sparkles className="w-4 h-4 text-accent" />
            </div>

            <h1 data-animate className="text-display mb-8 leading-[0.85]">
              <span className="block text-[--text-primary] glitch-text" data-text="Mon">Mon</span>
              <span className="block text-accent neon-glow-subtle relative">
                Parcours
                <span className="absolute -right-8 top-0 text-[0.15em] text-highlight font-mono tracking-tight opacity-50 rotate-90">
                  .journey
                </span>
              </span>
            </h1>

            <p data-animate className="text-body-lg max-w-2xl mb-16 text-[--text-secondary] border-l-2 border-accent/30 pl-6">
              De la Marine Nationale aux hôpitaux, en passant par la présidence du BDE EFREI —
              chaque étape a forgé ma vision unique du Data Engineering.
            </p>

            {/* Filters with WAAPI */}
            <div data-animate className="flex flex-wrap gap-3" role="group" aria-label="Filtrer par catégorie">
              <button
                onClick={() => handleFilterChange('all')}
                className={`filter-pill px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 border flex items-center gap-2
                  ${filter === 'all' ? 'border-accent bg-accent/10 text-accent' : 'border-[--border] text-[--text-secondary] hover:border-accent/50'}`}
              >
                Tout
                <span className="px-1.5 py-0.5 text-xs rounded bg-[--bg-elevated]">{allEvents.length}</span>
              </button>

              {(Object.keys(eventConfig) as EventType[]).map((type) => {
                const config = eventConfig[type]
                const count = countByType[type]
                return (
                  <button
                    key={type}
                    onClick={() => handleFilterChange(type)}
                    className={`filter-pill px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 border flex items-center gap-2
                      ${filter === type ? 'border-accent bg-accent/10 text-accent' : 'border-[--border] text-[--text-secondary] hover:border-accent/50'}`}
                  >
                    <config.icon size={14} style={{ color: filter === type ? 'currentColor' : config.color }} />
                    {config.label}
                    <span className="px-1.5 py-0.5 text-xs rounded bg-[--bg-elevated]">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-[--border] to-transparent hidden md:block" />

            {years.map((year, yearIdx) => (
              <div key={year} className="mb-24 last:mb-0">
                {/* Year marker - Bold geometric */}
                <div className="timeline-item relative flex items-center justify-center mb-16">
                  {/* Horizontal lines */}
                  <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

                  {/* Year container with geometric styling */}
                  <div className="relative z-10 px-12 py-6 bg-[--bg-deep] border border-accent/20"
                       style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}>
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-accent/40" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-accent/40" />

                    <span className="font-mono text-6xl md:text-8xl font-black text-accent neon-glow-subtle tracking-tighter">
                      {year}
                    </span>

                    {/* Small label */}
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-accent/50 tracking-widest">
                      // YEAR
                    </span>
                  </div>
                </div>

                {/* Events for this year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {eventsByYear[year]?.map((event, eventIdx) => (
                    <div
                      key={event.id}
                      className="timeline-item"
                    >
                      <TimelineCard
                        event={event}
                        isLeft={eventIdx % 2 === 0}
                        isExpanded={expandedCard === event.id}
                        onToggle={() => setExpandedCard(expandedCard === event.id ? null : event.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Timeline end */}
            <div className="timeline-item relative flex items-center justify-center pt-12">
              <div className="absolute left-0 right-0 h-px bg-[--border]" />
              <div className="relative z-10 px-6 py-3 bg-[--bg-deep] border border-[--border] rounded-full">
                <span className="font-mono text-sm text-[--text-muted]">Début du parcours</span>
              </div>
            </div>
          </div>

          {/* Stats footer - Grid style */}
          <div className="mt-40 relative">
            {/* Section label */}
            <div className="absolute -top-8 left-0 flex items-center gap-3">
              <span className="text-caption text-accent">// STATS</span>
              <span className="w-20 h-px bg-accent/50" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-[--border]">
              {[
                { end: years.length, label: 'Années', color: 'accent' },
                { end: countByType.experience, label: 'Expériences', color: 'highlight' },
                { end: countByType.education, label: 'Formations', color: 'tertiary' },
                { end: countByType.volunteering, label: 'Engagements', color: 'success' },
              ].map((stat, i) => (
                <div key={stat.label} className="bg-[--bg-surface] p-8 group relative overflow-hidden">
                  {/* Hover accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-[--${stat.color}] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`} />

                  <div className="font-mono text-5xl md:text-6xl font-black mb-3" style={{ color: `var(--${stat.color})` }}>
                    {stat.end}<span className="text-[--text-muted] text-2xl">+</span>
                  </div>
                  <div className="text-caption opacity-60 group-hover:opacity-100 transition-opacity">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
