'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Returns animation duration based on reduced motion preference
 * @param duration - Normal duration in ms
 * @returns 0 if reduced motion, otherwise original duration
 */
export function useAnimationDuration(duration: number): number {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ? 0 : duration
}
