'use client'

import { useState } from 'react'
import { Mail, Github, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react'
import { personalInfo } from '@/lib/data'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useI18n } from '@/lib/i18n'

export default function Contact() {
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
      <main className="pt-32 pb-24" style={{ backgroundColor: 'var(--bg-deep)' }}>
        <div className="container-wide">

          {/* Header */}
          <div className="mb-16 text-center">
            <h1
              className="text-5xl md:text-6xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Contact
            </h1>
            <p
              className="text-lg md:text-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Un projet en tête ? Discutons-en.
            </p>
          </div>

          {/* Two-column layout: form left, contact info right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">

            {/* Left: Form */}
            <div className="lg:col-span-3" aria-live="polite">
              {isSubmitted ? (
                <div
                  className="rounded-lg p-12 text-center"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  role="status"
                  aria-live="assertive"
                >
                  <CheckCircle
                    size={64}
                    className="mx-auto mb-6"
                    style={{ color: '#E50914' }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-2xl font-bold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {t('contact.form.success')}
                  </p>
                  <p
                    className="mb-8"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {t('contact.form.sending')}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3 rounded font-bold text-white transition-colors duration-200 cursor-pointer"
                    style={{ backgroundColor: '#E50914' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b20710')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E50914')}
                  >
                    {t('contact.form.send')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {t('contact.form.name')} <span style={{ color: '#E50914' }} aria-hidden="true">*</span>
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
                      className="w-full px-4 py-3 rounded text-white placeholder:text-gray-500 outline-none transition-colors duration-200"
                      style={{
                        backgroundColor: '#1a1a1a',
                        border: errors.name ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => { if (!errors.name) e.currentTarget.style.borderColor = '#E50914' }}
                      onBlur={(e) => { if (!errors.name) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                    />
                    {errors.name && <p id="name-error" className="text-sm mt-1" style={{ color: '#E50914' }} role="alert">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {t('contact.form.email')} <span style={{ color: '#E50914' }} aria-hidden="true">*</span>
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
                      className="w-full px-4 py-3 rounded text-white placeholder:text-gray-500 outline-none transition-colors duration-200"
                      style={{
                        backgroundColor: '#1a1a1a',
                        border: errors.email ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => { if (!errors.email) e.currentTarget.style.borderColor = '#E50914' }}
                      onBlur={(e) => { if (!errors.email) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                    />
                    {errors.email && <p id="email-error" className="text-sm mt-1" style={{ color: '#E50914' }} role="alert">{errors.email}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {t('contact.form.subject')} <span style={{ color: '#E50914' }} aria-hidden="true">*</span>
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
                      className="w-full px-4 py-3 rounded text-white placeholder:text-gray-500 outline-none transition-colors duration-200"
                      style={{
                        backgroundColor: '#1a1a1a',
                        border: errors.subject ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => { if (!errors.subject) e.currentTarget.style.borderColor = '#E50914' }}
                      onBlur={(e) => { if (!errors.subject) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                    />
                    {errors.subject && <p id="subject-error" className="text-sm mt-1" style={{ color: '#E50914' }} role="alert">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {t('contact.form.message')} <span style={{ color: '#E50914' }} aria-hidden="true">*</span>
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
                      className="w-full px-4 py-3 rounded text-white placeholder:text-gray-500 outline-none transition-colors duration-200 resize-none"
                      style={{
                        backgroundColor: '#1a1a1a',
                        border: errors.message ? '1px solid #E50914' : '1px solid rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => { if (!errors.message) e.currentTarget.style.borderColor = '#E50914' }}
                      onBlur={(e) => { if (!errors.message) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                    />
                    {errors.message && <p id="message-error" className="text-sm mt-1" style={{ color: '#E50914' }} role="alert">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded font-bold text-white text-lg flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer"
                    style={{ backgroundColor: '#E50914' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b20710')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E50914')}
                  >
                    <Send size={18} aria-hidden="true" />
                    {t('contact.form.send')}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact Info */}
            <div className="lg:col-span-2">
              <div
                className="rounded-lg p-8 space-y-6"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <h2
                  className="text-xl font-bold mb-6"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t('contact.info')}
                </h2>

                {contactItems.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <div className="flex items-center gap-4 group">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                        style={{ backgroundColor: 'rgba(229,9,20,0.1)' }}
                      >
                        <Icon
                          size={20}
                          className="transition-colors duration-200"
                          style={{ color: '#E50914' }}
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p
                          className="text-xs uppercase tracking-wider mb-0.5"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-medium transition-colors duration-200 group-hover:text-[#E50914]"
                          style={{ color: 'var(--text-primary)' }}
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
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  )
}
