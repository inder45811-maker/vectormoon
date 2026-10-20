import { locations } from './locations'
import { plans } from './pricing'

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
  // GitHub Pages serves every route as a directory (/pricing/); the no-slash
  // form 301-redirects, so canonical/og:url always use the trailing slash.
  let clean = path.startsWith('/') ? path : `/${path}`
  if (!clean.endsWith('/')) clean += '/'
  const url = `${SITE}${clean}`
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
  priceRange: `${plans[0].price}–${plans[plans.length - 1].price}`,
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
    name: 'Website design packages',
    itemListElement: plans.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: `${p.blurb}. Typical delivery ${p.delivery}.`,
      itemOffered: { '@type': 'Service', name: `${p.name} website` },
      priceCurrency: 'GBP',
      price: String(p.priceValue),
      ...(p.priceFrom
        ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: p.priceValue, priceCurrency: 'GBP' } }
        : {}),
    })),
  },
}

export { SITE }
