'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

export default function MinimalProHero() {
  const { t } = useI18n()

  return (
    <section className="pt-32 pb-24 md:pt-48 md:pb-32 bg-white dark:bg-black overflow-hidden relative">
      <div className="container-apple text-center relative z-10">
        <div className="animate-apple-reveal">
          {/* Profile Photo - Apple Style minimal circle */}
          <div className="flex justify-center mb-10">
            <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border border-black/5 dark:border-white/10 shadow-sm">
              <Image
                src="/images/adam-photo.jpg"
                alt="Adam Beloucif"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <h1 className="text-apple-hero mt-1 tracking-tight">
            ADAM BELOUCIF
          </h1>

          <p className="text-2xl md:text-3xl font-medium text-secondary max-w-3xl mx-auto mt-[6px] mb-0">
            {t('hero.role')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-[19px]">
            <Link href="/projects" className="btn-apple-primary">
              {t('hero.exploreProjects')}
            </Link>
            <Link href="/contact" className="btn-apple-secondary">
              {t('hero.getInTouch')} <span className="ml-1 opacity-70">›</span>
            </Link>
          </div>

          {/* Availability badge - Apple minimalist style */}
          <div className="mt-16 flex items-center justify-center gap-3 text-sm font-medium text-secondary opacity-80">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="uppercase tracking-[0.2em] text-[10px] sm:text-xs">
              {t('hero.status')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
