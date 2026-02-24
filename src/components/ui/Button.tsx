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

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-primary',
    ghost: 'text-secondary hover:text-primary transition-colors',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: '', // Defaults are in the btn classes
    lg: 'px-8 py-4 text-lg',
  }

  const buttonClasses = cn(
    variantClasses[variant],
    sizeClasses[size],
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200',
    className
  )

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}
