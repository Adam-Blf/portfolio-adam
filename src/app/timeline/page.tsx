'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
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
  Filter,
  X
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'

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

// ─── Type colors per event type ──────────────────
const eventConfig: Record<EventType, { color: string; bg: string; label: string; icon: typeof Briefcase }> = {
  experience:    { color: '#00f0ff', bg: 'rgba(0,240,255,0.1)',  label: 'timeline.filters.experience', icon: Briefcase },
  education:     { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', label: 'timeline.filters.education', icon: GraduationCap },
  volunteering:  { color: '#f97316', bg: 'rgba(249,115,22,0.1)', label: 'timeline.filters.volunteering', icon: Heart },
  certification: { color: '#eab308', bg: 'rgba(234,179,8,0.1)',  label: 'timeline.filters.certification', icon: Award },
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
      period: (cert as Record<string, unknown>).pending ? `${cert.year} (en cours)` : cert.year,
      startDate: cert.date || `${cert.year}-01`,
      endDate: null,
      current: !!(cert as Record<string, unknown>).pending,
    })
  })

  return events.sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate))
}

// ─── Timeline Card ───────────────────────────────────────
function EvolutionCard({
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
  const config = eventConfig[event.type]
  const Icon = config.icon
  const logo = logoMap[event.subtitle] || null

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() }
      }}
      className="group relative rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'rgba(26,26,46,0.85)',
        borderLeft: `3px solid ${config.color}`,
        border: `1px solid var(--border, #2a2a3e)`,
        borderLeftWidth: 3,
        borderLeftColor: config.color,
        boxShadow: isExpanded
          ? `0 4px 24px rgba(0,0,0,0.4), 0 0 12px ${config.color}20`
          : '0 2px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* Current badge */}
      {event.current && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ background: 'rgba(0,255,65,0.1)', color: '#00ff41', border: '1px solid rgba(0,255,65,0.25)' }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00ff41', animation: 'status-pulse 2s infinite' }}
          />
          {t('timeline.current')}
        </div>
      )}

      <div className="p-5">
        {/* Logo or Icon + Title */}
        <div className="flex items-start gap-3">
          {logo ? (
            <div
              className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden"
              style={{ background: 'var(--bg-surface, #12121a)', border: '1px solid var(--border, #2a2a3e)' }}
            >
              <Image src={logo} alt={event.subtitle} fill sizes="40px" className="object-contain p-1" />
            </div>
          ) : (
            <div
              className="w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center"
              style={{ background: config.bg }}
            >
              <Icon size={18} style={{ color: config.color }} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3
              className="text-sm font-bold uppercase tracking-wide leading-tight line-clamp-2"
              style={{ color: 'var(--text-primary, #f0f0f0)' }}
            >
              {event.title}
            </h3>
            <p className="text-sm font-semibold mt-0.5" style={{ color: config.color }}>
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Meta: period + location */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs" style={{ color: 'var(--text-muted, #606070)' }}>
          <span className="inline-flex items-center gap-1">
            <Calendar size={11} />
            {event.period}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} />
              {event.location}
            </span>
          )}
        </div>

        {/* Description (expandable) */}
        {event.description && (
          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: isExpanded ? '300px' : '0px',
              marginTop: isExpanded ? '12px' : '0px',
              opacity: isExpanded ? 1 : 0,
            }}
          >
            <div
              className="rounded-lg p-3"
              style={{
                background: 'var(--bg-surface, #12121a)',
                border: '1px solid var(--border, #2a2a3e)',
              }}
            >
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary, #a0a0b0)' }}>
                {event.description}
              </p>
            </div>
          </div>
        )}

        {/* Expand indicator */}
        {event.description && (
          <div className="flex items-center justify-end mt-2">
            <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-muted, #606070)' }}>
              {isExpanded ? t('timeline.collapse') : t('timeline.expand')}
              <ChevronDown
                size={13}
                className="transition-transform duration-300"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────
export default function EvolutionPage() {
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

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFilterChange = useCallback((newFilter: EventType | 'all') => {
    setFilter(newFilter)
    setExpandedCard(null)
  }, [])

  const filterButtons: { key: EventType | 'all'; labelKey: string; icon?: typeof Briefcase; color?: string }[] = [
    { key: 'all', labelKey: 'timeline.filters.all' },
    { key: 'experience', labelKey: 'timeline.filters.experience', icon: Briefcase, color: '#00f0ff' },
    { key: 'education', labelKey: 'timeline.filters.education', icon: GraduationCap, color: '#8b5cf6' },
    { key: 'volunteering', labelKey: 'timeline.filters.volunteering', icon: Heart, color: '#f97316' },
    { key: 'certification', labelKey: 'timeline.filters.certification', icon: Award, color: '#eab308' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-deep, #0a0a0f)' }}>

      {/* HEADER */}
      <header className="pt-28 pb-10 md:pt-32 md:pb-14 text-center">
        <div className="container-wide">
          <h1
            className="text-2xl md:text-3xl font-bold tracking-widest uppercase"
            style={{ color: 'var(--text-primary, #f0f0f0)' }}
          >
            PARCOURS
          </h1>
          <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: 'var(--text-secondary, #a0a0b0)' }}>
            {t('timeline.description')}
          </p>
        </div>
      </header>

      {/* TYPE FILTER ROW */}
      <nav
        className="sticky top-0 z-40 py-3"
        style={{
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border, #2a2a3e)',
        }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-center gap-2 flex-wrap" role="group" aria-label="Filter by category">
            {filterButtons.map(({ key, labelKey, icon: BtnIcon, color }) => {
              const isActive = filter === key
              const count = key === 'all' ? allEvents.length : countByType[key]
              return (
                <button
                  key={key}
                  onClick={() => handleFilterChange(key)}
                  className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? 'rgba(0,240,255,0.1)' : 'rgba(26,26,46,0.6)',
                    color: isActive ? 'var(--accent-cyan, #00f0ff)' : 'var(--text-secondary, #a0a0b0)',
                    border: isActive ? '1px solid var(--accent-cyan, #00f0ff)' : '1px solid var(--border, #2a2a3e)',
                  }}
                >
                  {BtnIcon ? <BtnIcon size={12} style={isActive && color ? { color } : undefined} /> : <Filter size={12} />}
                  {t(labelKey)}
                  <span
                    className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? 'rgba(0,240,255,0.15)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="pb-24 pt-8">
        <div className="container-wide max-w-3xl mx-auto">

          {/* Active filter indicator */}
          {filter !== 'all' && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-sm" style={{ color: 'var(--text-muted, #606070)', fontFamily: 'monospace' }}>
                {filteredEvents.length} resultat{filteredEvents.length > 1 ? 's' : ''}
              </span>
              <button
                onClick={() => handleFilterChange('all')}
                className="text-xs inline-flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer"
                style={{
                  background: 'rgba(26,26,46,0.6)',
                  color: 'var(--text-secondary, #a0a0b0)',
                  border: '1px solid var(--border, #2a2a3e)',
                }}
              >
                <X size={12} />
                Reinitialiser
              </button>
            </div>
          )}

          {/* Timeline by year */}
          {years.map((year) => (
            <section key={year} className="mb-10 last:mb-0">
              {/* Year heading */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-lg font-bold tabular-nums"
                  style={{ color: 'var(--accent-cyan, #00f0ff)', fontFamily: 'monospace' }}
                >
                  {year}
                </span>
                <div className="flex-1 h-px" style={{ background: 'var(--border, #2a2a3e)' }} />
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: 'var(--text-muted, #606070)', fontFamily: 'monospace' }}>
                  {eventsByYear[year]?.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {eventsByYear[year]?.map((event) => (
                  <EvolutionCard
                    key={event.id}
                    event={event}
                    isExpanded={expandedCard === event.id}
                    onToggle={() => setExpandedCard(expandedCard === event.id ? null : event.id)}
                    t={t}
                  />
                ))}
              </div>
            </section>
          ))}

          {/* End of journey */}
          <div className="flex items-center justify-center py-6">
            <span
              className="text-sm font-bold px-5 py-2 rounded-full"
              style={{
                color: 'var(--text-muted, #606070)',
                background: 'var(--bg-surface, #12121a)',
                border: '1px solid var(--border, #2a2a3e)',
                fontFamily: 'monospace',
              }}
            >
              {t('timeline.startOfJourney')}
            </span>
          </div>

          {/* STATS ROW */}
          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: years.length, label: t('timeline.stats.years'), color: '#00f0ff' },
                { value: countByType.experience, label: t('timeline.stats.experiences'), color: '#00f0ff' },
                { value: countByType.education, label: t('timeline.stats.formations'), color: '#8b5cf6' },
                { value: countByType.volunteering, label: t('timeline.stats.engagements'), color: '#f97316' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-1"
                  style={{
                    background: 'rgba(26,26,46,0.85)',
                    border: '1px solid var(--border, #2a2a3e)',
                  }}
                >
                  <p className="font-black text-3xl tracking-tight" style={{ color: stat.color, fontFamily: 'monospace' }}>
                    {stat.value}<span className="text-lg" style={{ color: 'var(--text-muted, #606070)' }}>+</span>
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted, #606070)' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <section className="py-14 mt-8">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-xl font-bold uppercase mb-4" style={{ color: 'var(--text-primary, #f0f0f0)' }}>
                {t('timeline.cta.title')}
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary, #a0a0b0)' }}>
                {t('timeline.cta.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-lg"
                  style={{
                    background: 'var(--accent-cyan, #00f0ff)',
                    color: '#0a0a0f',
                  }}
                >
                  {t('timeline.cta.contact')}
                  <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-lg"
                  style={{
                    background: 'transparent',
                    color: 'var(--accent-cyan, #00f0ff)',
                    border: '1px solid var(--accent-cyan, #00f0ff)',
                  }}
                >
                  {t('timeline.cta.projects')}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* BACK TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
        style={{
          background: 'var(--bg-surface, #12121a)',
          color: 'var(--accent-cyan, #00f0ff)',
          border: '1px solid var(--accent-cyan, #00f0ff)',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      <style>{`
        @keyframes status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
