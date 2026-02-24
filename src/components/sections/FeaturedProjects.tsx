'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Github, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react'
import { projects } from '@/lib/data'

export default function FeaturedProjects() {
  const rowRef = useRef<HTMLDivElement>(null)

  const featuredNames = projects.featured
  const allProjects = Object.values(projects.categories).flat()
  const featuredProjects = featuredNames.map(name =>
    allProjects.find(p => p.name === name)
  ).filter(Boolean).slice(0, 6)

  const scrollRow = (direction: 'left' | 'right') => {
    if (!rowRef.current) return
    const scrollAmount = 400
    rowRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden relative border-t border-black/5 dark:border-white/5">
      <div className="container-apple">
        {/* Header - Apple style clean header */}
        <div className="flex items-baseline justify-between mb-16">
          <h2 className="text-apple-headline">
            Projets à la une
          </h2>
          <Link
            href="/projects"
            className="text-cta hover:underline font-medium text-sm flex items-center gap-1 group"
          >
            Tout explorer
            <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">›</span>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          <div
            ref={rowRef}
            className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {featuredProjects.map((project, idx) => {
              const homepage = project?.name ? projects.homepages[project.name] : null
              const githubUrl = `https://github.com/Adam-Blf/${project?.name}`

              return (
                <div
                  key={project?.name}
                  className="card-apple shrink-0 w-[320px] md:w-[440px] snap-start flex flex-col p-0 border-none bg-surface/50 dark:bg-surface/30"
                >
                  {/* Decorative Project Header */}
                  <div className="h-56 md:h-72 bg-gradient-to-br from-[#f2f2f2] to-[#e8e8e8] dark:from-[#1a1a1c] dark:to-[#111112] flex items-center justify-center relative">
                    <span className="text-6xl md:text-8xl opacity-[0.03] font-bold select-none">{idx + 1}</span>
                    <div className="absolute inset-x-8 bottom-8">
                      <div className="px-3 py-1 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md w-fit text-[10px] font-bold text-cta border border-black/5 dark:border-white/5 uppercase tracking-wider">
                        {project?.lang}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-10 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-primary">
                        {project?.name}
                      </h3>
                      {homepage && (
                        <div className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" title="En ligne" />
                      )}
                    </div>

                    <p className="text-secondary text-base md:text-lg leading-relaxed mb-10 line-clamp-3 font-normal opacity-90">
                      {project?.desc}
                    </p>

                    <div className="mt-auto flex items-center gap-8">
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cta hover:underline font-medium text-sm inline-flex items-center gap-1.5"
                      >
                        GitHub
                      </a>
                      {homepage && (
                        <a
                          href={homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cta hover:underline font-medium text-sm inline-flex items-center gap-1.5"
                        >
                          Démo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Minimal Float Controls - Only visible on hover/scrolling */}
          <div className="flex justify-center md:justify-end gap-3 mt-4">
            <button
              onClick={() => scrollRow('left')}
              className="p-3 rounded-full bg-surface dark:bg-surface/50 border border-black/5 dark:border-white/5 text-secondary hover:text-primary transition-all active:scale-95"
              aria-label="Précédent"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollRow('right')}
              className="p-3 rounded-full bg-surface dark:bg-surface/50 border border-black/5 dark:border-white/5 text-secondary hover:text-primary transition-all active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
