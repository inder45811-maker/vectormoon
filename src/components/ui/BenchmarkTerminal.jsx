import { useState } from 'react'
import { motion } from 'framer-motion'
import { playHapticClick } from '../../utils/audio'

// Honest comparison: no invented scores, timings or percentages.
// Every line below describes what we do on a build (or a common problem we
// fix), not a measurement. Publish real, dated PageSpeed results here only
// once they have actually been measured.
const STACKS = {
  template: {
    id: 'template',
    name: 'Typical template site',
    subtitle: 'Common problems we see when we review small-business sites',
    metrics: [
      { label: 'Speed on a phone', value: 'Often slow', note: 'Page builders and plugins load lots of code before anything shows' },
      { label: 'Page weight', value: 'Often heavy', note: 'Full-size photos and unused theme files' },
      { label: 'Getting in touch', value: 'Often buried', note: 'Phone number and form hard to find on mobile' },
      { label: 'Google understanding', value: 'Often thin', note: 'One page trying to rank for every service and town' },
      { label: 'Upkeep', value: 'Plugin updates', note: 'Things break when plugins or themes update' },
    ],
    summary:
      'Not every template site is bad, but these are the issues we most often find when we look at a small business website. Check yours with the free Google PageSpeed tool below.',
  },
  vectormoon: {
    id: 'vectormoon',
    name: 'How we build',
    subtitle: 'Hand-written React + Vite, structured data, mobile-first',
    metrics: [
      { label: 'Speed on a phone', value: 'Tested', note: 'We run PageSpeed / Lighthouse on mobile before launch and share the results with you' },
      { label: 'Page weight', value: 'Kept lean', note: 'Images compressed and resized; no page-builder or plugin bloat' },
      { label: 'Getting in touch', value: 'Up front', note: 'Tap-to-call, email and an enquiry form that works on a phone' },
      { label: 'Google understanding', value: 'Page per intent', note: 'Separate pages, titles and schema for each service and area' },
      { label: 'Upkeep', value: 'No plugins', note: 'Static build, so there are no plugins to update or break' },
    ],
    summary:
      'We build each site by hand rather than starting from a theme, then test it on real phone-sized screens and with Google PageSpeed before it goes live. We share the actual scores with you rather than promising a number up front.',
  },
}

export default function BenchmarkTerminal() {
  const [selectedStack, setSelectedStack] = useState('vectormoon')

  const handleSelectStack = (stackKey) => {
    playHapticClick()
    setSelectedStack(stackKey)
  }

  const current = STACKS[selectedStack]
  const isOurs = selectedStack === 'vectormoon'

  return (
    <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl border border-white/10 bg-nebula/60 p-6 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
      {/* Background soft ambient gradient */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full bg-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-[380px] w-[380px] rounded-full bg-purple/10 blur-3xl" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              How we build vs. a typical template
            </span>
          </div>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-white">
            Why a hand-built site beats <span className="gradient-text">template bloat.</span>
          </h2>
        </div>

        <a
          href="https://pagespeed.web.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-5 py-2.5 text-xs font-mono font-semibold text-cyan transition hover:bg-cyan hover:text-void shadow-[0_0_20px_rgba(0,198,255,0.2)]"
          data-cursor="pointer"
        >
          <span>⚡</span>
          <span>TEST YOUR SITE ON GOOGLE PAGESPEED ↗</span>
        </a>
      </div>

      {/* Stack Comparison Switcher Tabs */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleSelectStack('vectormoon')}
          className={`flex-1 min-w-[240px] rounded-xl border p-4 text-left transition-all duration-300 ${
            isOurs
              ? 'border-cyan/50 bg-white/[0.06] shadow-[0_0_30px_rgba(0,198,255,0.15)]'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
          }`}
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-cyan">VECTORMOON</span>
          <div className="mt-1 text-lg font-bold text-white">{STACKS.vectormoon.name}</div>
          <div className="text-xs text-text-secondary">{STACKS.vectormoon.subtitle}</div>
        </button>

        <button
          type="button"
          onClick={() => handleSelectStack('template')}
          className={`flex-1 min-w-[240px] rounded-xl border p-4 text-left transition-all duration-300 ${
            !isOurs
              ? 'border-red-500/40 bg-white/[0.06] shadow-[0_0_30px_rgba(239,68,68,0.1)]'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
          }`}
        >
          <span className="font-mono text-[11px] uppercase tracking-wider text-red-400">TEMPLATE / PAGE BUILDER</span>
          <div className="mt-1 text-lg font-bold text-white">{STACKS.template.name}</div>
          <div className="text-xs text-text-secondary">{STACKS.template.subtitle}</div>
        </button>
      </div>

      {/* Points Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {current.metrics.map((m) => (
          <motion.div
            key={`${selectedStack}-${m.label}`}
            layout
            className={`rounded-2xl border p-5 transition-all duration-300 ${
              isOurs
                ? 'border-emerald-500/20 bg-emerald-500/[0.03] hover:border-emerald-500/40'
                : 'border-red-500/20 bg-red-500/[0.03] hover:border-red-500/40'
            }`}
          >
            <div className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">{m.label}</div>
            <div
              className={`mt-2 font-mono text-xl font-bold tracking-tight ${
                isOurs ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {m.value}
            </div>
            <p className="mt-2.5 text-[11px] text-text-secondary leading-snug">{m.note}</p>
          </motion.div>
        ))}
      </div>

      {/* Summary Banner */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
          <strong className="text-white font-medium">{isOurs ? 'Our approach: ' : 'What we often find: '}</strong>
          {current.summary}
        </p>
      </div>
    </div>
  )
}
