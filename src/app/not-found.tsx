'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { animate, stagger } from 'animejs'
import { Home, ArrowLeft, Terminal, Search, Compass } from 'lucide-react'

const PageBackground = dynamic(() => import('@/components/three/PageBackground'), {
  ssr: false,
  loading: () => null,
})

// Glitch effect text component
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const glitchChars = '!<>-_\\/[]{}=+*^?#________'
    let iteration = 0
    const originalText = text
    let interval: NodeJS.Timeout | null = null

    const animate = () => {
      el.innerText = originalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) return originalText[index]
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        })
        .join('')

      if (iteration >= originalText.length) {
        if (interval) clearInterval(interval)
        return
      }
      iteration += 1 / 3
    }

    // Delay start
    const timeout = setTimeout(() => {
      interval = setInterval(animate, 30)
    }, 500)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [text])

  return <span ref={ref} className={className}>{text}</span>
}

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [typedCommand, setTypedCommand] = useState('')
  const fullCommand = '$ find /page --name "requested"'

  // Typing animation with WAAPI
  useEffect(() => {
    let index = 0
    const typeInterval = setInterval(() => {
      if (index <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [])

  // anime.js animations
  useEffect(() => {
    const container = containerRef.current
    const terminal = terminalRef.current
    if (!container || !terminal) return

    const easing = 'cubicBezier(0.22, 1, 0.36, 1)'

    // Terminal window scale in
    animate(terminal, {
      scale: [0.8, 1],
      opacity: [0, 1],
      rotateX: [15, 0],
      duration: 800,
      easing,
    })

    // Stagger animate terminal content
    const terminalContent = terminal.querySelectorAll('.animate-in')
    animate(terminalContent, {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 600,
      easing,
      delay: stagger(100, { start: 300 }),
    })

    // Floating particles effect with WAAPI
    const particles = container.querySelectorAll('.particle')
    particles.forEach((particle, i) => {
      const el = particle as HTMLElement
      el.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 0.3 },
        { transform: `translateY(-${20 + i * 10}px) rotate(${180 + i * 45}deg)`, opacity: 0.8 },
        { transform: 'translateY(0px) rotate(360deg)', opacity: 0.3 },
      ], {
        duration: 3000 + i * 500,
        iterations: Infinity,
        easing: 'ease-in-out',
      })
    })

    // Glowing border animation with WAAPI
    const glowBorder = terminal.querySelector('.glow-border')
    if (glowBorder) {
      (glowBorder as HTMLElement).animate([
        { boxShadow: '0 0 20px rgba(255, 176, 0, 0.1), inset 0 0 20px rgba(255, 176, 0, 0.05)' },
        { boxShadow: '0 0 40px rgba(255, 176, 0, 0.2), inset 0 0 40px rgba(255, 176, 0, 0.1)' },
        { boxShadow: '0 0 20px rgba(255, 176, 0, 0.1), inset 0 0 20px rgba(255, 176, 0, 0.05)' },
      ], {
        duration: 3000,
        iterations: Infinity,
        easing: 'ease-in-out',
      })
    }
  }, [])

  return (
    <>
      <PageBackground variant="minimal" />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-accent/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div
        ref={containerRef}
        className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative z-10"
      >
        <div
          ref={terminalRef}
          className="glow-border w-full max-w-2xl border border-[--border] bg-[--bg-card]/90 backdrop-blur-md rounded-lg overflow-hidden anim-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[--border] bg-[--bg-elevated]/50">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-[--text-muted] font-mono flex items-center justify-center gap-2">
                <Terminal size={12} />
                error_404.sh - adam@portfolio
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-8 md:p-12">
            {/* Command line */}
            <div className="animate-in font-mono text-sm text-[--text-muted] mb-6 anim-hidden">
              <span className="text-accent">{typedCommand}</span>
              <span className="animate-pulse">|</span>
            </div>

            {/* Error Code - Glitch Effect */}
            <div className="animate-in text-center mb-6 anim-hidden">
              <h1 className="text-[8rem] md:text-[10rem] font-black leading-none select-none relative">
                <span className="text-accent/10 absolute inset-0 blur-xl">404</span>
                <GlitchText text="404" className="relative text-accent/30" />
              </h1>
            </div>

            {/* Error message */}
            <div className="animate-in font-mono text-sm mb-8 space-y-1 anim-hidden">
              <div className="text-red-400 flex items-center gap-2">
                <Search size={14} />
                Error: Page not found in filesystem
              </div>
              <div className="text-yellow-400 flex items-center gap-2">
                <Compass size={14} />
                Hint: The requested URL does not exist
              </div>
            </div>

            {/* Message */}
            <div className="animate-in text-center mb-8 anim-hidden">
              <h2 className="text-title mb-3">Page introuvable</h2>
              <p className="text-body text-[--text-secondary] max-w-md mx-auto">
                La page que vous recherchez n&apos;existe pas ou a ete deplacee.
              </p>
            </div>

            {/* Available routes */}
            <div className="animate-in font-mono text-xs bg-[--bg-deep]/50 p-4 rounded-lg mb-8 max-w-sm mx-auto anim-hidden">
              <div className="text-[--text-muted] mb-2">
                <span className="text-accent">$</span> ls ./pages/
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-green-400">
                <span className="hover:text-accent cursor-pointer transition-colors">accueil/</span>
                <span className="hover:text-accent cursor-pointer transition-colors">frise/</span>
                <span className="hover:text-accent cursor-pointer transition-colors">projets/</span>
                <span className="hover:text-accent cursor-pointer transition-colors">competences/</span>
                <span className="hover:text-accent cursor-pointer transition-colors">contact/</span>
              </div>
              <div className="text-[--text-muted] mt-3 flex items-center gap-1">
                <span className="text-accent">$</span>
                <span className="inline-block w-2 h-4 bg-accent/70 animate-pulse" />
              </div>
            </div>

            {/* Buttons */}
            <div
              className="animate-in flex flex-col sm:flex-row gap-4 justify-center anim-hidden"
            >
              <Link
                href="/"
                className="btn btn-primary group"
              >
                <Home size={16} className="group-hover:scale-110 transition-transform" />
                Retour a l&apos;accueil
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn btn-outline group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Page precedente
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
