'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { animate, stagger } from 'animejs'
import Image from 'next/image'
import Link from 'next/link'
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
  ArrowUp,
  ArrowUpRight,
  Mail,
  Filter
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import GradientBackground from '@/components/backgrounds/GradientBackground'

// ─── Types ───────────────────────────────────────────────
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

// ─── Helpers ─────────────────────────────────────────────
const parseDate = (dateStr: string): number => {
  if (!dateStr) return 0
  const [year, month = '01'] = dateStr.split('-')
  return parseInt(year) * 100 + parseInt(month)
}

const getYear = (dateStr: string): string => {
  if (!dateStr) return ''
  return dateStr.split('-')[0]
}

// ─── Event config ────────────────────────────────────────
const eventConfig: Record<EventType, { color: string; icon: typeof Briefcase }> = {
  experience:    { color: '#FFB000', icon: Briefcase },
  education:     { color: '#3B82F6', icon: GraduationCap },
  volunteering:  { color: '#10B981', icon: Heart },
  certification: { color: '#8B5CF6', icon: Award },
}

// ─── Build unified timeline ──────────────────────────────
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
    c.name.includes('Pix') ||
    c.name.includes('RNCP') ||
    c.issuer === 'HubSpot Academy'
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

// ─── Timeline Card ───────────────────────────────────────
function TimelineCard({
  event,
  isExpanded,
  onToggle,
  t,
}: {
  event: TimelineEvent
  isExpanded: boolean
  onToggle: () => void
  t: (key: string) => string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const config = eventConfig[event.type]
  const Icon = config.icon
  const logo = logoMap[event.subtitle] || null

  const handleMouseEnter = useCallback(() => {
    cardRef.current?.animate(
      [
        { transform: 'translateY(0)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
        { transform: 'translateY(-3px)', boxShadow: `0 16px 32px ${config.color}12` },
      ],
      { duration: 250, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' }
    )
  }, [config.color])

  const handleMouseLeave = useCallback(() => {
    cardRef.current?.animate(
      [{ transform: 'translateY(-3px)' }, { transform: 'translateY(0)' }],
      { duration: 200, easing: 'ease-out', fill: 'forwards' }
    )
  }, [])

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[--bg-surface] border border-[--border] rounded-xl
                 cursor-pointer transition-colors overflow-hidden
                 focus-visible:outline-2 focus-visible:outline-[--accent] focus-visible:outline-offset-2
                 hover:border-[--border-accent]"
    >
      {/* Accent top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: config.color }}
      />

      <div className="p-5 md:p-6">
        {/* Current badge */}
        {event.current && (
          <div className="absolute top-3 right-4">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full"
              style={{ backgroundColor: `${config.color}18`, color: config.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.color }} />
              {t('timeline.current')}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-3.5 mb-3">
          {logo ? (
            <div className="relative w-11 h-11 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-[--border] group-hover:scale-105 transition-transform">
              <Image src={logo} alt={event.subtitle} fill className="object-contain p-1.5" />
            </div>
          ) : (
            <div
              className="w-11 h-11 flex-shrink-0 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
              style={{ backgroundColor: `${config.color}12` }}
            >
              <Icon size={20} style={{ color: config.color }} />
            </div>
          )}
          <div className="flex-1 min-w-0 pr-14">
            <h3 className="text-sm font-bold leading-snug group-hover:text-[--accent] transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-xs font-semibold mt-1" style={{ color: config.color }}>
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[--text-muted] mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[--bg-elevated]">
            <Calendar size={10} className="opacity-60" />
            {event.period}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[--bg-elevated]">
              <MapPin size={10} className="opacity-60" />
              {event.location}
            </span>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <p className={`text-xs text-[--text-secondary] leading-relaxed transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {event.description}
          </p>
        )}

        {/* Expand */}
        {event.description && event.description.length > 80 && (
          <button
            className="mt-2.5 flex items-center gap-1 text-[11px] font-medium text-[--accent] opacity-70 group-hover:opacity-100 transition-opacity"
            tabIndex={-1}
          >
            <ChevronDown size={12} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            {isExpanded ? t('timeline.collapse') : t('timeline.expand')}
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────
export default function FrisePage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<EventType | 'all'>('all')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { t } = useI18n()

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

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Header entrance animation
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const elements = header.querySelectorAll('[data-animate]')
    elements.forEach(el => (el as HTMLElement).style.opacity = '0')
    animate(elements, {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 700,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      delay: stagger(80),
    })
  }, [])

  // Timeline scroll reveal
  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target as HTMLElement, {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 600,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '-40px' }
    )
    timeline.querySelectorAll('.timeline-item').forEach((item) => {
      (item as HTMLElement).style.opacity = '0'
      observer.observe(item)
    })
    return () => observer.disconnect()
  }, [filteredEvents])

  const handleFilterChange = useCallback((newFilter: EventType | 'all') => {
    setFilter(newFilter)
    setExpandedCard(null)
  }, [])

  const filterButtons: { key: EventType | 'all'; labelKey: string; icon?: typeof Briefcase; color?: string }[] = [
    { key: 'all', labelKey: 'timeline.filters.all' },
    { key: 'experience', labelKey: 'timeline.filters.experience', icon: Briefcase, color: '#FFB000' },
    { key: 'education', labelKey: 'timeline.filters.education', icon: GraduationCap, color: '#3B82F6' },
    { key: 'volunteering', labelKey: 'timeline.filters.volunteering', icon: Heart, color: '#10B981' },
    { key: 'certification', labelKey: 'timeline.filters.certification', icon: Award, color: '#8B5CF6' },
  ]

  return (
    <>
      <GradientBackground showGrid />

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[--accent] text-[--text-inverse]
                    shadow-lg flex items-center justify-center transition-all duration-300
                    hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>

      <main className="pt-32 pb-24 relative z-10">
        <div className="container-wide">

          {/* ═══ HEADER ═══ */}
          <div ref={headerRef} className="mb-20">
            <p data-animate className="text-caption text-[--accent] mb-4">
              {t('timeline.caption')}
            </p>

            <h1 data-animate className="text-headline mb-6">
              <span className="gradient-text">{t('timeline.title')}</span>
            </h1>

            <p data-animate className="text-body-lg max-w-2xl mb-12">
              {t('timeline.description')}
            </p>

            {/* Filters */}
            <div data-animate className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {filterButtons.map(({ key, labelKey, icon: BtnIcon, color }) => {
                const count = key === 'all' ? allEvents.length : countByType[key]
                const isActive = filter === key
                return (
                  <button
                    key={key}
                    onClick={() => handleFilterChange(key)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full border transition-all duration-200
                      ${isActive
                        ? 'border-[--accent] bg-[--accent]/10 text-[--accent] shadow-sm'
                        : 'border-[--border] text-[--text-secondary] hover:border-[--text-muted] hover:text-[--text-primary]'
                      }`}
                  >
                    {BtnIcon ? <BtnIcon size={13} style={{ color: isActive ? 'currentColor' : color }} /> : <Filter size={13} />}
                    {t(labelKey)}
                    <span className={`ml-0.5 px-1.5 py-0.5 text-[10px] rounded-full ${isActive ? 'bg-[--accent]/20' : 'bg-[--bg-elevated]'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ═══ TIMELINE ═══ */}
          <div ref={timelineRef} className="relative">
            {/* Central line (mobile: left, desktop: center) */}
            <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[--accent]/40 via-[--border] to-transparent" />

            {years.map((year) => (
              <div key={year} className="mb-16 last:mb-0">
                {/* Year marker */}
                <div className="timeline-item relative flex items-center mb-10">
                  <div className="absolute left-0 right-0 h-px bg-[--border] hidden md:block" />
                  <div className="relative z-10 ml-0 md:mx-auto">
                    <div className="flex items-center gap-2.5 px-5 py-2 bg-[--bg-deep] border border-[--accent]/25 rounded-full shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[--accent]" />
                      <span className="font-mono text-xl md:text-2xl font-bold text-[--accent] tracking-tight">
                        {year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Events */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 pl-12 md:pl-0">
                  {eventsByYear[year]?.map((event) => (
                    <div key={event.id} className="timeline-item">
                      <TimelineCard
                        event={event}
                        isExpanded={expandedCard === event.id}
                        onToggle={() => setExpandedCard(expandedCard === event.id ? null : event.id)}
                        t={t}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* End marker */}
            <div className="timeline-item relative flex items-center justify-center pt-8">
              <div className="absolute left-0 right-0 h-px bg-[--border] hidden md:block" />
              <div className="relative z-10 px-5 py-2 bg-[--bg-deep] border border-[--border] rounded-full">
                <span className="text-xs font-medium text-[--text-muted]">{t('timeline.startOfJourney')}</span>
              </div>
            </div>
          </div>

          {/* ═══ STATS ═══ */}
          <div className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: years.length,            label: t('timeline.stats.years'),       color: 'var(--accent)' },
              { value: countByType.experience,   label: t('timeline.stats.experiences'), color: '#FFB000' },
              { value: countByType.education,    label: t('timeline.stats.formations'),  color: '#3B82F6' },
              { value: countByType.volunteering, label: t('timeline.stats.engagements'), color: '#10B981' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative bg-[--bg-surface] border border-[--border] rounded-xl p-6 text-center
                           group hover:border-[--border-accent] transition-colors overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: stat.color }} />
                <p className="font-mono text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}<span className="text-[--text-muted] text-lg">+</span>
                </p>
                <p className="text-xs text-[--text-muted] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ═══ CTA ═══ */}
          <section className="mt-24 py-16 border-t border-[--border]">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-caption text-[--accent] mb-3">{t('timeline.cta.caption')}</p>
              <h2 className="text-title mb-5">{t('timeline.cta.title')}</h2>
              <p className="text-body mb-8">{t('timeline.cta.description')}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn btn-primary group">
                  <Mail size={15} />
                  {t('timeline.cta.contact')}
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link href="/projets" className="btn btn-outline">
                  {t('timeline.cta.projects')}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
