'use client'

import Link from 'next/link'
import { Mail, Github } from 'lucide-react'
import { personalInfo } from '@/lib/data'

interface CallToActionProps {
  variant?: 'default' | 'compact' | 'projects'
}

export default function CallToAction({ variant = 'default' }: CallToActionProps) {

  if (variant === 'compact') {
    return (
      <section className="py-6 md:py-10">
        <div className="container-wide">
          <div className="pokedex-shell p-4 md:p-6">
            <div className="pokedex-screen p-4 md:p-6 text-center">
              <p className="font-mono text-sm mb-4" style={{ color: 'var(--pokedex-dark)' }}>
                Un projet en tête ? Discutons-en.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="pokedex-button gap-2" style={{ backgroundColor: 'var(--pokedex-red)', color: 'white', borderColor: 'var(--pokedex-red-dark)' }}>
                  ✉ Me contacter
                </Link>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="pokedex-button gap-2">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'projects') {
    return (
      <section className="py-6 md:py-10">
        <div className="container-wide">
          <div className="pokedex-shell p-4 md:p-6">
            <div className="pokedex-screen p-5 md:p-8 text-center">
              <p className="font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--pokedex-red)' }}>
                COLLABORATION
              </p>
              <h2 className="font-mono font-bold text-xl md:text-2xl uppercase mb-3" style={{ color: 'var(--pokedex-dark)' }}>
                Envie de collaborer ?
              </h2>
              <p className="font-mono text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Je suis toujours ouvert aux opportunités - stages, alternances, projets open-source, ou échanges techniques.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="pokedex-button gap-2" style={{ backgroundColor: 'var(--pokedex-red)', color: 'white', borderColor: 'var(--pokedex-red-dark)' }}>
                  <Mail size={14} /> Me contacter
                </Link>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="pokedex-button gap-2">
                  <Github size={14} /> Voir mon GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default variant — Contact CTA
  return (
    <section className="py-6 md:py-10">
      <div className="container-wide">
        <div className="pokedex-shell p-4 md:p-6">
          {/* Top LEDs */}
          <div className="flex items-center gap-2 mb-4">
            <div className="pokedex-led pokedex-led-red w-3 h-3" />
            <div className="pokedex-led pokedex-led-yellow w-3 h-3" />
            <div className="pokedex-led pokedex-led-green w-3 h-3" />
          </div>

          <div className="pokedex-screen p-5 md:p-8 text-center">
            <p
              className="font-mono text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: 'var(--pokedex-red)' }}
            >
              CONTACT
            </p>
            <h2
              className="font-mono font-bold text-xl md:text-2xl uppercase mb-3"
              style={{ color: 'var(--pokedex-dark)' }}
            >
              Besoin de soins pour votre projet ?
            </h2>
            <p
              className="font-mono text-sm mb-6 max-w-lg mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Data Engineering, Machine Learning, développement Fullstack — je suis disponible pour des projets ambitieux et des collaborations techniques.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Link
                href="/contact"
                className="pokedex-button gap-2"
                style={{
                  backgroundColor: 'var(--pokedex-red)',
                  color: 'white',
                  borderColor: 'var(--pokedex-red-dark)',
                  fontSize: '0.85rem',
                  padding: '0.6rem 1.5rem',
                }}
              >
                <Mail size={16} />
                Discutons de votre projet
              </Link>
              <Link href="/projects" className="pokedex-button gap-2">
                Voir mes réalisations
              </Link>
            </div>

            {/* Social links */}
            <div
              className="flex flex-wrap justify-center gap-6 pt-4 font-mono text-xs"
              style={{ borderTop: '2px solid var(--pokedex-screen-dark)', color: 'var(--text-muted)' }}
            >
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline" style={{ color: 'var(--pokedex-dark)' }}>
                <Github size={12} /> GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline" style={{ color: 'var(--pokedex-dark)' }}>
                LinkedIn
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline" style={{ color: 'var(--pokedex-dark)' }}>
                <Mail size={12} /> {personalInfo.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
