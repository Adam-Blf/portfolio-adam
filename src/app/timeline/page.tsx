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
  X,
  ChevronRight
} from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import ErrorBoundary from '@/components/ErrorBoundary'

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

const parseDate = (dateStr: string): number => {
  if (!dateStr) return 0
  const [year, month = '01'] = dateStr.split('-')
  return parseInt(year) * 100 + parseInt(month)
}

const getYear = (dateStr: string): string => dateStr ? dateStr.split('-')[0] : ''

const eventIcons: Record<EventType, typeof Briefcase> = {
  experience: Briefcase,
  education: GraduationCap,
  volunteering: Heart,
  certification: Award,
}

const buildTimeline = (): TimelineEvent[] => {
  const events: TimelineEvent[] = []
  experiences.forEach(exp => events.push({
    id: `exp-${exp.id}`,
    type: 'experience',
    title: exp.title,
    subtitle: exp.company,
    period: exp.period,
    startDate: exp.startDate || '',
    endDate: exp.endDate || null,
    description: exp.description,
    current: exp.current,
    location: exp.location
  }))
  education.forEach(edu => events.push({
    id: `edu-${edu.id}`,
    type: 'education',
    title: edu.degree,
    subtitle: edu.school,
    period: edu.period,
    startDate: edu.startDate || '',
    endDate: edu.endDate || null,
    description: edu.description,
    current: edu.current
  }))
  volunteering.forEach((vol, idx) => events.push({
    id: `vol-${idx}`,
    type: 'volunteering',
    title: vol.role,
    subtitle: vol.org,
    period: vol.period,
    startDate: vol.startDate || '',
    endDate: vol.endDate || null,
    description: vol.scope
  }))
  certifications.slice(0, 10).forEach((cert, idx) => events.push({
    id: `cert-${idx}`,
    type: 'certification',
    title: cert.name,
    subtitle: cert.issuer,
    period: cert.year,
    startDate: cert.year + '-01',
    endDate: null
  }))
  return events.sort((a, b) => parseDate(b.startDate) - parseDate(a.startDate))
}

export default function EvolutionPage() {
  const [filter, setFilter] = useState<EventType | 'all'>('all')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { t } = useI18n()

  const allEvents = useMemo(() => buildTimeline(), [])
  const filteredEvents = useMemo(() => filter === 'all' ? allEvents : allEvents.filter(e => e.type === filter), [allEvents, filter])

  const years = useMemo(() => Array.from(new Set(filteredEvents.map(e => getYear(e.startDate)))).sort((a, b) => parseInt(b) - parseInt(a)), [filteredEvents])

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <ErrorBoundary>
      <main className="min-h-screen pt-32 pb-32 bg-background">
        <div className="container-wide">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-primary mb-6">
              Parcours.
            </h1>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed">
              Une rétrospective de mon évolution académique et professionnelle,
              marquée par l&apos;exigence et la polyvalence.
            </p>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-2 mb-20 border-b border-black/5 dark:border-white/10 pb-8">
            {['all', 'experience', 'education', 'volunteering'].map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === key ? 'bg-primary text-background' : 'text-secondary hover:text-primary'
                  }`}
              >
                {key === 'all' ? 'Tout' : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Timeline Grid */}
          <div className="max-w-4xl">
            {years.map(year => (
              <div key={year} className="mb-16">
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="text-4xl font-bold text-primary">{year}</h2>
                  <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
                </div>

                <div className="space-y-6">
                  {filteredEvents.filter(e => getYear(e.startDate) === year).map(event => {
                    const Icon = eventIcons[event.type]
                    const logo = logoMap[event.subtitle]
                    const isExp = expandedCard === event.id

                    return (
                      <div
                        key={event.id}
                        className="card p-8 group cursor-pointer"
                        onClick={() => setExpandedCard(isExp ? null : event.id)}
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                          <div className="w-12 h-12 rounded-full bg-background border border-black/5 dark:border-white/10 flex items-center justify-center shrink-0">
                            {logo ? (
                              <Image src={logo} alt={event.subtitle} width={24} height={24} className="object-contain" />
                            ) : (
                              <Icon className="text-cta" size={24} />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
                              <h3 className="text-xl font-semibold text-primary">{event.title}</h3>
                              <span className="text-sm font-medium text-secondary">{event.period}</span>
                            </div>
                            <p className="text-cta font-medium mb-4">{event.subtitle}</p>

                            {event.description && (
                              <div className={`overflow-hidden transition-all duration-300 ${isExp ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                <p className="text-secondary leading-relaxed border-t border-black/5 dark:border-white/10 pt-4">
                                  {event.description}
                                </p>
                              </div>
                            )}

                            {event.description && (
                              <div className="mt-4 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
                                {isExp ? 'Moins d\'infos' : 'Plus d\'infos'}
                                <ChevronDown size={14} className={`transition-transform ${isExp ? 'rotate-180' : ''}`} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-32 text-center">
            <Link href="/contact" className="btn-primary">
              Discutons de votre projet
            </Link>
          </div>

        </div>
      </main>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center shadow-2xl transition-all ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
      >
        <ArrowUp size={20} />
      </button>
    </ErrorBoundary>
  )
}
