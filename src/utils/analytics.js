/**
 * Google Analytics 4 (GA4) tracking for VectorMoon.
 *
 * - gtag.js is only loaded after cookie consent (see utils/consent.js)
 * - Page views: the GA4 config sends the first landing's page_view (as soon as
 *   consent is given), and GA4 Enhanced Measurement ("page changes based on
 *   browser history events", currently ON for this property) sends one for each
 *   in-app navigation. Sending our own as well would double-count, so manual
 *   SPA page views are off unless MANUAL_SPA_PAGE_VIEWS is set to true (only do
 *   that if the Enhanced Measurement history setting is switched off).
 * - generate_lead, click_to_call and click_to_email actually call gtag
 * - Nothing runs during the Playwright prerender
 *
 * The Google Ads conversion (ads_conversion_Contact_Us_1) is configured on the
 * same Google tag, so it follows the same consent.
 */
import { hasAnalyticsConsent } from './consent'

export const GA_ID = import.meta.env.VITE_GA_ID || 'G-66ZRT7NPNW'
const IS_DEV = import.meta.env.DEV
const MANUAL_SPA_PAGE_VIEWS = false

let ready = false
let lastPath = null
let clickListenerInstalled = false

function isTrackableBrowser() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  if (window.__VM_PRERENDER__) return false
  return true
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }
}

/** Load gtag.js and configure GA4 — only once, and only with consent. */
export function initGA() {
  if (!isTrackableBrowser() || !GA_ID || ready) return
  if (!hasAnalyticsConsent()) return

  ensureGtag()
  window.gtag('js', new Date())
  // Default config sends the page_view for the page the visitor is on now
  window.gtag('config', GA_ID, { send_page_view: true })

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(script)
  }
  ready = true
  lastPath = window.location.pathname + window.location.search
}

function sendPageView(pagePath, pageTitle) {
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.origin + pagePath,
    page_referrer: document.referrer || undefined,
  })
  if (IS_DEV) console.debug(`[VectorMoon Analytics] page_view → ${pagePath} ("${pageTitle}")`)
}

/** Called by the router hook on every route change (see MANUAL_SPA_PAGE_VIEWS). */
export function trackPageView(path, title) {
  if (!isTrackableBrowser() || !ready) return
  const pagePath = path || window.location.pathname + window.location.search
  if (pagePath === lastPath) return // first landing is sent by the config
  lastPath = pagePath
  if (!MANUAL_SPA_PAGE_VIEWS) return
  sendPageView(pagePath, title || document.title)
}

/** Generic GA4 event (dropped silently without consent). */
export function trackEvent(eventName, eventParams = {}) {
  if (!isTrackableBrowser()) return
  if (IS_DEV) console.debug(`[VectorMoon Analytics] ${eventName}`, eventParams, ready ? '' : '(no consent, not sent)')
  if (!ready) return
  window.gtag('event', eventName, eventParams)
}

/** Key event: enquiry form sent successfully (only call after FormSubmit confirms success). */
export function trackLead({ formName = 'contact_form', plan = '', value = 0 }) {
  trackEvent('generate_lead', {
    form_name: formName,
    plan_interest: plan || undefined,
    currency: 'GBP',
    value: value || undefined,
  })
}

/** Key event: phone or email link click. */
export function trackContactClick({ type, destination }) {
  const name = type === 'phone' ? 'click_to_call' : type === 'email' ? 'click_to_email' : 'contact_click'
  trackEvent(name, {
    contact_type: type,
    link_url: destination,
    page_path: window.location.pathname,
  })
}

/**
 * One delegated listener catches every tel:/mailto: link on the site
 * (header, footer, contact page, location pages, error messages…).
 */
export function installContactClickTracking() {
  if (!isTrackableBrowser() || clickListenerInstalled) return
  clickListenerInstalled = true
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target?.closest?.('a[href^="tel:"], a[href^="mailto:"]')
      if (!a) return
      const href = a.getAttribute('href')
      const isPhone = href.startsWith('tel:')
      trackContactClick({
        type: isPhone ? 'phone' : 'email',
        destination: href.replace(/^(tel:|mailto:)/, '').split('?')[0],
      })
    },
    { capture: true },
  )
}

export function trackCalculatorEngagement({ type, plan = '', addons = [], total = 0 }) {
  trackEvent('calculator_interaction', {
    calculator_type: type,
    selected_plan: plan,
    addons_count: addons.length,
    currency: 'GBP',
    estimated_total: total,
  })
}

export function trackCtaClick({ text, destination, section = '' }) {
  trackEvent('cta_click', {
    cta_text: text,
    cta_destination: destination,
    section_name: section,
  })
}
