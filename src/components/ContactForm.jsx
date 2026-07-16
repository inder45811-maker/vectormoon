import { useState } from 'react'
import { motion } from 'framer-motion'

const CONTACT_EMAIL = 'admin@vectormoon.co.uk'
const CONTACT_PHONE = '07341555160'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New enquiry from ${formData.name} — VectorMoon`,
          _template: 'table',
        }),
      })
      if (!res.ok) throw new Error('fail')
      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-cyan mb-3">Get in touch</p>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
          Tell us about your <span className="gradient-text">project</span>
        </h2>
        <p className="text-text-secondary leading-relaxed mb-8">
          Free 15-minute strategy call. Coventry &amp; UK-wide. Custom proposal within 24 hours.
        </p>
        <div className="space-y-4 text-sm">
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-text-secondary hover:text-cyan">
            <span className="text-cyan">✉</span> {CONTACT_EMAIL}
          </a>
          <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-3 text-text-secondary hover:text-cyan">
            <span className="text-cyan">☎</span> {CONTACT_PHONE}
          </a>
          <p className="text-text-secondary">
            <span className="text-cyan mr-2">◎</span>
            Coventry, West Midlands, United Kingdom
          </p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-xl"
      >
        <div className="grid gap-5 sm:grid-cols-2 mb-5">
          <Field label="Name" id="name">
            <input
              id="name"
              required
              value={formData.name}
              disabled={status === 'sending'}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="field-input"
              placeholder="Your name"
            />
          </Field>
          <Field label="Email" id="email">
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              disabled={status === 'sending'}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="field-input"
              placeholder="you@business.com"
            />
          </Field>
        </div>
        <Field label="Message" id="message">
          <textarea
            id="message"
            required
            rows={4}
            value={formData.message}
            disabled={status === 'sending'}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="field-input resize-none"
            placeholder="What do you need building?"
          />
        </Field>

        {status === 'sent' && (
          <p className="mt-4 rounded-xl bg-cyan/10 px-3 py-2 text-center text-sm text-cyan">
            Message sent — we&apos;ll reply within 24 hours.
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 rounded-xl bg-red-500/10 px-3 py-2 text-center text-sm text-red-300">
            Something went wrong. Email us at {CONTACT_EMAIL}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-6 w-full rounded-full bg-cyan py-3.5 text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110 disabled:opacity-70 sm:w-auto sm:px-10"
        >
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Message'}
        </button>
      </motion.form>
    </div>
  )
}

function Field({ label, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-cyan">
        {label}
      </label>
      {children}
    </div>
  )
}
