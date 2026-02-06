import { animate, stagger, createTimeline } from 'animejs'

// Reusable animation configurations
export const easings = {
  smooth: 'cubicBezier(0.16, 1, 0.3, 1)',
  bounce: 'spring(1, 80, 10, 0)',
  sharp: 'cubicBezier(0.4, 0, 0.2, 1)',
}

// Fade up animation
export function fadeUp(targets: string | Element | Element[] | NodeListOf<Element>) {
  return animate(targets, {
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 600,
    easing: easings.smooth,
  })
}

// Fade in animation
export function fadeIn(targets: string | Element | Element[] | NodeListOf<Element>) {
  return animate(targets, {
    opacity: [0, 1],
    duration: 400,
    easing: 'outQuad',
  })
}

// Stagger fade up
export function staggerFadeUp(targets: string | Element | Element[] | NodeListOf<Element>, staggerDelay = 50) {
  return animate(targets, {
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 600,
    easing: easings.smooth,
    delay: stagger(staggerDelay),
  })
}

// Scale in animation
export function scaleIn(targets: string | Element | Element[] | NodeListOf<Element>) {
  return animate(targets, {
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 500,
    easing: easings.smooth,
  })
}

// Slide in from left
export function slideInLeft(targets: string | Element | Element[] | NodeListOf<Element>) {
  return animate(targets, {
    translateX: [-30, 0],
    opacity: [0, 1],
    duration: 600,
    easing: easings.smooth,
  })
}

// Slide in from right
export function slideInRight(targets: string | Element | Element[] | NodeListOf<Element>) {
  return animate(targets, {
    translateX: [30, 0],
    opacity: [0, 1],
    duration: 600,
    easing: easings.smooth,
  })
}

// Counter animation
export function animateCounter(target: Element, endValue: number, duration = 2000) {
  const counter = { value: 0 }
  return animate(counter, {
    value: endValue,
    duration,
    easing: 'outExpo',
    onUpdate: () => {
      target.textContent = Math.round(counter.value).toString()
    },
  })
}

// Progress bar animation
export function animateProgressBar(target: Element, percentage: number, duration = 1000) {
  return animate(target, {
    width: `${percentage}%`,
    duration,
    easing: easings.smooth,
  })
}

// Hover lift effect using WAAPI
export function hoverLift(element: HTMLElement) {
  const enterAnimation = () => {
    element.animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-4px)' }
      ],
      {
        duration: 300,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      }
    )
  }

  const leaveAnimation = () => {
    element.animate(
      [
        { transform: 'translateY(-4px)' },
        { transform: 'translateY(0)' }
      ],
      {
        duration: 300,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      }
    )
  }

  element.addEventListener('mouseenter', enterAnimation)
  element.addEventListener('mouseleave', leaveAnimation)

  return () => {
    element.removeEventListener('mouseenter', enterAnimation)
    element.removeEventListener('mouseleave', leaveAnimation)
  }
}

// Text reveal animation
export function textReveal(targets: string | Element | Element[] | NodeListOf<Element>) {
  return animate(targets, {
    translateY: ['100%', '0%'],
    opacity: [0, 1],
    duration: 800,
    easing: easings.smooth,
  })
}

// Create intersection observer for scroll animations
export function createScrollObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '-50px',
      ...options,
    }
  )
}

// Export timeline creator
export { createTimeline, animate, stagger }
