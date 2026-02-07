'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, Monitor, Globe } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useI18n, Locale } from '@/lib/i18n'

const navKeys = [
  { href: '/', key: 'home' },
  { href: '/frise', key: 'timeline' },
  { href: '/projets', key: 'projects' },
  { href: '/competences', key: 'skills' },
  { href: '/contact', key: 'contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const themeMenuRef = useRef<HTMLDivElement>(null)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme()
  const { locale, setLocale, t } = useI18n()

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

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false)
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false)
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
              {navKeys.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative ${
                    pathname === item.href
                      ? 'text-[--accent] nav-link-active'
                      : 'text-[--text-secondary] hover:text-[--text-primary]'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}

              {/* Language Switcher */}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-2 rounded-lg hover:bg-[--bg-elevated] transition-colors flex items-center gap-1"
                  aria-label="Change language"
                >
                  <Globe size={16} className="text-[--text-secondary]" />
                  <span className="text-xs font-medium text-[--text-secondary] uppercase">{locale}</span>
                </button>

                {showLangMenu && (
                  <div
                    role="menu"
                    aria-label="Language selection"
                    className="absolute right-0 top-full mt-2 py-2 px-1 bg-[--bg-surface] border border-[--border] rounded-lg shadow-lg min-w-[140px] max-h-[300px] overflow-y-auto"
                  >
                    {[
                      { value: 'fr', label: 'Francais', flag: '🇫🇷' },
                      { value: 'en', label: 'English', flag: '🇬🇧' },
                      { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
                      { value: 'es', label: 'Espanol', flag: '🇪🇸' },
                      { value: 'it', label: 'Italiano', flag: '🇮🇹' },
                      { value: 'pt', label: 'Portugues', flag: '🇵🇹' },
                      { value: 'nl', label: 'Nederlands', flag: '🇳🇱' },
                      { value: 'pl', label: 'Polski', flag: '🇵🇱' },
                    ].map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => {
                          setLocale(lang.value as Locale)
                          setShowLangMenu(false)
                        }}
                        role="menuitemradio"
                        aria-checked={locale === lang.value}
                        className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          locale === lang.value
                            ? 'bg-[--accent]/10 text-[--accent]'
                            : 'text-[--text-secondary] hover:bg-[--bg-hover]'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 rounded-lg hover:bg-[--bg-elevated] transition-colors"
                  aria-label="Changer le theme"
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
                            ? 'bg-[--accent]/10 text-[--accent]'
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
          className="fixed inset-0 z-40 bg-[--bg-deep] md:hidden animate-fade-in"
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8">
            {navKeys.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl md:text-3xl font-bold transition-all ${
                  pathname === item.href ? 'text-[--accent]' : 'text-[--text-primary]'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}

            {/* Mobile language switcher */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-xs">
              {[
                { value: 'fr', flag: '🇫🇷' },
                { value: 'en', flag: '🇬🇧' },
                { value: 'de', flag: '🇩🇪' },
                { value: 'es', flag: '🇪🇸' },
                { value: 'it', flag: '🇮🇹' },
                { value: 'pt', flag: '🇵🇹' },
                { value: 'nl', flag: '🇳🇱' },
                { value: 'pl', flag: '🇵🇱' },
              ].map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLocale(lang.value as Locale)}
                  className={`px-3 py-2 rounded-xl border transition-all text-lg ${
                    locale === lang.value
                      ? 'border-[--accent] bg-[--accent]/10'
                      : 'border-[--border]'
                  }`}
                  aria-label={lang.value.toUpperCase()}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            {/* Mobile theme options */}
            <div className="flex gap-4 mt-4">
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
                      ? 'border-[--accent] bg-[--accent]/10 text-[--accent]'
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
