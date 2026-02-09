'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Github, ExternalLink, ChevronRight } from 'lucide-react'
import { projects } from '@/lib/data'

const typeColorMap: Record<string, string> = {
  'Python': 'type-water',
  'TypeScript': 'type-psychic',
  'JavaScript': 'type-electric',
  'CSS/JS': 'type-fairy',
  'HTML/JS': 'type-fire',
  'C#': 'type-steel',
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
        <div className="pokedex-shell p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2
              className="font-mono font-bold text-sm uppercase tracking-widest"
              style={{ color: 'var(--pokedex-white)' }}
            >
              ── DERNIERS PROJETS ──
            </h2>
            <Link
              href="/projects"
              className="pokedex-button text-xs gap-1"
            >
              Tout voir <ChevronRight size={12} />
            </Link>
          </div>

          {/* Horizontal scroll row */}
          <div className="relative group/row">
            {/* Scroll buttons */}
            <button
              onClick={() => scrollRow('left')}
              className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to right, var(--pokedex-red), transparent)' }}
              aria-label="Scroll left"
            >
              <ChevronRight size={24} className="rotate-180" style={{ color: 'var(--pokedex-white)' }} />
            </button>
            <button
              onClick={() => scrollRow('right')}
              className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to left, var(--pokedex-red), transparent)' }}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} style={{ color: 'var(--pokedex-white)' }} />
            </button>

            <div ref={rowRef} className="pokedex-row">
              {featuredProjects.map((project, i) => {
                const homepage = project?.name ? projects.homepages[project.name] : null
                const githubUrl = `https://github.com/Adam-Blf/${project?.name}`
                const typeClass = typeColorMap[project?.lang || ''] || 'type-normal'
                const entryNum = String(i + 1).padStart(3, '0')

                return (
                  <div
                    key={project?.name}
                    className="pokedex-row-item pokedex-card group"
                  >
                    <div className="p-4">
                      {/* Entry number & status */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="pokedex-entry-number">{entryNum}</span>
                        {homepage && (
                          <span className="pokedex-led pokedex-led-green w-2.5 h-2.5" title="LIVE" />
                        )}
                      </div>

                      {/* Project name */}
                      <h3
                        className="font-mono font-bold text-base uppercase mb-1"
                        style={{ color: 'var(--pokedex-dark)' }}
                      >
                        {project?.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                        {project?.desc}
                      </p>

                      {/* Type badge */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className={`type-badge ${typeClass}`} style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem' }}>
                          {project?.lang}
                        </span>
                      </div>

                      {/* Ability tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project?.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'var(--pokedex-white)',
                              color: 'var(--text-secondary)',
                              border: '1px solid var(--pokedex-gray)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid var(--pokedex-gray)' }}>
                        {homepage && (
                          <a
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pokedex-button text-[10px] py-1 px-2 gap-1"
                          >
                            <ExternalLink size={10} /> Demo
                          </a>
                        )}
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pokedex-button text-[10px] py-1 px-2 gap-1"
                        >
                          <Github size={10} /> Code
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
