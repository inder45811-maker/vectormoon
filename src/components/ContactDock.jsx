import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { hasChatConsent, grantChatConsent } from '../utils/consent'
import { openTidio } from '../utils/tidio'

const PHONE = '07341555160'
const PHONE_DISPLAY = '07341 555160'
const EMAIL = 'indi@vectormoon.co.uk'

/**
 * Mobile: a slim sticky bar with Call / Get a quote / Chat.
 * Desktop: a small "Chat" pill bottom-left (the HUD sits bottom-right).
 * Tidio only loads when "Chat" is clicked (and, if cookies were not
 * accepted, after the visitor confirms they're happy for chat to set them).
 */
export default function ContactDock() {
  const { pathname } = useLocation()
  const [asking, setAsking] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | failed | open

  const startChat = async () => {
    if (!hasChatConsent()) {
      setAsking(true)
      return
    }
    setAsking(false)
    setStatus('loading')
    const ok = await openTidio()
    setStatus(ok ? 'open' : 'failed')
  }

  const onContact = pathname.startsWith('/contact')

  return (
    <>
      {(asking || status === 'failed') && (
        <div
          role="dialog"
          aria-label="Live chat"
          className="fixed inset-x-3 bottom-[4.5rem] z-[61] mx-auto max-w-[360px] rounded-2xl border border-white/15 bg-[#0d1426]/95 p-4 text-sm text-text-secondary shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:bottom-20 sm:left-4 sm:right-auto"
        >
          {status === 'failed' ? (
            <p>
              Chat didn&apos;t load. Call <a href={`tel:${PHONE}`} className="text-cyan">{PHONE_DISPLAY}</a> or email{' '}
              <a href={`mailto:${EMAIL}`} className="text-cyan">{EMAIL}</a>.
            </p>
          ) : (
            <>
              <p>
                Live chat is provided by <strong className="text-white">Tidio</strong>, which sets cookies. Open chat?
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    grantChatConsent()
                    startChat()
                  }}
                  className="flex-1 rounded-full bg-cyan px-4 py-2 text-xs font-semibold text-void"
                >
                  Open chat
                </button>
                <a
                  href={`tel:${PHONE}`}
                  className="flex-1 rounded-full border border-white/25 px-4 py-2 text-center text-xs font-semibold text-white"
                >
                  Call instead
                </a>
              </div>
            </>
          )}
          <button
            type="button"
            onClick={() => {
              setAsking(false)
              setStatus('idle')
            }}
            className="absolute right-3 top-2 text-white/50 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}

      {/* Mobile sticky action bar */}
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-white/10 bg-[#070B16]/95 px-3 py-2 backdrop-blur-xl sm:hidden"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={`tel:${PHONE}`}
          className="flex-1 rounded-full border border-white/20 py-2.5 text-center text-xs font-semibold text-white"
        >
          ☎ Call
        </a>
        {!onContact && (
          <Link
            to="/contact/#enquiry"
            className="flex-[1.4] rounded-full bg-cyan py-2.5 text-center text-xs font-semibold text-void"
          >
            Get a quote
          </Link>
        )}
        <button
          type="button"
          onClick={startChat}
          disabled={status === 'loading'}
          className="flex-1 rounded-full border border-white/20 py-2.5 text-center text-xs font-semibold text-white disabled:opacity-60"
        >
          {status === 'loading' ? 'Loading…' : '💬 Chat'}
        </button>
      </nav>

      {/* Desktop chat pill */}
      {status !== 'open' && (
        <button
          type="button"
          onClick={startChat}
          disabled={status === 'loading'}
          className="fixed bottom-4 left-4 z-40 hidden items-center gap-2 rounded-full border border-white/15 bg-nebula/90 px-4 py-2 text-xs font-medium text-white shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition hover:border-cyan/50 sm:inline-flex"
        >
          <span>💬</span>
          <span>{status === 'loading' ? 'Loading chat…' : 'Chat with Indi'}</span>
        </button>
      )}
    </>
  )
}
