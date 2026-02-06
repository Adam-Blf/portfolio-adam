'use client'

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const expertise = [
  {
    title: 'Data Engineering',
    desc: 'Pipelines ETL/ELT, architecture data, Oracle, PostgreSQL, Python',
  },
  {
    title: 'Machine Learning',
    desc: 'NLP, Deep Learning, LLMs, Computer Vision, Scikit-learn',
  },
  {
    title: 'Fullstack Dev',
    desc: 'React, Next.js, Node.js, TypeScript, APIs REST',
  },
  {
    title: 'Cloud & DevOps',
    desc: 'AWS, Azure, Docker, CI/CD, Git',
  },
]

const highlights = [
  { label: 'Formation', value: 'M1 Data Engineering & IA - EFREI Paris' },
  { label: 'Alternance', value: 'Data Engineer @ GHT Psy Sud' },
  { label: 'Leadership', value: 'Ex-President BDE EFREI (2000+ etudiants)' },
  { label: 'International', value: 'Erasmus @ Universidad de Malaga' },
]

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            const caption = section.querySelector('.about-caption')
            const headline = section.querySelector('.about-headline')
            const bio = section.querySelector('.about-bio')
            const highlightItems = section.querySelectorAll('.highlight-item')
            const cta = section.querySelector('.about-cta')
            const expertiseCaption = section.querySelector('.expertise-caption')
            const expertiseItems = section.querySelectorAll('.expertise-item')

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

            if (bio) {
              animate(bio, {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 200,
              })
            }

            if (highlightItems.length > 0) {
              animate(highlightItems, {
                translateX: [-20, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: stagger(80, { start: 300 }),
              })
            }

            if (cta) {
              animate(cta, {
                translateY: [10, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 500,
              })
            }

            if (expertiseCaption) {
              animate(expertiseCaption, {
                opacity: [0, 1],
                duration: 400,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 200,
              })
            }

            if (expertiseItems.length > 0) {
              animate(expertiseItems, {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: stagger(100, { start: 300 }),
              })
            }

            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  // Hover animation using WAAPI
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(8px)' }
      ],
      { duration: 200, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    )
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.animate(
      [
        { transform: 'translateX(8px)' },
        { transform: 'translateX(0)' }
      ],
      { duration: 200, fill: 'forwards', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    )
  }

  return (
    <section ref={sectionRef} className="section border-t border-[--border]">
      <div className="container-wide">

        {/* Section Header */}
        <div className="layout-offset mb-16">
          <p className="about-caption text-caption" style={{ opacity: 0 }}>
            A propos
          </p>
          <h2 className="about-headline text-headline" style={{ opacity: 0 }}>
            Un profil <span className="accent-line">hybride</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left - Bio */}
          <div>
            <div className="about-bio" style={{ opacity: 0 }}>
              <p className="text-body-lg mb-8">
                Passionne par la data et l'innovation, je construis des systemes
                intelligents qui transforment les donnees en decisions strategiques.
              </p>
              <p className="text-body-lg mb-8">
                Mon parcours unique combine{' '}
                <span className="text-[--text-primary] font-medium">expertise technique</span>{' '}
                (Data Engineering, IA, Fullstack) et{' '}
                <span className="text-[--text-primary] font-medium">competences humaines</span>{' '}
                (leadership associatif, formation militaire).
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4 mt-12">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="highlight-item flex gap-4 py-3 border-b border-[--border]"
                  style={{ opacity: 0 }}
                >
                  <span className="text-caption w-24 shrink-0">{item.label}</span>
                  <span className="text-[--text-primary] font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="about-cta mt-8" style={{ opacity: 0 }}>
              <Link href="/frise" className="btn btn-outline">
                Voir le parcours complet
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right - Expertise */}
          <div>
            <p className="expertise-caption text-caption mb-8" style={{ opacity: 0 }}>
              Domaines d'expertise
            </p>

            <div className="space-y-0">
              {expertise.map((item, i) => (
                <div
                  key={item.title}
                  className="expertise-item group py-6 border-b border-[--border] cursor-default"
                  style={{ opacity: 0 }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-caption font-mono">0{i + 1}</span>
                  </div>
                  <p className="text-[--text-secondary] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
