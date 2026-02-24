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
      <div className="container-apple">
        <div className="max-w-4xl">
          <h2 className="text-secondary text-sm font-semibold uppercase tracking-[0.2em] mb-6 opacity-80">
            À propos
          </h2>
          <h3 className="text-apple-headline mb-12 text-primary">
            Curiosité technique et excellence humaine.
          </h3>

          <div className="text-2xl md:text-3xl text-secondary leading-tight mb-16 space-y-8 font-medium">
            <p>
              Passionné par la data et l&apos;innovation, je construis des systèmes
              intelligents qui transforment les données en décisions stratégiques.
            </p>
            <p className="opacity-90">
              Mon parcours combine une <span className="text-primary">expertise technique</span> de pointe
              et des <span className="text-primary">compétences humaines</span> forgées par le leadership associatif et la rigueur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-16">
            {highlights.map((item) => (
              <div key={item.label} className="border-t border-black/[0.06] dark:border-white/[0.06] pt-6 group">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-secondary mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </p>
                <p className="text-xl md:text-2xl font-semibold text-primary tracking-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-8 items-center">
            <Link href="/timeline" className="btn-apple-primary">
              Mon Parcours
            </Link>
            <Link href="/contact" className="btn-apple-secondary group py-0 h-fit">
              Me contacter
              <span className="ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform">›</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
