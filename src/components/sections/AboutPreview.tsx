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
        <div className="pokedex-shell p-4 md:p-6">
          <div className="pokedex-screen p-4 md:p-6">
            {/* Header */}
            <h2
              className="font-mono font-bold text-sm uppercase tracking-widest mb-4"
              style={{ color: 'var(--pokedex-dark)' }}
            >
              ── DESCRIPTION ──
            </h2>

            {/* Bio text */}
            <div
              className="font-mono text-sm leading-relaxed mb-5 p-3 rounded-lg"
              style={{
                color: 'var(--pokedex-dark)',
                backgroundColor: 'var(--pokedex-screen-dark)',
                border: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <p className="mb-2">
                Passionne par la data et l&apos;innovation, je construis des systemes
                intelligents qui transforment les donnees en decisions strategiques.
              </p>
              <p>
                Mon parcours unique combine{' '}
                <strong>expertise technique</strong>{' '}
                (Data Engineering, IA, Fullstack) et{' '}
                <strong>competences humaines</strong>{' '}
                (leadership associatif, formation militaire).
              </p>
            </div>

            {/* Abilities */}
            <h3
              className="font-mono font-bold text-xs uppercase tracking-widest mb-2"
              style={{ color: 'var(--pokedex-dark)' }}
            >
              ABILITIES:
            </h3>
            <ul className="space-y-1.5 mb-5">
              {highlights.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-2 font-mono text-xs"
                  style={{ color: 'var(--pokedex-dark)' }}
                >
                  <span style={{ color: 'var(--pokedex-red)' }}>▸</span>
                  <span>
                    <strong className="uppercase">{item.label}:</strong> {item.value}
                  </span>
                </li>
              ))}
            </ul>

            {/* Navigation buttons */}
            <div className="flex flex-wrap gap-3 pt-3" style={{ borderTop: '2px solid var(--pokedex-screen-dark)' }}>
              <Link href="/evolution" className="pokedex-button text-xs">
                ▶ Voir l&apos;evolution
              </Link>
              <Link href="/centre-pokemon" className="pokedex-button text-xs">
                ✉ Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
