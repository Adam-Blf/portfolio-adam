'use client'

import Link from 'next/link'

const technologies = [
  'Python', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git',
  'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL', 'Tailwind',
]

export default function SkillsPreview() {
  return (
    <section className="py-6 md:py-10">
      <div className="container-wide">
        <div className="glass-card p-5 md:p-8">
          {/* Header */}
          <h2 className="font-mono font-bold text-lg uppercase tracking-widest mb-1" style={{ color: 'var(--text-primary)' }}>
            TECHNOLOGIES
          </h2>
          <div className="w-16 h-0.5 mb-5" style={{ backgroundColor: 'var(--accent-violet)' }} />

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-3 py-1.5 rounded-full transition-colors"
                style={{
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href="/skills"
              className="tech-border font-mono text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all"
              style={{ color: 'var(--accent-cyan)', backgroundColor: 'var(--bg-surface)' }}
            >
              Voir toutes les competences
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
