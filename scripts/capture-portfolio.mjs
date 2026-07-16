import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'portfolio')

const sites = [
  {
    slug: 'ramz-detailz',
    url: 'https://inder45811-maker.github.io/Ramz_detailz/',
  },
  {
    slug: 'punjabi-number-plates',
    url: 'https://www.punjabinumberplates.co.uk/',
  },
  {
    slug: 'making-marks',
    url: 'https://inder45811-maker.github.io/tattoostudio/',
  },
]

await mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ headless: true })

for (const site of sites) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  console.log('Capturing', site.url)
  try {
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(1500)
    // Hide cookie banners if present
    await page.evaluate(() => {
      document.querySelectorAll('[class*="cookie"], [id*="cookie"], [class*="consent"]').forEach((el) => {
        el.style.display = 'none'
      })
    })
    await page.screenshot({
      path: path.join(outDir, `${site.slug}-desktop.png`),
      fullPage: false,
      type: 'png',
    })
    // Mobile
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(800)
    await page.screenshot({
      path: path.join(outDir, `${site.slug}-mobile.png`),
      fullPage: false,
      type: 'png',
    })
    console.log('OK', site.slug)
  } catch (err) {
    console.error('FAIL', site.slug, err.message)
  }
  await page.close()
}

await browser.close()
console.log('Done → public/portfolio')
