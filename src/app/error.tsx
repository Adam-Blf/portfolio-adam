'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { animate } from 'animejs'
import { RefreshCw, Home, Terminal, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Log error for debugging
    console.error('Application error:', error)
  }, [error])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const easing = 'cubicBezier(0.22, 1, 0.36, 1)'

    // Animate terminal window
    const terminal = container.querySelector('.terminal-window')
    if (terminal) {
      animate(terminal, {
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        easing,
      })
    }

    // Animate error icon
    const icon = container.querySelector('.error-icon')
    if (icon) {
      animate(icon, {
        scale: [0, 1],
        rotate: ['-10deg', '0deg'],
        duration: 500,
        easing,
        delay: 200,
      })
    }

    // Animate message
    const message = container.querySelector('.error-message')
    if (message) {
      animate(message, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing,
        delay: 400,
      })
    }

    // Animate buttons
    const buttons = container.querySelector('.error-buttons')
    if (buttons) {
      animate(buttons, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        easing,
        delay: 600,
      })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-[80vh] flex items-center justify-center px-4 py-20"
    >
      <div
        className="terminal-window w-full max-w-2xl border border-[--border] bg-[--bg-card]/80 backdrop-blur-sm"
        style={{ opacity: 0 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[--border] bg-[--bg-elevated]/50">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-[--text-muted] font-mono flex items-center justify-center gap-2">
              <Terminal size={12} />
              error_handler.sh
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-8 md:p-12 text-center">
          {/* Error Icon */}
          <div
            className="error-icon inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
            style={{ opacity: 0 }}
          >
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>

          {/* Message */}
          <div className="error-message mb-8" style={{ opacity: 0 }}>
            <h1 className="text-title mb-3">Une erreur est survenue</h1>
            <p className="text-body text-[--text-secondary] max-w-md mx-auto mb-4">
              Quelque chose s&apos;est mal passe. Veuillez reessayer ou retourner a l&apos;accueil.
            </p>

            {/* Error Details (dev mode) */}
            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="font-mono text-xs text-left bg-red-500/10 border border-red-500/20 p-4 rounded max-w-lg mx-auto mt-4">
                <div className="text-red-400 mb-1">Error Details:</div>
                <div className="text-[--text-muted] break-all">{error.message}</div>
                {error.digest && (
                  <div className="text-[--text-muted] mt-2">
                    Digest: {error.digest}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Terminal Output */}
          <div className="font-mono text-xs text-left bg-[--bg-deep]/50 p-4 rounded mb-8 max-w-sm mx-auto">
            <div className="text-red-400">
              [ERROR] Process terminated unexpectedly
            </div>
            <div className="text-yellow-400 mt-1">
              [WARN] Attempting recovery...
            </div>
            <div className="text-[--text-muted] mt-2">
              <span className="text-accent">$</span> <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Buttons */}
          <div
            className="error-buttons flex flex-col sm:flex-row gap-4 justify-center"
            style={{ opacity: 0 }}
          >
            <button onClick={reset} className="btn btn-primary">
              <RefreshCw size={16} />
              Reessayer
            </button>
            <Link href="/" className="btn btn-outline">
              <Home size={16} />
              Retour a l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
