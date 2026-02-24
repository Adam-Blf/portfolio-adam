'use client'

import { useState, useEffect, useMemo } from 'react'
import { Github, Star, GitFork, ExternalLink, Search, X, ChevronRight } from 'lucide-react'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useI18n } from '@/lib/i18n'

interface ProcessedProject {
  name: string
  desc: string
  lang: string
  tags: string[]
  url: string
  homepage?: string | null
  stars: number
  forks: number
  commits: number
  category: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useI18n()

  useEffect(() => {
    const CACHE_KEY = 'github-projects'
    const CACHE_DURATION = 1000 * 60 * 30

    async function fetchRepos() {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { projects, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setProjects(projects)
            setLoading(false)
            return
          }
        }
      } catch (e) { }

      try {
        const response = await fetch('/api/github')
        if (response.ok) {
          const data = await response.json()
          setProjects(data.projects)
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            projects: data.projects,
            timestamp: Date.now()
          }))
          setLoading(false)
          return
        }
      } catch (e) { }

      // Fallback or Direct GitHub fetch logic would go here, 
      // simplified for this redesign pass to focus on UI.
      setLoading(false)
    }

    fetchRepos()
  }, [])

  const projectsByCategory = useMemo(() => {
    const grouped: Record<string, ProcessedProject[]> = {}
    projects.forEach((project) => {
      if (!grouped[project.category]) grouped[project.category] = []
      grouped[project.category].push(project)
    })
    return grouped
  }, [projects])

  const categories = Object.keys(projectsByCategory)

  const searchFilteredProjects = useMemo(() => {
    const base = activeCategory ? { [activeCategory]: projectsByCategory[activeCategory] } : projectsByCategory
    return Object.entries(base).reduce((acc, [category, categoryProjects]) => {
      if (!categoryProjects) return acc
      const filtered = categoryProjects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      if (filtered.length > 0) acc[category] = filtered
      return acc
    }, {} as Record<string, ProcessedProject[]>)
  }, [projectsByCategory, activeCategory, searchTerm])

  const allFilteredProjects = useMemo(() => Object.values(searchFilteredProjects).flat(), [searchFilteredProjects])

  if (loading) return (
    <main className="min-h-screen pt-32 pb-20 bg-background flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-secondary font-medium">Chargement des projets...</p>
    </main>
  )

  return (
    <ErrorBoundary>
      <main className="min-h-screen pt-32 pb-32 bg-background">
        <div className="container-wide">

          {/* Header */}
          <div className="max-w-2xl mb-16">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-primary mb-6">
              Mes Projets.
            </h1>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed">
              Une sélection de travaux en Data Engineering, IA et Développement Fullstack,
              directement synchronisée depuis GitHub.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-12 border-b border-black/5 dark:border-white/10 pb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${activeCategory === null
                    ? 'bg-primary text-background'
                    : 'text-secondary hover:text-primary'
                  }`}
              >
                Tous
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${activeCategory === cat
                      ? 'bg-primary text-background'
                      : 'text-secondary hover:text-primary'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative group max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/5 dark:bg-white/5 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-cta/50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          {allFilteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allFilteredProjects.map((project) => (
                <div key={project.name} className="card flex flex-col p-8 group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-primary leading-tight group-hover:text-cta transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-secondary text-base mb-6 line-clamp-3 leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[11px] font-bold uppercase tracking-wider text-secondary px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 pt-6 border-t border-black/5 dark:border-white/10">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cta hover:underline font-medium inline-flex items-center gap-1.5"
                    >
                      <Github size={18} />
                      Code
                    </a>
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cta hover:underline font-medium inline-flex items-center gap-1.5"
                      >
                        <ExternalLink size={18} />
                        Démo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-secondary text-lg">Aucun projet ne correspond à votre recherche.</p>
            </div>
          )}

          {/* GitHub CTA */}
          <div className="mt-24 text-center">
            <h4 className="text-2xl font-semibold mb-6">Envie d&apos;en voir plus ?</h4>
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github size={20} className="mr-2" />
              Accéder à mon GitHub
            </a>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  )
}
