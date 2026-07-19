import { Link } from 'react-router-dom'

const nav = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/web-design-coventry', label: 'Web Design Coventry' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy/', label: 'Privacy', external: true },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-5 py-14" style={{ background: '#070a12' }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="mb-4 text-xl font-semibold">
              <span className="text-white">Vector</span>
              <span className="gradient-text">Moon</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
              High-end web design studio based in Coventry. Modern sites for UK local businesses
              that need enquiries — not just a pretty template.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cyan/80">
              Coventry · West Midlands · UK
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">Explore</p>
            <ul className="space-y-2">
              {nav.map((item) =>
                item.external ? (
                  <li key={item.to}>
                    <a href={item.to} className="text-sm text-text-secondary transition hover:text-cyan">
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-text-secondary transition hover:text-cyan">
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">Contact</p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>
                <a href="mailto:indi@vectormoon.co.uk" className="hover:text-cyan">
                  indi@vectormoon.co.uk
                </a>
              </li>
              <li>
                <a href="tel:07341555160" className="hover:text-cyan">
                  07341 555160
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/vectormoonstudios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan"
                >
                  @vectormoonstudios
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-text-secondary">© 2026 VectorMoon. All rights reserved.</p>
          <p className="text-xs text-text-muted">Built for speed, SEO &amp; AI search visibility.</p>
        </div>
      </div>
    </footer>
  )
}
