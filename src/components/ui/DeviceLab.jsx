import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { playHapticClick, playTelemetryPing } from '../../utils/audio'
import MagneticButton from './MagneticButton'

export default function DeviceLab() {
  const [activeProjectSlug, setActiveProjectSlug] = useState('punjabi-number-plates')
  const [deviceMode, setDeviceMode] = useState('desktop') // 'desktop' | 'mobile'

  const activeProject = projects.find((p) => p.slug === activeProjectSlug) || projects[0]

  const handleSelectProject = (slug) => {
    playHapticClick()
    setActiveProjectSlug(slug)
  }

  const handleSelectDevice = (mode) => {
    playTelemetryPing(mode === 'mobile')
    setDeviceMode(mode)
  }

  return (
    <div className="relative mx-auto max-w-[1280px]">
      {/* Section Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">
              Interactive Production Device Lab
            </p>
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl text-white">
            Real clients. <span className="gradient-text">Live responsive builds.</span>
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl text-sm md:text-base">
            Every site is engineered from scratch for high conversion, search visibility, and flawless responsive rendering.
          </p>
        </div>

        {/* Device Viewport Toggle */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md self-start md:self-auto">
          <button
            type="button"
            onClick={() => handleSelectDevice('desktop')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono transition-all duration-300 ${
              deviceMode === 'desktop'
                ? 'bg-cyan text-void font-bold shadow-[0_0_20px_rgba(0,198,255,0.4)]'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>DESKTOP 4K</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectDevice('mobile')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono transition-all duration-300 ${
              deviceMode === 'mobile'
                ? 'bg-cyan text-void font-bold shadow-[0_0_20px_rgba(0,198,255,0.4)]'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="2" width="14" height="20" rx="3" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <span>MOBILE VIEW</span>
          </button>
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {projects.map((p) => {
          const isSelected = p.slug === activeProject.slug
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => handleSelectProject(p.slug)}
              className={`rounded-full px-5 py-2.5 text-xs font-mono font-medium transition-all duration-300 ${
                isSelected
                  ? 'border border-cyan/50 bg-white/[0.08] text-white shadow-[0_0_25px_rgba(0,198,255,0.2)]'
                  : 'border border-white/10 bg-white/[0.02] text-text-secondary hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-cyan font-bold mr-1.5">[{p.tag}]</span>
              <span>{p.title}</span>
            </button>
          )
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] items-center">
        {/* Device Frame Display with Animated Mode */}
        <div className="relative flex items-center justify-center p-4 sm:p-8 rounded-3xl border border-white/10 bg-nebula/40 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden min-h-[460px] md:min-h-[560px]">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan/10 via-electric/5 to-purple/10 blur-2xl opacity-60" />

          <AnimatePresence mode="wait">
            {deviceMode === 'desktop' ? (
              <motion.div
                key={`desktop-${activeProject.slug}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-[800px] overflow-hidden rounded-2xl border border-white/15 bg-void shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
              >
                {/* Browser Chrome Header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-mono text-white/50">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/70">
                    <span className="text-cyan">🔒</span>
                    <span>{activeProject.url.replace('https://', '')}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">100/100 SPEED</span>
                </div>
                {/* Screenshot Image */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-void">
                  <img
                    src={activeProject.image}
                    alt={`${activeProject.title} desktop build`}
                    className="h-full w-full object-cover object-top transition duration-700 hover:scale-105"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`mobile-${activeProject.slug}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
                className="relative w-[280px] sm:w-[320px] overflow-hidden rounded-[38px] border-[5px] border-white/20 bg-void p-1 shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
              >
                {/* Dynamic Island Notch */}
                <div className="absolute top-3 inset-x-0 mx-auto h-4 w-24 rounded-full bg-black/80 z-20" />
                {/* Mobile Screenshot */}
                <div className="aspect-[9/19] w-full overflow-hidden rounded-[32px] bg-void">
                  <img
                    src={activeProject.imageMobile || activeProject.image}
                    alt={`${activeProject.title} mobile build`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project Intelligence & Telemetry Card */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan/40 bg-cyan/10 px-3 py-0.5 font-mono text-xs text-cyan">
              {activeProject.tag}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 font-mono text-xs text-text-secondary">
              {activeProject.location}
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 font-mono text-xs text-emerald-400">
              VERIFIED LIVE CLIENT
            </span>
          </div>

          <h3 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {activeProject.title}
          </h3>
          <p className="mt-2 text-base text-text-secondary leading-relaxed">
            {activeProject.tagline}
          </p>
          <p className="mt-3 text-sm text-text-secondary/80 leading-relaxed">
            {activeProject.description}
          </p>

          {/* Key Deliverables & Results */}
          <div className="mt-6 space-y-2.5">
            <div className="font-mono text-xs uppercase tracking-wider text-cyan">ENGINEERING DELIVERABLES:</div>
            {activeProject.results.map((r) => (
              <div key={r} className="flex items-start gap-2.5 text-xs text-text-secondary">
                <span className="text-cyan font-mono mt-0.5">✦</span>
                <span>{r}</span>
              </div>
            ))}
          </div>

          {/* Technology Stack Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {activeProject.stack.map((s) => (
              <span key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-white/80">
                {s}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton strength={15}>
              <Link
                to={`/work/${activeProject.slug}`}
                className="inline-flex rounded-full bg-cyan px-7 py-3 text-xs font-semibold text-void shadow-[0_0_25px_rgba(0,198,255,0.4)] transition hover:brightness-110"
              >
                Deep-Dive Case Study →
              </Link>
            </MagneticButton>

            <a
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-6 py-3 text-xs font-medium text-white transition hover:border-cyan/50 hover:bg-white/5"
            >
              <span>Visit Live Production Site</span>
              <span className="text-cyan">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
