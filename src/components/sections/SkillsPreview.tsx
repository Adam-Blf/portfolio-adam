'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const technologies = [
  'Python', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git',
  'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL', 'Tailwind',
]

export default function SkillsPreview() {
  return (
    <section className="py-24 bg-[#f5f5f7] dark:bg-[#161617]">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-secondary text-sm font-bold uppercase tracking-widest mb-4">
            Expertise
          </h2>
          <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-primary">
            Maîtrise technologique au service de l&apos;impact.
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-6 py-3 rounded-full bg-white dark:bg-black/40 border border-black/5 dark:border-white/10 text-lg font-medium text-primary shadow-sm transition-transform hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="text-center">
          <Link href="/skills" className="btn-secondary group">
            Voir toutes les compétences
            <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
