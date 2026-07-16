/**
 * Post-build prerender: visit SPA routes, save static HTML with helmet meta.
 * Improves SEO/GEO for crawlers that don't fully execute JS.
 */
import { chromium } from 'playwright'
import { createServer } from 'http'
import { readFile, writeFile, mkdir, stat } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, '..', 'dist')

const routes = [
  '/',
  '/work',
  '/work/ramz-detailz',
  '/work/punjabi-number-plates',
  '/work/making-marks',
  '/services',
  '/web-design-coventry',
  '/pricing',
  '/contact',
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
}

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
}

async function startStaticServer() {
  const server = createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent(req.url.split('?')[0])
      if (urlPath === '/') urlPath = '/index.html'
      let filePath = path.join(dist, urlPath)
      try {
        const st = await stat(filePath)
        if (st.isDirectory()) filePath = path.join(filePath, 'index.html')
      } catch {
        // SPA fallback for client routes during prerender navigation
        filePath = path.join(dist, 'index.html')
      }
      const data = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': contentType(filePath) })
      res.end(data)
    } catch {
      res.writeHead(404)
      res.end('not found')
    }
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address()
  return { server, port }
}

const { server, port } = await startStaticServer()
const browser = await chromium.launch({ headless: true })
const base = `http://127.0.0.1:${port}`

for (const route of routes) {
  const page = await browser.newPage()
  const url = `${base}${route}`
  console.log('Prerender', route)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(800)
  let html = await page.content()
  // Prefer the last helmet-injected title/canonical (SPA shell may leave defaults first)
  const titles = [...html.matchAll(/<title>[\s\S]*?<\/title>/gi)]
  if (titles.length) {
    const last = titles[titles.length - 1][0]
    html = html.replace(/<title>[\s\S]*?<\/title>/gi, '')
    html = html.replace(/<\/head>/i, `${last}</head>`)
  }
  const canons = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)]
  if (canons.length) {
    const last = canons[canons.length - 1][0]
    html = html.replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, '')
    html = html.replace(/<\/head>/i, `${last}</head>`)
  }
  // Drop duplicate meta descriptions — keep the last
  const descs = [...html.matchAll(/<meta[^>]+name=["']description["'][^>]*>/gi)]
  if (descs.length > 1) {
    const last = descs[descs.length - 1][0]
    html = html.replace(/<meta[^>]+name=["']description["'][^>]*>/gi, '')
    html = html.replace(/<\/head>/i, `${last}</head>`)
  }
  const outDir = route === '/' ? dist : path.join(dist, route.slice(1))
  await mkdir(outDir, { recursive: true })
  const outFile = route === '/' ? path.join(dist, 'index.html') : path.join(outDir, 'index.html')
  await writeFile(outFile, html, 'utf8')
  console.log('  →', path.relative(dist, outFile))
  await page.close()
}

// SPA fallback for client-side unknown routes (GitHub Pages / static hosts)
const indexHtml = await readFile(path.join(dist, 'index.html'), 'utf8')
await writeFile(path.join(dist, '404.html'), indexHtml, 'utf8')

await browser.close()
server.close()
console.log('Prerender complete')
