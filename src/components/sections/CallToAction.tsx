'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import Link from 'next/link'
import { ArrowUpRight, Mail, Github } from 'lucide-react'
import { personalInfo } from '@/lib/data'

interface CallToActionProps {
  variant?: 'default' | 'compact' | 'projects'
}

export default function CallToAction({ variant = 'default' }: CallToActionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            const elements = section.querySelectorAll('.cta-animate')
            let delay = 0
            elements.forEach((el) => {
              animate(el, {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay,
              })
              delay += 100
            })

            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  if (variant === 'compact') {
    return (
      <section ref={sectionRef} className="py-16 border-t border-[--border]">
        <div className="container-wide text-center">
          <p className="cta-animate text-body-lg text-[--text-secondary] mb-6" style={{ opacity: 0 }}>
            Un projet en tête ? Discutons-en.
          </p>
          <div className="cta-animate flex flex-wrap justify-center gap-4" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn btn-primary group">
              Me contacter
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
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
      <section ref={sectionRef} className="py-20 mt-12 border-t border-[--border]">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <p className="cta-animate text-caption mb-4" style={{ opacity: 0 }}>
              Collaboration
            </p>
            <h2 className="cta-animate text-headline mb-6" style={{ opacity: 0 }}>
              Envie de <span className="accent-line">collaborer</span> ?
            </h2>
            <p className="cta-animate text-body-lg text-[--text-secondary] mb-10" style={{ opacity: 0 }}>
              Je suis toujours ouvert aux opportunités intéressantes — stages, alternances, projets open-source, ou échanges techniques.
            </p>
            <div className="cta-animate flex flex-wrap justify-center gap-4" style={{ opacity: 0 }}>
              <Link href="/contact" className="btn btn-primary group">
                <Mail size={16} />
                Me contacter
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
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
    <section ref={sectionRef} className="section border-t border-[--border] relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />

      <div className="container-wide relative">
        <div className="max-w-3xl mx-auto text-center">
          <p className="cta-animate text-caption mb-4" style={{ opacity: 0 }}>
            Prêt à collaborer ?
          </p>
          <h2 className="cta-animate text-display mb-6" style={{ opacity: 0 }}>
            Transformons vos <span className="accent-line">données</span> en impact
          </h2>
          <p className="cta-animate text-body-lg text-[--text-secondary] mb-10 max-w-xl mx-auto" style={{ opacity: 0 }}>
            Data Engineering, Machine Learning, développement Fullstack — je suis disponible pour des projets ambitieux et des collaborations techniques.
          </p>
          <div className="cta-animate flex flex-wrap justify-center gap-4" style={{ opacity: 0 }}>
            <Link href="/contact" className="btn btn-primary group">
              <Mail size={16} />
              Discutons de votre projet
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href="/projets" className="btn btn-outline">
              Voir mes réalisations
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Social proof */}
          <div className="cta-animate mt-12 flex flex-wrap justify-center gap-8 text-sm text-[--text-muted]" style={{ opacity: 0 }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
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
