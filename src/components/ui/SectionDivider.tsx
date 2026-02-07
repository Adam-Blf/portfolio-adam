'use client'

interface SectionDividerProps {
  variant?: 'default' | 'accent' | 'gradient' | 'diamond'
  className?: string
}

export default function SectionDivider({ variant = 'default', className = '' }: SectionDividerProps) {
  if (variant === 'diamond') {
    return (
      <div className={`section-divider ${className}`} aria-hidden="true">
        {/* The diamond is created via CSS in globals.css */}
      </div>
    )
  }

  if (variant === 'accent') {
    return (
      <div className={`py-12 ${className}`} aria-hidden="true">
        <div className="container-wide">
          <div className="divider-accent mx-auto" />
        </div>
      </div>
    )
  }

  if (variant === 'gradient') {
    return (
      <div className={`py-8 ${className}`} aria-hidden="true">
        <div className="container-wide">
          <div className="divider-gradient" />
        </div>
      </div>
    )
  }

  return (
    <div className={`py-8 ${className}`} aria-hidden="true">
      <div className="container-wide">
        <div className="divider" />
      </div>
    </div>
  )
}
