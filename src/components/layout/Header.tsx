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
        style={{ background: 'var(--pokedex-red)' }}
      >
        {/* Top Pokedex bar */}
        <div
          className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <div className="container-wide">
            <nav className="flex items-center justify-between">
              {/* Left: Big blue LED + small LEDs */}
              <div className="flex items-center gap-3">
                {/* Big blue lens LED */}
                <div
                  className="pokedex-led pokedex-led-blue flex-shrink-0"
                  style={{ width: 40, height: 40 }}
                  aria-hidden="true"
                />

                {/* Three small LEDs */}
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <div className="pokedex-led pokedex-led-red" style={{ width: 10, height: 10 }} />
                  <div className="pokedex-led pokedex-led-yellow" style={{ width: 10, height: 10 }} />
                  <div className="pokedex-led pokedex-led-green" style={{ width: 10, height: 10 }} />
                </div>

                {/* Logo / POKÉDEX text */}
                <Link href="/" className="group flex items-center gap-2 ml-3">
                  <Image
                    src="/logo-adam.svg"
                    alt="Adam Beloucif"
                    width={32}
                    height={32}
                    className="h-7 w-auto md:h-8 transition-transform group-hover:scale-105 brightness-0 invert"
                  />
                  <span
                    className="hidden sm:inline text-sm md:text-base font-bold tracking-widest uppercase"
                    style={{ color: 'var(--pokedex-white)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  >
                    Portfolio
                  </span>
                </Link>
              </div>

              {/* Desktop Nav: round Pokedex buttons */}
              <div className="hidden md:flex items-center gap-2 lg:gap-3">
                {navKeys.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`pokedex-button text-xs relative ${
                      pathname === item.href
                        ? 'nav-link-active !bg-white !text-[--pokedex-red] font-bold'
                        : ''
                    }`}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                ))}

                {/* Language Switcher */}
                <div className="relative ml-2" ref={langMenuRef}>
                  <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="pokedex-button text-xs flex items-center gap-1"
                    aria-label="Change language"
                  >
                    <span style={{ fontSize: '14px' }}>🌐</span>
                    <span className="uppercase">{locale}</span>
                  </button>

                  {showLangMenu && (
                    <div
                      role="menu"
                      aria-label="Language selection"
                      className="absolute right-0 top-full mt-2 py-2 px-1 rounded-xl shadow-lg min-w-[150px] max-h-[300px] overflow-y-auto"
                      style={{
                        background: '#FFFFFF',
                        border: '2px solid var(--pokedex-gray)',
                      }}
                    >
                      {[
                        { value: 'fr', label: 'Français', flag: '🇫🇷' },
                        { value: 'en', label: 'English', flag: '🇬🇧' },
                        { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
                        { value: 'es', label: 'Español', flag: '🇪🇸' },
                        { value: 'it', label: 'Italiano', flag: '🇮🇹' },
                        { value: 'pt', label: 'Português', flag: '🇵🇹' },
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
                          className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                            locale === lang.value
                              ? 'bg-red-50 text-[--pokedex-red] font-semibold'
                              : 'text-[--pokedex-dark] hover:bg-gray-100'
                          }`}
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
                    background: 'rgba(255,255,255,0.15)',
                    color: 'var(--pokedex-white)',
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

        {/* Hinge line at bottom of header */}
        <div className="pokedex-hinge" />
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
          style={{ background: 'var(--pokedex-red)' }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-4">
            {/* LEDs decoration */}
            <div className="flex items-center gap-2 mb-4" aria-hidden="true">
              <div className="pokedex-led pokedex-led-blue" style={{ width: 32, height: 32 }} />
              <div className="pokedex-led pokedex-led-red" style={{ width: 10, height: 10 }} />
              <div className="pokedex-led pokedex-led-yellow" style={{ width: 10, height: 10 }} />
              <div className="pokedex-led pokedex-led-green" style={{ width: 10, height: 10 }} />
            </div>

            {/* Nav as Pokedex screen */}
            <div
              className="pokedex-screen p-6 w-72"
              style={{ animation: 'screen-on 0.5s ease-out' }}
            >
              {navKeys.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 text-lg font-bold transition-all rounded-lg mb-1 ${
                    pathname === item.href
                      ? 'bg-[--pokedex-screen-dark] text-[--pokedex-dark]'
                      : 'text-[--pokedex-dark] hover:bg-[--pokedex-screen-dark]'
                  }`}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <span className="pokedex-entry-number mr-2">{String(index + 1).padStart(3, '0')}</span>
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </div>

            {/* Mobile language switcher */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-xs">
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
                  className={`px-3 py-2 rounded-full border-2 transition-all text-lg ${
                    locale === lang.value
                      ? 'border-white bg-white/20'
                      : 'border-white/30'
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
