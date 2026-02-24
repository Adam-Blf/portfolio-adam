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
    <footer className="bg-surface dark:bg-black/40 pt-12 pb-16">
      <div className="container-apple">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-8 mb-16">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 border-b md:border-b-0 border-black/5 dark:border-white/5 pb-8 md:pb-0 mb-4 md:mb-0">
            <Link href="/" className="inline-block opacity-90 hover:opacity-100 transition-opacity logo-apple">
              <Image
                src="/logo-adam.svg"
                alt="Adam Beloucif"
                width={24}
                height={24}
                className="h-5 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primary text-[12px] font-semibold tracking-tight">Navigation</h4>
            <nav className="flex flex-col gap-2.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-secondary hover:text-primary text-[12px] transition-colors font-normal"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primary text-[12px] font-semibold tracking-tight">Contact</h4>
            <div className="flex flex-col gap-2.5 text-[12px] text-secondary font-normal">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-primary transition-colors">
                Email
              </a>
              <span className="opacity-80">Paris, France</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primary text-[12px] font-semibold tracking-tight">Social</h4>
            <div className="flex flex-col gap-2.5 text-[12px] text-secondary font-normal">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Tagline for larger screens */}
          <div className="hidden lg:flex flex-col gap-4">
            <h4 className="text-primary text-[12px] font-semibold tracking-tight">Vision</h4>
            <p className="text-secondary text-[12px] leading-snug font-normal opacity-80">
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-secondary font-normal opacity-70">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p>
              {t('footer.copyright', { year: currentYear })}
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/60"></span>
              <span className="uppercase tracking-wider">Site Opérationnel</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-default">France</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
