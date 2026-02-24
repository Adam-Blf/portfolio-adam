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
    <section className="py-20 bg-[#f5f5f7] dark:bg-[#161617]">
      <div className="container-wide">
        {/* Header - Apple style clean header */}
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Projets à la une.
          </h2>
          <Link
            href="/projects"
            className="text-cta hover:underline font-medium flex items-center gap-1 group"
          >
            Tout explorer
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={rowRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {featuredProjects.map((project, idx) => {
              const homepage = project?.name ? projects.homepages[project.name] : null
              const githubUrl = `https://github.com/Adam-Blf/${project?.name}`

              return (
                <div
                  key={project?.name}
                  className="card shrink-0 w-[300px] md:w-[400px] snap-start flex flex-col p-0"
                >
                  {/* Decorative Project Header or Image Placeholder */}
                  <div className="h-48 md:h-64 bg-white dark:bg-black/20 flex items-center justify-center border-b border-black/5 dark:border-white/5 relative group-hover:bg-gray-50 dark:group-hover:bg-white/5 transition-colors">
                    <span className="text-4xl opacity-10 font-bold">{idx + 1}</span>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-semibold leading-tight text-primary">
                        {project?.name}
                      </h3>
                      {homepage && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-500/50 text-green-600 dark:text-green-400">
                          LIVE
                        </span>
                      )}
                    </div>

                    <p className="text-secondary text-base leading-relaxed mb-6 line-clamp-3">
                      {project?.desc}
                    </p>

                    <div className="mt-auto flex items-center gap-6">
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cta hover:underline font-medium inline-flex items-center gap-1.5"
                      >
                        <Github size={18} />
                        GitHub
                      </a>
                      {homepage && (
                        <a
                          href={homepage}
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
                </div>
              )
            })}
          </div>

          {/* Minimal Float Controls */}
          <div className="absolute -bottom-16 right-0 flex gap-2">
            <button
              onClick={() => scrollRow('left')}
              className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollRow('right')}
              className="p-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
