'use client'

import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

const stats = [
  { value: 37, label: 'Projets GitHub', suffix: '+' },
  { value: 8, label: 'Certifications', suffix: '' },
  { value: 3, label: 'Années d\'expérience', suffix: '+' },
  { value: 6, label: 'Rôles associatifs', suffix: '' },
]

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const valueEl = valueRef.current
    if (!container || !valueEl) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Fade in container using WAAPI
            container.animate(
              [
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
              ],
              {
                duration: 600,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
              }
            )

            // Counter animation using anime.js
            const counter = { val: 0 }
            animate(counter, {
              val: value,
              duration: 2000,
              easing: 'outExpo',
              onUpdate: () => {
                valueEl.textContent = Math.round(counter.val).toString()
              },
            })

            observer.unobserve(container)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={containerRef} className="text-center" style={{ opacity: 0 }}>
      <p className="counter">
        <span ref={valueRef}>0</span>
        <span className="text-[--text-muted]">{suffix}</span>
      </p>
      <p className="text-caption mt-2">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-20 border-t border-b border-[--border]">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
