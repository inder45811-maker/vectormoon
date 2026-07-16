/**
 * Post-build prerender: boot the clean Vite SPA shell for each route,
 * let React render, then save static HTML for crawlers (SEO/GEO).
 */
import { chromium } from 'playwright'
import { createServer } from 'http'
import { readFile, writeFile, mkdir, copyFile, stat } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.join(__dirname, '..', 'dist')
const shellPath = path.join(dist, '_spa-shell.html')

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

// Keep the clean Vite shell so later routes don't hydrate on top of a prerendered homepage
await copyFile(path.join(dist, 'index.html'), shellPath)

async function startStaticServer() {
  const server = createServer(async (req, res) => {
    try {
      let urlPath = decodeURIComponent(req.url.split('?')[0])
      // Always serve the SPA shell for document navigations — client router picks the page
      if (urlPath === '/' || !path.extname(urlPath) || urlPath.endsWith('/')) {
        const data = await readFile(shellPath)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(data)
        return
      }
      const filePath = path.join(dist, urlPath)
      const data = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': contentType(filePath) })
      res.end(data)
    } catch {
      // Asset miss → shell (React may still boot)
      try {
        const data = await readFile(shellPath)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end(data)
      } catch {
        res.writeHead(404)
        res.end('not found')
      }
    }
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address()
  return { server, port }
}

function keepLast(html, pattern) {
  const matches = [...html.matchAll(pattern)]
  if (!matches.length) return html
  const last = matches[matches.length - 1][0]
  html = html.replace(pattern, '')
  return html.replace(/<\/head>/i, `${last}</head>`)
}

const { server, port } = await startStaticServer()
const browser = await chromium.launch({ headless: true })
const base = `http://127.0.0.1:${port}`

for (const route of routes) {
  const page = await browser.newPage()
  const url = `${base}${route === '/' ? '/' : route}`
  console.log('Prerender', route)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  // Wait for route-specific H1 (confirms React painted the right page)
  await page.waitForSelector('h1', { timeout: 15000 })
  await page.waitForTimeout(500)

  let html = await page.content()
  html = keepLast(html, /<title>[\s\S]*?<\/title>/gi)
  html = keepLast(html, /<link[^>]+rel=["']canonical["'][^>]*>/gi)
  html = keepLast(html, /<meta[^>]+name=["']description["'][^>]*>/gi)
  html = keepLast(html, /<meta[^>]+property=["']og:title["'][^>]*>/gi)
  html = keepLast(html, /<meta[^>]+property=["']og:url["'][^>]*>/gi)
  html = keepLast(html, /<meta[^>]+property=["']og:description["'][^>]*>/gi)

  const outDir = route === '/' ? dist : path.join(dist, route.slice(1))
  await mkdir(outDir, { recursive: true })
  const outFile = route === '/' ? path.join(dist, 'index.html') : path.join(outDir, 'index.html')
  await writeFile(outFile, html, 'utf8')
  console.log('  →', path.relative(dist, outFile))
  await page.close()
}

// SPA fallback for unknown client routes on static hosts
const homeHtml = await readFile(path.join(dist, 'index.html'), 'utf8')
await writeFile(path.join(dist, '404.html'), homeHtml, 'utf8')

await browser.close()
server.close()
console.log('Prerender complete')
