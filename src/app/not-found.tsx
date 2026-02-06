'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { animate } from 'animejs'
import { Home, ArrowLeft, Terminal } from 'lucide-react'

const PageBackground = dynamic(() => import('@/components/three/PageBackground'), {
  ssr: false,
  loading: () => null,
})

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

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

    // Animate error code
    const errorCode = container.querySelector('.error-code')
    if (errorCode) {
      animate(errorCode, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
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
    <>
      <PageBackground variant="minimal" />
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
                error_404.sh
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-8 md:p-12 text-center">
            {/* Error Code */}
            <div className="error-code mb-6" style={{ opacity: 0 }}>
              <div className="font-mono text-sm text-[--text-muted] mb-2">
                $ find /page --name &quot;requested&quot;
              </div>
              <h1 className="text-[8rem] md:text-[10rem] font-black leading-none text-accent/20 select-none">
                404
              </h1>
              <div className="font-mono text-sm text-red-400 mt-2">
                Error: Page not found
              </div>
            </div>

            {/* Message */}
            <div className="error-message mb-8" style={{ opacity: 0 }}>
              <h2 className="text-title mb-3">Page introuvable</h2>
              <p className="text-body text-[--text-secondary] max-w-md mx-auto">
                La page que vous recherchez n&apos;existe pas ou a ete deplacee.
                Verifiez l&apos;URL ou retournez a l&apos;accueil.
              </p>
            </div>

            {/* Terminal Output */}
            <div className="font-mono text-xs text-left bg-[--bg-deep]/50 p-4 rounded mb-8 max-w-sm mx-auto">
              <div className="text-[--text-muted]">
                <span className="text-accent">$</span> ls ./pages/
              </div>
              <div className="text-green-400 mt-1">
                accueil/  frise/  projets/  competences/  contact/
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
              <Link href="/" className="btn btn-primary">
                <Home size={16} />
                Retour a l&apos;accueil
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline"
              >
                <ArrowLeft size={16} />
                Page precedente
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
