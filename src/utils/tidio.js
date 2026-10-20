/**
 * Tidio live chat, loaded only when the visitor asks for it (clicks "Chat").
 * Not loading it on arrival means Tidio's auto-messages (e.g. the default
 * "Subscribe for promotions" prompt) can't pop up over the hero/CTA, and its
 * ~500 KB of JS doesn't slow the first paint.
 */
const TIDIO_SRC = 'https://code.tidio.co/ck0d2pyudk2igwen5su4488ahrnty4wu.js'
let loading = null

export function isTidioLoaded() {
  return typeof window !== 'undefined' && !!window.tidioChatApi
}

export function openTidio() {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.tidioChatApi) {
    window.tidioChatApi.show()
    window.tidioChatApi.open()
    return Promise.resolve(true)
  }
  if (!loading) {
    loading = new Promise((resolve) => {
      const onReady = () => {
        try {
          window.tidioChatApi.show()
          window.tidioChatApi.open()
        } catch {
          /* ignore */
        }
        resolve(true)
      }
      document.addEventListener('tidioChat-ready', onReady, { once: true })
      const s = document.createElement('script')
      s.src = TIDIO_SRC
      s.async = true
      s.onerror = () => {
        loading = null
        resolve(false)
      }
      document.body.appendChild(s)
      // Give up waiting after 15 s (network blocked / ad blocker)
      setTimeout(() => resolve(isTidioLoaded()), 15000)
    })
  }
  return loading
}
