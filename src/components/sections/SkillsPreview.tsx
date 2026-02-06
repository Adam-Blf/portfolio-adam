'use client'

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const technologies = [
  { name: 'Python', logo: 'python', color: '3776AB' },
  { name: 'TypeScript', logo: 'typescript', color: '3178C6' },
  { name: 'React', logo: 'react', color: '61DAFB', logoColor: 'black' },
  { name: 'Next.js', logo: 'nextdotjs', color: '000000' },
  { name: 'Node.js', logo: 'nodedotjs', color: '339933' },
  { name: 'PostgreSQL', logo: 'postgresql', color: '4169E1' },
  { name: 'MongoDB', logo: 'mongodb', color: '47A248' },
  { name: 'Docker', logo: 'docker', color: '2496ED' },
  { name: 'AWS', logo: 'amazonwebservices', color: '232F3E' },
  { name: 'Git', logo: 'git', color: 'F05032' },
  { name: 'Pandas', logo: 'pandas', color: '150458' },
  { name: 'Scikit-learn', logo: 'scikitlearn', color: 'F7931E' },
  { name: 'TensorFlow', logo: 'tensorflow', color: 'FF6F00' },
  { name: 'SQL', logo: 'postgresql', color: '4479A1' },
  { name: 'Tailwind', logo: 'tailwindcss', color: '06B6D4' },
]

const getBadgeUrl = (tech: typeof technologies[0]) => {
  const logoColor = tech.logoColor || 'white'
  return `https://img.shields.io/badge/${tech.name}-${tech.color}?style=for-the-badge&logo=${tech.logo}&logoColor=${logoColor}`
}

export default function SkillsPreview() {
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

            const caption = section.querySelector('.skills-caption')
            const headline = section.querySelector('.skills-headline')
            const techTags = section.querySelectorAll('.tech-tag')
            const cta = section.querySelector('.skills-cta')

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

            if (techTags.length > 0) {
              animate(techTags, {
                scale: [0.9, 1],
                opacity: [0, 1],
                duration: 400,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: stagger(30, { start: 200 }),
              })
            }

            if (cta) {
              animate(cta, {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 500,
              })
            }

            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section border-t border-[--border]">
      <div className="container-wide">

        {/* Header */}
        <div className="layout-offset mb-16">
          <p className="skills-caption text-caption" style={{ opacity: 0 }}>
            Stack technique
          </p>
          <h2 className="skills-headline text-headline" style={{ opacity: 0 }}>
            Technologies
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="flex flex-wrap gap-2 mb-12">
          {technologies.map((tech) => (
            <img
              key={tech.name}
              src={getBadgeUrl(tech)}
              alt={tech.name}
              className="tech-tag h-7 hover:scale-105 transition-transform cursor-default"
              style={{ opacity: 0 }}
              loading="lazy"
            />
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/competences"
          className="skills-cta btn btn-outline"
          style={{ opacity: 0 }}
        >
          Voir toutes les competences
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  )
}
