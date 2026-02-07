import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'gradient'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-[--bg-elevated] text-[--text-secondary] border border-[--border]',
    primary: 'bg-[--accent-muted] text-[--accent] border border-[--accent]/20',
    secondary: 'bg-[--highlight-muted] text-[--highlight] border border-[--highlight]/20',
    outline: 'border border-[--text-muted] text-[--text-muted] bg-transparent',
    gradient: 'bg-gradient-to-r from-[--accent-muted] to-[--highlight-muted] text-[--text-primary] border border-[--border]',
  }

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
