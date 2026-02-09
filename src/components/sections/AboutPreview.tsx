'use client'

import Link from 'next/link'

const highlights = [
  { label: 'Formation', value: 'M1 Data Engineering & IA - EFREI Paris' },
  { label: 'Alternance', value: 'Data Engineer @ GHT Psy Sud' },
  { label: 'Leadership', value: 'Ex-President BDE EFREI (5700+ etudiants)' },
  { label: 'International', value: 'Erasmus @ Universidad de Malaga' },
]

export default function AboutPreview() {
  return (
    <section className="py-6 md:py-10">
      <div className="container-wide">
        <div className="glass-card p-5 md:p-8">
          {/* Header */}
          <h2 className="font-mono font-bold text-lg uppercase tracking-widest mb-1" style={{ color: 'var(--text-primary)' }}>
            A PROPOS
          </h2>
          <div className="w-16 h-0.5 mb-5" style={{ backgroundColor: 'var(--accent-cyan)' }} />

          {/* Bio text */}
          <div className="font-mono text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            <p className="mb-3">
              Passionne par la data et l&apos;innovation, je construis des systemes
              intelligents qui transforment les donnees en decisions strategiques.
            </p>
            <p>
              Mon parcours unique combine{' '}
              <strong style={{ color: 'var(--text-primary)' }}>expertise technique</strong>{' '}
              (Data Engineering, IA, Fullstack) et{' '}
              <strong style={{ color: 'var(--text-primary)' }}>competences humaines</strong>{' '}
              (leadership associatif, formation militaire).
            </p>
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-6">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-2.5 font-mono text-xs"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent-cyan)' }} />
                <span>
                  <strong className="uppercase" style={{ color: 'var(--text-primary)' }}>{item.label}:</strong> {item.value}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <Link
              href="/timeline"
              className="tech-border font-mono text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all"
              style={{ color: 'var(--accent-cyan)', backgroundColor: 'var(--bg-surface)' }}
            >
              Voir l&apos;evolution
            </Link>
            <Link
              href="/contact"
              className="tech-border font-mono text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all"
              style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-surface)' }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
