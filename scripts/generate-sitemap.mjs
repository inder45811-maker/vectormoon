/**
 * Regenerate public/sitemap.xml from the source-of-truth data files
 * (src/data/projects.js + src/data/locations.js). Keeps the sitemap in sync
 * automatically — a new town or case study needs ZERO sitemap edits.
 */
import { writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { projects } from '../src/data/projects.js'
import { locations } from '../src/data/locations.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const out = path.join(__dirname, '..', 'public', 'sitemap.xml')

const BASE = 'https://vectormoon.co.uk'

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/work', changefreq: 'weekly', priority: '0.9' },
  { path: '/services', changefreq: 'monthly', priority: '0.85' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.85' },
  { path: '/privacy-policy/', changefreq: 'yearly', priority: '0.3' },
]

const workRoutes = projects.map((p) => ({
  path: `/work/${p.slug}`,
  changefreq: 'monthly',
  priority: '0.8',
}))

const locationRoutes = locations.map((l) => ({
  path: `/web-design-${l.slug}`,
  changefreq: 'weekly',
  priority: l.slug === 'coventry' ? '0.95' : '0.9',
}))

const urls = [...staticRoutes, ...workRoutes, ...locationRoutes]
  .map(
    (u) => `  <url>
    <loc>${BASE}${u.path}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

await writeFile(out, xml, 'utf8')
console.log(
  `sitemap.xml regenerated (${staticRoutes.length + workRoutes.length + locationRoutes.length} URLs) → public/sitemap.xml`,
)
