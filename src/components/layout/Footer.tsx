'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import { personalInfo } from '@/lib/data'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useI18n()

  const navItems = [
    { href: '/', key: 'home' },
    { href: '/timeline', key: 'timeline' },
    { href: '/projects', key: 'projects' },
    { href: '/skills', key: 'skills' },
    { href: '/formation', key: 'formation' },
    { href: '/contact', key: 'contact' },
  ]

  return (
    <footer className="bg-background border-t border-black/5 dark:border-white/10 py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6 opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/logo-adam.svg"
                alt="Adam Beloucif"
                width={28}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-secondary text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Navigation</h4>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-secondary hover:text-primary text-sm transition-colors"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-secondary">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                {personalInfo.email}
              </a>
              <span>Paris, France</span>
            </div>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Social</h4>
            <div className="flex flex-col gap-3 text-sm text-secondary">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary font-medium">
          <p>
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="uppercase tracking-widest">Opérationnel</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
