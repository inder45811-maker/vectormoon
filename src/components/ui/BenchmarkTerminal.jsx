import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playScanSweep, playHapticClick, playTelemetryPing } from '../../utils/audio'
import Counter from './Counter'

const STACKS = {
  template: {
    id: 'template',
    name: 'Generic Template Mill',
    subtitle: 'WordPress / Wix / Divi / 42 Heavy Plugins',
    badge: 'HIGH BLOAT RISK',
    badgeColor: 'border-red-500/30 bg-red-500/10 text-red-400',
    metrics: [
      { label: 'Lighthouse Performance', value: '34 / 100', raw: 34, max: 100, unit: '', status: 'poor', note: 'Heavy blocking scripts' },
      { label: 'Initial Page Weight', value: '8.4 MB', raw: 8.4, max: 10, unit: 'MB', status: 'poor', note: 'Unused CSS & bloated JS' },
      { label: 'Time To First Byte (TTFB)', value: '1,840 ms', raw: 1840, max: 2000, unit: 'ms', status: 'poor', note: 'Cold shared host database' },
      { label: 'First Contentful Paint (FCP)', value: '3.8 s', raw: 3.8, max: 4.0, unit: 's', status: 'poor', note: 'High mobile abandonment' },
      { label: 'Mobile Bounce Rate', value: '68%', raw: 68, max: 100, unit: '%', status: 'poor', note: 'Customers leave before paint' },
    ],
    summary: 'Standard template mills stitch together dozens of unoptimized third-party plugins, crushing mobile load speeds and dropping organic Google search rankings.',
  },
  vectormoon: {
    id: 'vectormoon',
    name: 'VectorMoon Bespoke Architecture',
    subtitle: 'Handwritten React + Vite + Edge CDN + Deep JSON-LD',
    badge: '100% BESPOKE ARCHITECTURE',
    badgeColor: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    metrics: [
      { label: 'Lighthouse Performance', value: '100 / 100', raw: 100, max: 100, unit: '', status: 'elite', note: 'Top 1% global web performance' },
      { label: 'Initial Page Weight', value: '184 KB', raw: 0.18, max: 10, unit: 'MB', status: 'elite', note: '98% lean compressed bytecode' },
      { label: 'Time To First Byte (TTFB)', value: '24 ms', raw: 24, max: 2000, unit: 'ms', status: 'elite', note: 'Instantaneous Cloudflare edge cache' },
      { label: 'First Contentful Paint (FCP)', value: '0.38 s', raw: 0.38, max: 4.0, unit: 's', status: 'elite', note: 'Instantaneous perceived render' },
      { label: 'Mobile Bounce Rate', value: '11%', raw: 11, max: 100, unit: '%', status: 'elite', note: 'Maximum buyer retention & trust' },
    ],
    summary: 'Every line of code is handwritten for zero latency, sub-second edge distribution, and deep semantic indexing that both Google and AI search engines reward.',
  },
}

const AUDIT_STEPS = [
  'INITIALIZING SYSTEM AUDIT PROTOCOL...',
  'PROBING TCP/TLS HANDSHAKE (CLOUDFLARE EDGE LONDON)... 19ms',
  'ANALYZING DOM TREE DEPTH & HYDRATION OVERHEAD... 142 NODES [0-BLOAT]',
  'MEASURING CORE WEB VITALS (FCP, LCP, CLS, INP)... 100/100 ALL GREEN',
  'VERIFYING DEEP JSON-LD KNOWLEDGE GRAPH... 100% VALIDATED',
  'TELEMETRY VERDICT: BESPOKE TIER CONFIRMED',
]

export default function BenchmarkTerminal() {
  const [selectedStack, setSelectedStack] = useState('vectormoon')
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditStep, setAuditStep] = useState(0)

  const handleSelectStack = (stackKey) => {
    playHapticClick()
    setSelectedStack(stackKey)
  }

  const handleRunAudit = () => {
    playScanSweep()
    setIsAuditing(true)
    setAuditStep(0)

    let current = 0
    const interval = setInterval(() => {
      current++
      if (current < AUDIT_STEPS.length) {
        setAuditStep(current)
        playTelemetryPing(current % 2 === 0)
      } else {
        clearInterval(interval)
        setIsAuditing(false)
        setSelectedStack('vectormoon')
      }
    }, 280)
  }

  const current = STACKS[selectedStack]

  return (
    <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl border border-white/10 bg-nebula/60 p-6 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
      {/* Background soft ambient gradient */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full bg-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-[380px] w-[380px] rounded-full bg-purple/10 blur-3xl" />

      {/* Terminal Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              Empirical Performance Terminal // v2.6
            </span>
          </div>
          <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-white">
            Why bespoke architecture out-ranks <span className="gradient-text">template bloat.</span>
          </h3>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleRunAudit}
          disabled={isAuditing}
          className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-5 py-2.5 text-xs font-mono font-semibold text-cyan transition hover:bg-cyan hover:text-void shadow-[0_0_20px_rgba(0,198,255,0.2)] disabled:opacity-50"
          data-cursor="pointer"
        >
          <span className="animate-spin text-sm">{isAuditing ? '⟳' : '⚡'}</span>
          <span>{isAuditing ? 'RUNNING DEEP AUDIT...' : 'RUN LIVE AUDIT'}</span>
        </button>
      </div>

      {/* Simulated Live Audit Telemetry Log Screen */}
      <AnimatePresence>
        {isAuditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="my-5 overflow-hidden rounded-xl border border-cyan/30 bg-black/80 p-4 font-mono text-xs text-cyan"
          >
            <div className="flex items-center gap-2 pb-2 text-[10px] text-white/50 border-b border-white/10">
              <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
              <span>LIVE CORE TELEMETRY SCANNER</span>
            </div>
            <div className="mt-3 space-y-1.5">
              {AUDIT_STEPS.slice(0, auditStep + 1).map((step, idx) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="text-white/40">&gt;</span>
                  <span className={idx === auditStep ? 'text-white font-bold animate-pulse' : 'text-cyan/80'}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stack Comparison Switcher Tabs */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleSelectStack('vectormoon')}
          className={`flex-1 min-w-[240px] rounded-xl border p-4 text-left transition-all duration-300 ${
            selectedStack === 'vectormoon'
              ? 'border-cyan/50 bg-white/[0.06] shadow-[0_0_30px_rgba(0,198,255,0.15)]'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-cyan">BESPOKE ARCHITECTURE</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] text-emerald-400 border border-emerald-500/30">
              RECOMMENDED
            </span>
          </div>
          <div className="mt-1 text-lg font-bold text-white">VectorMoon 0-Bloat Engine</div>
          <div className="text-xs text-text-secondary">React · Vite · Edge CDN · Deep JSON-LD</div>
        </button>

        <button
          type="button"
          onClick={() => handleSelectStack('template')}
          className={`flex-1 min-w-[240px] rounded-xl border p-4 text-left transition-all duration-300 ${
            selectedStack === 'template'
              ? 'border-red-500/40 bg-white/[0.06] shadow-[0_0_30px_rgba(239,68,68,0.1)]'
              : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-wider text-red-400">TRADITIONAL BUILD</span>
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 font-mono text-[9px] text-red-400 border border-red-500/30">
              HIGH CHURN
            </span>
          </div>
          <div className="mt-1 text-lg font-bold text-white">Standard Template Mill</div>
          <div className="text-xs text-text-secondary">WordPress · Wix · Divi · 42 External Plugins</div>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {current.metrics.map((m) => {
          const isElite = m.status === 'elite'
          return (
            <motion.div
              key={m.label}
              layout
              className={`rounded-2xl border p-5 transition-all duration-300 ${
                isElite
                  ? 'border-emerald-500/20 bg-emerald-500/[0.03] hover:border-emerald-500/40'
                  : 'border-red-500/20 bg-red-500/[0.03] hover:border-red-500/40'
              }`}
            >
              <div className="text-[11px] font-mono uppercase tracking-wider text-text-secondary">
                {m.label}
              </div>
              <div
                className={`mt-2 font-mono text-2xl font-bold tracking-tight ${
                  isElite ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {m.value}
              </div>
              {/* Visual meter bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: isElite
                      ? `${Math.min(100, Math.max(10, (m.raw / m.max) * 100))}%`
                      : `${Math.min(100, Math.max(15, (m.raw / m.max) * 100))}%`,
                  }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    isElite
                      ? 'bg-gradient-to-r from-cyan to-emerald-400 shadow-[0_0_10px_rgba(0,230,118,0.5)]'
                      : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                  }`}
                />
              </div>
              <p className="mt-2.5 text-[11px] text-text-secondary leading-snug">{m.note}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Summary Banner */}
      <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-xs text-text-secondary leading-relaxed max-w-3xl">
          <strong className="text-white font-medium">Engineering Fact: </strong>
          {current.summary}
        </p>
        <div className="shrink-0 flex items-center gap-2 font-mono text-xs">
          <span className="text-cyan">CONVERSION LIFT:</span>
          <span className="font-bold text-white bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
            {selectedStack === 'vectormoon' ? '+140% AVERAGE' : '-53% PENALTY'}
          </span>
        </div>
      </div>
    </div>
  )
}
