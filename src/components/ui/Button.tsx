'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
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
    inline-flex items-center justify-center font-semibold rounded-lg
    transition-all duration-200 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg-deep]
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variants = {
    primary: `
      bg-[--accent] text-white font-semibold
      hover:bg-[--accent-dim] hover:-translate-y-0.5
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-[--bg-elevated] text-[--text-primary]
      border border-[--border]
      hover:bg-[--bg-hover] hover:border-[--border-accent]
    `,
    outline: `
      border border-[--border] text-[--text-primary]
      hover:border-[--accent] hover:text-[--accent]
      bg-transparent
    `,
    ghost: `
      text-[--text-secondary] bg-transparent
      hover:text-[--text-primary] hover:bg-[--bg-elevated]
    `,
    gradient: `
      bg-gradient-to-r from-[--accent] to-[--highlight]
      text-white font-semibold
      hover:-translate-y-0.5 hover:shadow-lg
      shadow-md
    `,
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2',
  }

  const buttonClasses = cn(baseStyles, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  )
}
