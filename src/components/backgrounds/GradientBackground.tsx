'use client'

interface GradientBackgroundProps {
  showGrid?: boolean
}

export default function GradientBackground({ showGrid = false }: GradientBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-[--bg-deep]" />

      {/* Gradient orbs - subtle Netflix red tones */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-[--accent] rounded-full opacity-[0.06] blur-[120px]" />
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-[--accent] rounded-full opacity-[0.04] blur-[120px]" />
      <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-[--accent] rounded-full opacity-[0.05] blur-[120px]" />

      {/* Optional grid pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(var(--accent) 1px, transparent 1px),
              linear-gradient(90deg, var(--accent) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      )}

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--bg-deep]/50 to-[--bg-deep]" />
    </div>
  )
}
