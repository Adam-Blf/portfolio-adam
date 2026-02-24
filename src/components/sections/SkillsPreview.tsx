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
    <section className="py-24 bg-surface dark:bg-black/40 overflow-hidden border-t border-black/5 dark:border-white/5">
      <div className="container-apple">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-6 opacity-80 text-center">
            Expertise
          </h2>
          <h3 className="text-apple-headline text-primary">
            Maîtrise technologique au service de l&apos;impact.
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-5 mb-20 max-w-5xl mx-auto">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-8 py-3.5 rounded-full bg-white dark:bg-white/5 border border-black/[0.08] dark:border-white/[0.08] text-xl font-medium text-primary shadow-sm hover:shadow-md transition-all active:scale-95 cursor-default select-none"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="text-center">
          <Link href="/skills" className="btn-apple-secondary group py-0 h-fit">
            Voir toutes les compétences
            <span className="ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform">›</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
