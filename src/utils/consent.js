/**
 * Lightweight UK GDPR / PECR consent store + Google Consent Mode v2 updates.
 *
 * Defaults (all non-essential storage denied) are set inline in index.html
 * before anything else runs. Nothing from Google (GA4 + the Google Ads
 * conversion configured on that tag) or Tidio is loaded until the visitor
 * opts in.
 */
const KEY = 'vm-consent-v1' // 'granted' | 'denied'
const CHAT_KEY = 'vm-chat-consent-v1' // 'granted' when the visitor explicitly allows chat
export const CONSENT_EVENT = 'vm-consent-change'

function read(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* private mode: consent lasts for this page view only */
  }
}

let memoryConsent = null

/** @returns {'granted'|'denied'|null} null = not decided yet */
export function getConsent() {
  if (typeof window === 'undefined') return null
  return read(KEY) || memoryConsent
}

export function hasAnalyticsConsent() {
  return getConsent() === 'granted'
}

export function hasChatConsent() {
  return getConsent() === 'granted' || read(CHAT_KEY) === 'granted'
}

function pushConsentUpdate(granted) {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }
  const v = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
    functionality_storage: v,
    personalization_storage: v,
  })
}

/** Record the visitor's choice for analytics/ads (and chat). */
export function setConsent(value) {
  memoryConsent = value
  write(KEY, value)
  pushConsentUpdate(value === 'granted')
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
}

/** Visitor explicitly asked to open live chat: allow Tidio's cookies only. */
export function grantChatConsent() {
  write(CHAT_KEY, 'granted')
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: getConsent() }))
}

/** Re-apply a stored "granted" choice on page load. */
export function applyStoredConsent() {
  if (getConsent() === 'granted') pushConsentUpdate(true)
}

export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent('vm-open-consent'))
}
