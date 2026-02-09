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

const formationKeys = ['bachelor', 'master', 'erasmus', 'pmm', 'lycee', 'college'] as const
type FormationKey = typeof formationKeys[number]

const formationIcons: Record<FormationKey, React.ReactNode> = {
  bachelor: <GraduationCap size={16} />,
  master: <BookOpen size={16} />,
  erasmus: <Star size={16} />,
  pmm: <Award size={16} />,
  lycee: <GraduationCap size={16} />,
  college: <GraduationCap size={16} />,
}

const formationLabels: Record<FormationKey, string> = {
  bachelor: 'Bachelor',
  master: 'Master',
  erasmus: 'Erasmus',
  pmm: 'PMM',
  lycee: 'Lycee',
  college: 'College',
}

export default function FormationPage() {
  const [activeTab, setActiveTab] = useState<FormationKey>('bachelor')
  const { t } = useI18n()

  const activeFormation = formationCourses[activeTab]
  const years = Object.entries(activeFormation.years)

  return (
    <main className="min-h-screen pt-28 pb-20" style={{ background: 'var(--bg-deep, #0a0a0f)' }}>
      <div className="container-wide">

        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl md:text-3xl font-bold tracking-widest uppercase"
            style={{ color: 'var(--text-primary, #f0f0f0)' }}
          >
            FORMATION
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary, #a0a0b0)' }}>
            Cours, competences & parcours academique
          </p>
        </div>

        {/* Formation selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {formationKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="text-xs flex items-center gap-1.5 px-4 py-2 rounded-full font-bold transition-all duration-200 cursor-pointer"
              style={{
                background: activeTab === key ? 'var(--bg-elevated, #1a1a2e)' : 'var(--bg-surface, #12121a)',
                color: activeTab === key ? 'var(--accent-cyan, #00f0ff)' : 'var(--text-secondary, #a0a0b0)',
                border: activeTab === key ? '1px solid var(--accent-cyan, #00f0ff)' : '1px solid var(--border, #2a2a3e)',
              }}
            >
              {formationIcons[key]}
              {formationLabels[key]}
            </button>
          ))}
        </div>

        {/* Selected Formation Info */}
        <div
          className="rounded-2xl p-4 md:p-6 mb-8"
          style={{
            maxWidth: 900,
            margin: '0 auto',
            background: 'rgba(26,26,46,0.85)',
            border: '1px solid var(--border, #2a2a3e)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold" style={{ color: 'var(--text-primary, #f0f0f0)' }}>
                {activeFormation.title}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary, #a0a0b0)', fontFamily: 'var(--font-mono)' }}>
                {activeFormation.school} - {activeFormation.period}
              </p>
            </div>
            {activeFormation.rncp && (
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(139,92,246,0.15)',
                  color: 'var(--accent-violet, #8b5cf6)',
                  border: '1px solid rgba(139,92,246,0.3)',
                }}
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
                  color: 'var(--text-primary, #f0f0f0)',
                  borderBottom: '1px solid var(--border, #2a2a3e)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {yearLabel}
                <span className="ml-2 text-xs font-normal" style={{ color: 'var(--text-muted, #606070)' }}>
                  ({courses.length} cours)
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'var(--bg-surface, #12121a)',
                      color: 'var(--text-primary, #f0f0f0)',
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
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--border, #2a2a3e)' }}>
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
                      background: `${color}15`,
                      color: 'var(--text-secondary, #a0a0b0)',
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                    {cat}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* HARD SKILLS */}
        <div className="mb-8">
          <h2
            className="text-xl md:text-2xl font-bold tracking-wider uppercase text-center mb-6"
            style={{ color: 'var(--text-primary, #f0f0f0)' }}
          >
            Hard Skills (RNCP)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 1000, margin: '0 auto' }}>
            {/* Bachelor skills */}
            <div
              className="rounded-xl p-5"
              style={{
                background: 'rgba(26,26,46,0.85)',
                border: '1px solid var(--border, #2a2a3e)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={20} style={{ color: 'var(--accent-cyan, #00f0ff)' }} />
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary, #f0f0f0)' }}>
                  {hardSkills.bachelor.title}
                </h3>
              </div>
              <p
                className="text-xs mb-3 px-2 py-1 rounded-full inline-block"
                style={{ background: 'rgba(0,240,255,0.1)', color: 'var(--accent-cyan, #00f0ff)', border: '1px solid rgba(0,240,255,0.2)' }}
              >
                {hardSkills.bachelor.rncp}
              </p>
              <ul className="space-y-1.5">
                {hardSkills.bachelor.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-primary, #f0f0f0)' }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-cyan, #00f0ff)' }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Master skills */}
            <div
              className="rounded-xl p-5"
              style={{
                background: 'rgba(26,26,46,0.85)',
                border: '1px solid var(--border, #2a2a3e)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={20} style={{ color: 'var(--accent-violet, #8b5cf6)' }} />
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary, #f0f0f0)' }}>
                  {hardSkills.master.title}
                </h3>
              </div>
              <p
                className="text-xs mb-3 px-2 py-1 rounded-full inline-block"
                style={{ background: 'rgba(139,92,246,0.1)', color: 'var(--accent-violet, #8b5cf6)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                {hardSkills.master.rncp}
              </p>
              <ul className="space-y-1.5">
                {hardSkills.master.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-primary, #f0f0f0)' }}>
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent-violet, #8b5cf6)' }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SOFT SKILLS */}
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2
            className="text-xl md:text-2xl font-bold tracking-wider uppercase text-center mb-6"
            style={{ color: 'var(--text-primary, #f0f0f0)' }}
          >
            Soft Skills
          </h2>
          <div
            className="rounded-2xl p-4 md:p-6"
            style={{
              background: 'rgba(26,26,46,0.85)',
              border: '1px solid var(--border, #2a2a3e)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="space-y-4">
              {softSkills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-sm font-bold"
                      style={{ color: 'var(--text-primary, #f0f0f0)', fontFamily: 'var(--font-mono)' }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: 'var(--text-secondary, #a0a0b0)', fontFamily: 'var(--font-mono)' }}
                    >
                      {skill.level}/100
                    </span>
                  </div>
                  <div
                    className="h-3 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
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
                    style={{ color: 'var(--text-muted, #606070)', fontFamily: 'var(--font-mono)' }}
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
