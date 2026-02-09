'use client'

import { useState } from 'react'
import { formationCourses, hardSkills, softSkills } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { GraduationCap, BookOpen, Award, Star } from 'lucide-react'

const categoryColors: Record<string, string> = {
  tech: '#3B82F6',
  marketing: '#F97316',
  design: '#A855F7',
  management: '#22C55E',
  ai: '#EF4444',
  data: '#06B6D4',
  cloud: '#8B5CF6',
  international: '#EAB308',
  communication: '#EC4899',
  droit: '#6B7280',
  general: '#94A3B8',
  securite: '#991B1B',
  gouvernance: '#14B8A6',
  militaire: '#1E3A5F',
  projet: '#84CC16',
  sciences: '#10B981',
}

const formationKeys = ['bachelor', 'master', 'erasmus', 'pmm', 'lycee'] as const
type FormationKey = typeof formationKeys[number]

const formationIcons: Record<FormationKey, React.ReactNode> = {
  bachelor: <GraduationCap size={16} />,
  master: <BookOpen size={16} />,
  erasmus: <Star size={16} />,
  pmm: <Award size={16} />,
  lycee: <GraduationCap size={16} />,
}

const formationLabels: Record<FormationKey, string> = {
  bachelor: 'Bachelor',
  master: 'Master',
  erasmus: 'Erasmus',
  pmm: 'PMM',
  lycee: 'Lycee',
}

export default function FormationPage() {
  const [activeTab, setActiveTab] = useState<FormationKey>('bachelor')
  const { t } = useI18n()

  const activeFormation = formationCourses[activeTab]
  const years = Object.entries(activeFormation.years)

  return (
    <main className="min-h-screen pt-28 pb-20" style={{ background: 'var(--pokedex-red)' }}>
      <div className="container-wide">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="pokedex-led pokedex-led-blue" style={{ width: 14, height: 14 }} />
            <div className="pokedex-led pokedex-led-red" style={{ width: 8, height: 8 }} />
            <div className="pokedex-led pokedex-led-yellow" style={{ width: 8, height: 8 }} />
          </div>
          <h1
            className="text-2xl md:text-3xl font-bold tracking-widest uppercase"
            style={{ color: 'var(--pokedex-white)', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            Centre de Formation
          </h1>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Cours, competences & parcours academique
          </p>
        </div>

        {/* Formation selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {formationKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`pokedex-button text-xs flex items-center gap-1.5 transition-all ${
                activeTab === key
                  ? '!bg-white !text-[--pokedex-red] font-bold shadow-lg'
                  : ''
              }`}
            >
              {formationIcons[key]}
              {formationLabels[key]}
            </button>
          ))}
        </div>

        {/* Selected Formation Info */}
        <div className="pokedex-screen p-4 md:p-6 mb-8" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold" style={{ color: 'var(--pokedex-dark)' }}>
                {activeFormation.title}
              </h2>
              <p className="text-sm" style={{ color: 'var(--pokedex-screen-dark)', fontFamily: 'var(--font-mono)' }}>
                {activeFormation.school} - {activeFormation.period}
              </p>
            </div>
            {activeFormation.rncp && (
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: 'var(--pokedex-dark)', color: 'var(--pokedex-screen)' }}
              >
                <Award size={12} />
                {activeFormation.rncp} - {activeFormation.rncpTitle}
              </div>
            )}
          </div>

          {/* Courses by year */}
          {years.map(([yearLabel, courses]) => (
            <div key={yearLabel} className="mb-5 last:mb-0">
              <h3
                className="text-sm font-bold uppercase tracking-wider mb-3 pb-1"
                style={{
                  color: 'var(--pokedex-dark)',
                  borderBottom: '2px solid var(--pokedex-screen-dark)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {yearLabel}
                <span className="ml-2 text-xs font-normal" style={{ color: 'var(--pokedex-screen-dark)' }}>
                  ({courses.length} cours)
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.3)',
                      color: 'var(--pokedex-dark)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: categoryColors[course.category] || '#94A3B8' }}
                    />
                    <span className="text-xs">{course.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Category legend */}
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--pokedex-screen-dark)' }}>
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryColors)
                .filter(([cat]) => {
                  return years.some(([, courses]) =>
                    courses.some((c) => c.category === cat)
                  )
                })
                .map(([cat, color]) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: `${color}20`,
                      color: 'var(--pokedex-dark)',
                      border: `1px solid ${color}40`,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                    {cat}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Hinge separator */}
        <div className="pokedex-hinge mb-8" />

        {/* HARD SKILLS */}
        <div className="mb-8">
          <h2
            className="text-xl md:text-2xl font-bold tracking-wider uppercase text-center mb-6"
            style={{ color: 'var(--pokedex-white)', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            Hard Skills (RNCP)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 1000, margin: '0 auto' }}>
            {/* Bachelor skills */}
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-md)' }}>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={20} style={{ color: 'var(--pokedex-red)' }} />
                <h3 className="font-bold text-sm" style={{ color: 'var(--pokedex-dark)' }}>
                  {hardSkills.bachelor.title}
                </h3>
              </div>
              <p className="text-xs mb-3 px-2 py-1 rounded-full inline-block" style={{ background: '#FEE2E2', color: '#991B1B' }}>
                {hardSkills.bachelor.rncp}
              </p>
              <ul className="space-y-1.5">
                {hardSkills.bachelor.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--pokedex-dark)' }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--pokedex-red)' }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Master skills */}
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-md)' }}>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={20} style={{ color: '#3B82F6' }} />
                <h3 className="font-bold text-sm" style={{ color: 'var(--pokedex-dark)' }}>
                  {hardSkills.master.title}
                </h3>
              </div>
              <p className="text-xs mb-3 px-2 py-1 rounded-full inline-block" style={{ background: '#DBEAFE', color: '#1E40AF' }}>
                {hardSkills.master.rncp}
              </p>
              <ul className="space-y-1.5">
                {hardSkills.master.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--pokedex-dark)' }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#3B82F6' }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Hinge separator */}
        <div className="pokedex-hinge mb-8" />

        {/* SOFT SKILLS */}
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2
            className="text-xl md:text-2xl font-bold tracking-wider uppercase text-center mb-6"
            style={{ color: 'var(--pokedex-white)', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            Soft Skills
          </h2>
          <div className="pokedex-screen p-4 md:p-6">
            <div className="space-y-4">
              {softSkills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-sm font-bold"
                      style={{ color: 'var(--pokedex-dark)', fontFamily: 'var(--font-mono)' }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: 'var(--pokedex-screen-dark)', fontFamily: 'var(--font-mono)' }}
                    >
                      {skill.level}/100
                    </span>
                  </div>
                  {/* Stat bar */}
                  <div
                    className="h-3 rounded-full overflow-hidden"
                    style={{ background: 'rgba(0,0,0,0.15)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        background: skill.level >= 90
                          ? 'linear-gradient(90deg, #22C55E, #16A34A)'
                          : skill.level >= 85
                            ? 'linear-gradient(90deg, #3B82F6, #2563EB)'
                            : 'linear-gradient(90deg, #EAB308, #CA8A04)',
                      }}
                    />
                  </div>
                  <p
                    className="text-xs mt-1"
                    style={{ color: 'var(--pokedex-screen-dark)', fontFamily: 'var(--font-mono)' }}
                  >
                    {skill.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
