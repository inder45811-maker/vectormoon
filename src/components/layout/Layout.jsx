import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import CosmicCanvas from '../ui/CosmicCanvas'
import ScrollSpine from '../ui/ScrollSpine'
import PageTransition from './PageTransition'
import CustomCursor from '../ui/CustomCursor'
import AgencyHud from '../ui/AgencyHud'
import CookieBanner from '../CookieBanner'
import ContactDock from '../ContactDock'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // e.g. /contact/#enquiry from "Get a quote" / pricing buttons. The new page
      // mounts after the exit transition, so retry briefly until the target exists.
      let tries = 0
      const id = hash.slice(1)
      const go = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ block: 'start' })
        else if (tries++ < 10) timer = setTimeout(go, 100)
      }
      let timer = setTimeout(go, 0)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />
      <CosmicCanvas />
      <ScrollSpine />
      <Navbar />
      <main className="relative z-10">
        {/* initial={false}: no fade-in on the first page load (keeps LCP text visible without JS) */}
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <AgencyHud />
      <ContactDock />
      <CookieBanner />
    </div>
  )
}
