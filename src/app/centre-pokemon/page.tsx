'use client'

import { useState } from 'react'
import { Mail, Github, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react'
import { personalInfo } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useI18n } from '@/lib/i18n'

export default function CentrePokemon() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { t } = useI18n()

  function sanitize(input: string, maxLength: number = 500): string {
    return input
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, '')
      .slice(0, maxLength)
  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email) && email.length <= 254
  }

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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const contactItems = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      external: false,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'Adam-Blf',
      href: personalInfo.github,
      external: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'adambeloucif',
      href: personalInfo.linkedin,
      external: true,
    },
    {
      icon: MapPin,
      label: t('contact.location'),
      value: personalInfo.location,
      href: undefined,
      external: false,
    },
  ]

  return (
    <ErrorBoundary>
      <main className="pt-32 pb-24" style={{ background: 'var(--pokedex-white, #F5F5F5)' }}>
        <div className="container-wide">

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-4xl">✚</span>
            </div>
            <h1
              className="font-black tracking-wider leading-none"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                color: 'var(--pokedex-red, #DC0A2D)',
                textShadow: '2px 2px 0 var(--pokedex-red-dark, #A00020), 4px 4px 0 rgba(0,0,0,0.1)',
                fontFamily: 'var(--font-mono, monospace)',
                letterSpacing: '0.1em',
              }}
            >
              CENTRE POKÉMON
            </h1>
            <p className="mt-3 text-sm" style={{ color: '#666', fontFamily: 'monospace' }}>
              Soignez votre projet ici
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

            {/* Left: Form (Pokédex screen input style) */}
            <div className="lg:col-span-3" aria-live="polite">
              {isSubmitted ? (
                <div
                  className="pokedex-screen rounded-xl p-10 text-center"
                  style={{
                    background: 'var(--pokedex-screen, #98CB98)',
                    border: '3px solid #7baa7b',
                    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  role="status"
                  aria-live="assertive"
                >
                  <CheckCircle
                    size={64}
                    className="mx-auto mb-6"
                    style={{ color: 'var(--pokedex-dark, #333)' }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-xl font-black uppercase mb-3"
                    style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace' }}
                  >
                    {t('contact.form.success')}
                  </p>
                  <p
                    className="mb-8 text-sm"
                    style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace', opacity: 0.8 }}
                  >
                    {t('contact.form.sending')}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="pokedex-button px-8 py-3 rounded-full font-bold text-white uppercase tracking-wider transition-all duration-200 cursor-pointer"
                    style={{
                      background: 'var(--pokedex-red, #DC0A2D)',
                      border: '3px solid var(--pokedex-red-dark, #A00020)',
                    }}
                  >
                    {t('contact.form.send')}
                  </button>
                </div>
              ) : (
                <div
                  className="rounded-xl p-6"
                  style={{
                    background: 'var(--pokedex-dark, #333)',
                    border: '3px solid #222',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pokedex-green-led, #00FF41)', fontFamily: 'monospace' }}
                      >
                        {t('contact.form.name')} <span style={{ color: 'var(--pokedex-red, #DC0A2D)' }} aria-hidden="true">*</span>
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
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
                        style={{
                          background: '#1a1a1a',
                          color: 'var(--pokedex-green-led, #00FF41)',
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          border: errors.name ? '2px solid var(--pokedex-red, #DC0A2D)' : '2px solid #444',
                          caretColor: 'var(--pokedex-green-led, #00FF41)',
                        }}
                      />
                      {errors.name && <p id="name-error" className="text-xs mt-1 font-bold" style={{ color: 'var(--pokedex-red, #DC0A2D)', fontFamily: 'monospace' }} role="alert">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pokedex-screen-blue, #30A7D7)', fontFamily: 'monospace' }}
                      >
                        {t('contact.form.email')} <span style={{ color: 'var(--pokedex-red, #DC0A2D)' }} aria-hidden="true">*</span>
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
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
                        style={{
                          background: '#1a1a1a',
                          color: 'var(--pokedex-screen-blue, #30A7D7)',
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          border: errors.email ? '2px solid var(--pokedex-red, #DC0A2D)' : '2px solid #444',
                          caretColor: 'var(--pokedex-screen-blue, #30A7D7)',
                        }}
                      />
                      {errors.email && <p id="email-error" className="text-xs mt-1 font-bold" style={{ color: 'var(--pokedex-red, #DC0A2D)', fontFamily: 'monospace' }} role="alert">{errors.email}</p>}
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pokedex-green-led, #00FF41)', fontFamily: 'monospace' }}
                      >
                        {t('contact.form.subject')} <span style={{ color: 'var(--pokedex-red, #DC0A2D)' }} aria-hidden="true">*</span>
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
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200"
                        style={{
                          background: '#1a1a1a',
                          color: 'var(--pokedex-green-led, #00FF41)',
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          border: errors.subject ? '2px solid var(--pokedex-red, #DC0A2D)' : '2px solid #444',
                          caretColor: 'var(--pokedex-green-led, #00FF41)',
                        }}
                      />
                      {errors.subject && <p id="subject-error" className="text-xs mt-1 font-bold" style={{ color: 'var(--pokedex-red, #DC0A2D)', fontFamily: 'monospace' }} role="alert">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--pokedex-screen-blue, #30A7D7)', fontFamily: 'monospace' }}
                      >
                        {t('contact.form.message')} <span style={{ color: 'var(--pokedex-red, #DC0A2D)' }} aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        rows={6}
                        maxLength={5000}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200 resize-none"
                        style={{
                          background: '#1a1a1a',
                          color: 'var(--pokedex-screen-blue, #30A7D7)',
                          fontFamily: 'monospace',
                          fontSize: '14px',
                          border: errors.message ? '2px solid var(--pokedex-red, #DC0A2D)' : '2px solid #444',
                          caretColor: 'var(--pokedex-screen-blue, #30A7D7)',
                        }}
                      />
                      {errors.message && <p id="message-error" className="text-xs mt-1 font-bold" style={{ color: 'var(--pokedex-red, #DC0A2D)', fontFamily: 'monospace' }} role="alert">{errors.message}</p>}
                    </div>

                    {/* Submit: Big red Pokédex button */}
                    <button
                      type="submit"
                      className="pokedex-button w-full py-4 rounded-full font-black text-white text-lg uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer"
                      style={{
                        background: 'var(--pokedex-red, #DC0A2D)',
                        border: '3px solid var(--pokedex-red-dark, #A00020)',
                        boxShadow: '0 4px 0 var(--pokedex-red-dark, #A00020), 0 6px 12px rgba(0,0,0,0.3)',
                      }}
                    >
                      <Send size={18} aria-hidden="true" />
                      ENVOYER
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Right: INFIRMIÈRE JOËLLE info card */}
            <div className="lg:col-span-2">
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: '#fff',
                  border: '3px solid var(--pokedex-red, #DC0A2D)',
                  boxShadow: '0 4px 16px rgba(220,10,45,0.1)',
                }}
              >
                {/* Card header */}
                <div
                  className="px-5 py-3"
                  style={{ background: 'var(--pokedex-red, #DC0A2D)' }}
                >
                  <h2
                    className="text-sm font-black uppercase tracking-wider"
                    style={{ color: '#fff', fontFamily: 'monospace' }}
                  >
                    INFIRMIÈRE JOËLLE
                  </h2>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {t('contact.info')}
                  </p>
                </div>

                {/* Data entries */}
                <div className="p-5 space-y-4">
                  {contactItems.map((item) => {
                    const Icon = item.icon
                    const content = (
                      <div className="flex items-start gap-3 group">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: '#FFF0F0', border: '2px solid #FFD0D0' }}
                        >
                          <Icon size={16} style={{ color: 'var(--pokedex-red, #DC0A2D)' }} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                            style={{ color: '#999', fontFamily: 'monospace' }}
                          >
                            {item.label}
                          </p>
                          <p
                            className="text-sm font-semibold transition-colors duration-200 group-hover:text-[--pokedex-red] truncate"
                            style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace' }}
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )

                    if (item.href) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          className="block"
                          aria-label={item.external ? `${item.label} - ouvre dans un nouvel onglet` : item.label}
                        >
                          {content}
                        </a>
                      )
                    }

                    return (
                      <div key={item.label}>
                        {content}
                      </div>
                    )
                  })}
                </div>

                {/* Bottom decoration */}
                <div className="px-5 pb-4">
                  <div
                    className="pokedex-screen rounded-lg p-3 text-center"
                    style={{
                      background: 'var(--pokedex-screen, #98CB98)',
                      border: '2px solid #7baa7b',
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase" style={{ color: 'var(--pokedex-dark, #333)', fontFamily: 'monospace' }}>
                      ♪ Bienvenue au Centre Pokémon ♪
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  )
}
