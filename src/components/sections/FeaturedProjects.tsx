'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Github, ExternalLink, Download, ChevronRight } from 'lucide-react'
import { projects } from '@/lib/data'

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
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
    <section ref={sectionRef} className="py-12 md:py-16">
      <div className="container-wide">
        {/* Header - Netflix row title */}
        <div className="flex items-center justify-between mb-4">
          <Link href="/projets" className="group flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Projets
            </h2>
            <ChevronRight size={20} className="text-[--accent] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            <span className="text-sm text-[--accent] opacity-0 group-hover:opacity-100 transition-all">
              Tout voir
            </span>
          </Link>
        </div>

        {/* Netflix-style horizontal scroll row */}
        <div className="relative group/row">
          {/* Scroll buttons */}
          <button
            onClick={() => scrollRow('left')}
            className="absolute left-0 top-0 bottom-4 z-10 w-12 bg-gradient-to-r from-[#141414] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
            aria-label="Scroll left"
          >
            <ChevronRight size={28} className="text-white rotate-180" />
          </button>
          <button
            onClick={() => scrollRow('right')}
            className="absolute right-0 top-0 bottom-4 z-10 w-12 bg-gradient-to-l from-[#141414] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center"
            aria-label="Scroll right"
          >
            <ChevronRight size={28} className="text-white" />
          </button>

          <div ref={rowRef} className="netflix-row">
            {featuredProjects.map((project, i) => {
              const homepage = project?.name ? projects.homepages[project.name] : null
              const githubUrl = `https://github.com/Adam-Blf/${project?.name}`

              return (
                <div
                  key={project?.name}
                  className="netflix-row-item netflix-card group relative"
                >
                  {/* Card top accent */}
                  <div className="h-1 bg-[--accent] w-0 group-hover:w-full transition-all duration-300" />

                  <div className="p-5">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-mono text-[--accent] font-bold">0{i + 1}</span>
                      {homepage && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[--success]/20 text-[--success] rounded-sm">
                          LIVE
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-[--accent] transition-colors">
                      {project?.name}
                    </h3>
                    <p className="text-sm text-[--text-secondary] mb-4 line-clamp-2">
                      {project?.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project?.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-[--text-muted] rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                      {homepage && (
                        <a href={homepage} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[--accent] hover:text-white transition-colors">
                          <ExternalLink size={11} /> Demo
                        </a>
                      )}
                      <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[--text-muted] hover:text-white transition-colors">
                        <Github size={11} /> Code
                      </a>
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
