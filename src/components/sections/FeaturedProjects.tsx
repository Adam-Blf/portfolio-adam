'use client'

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  // Get featured projects
  const featuredNames = projects.featured
  const allProjects = Object.values(projects.categories).flat()
  const featuredProjects = featuredNames.map(name =>
    allProjects.find(p => p.name === name)
  ).filter(Boolean).slice(0, 4)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            const caption = section.querySelector('.projects-caption')
            const headline = section.querySelector('.projects-headline')
            const cta = section.querySelector('.projects-cta')
            const cards = section.querySelectorAll('.project-card')

            if (caption) {
              animate(caption, {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
              })
            }

            if (headline) {
              animate(headline, {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 700,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 100,
              })
            }

            if (cta) {
              animate(cta, {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 200,
              })
            }

            if (cards.length > 0) {
              animate(cards, {
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: stagger(100, { start: 300 }),
              })
            }

            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section border-t border-[--border]">
      <div className="container-wide">

        {/* Header */}
        <div className="flex flex-wrap justify-between items-end mb-16 gap-8">
          <div>
            <p className="projects-caption text-caption mb-4" style={{ opacity: 0 }}>
              Travaux selectionnes
            </p>
            <h2 className="projects-headline text-headline" style={{ opacity: 0 }}>
              Projets
            </h2>
          </div>
          <Link
            href="/projets"
            className="projects-cta btn btn-outline"
            style={{ opacity: 0 }}
          >
            Voir tous les projets
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[--border]">
          {featuredProjects.map((project, i) => (
            <a
              key={project?.name}
              href={`https://github.com/Adam-Blf/${project?.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group bg-[--bg-surface] p-8 hover:bg-[--bg-elevated] transition-colors"
              style={{ opacity: 0 }}
            >
              {/* Project Number */}
              <div className="flex justify-between items-start mb-8">
                <span className="text-caption font-mono text-accent">0{i + 1}</span>
                <ArrowUpRight
                  size={20}
                  className="text-[--text-muted] group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </div>

              {/* Project Info */}
              <h3 className="text-title mb-3 group-hover:text-accent transition-colors">
                {project?.name}
              </h3>
              <p className="text-[--text-secondary] mb-6 line-clamp-2">
                {project?.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project?.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
