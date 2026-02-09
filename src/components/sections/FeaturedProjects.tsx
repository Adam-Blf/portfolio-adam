'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Github, ExternalLink, ChevronRight } from 'lucide-react'
import { projects } from '@/lib/data'

const langColorMap: Record<string, string> = {
  'Python': '#3776AB',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'CSS/JS': '#E44D26',
  'HTML/JS': '#F16529',
  'C#': '#68217A',
}

export default function FeaturedProjects() {
  const rowRef = useRef<HTMLDivElement>(null)

  const featuredNames = projects.featured
  const allProjects = Object.values(projects.categories).flat()
  const featuredProjects = featuredNames.map(name =>
    allProjects.find(p => p.name === name)
  ).filter(Boolean).slice(0, 6)

  const scrollRow = (direction: 'left' | 'right') => {
    if (!rowRef.current) return
    const scrollAmount = 300
    rowRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <section className="py-6 md:py-10">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-mono font-bold text-sm uppercase tracking-widest"
            style={{ color: 'var(--text-primary)' }}
          >
            DERNIERS PROJETS
          </h2>
          <Link
            href="/projects"
            className="tech-border font-mono text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-all"
            style={{ color: 'var(--accent-cyan)', backgroundColor: 'var(--bg-surface)' }}
          >
            Tout voir <ChevronRight size={12} />
          </Link>
        </div>

        {/* Horizontal scroll row */}
        <div className="relative group/row">
          {/* Scroll buttons */}
          <button
            onClick={() => scrollRow('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity rounded-l-xl"
            style={{ background: 'linear-gradient(to right, var(--bg-deep), transparent)' }}
            aria-label="Scroll left"
          >
            <ChevronRight size={24} className="rotate-180" style={{ color: 'var(--text-primary)' }} />
          </button>
          <button
            onClick={() => scrollRow('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity rounded-r-xl"
            style={{ background: 'linear-gradient(to left, var(--bg-deep), transparent)' }}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} style={{ color: 'var(--text-primary)' }} />
          </button>

          <div
            ref={rowRef}
            className="flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--border) transparent' }}
          >
            {featuredProjects.map((project) => {
              const homepage = project?.name ? projects.homepages[project.name] : null
              const githubUrl = `https://github.com/Adam-Blf/${project?.name}`
              const langColor = langColorMap[project?.lang || ''] || 'var(--accent-cyan)'

              return (
                <div
                  key={project?.name}
                  className="glass-card shrink-0 w-64 md:w-72 flex flex-col transition-all hover:scale-[1.02]"
                >
                  <div className="p-4 flex flex-col flex-1">
                    {/* Status indicator */}
                    <div className="flex justify-between items-center mb-2">
                      {homepage && (
                        <span
                          className="w-2 h-2 rounded-full"
                          title="LIVE"
                          style={{ backgroundColor: 'var(--success)', boxShadow: '0 0 6px var(--success-glow)' }}
                        />
                      )}
                    </div>

                    {/* Project name */}
                    <h3 className="font-mono font-bold text-base uppercase mb-1" style={{ color: 'var(--text-primary)' }}>
                      {project?.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                      {project?.desc}
                    </p>

                    {/* Language dot + text */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
                      <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {project?.lang}
                      </span>
                    </div>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project?.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                          style={{
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action links */}
                    <div className="flex items-center gap-3 mt-auto pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[11px] inline-flex items-center gap-1 transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        <Github size={12} /> Code
                      </a>
                      {homepage && (
                        <a
                          href={homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] inline-flex items-center gap-1 transition-colors"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                        >
                          <ExternalLink size={12} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
