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

// ─── Pokemon type colors per event type ──────────────────
const eventConfig: Record<EventType, { color: string; bg: string; label: string; icon: typeof Briefcase }> = {
  experience:    { color: '#E74C3C', bg: '#FDEDEC', label: 'timeline.filters.experience', icon: Briefcase },
  education:     { color: '#3498DB', bg: '#EBF5FB', label: 'timeline.filters.education', icon: GraduationCap },
  volunteering:  { color: '#2ECC71', bg: '#EAFAF1', label: 'timeline.filters.volunteering', icon: Heart },
  certification: { color: '#F1C40F', bg: '#FEF9E7', label: 'timeline.filters.certification', icon: Award },
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

// ─── Evolution Card ──────────────────────────────────────
function EvolutionCard({
  event,
  stageNumber,
  isExpanded,
  onToggle,
  isLast,
  t,
}: {
  event: TimelineEvent
  stageNumber: number
  isExpanded: boolean
  onToggle: () => void
  isLast: boolean
  t: (key: string) => string
}) {
  const config = eventConfig[event.type]
  const Icon = config.icon
  const logo = logoMap[event.subtitle] || null

  return (
    <div className="relative">
      {/* Evolution connection arrow */}
      {!isLast && (
        <div className="flex justify-center py-2">
          <div className="flex flex-col items-center">
            <div style={{ width: 3, height: 20, background: '#ddd' }} />
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: `10px solid ${config.color}`,
              }}
            />
          </div>
        </div>
      )}

      {/* Card */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle() }
        }}
        className="pokedex-card group relative rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          background: '#fff',
          border: `3px solid ${config.color}`,
          boxShadow: isExpanded ? `0 4px 16px ${config.color}33` : '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        {/* Stage number badge */}
        <div
          className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
          style={{ background: config.color, color: '#fff', fontFamily: 'monospace' }}
        >
          {stageNumber}
        </div>

        {/* Current badge */}
        {event.current && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: config.color, animation: 'evo-pulse 2s infinite' }}
            />
            {t('timeline.current')}
          </div>
        )}

        <div className="p-5 pt-6 pl-14">
          {/* Logo or Icon + Title */}
          <div className="flex items-start gap-3">
            {logo ? (
              <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                <Image src={logo} alt={event.subtitle} fill className="object-contain p-1" />
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
                className="text-sm font-black uppercase tracking-wide leading-tight line-clamp-2"
                style={{ color: 'var(--pokedex-dark, #333)' }}
              >
                {event.title}
              </h3>
              <p className="text-sm font-semibold mt-0.5" style={{ color: config.color }}>
                {event.subtitle}
              </p>
            </div>
          </div>

          {/* Meta: period + location */}
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs" style={{ color: '#999' }}>
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
                className="pokedex-screen rounded-lg p-3"
                style={{
                  background: 'var(--pokedex-screen, #98CB98)',
                  border: '2px solid #7baa7b',
                }}
              >
                <p className="text-xs leading-relaxed" style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace' }}>
                  {event.description}
                </p>
              </div>
            </div>
          )}

          {/* Expand indicator */}
          {event.description && (
            <div className="flex items-center justify-end mt-2">
              <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: '#aaa' }}>
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
    { key: 'experience', labelKey: 'timeline.filters.experience', icon: Briefcase, color: '#E74C3C' },
    { key: 'education', labelKey: 'timeline.filters.education', icon: GraduationCap, color: '#3498DB' },
    { key: 'volunteering', labelKey: 'timeline.filters.volunteering', icon: Heart, color: '#2ECC71' },
    { key: 'certification', labelKey: 'timeline.filters.certification', icon: Award, color: '#F1C40F' },
  ]

  // Global stage counter
  let stageCounter = 0

  return (
    <div className="min-h-screen" style={{ background: 'var(--pokedex-white, #F5F5F5)' }}>

      {/* ═══ HEADER ═══ */}
      <header className="pt-28 pb-10 md:pt-32 md:pb-14 text-center">
        <div className="container-wide">
          <h1
            className="font-black tracking-wider leading-none"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              color: 'var(--pokedex-red, #DC0A2D)',
              textShadow: '2px 2px 0 var(--pokedex-red-dark, #A00020), 4px 4px 0 rgba(0,0,0,0.1)',
              fontFamily: 'var(--font-mono, monospace)',
              letterSpacing: '0.1em',
            }}
          >
            CHAÎNE D&apos;ÉVOLUTION
          </h1>
          <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: '#666', fontFamily: 'monospace' }}>
            {t('timeline.description')}
          </p>
        </div>
      </header>

      {/* ═══ TYPE FILTER ROW ═══ */}
      <nav
        className="sticky top-0 z-40 py-3"
        style={{
          background: 'rgba(245,245,245,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '3px solid #e0e0e0',
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
                  className="type-badge flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? (color || 'var(--pokedex-red, #DC0A2D)') : '#e0e0e0',
                    color: isActive ? '#fff' : '#666',
                    border: 'none',
                    boxShadow: isActive ? `0 2px 8px ${color || '#DC0A2D'}44` : 'none',
                  }}
                >
                  {BtnIcon ? <BtnIcon size={12} /> : <Filter size={12} />}
                  {t(labelKey)}
                  <span
                    className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.08)',
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
        <div className="container-wide max-w-3xl mx-auto">

          {/* Active filter indicator */}
          {filter !== 'all' && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-sm" style={{ color: '#999', fontFamily: 'monospace' }}>
                {filteredEvents.length} résultat{filteredEvents.length > 1 ? 's' : ''}
              </span>
              <button
                onClick={() => handleFilterChange('all')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold transition-colors duration-200 cursor-pointer"
                style={{ background: '#e0e0e0', color: '#666' }}
              >
                <X size={12} />
                Réinitialiser
              </button>
            </div>
          )}

          {/* Evolution chain by year */}
          {years.map((year) => (
            <section key={year} className="mb-8 last:mb-0">
              {/* Year heading */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="px-4 py-1.5 rounded-full text-sm font-black"
                  style={{
                    background: 'var(--pokedex-red, #DC0A2D)',
                    color: '#fff',
                    fontFamily: 'monospace',
                  }}
                >
                  {year}
                </div>
                <div className="flex-1 h-[3px] rounded-full" style={{ background: '#e0e0e0' }} />
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#e0e0e0', color: '#999', fontFamily: 'monospace' }}>
                  {eventsByYear[year]?.length}
                </span>
              </div>

              {/* Evolution cards */}
              {eventsByYear[year]?.map((event, idx) => {
                stageCounter++
                return (
                  <EvolutionCard
                    key={event.id}
                    event={event}
                    stageNumber={stageCounter}
                    isExpanded={expandedCard === event.id}
                    onToggle={() => setExpandedCard(expandedCard === event.id ? null : event.id)}
                    isLast={idx === (eventsByYear[year]?.length || 0) - 1}
                    t={t}
                  />
                )
              })}
            </section>
          ))}

          {/* End of evolution */}
          <div className="flex items-center justify-center pt-6 pb-4">
            <div
              className="pokedex-screen flex items-center gap-3 px-6 py-3 rounded-xl"
              style={{
                background: 'var(--pokedex-screen, #98CB98)',
                border: '3px solid #7baa7b',
              }}
            >
              <span className="text-sm font-bold" style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace' }}>
                🥚 {t('timeline.startOfJourney')}
              </span>
            </div>
          </div>

          {/* ═══ STATS ROW ═══ */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: years.length, label: t('timeline.stats.years'), color: '#E74C3C' },
              { value: countByType.experience, label: t('timeline.stats.experiences'), color: '#E74C3C' },
              { value: countByType.education, label: t('timeline.stats.formations'), color: '#3498DB' },
              { value: countByType.volunteering, label: t('timeline.stats.engagements'), color: '#2ECC71' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: '#fff',
                  border: '3px solid #e0e0e0',
                }}
              >
                <p className="font-black text-3xl tracking-tight" style={{ color: stat.color, fontFamily: 'monospace' }}>
                  {stat.value}<span className="text-lg" style={{ color: '#ccc' }}>+</span>
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: '#999' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* ═══ CTA ═══ */}
          <section className="mt-16 py-10 border-t-[3px]" style={{ borderColor: '#e0e0e0' }}>
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-xl font-black uppercase mb-4" style={{ color: 'var(--pokedex-dark, #333)' }}>
                {t('timeline.cta.title')}
              </h2>
              <p className="text-sm mb-6" style={{ color: '#999', fontFamily: 'monospace' }}>
                {t('timeline.cta.description')}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/centre-pokemon"
                  className="pokedex-button inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: 'var(--pokedex-red, #DC0A2D)',
                    color: '#fff',
                    border: '3px solid var(--pokedex-red-dark, #A00020)',
                  }}
                >
                  {t('timeline.cta.contact')}
                  <ArrowUpRight size={15} />
                </Link>
                <Link
                  href="/pokedex"
                  className="pokedex-button inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: '#e0e0e0',
                    color: '#555',
                    border: '3px solid #ccc',
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

      {/* ═══ BACK TO TOP ═══ */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 cursor-pointer"
        style={{
          background: 'var(--pokedex-red, #DC0A2D)',
          border: '3px solid var(--pokedex-red-dark, #A00020)',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>

      <style>{`
        @keyframes evo-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
