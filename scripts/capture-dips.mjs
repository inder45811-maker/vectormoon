import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import { mkdir } from 'fs/promises'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'portfolio')

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
await page.goto('https://hskcoaching.co.uk/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(1800)
await page.screenshot({ path: path.join(outDir, 'dips-pt-desktop.jpg'), type: 'jpeg', quality: 78 })

await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(900)
await page.screenshot({ path: path.join(outDir, 'dips-pt-mobile.jpg'), type: 'jpeg', quality: 78 })

await browser.close()
console.log('wrote dips-pt-desktop.jpg + dips-pt-mobile.jpg')
