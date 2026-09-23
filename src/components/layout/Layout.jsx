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

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <div className="noise-overlay" aria-hidden />
      <CosmicCanvas />
      <ScrollSpine />
      <Navbar />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <AgencyHud />
    </div>
  )
}
