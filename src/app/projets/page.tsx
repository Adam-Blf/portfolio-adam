'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { animate, stagger } from 'animejs'
import { ArrowUpRight, Github, Star, GitFork, Loader2 } from 'lucide-react'

const PageBackground = dynamic(() => import('@/components/three/PageBackground'), {
  ssr: false,
  loading: () => null,
})

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  fork: boolean
  archived: boolean
}

interface ProcessedProject {
  name: string
  desc: string
  lang: string
  tags: string[]
  url: string
  stars: number
  forks: number
}

// Repos to exclude
const excludedRepos = ['Adam-Blf', 'portfolio', 'Logo', 'Keep-Alive', 'portfolio-adam']

export default function Projets() {
  const [projects, setProjects] = useState<Record<string, ProcessedProject[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const headerRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  // Fetch repos from GitHub API
  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch('https://api.github.com/users/Adam-Blf/repos?per_page=100&sort=updated', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
          next: { revalidate: 3600 }
        })

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des repos')
        }

        const repos: GitHubRepo[] = await response.json()

        // Filter and process repos
        const filteredRepos = repos.filter(repo =>
          !excludedRepos.includes(repo.name) &&
          !repo.fork &&
          !repo.archived
        )

        // Categorize repos
        const categories: Record<string, ProcessedProject[]> = {
          'IA / Machine Learning': [],
          'Fullstack / Web': [],
          'Autres': [],
        }

        for (const repo of filteredRepos) {
          const lowerName = repo.name.toLowerCase()
          const lowerDesc = (repo.description || '').toLowerCase()

          const tags: string[] = []
          if (repo.language) tags.push(repo.language)
          if (repo.topics) tags.push(...repo.topics.slice(0, 4))

          const project: ProcessedProject = {
            name: repo.name,
            desc: repo.description || `Projet ${repo.language || 'personnel'}`,
            lang: repo.language || 'Multi',
            tags: tags.length > 0 ? tags : ['Code'],
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
          }

          // Categorize based on name/description keywords
          if (
            lowerName.includes('ia') ||
            lowerName.includes('ai') ||
            lowerName.includes('ml') ||
            lowerName.includes('nlp') ||
            lowerName.includes('llm') ||
            lowerName.includes('langue-des-signes') ||
            lowerDesc.includes('machine learning') ||
            lowerDesc.includes('deep learning') ||
            lowerDesc.includes('neural') ||
            lowerDesc.includes('nlp') ||
            lowerDesc.includes('sbert') ||
            lowerDesc.includes('semantic') ||
            lowerDesc.includes('recommendation') ||
            lowerDesc.includes('ai')
          ) {
            categories['IA / Machine Learning'].push(project)
          } else if (
            repo.language === 'TypeScript' ||
            repo.language === 'JavaScript' ||
            repo.language === 'HTML' ||
            repo.language === 'CSS' ||
            lowerDesc.includes('pwa') ||
            lowerDesc.includes('web') ||
            lowerDesc.includes('app') ||
            lowerDesc.includes('frontend') ||
            lowerDesc.includes('backend')
          ) {
            categories['Fullstack / Web'].push(project)
          } else {
            categories['Autres'].push(project)
          }
        }

        // Remove empty categories
        const nonEmptyCategories = Object.fromEntries(
          Object.entries(categories).filter(([_, projects]) => projects.length > 0)
        )

        setProjects(nonEmptyCategories)
        setLoading(false)
      } catch (err) {
        console.error('GitHub API error:', err)
        setError('Impossible de charger les projets depuis GitHub')
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const categories = Object.keys(projects)

  const filteredProjects = activeCategory
    ? { [activeCategory]: projects[activeCategory] }
    : projects

  const searchFilteredProjects = Object.entries(filteredProjects).reduce((acc, [category, categoryProjects]) => {
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

  const totalProjects = Object.values(projects).flat().length
  const displayedProjects = Object.values(searchFilteredProjects).flat().length

  // Header animation
  useEffect(() => {
    if (loading) return
    const header = headerRef.current
    if (header) {
      const caption = header.querySelector('.page-caption')
      const title = header.querySelector('.page-title')
      const description = header.querySelector('.page-description')
      const githubLink = header.querySelector('.github-link')
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

      if (githubLink) {
        animate(githubLink, {
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
        <PageBackground variant="grid" />
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
        <PageBackground variant="grid" />
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
      <PageBackground variant="grid" />
      <main className="pt-32 pb-24">
        <div className="container-wide">

          {/* Header */}
          <div ref={headerRef} className="layout-offset mb-16">
            <p className="page-caption text-caption mb-4" style={{ opacity: 0 }}>Portfolio GitHub</p>
            <h1 className="page-title text-display mb-6" style={{ opacity: 0 }}>Projets</h1>
            <p className="page-description text-body max-w-xl mb-8" style={{ opacity: 0 }}>
              {totalProjects} projets publics couvrant l'IA, le Machine Learning,
              le Fullstack, et bien plus. Données en temps réel depuis GitHub.
            </p>

            <a
              href="https://github.com/Adam-Blf"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link inline-flex items-center gap-2 text-accent hover:underline"
              style={{ opacity: 0 }}
            >
              <Github size={18} />
              <span>Voir sur GitHub</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Search & Filters */}
          <div className="mb-12">
            <div className="max-w-md mb-8">
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-[--border] text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors font-mono text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`filter-btn tag transition-colors ${
                  activeCategory === null ? 'tag-accent' : 'hover:border-accent'
                }`}
                style={{ opacity: 0 }}
              >
                Tous ({totalProjects})
              </button>
              {categories.map((cat) => {
                const count = projects[cat]?.length || 0
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`filter-btn tag transition-colors ${
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[--border]">
                  {categoryProjects.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-card group bg-[--bg-surface] p-6 hover:bg-[--bg-elevated] transition-colors"
                      style={{ opacity: 0 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="tag font-mono text-xs">{project.lang}</span>
                        <div className="flex items-center gap-3 text-[--text-muted]">
                          {project.stars > 0 && (
                            <span className="flex items-center gap-1 text-xs">
                              <Star size={12} />
                              {project.stars}
                            </span>
                          )}
                          {project.forks > 0 && (
                            <span className="flex items-center gap-1 text-xs">
                              <GitFork size={12} />
                              {project.forks}
                            </span>
                          )}
                          <ArrowUpRight
                            size={16}
                            className="group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                          />
                        </div>
                      </div>

                      <h3 className="text-base font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-[--text-secondary] mb-4 line-clamp-2">
                        {project.desc}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag, idx) => (
                          <span key={tag} className="text-xs text-[--text-muted]">
                            {tag}{idx < 2 && project.tags.length > 1 ? ' •' : ''}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-xs text-[--text-muted]">+{project.tags.length - 3}</span>
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
