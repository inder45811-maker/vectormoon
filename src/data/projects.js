export const projects = [
  {
    slug: 'ramz-detailz',
    title: 'Ramz DETAILZ',
    tagline: 'Car detailing & mobile valeting that converts local Coventry leads',
    description:
      'A package-led service website for a Coventry detailing business — clear pricing structure, mobile-first booking cues, and local SEO foundations so nearby drivers can find and trust the brand.',
    tag: 'Local Service',
    location: 'Coventry',
    industry: 'Automotive detailing',
    url: 'https://inder45811-maker.github.io/Ramz_detailz/',
    image: '/portfolio/ramz-detailz-desktop.jpg',
    imageMobile: '/portfolio/ramz-detailz-mobile.jpg',
    monogram: 'RD',
    accent: '#00C6FF',
    results: [
      'Service packages structured for mobile enquiries',
      'Local keyword targeting for Coventry valeting',
      'Fast static build for Core Web Vitals',
    ],
    stack: ['Astro', 'React', 'Tailwind', 'Local SEO'],
  },
  {
    slug: 'punjabi-number-plates',
    title: 'Punjabi Number Plates',
    tagline: 'E-commerce for road-legal & show plates',
    description:
      'A full online storefront for premium number plates — product storytelling, trust signals, and a shop flow designed for real orders, not just a brochure look.',
    tag: 'E-Commerce',
    location: 'United Kingdom',
    industry: 'Automotive retail',
    url: 'https://www.punjabinumberplates.co.uk/',
    image: '/portfolio/punjabi-number-plates-desktop.jpg',
    imageMobile: '/portfolio/punjabi-number-plates-mobile.jpg',
    monogram: 'PN',
    accent: '#3D5AFE',
    results: [
      'Product-first catalogue experience',
      'Trust & compliance messaging for plate buyers',
      'Performance-tuned storefront on modern stack',
    ],
    stack: ['React', 'Vite', 'Shopify-ready', 'SEO tooling'],
  },
  {
    slug: 'making-marks',
    title: 'Making Marks Tattoo Co',
    tagline: 'Black & grey studio site with multi-page local SEO',
    description:
      'A multi-page studio presence for a Leamington Spa tattoo shop — artists, aftercare, FAQ, and visit pages with structured data so both Google and AI systems can understand the business.',
    tag: 'Multi-page',
    location: 'Leamington Spa',
    industry: 'Tattoo studio',
    url: 'https://inder45811-maker.github.io/tattoostudio/',
    image: '/portfolio/making-marks-desktop.jpg',
    imageMobile: '/portfolio/making-marks-mobile.jpg',
    monogram: 'MM',
    accent: '#7B61FF',
    results: [
      'Dedicated routes for SEO & GEO discoverability',
      'FAQ + visit schema for local intent',
      'Editorial gallery-ready layout',
    ],
    stack: ['Astro', 'JSON-LD', 'Sitemap', 'Static HTML'],
  },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
