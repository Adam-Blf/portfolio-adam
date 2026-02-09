'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const highlights = [
  { label: 'Formation', value: 'M1 Data Engineering & IA - EFREI Paris' },
  { label: 'Alternance', value: 'Data Engineer @ GHT Psy Sud' },
  { label: 'Leadership', value: 'Ex-President BDE EFREI (5700+ etudiants)' },
  { label: 'International', value: 'Erasmus @ Universidad de Malaga' },
]

export default function AboutPreview() {
  return (
    <section className="py-12 md:py-20">
      <div className="container-wide">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8">
          A propos
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bio */}
          <div>
            <p className="text-base text-[--text-secondary] leading-relaxed mb-4">
              Passionne par la data et l&apos;innovation, je construis des systemes
              intelligents qui transforment les donnees en decisions strategiques.
            </p>
            <p className="text-base text-[--text-secondary] leading-relaxed">
              Mon parcours unique combine{' '}
              <span className="text-white font-semibold">expertise technique</span>{' '}
              (Data Engineering, IA, Fullstack) et{' '}
              <span className="text-white font-semibold">competences humaines</span>{' '}
              (leadership associatif, formation militaire).
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-0">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex gap-4 py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors px-2 -mx-2"
              >
                <span className="text-xs font-mono text-[--accent] uppercase tracking-wider w-28 shrink-0 pt-0.5">{item.label}</span>
                <span className="text-white font-medium text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/frise" className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all">
            Voir le parcours complet
            <ArrowUpRight size={14} />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[--accent] text-white font-semibold text-sm hover:bg-[--accent-dim] transition-all">
            Me contacter
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
