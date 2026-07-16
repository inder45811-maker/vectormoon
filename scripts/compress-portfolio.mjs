import { chromium } from 'playwright'
import { readdir, readFile, writeFile, unlink } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'portfolio')
const files = (await readdir(dir)).filter((f) => f.endsWith('.png'))
const browser = await chromium.launch({ headless: true })

for (const file of files) {
  const pngPath = path.join(dir, file)
  const jpgPath = pngPath.replace(/\.png$/i, '.jpg')
  const buf = await readFile(pngPath)
  const b64 = buf.toString('base64')
  const page = await browser.newPage()
  await page.setContent(`<img id="i" src="data:image/png;base64,${b64}" />`)
  await page.waitForSelector('img')
  const dataUrl = await page.evaluate(async () => {
    const img = document.getElementById('i')
    await img.decode()
    const c = document.createElement('canvas')
    c.width = img.naturalWidth
    c.height = img.naturalHeight
    c.getContext('2d').drawImage(img, 0, 0)
    return c.toDataURL('image/jpeg', 0.78)
  })
  const base64 = dataUrl.split(',')[1]
  await writeFile(jpgPath, Buffer.from(base64, 'base64'))
  await unlink(pngPath)
  console.log(file, '→', path.basename(jpgPath))
  await page.close()
}
await browser.close()
