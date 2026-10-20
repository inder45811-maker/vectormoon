import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playHapticClick, playTelemetryPing } from '../../utils/audio'

const PHASES = [
  {
    phase: '01',
    code: 'ORBITAL RECON',
    days: 'DAYS 1 — 3',
    title: 'Revenue Bottlenecks & Search Recon',
    summary: 'We diagnose your current traffic, audit top-ranking competitors in Coventry and UK-wide, and engineer the user flow to turn visitors into buyers.',
    deliverables: [
      'Competitor architectural audit & keyword gap analysis',
      'High-intent buyer user journey mapping',
      'Information architecture & conversion funnel draft',
      'Technical SEO & local GEO schema strategy',
    ],
    milestone: 'APPROVED STRATEGIC FLIGHT PLAN',
    accent: '#00C6FF',
    badgeClass: 'text-cyan border-cyan/40 bg-cyan/10',
  },
  {
    phase: '02',
    code: 'INTERFACE ARCHITECTURE',
    days: 'DAYS 4 — 8',
    title: 'Bespoke UI, 3D Canvas & Typography',
    summary: 'Zero cookie-cutter templates. We design custom interactive interfaces with high-contrast luxury aesthetics, 3D spatial accents, and frictionless mobile navigation.',
    deliverables: [
      'Design mock-ups for desktop and mobile for you to review',
      'Visual accents and micro-interactions where they help (optional)',
      'Bespoke typography hierarchy and dark-mode color tokens',
      'Conversion-centered copywriting polish',
    ],
    milestone: 'CLIENT DESIGN SYSTEM SIGN-OFF',
    accent: '#3D5AFE',
    badgeClass: 'text-electric border-electric/40 bg-electric/10',
  },
  {
    phase: '03',
    code: 'VELOCITY COMPILATION',
    days: 'DAYS 9 — 12',
    title: 'Zero-Bloat Production Code',
    summary: 'We hand-write clean, modular React and Vite components. No bloated themes and no fragile plugins, and we test speed on mobile as we build.',
    deliverables: [
      'Handwritten React + Vite component architecture',
      'Compressed, correctly sized images (WebP where supported)',
      'Mobile-first layouts with tap-to-call and an enquiry form',
      'Checked at phone, tablet and desktop sizes before you see it',
    ],
    milestone: 'STAGING URL DELIVERED FOR TESTING',
    accent: '#7B61FF',
    badgeClass: 'text-purple border-purple/40 bg-purple/10',
  },
  {
    phase: '04',
    code: 'ORBITAL LAUNCH',
    days: 'DAYS 13 — 14',
    title: 'Launch, Search Console & Handover',
    summary: 'We put your site live on fast static hosting, connect your domain, set up Google Search Console, submit your sitemap, and send you the real PageSpeed results.',
    deliverables: [
      'Static hosting with HTTPS on your own domain',
      'Schema.org JSON-LD markup for your business, services and FAQs',
      'Google Analytics 4 & Search Console configuration',
      'Mobile PageSpeed report at launch & 30 days of post-launch support',
    ],
    milestone: 'PUBLIC PRODUCTION LAUNCH & HANDOFF',
    accent: '#00E676',
    badgeClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  },
]

export default function ProcessFlightPlan() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

  const handleSelectPhase = (index) => {
    playHapticClick()
    playTelemetryPing(index === 3)
    setActivePhaseIndex(index)
  }

  const current = PHASES[activePhaseIndex]

  return (
    <div className="relative mx-auto max-w-[1280px]">
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">
          Aerospace Delivery Pipeline
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl text-white">
          From brief to launch <span className="gradient-text">in 1–2 weeks.</span>
        </h2>
        <p className="mt-3 text-text-secondary max-w-xl mx-auto text-sm md:text-base">
          A 4-stage plan with clear milestones for Core Build and Growth Engine sites (Enterprise Scale projects typically take 3–4 weeks). Timings start once your content and feedback are ready.
        </p>
      </div>

      {/* Interactive Phase Stepper Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {PHASES.map((p, idx) => {
          const isSelected = idx === activePhaseIndex
          return (
            <button
              key={p.phase}
              type="button"
              onClick={() => handleSelectPhase(idx)}
              className={`rounded-2xl border p-4 text-left transition-all duration-300 relative overflow-hidden ${
                isSelected
                  ? 'border-cyan/50 bg-white/[0.08] shadow-[0_0_30px_rgba(0,198,255,0.18)]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan via-electric to-purple" />
              )}
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className={isSelected ? 'text-cyan font-bold' : 'text-text-secondary'}>
                  PHASE {p.phase}
                </span>
                <span className="text-white/60">{p.days}</span>
              </div>
              <div className="mt-2 font-bold text-white text-sm md:text-base truncate">
                {p.code}
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Phase Deep Dive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.phase}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-white/10 bg-nebula/50 p-6 md:p-10 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.7)]"
        >
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-0.5 font-mono text-xs font-semibold ${current.badgeClass}`}>
                  PHASE {current.phase} // {current.days}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 font-mono text-xs text-text-secondary">
                  SPRINT CADENCE
                </span>
              </div>

              <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white">
                {current.title}
              </h3>
              <p className="mt-3 text-sm md:text-base text-text-secondary leading-relaxed">
                {current.summary}
              </p>

              <div className="mt-6 space-y-2.5">
                <div className="font-mono text-xs uppercase tracking-wider text-cyan">
                  SPRINT DELIVERABLES &amp; ARTIFACTS:
                </div>
                {current.deliverables.map((d) => (
                  <div key={d} className="flex items-start gap-2.5 text-xs md:text-sm text-text-secondary">
                    <span className="text-cyan font-mono mt-0.5">✔</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestone Badge Chassis */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
              <div className="h-16 w-16 rounded-full border border-cyan/40 bg-cyan/10 flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(0,198,255,0.3)]">
                🚀
              </div>
              <div className="mt-4 font-mono text-xs uppercase tracking-widest text-cyan">
                STAGE GATE APPROVAL:
              </div>
              <div className="mt-1 font-mono text-sm md:text-base font-bold text-white">
                {current.milestone}
              </div>
              <p className="mt-2 text-xs text-text-secondary max-w-xs">
                Work only advances to the next phase after your explicit sign-off on staging deliverables.
              </p>
              <div className="mt-6 flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>FIXED PRICE, AGREED UP FRONT</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
