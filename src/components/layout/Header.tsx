'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Globe } from 'lucide-react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const pathname = usePathname()
  const langMenuRef = useRef<HTMLDivElement>(null)
  const { locale, setLocale, t } = useI18n()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 nav-glass border-b ${isScrolled ? 'border-black/5 dark:border-white/10' : 'border-transparent'
          }`}
      >
        <div className="container-wide">
          <nav className="flex items-center justify-between h-12 md:h-14">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <Link href="/" className="group flex items-center gap-2">
                <Image
                  src="/logo-adam.svg"
                  alt="Adam Beloucif"
                  width={24}
                  height={24}
                  className="h-5 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navKeys.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-1 text-xs font-medium transition-colors rounded-full ${pathname === item.href
                      ? 'text-primary'
                      : 'text-secondary hover:text-primary'
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
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-secondary hover:text-primary transition-colors"
                  aria-label="Change language"
                >
                  <Globe size={14} />
                  <span className="uppercase">{locale}</span>
                </button>

                {showLangMenu && (
                  <div
                    className="absolute right-0 top-full mt-2 py-2 px-1 rounded-xl shadow-xl bg-surface border border-black/5 dark:border-white/10 min-w-[140px] animate-fadeUp"
                  >
                    {[
                      { value: 'fr', label: 'Français' },
                      { value: 'en', label: 'English' },
                      { value: 'de', label: 'Deutsch' },
                      { value: 'es', label: 'Español' },
                    ].map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => {
                          setLocale(lang.value as Locale)
                          setShowLangMenu(false)
                        }}
                        className={`flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors ${locale === lang.value
                            ? 'bg-black/5 dark:bg-white/10 text-primary font-medium'
                            : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5'
                          }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-primary"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-background pt-20 px-10 animate-fadeUp"
        >
          <div className="flex flex-col gap-6">
            {navKeys.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-semibold tracking-tight ${pathname === item.href ? 'text-cta' : 'text-primary'
                  }`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}

            <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/10 flex flex-wrap gap-4">
              {['fr', 'en', 'de', 'es'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLocale(lang as Locale)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-lg uppercase font-medium ${locale === lang ? 'text-cta' : 'text-secondary'
                    }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
