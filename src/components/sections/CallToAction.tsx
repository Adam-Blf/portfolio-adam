'use client'

import Link from 'next/link'
import { Mail, Github, ChevronRight } from 'lucide-react'
import { personalInfo } from '@/lib/data'

interface CallToActionProps {
  variant?: 'default' | 'compact' | 'projects'
}

export default function CallToAction({ variant = 'default' }: CallToActionProps) {
  return (
    <section className="py-24">
      <div className="container-wide">
        <div className="bg-primary rounded-[40px] p-12 md:p-24 text-center text-background">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">
            Collaborons ensemble.
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto mb-12">
            Data Engineering, Machine Learning ou développement Fullstack :
            je suis prêt pour votre prochain défi technique.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="btn-primary !bg-white !text-black hover:!bg-gray-100">
              Me contacter
            </Link>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !text-white hover:underline group"
            >
              Voir mon GitHub <ChevronRight size={20} className="inline ml-1 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
