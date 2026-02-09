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
          <div className="glass-card p-5 md:p-8 text-center">
            <p className="font-mono text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Un projet en tete ? Discutons-en.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="font-mono text-sm font-bold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  color: 'var(--text-inverse)',
                }}
              >
                <Mail size={14} /> Me contacter
              </Link>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-border font-mono text-sm font-bold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all"
                style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-surface)' }}
              >
                LinkedIn
              </a>
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
          <div className="glass-card p-6 md:p-10 text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent-cyan)' }}>
              COLLABORATION
            </p>
            <h2 className="font-mono font-bold text-xl md:text-2xl uppercase mb-3" style={{ color: 'var(--text-primary)' }}>
              Envie de collaborer ?
            </h2>
            <p className="font-mono text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Je suis toujours ouvert aux opportunites : stages, alternances, projets open-source, ou echanges techniques.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="font-mono text-sm font-bold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                  color: 'var(--text-inverse)',
                }}
              >
                <Mail size={14} /> Me contacter
              </Link>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-border font-mono text-sm font-bold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all"
                style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-surface)' }}
              >
                <Github size={14} /> Voir mon GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className="py-6 md:py-10">
      <div className="container-wide">
        <div
          className="glass-card p-6 md:p-10 text-center"
          style={{
            borderImage: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet)) 1',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '16px',
          }}
        >
          <p
            className="font-mono text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: 'var(--accent-cyan)' }}
          >
            CONTACT
          </p>
          <h2
            className="font-mono font-bold text-xl md:text-2xl uppercase mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Collaborons ensemble
          </h2>
          <p
            className="font-mono text-sm mb-6 max-w-lg mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Data Engineering, Machine Learning, developpement Fullstack : je suis disponible pour des projets ambitieux et des collaborations techniques.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link
              href="/contact"
              className="font-mono text-sm font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                color: 'var(--text-inverse)',
              }}
            >
              <Mail size={16} />
              Discutons de votre projet
            </Link>
            <Link
              href="/projects"
              className="tech-border font-mono text-sm font-bold px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all"
              style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-surface)' }}
            >
              Voir mes realisations
            </Link>
          </div>

          {/* Social links */}
          <div
            className="flex flex-wrap justify-center gap-6 pt-4 font-mono text-xs"
            style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Github size={12} /> GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-1.5 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Mail size={12} /> {personalInfo.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
