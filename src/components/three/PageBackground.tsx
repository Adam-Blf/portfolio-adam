'use client'

import { useEffect, useState } from 'react'

interface PageBackgroundProps {
  variant?: 'default' | 'minimal' | 'data' | 'grid' | 'hero'
  accentColor?: string
}

/**
 * CSS-based animated background that replaces Three.js
 * Supports multiple variants for different page contexts
 */
export default function PageBackground({ variant = 'default', accentColor = '#FFB000' }: PageBackgroundProps) {
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  if (!mounted) return null

  return (
    <div className="page-bg-container" style={{ '--accent': accentColor } as React.CSSProperties}>
      {/* Base grid - visible on all variants except minimal */}
      {variant !== 'minimal' && <div className="page-grid" />}

      {/* Floating particles - all variants */}
      <div className="page-particles">
        {Array.from({ length: variant === 'minimal' ? 10 : 15 }).map((_, i) => (
          <div
            key={i}
            className="page-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Data nodes - for data variant */}
      {variant === 'data' && (
        <div className="page-data-nodes">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="page-data-node"
              style={{
                left: `${15 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 40}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
          {/* Connection lines */}
          <svg className="page-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="15" y1="20" x2="35" y2="20" />
            <line x1="35" y1="20" x2="55" y2="20" />
            <line x1="55" y1="20" x2="75" y2="20" />
            <line x1="15" y1="60" x2="35" y2="60" />
            <line x1="35" y1="60" x2="55" y2="60" />
            <line x1="55" y1="60" x2="75" y2="60" />
            <line x1="15" y1="20" x2="15" y2="60" />
            <line x1="35" y1="20" x2="35" y2="60" />
            <line x1="55" y1="20" x2="55" y2="60" />
            <line x1="75" y1="20" x2="75" y2="60" />
          </svg>
        </div>
      )}

      {/* Geometric shapes - for default and hero variants */}
      {(variant === 'default' || variant === 'hero') && (
        <div className="page-shapes">
          <div className="page-shape page-shape-1" />
          <div className="page-shape page-shape-2" />
          <div className="page-shape page-shape-3" />
        </div>
      )}

      {/* Grid lines - for grid variant */}
      {variant === 'grid' && (
        <div className="page-tech-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`h-${i}`} className="page-grid-line-h" style={{ top: `${i * 10}%` }} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`v-${i}`} className="page-grid-line-v" style={{ left: `${i * 10}%` }} />
          ))}
        </div>
      )}

      <style jsx>{`
        .page-bg-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: -10;
        }

        .page-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--accent, #FFB000) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent, #FFB000) 1px, transparent 1px);
          background-size: 80px 80px;
          opacity: 0.03;
        }

        .page-particles {
          position: absolute;
          inset: 0;
        }

        .page-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--accent, #FFB000);
          border-radius: 50%;
          opacity: 0;
          animation: particleDrift 6s ease-in-out infinite;
        }

        @keyframes particleDrift {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          50% {
            opacity: 0.4;
            transform: translateY(-20px) scale(1);
          }
        }

        .page-data-nodes {
          position: absolute;
          inset: 0;
        }

        .page-data-node {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--accent, #FFB000);
          border-radius: 50%;
          opacity: 0.5;
          animation: nodePulse 2s ease-in-out infinite;
          box-shadow: 0 0 10px var(--accent, #FFB000);
        }

        @keyframes nodePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        .page-connections {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .page-connections line {
          stroke: var(--accent, #FFB000);
          stroke-width: 0.1;
          opacity: 0.15;
        }

        .page-shapes {
          position: absolute;
          inset: 0;
        }

        .page-shape {
          position: absolute;
          border: 1px solid var(--accent, #FFB000);
          opacity: 0.1;
          animation: shapeFloat 20s linear infinite;
        }

        .page-shape-1 {
          width: 150px;
          height: 150px;
          right: 15%;
          top: 25%;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }

        .page-shape-2 {
          width: 100px;
          height: 100px;
          left: 10%;
          bottom: 35%;
          border-radius: 50%;
          animation-direction: reverse;
          animation-duration: 15s;
        }

        .page-shape-3 {
          width: 80px;
          height: 80px;
          right: 25%;
          bottom: 25%;
          transform: rotate(45deg);
        }

        @keyframes shapeFloat {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .page-tech-grid {
          position: absolute;
          inset: 0;
        }

        .page-grid-line-h,
        .page-grid-line-v {
          position: absolute;
          background: var(--accent, #FFB000);
          opacity: 0.05;
        }

        .page-grid-line-h {
          left: 0;
          right: 0;
          height: 1px;
        }

        .page-grid-line-v {
          top: 0;
          bottom: 0;
          width: 1px;
        }

        @media (prefers-reduced-motion: reduce) {
          .page-particle,
          .page-data-node,
          .page-shape {
            animation: none;
            opacity: 0.2;
          }
        }

        :global(.dark) .page-grid {
          opacity: 0.04;
        }

        :global(.dark) .page-particle {
          opacity: 0.5;
        }

        :global(.dark) .page-shape {
          opacity: 0.15;
        }
      `}</style>
    </div>
  )
}
