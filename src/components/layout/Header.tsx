'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { animate, stagger } from 'animejs'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/frise', label: 'Parcours' },
  { href: '/projets', label: 'Projets' },
  { href: '/competences', label: 'Competences' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const themeMenuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme()

  // Initial header animation using WAAPI + anime.js
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    // WAAPI for main header
    header.animate(
      [
        { transform: 'translateY(-20px)', opacity: 0 },
        { transform: 'translateY(0)', opacity: 1 }
      ],
      {
        duration: 600,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'forwards'
      }
    )

    // Anime.js for staggered nav links
    animate(header.querySelectorAll('.nav-link'), {
      translateY: [-10, 0],
      opacity: [0, 1],
      duration: 400,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      delay: stagger(50, { start: 200 }),
    })
  }, [])

  // Scroll detection - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)

      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }

      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mobile menu animation with WAAPI + anime.js
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current
    if (!mobileMenu) return

    if (isMobileMenuOpen) {
      // WAAPI for smooth fade in
      mobileMenu.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 300, fill: 'forwards', easing: 'ease-out' }
      )

      // Anime.js for staggered menu items
      animate(mobileMenu.querySelectorAll('.mobile-link'), {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        delay: stagger(80, { start: 100 }),
      })
    }
  }, [isMobileMenuOpen])

  // Close theme menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Theme icon based on current state
  const ThemeIcon = theme === 'system' ? Monitor : resolvedTheme === 'dark' ? Moon : Sun

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-subtle py-3 md:py-4' : 'py-4 md:py-6'
        } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ opacity: 0 }}
      >
        <div className="container-wide">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <Image
                src="/logo-adam.svg"
                alt="Adam Beloucif"
                width={40}
                height={40}
                className="h-8 w-auto md:h-10 transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-accent'
                      : 'text-[--text-secondary] hover:text-[--text-primary]'
                  }`}
                  style={{ opacity: 0 }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Theme Toggle */}
              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="nav-link p-2 rounded-lg hover:bg-[--bg-elevated] transition-colors"
                  aria-label="Changer le theme"
                  style={{ opacity: 0 }}
                >
                  <ThemeIcon size={18} className="text-[--text-secondary]" />
                </button>

                {/* Theme Dropdown */}
                {showThemeMenu && (
                  <div
                    role="menu"
                    aria-label="Selection du theme"
                    className="absolute right-0 top-full mt-2 py-2 px-1 bg-[--bg-surface] border border-[--border] rounded-lg shadow-lg min-w-[140px]"
                  >
                    {[
                      { value: 'light', icon: Sun, label: 'Clair' },
                      { value: 'dark', icon: Moon, label: 'Sombre' },
                      { value: 'system', icon: Monitor, label: 'Systeme' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setTheme(option.value as 'light' | 'dark' | 'system')
                          setShowThemeMenu(false)
                        }}
                        role="menuitemradio"
                        aria-checked={theme === option.value}
                        className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          theme === option.value
                            ? 'bg-accent/10 text-accent'
                            : 'text-[--text-secondary] hover:bg-[--bg-hover]'
                        }`}
                      >
                        <option.icon size={14} />
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-[--bg-elevated] transition-colors"
                aria-label="Changer le theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun size={18} className="text-[--text-secondary]" />
                ) : (
                  <Moon size={18} className="text-[--text-secondary]" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-[--bg-elevated] transition-colors"
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-40 bg-[--bg-deep] md:hidden"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-link text-2xl md:text-3xl font-bold ${
                  pathname === item.href ? 'text-accent' : 'text-[--text-primary]'
                }`}
                style={{ opacity: 0 }}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile theme options */}
            <div className="flex gap-4 mt-8 mobile-link" style={{ opacity: 0 }}>
              {[
                { value: 'light', icon: Sun, label: 'Theme clair' },
                { value: 'dark', icon: Moon, label: 'Theme sombre' },
                { value: 'system', icon: Monitor, label: 'Theme systeme' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                  aria-label={option.label}
                  aria-pressed={theme === option.value}
                  className={`p-3 rounded-xl border transition-all ${
                    theme === option.value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-[--border] text-[--text-secondary]'
                  }`}
                >
                  <option.icon size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
