'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, Github } from 'lucide-react'
import { personalInfo } from '@/lib/data'

interface CallToActionProps {
  variant?: 'default' | 'compact' | 'projects'
}

export default function CallToAction({ variant = 'default' }: CallToActionProps) {

  if (variant === 'compact') {
    return (
      <section className="py-16" style={{ backgroundColor: 'var(--bg-deep, #141414)' }}>
        <div className="container-wide text-center">
          <p className="text-lg mb-6" style={{ color: 'var(--text-secondary, #B3B3B3)' }}>
            Un projet en tête ? Discutons-en.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-white text-sm uppercase tracking-wide transition-all hover:brightness-110 group"
              style={{ backgroundColor: 'var(--accent, #E50914)' }}
            >
              Me contacter
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm uppercase tracking-wide transition-all hover:bg-white/10"
              style={{ color: 'var(--text-primary, #fff)', border: '1px solid var(--text-muted, #808080)' }}
            >
              LinkedIn
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'projects') {
    return (
      <section className="py-20 mt-12" style={{ backgroundColor: 'var(--bg-deep, #141414)' }}>
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent, #E50914)' }}>
              Collaboration
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary, #fff)' }}>
              Envie de collaborer ?
            </h2>
            <p className="text-lg mb-10" style={{ color: 'var(--text-secondary, #B3B3B3)' }}>
              Je suis toujours ouvert aux opportunités intéressantes - stages, alternances, projets open-source, ou échanges techniques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-white text-sm uppercase tracking-wide transition-all hover:brightness-110 group"
                style={{ backgroundColor: 'var(--accent, #E50914)' }}
              >
                <Mail size={16} />
                Me contacter
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm uppercase tracking-wide transition-all hover:bg-white/10"
                style={{ color: 'var(--text-primary, #fff)', border: '1px solid var(--text-muted, #808080)' }}
              >
                <Github size={16} />
                Voir mon GitHub
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default variant - full CTA for homepage
  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-deep, #141414)' }}>
      {/* Cinematic gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center top, rgba(229,9,20,0.08) 0%, transparent 60%)' }} />

      <div className="container-wide relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--accent, #E50914)' }}>
            Prêt à collaborer ?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-primary, #fff)' }}>
            Transformons vos données en impact
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary, #B3B3B3)' }}>
            Data Engineering, Machine Learning, développement Fullstack - je suis disponible pour des projets ambitieux et des collaborations techniques.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded font-bold text-white text-sm uppercase tracking-wide transition-all hover:brightness-110 group"
              style={{ backgroundColor: 'var(--accent, #E50914)' }}
            >
              <Mail size={16} />
              Discutons de votre projet
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded font-semibold text-sm uppercase tracking-wide transition-all hover:bg-white/10"
              style={{ color: 'var(--text-primary, #fff)', border: '1px solid var(--text-muted, #808080)' }}
            >
              Voir mes réalisations
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Social links */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm" style={{ color: 'var(--text-muted, #808080)' }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail size={14} />
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
