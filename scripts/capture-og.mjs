import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public')

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:1200px; height:630px; font-family:'Space Grotesk',sans-serif; background:#0B1020; color:#fff; overflow:hidden; }
  .card { position:relative; width:1200px; height:630px; padding:60px 76px; display:flex; flex-direction:column; justify-content:space-between;
    background:
      radial-gradient(ellipse 65% 65% at 80% 15%, rgba(123,97,255,0.30), transparent 55%),
      radial-gradient(ellipse 55% 55% at 8% 90%, rgba(0,198,255,0.18), transparent 55%),
      #0B1020; }
  .moon { position:absolute; right:90px; top:120px; width:180px; height:180px; border-radius:50%;
    background:linear-gradient(135deg,#00C6FF,#3D5AFE); opacity:0.95;
    box-shadow:0 0 80px rgba(0,198,255,0.45); }
  .dot { position:absolute; border-radius:50%; background:#7B61FF; }
  .badge { font-size:17px; letter-spacing:0.24em; text-transform:uppercase; color:#00C6FF; font-weight:600; }
  .headline { font-family:'Syne',sans-serif; font-weight:700; font-size:66px; line-height:1.04; letter-spacing:-0.03em; max-width:780px; }
  .headline .grad { background:linear-gradient(90deg,#3D5AFE,#00C6FF); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .sub { margin-top:22px; font-size:26px; color:#a5adc5; max-width:700px; line-height:1.42; }
  .foot { display:flex; align-items:center; justify-content:space-between; }
  .brand { font-family:'Syne',sans-serif; font-weight:800; font-size:44px; letter-spacing:-0.02em; }
  .brand .grad2 { background:linear-gradient(90deg,#00C6FF,#7B61FF); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .cta { font-size:22px; font-weight:600; color:#00C6FF; }
  .url { font-size:20px; letter-spacing:0.06em; color:#7B61FF; font-weight:600; }
</style></head>
<body>
  <div class="card">
    <div class="moon"></div>
    <div class="dot" style="width:10px;height:10px;left:120px;top:90px;opacity:.6"></div>
    <div class="dot" style="width:7px;height:7px;right:340px;bottom:150px;opacity:.5"></div>
    <div class="dot" style="width:8px;height:8px;left:520px;top:60px;opacity:.4"></div>
    <span class="badge">Coventry · West Midlands · UK</span>
    <div>
      <div class="headline">High-end web design that <span class="grad">wins you work</span></div>
      <div class="sub">Modern, high-converting websites for UK local businesses. Real client work. Packages from £799. Free strategy call.</div>
    </div>
    <div class="foot">
      <span class="brand">Vector<span class="grad2">Moon</span></span>
      <span class="cta">Packages from £799</span>
      <span class="url">vectormoon.co.uk</span>
    </div>
  </div>
</body></html>`

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.evaluate(async () => { await document.fonts.ready })
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(outDir, 'og-image.png'), type: 'png' })
await page.close()
await browser.close()
console.log('wrote public/og-image.png (1200x630)')
