'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { animate } from 'animejs'
import { ArrowUpRight } from 'lucide-react'
import { personalInfo } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'

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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Input sanitization - strip HTML tags and limit length
  function sanitize(input: string, maxLength: number = 500): string {
    return input
      .replace(/<[^>]*>/g, '') // strip HTML tags
      .replace(/[<>]/g, '')    // strip remaining angle brackets
      .slice(0, maxLength)
  }

  // Email validation
  function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email) && email.length <= 254
  }

  // Form validation
  function validateForm(): boolean {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim() || formState.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }
    if (formState.name.length > 100) {
      newErrors.name = 'Le nom ne peut pas dépasser 100 caractères'
    }

    if (!formState.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!isValidEmail(formState.email.trim())) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formState.subject.trim() || formState.subject.trim().length < 3) {
      newErrors.subject = 'Le sujet doit contenir au moins 3 caractères'
    }
    if (formState.subject.length > 200) {
      newErrors.subject = 'Le sujet ne peut pas dépasser 200 caractères'
    }

    if (!formState.message.trim() || formState.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }
    if (formState.message.length > 5000) {
      newErrors.message = 'Le message ne peut pas dépasser 5000 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    // Sanitize inputs before constructing mailto link
    const cleanName = sanitize(formState.name, 100)
    const cleanEmail = sanitize(formState.email, 254)
    const cleanSubject = sanitize(formState.subject, 200)
    const cleanMessage = sanitize(formState.message, 5000)

    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(`De: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`)}`
    window.location.href = mailtoLink
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
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
      <ErrorBoundary><PageBackground variant="minimal" /></ErrorBoundary>
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
              <h2 className="sr-only">Informations de contact</h2>
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

                <div>
                  <p className="text-caption mb-1">Localisation</p>
                  <p className="text-lg">{personalInfo.location}</p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-caption mb-4">Reseaux</p>
                <div className="flex gap-6">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[--text-secondary] hover:text-accent transition-colors"
                    aria-label="Profil LinkedIn (nouvelle fenetre)"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[--text-secondary] hover:text-accent transition-colors"
                    aria-label="Profil GitHub (nouvelle fenetre)"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form" style={{ opacity: 0 }} aria-live="polite">
              <h2 className="sr-only">Formulaire de contact</h2>
              {isSubmitted ? (
                <div className="border border-[--border] p-8 text-center" role="status" aria-live="assertive">
                  <p className="text-title mb-2">Message pret a envoyer</p>
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
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      autoComplete="name"
                      maxLength={100}
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-transparent border ${errors.name ? 'border-red-500' : 'border-[--border]'} text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors rounded-sm`}
                      placeholder="Votre nom"
                    />
                    {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name}</p>}
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
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      autoComplete="email"
                      maxLength={254}
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-transparent border ${errors.email ? 'border-red-500' : 'border-[--border]'} text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors rounded-sm`}
                      placeholder="votre@email.com"
                    />
                    {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>}
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
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      maxLength={200}
                      value={formState.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-transparent border ${errors.subject ? 'border-red-500' : 'border-[--border]'} text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors rounded-sm`}
                      placeholder="Objet de votre message"
                    />
                    {errors.subject && <p id="subject-error" className="text-red-500 text-sm mt-1" role="alert">{errors.subject}</p>}
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
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      rows={5}
                      maxLength={5000}
                      value={formState.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-transparent border ${errors.message ? 'border-red-500' : 'border-[--border]'} text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-accent transition-colors resize-none rounded-sm`}
                      placeholder="Votre message..."
                    />
                    {errors.message && <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message}</p>}
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
