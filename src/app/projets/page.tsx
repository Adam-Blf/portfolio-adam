'use client'

import { useState, useEffect, useMemo } from 'react'
import { ArrowUpRight, Github, Star, GitFork, GitCommit, ExternalLink, Search, X, Loader2 } from 'lucide-react'
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

const CATEGORY_MAP: Record<string, string> = {
  'IA / Machine Learning': 'Data & ML',
  'Fullstack / Web': 'Web & Fullstack',
  'Autres': 'Other',
}

export default function Projets() {
  const [projects, setProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const { t } = useI18n()

  // Fetch repos from API route
  useEffect(() => {
    const CACHE_KEY = 'github-projects'
    const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

    async function fetchRepos() {
      // Check localStorage cache first
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
        // Cache read failed, continue
      }

      try {
        // Try API route first
        const response = await fetch('/api/github', {
          next: { revalidate: 1800 }
        })

        if (response.ok) {
          const data = await response.json()
          setProjects(data.projects)

          // Cache to localStorage
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

      // Fallback to direct GitHub API
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
            commits: 0, // Not available without API route
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

  // Group projects by category
  const projectsByCategory = useMemo(() => {
    const grouped: Record<string, ProcessedProject[]> = {}
    projects.forEach((project) => {
      if (!grouped[project.category]) {
        grouped[project.category] = []
      }
      grouped[project.category].push(project)
    })
    // Sort categories
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

  // --- LOADING STATE: Netflix skeleton shimmer ---
  if (loading) {
    return (
      <ErrorBoundary>
        <main
          className="min-h-screen pt-28 pb-20"
          style={{ background: 'var(--bg-deep)' }}
        >
          <div className="container-wide">
            {/* Header skeleton */}
            <div className="mb-10">
              <div
                className="h-10 w-64 rounded mb-4"
                style={{
                  background: 'linear-gradient(90deg, #222 25%, #2a2a2a 50%, #222 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'nfx-shimmer 1.5s infinite',
                }}
              />
              <div
                className="h-11 w-80 rounded"
                style={{
                  background: 'linear-gradient(90deg, #222 25%, #2a2a2a 50%, #222 75%)',
                  backgroundSize: '200% 100%',
                  animation: 'nfx-shimmer 1.5s infinite',
                  animationDelay: '0.1s',
                }}
              />
            </div>
            {/* Filter skeleton */}
            <div className="flex gap-3 mb-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-9 rounded-full"
                  style={{
                    width: `${60 + i * 18}px`,
                    background: 'linear-gradient(90deg, #222 25%, #2a2a2a 50%, #222 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'nfx-shimmer 1.5s infinite',
                    animationDelay: `${i * 0.07}s`,
                  }}
                />
              ))}
            </div>
            {/* Cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-md overflow-hidden"
                  style={{
                    background: '#1a1a1a',
                    height: 260,
                  }}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      background: 'linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%)',
                      backgroundSize: '200% 100%',
                      animation: 'nfx-shimmer 1.5s infinite',
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes nfx-shimmer {
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
          style={{ background: 'var(--bg-deep)' }}
        >
          <div className="text-center">
            <p className="text-[#E50914] text-lg mb-4">{error}</p>
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:underline"
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
      <main
        className="min-h-screen pt-28 pb-20"
        style={{ background: 'var(--bg-deep)' }}
      >
        <div className="container-wide">

          {/* ====== PAGE HEADER ====== */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
              <h1
                className="font-bold leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  color: 'var(--text-primary)',
                }}
              >
                {t('projects.titleLine1')} {t('projects.titleLine2')}
              </h1>
              <p
                className="mt-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('projects.description', { count: totalProjects })}
              </p>
            </div>

            {/* Netflix-style search */}
            <div className="relative flex items-center">
              <div
                className="flex items-center overflow-hidden transition-all duration-300"
                style={{
                  width: searchOpen ? 280 : 40,
                  height: 40,
                  background: searchOpen ? '#333' : 'transparent',
                  border: searchOpen ? '1px solid #555' : '1px solid transparent',
                  borderRadius: 4,
                }}
              >
                <button
                  onClick={() => {
                    setSearchOpen(!searchOpen)
                    if (searchOpen) setSearchTerm('')
                  }}
                  className="flex-shrink-0 flex items-center justify-center cursor-pointer"
                  style={{ width: 40, height: 40, color: 'var(--text-primary)' }}
                  aria-label={t('projects.search')}
                >
                  {searchOpen ? <X size={18} /> : <Search size={18} />}
                </button>
                {searchOpen && (
                  <input
                    autoFocus
                    type="text"
                    placeholder={t('projects.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm pr-3"
                    style={{
                      color: 'var(--text-primary)',
                      caretColor: 'var(--accent)',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* ====== CATEGORY PILLS ====== */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <button
              onClick={() => setActiveCategory(null)}
              className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
              style={{
                background: activeCategory === null ? 'var(--accent)' : 'transparent',
                color: activeCategory === null ? '#fff' : 'var(--text-secondary)',
                border: activeCategory === null ? '1px solid var(--accent)' : '1px solid var(--border)',
              }}
            >
              {t('projects.all')}
            </button>
            {categories.map((cat) => {
              const label = CATEGORY_MAP[cat] || cat
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Results count when searching */}
          {searchTerm && (
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              {displayedProjects} {t('projects.found')} &ldquo;{searchTerm}&rdquo;
            </p>
          )}

          {/* ====== PROJECT CARDS GRID ====== */}
          {allFilteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allFilteredProjects.map((project) => (
                <div
                  key={project.name}
                  className="nfx-card group relative flex flex-col rounded-md overflow-hidden"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid transparent',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  {/* Red top border on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] origin-left"
                    style={{
                      background: 'var(--accent)',
                      transform: 'scaleX(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  />

                  {/* LIVE badge */}
                  {project.homepage && (
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: 'var(--accent)',
                        color: '#fff',
                      }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{
                          background: '#fff',
                          animation: 'nfx-pulse 2s infinite',
                        }}
                      />
                      LIVE
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-5">
                    {/* Project name */}
                    <h3
                      className="text-base font-bold mb-2 line-clamp-1 transition-colors duration-200"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed line-clamp-2 mb-4"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {project.desc}
                    </p>

                    {/* Language badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          background: LANG_COLORS[project.lang] || '#888',
                        }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {project.lang}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{
                            background: 'rgba(255,255,255,0.08)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ color: 'var(--accent)' }}
                        >
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Stats row */}
                    <div
                      className="flex items-center gap-4 text-xs mb-5"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {project.stars > 0 && (
                        <span className="flex items-center gap-1" title="Stars">
                          <Star size={13} />
                          {project.stars}
                        </span>
                      )}
                      {project.forks > 0 && (
                        <span className="flex items-center gap-1" title="Forks">
                          <GitFork size={13} />
                          {project.forks}
                        </span>
                      )}
                      {project.commits > 0 && (
                        <span className="flex items-center gap-1" title="Commits">
                          <GitCommit size={13} />
                          {project.commits}
                        </span>
                      )}
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Action buttons */}
                    <div className="flex items-center gap-3">
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-opacity duration-200 hover:opacity-80"
                          style={{
                            background: '#fff',
                            color: '#141414',
                          }}
                        >
                          <ExternalLink size={14} />
                          {t('projects.demo')}
                        </a>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-all duration-200 hover:bg-white/10"
                        style={{
                          background: 'transparent',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <Github size={14} />
                        {t('projects.code')}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ====== EMPTY STATE ====== */
            <div className="flex flex-col items-center justify-center py-24">
              <Search size={48} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
              <p
                className="text-lg font-semibold mt-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t('projects.noResults')}
              </p>
              <p
                className="text-sm mt-2"
                style={{ color: 'var(--text-muted)' }}
              >
                {t('projects.tryAnother')}
              </p>
            </div>
          )}

          {/* ====== FOOTER CTA ====== */}
          <div
            className="mt-16 pt-10 flex justify-center"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90"
              style={{
                background: 'var(--accent)',
                color: '#fff',
              }}
            >
              <Github size={18} />
              {t('projects.viewOnGithub')}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Scoped Netflix styles */}
        <style>{`
          @keyframes nfx-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }

          .nfx-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 30px rgba(0,0,0,0.7);
            border-color: var(--accent) !important;
            z-index: 10;
          }

          .nfx-card:hover > div:first-child {
            transform: scaleX(1) !important;
          }

          .nfx-card:hover h3 {
            color: #fff !important;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </main>
    </ErrorBoundary>
  )
}
