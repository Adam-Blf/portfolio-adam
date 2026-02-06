'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  href?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  href,
  ...props
}: ButtonProps) {
  const baseStyles = `
    relative inline-flex items-center justify-center font-semibold rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden group
    hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]
  `

  const variants = {
    primary: `
      bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary
      bg-[length:200%_100%] bg-left
      text-white font-semibold
      hover:bg-right
      shadow-[0_4px_20px_rgba(0,102,255,0.4)]
      hover:shadow-[0_6px_30px_rgba(0,212,255,0.5)]
    `,
    secondary: `
      bg-background-card text-text-primary
      border border-glass-border
      hover:bg-background-hover hover:border-accent-primary/30
      shadow-lg shadow-black/20
    `,
    outline: `
      border-2 border-accent-primary text-accent-primary
      hover:bg-accent-primary hover:text-white
      hover:shadow-[0_0_30px_rgba(0,102,255,0.4)]
    `,
    ghost: `
      text-text-secondary
      hover:text-accent-secondary hover:bg-background-card/50
    `,
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const content = (
    <>
      {/* Shine effect on hover */}
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </span>

      {/* Glow effect for primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  )

  const buttonClasses = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  )
}
