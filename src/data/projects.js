export const projects = [
  {
    slug: 'dips-pt',
    title: 'Dips PT',
    tagline: 'Personal training that turns Coventry clients into paying members',
    description:
      'A membership website for a Coventry personal trainer — six named training programmes (Ascend, Define, Endure, Forged, Limitless, Vitality), clear £29–£249 pricing, gym-or-home flexibility, and a 7-day no-card trial that lowers sign-up friction.',
    tag: 'Membership',
    location: 'Coventry',
    industry: 'Personal training & fitness',
    url: 'https://hskcoaching.co.uk/',
    image: '/portfolio/dips-pt-desktop.jpg',
    imageMobile: '/portfolio/dips-pt-mobile.jpg',
    monogram: 'DP',
    accent: '#3D5AFE',
    results: [
      'Six named programmes with clear positioning',
      '£29–£249 membership tiers for gym & home',
      '7-day no-card trial to lower sign-up friction',
      'Fast static build with structured data for local SEO',
    ],
    stack: ['React', 'Vite', 'Local SEO', 'Membership'],
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
