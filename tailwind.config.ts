import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Synced with CSS variables from globals.css
        background: {
          deep: 'var(--bg-deep)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          hover: 'var(--bg-hover)',
          card: 'var(--bg-card)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          muted: 'var(--accent-muted)',
          glow: 'var(--accent-glow)',
          dim: 'var(--accent-dim)',
        },
        highlight: {
          DEFAULT: 'var(--highlight)',
          muted: 'var(--highlight-muted)',
          glow: 'var(--highlight-glow)',
        },
        tertiary: {
          DEFAULT: 'var(--tertiary)',
          muted: 'var(--tertiary-muted)',
        },
        success: {
          DEFAULT: 'var(--success)',
          glow: 'var(--success-glow)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        border: {
          DEFAULT: 'var(--border)',
          accent: 'var(--border-accent)',
        },
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        glow: 'var(--shadow-glow)',
        'glow-lg': 'var(--shadow-glow-lg)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in': 'slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 30px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translate3d(-20px, 0, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px var(--accent-muted)' },
          '50%': { boxShadow: '0 0 40px var(--accent-glow)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
      },
      spacing: {
        'unit': 'var(--space-unit)',
      },
    },
  },
  plugins: [],
}

export default config
