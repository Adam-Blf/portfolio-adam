'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { animate, stagger } from 'animejs'
import { RefreshCw, Home, Terminal, AlertTriangle, Bug, Zap } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  // anime.js + WAAPI animations
  useEffect(() => {
    const container = containerRef.current
    const terminal = terminalRef.current
    if (!container || !terminal) return

    const easing = 'cubicBezier(0.22, 1, 0.36, 1)'

    // Terminal shake on load
    animate(terminal, {
      translateX: [-5, 5, -3, 3, 0],
      duration: 500,
      easing: 'outElastic(1, .5)',
    })

    // Scale in
    animate(terminal, {
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 600,
      easing,
    })

    // Stagger content
    const content = terminal.querySelectorAll('.animate-in')
    animate(content, {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 500,
      easing,
      delay: stagger(80, { start: 200 }),
    })

    // Error icon pulse with WAAPI
    const errorIcon = terminal.querySelector('.error-icon')
    if (errorIcon) {
      (errorIcon as HTMLElement).animate([
        { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.4)' },
        { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)' },
        { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)' },
      ], {
        duration: 2000,
        iterations: Infinity,
        easing: 'ease-out',
      })
    }

    // Glitch effect on border
    const glitchEffect = () => {
      animate(terminal, {
        translateX: [0, -2, 2, -1, 1, 0],
        duration: 100,
        easing: 'inOutQuad',
      })
    }
    const glitchInterval = setInterval(glitchEffect, 5000)

    return () => clearInterval(glitchInterval)
  }, [])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)

    // Animate button
    const btn = document.querySelector('.retry-btn')
    if (btn) {
      animate(btn, {
        rotate: [0, 360],
        duration: 500,
        easing: 'outExpo',
      })
    }

    setTimeout(reset, 300)
  }

  return (
    <div
      ref={containerRef}
      className="min-h-[80vh] flex items-center justify-center px-4 py-20"
    >
      <div
        ref={terminalRef}
        className="w-full max-w-2xl border border-red-500/30 bg-[--bg-card]/90 backdrop-blur-md rounded-lg overflow-hidden anim-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-red-500/20 bg-red-500/5">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-red-400 font-mono flex items-center justify-center gap-2">
              <Bug size={12} />
              error_handler.sh - CRITICAL
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-8 md:p-12">
          {/* Error Icon */}
          <div className="animate-in flex justify-center mb-6 anim-hidden">
            <div className="error-icon inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
          </div>

          {/* Error output */}
          <div className="animate-in font-mono text-xs bg-[--bg-deep]/70 p-4 rounded-lg mb-6 border border-red-500/20 anim-hidden">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <Zap size={12} />
              <span>[FATAL] Unhandled exception caught</span>
            </div>
            <div className="text-yellow-400 mb-2">
              [WARN] Process terminated unexpectedly
            </div>
            <div className="text-[--text-muted]">
              [INFO] Attempting recovery... {retryCount > 0 && `(attempt ${retryCount})`}
            </div>
            {error.digest && (
              <div className="text-[--text-muted] mt-2 text-xs">
                Digest: <span className="text-accent">{error.digest}</span>
              </div>
            )}
          </div>

          {/* Message */}
          <div className="animate-in text-center mb-6 anim-hidden">
            <h1 className="text-title mb-3">Une erreur est survenue</h1>
            <p className="text-body text-[--text-secondary] max-w-md mx-auto">
              Quelque chose s&apos;est mal passe. Veuillez reessayer ou retourner a l&apos;accueil.
            </p>
          </div>

          {/* Error Details Toggle (dev mode) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="animate-in mb-6 anim-hidden">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-[--text-muted] hover:text-accent transition-colors flex items-center gap-2 mx-auto"
              >
                <Terminal size={12} />
                {showDetails ? 'Masquer' : 'Afficher'} les details
              </button>
              {showDetails && (
                <div className="mt-4 font-mono text-xs text-left bg-red-500/10 border border-red-500/20 p-4 rounded-lg max-w-lg mx-auto overflow-auto">
                  <div className="text-red-400 mb-2 font-semibold">Stack Trace:</div>
                  <pre className="text-[--text-muted] whitespace-pre-wrap break-all text-[10px]">
                    {error.message}
                    {error.stack && `\n\n${error.stack}`}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Recovery animation */}
          <div className="animate-in font-mono text-xs text-center mb-8 text-[--text-muted] anim-hidden">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              System ready for recovery
            </span>
          </div>

          {/* Buttons */}
          <div
            className="animate-in flex flex-col sm:flex-row gap-4 justify-center anim-hidden"
          >
            <button
              onClick={handleRetry}
              className="retry-btn btn btn-primary group"
            >
              <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              Reessayer
            </button>
            <Link href="/" className="btn btn-outline group">
              <Home size={16} className="group-hover:scale-110 transition-transform" />
              Retour a l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
