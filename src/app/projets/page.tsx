'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { animate, stagger } from 'animejs'
import { ArrowUpRight, Github, Star, GitFork, GitCommit } from 'lucide-react'
import ErrorBoundary from '@/components/ErrorBoundary'

const SpaceBackground = dynamic(
  () => import('@/components/three/SpaceBackground').catch(() => {
    return { default: () => null }
  }),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 -z-10 bg-[#050508]" />,
  }
)

interface ProcessedProject {
  name: string
  desc: string
  lang: string
  tags: string[]
  url: string
  stars: number
  forks: number
  commits: number
  category: string
}

export default function Projets() {
  const [projects, setProjects] = useState<ProcessedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const headerRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

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
        const excludedRepos = ['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam']

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
  const totalCommits = projects.reduce((sum, p) => sum + p.commits, 0)

  // Header animation
  useEffect(() => {
    if (loading) return
    const header = headerRef.current
    if (header) {
      const caption = header.querySelector('.page-caption')
      const title = header.querySelector('.page-title')
      const description = header.querySelector('.page-description')
      const stats = header.querySelector('.stats-row')
      const filterBtns = header.querySelectorAll('.filter-btn')

      if (caption) {
        animate(caption, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        })
      }

      if (title) {
        animate(title, {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 100,
        })
      }

      if (description) {
        animate(description, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 200,
        })
      }

      if (stats) {
        animate(stats, {
          translateY: [10, 0],
          opacity: [0, 1],
          duration: 500,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 300,
        })
      }

      if (filterBtns.length > 0) {
        animate(filterBtns, {
          scale: [0.9, 1],
          opacity: [0, 1],
          duration: 400,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: stagger(30, { start: 400 }),
        })
      }
    }
  }, [loading])

  // Animate projects when they change
  useEffect(() => {
    if (loading) return
    const container = projectsRef.current
    if (!container) return

    const cards = container.querySelectorAll('.project-card')
    cards.forEach(card => {
      (card as HTMLElement).style.opacity = '0'
    })

    animate(cards, {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 500,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      delay: stagger(30),
    })
  }, [activeCategory, searchTerm, loading])

  if (loading) {
    return (
      <>
        <ErrorBoundary><SpaceBackground variant="minimal" /></ErrorBoundary>
        <main className="pt-32 pb-24">
          <div className="container-wide">
            {/* Header Skeleton */}
            <div className="layout-offset mb-16">
              <div className="h-4 w-32 bg-[--bg-elevated] rounded animate-pulse mb-4" />
              <div className="h-12 w-48 bg-[--bg-elevated] rounded animate-pulse mb-6" />
              <div className="h-6 w-96 bg-[--bg-elevated] rounded animate-pulse" />
            </div>

            {/* Filter Skeleton */}
            <div className="flex gap-2 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-24 bg-[--bg-elevated] rounded animate-pulse" />
              ))}
            </div>

            {/* Projects Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[--border]">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[--bg-surface] p-6">
                  <div className="flex justify-between mb-4">
                    <div className="h-6 w-16 bg-[--bg-elevated] rounded animate-pulse" />
                    <div className="h-4 w-12 bg-[--bg-elevated] rounded animate-pulse" />
                  </div>
                  <div className="h-5 w-3/4 bg-[--bg-elevated] rounded animate-pulse mb-2" />
                  <div className="h-4 w-full bg-[--bg-elevated] rounded animate-pulse mb-4" />
                  <div className="flex gap-2">
                    <div className="h-4 w-12 bg-[--bg-elevated] rounded animate-pulse" />
                    <div className="h-4 w-16 bg-[--bg-elevated] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <ErrorBoundary><SpaceBackground variant="minimal" /></ErrorBoundary>
        <main className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <Github size={18} />
              <span>Voir directement sur GitHub</span>
            </a>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      {/* Three.js Space Background */}
      <ErrorBoundary>
        <SpaceBackground variant="default" />
      </ErrorBoundary>
      <main className="pt-32 pb-24 relative z-10">
        <div className="container-wide">

          {/* Header - Bold Neo-Editorial */}
          <div ref={headerRef} className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="page-caption text-caption text-accent" style={{ opacity: 0 }}>// Portfolio GitHub</span>
              <span className="w-16 h-px bg-accent" />
            </div>

            <h1 className="page-title text-display mb-8 leading-[0.85]" style={{ opacity: 0 }}>
              <span className="block text-[--text-primary] glitch-text" data-text="Mes">Mes</span>
              <span className="block text-accent neon-glow-subtle">Projets</span>
            </h1>

            <p className="page-description text-body-lg max-w-2xl mb-12 text-[--text-secondary] border-l-2 border-accent/30 pl-6" style={{ opacity: 0 }}>
              {totalProjects} projets publics couvrant l'IA, le Machine Learning,
              le Fullstack, et bien plus. Données en temps réel depuis GitHub.
            </p>

            {/* Stats row - Grid style */}
            <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-1 bg-[--border] mb-8" style={{ opacity: 0 }}>
              <div className="bg-[--bg-surface] p-4 flex items-center gap-3">
                <Github size={18} className="text-accent" />
                <div>
                  <span className="font-mono text-2xl font-bold text-accent">{totalProjects}</span>
                  <span className="text-xs text-[--text-muted] ml-2">repos</span>
                </div>
              </div>
              {totalCommits > 0 && (
                <div className="bg-[--bg-surface] p-4 flex items-center gap-3">
                  <GitCommit size={18} className="text-highlight" />
                  <div>
                    <span className="font-mono text-2xl font-bold text-highlight">{totalCommits}</span>
                    <span className="text-xs text-[--text-muted] ml-2">commits</span>
                  </div>
                </div>
              )}
              <div className="bg-[--bg-surface] p-4 col-span-2 md:col-span-1 flex items-center">
                <a
                  href="https://github.com/Adam-Blf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-highlight transition-colors text-sm group"
                >
                  <span className="font-mono">View on GitHub</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="mb-12">
            <div className="max-w-md mb-8">
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-[--border] text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors font-mono text-sm rounded-sm"
                aria-label="Rechercher un projet"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`filter-btn tag transition-colors cursor-pointer ${
                  activeCategory === null ? 'tag-accent' : 'hover:border-accent'
                }`}
                style={{ opacity: 0 }}
              >
                Tous ({totalProjects})
              </button>
              {categories.map((cat) => {
                const count = projectsByCategory[cat]?.length || 0
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`filter-btn tag transition-colors cursor-pointer ${
                      activeCategory === cat ? 'tag-accent' : 'hover:border-accent'
                    }`}
                    style={{ opacity: 0 }}
                  >
                    {cat.split(' / ')[0]} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results count */}
          {searchTerm && (
            <p className="text-[--text-muted] text-sm mb-8">
              {displayedProjects} projet{displayedProjects > 1 ? 's' : ''} trouvé{displayedProjects > 1 ? 's' : ''} pour "{searchTerm}"
            </p>
          )}

          {/* Projects */}
          <div ref={projectsRef}>
            {Object.entries(searchFilteredProjects).map(([category, categoryProjects], catIndex) => (
              <section key={category} className="mb-16">
                <div className="flex items-baseline gap-8 mb-8">
                  <span className="font-mono text-accent text-sm">0{catIndex + 1}</span>
                  <div>
                    <h2 className="text-title">{category}</h2>
                    <p className="text-sm text-[--text-muted]">{categoryProjects.length} projets</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-[--border]">
                  {categoryProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card group bg-[--bg-surface]/95 backdrop-blur-sm p-6 cursor-pointer relative overflow-hidden transition-colors"
                      style={{
                        opacity: 0,
                        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)'
                      }}
                    >
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-br from-accent/30 to-accent/10" />

                      {/* Top accent line on hover */}
                      <div className="absolute top-0 left-0 right-4 h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                      <div className="flex items-start justify-between mb-4">
                        <span
                          className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-accent/10 text-accent border border-accent/20"
                          style={{ clipPath: 'polygon(4px 0, 100% 0, 100% 100%, 0 100%, 0 4px)' }}
                        >
                          {project.lang}
                        </span>
                        <div className="flex items-center gap-3 text-[--text-muted]">
                          {project.commits > 0 && (
                            <span className="flex items-center gap-1 text-xs font-mono" title="Commits">
                              <GitCommit size={10} />
                              {project.commits}
                            </span>
                          )}
                          {project.stars > 0 && (
                            <span className="flex items-center gap-1 text-xs font-mono" title="Stars">
                              <Star size={10} />
                              {project.stars}
                            </span>
                          )}
                          {project.forks > 0 && (
                            <span className="flex items-center gap-1 text-xs font-mono" title="Forks">
                              <GitFork size={10} />
                              {project.forks}
                            </span>
                          )}
                          <ArrowUpRight
                            size={14}
                            className="text-accent/50 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                          />
                        </div>
                      </div>

                      <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-[--text-secondary] mb-4 line-clamp-2 leading-relaxed">
                        {project.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span key={tag} className="text-[10px] font-mono text-[--text-muted] px-1.5 py-0.5 border border-[--border]">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] font-mono text-accent">+{project.tags.length - 3}</span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* No results */}
          {Object.keys(searchFilteredProjects).length === 0 && (
            <div className="text-center py-20">
              <p className="text-[--text-muted] mb-2">Aucun projet trouvé</p>
              <p className="text-sm text-[--text-muted]">Essayez un autre terme de recherche</p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
