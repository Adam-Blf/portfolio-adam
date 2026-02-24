'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const highlights = [
  { label: 'Formation', value: 'M1 Data Engineering & IA — EFREI Paris' },
  { label: 'Expérience', value: 'Data Engineer Alternant @ GHT Psy Sud' },
  { label: 'Leadership', value: 'Ex-Président BDE EFREI (5700+ Étudiants)' },
  { label: 'International', value: 'Erasmus @ Universidad de Malaga' },
]

export default function AboutPreview() {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="container-wide">
        <div className="max-w-3xl">
          <h2 className="text-secondary text-sm font-bold uppercase tracking-widest mb-4">
            À propos
          </h2>
          <h3 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8 text-primary">
            Curiosité technique et excellence humaine.
          </h3>

          <div className="text-xl md:text-2xl text-secondary leading-relaxed mb-12 space-y-6">
            <p>
              Passionné par la data et l&apos;innovation, je construis des systèmes
              intelligents qui transforment les données en décisions stratégiques.
            </p>
            <p>
              Mon parcours combine une <span className="text-primary font-medium">expertise technique</span> de pointe
              et des <span className="text-primary font-medium">compétences humaines</span> forgées par le leadership associatif et la rigueur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {highlights.map((item) => (
              <div key={item.label} className="border-t border-black/5 dark:border-white/10 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-secondary mb-1">
                  {item.label}
                </p>
                <p className="text-lg font-medium text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/timeline" className="btn-primary">
              Mon Parcours
            </Link>
            <Link href="/contact" className="btn-secondary group">
              Me contacter
              <ChevronRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
