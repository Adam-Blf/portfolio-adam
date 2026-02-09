'use client'

import { useState } from 'react'
import { Mail, Github, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react'
import { personalInfo } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useI18n } from '@/lib/i18n'

export default function ContactPage() {
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
      newErrors.name = 'Le nom doit contenir au moins 2 caracteres'
    }
    if (formState.name.length > 100) {
      newErrors.name = 'Le nom ne peut pas depasser 100 caracteres'
    }

    if (!formState.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!isValidEmail(formState.email.trim())) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formState.subject.trim() || formState.subject.trim().length < 3) {
      newErrors.subject = 'Le sujet doit contenir au moins 3 caracteres'
    }
    if (formState.subject.length > 200) {
      newErrors.subject = 'Le sujet ne peut pas depasser 200 caracteres'
    }

    if (!formState.message.trim() || formState.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caracteres'
    }
    if (formState.message.length > 5000) {
      newErrors.message = 'Le message ne peut pas depasser 5000 caracteres'
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

  const inputStyle = (hasError: boolean) => ({
    background: 'var(--bg-surface, #12121a)',
    color: 'var(--text-primary, #f0f0f0)',
    fontFamily: 'monospace',
    fontSize: '14px',
    border: hasError ? '1px solid #ef4444' : '1px solid var(--border, #2a2a3e)',
    caretColor: 'var(--accent-cyan, #00f0ff)',
  })

  return (
    <ErrorBoundary>
      <main className="min-h-screen pt-28 pb-20" style={{ background: 'var(--bg-deep, #0a0a0f)' }}>
        <div className="container-wide">

          {/* Header */}
          <div className="mb-12 text-center">
            <h1
              className="text-2xl md:text-3xl font-bold tracking-widest uppercase"
              style={{ color: 'var(--text-primary, #f0f0f0)' }}
            >
              CONTACT
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary, #a0a0b0)' }}>
              Contactez-moi ici
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

            {/* Left: Form */}
            <div className="lg:col-span-3" aria-live="polite">
              {isSubmitted ? (
                <div
                  className="rounded-2xl p-10 text-center"
                  role="status"
                  aria-live="assertive"
                  style={{
                    background: 'rgba(26,26,46,0.85)',
                    border: '1px solid var(--border, #2a2a3e)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <CheckCircle
                    size={64}
                    className="mx-auto mb-6"
                    style={{ color: 'var(--accent-cyan, #00f0ff)' }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-xl font-black uppercase mb-3"
                    style={{ color: 'var(--text-primary, #f0f0f0)', fontFamily: 'monospace' }}
                  >
                    {t('contact.form.success')}
                  </p>
                  <p
                    className="mb-8 text-sm"
                    style={{ color: 'var(--text-secondary, #a0a0b0)', fontFamily: 'monospace' }}
                  >
                    {t('contact.form.sending')}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 rounded-full font-bold text-white uppercase tracking-wider transition-all duration-200 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-cyan, #00f0ff), var(--accent-violet, #8b5cf6))',
                    }}
                  >
                    {t('contact.form.send')}
                  </button>
                </div>
              ) : (
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: 'rgba(26,26,46,0.85)',
                    border: '1px solid var(--border, #2a2a3e)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--text-secondary, #a0a0b0)', fontFamily: 'monospace' }}
                      >
                        {t('contact.form.name')} <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>
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
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200 focus:border-[--accent-cyan]"
                        style={inputStyle(!!errors.name)}
                      />
                      {errors.name && <p id="name-error" className="text-xs mt-1 font-bold" style={{ color: '#ef4444', fontFamily: 'monospace' }} role="alert">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--text-secondary, #a0a0b0)', fontFamily: 'monospace' }}
                      >
                        {t('contact.form.email')} <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>
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
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200 focus:border-[--accent-cyan]"
                        style={inputStyle(!!errors.email)}
                      />
                      {errors.email && <p id="email-error" className="text-xs mt-1 font-bold" style={{ color: '#ef4444', fontFamily: 'monospace' }} role="alert">{errors.email}</p>}
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--text-secondary, #a0a0b0)', fontFamily: 'monospace' }}
                      >
                        {t('contact.form.subject')} <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>
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
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200 focus:border-[--accent-cyan]"
                        style={inputStyle(!!errors.subject)}
                      />
                      {errors.subject && <p id="subject-error" className="text-xs mt-1 font-bold" style={{ color: '#ef4444', fontFamily: 'monospace' }} role="alert">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider mb-2"
                        style={{ color: 'var(--text-secondary, #a0a0b0)', fontFamily: 'monospace' }}
                      >
                        {t('contact.form.message')} <span style={{ color: '#ef4444' }} aria-hidden="true">*</span>
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
                        className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-200 resize-none focus:border-[--accent-cyan]"
                        style={inputStyle(!!errors.message)}
                      />
                      {errors.message && <p id="message-error" className="text-xs mt-1 font-bold" style={{ color: '#ef4444', fontFamily: 'monospace' }} role="alert">{errors.message}</p>}
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full font-black text-white text-lg uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer hover:opacity-90"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent-cyan, #00f0ff), var(--accent-violet, #8b5cf6))',
                      }}
                    >
                      <Send size={18} aria-hidden="true" />
                      ENVOYER
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Right: Contact info card */}
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(26,26,46,0.85)',
                  border: '1px solid var(--border, #2a2a3e)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Card header */}
                <div className="px-5 py-4">
                  <h2
                    className="text-sm font-black uppercase tracking-wider"
                    style={{ color: 'var(--text-primary, #f0f0f0)', fontFamily: 'monospace' }}
                  >
                    CONTACT
                  </h2>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted, #606070)' }}>
                    {t('contact.info')}
                  </p>
                </div>

                {/* Data entries */}
                <div className="px-5 pb-5 space-y-4">
                  {contactItems.map((item) => {
                    const Icon = item.icon
                    const content = (
                      <div className="flex items-start gap-3 group">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.2)' }}
                        >
                          <Icon size={16} style={{ color: 'var(--accent-cyan, #00f0ff)' }} aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                            style={{ color: 'var(--text-muted, #606070)', fontFamily: 'monospace' }}
                          >
                            {item.label}
                          </p>
                          <p
                            className="text-sm font-semibold transition-colors duration-200 truncate"
                            style={{ color: 'var(--text-primary, #f0f0f0)', fontFamily: 'monospace' }}
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

                {/* Bottom message */}
                <div className="px-5 pb-4">
                  <div
                    className="rounded-lg p-3 text-center"
                    style={{ background: 'var(--bg-surface, #12121a)', border: '1px solid var(--border, #2a2a3e)' }}
                  >
                    <p className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted, #606070)', fontFamily: 'monospace' }}>
                      Bienvenue, contactez-moi
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
