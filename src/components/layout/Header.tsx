'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useI18n, Locale } from '@/lib/i18n'

const navKeys = [
  { href: '/', key: 'home' },
  { href: '/timeline', key: 'timeline' },
  { href: '/projects', key: 'projects' },
  { href: '/skills', key: 'skills' },
  { href: '/formation', key: 'formation' },
  { href: '/contact', key: 'contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const { locale, setLocale, t } = useI18n()

  // Scroll detection - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 50)

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
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          background: 'rgba(10, 10, 15, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div
          className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}
        >
          <div className="container-wide">
            <nav className="flex items-center justify-between">
              {/* Left: Logo */}
              <div className="flex items-center gap-3">
                <Link href="/" className="group flex items-center gap-2">
                  <Image
                    src="/logo-adam.svg"
                    alt="Adam Beloucif"
                    width={32}
                    height={32}
                    className="h-7 w-auto md:h-8 transition-transform group-hover:scale-105"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(0, 240, 255, 0.4))' }}
                  />
                  <span
                    className="hidden sm:inline text-sm md:text-base font-bold tracking-widest uppercase"
                    style={{ color: '#f0f0f0' }}
                  >
                    Portfolio
                  </span>
                </Link>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1 lg:gap-2">
                {navKeys.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors rounded-lg ${
                      pathname === item.href
                        ? 'nav-link-active'
                        : 'hover:text-[#00f0ff]'
                    }`}
                    style={{
                      color: pathname === item.href ? '#00f0ff' : '#a0a0b0',
                    }}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                ))}

                {/* Language Switcher */}
                <div className="relative ml-2" ref={langMenuRef}>
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                    style={{ color: '#a0a0b0' }}
                    aria-label="Change language"
                  >
                    <span style={{ fontSize: '14px' }}>&#127760;</span>
                    <span>{locale}</span>
                  </button>

                  {showLangMenu && (
                    <div
                      role="menu"
                      aria-label="Language selection"
                      className="absolute right-0 top-full mt-2 py-2 px-1 rounded-xl shadow-lg min-w-[150px] max-h-[300px] overflow-y-auto"
                      style={{
                        background: '#1a1a2e',
                        border: '1px solid #2a2a3e',
                      }}
                    >
                      {[
                        { value: 'fr', label: 'Fran\u00e7ais', flag: '\ud83c\uddeb\ud83c\uddf7' },
                        { value: 'en', label: 'English', flag: '\ud83c\uddec\ud83c\udde7' },
                        { value: 'de', label: 'Deutsch', flag: '\ud83c\udde9\ud83c\uddea' },
                        { value: 'es', label: 'Espa\u00f1ol', flag: '\ud83c\uddea\ud83c\uddf8' },
                        { value: 'it', label: 'Italiano', flag: '\ud83c\uddee\ud83c\uddf9' },
                        { value: 'pt', label: 'Portugu\u00eas', flag: '\ud83c\uddf5\ud83c\uddf9' },
                        { value: 'nl', label: 'Nederlands', flag: '\ud83c\uddf3\ud83c\uddf1' },
                        { value: 'pl', label: 'Polski', flag: '\ud83c\uddf5\ud83c\uddf1' },
                      ].map((lang) => (
                        <button
                          key={lang.value}
                          onClick={() => {
                            setLocale(lang.value as Locale)
                            setShowLangMenu(false)
                          }}
                          role="menuitemradio"
                          aria-checked={locale === lang.value}
                          className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                            locale === lang.value
                              ? 'font-semibold'
                              : ''
                          }`}
                          style={{
                            color: locale === lang.value ? '#00f0ff' : '#a0a0b0',
                            background: locale === lang.value ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (locale !== lang.value) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                          }}
                          onMouseLeave={(e) => {
                            if (locale !== lang.value) e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          <span>{lang.flag}</span>
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Controls */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-full transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#f0f0f0',
                  }}
                  aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Thin bottom border */}
        <div style={{ height: '1px', background: 'rgba(0, 240, 255, 0.1)' }} />
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: '#0a0a0f' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-3">
            {navKeys.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-8 text-lg font-bold transition-all rounded-lg ${
                  pathname === item.href
                    ? ''
                    : ''
                }`}
                style={{
                  color: pathname === item.href ? '#00f0ff' : '#f0f0f0',
                  fontFamily: 'var(--font-display), sans-serif',
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}

            {/* Mobile language switcher */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-xs">
              {[
                { value: 'fr', flag: '\ud83c\uddeb\ud83c\uddf7' },
                { value: 'en', flag: '\ud83c\uddec\ud83c\udde7' },
                { value: 'de', flag: '\ud83c\udde9\ud83c\uddea' },
                { value: 'es', flag: '\ud83c\uddea\ud83c\uddf8' },
                { value: 'it', flag: '\ud83c\uddee\ud83c\uddf9' },
                { value: 'pt', flag: '\ud83c\uddf5\ud83c\uddf9' },
                { value: 'nl', flag: '\ud83c\uddf3\ud83c\uddf1' },
                { value: 'pl', flag: '\ud83c\uddf5\ud83c\uddf1' },
              ].map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLocale(lang.value as Locale)}
                  className={`px-3 py-2 rounded-full border transition-all text-lg ${
                    locale === lang.value
                      ? 'border-[#00f0ff] bg-[rgba(0,240,255,0.15)]'
                      : 'border-[#2a2a3e]'
                  }`}
                  aria-label={lang.value.toUpperCase()}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
