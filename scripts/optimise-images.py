"""One-off image optimisation (run manually: python3 scripts/optimise-images.py).

- Portfolio screenshots -> responsive WebP (desktop 640/1280w, mobile 320/640w)
  and a 1440w JPEG kept for Open Graph / fallback.
- Moon texture recompressed (same 1024x512 size) for the desktop 3D scene.
- Static moon render (WebP) used on mobile / reduced-motion instead of three.js.
Requires Pillow + numpy.
"""
import os
import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', 'public')
PF = os.path.join(ROOT, 'portfolio')

for f in sorted(os.listdir(PF)):
    if not f.endswith('.jpg'):
        continue
    src = os.path.join(PF, f)
    im = Image.open(src).convert('RGB')
    base = f[:-4]
    widths = (640, 1280) if 'desktop' in f else (320, 640)
    for w in widths:
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(os.path.join(PF, f'{base}-{w}.webp'), 'WEBP', quality=72, method=6)
    if im.width > 1440:
        h = round(im.height * 1440 / im.width)
        im.resize((1440, h), Image.LANCZOS).save(src, 'JPEG', quality=78, optimize=True, progressive=True)

tex_path = os.path.join(ROOT, 'textures', 'moon_1024.jpg')
tex_im = Image.open(tex_path).convert('RGB')
if os.path.getsize(tex_path) > 150_000:
    tex_im.save(tex_path, 'JPEG', quality=70, optimize=True, progressive=True)

# Static moon render: orthographic sphere sampled from the equirectangular texture
tex = np.asarray(tex_im).astype(np.float32) / 255.0
S = 640
R = S * 0.40
yy, xx = np.mgrid[0:S, 0:S].astype(np.float32)
nx = (xx - S / 2) / R
ny = (S / 2 - yy) / R
rr = nx ** 2 + ny ** 2
inside = rr <= 1.0
nz = np.sqrt(np.clip(1 - rr, 0, 1))
# tilt + rotation similar to the 3D scene
tilt, rot = 0.22, 1.6
y2 = ny * np.cos(tilt) - nz * np.sin(tilt)
z2 = ny * np.sin(tilt) + nz * np.cos(tilt)
lat = np.arcsin(np.clip(y2, -1, 1))
lon = np.arctan2(nx, z2) + rot
u = ((lon / (2 * np.pi)) + 0.5) % 1.0
v = 0.5 - lat / np.pi
tx = np.clip((u * (tex.shape[1] - 1)).astype(int), 0, tex.shape[1] - 1)
ty = np.clip((v * (tex.shape[0] - 1)).astype(int), 0, tex.shape[0] - 1)
col = tex[ty, tx]
L = np.array([-0.55, 0.45, 0.70]); L /= np.linalg.norm(L)
lambert = np.clip(nx * L[0] + ny * L[1] + nz * L[2], 0, 1)
shade = 0.10 + 0.95 * lambert ** 0.9
rgb = col * shade[..., None]
# cool rim glow (cyan -> violet) like the fresnel halo
fres = np.clip(1 - nz, 0, 1) ** 3.2
glow = np.stack([0.0 + 0.48 * (ny * 0.5 + 0.5), 0.78 - 0.4 * (ny * 0.5 + 0.5), np.ones_like(ny)], -1)
rgb = np.clip(rgb + glow * fres[..., None] * 0.55, 0, 1)
alpha = np.clip((1.0 - np.sqrt(rr)) * R, 0, 1)  # anti-aliased edge
out = np.zeros((S, S, 4), np.float32)
out[..., :3] = rgb
out[..., 3] = np.where(inside, alpha, 0)
Image.fromarray((out * 255).astype(np.uint8), 'RGBA').save(os.path.join(ROOT, 'textures', 'moon-static.webp'), 'WEBP', quality=78, method=6)
print('done')
