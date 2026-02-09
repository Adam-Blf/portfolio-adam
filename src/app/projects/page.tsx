'use client'

import { useState, useEffect, useMemo } from 'react'
import { Github, Star, GitFork, ExternalLink, Search, X } from 'lucide-react'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useI18n } from '@/lib/i18n'

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Shell: '#89E051',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  R: '#198CE7',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
  Multi: '#888888',
}

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
      } catch (e) {
        // Cache read failed
      }

      try {
        const response = await fetch('/api/github', {
          next: { revalidate: 1800 }
        })

        if (response.ok) {
          const data = await response.json()
          setProjects(data.projects)

          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
              projects: data.projects,
              timestamp: Date.now()
            }))
          } catch (e) {
            // Cache write failed
          }

          setLoading(false)
          return
        }
      } catch (e) {
        console.warn('API route failed, falling back to direct GitHub API')
      }

      try {
        const response = await fetch('https://api.github.com/users/Adam-Blf/repos?per_page=100&sort=updated', {
          headers: { 'Accept': 'application/vnd.github.v3+json' },
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la recuperation des repos')
        }

        const repos = await response.json()
        const excludedRepos = ['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam', 'LLM-Council', '99']

        const filteredRepos = repos.filter((repo: any) =>
          !excludedRepos.includes(repo.name) &&
          !repo.fork &&
          !repo.archived
        )

        const processedProjects: ProcessedProject[] = filteredRepos.map((repo: any) => {
          const lowerName = repo.name.toLowerCase()
          const lowerDesc = (repo.description || '').toLowerCase()

          let category = 'Autres'
          if (
            lowerName.includes('ia') || lowerName.includes('ai') ||
            lowerName.includes('ml') || lowerName.includes('nlp') ||
            lowerName.includes('llm') || lowerName.includes('langue-des-signes') ||
            lowerDesc.includes('machine learning') || lowerDesc.includes('deep learning') ||
            lowerDesc.includes('nlp') || lowerDesc.includes('sbert') || lowerDesc.includes('semantic')
          ) {
            category = 'IA / Machine Learning'
          } else if (
            repo.language === 'TypeScript' || repo.language === 'JavaScript' ||
            repo.language === 'HTML' || repo.language === 'CSS' ||
            lowerDesc.includes('pwa') || lowerDesc.includes('web') || lowerDesc.includes('app')
          ) {
            category = 'Fullstack / Web'
          }

          const tags: string[] = []
          if (repo.language) tags.push(repo.language)
          if (repo.topics) tags.push(...repo.topics.slice(0, 4))

          return {
            name: repo.name,
            desc: repo.description || `Projet ${repo.language || 'personnel'}`,
            lang: repo.language || 'Multi',
            tags: tags.length > 0 ? tags : ['Code'],
            url: repo.html_url,
            homepage: repo.homepage || null,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            commits: 0,
            category,
          }
        })

        setProjects(processedProjects)
        setLoading(false)
      } catch (err) {
        console.error('GitHub API error:', err)
        setError('Impossible de charger les projets depuis GitHub')
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const projectsByCategory = useMemo(() => {
    const grouped: Record<string, ProcessedProject[]> = {}
    projects.forEach((project) => {
      if (!grouped[project.category]) {
        grouped[project.category] = []
      }
      grouped[project.category].push(project)
    })
    const orderedCategories = ['IA / Machine Learning', 'Fullstack / Web', 'Autres']
    const ordered: Record<string, ProcessedProject[]> = {}
    orderedCategories.forEach((cat) => {
      if (grouped[cat]?.length > 0) {
        ordered[cat] = grouped[cat]
      }
    })
    return ordered
  }, [projects])

  const categories = Object.keys(projectsByCategory)

  const filteredProjects = activeCategory
    ? { [activeCategory]: projectsByCategory[activeCategory] }
    : projectsByCategory

  const searchFilteredProjects = useMemo(() => {
    return Object.entries(filteredProjects).reduce((acc, [category, categoryProjects]) => {
      if (!categoryProjects) return acc
      const filtered = categoryProjects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    }, {} as Record<string, ProcessedProject[]>)
  }, [filteredProjects, searchTerm])

  const totalProjects = projects.length
  const displayedProjects = Object.values(searchFilteredProjects).flat().length

  const allFilteredProjects = useMemo(() => {
    return Object.values(searchFilteredProjects).flat()
  }, [searchFilteredProjects])

  // --- LOADING STATE ---
  if (loading) {
    return (
      <ErrorBoundary>
        <main className="min-h-screen pt-28 pb-20" style={{ background: 'var(--bg-deep, #0a0a0f)' }}>
          <div className="container-wide">
            <div className="text-center mb-10">
              <div
                className="inline-block w-5 h-5 rounded-full mb-4"
                style={{
                  background: 'var(--accent-cyan, #00f0ff)',
                  animation: 'pulse-glow 1.5s ease-in-out infinite',
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'var(--bg-elevated, #1a1a2e)',
                    height: 280,
                    border: '1px solid var(--border, #2a2a3e)',
                  }}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(42,42,62,0) 25%, rgba(42,42,62,0.5) 50%, rgba(42,42,62,0) 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s infinite',
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes shimmer {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.4; box-shadow: 0 0 8px rgba(0,240,255,0.3); }
              50% { opacity: 1; box-shadow: 0 0 20px rgba(0,240,255,0.6); }
            }
          `}</style>
        </main>
      </ErrorBoundary>
    )
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <ErrorBoundary>
        <main
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'var(--bg-deep, #0a0a0f)' }}
        >
          <div
            className="rounded-xl p-8 text-center"
            style={{
              maxWidth: 500,
              background: 'rgba(26,26,46,0.85)',
              border: '1px solid var(--border, #2a2a3e)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <p className="text-lg mb-4 font-bold" style={{ color: 'var(--text-primary, #f0f0f0)' }}>{error}</p>
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: 'var(--accent-cyan, #00f0ff)',
                color: 'var(--bg-deep, #0a0a0f)',
              }}
            >
              <Github size={18} />
              <span>Voir directement sur GitHub</span>
            </a>
          </div>
        </main>
      </ErrorBoundary>
    )
  }

  // --- MAIN RENDER ---
  return (
    <ErrorBoundary>
      <main className="min-h-screen pt-28 pb-20" style={{ background: 'var(--bg-deep, #0a0a0f)' }}>
        <div className="container-wide">

          {/* ====== HEADER ====== */}
          <div className="text-center mb-8">
            <h1
              className="text-2xl md:text-3xl font-bold tracking-widest uppercase"
              style={{ color: 'var(--text-primary, #f0f0f0)' }}
            >
              PROJETS
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary, #a0a0b0)' }}>
              {t('projects.description', { count: totalProjects })}
            </p>
          </div>

          {/* ====== SEARCH BAR ====== */}
          <div className="max-w-xl mx-auto mb-8">
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
              style={{
                background: 'var(--bg-surface, #12121a)',
                border: '1px solid var(--border, #2a2a3e)',
              }}
            >
              <Search size={18} style={{ color: 'var(--text-secondary, #a0a0b0)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder={t('projects.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{
                  color: 'var(--text-primary, #f0f0f0)',
                  caretColor: 'var(--accent-cyan, #00f0ff)',
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="cursor-pointer"
                  style={{ color: 'var(--text-secondary, #a0a0b0)' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* ====== CATEGORY FILTER PILLS ====== */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className="text-xs px-4 py-1.5 rounded-full font-semibold transition-all duration-200"
              style={{
                background: activeCategory === null ? 'var(--accent-cyan, #00f0ff)' : 'transparent',
                color: activeCategory === null ? 'var(--bg-deep, #0a0a0f)' : 'var(--text-secondary, #a0a0b0)',
                border: `1px solid ${activeCategory === null ? 'var(--accent-cyan, #00f0ff)' : 'var(--border, #2a2a3e)'}`,
              }}
            >
              {t('projects.all')}
            </button>
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="text-xs px-4 py-1.5 rounded-full font-semibold transition-all duration-200"
                  style={{
                    background: isActive ? 'var(--accent-cyan, #00f0ff)' : 'transparent',
                    color: isActive ? 'var(--bg-deep, #0a0a0f)' : 'var(--text-secondary, #a0a0b0)',
                    border: `1px solid ${isActive ? 'var(--accent-cyan, #00f0ff)' : 'var(--border, #2a2a3e)'}`,
                  }}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Results count */}
          {searchTerm && (
            <p className="text-sm mb-6 text-center" style={{ color: 'var(--text-secondary, #a0a0b0)' }}>
              {displayedProjects} {t('projects.found')} "{searchTerm}"
            </p>
          )}

          {/* ====== PROJECT CARDS GRID ====== */}
          {allFilteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allFilteredProjects.map((project) => (
                <div
                  key={project.name}
                  className="project-card group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(26,26,46,0.85)',
                    border: '1px solid var(--border, #2a2a3e)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex flex-col flex-1 p-5">
                    {/* Project Name */}
                    <h3
                      className="text-base font-bold tracking-wide mb-2 line-clamp-1"
                      style={{ color: 'var(--text-primary, #f0f0f0)' }}
                    >
                      {project.name}
                    </h3>

                    {/* Language indicator */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ background: LANG_COLORS[project.lang] || '#888' }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-secondary, #a0a0b0)' }}
                      >
                        {project.lang}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-xs leading-relaxed line-clamp-2 mb-3"
                      style={{ color: 'var(--text-secondary, #a0a0b0)' }}
                    >
                      {project.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                          style={{
                            color: '#606070',
                            border: '1px solid var(--border, #2a2a3e)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ color: 'var(--accent-cyan, #00f0ff)' }}
                        >
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Stars / Forks */}
                    {(project.stars > 0 || project.forks > 0) && (
                      <div className="flex items-center gap-3 text-xs mb-3" style={{ color: 'var(--text-secondary, #a0a0b0)' }}>
                        {project.stars > 0 && (
                          <span className="flex items-center gap-1" title="Stars">
                            <Star size={12} />
                            {project.stars}
                          </span>
                        )}
                        {project.forks > 0 && (
                          <span className="flex items-center gap-1" title="Forks">
                            <GitFork size={12} />
                            {project.forks}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 mt-2">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                        style={{
                          background: 'transparent',
                          color: 'var(--accent-cyan, #00f0ff)',
                          border: '1px solid var(--accent-cyan, #00f0ff)',
                        }}
                      >
                        <Github size={12} />
                        Code
                      </a>
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                          style={{
                            background: 'var(--accent-cyan, #00f0ff)',
                            color: 'var(--bg-deep, #0a0a0f)',
                          }}
                        >
                          <ExternalLink size={12} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ====== EMPTY STATE ====== */
            <div className="flex flex-col items-center justify-center py-24">
              <div
                className="rounded-xl p-8 text-center"
                style={{
                  background: 'rgba(26,26,46,0.85)',
                  border: '1px solid var(--border, #2a2a3e)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Search size={48} style={{ color: 'var(--text-secondary, #a0a0b0)', opacity: 0.4, margin: '0 auto' }} />
                <p
                  className="text-lg font-bold mt-4"
                  style={{ color: 'var(--text-primary, #f0f0f0)' }}
                >
                  {t('projects.noResults')}
                </p>
                <p
                  className="text-sm mt-2"
                  style={{ color: 'var(--text-secondary, #a0a0b0)' }}
                >
                  {t('projects.tryAnother')}
                </p>
              </div>
            </div>
          )}

          {/* ====== FOOTER CTA ====== */}
          <div className="flex justify-center mt-12">
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                background: 'transparent',
                color: 'var(--accent-cyan, #00f0ff)',
                border: '1px solid var(--accent-cyan, #00f0ff)',
                boxShadow: '0 0 20px rgba(0,240,255,0.1)',
              }}
            >
              <Github size={18} />
              {t('projects.viewOnGithub')}
            </a>
          </div>
        </div>

        {/* Scoped styles */}
        <style>{`
          .project-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0,240,255,0.1);
            border-color: var(--accent-cyan, #00f0ff) !important;
          }

          .project-card:hover h3 {
            color: var(--accent-cyan, #00f0ff) !important;
          }
        `}</style>
      </main>
    </ErrorBoundary>
  )
}
