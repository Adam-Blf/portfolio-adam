'use client'

import { useState, useEffect, useMemo } from 'react'
import { Github, Star, GitFork, GitCommit, Search, X } from 'lucide-react'
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

// Map languages to type colors
const LANG_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Python: { bg: '#A98FF3', text: '#fff' },
  TypeScript: { bg: '#3178C6', text: '#fff' },
  JavaScript: { bg: '#F1E05A', text: '#333' },
  HTML: { bg: '#E34C26', text: '#fff' },
  CSS: { bg: '#563D7C', text: '#fff' },
  Java: { bg: '#B07219', text: '#fff' },
  'C++': { bg: '#F34B7D', text: '#fff' },
  C: { bg: '#555555', text: '#fff' },
  Go: { bg: '#00ADD8', text: '#fff' },
  Rust: { bg: '#DEA584', text: '#333' },
  Shell: { bg: '#89E051', text: '#333' },
  Ruby: { bg: '#701516', text: '#fff' },
  PHP: { bg: '#4F5D95', text: '#fff' },
  Swift: { bg: '#F05138', text: '#fff' },
  Kotlin: { bg: '#A97BFF', text: '#fff' },
  Dart: { bg: '#00B4AB', text: '#fff' },
  R: { bg: '#198CE7', text: '#fff' },
  Jupyter: { bg: '#DA5B0B', text: '#fff' },
  'Jupyter Notebook': { bg: '#DA5B0B', text: '#fff' },
  Multi: { bg: '#A8A878', text: '#fff' },
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

const CATEGORY_MAP: Record<string, string> = {
  'IA / Machine Learning': 'Data & ML',
  'Fullstack / Web': 'Web & Fullstack',
  'Autres': 'Other',
}

// Map categories to type styling
const CATEGORY_TYPE: Record<string, { bg: string; text: string; label: string }> = {
  'IA / Machine Learning': { bg: '#F95587', label: 'PSYCHIC', text: '#fff' },
  'Fullstack / Web': { bg: '#F8D030', label: 'ELECTRIC', text: '#333' },
  'Autres': { bg: '#A8A878', label: 'NORMAL', text: '#fff' },
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
          throw new Error('Erreur lors de la récupération des repos')
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

  // --- LOADING STATE: SCANNING skeleton ---
  if (loading) {
    return (
      <ErrorBoundary>
        <main className="min-h-screen pt-28 pb-20" style={{ background: '#DC0A2D' }}>
          <div className="container-wide">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="pokedex-led pokedex-led-blue" style={{ width: 14, height: 14 }} />
                <div className="pokedex-led pokedex-led-red" style={{ width: 8, height: 8 }} />
                <div className="pokedex-led pokedex-led-yellow" style={{ width: 8, height: 8 }} />
              </div>
              <p
                className="text-sm font-bold tracking-widest uppercase"
                style={{ color: '#fff', fontFamily: 'monospace' }}
              >
                SCANNING...
              </p>
            </div>
            <div className="pokedex-screen p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden"
                    style={{ background: '#fff', height: 280, border: '3px solid #e0e0e0' }}
                  >
                    <div
                      className="h-full w-full"
                      style={{
                        background: 'linear-gradient(90deg, #f5f5f5 25%, #fafafa 50%, #f5f5f5 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'pokedex-scan 1.5s infinite',
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            @keyframes pokedex-scan {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
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
          style={{ background: '#DC0A2D' }}
        >
          <div className="pokedex-screen p-8 text-center" style={{ maxWidth: 500 }}>
            <p className="text-lg mb-4 font-bold" style={{ color: 'var(--pokedex-dark, #333)' }}>{error}</p>
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="pokedex-button inline-flex items-center gap-2"
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
      <main className="min-h-screen pt-28 pb-20" style={{ background: '#DC0A2D' }}>
        <div className="container-wide">

          {/* ====== HEADER ====== */}
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
              PROJETS
            </h1>
            <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {t('projects.description', { count: totalProjects })}
            </p>
          </div>

          {/* ====== SEARCH BAR ====== */}
          <div className="max-w-xl mx-auto mb-8">
            <div
              className="pokedex-screen flex items-center gap-3 px-4 py-3"
            >
              <Search size={18} style={{ color: 'var(--pokedex-dark, #333)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder={t('projects.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm font-bold"
                style={{
                  color: 'var(--pokedex-dark, #333)',
                  fontFamily: 'monospace',
                  caretColor: 'var(--pokedex-dark, #333)',
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="cursor-pointer"
                  style={{ color: 'var(--pokedex-dark, #333)' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* ====== TYPE FILTER BADGES ====== */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`pokedex-button text-xs flex items-center gap-1.5 transition-all ${
                activeCategory === null
                  ? '!bg-white !text-[--pokedex-red] font-bold shadow-lg'
                  : ''
              }`}
            >
              {t('projects.all')}
            </button>
            {categories.map((cat) => {
              const typeStyle = CATEGORY_TYPE[cat] || { bg: '#A8A878', label: cat, text: '#fff' }
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pokedex-button text-xs flex items-center gap-1.5 transition-all ${
                    isActive
                      ? '!bg-white !text-[--pokedex-red] font-bold shadow-lg'
                      : ''
                  }`}
                >
                  {typeStyle.label}
                </button>
              )
            })}
          </div>

          {/* Results count */}
          {searchTerm && (
            <p className="text-sm mb-6 text-center" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>
              {displayedProjects} {t('projects.found')} &ldquo;{searchTerm}&rdquo;
            </p>
          )}

          {/* ====== ENTRY CARDS GRID ====== */}
          {allFilteredProjects.length > 0 ? (
            <div className="pokedex-screen p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {allFilteredProjects.map((project, index) => {
                  const entryNumber = String(index + 1).padStart(3, '0')
                  const typeColor = LANG_TYPE_COLORS[project.lang] || { bg: '#A8A878', text: '#fff' }
                  const cp = project.stars + project.forks

                  return (
                    <div
                      key={project.name}
                      className="pokedex-card group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300"
                      style={{
                        background: '#fff',
                        border: '3px solid #e0e0e0',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                    >
                      {/* Top bar with entry number and shiny indicator */}
                      <div
                        className="flex items-center justify-between px-4 py-2"
                        style={{ background: 'var(--pokedex-red, #DC0A2D)' }}
                      >
                        <span
                          className="pokedex-entry-number text-xs font-bold"
                          style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}
                        >
                          #{entryNumber}
                        </span>
                        {project.homepage && (
                          <span
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                            style={{ color: 'var(--pokedex-yellow, #FFD700)' }}
                          >
                            LIVE
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col flex-1 p-4">
                        {/* Project Name */}
                        <h3
                          className="text-base font-black uppercase tracking-wide mb-2 line-clamp-1"
                          style={{ color: 'var(--pokedex-dark, #333)' }}
                        >
                          {project.name}
                        </h3>

                        {/* Primary Type Badge (Language) */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="type-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase"
                            style={{
                              background: typeColor.bg,
                              color: typeColor.text,
                            }}
                          >
                            <span
                              className="inline-block w-2 h-2 rounded-full"
                              style={{ background: LANG_COLORS[project.lang] || '#888' }}
                            />
                            {project.lang}
                          </span>
                        </div>

                        {/* LCD Description Screen */}
                        <div
                          className="pokedex-screen rounded-lg p-3 mb-3"
                        >
                          <p
                            className="text-xs leading-relaxed line-clamp-2"
                            style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace' }}
                          >
                            {project.desc}
                          </p>
                        </div>

                        {/* Tags (Secondary Types / Abilities) */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{
                                background: '#f0f0f0',
                                color: '#666',
                                border: '1px solid #ddd',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                              style={{ color: 'var(--pokedex-red, #DC0A2D)' }}
                            >
                              +{project.tags.length - 4}
                            </span>
                          )}
                        </div>

                        {/* CP (Stars + Forks) */}
                        {cp > 0 && (
                          <div className="flex items-center gap-3 text-xs mb-3" style={{ color: '#999' }}>
                            <span className="font-bold" style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace' }}>
                              CP {cp}
                            </span>
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

                        {/* Action Buttons: CATCH + INSPECT */}
                        <div className="flex items-center gap-2 mt-2">
                          {project.homepage && (
                            <a
                              href={project.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pokedex-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
                              style={{
                                background: '#fff',
                                color: 'var(--pokedex-red, #DC0A2D)',
                                border: '2px solid var(--pokedex-red, #DC0A2D)',
                              }}
                            >
                              CATCH
                            </a>
                          )}
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pokedex-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
                            style={{
                              background: '#e0e0e0',
                              color: '#555',
                              border: '2px solid #ccc',
                            }}
                          >
                            <Github size={12} />
                            INSPECT
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            /* ====== EMPTY STATE ====== */
            <div className="flex flex-col items-center justify-center py-24">
              <div className="pokedex-screen rounded-xl p-8 text-center">
                <Search size={48} style={{ color: 'var(--pokedex-dark, #333)', opacity: 0.4, margin: '0 auto' }} />
                <p
                  className="text-lg font-bold mt-4"
                  style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace' }}
                >
                  {t('projects.noResults')}
                </p>
                <p
                  className="text-sm mt-2"
                  style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace', opacity: 0.7 }}
                >
                  {t('projects.tryAnother')}
                </p>
              </div>
            </div>
          )}

          <div className="pokedex-hinge my-8" />

          {/* ====== FOOTER CTA ====== */}
          <div className="flex justify-center">
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="pokedex-button inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                background: '#fff',
                color: 'var(--pokedex-red, #DC0A2D)',
                border: '3px solid var(--pokedex-red-dark, #A00020)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              <Github size={18} />
              {t('projects.viewOnGithub')}
            </a>
          </div>
        </div>

        {/* Scoped styles */}
        <style>{`
          .pokedex-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(220,10,45,0.15);
            border-color: var(--pokedex-red, #DC0A2D) !important;
          }

          .pokedex-card:hover h3 {
            color: var(--pokedex-red, #DC0A2D) !important;
          }
        `}</style>
      </main>
    </ErrorBoundary>
  )
}
