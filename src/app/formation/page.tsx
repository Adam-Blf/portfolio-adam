'use client'

import { useState } from 'react'
import { formationCourses, hardSkills, softSkills } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { GraduationCap, BookOpen, Award, Star, CheckCircle2 } from 'lucide-react'
import ErrorBoundary from '@/components/ErrorBoundary'

const formationKeys = ['master', 'bachelor', 'erasmus', 'pmm'] as const
type FormationKey = typeof formationKeys[number]

const formationIcons: Record<FormationKey, typeof GraduationCap> = {
  master: BookOpen,
  bachelor: GraduationCap,
  erasmus: Star,
  pmm: Award,
}

export default function FormationPage() {
  const [activeTab, setActiveTab] = useState<FormationKey>('master')
  const { t } = useI18n()

  const activeFormation = formationCourses[activeTab]
  const years = Object.entries(activeFormation.years)

  return (
    <ErrorBoundary>
      <main className="min-h-screen pt-32 pb-32 bg-background">
        <div className="container-wide">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-primary mb-6">
              Formation.
            </h1>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed">
              Mon parcours académique, structuré par une recherche constante de
              l&apos;excellence technique et managériale.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-16 border-b border-black/5 dark:border-white/10 pb-8">
            {formationKeys.map((key) => {
              const Icon = formationIcons[key]
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all inline-flex items-center gap-2 ${activeTab === key ? 'bg-primary text-background' : 'text-secondary hover:text-primary'
                    }`}
                >
                  <Icon size={18} />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              )
            })}
          </div>

          {/* Selected Formation Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Course Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold text-primary mb-2">{activeFormation.title}</h2>
                <p className="text-xl text-cta font-medium mb-4">{activeFormation.school}</p>
                <p className="text-secondary font-medium">{activeFormation.period}</p>
              </div>

              <div className="space-y-12">
                {years.map(([yearLabel, courses]) => (
                  <div key={yearLabel}>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-6 border-l-2 border-cta pl-4">
                      {yearLabel}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {courses.map((course, idx) => (
                        <div key={idx} className="card p-4 flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-cta/40 shrink-0" />
                          <span className="text-sm font-medium text-primary">{course.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Hard Skills */}
            <div className="space-y-8">
              <div className="card p-8 bg-cta text-white">
                <Award className="mb-6 opacity-80" size={32} />
                <h3 className="text-2xl font-semibold mb-2">Certification RNCP</h3>
                <p className="font-medium opacity-90 mb-4">{activeFormation.rncpTitle}</p>
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider">
                  {activeFormation.rncp}
                </div>
              </div>

              <div className="card p-8">
                <h3 className="text-lg font-bold uppercase tracking-widest text-secondary mb-6">Compétences Clés</h3>
                <ul className="space-y-4">
                  {(hardSkills[activeTab as keyof typeof hardSkills]?.skills || []).map((skill, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-cta shrink-0 mt-0.5" size={18} />
                      <span className="text-sm font-medium text-primary leading-tight">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Soft Skills Section in Sidebar */}
              <div className="card p-8 border-none bg-black/5 dark:bg-white/5">
                <h3 className="text-lg font-bold uppercase tracking-widest text-secondary mb-6">Soft Skills</h3>
                <div className="space-y-6">
                  {softSkills.slice(0, 4).map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="uppercase tracking-widest text-secondary/60">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-cta/80" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </ErrorBoundary>
  )
}
