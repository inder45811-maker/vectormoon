import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, setConsent } from '../utils/consent'

/**
 * Minimal UK GDPR/PECR banner. Equal-weight Accept / Reject, nothing
 * non-essential loads until Accept. Re-openable from the footer.
 * Rendered only after mount, so it never appears in prerendered HTML.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (window.__VM_PRERENDER__) return undefined
    if (!getConsent()) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener('vm-open-consent', reopen)
    return () => window.removeEventListener('vm-open-consent', reopen)
  }, [])

  if (!open) return null

  const choose = (value) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie choices"
      className="fixed inset-x-3 bottom-[4.5rem] z-[60] mx-auto max-w-[640px] rounded-2xl border border-white/15 bg-[#0d1426]/95 p-4 text-sm text-text-secondary shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-auto"
    >
      <p className="leading-relaxed">
        Can we use cookies for <strong className="text-white">Google Analytics</strong> and{' '}
        <strong className="text-white">Google Ads</strong> (to see which pages bring enquiries) and for{' '}
        <strong className="text-white">Tidio</strong> live chat? Nothing loads unless you accept.{' '}
        <Link to="/privacy-policy/" className="text-cyan underline">
          Privacy policy
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose('granted')}
          className="flex-1 rounded-full bg-cyan px-4 py-2 text-xs font-semibold text-void"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose('denied')}
          className="flex-1 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold text-white"
        >
          Reject
        </button>
      </div>
    </div>
  )
}
