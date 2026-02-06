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
  Sparkles
} from 'lucide-react'

const PageBackground = dynamic(() => import('@/components/three/PageBackground'), {
  ssr: false,
  loading: () => null,
})

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
  experience: { color: '#e07a5f', icon: Briefcase, label: 'Experience', labelFr: 'Experiences' },
  education: { color: '#3178C6', icon: GraduationCap, label: 'Formation', labelFr: 'Formations' },
  volunteering: { color: '#47A248', icon: Heart, label: 'Benevolat', labelFr: 'Engagements' },
  certification: { color: '#9333EA', icon: Award, label: 'Certification', labelFr: 'Certifications' },
}

// Build unified timeline
const buildTimeline = (): TimelineEvent[] => {
  const events: TimelineEvent[] = []

  // Add experiences
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

  // Add education
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

  // Add volunteering
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

  // Add certifications (major ones only)
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

  // Sort by start date descending
  return events.sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate))
}

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!startOnView || !ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(end * eased))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, startOnView])

  return { count, ref }
}

export default function FrisePage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const yearIndicatorRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<EventType | 'all'>('all')
  const [isScrolling, setIsScrolling] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const allEvents = useMemo(() => buildTimeline(), [])

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return allEvents
    return allEvents.filter(e => e.type === filter)
  }, [allEvents, filter])

  // Group events by year
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

  // Active year - dynamically set to most recent
  const [activeYear, setActiveYear] = useState<string>(() => years[0] || '2025')

  // Update active year when years change
  useEffect(() => {
    if (years.length > 0 && !years.includes(activeYear)) {
      setActiveYear(years[0])
    }
  }, [years, activeYear])

  // Header animation
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const caption = header.querySelector('.frise-caption')
    const title = header.querySelector('.frise-title')
    const subtitle = header.querySelector('.frise-subtitle')
    const filterPills = header.querySelectorAll('.filter-pill')

    if (caption) {
      animate(caption, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      })
    }

    if (title) {
      animate(title, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 900,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        delay: 100,
      })
    }

    if (subtitle) {
      animate(subtitle, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        delay: 200,
      })
    }

    if (filterPills.length > 0) {
      animate(filterPills, {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        delay: stagger(50, { start: 400 }),
      })
    }
  }, [])

  // Scroll-triggered animations for timeline items
  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target as HTMLElement
            const direction = item.dataset.direction === 'left' ? -1 : 1

            animate(item, {
              translateX: [50 * direction, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            })

            observer.unobserve(item)
          }
        })
      },
      { threshold: 0.15, rootMargin: '-80px' }
    )

    timeline.querySelectorAll('.timeline-item').forEach((item) => {
      observer.observe(item)
    })

    return () => observer.disconnect()
  }, [filteredEvents])

  // Update active year on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return

      const yearSections = document.querySelectorAll('[data-year]')
      let currentYear = activeYear

      yearSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 200 && rect.bottom > 0) {
          currentYear = section.getAttribute('data-year') || activeYear
        }
      })

      if (currentYear !== activeYear) {
        setActiveYear(currentYear)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeYear, isScrolling])

  // Scroll to year
  const scrollToYear = useCallback((year: string) => {
    setIsScrolling(true)
    const section = document.querySelector(`[data-year="${year}"]`)
    if (section) {
      const offset = 120
      const top = section.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveYear(year)
    }
    setTimeout(() => setIsScrolling(false), 1000)
  }, [])

  const getEventLogo = (event: TimelineEvent): string | null => {
    return logoMap[event.subtitle] || null
  }

  // Stats counters
  const yearsCounter = useCountUp(years.length, 1500)
  const expCounter = useCountUp(experiences.length, 1500)
  const eduCounter = useCountUp(education.length, 1500)
  const volCounter = useCountUp(volunteering.length, 1500)

  // Count by type for filter badges
  const countByType = useMemo(() => ({
    experience: allEvents.filter(e => e.type === 'experience').length,
    education: allEvents.filter(e => e.type === 'education').length,
    volunteering: allEvents.filter(e => e.type === 'volunteering').length,
    certification: allEvents.filter(e => e.type === 'certification').length,
  }), [allEvents])

  return (
    <>
      <PageBackground variant="grid" />

      {/* Fixed Year Navigator */}
      <nav
        ref={yearIndicatorRef}
        aria-label="Navigation par annee"
        className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1"
      >
        <div className="text-caption text-[--text-muted] mb-4 -rotate-90 origin-center whitespace-nowrap" aria-hidden="true">
          Navigation
        </div>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => scrollToYear(year)}
            aria-label={`Aller a l'annee ${year}`}
            aria-current={activeYear === year ? 'true' : undefined}
            className={`
              relative w-10 h-10 flex items-center justify-center
              font-mono text-xs transition-all duration-300
              ${activeYear === year
                ? 'text-accent scale-110'
                : 'text-[--text-muted] hover:text-[--text-secondary]'}
            `}
          >
            {activeYear === year && (
              <span className="absolute inset-0 rounded-full border border-accent opacity-30 animate-ping" aria-hidden="true" />
            )}
            <span className="relative z-10" aria-hidden="true">{year.slice(2)}</span>
            {activeYear === year && (
              <span className="absolute inset-2 rounded-full bg-accent/10" aria-hidden="true" />
            )}
          </button>
        ))}
        <ChevronDown className="mt-4 text-[--text-muted] animate-bounce" size={16} aria-hidden="true" />
      </nav>

      <main className="pt-32 pb-24">
        <div className="container-wide">

          {/* Header */}
          <div ref={headerRef} className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="frise-caption text-caption" style={{ opacity: 0 }}>
                Parcours
              </span>
              <span className="w-12 h-px bg-accent/50" aria-hidden="true" />
              <Sparkles className="w-4 h-4 text-accent animate-pulse" aria-hidden="true" />
            </div>

            <h1 className="frise-title text-display mb-6" style={{ opacity: 0 }}>
              Mon<br />
              <span className="text-accent">Parcours</span>
            </h1>

            <p className="frise-subtitle text-body-lg max-w-2xl mb-12" style={{ opacity: 0 }}>
              De la Marine Nationale aux hopitaux, en passant par la presidence du BDE EFREI (6500+ etudiants) - chaque etape a forge ma vision unique du Data Engineering.
            </p>

            {/* Filters */}
            <div className="flex flex-wrap gap-3" role="group" aria-label="Filtrer par categorie">
              <button
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                className={`
                  filter-pill px-5 py-2.5 text-sm font-medium rounded-full
                  transition-all duration-300 border flex items-center gap-2
                  ${filter === 'all'
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-[--border] text-[--text-secondary] hover:border-[--text-muted]'}
                `}
                style={{ opacity: 0 }}
              >
                Tout
                <span className="px-1.5 py-0.5 text-xs rounded bg-[--bg-elevated]" aria-hidden="true">
                  {allEvents.length}
                </span>
                <span className="sr-only">({allEvents.length} elements)</span>
              </button>

              {(Object.keys(eventConfig) as EventType[]).map((type) => {
                const config = eventConfig[type]
                const count = countByType[type]

                return (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    aria-pressed={filter === type}
                    className={`
                      filter-pill px-5 py-2.5 text-sm font-medium rounded-full
                      transition-all duration-300 border flex items-center gap-2
                      ${filter === type
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-[--border] text-[--text-secondary] hover:border-[--text-muted]'}
                    `}
                    style={{ opacity: 0 }}
                  >
                    <config.icon size={14} style={{ color: filter === type ? 'currentColor' : config.color }} aria-hidden="true" />
                    {config.label}
                    <span className="px-1.5 py-0.5 text-xs rounded bg-[--bg-elevated]" aria-hidden="true">
                      {count}
                    </span>
                    <span className="sr-only">({count} elements)</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[--border] to-transparent hidden md:block" />

            {years.map((year) => (
              <div key={year} data-year={year} className="mb-24 last:mb-0">
                {/* Year marker */}
                <div className="relative flex items-center justify-center mb-16">
                  <div className="absolute left-0 right-0 h-px bg-[--border]" />
                  <div className="relative z-10 px-8 py-4 bg-[--bg-deep]">
                    <span className="font-mono text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-accent via-accent/60 to-accent/20">
                      {year}
                    </span>
                  </div>
                </div>

                {/* Events for this year */}
                <div className="space-y-8 md:space-y-0">
                  {eventsByYear[year]?.map((event, eventIdx) => {
                    const config = eventConfig[event.type]
                    const Icon = config.icon
                    const isLeft = eventIdx % 2 === 0
                    const logo = getEventLogo(event)
                    const isExpanded = expandedCard === event.id

                    return (
                      <div
                        key={event.id}
                        data-direction={isLeft ? 'left' : 'right'}
                        className={`
                          timeline-item relative
                          md:w-[calc(50%-2rem)]
                          ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
                          mb-8 md:mb-16
                        `}
                        style={{ opacity: 0 }}
                      >
                        {/* Connector dot */}
                        <div
                          className={`
                            hidden md:block absolute top-8
                            ${isLeft ? '-right-6' : '-left-6'}
                          `}
                        >
                          <div
                            className="w-4 h-4 rounded-full border-4 border-[--bg-deep] transition-transform duration-300 hover:scale-125"
                            style={{ backgroundColor: config.color }}
                          />
                        </div>

                        {/* Connector line */}
                        <div
                          className={`
                            hidden md:block absolute top-10 w-8 h-px
                            ${isLeft ? '-right-8' : '-left-8'}
                          `}
                          style={{ backgroundColor: config.color, opacity: 0.3 }}
                        />

                        {/* Card */}
                        <div
                          role="button"
                          tabIndex={0}
                          aria-expanded={isExpanded}
                          onClick={() => setExpandedCard(isExpanded ? null : event.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setExpandedCard(isExpanded ? null : event.id)
                            }
                          }}
                          className="group relative bg-[--bg-surface] border border-[--border] p-6 md:p-8
                                     hover:border-opacity-50 transition-all duration-500 cursor-pointer
                                     hover:shadow-lg hover:shadow-accent/5 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                          style={{
                            borderColor: `${config.color}20`,
                            '--hover-color': config.color
                          } as React.CSSProperties}
                        >
                          {/* Accent line */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: config.color }}
                          />

                          {/* Current badge - top right */}
                          {event.current && (
                            <div className="absolute -top-3 right-4">
                              <span
                                className="px-3 py-1 text-xs font-bold rounded-full animate-pulse"
                                style={{
                                  backgroundColor: config.color,
                                  color: 'white'
                                }}
                              >
                                En cours
                              </span>
                            </div>
                          )}

                          {/* Header */}
                          <div className="flex items-start gap-4 mb-4">
                            {/* Logo or Icon */}
                            {logo ? (
                              <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-[--border] group-hover:scale-105 transition-transform">
                                <Image
                                  src={logo}
                                  alt={event.subtitle}
                                  fill
                                  className="object-contain p-1.5"
                                />
                              </div>
                            ) : (
                              <div
                                className="w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform"
                                style={{ backgroundColor: `${config.color}15` }}
                              >
                                <Icon size={24} style={{ color: config.color }} />
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold leading-tight group-hover:text-accent transition-colors line-clamp-2">
                                {event.title}
                              </h3>
                              <p className="text-sm font-medium mt-1" style={{ color: config.color }}>
                                {event.subtitle}
                              </p>
                            </div>
                          </div>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-[--text-muted] mb-3">
                            <span className="flex items-center gap-1.5 font-mono">
                              <Calendar size={12} aria-hidden="true" />
                              <span className="sr-only">Periode: </span>{event.period}
                            </span>
                            {event.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={12} aria-hidden="true" />
                                <span className="sr-only">Lieu: </span>{event.location}
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
                            <div className="mt-2 text-xs text-accent/60 group-hover:text-accent transition-colors">
                              {isExpanded ? 'Cliquer pour reduire' : 'Cliquer pour voir plus'}
                            </div>
                          )}

                          {/* Type badge */}
                          <div
                            className={`
                              absolute bottom-4 right-4
                              px-2 py-1 text-xs font-mono uppercase tracking-wider
                              opacity-40 group-hover:opacity-70 transition-opacity
                            `}
                            style={{ color: config.color }}
                          >
                            {config.label}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* Timeline end */}
            <div className="relative flex items-center justify-center pt-12">
              <div className="absolute left-0 right-0 h-px bg-[--border]" />
              <div className="relative z-10 px-6 py-3 bg-[--bg-deep] border border-[--border] rounded-full">
                <span className="font-mono text-sm text-[--text-muted]">
                  Debut du parcours
                </span>
              </div>
            </div>
          </div>

          {/* Stats footer */}
          <div className="mt-32 pt-16 border-t border-[--border]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div ref={yearsCounter.ref} className="text-center group">
                <div className="font-mono text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                  {yearsCounter.count}<span className="text-accent/50">+</span>
                </div>
                <div className="text-sm text-[--text-muted] uppercase tracking-wider">
                  Annees
                </div>
              </div>
              <div ref={expCounter.ref} className="text-center group">
                <div className="font-mono text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                  {expCounter.count}
                </div>
                <div className="text-sm text-[--text-muted] uppercase tracking-wider">
                  {eventConfig.experience.labelFr}
                </div>
              </div>
              <div ref={eduCounter.ref} className="text-center group">
                <div className="font-mono text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                  {eduCounter.count}
                </div>
                <div className="text-sm text-[--text-muted] uppercase tracking-wider">
                  {eventConfig.education.labelFr}
                </div>
              </div>
              <div ref={volCounter.ref} className="text-center group">
                <div className="font-mono text-4xl md:text-5xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform">
                  {volCounter.count}
                </div>
                <div className="text-sm text-[--text-muted] uppercase tracking-wider">
                  {eventConfig.volunteering.labelFr}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
