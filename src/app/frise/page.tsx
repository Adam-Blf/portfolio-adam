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
  ChevronRight,
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

// ─── Netflix color palette per type ──────────────────────
const eventConfig: Record<EventType, { color: string; icon: typeof Briefcase; label: string }> = {
  experience:    { color: '#E50914', icon: Briefcase,     label: 'timeline.filters.experience' },
  education:     { color: '#3B82F6', icon: GraduationCap, label: 'timeline.filters.education' },
  volunteering:  { color: '#46D369', icon: Heart,         label: 'timeline.filters.volunteering' },
  certification: { color: '#F59E0B', icon: Award,         label: 'timeline.filters.certification' },
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

// ─── Netflix Card ────────────────────────────────────────
function NetflixCard({
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
      className="group relative rounded-md cursor-pointer overflow-hidden
                 transition-all duration-300 ease-out
                 hover:scale-[1.02] hover:z-10
                 focus-visible:outline-2 focus-visible:outline-[#E50914] focus-visible:outline-offset-2"
      style={{
        backgroundColor: '#1a1a1a',
        borderLeft: `3px solid ${isExpanded ? config.color : `${config.color}99`}`,
      }}
    >
      {/* Hover glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${config.color}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative p-5">
        {/* Top row: logo/icon + title + current badge */}
        <div className="flex items-start gap-3">
          {logo ? (
            <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-white/90">
              <Image src={logo} alt={event.subtitle} fill className="object-contain p-1" />
            </div>
          ) : (
            <div
              className="w-10 h-10 flex-shrink-0 rounded flex items-center justify-center"
              style={{ backgroundColor: `${config.color}20` }}
            >
              <Icon size={18} style={{ color: config.color }} />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-[15px] font-semibold text-white leading-tight line-clamp-2 group-hover:text-white/90 transition-colors">
                {event.title}
              </h3>
              {event.current && (
                <span
                  className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded"
                  style={{ backgroundColor: `${config.color}25`, color: config.color }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: config.color }} />
                  {t('timeline.current')}
                </span>
              )}
            </div>
            <p className="text-sm font-medium mt-0.5" style={{ color: config.color }}>
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Meta: period + location */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#999]">
          <span className="inline-flex items-center gap-1">
            <Calendar size={11} className="opacity-70" />
            {event.period}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} className="opacity-70" />
              {event.location}
            </span>
          )}
        </div>

        {/* Description (expandable) */}
        {event.description && (
          <div
            className="overflow-hidden transition-all duration-300 ease-out"
            style={{
              maxHeight: isExpanded ? '300px' : '0px',
              marginTop: isExpanded ? '12px' : '0px',
              opacity: isExpanded ? 1 : 0,
            }}
          >
            <p className="text-sm text-[#b3b3b3] leading-relaxed">
              {event.description}
            </p>
          </div>
        )}

        {/* Expand indicator */}
        {event.description && (
          <div className="flex items-center justify-end mt-2">
            <span className="inline-flex items-center gap-1 text-[11px] text-[#666] group-hover:text-[#999] transition-colors">
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
export default function FrisePage() {
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
    { key: 'experience', labelKey: 'timeline.filters.experience', icon: Briefcase, color: '#E50914' },
    { key: 'education', labelKey: 'timeline.filters.education', icon: GraduationCap, color: '#3B82F6' },
    { key: 'volunteering', labelKey: 'timeline.filters.volunteering', icon: Heart, color: '#46D369' },
    { key: 'certification', labelKey: 'timeline.filters.certification', icon: Award, color: '#F59E0B' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#141414' }}>
      {/* ═══ NETFLIX HEADER ═══ */}
      <header className="pt-28 pb-10 md:pt-32 md:pb-14" style={{ backgroundColor: '#141414' }}>
        <div className="container-wide">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#E50914' }}>
            {t('timeline.caption')}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-3">
            {t('timeline.title')}
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: '#999' }}>
            {t('timeline.description')}
          </p>
        </div>
      </header>

      {/* ═══ CATEGORY FILTER ROW ═══ */}
      <nav className="sticky top-0 z-40 border-b" style={{ backgroundColor: '#141414e6', backdropFilter: 'blur(12px)', borderColor: '#333' }}>
        <div className="container-wide">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide" role="group" aria-label="Filter by category">
            {filterButtons.map(({ key, labelKey, icon: BtnIcon, color }) => {
              const isActive = filter === key
              const count = key === 'all' ? allEvents.length : countByType[key]
              return (
                <button
                  key={key}
                  onClick={() => handleFilterChange(key)}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? (color || '#E50914') : '#333',
                    color: isActive ? '#fff' : '#b3b3b3',
                  }}
                >
                  {BtnIcon ? <BtnIcon size={14} /> : <Filter size={14} />}
                  {t(labelKey)}
                  <span
                    className="ml-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
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

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="pb-24 pt-8">
        <div className="container-wide">

          {/* Active filter indicator */}
          {filter !== 'all' && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-[#999]">
                {filteredEvents.length} résultat{filteredEvents.length > 1 ? 's' : ''}
              </span>
              <button
                onClick={() => handleFilterChange('all')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors duration-200"
                style={{ backgroundColor: '#333', color: '#b3b3b3' }}
              >
                <X size={12} />
                Réinitialiser
              </button>
            </div>
          )}

          {/* Year sections */}
          {years.map((year) => (
            <section key={year} className="mb-12 last:mb-0">
              {/* Year heading - Netflix row title style */}
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {year}
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: '#333' }} />
                <span className="text-xs font-medium px-2 py-0.5 rounded" style={{ backgroundColor: '#333', color: '#999' }}>
                  {eventsByYear[year]?.length} élément{(eventsByYear[year]?.length || 0) > 1 ? 's' : ''}
                </span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {eventsByYear[year]?.map((event) => (
                  <NetflixCard
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

          {/* End of timeline */}
          <div className="flex items-center justify-center pt-10 pb-4">
            <div className="flex items-center gap-3 px-6 py-2.5 rounded-full" style={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}>
              <ChevronRight size={14} style={{ color: '#E50914' }} />
              <span className="text-sm font-medium" style={{ color: '#999' }}>
                {t('timeline.startOfJourney')}
              </span>
            </div>
          </div>

          {/* ═══ STATS ROW ═══ */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: years.length,            label: t('timeline.stats.years'),       color: '#E50914' },
              { value: countByType.experience,   label: t('timeline.stats.experiences'), color: '#E50914' },
              { value: countByType.education,    label: t('timeline.stats.formations'),  color: '#3B82F6' },
              { value: countByType.volunteering, label: t('timeline.stats.engagements'), color: '#46D369' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-md p-5 text-center transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}
              >
                <p className="font-bold text-3xl md:text-4xl tracking-tight" style={{ color: stat.color }}>
                  {stat.value}<span className="text-lg" style={{ color: '#555' }}>+</span>
                </p>
                <p className="text-xs uppercase tracking-wider mt-1" style={{ color: '#666' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ═══ CTA ═══ */}
          <section className="mt-20 py-14 border-t" style={{ borderColor: '#2a2a2a' }}>
            <div className="max-w-xl mx-auto text-center">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E50914' }}>
                {t('timeline.cta.caption')}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t('timeline.cta.title')}
              </h2>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: '#999' }}>
                {t('timeline.cta.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
                  style={{ backgroundColor: '#E50914' }}
                >
                  {t('timeline.cta.contact')}
                  <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="/projets"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium transition-all duration-200 hover:bg-[#444]"
                  style={{ backgroundColor: '#333', color: '#fff' }}
                >
                  {t('timeline.cta.projects')}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ═══ BACK TO TOP ═══ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: '#E50914',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  )
}
