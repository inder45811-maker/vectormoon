/**
 * Single source of truth for package names, prices and delivery times.
 * Used by /pricing, the homepage cards, the scope builder, location pages,
 * the contact form package picker and the JSON-LD structured data.
 * (Values = the most common ones on the live site, 20 Oct 2026. Owner to confirm.)
 */
export const plans = [
  {
    id: 'core',
    name: 'Core Build',
    price: '£799',
    priceValue: 799,
    priceFrom: false,
    delivery: '1–2 weeks',
    period: 'one-off',
    blurb: 'Get online with a sharp single-page site that does not embarrass you',
    features: [
      'Single-page / landing site',
      'Custom high-end design',
      'Mobile-first + contact form',
      'Basic on-page SEO',
      '1 revision round',
      'Delivery: 1–2 weeks',
    ],
    highlighted: false,
  },
  {
    id: 'growth',
    name: 'Growth Engine',
    price: '£1,499',
    priceValue: 1499,
    priceFrom: false,
    delivery: '1–2 weeks',
    period: 'one-off',
    blurb: 'Most popular for Coventry & West Midlands SMEs — makes the phone ring',
    features: [
      'Up to 5 SEO-ready pages',
      'Lead & booking capture',
      'Google Business Profile setup',
      '3 months local SEO',
      'Conversion copy + proof section',
      'Delivery: 1–2 weeks',
    ],
    highlighted: true,
  },
  {
    id: 'scale',
    name: 'Enterprise Scale',
    price: '£2,999+',
    priceValue: 2999,
    priceFrom: true,
    delivery: '3–4 weeks',
    period: 'project',
    blurb: 'A site that runs without you — e-commerce, CRM & ongoing SEO',
    features: [
      'Everything in Growth Engine',
      'E-commerce / full online store',
      'Booking & CRM integration',
      '6 months SEO + content engine',
      'Review funnel',
      'Quarterly performance report',
      'Delivery: 3–4 weeks',
    ],
    highlighted: false,
  },
]

export const carePlans = [
  {
    name: 'Protect',
    price: '£99',
    period: '/month',
    for: 'For Core Build clients',
    blurb: 'The site keeps working and I never think about it',
    features: [
      'Managed hosting + backups',
      'Uptime & speed monitoring',
      'Security & dependency updates',
      '30 min edits per month',
      'Monthly health report',
    ],
    highlighted: false,
  },
  {
    name: 'Growth Care',
    price: '£299',
    period: '/month',
    for: 'For Growth Engine clients',
    blurb: 'Keeps the phone ringing',
    features: [
      'Everything in Protect',
      'Ongoing local SEO (GBP, citations, keyword tracking)',
      'Review funnel — ask & reply',
      '1 content piece per month',
      'Monthly performance report with ROI number',
    ],
    highlighted: true,
  },
  {
    name: 'Scale Care',
    price: '£499',
    period: '/month',
    for: 'For Enterprise Scale clients',
    blurb: 'Runs without me',
    features: [
      'Everything in Growth Care',
      'Content engine (2–3 posts/mo)',
      'Monthly CRO sprint',
      'Quarterly strategy + report',
      'Same-day priority SLA',
    ],
    highlighted: false,
  },
]

export const careDisclosure =
  'Keep it working after launch — care plans from £99/mo, cancel anytime.'

/** Find a plan from a ?plan= value (id, legacy id or name). */
export function findPlan(value) {
  if (!value) return null
  const v = String(value).toLowerCase().replace(/[^a-z]/g, '')
  const alias = { enterprise: 'scale', ecommerce: 'scale', enterprisescale: 'scale', corebuild: 'core', growthengine: 'growth' }
  const id = alias[v] || v
  return plans.find((p) => p.id === id) || null
}

export const formatGBP = (n) => `£${Number(n).toLocaleString('en-GB')}`
