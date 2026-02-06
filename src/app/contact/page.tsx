'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { animate } from 'animejs'
import { ArrowUpRight } from 'lucide-react'
import { personalInfo } from '@/lib/data'

const PageBackground = dynamic(() => import('@/components/three/PageBackground'), {
  ssr: false,
  loading: () => null,
})

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`De: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}`
    window.location.href = mailtoLink
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Animations
  useEffect(() => {
    const header = headerRef.current
    const content = contentRef.current

    if (header) {
      const caption = header.querySelector('.page-caption')
      const title = header.querySelector('.page-title')
      const description = header.querySelector('.page-description')

      if (caption) {
        animate(caption, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        })
      }

      if (title) {
        animate(title, {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 100,
        })
      }

      if (description) {
        animate(description, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 200,
        })
      }
    }

    if (content) {
      const contactInfo = content.querySelector('.contact-info')
      const contactForm = content.querySelector('.contact-form')

      if (contactInfo) {
        animate(contactInfo, {
          translateX: [-30, 0],
          opacity: [0, 1],
          duration: 700,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 300,
        })
      }

      if (contactForm) {
        animate(contactForm, {
          translateX: [30, 0],
          opacity: [0, 1],
          duration: 700,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
          delay: 400,
        })
      }
    }
  }, [])

  return (
    <>
      <PageBackground variant="minimal" />
      <main className="pt-32 pb-24">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div ref={headerRef} className="mb-16">
            <p className="page-caption text-caption mb-4" style={{ opacity: 0 }}>Contact</p>
            <h1 className="page-title text-display mb-6" style={{ opacity: 0 }}>
              Travaillons<br />ensemble
            </h1>
            <p className="page-description text-body max-w-xl" style={{ opacity: 0 }}>
              Intéressé par une collaboration ou une opportunité ?
              N'hésitez pas à me contacter.
            </p>
          </div>

          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Info */}
            <div className="contact-info" style={{ opacity: 0 }}>
              <div className="space-y-8 mb-12">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="block group"
                >
                  <p className="text-caption mb-1">Email</p>
                  <p className="text-lg group-hover:text-accent transition-colors">
                    {personalInfo.email}
                  </p>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="block group"
                >
                  <p className="text-caption mb-1">Téléphone</p>
                  <p className="text-lg group-hover:text-accent transition-colors">
                    {personalInfo.phone}
                  </p>
                </a>

                <div>
                  <p className="text-caption mb-1">Localisation</p>
                  <p className="text-lg">{personalInfo.location}</p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-caption mb-4">Réseaux</p>
                <div className="flex gap-6">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[--text-secondary] hover:text-accent transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} />
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[--text-secondary] hover:text-accent transition-colors"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form" style={{ opacity: 0 }}>
              {isSubmitted ? (
                <div className="border border-[--border] p-8 text-center">
                  <p className="text-title mb-2">Message prêt à envoyer</p>
                  <p className="text-[--text-secondary] mb-6">
                    Votre client email va s'ouvrir pour finaliser l'envoi.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-accent hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-caption mb-2">
                      Nom complet <span className="text-accent" aria-hidden="true">*</span>
                      <span className="sr-only">(requis)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      autoComplete="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-[--border] text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors rounded-sm"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-caption mb-2">
                      Email <span className="text-accent" aria-hidden="true">*</span>
                      <span className="sr-only">(requis)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-[--border] text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors rounded-sm"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-caption mb-2">
                      Sujet <span className="text-accent" aria-hidden="true">*</span>
                      <span className="sr-only">(requis)</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      aria-required="true"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-[--border] text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors rounded-sm"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-caption mb-2">
                      Message <span className="text-accent" aria-hidden="true">*</span>
                      <span className="sr-only">(requis)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      aria-required="true"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-[--border] text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors resize-none rounded-sm"
                      placeholder="Votre message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full justify-center"
                  >
                    Envoyer le message
                    <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
