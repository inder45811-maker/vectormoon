import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { trackLead } from '../utils/analytics'
import { plans, findPlan, formatGBP } from '../data/pricing'

const CONTACT_EMAIL = 'indi@vectormoon.co.uk'
const CONTACT_PHONE = '07341555160'
const CONTACT_PHONE_DISPLAY = '07341 555160'
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

const PACKAGE_OPTIONS = [
  ...plans.map((p) => ({ value: p.id, label: `${p.name} (${p.price})` })),
  { value: 'care', label: 'Care plan for an existing site' },
  { value: 'unsure', label: 'Not sure yet' },
]

const emptyForm = { name: '', email: '', phone: '', website: '', package: '', message: '' }

/**
 * FormSubmit's AJAX endpoint can return HTTP 200 with {"success":"false"}
 * (e.g. form not activated yet), so only an explicit success counts.
 */
export function isFormSubmitSuccess(json) {
  return json != null && String(json.success).toLowerCase() === 'true'
}

export default function ContactForm() {
  const [searchParams] = useSearchParams()
  const planParam = searchParams.get('plan')
  const careParam = searchParams.get('care')
  const scopeParam = searchParams.get('scope')
  const totalParam = searchParams.get('total')

  const initialPackage = useMemo(() => {
    if (planParam === 'care') return 'care'
    return findPlan(planParam)?.id || ''
  }, [planParam])

  const scopeNote = useMemo(() => {
    const parts = []
    if (careParam) parts.push(`Care plan: ${careParam}`)
    if (scopeParam) parts.push(`Add-ons: ${scopeParam.split(',').filter(Boolean).join(', ') || 'none'}`)
    if (totalParam && /^\d+$/.test(totalParam)) parts.push(`Scope builder estimate: ${formatGBP(totalParam)}`)
    return parts.join(' · ')
  }, [careParam, scopeParam, totalParam])

  const [formData, setFormData] = useState({ ...emptyForm, package: initialPackage })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorDetail, setErrorDetail] = useState('')

  const set = (key) => (e) => setFormData((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorDetail('')
    const pkg = PACKAGE_OPTIONS.find((o) => o.value === formData.package)
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not given',
          website: formData.website || 'Not given',
          package: pkg ? pkg.label : 'Not chosen',
          scope_details: scopeNote || 'None',
          message: formData.message,
          page: typeof window !== 'undefined' ? window.location.href : '',
          _subject: `New enquiry from ${formData.name} (VectorMoon)`,
          _replyto: formData.email,
          _template: 'table',
        }),
      })
      let json = null
      try {
        json = await res.json()
      } catch {
        json = null
      }
      if (!res.ok || !isFormSubmitSuccess(json)) {
        setErrorDetail(json?.message ? String(json.message) : `HTTP ${res.status}`)
        throw new Error('not delivered')
      }

      setStatus('sent')
      trackLead({
        formName: 'contact_page_form',
        plan: formData.package || 'general',
        value: findPlan(formData.package)?.priceValue || (totalParam ? Number(totalParam) : 0),
      })
      setFormData({ ...emptyForm })
    } catch {
      setStatus('error')
    }
  }

  const disabled = status === 'sending'

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-cyan/30 bg-cyan/5 p-6 md:p-8 text-center">
        <p className="text-xl font-bold text-white">Thanks, your enquiry has been sent.</p>
        <p className="mt-2 text-sm text-text-secondary">
          Indi will reply within 24 hours (usually sooner). If it&apos;s urgent, call{' '}
          <a href={`tel:${CONTACT_PHONE}`} className="text-cyan underline">{CONTACT_PHONE_DISPLAY}</a>.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-8 backdrop-blur-xl"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" id="cf-name">
          <input id="cf-name" name="name" autoComplete="name" required value={formData.name} disabled={disabled}
            onChange={set('name')} className="field-input" placeholder="Your name" />
        </Field>
        <Field label="Email" id="cf-email">
          <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" required
            value={formData.email} disabled={disabled} onChange={set('email')} className="field-input"
            placeholder="you@business.co.uk" />
        </Field>
        <Field label="Phone (optional)" id="cf-phone">
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={formData.phone}
            disabled={disabled} onChange={set('phone')} className="field-input" placeholder="07…" />
        </Field>
        <Field label="Current website (optional)" id="cf-website">
          <input id="cf-website" name="website" type="text" autoComplete="url" inputMode="url" value={formData.website}
            disabled={disabled} onChange={set('website')} className="field-input" placeholder="yourbusiness.co.uk" />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Package (optional)" id="cf-package">
          <select id="cf-package" name="package" value={formData.package} disabled={disabled}
            onChange={set('package')} className="field-input [&>option]:bg-[#0B1020]">
            <option value="">Choose a package…</option>
            {PACKAGE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        {scopeNote && <p className="mt-2 text-xs text-text-secondary">From the scope builder: {scopeNote}</p>}
      </div>

      <div className="mt-4">
        <Field label="Message" id="cf-message">
          <textarea id="cf-message" name="message" required rows={4} value={formData.message} disabled={disabled}
            onChange={set('message')} className="field-input resize-y"
            placeholder="What does your business do, and what do you need the website to do?" />
        </Field>
      </div>

      {status === 'error' && (
        <div role="alert" className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <p className="font-semibold">Sorry, your message didn&apos;t send.</p>
          <p className="mt-1">
            Please email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> or call{' '}
            <a href={`tel:${CONTACT_PHONE}`} className="underline">{CONTACT_PHONE_DISPLAY}</a>. Your text is still in
            the form so you can copy it.
          </p>
          {errorDetail && <p className="mt-1 text-xs text-red-200/70">({errorDetail})</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 w-full rounded-full bg-cyan py-3.5 text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110 disabled:opacity-70 sm:w-auto sm:px-10"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      <p className="mt-3 text-xs text-text-secondary">
        We only use your details to reply to this enquiry. The form is delivered by FormSubmit. See our{' '}
        <a href="/privacy-policy/" className="text-cyan underline">privacy policy</a>.
      </p>
    </form>
  )
}

function Field({ label, id, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-cyan">
        {label}
      </label>
      {children}
    </div>
  )
}
