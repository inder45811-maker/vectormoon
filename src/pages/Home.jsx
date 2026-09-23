import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import Testimonials from '../components/Testimonials'
import VectorMoonCanvas from '../components/3d/VectorMoonCanvas'
import MagneticButton from '../components/ui/MagneticButton'
import BorderBeam from '../components/ui/BorderBeam'
import DecryptedText from '../components/ui/DecryptedText'
import Counter from '../components/ui/Counter'
import ScopeCalculator from '../components/ui/ScopeCalculator'
import RoiCalculator from '../components/ui/RoiCalculator'
import BenchmarkTerminal from '../components/ui/BenchmarkTerminal'
import DeviceLab from '../components/ui/DeviceLab'
import ProcessFlightPlan from '../components/ui/ProcessFlightPlan'
import { projects } from '../data/projects'
import { plans, careDisclosure } from '../data/pricing'
import { businessJsonLd, pageSeo } from '../data/seo'
import { playHapticClick } from '../utils/audio'

const featuredClient =
  projects.find((p) => p.slug === 'punjabi-number-plates') ?? projects[0]

export default function Home() {
  const [calculatorTab, setCalculatorTab] = useState('scope') // 'scope' | 'roi'

  const handleTabSwitch = (tab) => {
    playHapticClick()
    setCalculatorTab(tab)
  }

  const seo = pageSeo({
    title: 'VectorMoon | High-End Web Design Coventry & West Midlands',
    description:
      'VectorMoon is a Coventry web design studio building modern, high-converting websites for UK local businesses. Real client work. Packages from £799. Free strategy call.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        businessJsonLd,
        {
          '@type': 'WebSite',
          '@id': 'https://vectormoon.co.uk/#website',
          url: 'https://vectormoon.co.uk/',
          name: 'VectorMoon',
          publisher: { '@id': 'https://vectormoon.co.uk/#business' },
        },
      ],
    },
  })

  return (
    <>
      <Seo {...seo} />

      {/* HERO SECTION — LUXURY CELESTIAL STAGE */}
      <section
        id="orbit-stage"
        className="relative min-h-[96svh] overflow-hidden flex items-center scroll-mt-20"
      >
        {/* Soft atmospheric gradient wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 60% at 75% 35%, rgba(61,90,254,0.18), transparent 55%), radial-gradient(ellipse 50% 50% at 15% 75%, rgba(0,198,255,0.10), transparent 55%), #070B16',
          }}
        />
        <div className="mesh-grid absolute inset-0 opacity-[0.10]" aria-hidden />

        <div className="relative z-10 mx-auto grid w-full max-w-[1360px] items-center gap-12 px-6 pb-16 pt-24 lg:grid-cols-[1.05fr_1fr] lg:px-10 lg:pt-20">
          {/* LEFT: COMMAND NARRATIVE & KINETIC TYPOGRAPHY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Status Pill */}
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan" />
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-cyan shadow-[0_0_20px_rgba(0,198,255,0.15)]">
                Coventry · West Midlands · UK
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[4rem]">
              <DecryptedText text="Websites engineered" speed={28} />
              <br />
              to <span className="gradient-text-purple">win work</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-[520px] text-base leading-relaxed text-text-secondary md:text-lg">
              Bespoke digital architecture for UK businesses ready to outrank template mills.
              Precision engineered for Google, AI search citations, and humans who buy.
            </p>

            {/* Magnetic CTA Buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton strength={18}>
                <Link
                  to="/contact"
                  className="inline-block w-full sm:w-auto rounded-full bg-cyan px-9 py-4 text-center text-sm font-semibold text-void shadow-[0_0_30px_rgba(0,198,255,0.45)] transition-all hover:brightness-110 hover:shadow-[0_0_45px_rgba(0,198,255,0.7)]"
                >
                  Book a Free Strategy Call
                </Link>
              </MagneticButton>
              <MagneticButton strength={18}>
                <Link
                  to="/work"
                  className="inline-block w-full sm:w-auto rounded-full border border-electric/40 px-8 py-4 text-center text-sm font-medium text-white transition hover:bg-electric/15 hover:border-cyan/50"
                >
                  View Client Work
                </Link>
              </MagneticButton>
            </div>

            {/* Live Metrics Counter */}
            <div className="mt-11 flex flex-wrap items-center gap-7 text-xs uppercase tracking-[0.16em] text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="text-cyan font-mono text-[11px]">FROM</span>
                <Counter to={799} prefix="£" duration={1.6} className="text-base font-bold text-white font-mono" />
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2">
                <span className="text-cyan font-mono text-[11px]">DELIVERY</span>
                <span className="text-base font-bold text-white font-mono">~2 WEEKS</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2">
                <span className="text-cyan font-mono text-[11px]">CLIENTS</span>
                <span className="text-base font-bold text-white font-mono">100% 5★</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: PHOTOREALISTIC 3D LUNAR SHOWCASE WITH INTERACTIVE HOTSPOTS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center justify-center overflow-visible w-full"
            data-cursor="drag"
            data-cursor-text="DRAG TO ORBIT ↺"
          >
            {/* Soft Ambient Depth Bloom (seamless infinite fade) */}
            <div className="pointer-events-none absolute -inset-24 rounded-full bg-gradient-to-tr from-cyan/10 via-electric/8 to-purple/10 blur-[120px] opacity-60" />

            {/* Upgraded 3D Celestial Canvas with Telemetry Dock */}
            <div className="relative w-full flex items-center justify-center overflow-visible">
              <VectorMoonCanvas className="w-full" />
            </div>

            {/* Refined Glass Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-4 flex items-center justify-center z-20"
            >
              <Link
                to={`/work/${featuredClient.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-xs text-text-secondary backdrop-blur-md transition-all duration-300 hover:border-cyan/50 hover:bg-white/[0.08] hover:text-white"
                data-cursor="explore"
                data-cursor-text="VIEW CASE STUDY ↗"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                <span>Featured Client: <strong className="text-white font-medium">{featuredClient.title}</strong></span>
                <span className="text-cyan transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* EMPIRICAL PERFORMANCE MATRIX TERMINAL */}
      <section className="section-pad relative border-t border-white/5" style={{ background: '#070B16' }}>
        <BenchmarkTerminal />
      </section>

      {/* INTERACTIVE PRODUCTION DEVICE LAB */}
      <section className="section-pad relative border-t border-white/5" style={{ background: '#080E1C' }}>
        <DeviceLab />
      </section>

      {/* SERVICES STRIP */}
      <section
        className="section-pad relative border-t border-white/5"
        style={{ background: 'linear-gradient(180deg, #080E1C 0%, #070B16 100%)' }}
      >
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">What we do</p>
          <h2 className="mb-12 max-w-xl text-3xl font-bold tracking-tight md:text-5xl">
            Design systems. Fast builds. <span className="gradient-text">Local growth.</span>
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Web Design', d: 'Custom interfaces that feel expensive without agency overhead.' },
              { t: 'Development', d: 'Mobile-first, fast, SEO-ready code that holds up under traffic.' },
              { t: 'Local SEO / GEO', d: 'Multi-page structure, schema, and content AI systems can cite.' },
              { t: 'E-Commerce', d: 'Stores that sell — products, trust, checkout that works on mobile.' },
            ].map((s, idx) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:shadow-[0_12px_32px_rgba(0,198,255,0.1)]"
              >
                <div className="mb-5 h-1 w-10 rounded-full bg-gradient-to-r from-cyan to-purple transition-all duration-300 group-hover:w-16" />
                <h3 className="mb-2 text-xl font-bold group-hover:text-cyan transition-colors">{s.t}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{s.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/services" className="text-sm font-semibold text-cyan hover:underline group flex items-center gap-1.5">
              Explore all services <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4-STAGE AEROSPACE SPRINT FLIGHT PLAN */}
      <section className="section-pad relative border-t border-white/5" style={{ background: '#070B16' }}>
        <ProcessFlightPlan />
      </section>

      {/* INTERACTIVE INVESTMENT CALCULATOR & PRICING */}
      <section
        id="scope-calculator"
        className="section-pad relative border-t border-white/5 scroll-mt-20"
        style={{ background: '#080E1C' }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">Investment &amp; ROI</p>
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Transparent packages. <span className="gradient-text">Zero agency bloat.</span>
            </h2>
            <p className="mx-auto max-w-lg text-text-secondary text-sm md:text-base">
              Configure your exact deliverables scope, or simulate your projected revenue return.
            </p>

            {/* Interactive Calculator Mode Switcher */}
            <div className="mt-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={() => handleTabSwitch('scope')}
                className={`rounded-full px-6 py-2.5 text-xs font-mono font-medium transition-all duration-300 ${
                  calculatorTab === 'scope'
                    ? 'bg-cyan text-void font-bold shadow-[0_0_20px_rgba(0,198,255,0.4)]'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                1. SCOPE BUILDER (£)
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch('roi')}
                className={`rounded-full px-6 py-2.5 text-xs font-mono font-medium transition-all duration-300 ${
                  calculatorTab === 'roi'
                    ? 'bg-cyan text-void font-bold shadow-[0_0_20px_rgba(0,198,255,0.4)]'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                2. REVENUE ROI SIMULATOR
              </button>
            </div>
          </div>

          {/* Interactive Calculator Display */}
          <div className="mb-16">
            {calculatorTab === 'scope' ? <ScopeCalculator /> : <RoiCalculator />}
          </div>

          {/* Fixed Package Reference Cards */}
          <div className="grid gap-6 md:grid-cols-3 text-left">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-cyan/40 bg-satellite shadow-[0_0_50px_rgba(0,198,255,0.14)]'
                    : 'border-white/10 bg-nebula/80 hover:border-white/20'
                }`}
              >
                {plan.highlighted && <BorderBeam duration={7} />}

                {plan.highlighted && (
                  <span className="mb-3 inline-block rounded-full bg-cyan px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-void shadow-[0_0_15px_rgba(0,198,255,0.5)]">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-1 text-3xl font-bold gradient-text">{plan.price}</p>
                <p className="mt-2 text-xs text-text-secondary">{plan.blurb}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-9 text-sm text-text-secondary text-center">{careDisclosure}</p>
          <div className="mt-7 flex justify-center">
            <MagneticButton strength={16}>
              <Link
                to="/pricing"
                className="inline-flex rounded-full border border-electric/50 px-9 py-3.5 text-sm font-medium text-white transition hover:bg-electric/20 hover:border-cyan/50"
              >
                Full pricing details
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <Testimonials />

      {/* CTA SECTION */}
      <section
        className="relative overflow-hidden px-6 py-32 text-center"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 100%, rgba(61,90,254,0.30), transparent), #070B16',
        }}
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-6xl">
          Ready to <span className="gradient-text-purple">launch?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-text-secondary text-base">
          Free 15-minute call. Proposal within 24 hours. Coventry &amp; UK-wide.
        </p>
        <div className="mt-9 flex justify-center">
          <MagneticButton strength={22}>
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-cyan px-11 py-4 text-sm font-semibold text-void shadow-[0_0_30px_rgba(0,198,255,0.6)] transition-all hover:brightness-110 hover:shadow-[0_0_45px_rgba(0,198,255,0.85)]"
            >
              Book Your Free Call
            </Link>
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
