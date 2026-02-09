'use client'

interface GradientBackgroundProps {
  showGrid?: boolean
}

export default function GradientBackground({ showGrid = false }: GradientBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base red Pokedex background */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--pokedex-red)' }}
      />

      {/* Subtle diagonal line texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 8px,
            rgba(0,0,0,1) 8px,
            rgba(0,0,0,1) 9px
          )`,
        }}
      />

      {/* Slight darker gradient at edges for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)',
        }}
      />
    </div>
  )
}
