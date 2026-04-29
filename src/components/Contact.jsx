import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const CONTACT_EMAIL = 'inder45811@gmail.com'
const CONTACT_PHONE = '07341555160'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New enquiry from ${formData.name} — VectorMoon`,
          _template: 'table',
        }),
      })

      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Failed to send')
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const bookCallMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Booking a Free Strategy Call — VectorMoon')}&body=${encodeURIComponent("Hi VectorMoon,\n\nI'd like to book a free 15-minute strategy call.\n\nHere's a bit about my project:\n\n[Tell us about your project, goals, and timeline]\n\nLooking forward to hearing from you!\n\nBest regards,\n[Your Name]")}`

  return (
    <section
      id="contact"
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #132A5E 0%, #0B1020 100%)' }}
    >
      {/* Aurora-like orbs */}
      <div className="cosmic-orb" style={{
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0,198,255,0.12) 0%, rgba(123,97,255,0.08) 40%, transparent 70%)',
        top: '-20%', left: '20%',
      }}/>
      <div className="cosmic-orb" style={{
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(61,90,254,0.1) 0%, transparent 70%)',
        bottom: '10%', right: '-5%',
      }}/>

      <div className="relative z-10 max-w-[800px] mx-auto text-center">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6">
            Ready to <span className="gradient-text-purple">launch?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[550px] mx-auto mb-8">
            Book a free 15-minute call. We'll talk through your goals and send a custom proposal within 24 hours.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href={bookCallMailto}
              className="px-8 py-3.5 rounded-full bg-cyan text-void font-semibold text-base hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-[var(--shadow-glow-cyan)]"
              id="contact-cta"
            >
              Book Your Free Call
            </a>
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
              <span className="text-text-secondary">
                Or email us:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-cyan hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </span>
              <span className="hidden sm:inline text-text-muted">|</span>
              <span className="text-text-secondary">
                Call:{' '}
                <a href={`tel:${CONTACT_PHONE}`} className="text-cyan hover:underline">
                  {CONTACT_PHONE}
                </a>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 md:p-10 text-left"
          style={{ background: 'rgba(22,27,43,0.6)', backdropFilter: 'blur(32px)' }}
          id="contact-form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium tracking-[0.1em] uppercase text-cyan mb-2">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={status === 'sending'}
                className="w-full bg-transparent border-b border-[rgba(61,72,79,0.3)] focus:border-cyan text-white py-3 text-sm outline-none transition-colors placeholder:text-text-muted disabled:opacity-50"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium tracking-[0.1em] uppercase text-cyan mb-2">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={status === 'sending'}
                className="w-full bg-transparent border-b border-[rgba(61,72,79,0.3)] focus:border-cyan text-white py-3 text-sm outline-none transition-colors placeholder:text-text-muted disabled:opacity-50"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="contact-message" className="block text-xs font-medium tracking-[0.1em] uppercase text-cyan mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              required
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-[rgba(61,72,79,0.3)] focus:border-cyan text-white py-3 text-sm outline-none transition-colors resize-none placeholder:text-text-muted disabled:opacity-50"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* Status messages */}
          {status === 'sent' && (
            <div className="mb-4 p-3 rounded-xl bg-[rgba(0,198,255,0.1)] text-cyan text-sm font-medium text-center">
              ✓ Message sent successfully! We'll get back to you within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-4 p-3 rounded-xl bg-[rgba(255,91,91,0.1)] text-[#ff5b5b] text-sm font-medium text-center">
              Something went wrong. Please try again or email us directly at {CONTACT_EMAIL}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-cyan text-void font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-[var(--shadow-glow-cyan)] disabled:opacity-70 disabled:cursor-not-allowed"
            id="contact-submit"
          >
            {status === 'sending' ? (
              <span className="flex items-center gap-2 justify-center">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Sending...
              </span>
            ) : status === 'sent' ? '✓ Sent!' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
