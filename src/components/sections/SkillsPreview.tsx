'use client'

import Link from 'next/link'

const technologies = [
  { name: 'Python', logo: 'python', color: '3776AB', typeClass: 'type-water' },
  { name: 'TypeScript', logo: 'typescript', color: '3178C6', typeClass: 'type-psychic' },
  { name: 'React', logo: 'react', color: '61DAFB', logoColor: 'black', typeClass: 'type-ice' },
  { name: 'Next.js', logo: 'nextdotjs', color: '000000', typeClass: 'type-dark' },
  { name: 'Node.js', logo: 'nodedotjs', color: '339933', typeClass: 'type-grass' },
  { name: 'PostgreSQL', logo: 'postgresql', color: '4169E1', typeClass: 'type-water' },
  { name: 'MongoDB', logo: 'mongodb', color: '47A248', typeClass: 'type-grass' },
  { name: 'Docker', logo: 'docker', color: '2496ED', typeClass: 'type-water' },
  { name: 'AWS', logo: 'amazonwebservices', color: '232F3E', typeClass: 'type-dark' },
  { name: 'Git', logo: 'git', color: 'F05032', typeClass: 'type-fire' },
  { name: 'Pandas', logo: 'pandas', color: '150458', typeClass: 'type-ghost' },
  { name: 'Scikit-learn', logo: 'scikitlearn', color: 'F7931E', typeClass: 'type-fire' },
  { name: 'TensorFlow', logo: 'tensorflow', color: 'FF6F00', typeClass: 'type-fire' },
  { name: 'SQL', logo: 'postgresql', color: '4479A1', typeClass: 'type-water' },
  { name: 'Tailwind', logo: 'tailwindcss', color: '06B6D4', typeClass: 'type-ice' },
]

const getBadgeUrl = (tech: typeof technologies[0]) => {
  const logoColor = (tech as any).logoColor || 'white'
  return `https://img.shields.io/badge/${tech.name}-${tech.color}?style=for-the-badge&logo=${tech.logo}&logoColor=${logoColor}`
}

export default function SkillsPreview() {
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
              ── TYPES ──
            </h2>

            {/* Type badges grid */}
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.map((tech) => (
                <span key={tech.name} className={`type-badge ${tech.typeClass}`}>
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Shields.io badges row */}
            <div
              className="flex gap-2 overflow-x-auto pb-3 mb-4"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--pokedex-screen-dark) transparent' }}
            >
              {technologies.map((tech) => (
                <img
                  key={tech.name}
                  src={getBadgeUrl(tech)}
                  alt={tech.name}
                  className="h-7 flex-shrink-0"
                  loading="lazy"
                />
              ))}
            </div>

            {/* CTA */}
            <div className="pt-3" style={{ borderTop: '2px solid var(--pokedex-screen-dark)' }}>
              <Link href="/types" className="pokedex-button text-xs gap-1">
                ▶ Voir tous les types
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
