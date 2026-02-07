'use client'

import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'elevated' | 'gradient'
}

export default function Card({
  children,
  className,
  hover = true,
  variant = 'default'
}: CardProps) {
  const variants = {
    default: 'bg-[--bg-card] border border-[--border]',
    elevated: 'bg-[--bg-elevated] border border-[--border] shadow-md',
    gradient: 'bg-[--bg-card] border border-[--border] bg-gradient-to-br from-[--accent-muted] to-transparent',
  }

  return (
    <div
      className={cn(
        'relative rounded-xl p-6 overflow-hidden transition-all duration-300',
        variants[variant],
        hover && 'hover:border-[--border-accent] hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
