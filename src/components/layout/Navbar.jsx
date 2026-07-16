import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/web-design-coventry', label: 'Coventry' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-white/[0.06]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-white">Vector</span>
            <span className="gradient-text">Moon</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav-link text-sm transition-colors ${
                  isActive ? 'text-cyan' : 'text-text-secondary hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="rounded-full bg-cyan px-5 py-2.5 text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110"
          >
            Free Call
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-white p-2"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-6">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-white hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-cyan px-5 py-3 text-center text-sm font-semibold text-void"
              >
                Book Free Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="navMoon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C6FF" />
          <stop offset="100%" stopColor="#7B61FF" />
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="56" height="48" rx="8" stroke="#8892B0" strokeWidth="1.5" fill="#0B1020" />
      <line x1="4" y1="18" x2="60" y2="18" stroke="#8892B0" strokeWidth="1" opacity="0.6" />
      <circle cx="32" cy="36" r="12" fill="url(#navMoon)" />
      <circle cx="38" cy="32" r="10" fill="#0B1020" />
    </svg>
  )
}
