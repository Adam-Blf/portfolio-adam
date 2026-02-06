'use client'

import { useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  variant?: 'default' | 'elevated' | 'holographic'
}

export default function Card({
  children,
  className,
  hover = true,
  glow = false,
  variant = 'default'
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !hover) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const percentX = (e.clientX - centerX) / (rect.width / 2)
    const percentY = (e.clientY - centerY) / (rect.height / 2)

    setTransform({
      rotateX: -percentY * 8,
      rotateY: percentX * 8,
    })

    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 0.15,
    })
  }, [hover])

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 })
    setSpotlight({ x: 0, y: 0, opacity: 0 })
  }, [])

  const variants = {
    default: 'glass',
    elevated: 'glass-strong',
    holographic: 'holo-border',
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hover
          ? `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`
          : undefined,
        transition: 'transform 0.15s ease-out',
      }}
      className={cn(
        'relative rounded-2xl p-6 overflow-hidden',
        variants[variant],
        hover && 'transition-shadow duration-500',
        glow && 'hover:shadow-[0_0_40px_rgba(0,102,255,0.3)]',
        className
      )}
    >
      {/* Spotlight Effect */}
      {hover && (
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, rgba(0, 212, 255, ${spotlight.opacity}), transparent 80%)`,
          }}
        />
      )}

      {/* Shimmer Effect */}
      {hover && (
        <div className="shimmer absolute inset-0 rounded-2xl pointer-events-none" />
      )}

      {/* Border Glow on Hover */}
      {glow && (
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.2) 0%, rgba(0,212,255,0.2) 100%)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </div>
  )
}
