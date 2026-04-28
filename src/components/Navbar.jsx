import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-[rgba(61,72,79,0.15)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" id="nav-logo">
          <Logo />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">Vector</span>
            <span className="gradient-text">Moon</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-sm font-medium text-text-secondary hover:text-white transition-colors duration-300"
              id={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-5 py-2.5 rounded-full bg-cyan text-void font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-[var(--shadow-glow-cyan)]"
            id="nav-cta"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          id="nav-hamburger"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-white rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white rounded-full"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-white hover:text-cyan transition-colors"
                id={`mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 rounded-full bg-cyan text-void font-bold text-lg shadow-[var(--shadow-glow-cyan)]"
            >
              Book a Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="navMoonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C6FF"/>
          <stop offset="100%" stopColor="#3D5AFE"/>
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="56" height="48" rx="6" stroke="#8892B0" strokeWidth="2" fill="#0B1020"/>
      <line x1="4" y1="18" x2="60" y2="18" stroke="#8892B0" strokeWidth="1.5"/>
      <circle cx="13" cy="13" r="2" fill="#FF5F56"/>
      <circle cx="21" cy="13" r="2" fill="#FFBD2E"/>
      <circle cx="29" cy="13" r="2" fill="#27C93F"/>
      <circle cx="32" cy="36" r="12" fill="url(#navMoonGrad)"/>
      <circle cx="22" cy="28" r="2" fill="#7B61FF" stroke="#fff" strokeWidth="0.5"/>
      <circle cx="42" cy="28" r="2" fill="#7B61FF" stroke="#fff" strokeWidth="0.5"/>
      <circle cx="32" cy="50" r="2" fill="#7B61FF" stroke="#fff" strokeWidth="0.5"/>
      <line x1="22" y1="28" x2="32" y2="36" stroke="#7B61FF" strokeWidth="0.8" opacity="0.6"/>
      <line x1="42" y1="28" x2="32" y2="36" stroke="#7B61FF" strokeWidth="0.8" opacity="0.6"/>
      <line x1="32" y1="50" x2="32" y2="36" stroke="#7B61FF" strokeWidth="0.8" opacity="0.6"/>
    </svg>
  )
}
