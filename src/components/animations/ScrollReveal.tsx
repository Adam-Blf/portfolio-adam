'use client'

import { useRef, useEffect, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur'
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

const animations = {
  'fade-up': {
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  'fade-down': {
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
  'fade-left': {
    from: { opacity: 0, transform: 'translateX(30px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  },
  'fade-right': {
    from: { opacity: 0, transform: 'translateX(-30px)' },
    to: { opacity: 1, transform: 'translateX(0)' }
  },
  'scale': {
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' }
  },
  'blur': {
    from: { opacity: 0, filter: 'blur(10px)' },
    to: { opacity: 1, filter: 'blur(0)' }
  }
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.15,
  once = true
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      element.style.opacity = '1'
      return
    }

    // Set initial state
    const anim = animations[animation]
    Object.assign(element.style, anim.from)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true

            // Use WAAPI for smooth animation
            element.animate(
              [anim.from, anim.to],
              {
                duration,
                delay,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
              }
            )

            if (once) {
              observer.unobserve(element)
            }
          } else if (!entry.isIntersecting && !once && hasAnimated.current) {
            // Reset for non-once animations
            element.animate(
              [anim.to, anim.from],
              {
                duration: duration / 2,
                easing: 'ease-out',
                fill: 'forwards'
              }
            )
            hasAnimated.current = false
          }
        })
      },
      { threshold, rootMargin: '-50px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [animation, delay, duration, once, threshold])

  return (
    <div ref={ref} className={`${className} anim-hidden`}>
      {children}
    </div>
  )
}

// Staggered container for multiple items
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  animation?: ScrollRevealProps['animation']
  duration?: number
  threshold?: number
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 100,
  animation = 'fade-up',
  duration = 600,
  threshold = 0.1
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      container.querySelectorAll('.stagger-item').forEach((item) => {
        (item as HTMLElement).style.opacity = '1'
      })
      return
    }

    const anim = animations[animation]

    // Set initial state for all children
    container.querySelectorAll('.stagger-item').forEach((item) => {
      Object.assign((item as HTMLElement).style, anim.from)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            const items = container.querySelectorAll('.stagger-item')
            items.forEach((item, index) => {
              (item as HTMLElement).animate(
                [anim.from, anim.to],
                {
                  duration,
                  delay: index * staggerDelay,
                  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  fill: 'forwards'
                }
              )
            })

            observer.unobserve(container)
          }
        })
      },
      { threshold, rootMargin: '-30px' }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [animation, duration, staggerDelay, threshold])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Parallax effect component
interface ParallaxProps {
  children: ReactNode
  className?: string
  speed?: number // -1 to 1, negative = opposite direction
}

export function Parallax({ children, className = '', speed = 0.2 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect()
          const scrolled = window.innerHeight - rect.top
          const offset = scrolled * speed * 0.5

          element.style.transform = `translateY(${offset}px)`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Mouse tracking component
interface MouseFollowProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function MouseFollow({ children, className = '', intensity = 10 }: MouseFollowProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      element.style.transform = `
        perspective(1000px)
        rotateX(${-y * intensity}deg)
        rotateY(${x * intensity}deg)
        translateZ(10px)
      `
    }

    const handleMouseLeave = () => {
      element.animate(
        [
          { transform: element.style.transform },
          { transform: 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)' }
        ],
        {
          duration: 400,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }
      )
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [intensity])

  return (
    <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}
