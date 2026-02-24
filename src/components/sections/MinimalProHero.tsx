'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

export default function MinimalProHero() {
  const { t } = useI18n()

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container-wide text-center">
        <div className="animate-fadeUp">
          {/* Profile Photo - Apple Style subtle circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-black/5 dark:border-white/10 shadow-sm">
              <Image
                src="/images/adam-photo.jpg"
                alt="Adam Beloucif"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <h1 className="text-hero mb-4">
            ADAM BELOUCIF
          </h1>

          <p className="text-xl md:text-2xl font-medium text-secondary max-w-2xl mx-auto mb-10">
            {t('hero.role')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/projects" className="btn-primary">
              {t('hero.exploreProjects')}
            </Link>
            <Link href="/contact" className="btn-secondary">
              {t('hero.getInTouch')}{' '}
              <span className="text-xl">→</span>
            </Link>
          </div>

          {/* Availability badge - Apple subtle style */}
          <div className="mt-12 flex items-center justify-center gap-2 text-sm font-medium text-secondary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="uppercase tracking-widest text-xs">
              {t('hero.status')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
