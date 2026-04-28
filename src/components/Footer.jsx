export default function Footer() {
  return (
    <footer className="relative py-12 px-6" style={{ background: '#0B1020' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="footerMoonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C6FF"/>
                  <stop offset="100%" stopColor="#3D5AFE"/>
                </linearGradient>
              </defs>
              <rect x="4" y="8" width="56" height="48" rx="6" stroke="#8892B0" strokeWidth="2" fill="#0B1020"/>
              <line x1="4" y1="18" x2="60" y2="18" stroke="#8892B0" strokeWidth="1.5"/>
              <circle cx="32" cy="36" r="12" fill="url(#footerMoonGrad)"/>
            </svg>
            <span className="text-lg font-bold">
              <span className="text-white">Vector</span>
              <span className="gradient-text">Moon</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-text-secondary text-center">
            Web Design • UI/UX • Development • Digital Solutions
          </p>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            {['Work', 'Services', 'About', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-text-secondary hover:text-white transition-colors">
                {l}
              </a>
            ))}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-cyan transition-colors"
              id="footer-instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(61,72,79,0.15)] pt-6 text-center">
          <p className="text-xs text-text-secondary">
            © 2026 VectorMoon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
