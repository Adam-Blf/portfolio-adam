'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'



const highlights = [
  { label: 'Formation', value: 'M1 Data Engineering & IA - EFREI Paris' },
  { label: 'Alternance', value: 'Data Engineer @ GHT Psy Sud' },
  { label: 'Leadership', value: 'Ex-President BDE EFREI (2000+ etudiants)' },
  { label: 'International', value: 'Erasmus @ Universidad de Malaga' },
]

export default function AboutPreview() {
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

            const caption = section.querySelector('.about-caption')
            const headline = section.querySelector('.about-headline')
            const bio = section.querySelector('.about-bio')
            const highlightItems = section.querySelectorAll('.highlight-item')
            const cta = section.querySelector('.about-cta')


            if (caption) {
              animate(caption, {
                translateY: [20, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
              })
            }

            if (headline) {
              animate(headline, {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 700,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 100,
              })
            }

            if (bio) {
              animate(bio, {
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 600,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 200,
              })
            }

            if (highlightItems.length > 0) {
              let delayVal = 300
              highlightItems.forEach((item) => {
                animate(item, {
                  translateX: [-20, 0],
                  opacity: [0, 1],
                  duration: 500,
                  easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                  delay: delayVal,
                })
                delayVal += 80
              })
            }

            if (cta) {
              animate(cta, {
                translateY: [10, 0],
                opacity: [0, 1],
                duration: 400,
                easing: 'cubicBezier(0.16, 1, 0.3, 1)',
                delay: 500,
              })
            }



            observer.unobserve(section)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])



  return (
    <section ref={sectionRef} className="section border-t border-[--border]">
      <div className="container-wide">

        {/* Section Header */}
        <div className="layout-offset mb-16">
          <p className="about-caption text-caption" style={{ opacity: 0 }}>
            A propos
          </p>
          <h2 className="about-headline text-headline" style={{ opacity: 0 }}>
            Un profil <span className="accent-line">hybride</span>
          </h2>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-16">

          {/* Left - Bio */}
          <div>
            <div className="about-bio" style={{ opacity: 0 }}>
              <p className="text-body-lg mb-8">
                Passionne par la data et l'innovation, je construis des systemes
                intelligents qui transforment les donnees en decisions strategiques.
              </p>
              <p className="text-body-lg mb-8">
                Mon parcours unique combine{' '}
                <span className="text-[--text-primary] font-medium">expertise technique</span>{' '}
                (Data Engineering, IA, Fullstack) et{' '}
                <span className="text-[--text-primary] font-medium">competences humaines</span>{' '}
                (leadership associatif, formation militaire).
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4 mt-12">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="highlight-item flex gap-4 py-3 border-b border-[--border]"
                  style={{ opacity: 0 }}
                >
                  <span className="text-caption w-24 shrink-0">{item.label}</span>
                  <span className="text-[--text-primary] font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="about-cta mt-8" style={{ opacity: 0 }}>
              <Link href="/frise" className="btn btn-outline">
                Voir le parcours complet
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
