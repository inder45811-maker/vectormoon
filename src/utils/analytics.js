/**
 * Google Analytics 4 (GA4) & Tracking Utility for VectorMoon.
 *
 * Features:
 * - Asynchronous, non-blocking gtag.js injection
 * - SPA route tracking support (React Router)
 * - Safe against prerender / headless crawler executions
 * - Development console logger when no GA ID is configured
 * - Conversion & key event helpers (leads, calls, emails, calculators)
 */

const GA_ID = import.meta.env.VITE_GA_ID || ''
const IS_DEV = import.meta.env.DEV

/**
 * Checks if the current environment is a real browser (not prerender/headless)
 */
function isTrackableBrowser() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false

  // Avoid logging analytics during Playwright prerender runs
  if (window.navigator?.webdriver) return false

  return true
}

/**
 * Initializes GA4 gtag.js script if not already initialized
 */
export function initGA() {
  if (!isTrackableBrowser()) return

  if (!GA_ID) {
    if (IS_DEV) {
      console.info('[VectorMoon Analytics] VITE_GA_ID is not configured. Running in debug mock mode.')
    }
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments)
  }

  // Prevent duplicate script tag injection
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`)) {
    return
  }

  window.gtag('js', new Date())

  // Configure GA4: disable automatic initial pageview because SPA router fires accurate pageviews
  window.gtag('config', GA_ID, {
    send_page_view: false,
    cookie_flags: 'SameSite=None;Secure',
  })

  // Inject async script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  if (IS_DEV) {
    console.info(`[VectorMoon Analytics] Initialized GA4 with ID: ${GA_ID}`)
  }
}

/**
 * Dispatches a page_view event on route navigation
 */
export function trackPageView(path, title) {
  if (!isTrackableBrowser()) return

  const pagePath = path || window.location.pathname + window.location.search
  const pageTitle = title || document.title

  if (window.gtag && GA_ID) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href,
    })
  }

  if (IS_DEV) {
    console.debug(`[VectorMoon Analytics] Page View → ${pagePath} ("${pageTitle}")`)
  }
}

/**
 * Dispatches custom or standard GA4 events
 */
export function trackEvent(eventName, eventParams = {}) {
  if (!isTrackableBrowser()) return

  if (window.gtag && GA_ID) {
    window.gtag('event', eventName, eventParams)
  }

  if (IS_DEV) {
    console.debug(`[VectorMoon Analytics] Event: ${eventName}`, eventParams)
  }
}

/**
 * Key Event: Lead Form Submission
 */
export function trackLead({ formName = 'contact_form', email = '', plan = '', value = 0 }) {
  trackEvent('generate_lead', {
    form_name: formName,
    plan_interest: plan || undefined,
    currency: 'GBP',
    value: value || undefined,
    // Note: Do not send raw PII to Google Analytics. Email domain only if useful.
    email_domain: email ? email.split('@')[1] : undefined,
  })
}

/**
 * Key Event: Contact Click (Phone or Email)
 */
export function trackContactClick({ type, destination }) {
  trackEvent('contact_click', {
    contact_type: type, // 'phone' | 'email' | 'whatsapp'
    destination,
  })

  if (type === 'phone') {
    trackEvent('click_to_call', { telephone: destination })
  } else if (type === 'email') {
    trackEvent('click_to_email', { email: destination })
  }
}

/**
 * Key Event: Calculator Interaction (Scope Calculator or ROI Engine)
 */
export function trackCalculatorEngagement({ type, plan = '', addons = [], total = 0 }) {
  trackEvent('calculator_interaction', {
    calculator_type: type,
    selected_plan: plan,
    addons_count: addons.length,
    currency: 'GBP',
    estimated_total: total,
  })
}

/**
 * Event: Key CTA Clicks
 */
export function trackCtaClick({ text, destination, section = '' }) {
  trackEvent('cta_click', {
    cta_text: text,
    cta_destination: destination,
    section_name: section,
  })
}
