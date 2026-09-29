import { locations } from './locations'

const SITE = 'https://vectormoon.co.uk'
const DEFAULT_IMAGE = `${SITE}/og-image.png`

export function pageSeo({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  jsonLd = null,
}) {
  const url = path === '/' ? `${SITE}/` : `${SITE}${path.startsWith('/') ? path : `/${path}`}`
  return {
    title,
    description,
    url,
    type,
    image,
    jsonLd,
    siteName: 'VectorMoon',
    locale: 'en_GB',
  }
}

const areaCounties = [...new Set(locations.map((l) => l.county))]

export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#business`,
  name: 'VectorMoon',
  alternateName: 'VectorMoon Studios',
  url: `${SITE}/`,
  image: DEFAULT_IMAGE,
  description:
    'High-end web design studio in Coventry building modern, high-converting websites for UK local businesses.',
  email: 'indi@vectormoon.co.uk',
  telephone: '+447341555160',
  priceRange: '£799–£2999+',
  currenciesAccepted: 'GBP',
  areaServed: [
    ...locations.map((l) => ({ '@type': 'City', name: l.town })),
    ...areaCounties.map((c) => ({ '@type': 'AdministrativeArea', name: c })),
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coventry',
    addressRegion: 'West Midlands',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.4068,
    longitude: -1.5197,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/vectormoonstudios/',
    ...(import.meta.env?.VITE_GBP_URL ? [import.meta.env.VITE_GBP_URL] : []),
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design & Digital Growth Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Core Build Website',
          description: 'Custom high-end bespoke architecture engineered for local speed and trust.',
        },
        price: '799',
        priceCurrency: 'GBP',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Growth Conversion Engine',
          description: 'Multi-page GEO capture system designed to rank across surrounding towns.',
        },
        price: '1499',
        priceCurrency: 'GBP',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Bespoke Enterprise & E-Commerce',
          description: 'Custom headless architecture, online store, or complex web applications with 3D product visualizers.',
        },
        price: '2799',
        priceCurrency: 'GBP',
      },
    ],
  },
}

export { SITE }
