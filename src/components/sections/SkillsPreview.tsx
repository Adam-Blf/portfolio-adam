'use client'

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
  return (
    <section
      className="py-16"
      style={{ borderTop: '1px solid var(--border, rgba(255,255,255,0.1))' }}
    >
      <div className="container-wide">

        {/* Netflix-style row header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/competences"
            className="group flex items-center gap-2"
          >
            <h2
              className="text-xl md:text-2xl font-bold text-white"
            >
              Technologies
            </h2>
            <ArrowUpRight
              size={20}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: 'var(--accent, #E50914)' }}
            />
          </Link>
          <p
            className="text-sm hidden sm:block"
            style={{ color: 'var(--text-muted, #808080)' }}
          >
            Stack technique
          </p>
        </div>

        {/* Horizontal scrollable badge row */}
        <div
          className="flex gap-3 overflow-x-auto pb-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--text-muted, #808080) transparent',
          }}
        >
          {technologies.map((tech) => (
            <img
              key={tech.name}
              src={getBadgeUrl(tech)}
              alt={tech.name}
              className="h-8 flex-shrink-0 hover:scale-105 transition-transform cursor-default"
              loading="lazy"
            />
          ))}
        </div>

        {/* CTA button */}
        <div className="mt-8">
          <Link
            href="/competences"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface, #1a1a1a)',
              color: 'var(--text-secondary, #B3B3B3)',
              border: '1px solid var(--border, rgba(255,255,255,0.1))',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent, #E50914)'
              e.currentTarget.style.color = 'white'
              e.currentTarget.style.borderColor = 'var(--accent, #E50914)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-surface, #1a1a1a)'
              e.currentTarget.style.color = 'var(--text-secondary, #B3B3B3)'
              e.currentTarget.style.borderColor = 'var(--border, rgba(255,255,255,0.1))'
            }}
          >
            Voir toutes les compétences
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
