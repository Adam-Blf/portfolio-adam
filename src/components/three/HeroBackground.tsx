'use client'

import { useEffect, useState } from 'react'

/**
 * CSS-based animated background that replaces Three.js
 * This provides a performant, accessible alternative that works reliably
 * while maintaining the data visualization aesthetic
 */
export default function HeroBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="hero-bg-container">
      {/* Animated grid */}
      <div className="hero-grid" />

      {/* Floating particles */}
      <div className="hero-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Data streams */}
      <div className="hero-streams">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="hero-stream"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="hero-shapes">
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-shape hero-shape-3" />
      </div>

      <style jsx>{`
        .hero-bg-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 176, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 176, 0, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center top;
          opacity: 0.5;
        }

        .hero-particles {
          position: absolute;
          inset: 0;
        }

        .hero-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--accent, #FFB000);
          border-radius: 50%;
          opacity: 0;
          animation: particleFloat 5s ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-30px) scale(1);
          }
        }

        .hero-streams {
          position: absolute;
          inset: 0;
        }

        .hero-stream {
          position: absolute;
          width: 1px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 176, 0, 0.3),
            transparent
          );
          animation: streamFlow 3s linear infinite;
        }

        @keyframes streamFlow {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .hero-shapes {
          position: absolute;
          inset: 0;
        }

        .hero-shape {
          position: absolute;
          border: 1px solid rgba(255, 176, 0, 0.15);
          animation: shapeRotate 20s linear infinite;
        }

        .hero-shape-1 {
          width: 200px;
          height: 200px;
          right: 10%;
          top: 20%;
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }

        .hero-shape-2 {
          width: 150px;
          height: 150px;
          left: 5%;
          bottom: 30%;
          border-radius: 50%;
          animation-direction: reverse;
          animation-duration: 15s;
        }

        .hero-shape-3 {
          width: 100px;
          height: 100px;
          right: 20%;
          bottom: 20%;
          transform: rotate(45deg);
        }

        @keyframes shapeRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-particle,
          .hero-stream,
          .hero-shape {
            animation: none;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}
