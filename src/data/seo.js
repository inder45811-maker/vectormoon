const SITE = 'https://vectormoon.co.uk'
const DEFAULT_IMAGE = `${SITE}/favicon.svg`

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
  email: 'admin@vectormoon.co.uk',
  telephone: '+447341555160',
  priceRange: '£799–£2999+',
  currenciesAccepted: 'GBP',
  areaServed: [
    { '@type': 'City', name: 'Coventry' },
    { '@type': 'AdministrativeArea', name: 'West Midlands' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coventry',
    addressRegion: 'West Midlands',
    addressCountry: 'GB',
  },
  sameAs: ['https://www.instagram.com/vectormoonstudios/'],
}

export { SITE }
