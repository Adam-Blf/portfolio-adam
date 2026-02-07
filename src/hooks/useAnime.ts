'use client'

import { useEffect, useRef, useCallback } from 'react'
import { animate, stagger, createTimeline } from 'animejs'
import { useReducedMotion } from './useReducedMotion'

// Hook for scroll-triggered animations
export function useScrollAnimation<T extends HTMLElement>(
  animationFn: (target: T) => void,
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null)
  const hasAnimated = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      element.style.opacity = '1'
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animationFn(element)
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options,
      }
    )

    // Set initial state
    element.style.opacity = '0'
    observer.observe(element)

    return () => observer.disconnect()
  }, [animationFn, options, prefersReducedMotion])

  return ref
}

// Hook for staggered children animation on scroll
export function useStaggerAnimation(
  selector: string,
  staggerDelay = 50,
  options?: IntersectionObserverInit
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll(selector)

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      children.forEach((child) => {
        ;(child as HTMLElement).style.opacity = '1'
      })
      return
    }

    children.forEach((child) => {
      ;(child as HTMLElement).style.opacity = '0'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animate(children, {
              translateY: [20, 0],
              opacity: [0, 1],
              duration: 600,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
              delay: stagger(staggerDelay),
            })
            observer.unobserve(container)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options,
      }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [selector, staggerDelay, options, prefersReducedMotion])

  return containerRef
}

// Hook for counter animation
export function useCounterAnimation(endValue: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Show final value immediately if user prefers reduced motion
    if (prefersReducedMotion) {
      element.textContent = endValue.toString()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const obj = { value: 0 }
            animate(obj, {
              value: endValue,
              duration,
              easing: 'outExpo',
              onUpdate: () => {
                element.textContent = Math.round(obj.value).toString()
              },
            })
            observer.unobserve(element)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [endValue, duration, prefersReducedMotion])

  return ref
}

// Hook for progress bar animation
export function useProgressBar(percentage: number) {
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Show final state immediately if user prefers reduced motion
    if (prefersReducedMotion) {
      element.style.width = `${percentage}%`
      return
    }

    element.style.width = '0%'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            animate(element, {
              width: `${percentage}%`,
              duration: 1000,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
              delay: 200,
            })
            observer.unobserve(element)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [percentage, prefersReducedMotion])

  return ref
}

// Hook for hover animations using WAAPI
export function useHoverAnimation(scale = 1.02, lift = -4) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Skip hover animations if user prefers reduced motion
    if (prefersReducedMotion) return

    const handleEnter = () => {
      element.animate(
        [
          { transform: 'translateY(0) scale(1)' },
          { transform: `translateY(${lift}px) scale(${scale})` }
        ],
        {
          duration: 300,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }
      )
    }

    const handleLeave = () => {
      element.animate(
        [
          { transform: `translateY(${lift}px) scale(${scale})` },
          { transform: 'translateY(0) scale(1)' }
        ],
        {
          duration: 300,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }
      )
    }

    element.addEventListener('mouseenter', handleEnter)
    element.addEventListener('mouseleave', handleLeave)

    return () => {
      element.removeEventListener('mouseenter', handleEnter)
      element.removeEventListener('mouseleave', handleLeave)
    }
  }, [scale, lift, prefersReducedMotion])

  return ref
}

// Hook for page load animation
export function usePageLoadAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const container = ref.current
    if (!container) return

    // Animate all children with data-animate attribute
    const elements = container.querySelectorAll('[data-animate]')

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      elements.forEach((el) => {
        ;(el as HTMLElement).style.opacity = '1'
      })
      return
    }

    elements.forEach((el) => {
      ;(el as HTMLElement).style.opacity = '0'
    })

    animate(elements, {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      delay: stagger(100, { start: 100 }),
    })
  }, [prefersReducedMotion])

  return ref
}

// Custom anime timeline hook
export function useAnimeTimeline() {
  const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null)

  const create = useCallback(() => {
    timelineRef.current = createTimeline()
    return timelineRef.current
  }, [])

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause()
      }
    }
  }, [])

  return { createTimeline: create, timeline: timelineRef.current }
}
