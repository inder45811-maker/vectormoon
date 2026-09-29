import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Counter from './Counter'
import MagneticButton from './MagneticButton'
import { playHapticClick, playChime } from '../../utils/audio'
import { trackCalculatorEngagement, trackCtaClick } from '../../utils/analytics'

const TIERS = [
  {
    id: 'core',
    name: 'Core Authority Site',
    price: 799,
    timeline: '10-14 days',
    desc: 'Bespoke custom architecture to replace template mills. Engineered for local trust & search.',
    features: ['Up to 5 bespoke pages', 'Mobile-first speed architecture', 'Google Search & Schema verification'],
  },
  {
    id: 'growth',
    name: 'Growth Conversion Engine',
    price: 1499,
    timeline: '14-21 days',
    desc: 'Multi-page GEO capture system designed to rank across surrounding towns and capture bookings.',
    features: ['Up to 12 targeted pages', 'Sub-service & local landing pages', 'Automated booking & lead triage'],
    recommended: true,
  },
  {
    id: 'scale',
    name: 'Bespoke Enterprise / E-Commerce',
    price: 2799,
    timeline: '3-4 weeks',
    desc: 'Complete headless build, online store, or complex web applications with 3D product visualizers.',
    features: ['Unlimited custom page architecture', 'High-speed payment checkout', 'Bespoke WebGL / 3D product integration'],
  },
]

const ADDONS = [
  {
    id: 'geo_ai',
    name: 'AI Search & Citation Optimization',
    desc: 'Structured JSON-LD schema so ChatGPT, Perplexity, and Apple Intelligence cite you as the #1 local authority.',
    price: 250,
  },
  {
    id: 'webgl_3d',
    name: 'Bespoke 3D Interactive WebGL Feature',
    desc: 'Custom interactive 3D model, celestial ring, or product visualizer engineered in Three.js.',
    price: 350,
  },
  {
    id: 'sprint',
    name: 'VIP 7-Day Sprint Delivery',
    desc: 'Priority queue slot with guaranteed complete production delivery in 7 business days.',
    price: 300,
  },
]

export default function ScopeCalculator() {
  const [selectedTier, setSelectedTier] = useState('growth')
  const [selectedAddons, setSelectedAddons] = useState(['geo_ai'])

  const activeTier = TIERS.find((t) => t.id === selectedTier) || TIERS[1]

  const totalPrice = useMemo(() => {
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const item = ADDONS.find((a) => a.id === id)
      return sum + (item ? item.price : 0)
    }, 0)
    return activeTier.price + addonsTotal
  }, [activeTier, selectedAddons])

  const toggleAddon = (id) => {
    playHapticClick()
    playChime(660)
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  const handleTierSelect = (id) => {
    playHapticClick()
    playChime(520)
    setSelectedTier(id)
  }

  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#0a0f1e]/90 p-6 md:p-10 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan">Interactive Investment Builder</span>
          <h3 className="mt-1 text-2xl font-bold md:text-3xl">Configure Your Build Scope</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Transparent pricing with zero hidden fees. Select requirements to see your real-time investment.
          </p>
        </div>
        <div className="flex items-baseline gap-2 rounded-2xl border border-cyan/30 bg-cyan/5 px-6 py-4">
          <span className="text-xs font-mono uppercase tracking-wider text-text-secondary">ESTIMATED TOTAL:</span>
          <span className="text-3xl font-bold font-mono gradient-text">
            £<Counter to={totalPrice} duration={0.8} />
          </span>
        </div>
      </div>

      {/* Step 1: Base Tier Selection */}
      <div className="mt-8">
        <p className="mb-4 text-xs font-mono uppercase tracking-wider text-text-secondary">
          1. Choose Foundation Tier:
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => {
            const isSelected = tier.id === selectedTier
            return (
              <div
                key={tier.id}
                onClick={() => handleTierSelect(tier.id)}
                className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                  isSelected
                    ? 'border-cyan bg-satellite shadow-[0_0_30px_rgba(0,198,255,0.15)] ring-1 ring-cyan'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
                data-cursor="click"
              >
                {tier.recommended && (
                  <span className="absolute -top-3 right-4 rounded-full bg-cyan px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-void">
                    Popular
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">{tier.name}</h4>
                  <span className="text-lg font-bold font-mono text-cyan">£{tier.price}</span>
                </div>
                <p className="mt-2 text-xs text-text-secondary line-clamp-2 leading-relaxed">{tier.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-cyan">
                  <span>⏱ Turnaround: {tier.timeline}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Step 2: Add-On Customization */}
      <div className="mt-8">
        <p className="mb-4 text-xs font-mono uppercase tracking-wider text-text-secondary">
          2. Specialized Capabilities &amp; Accelerators:
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {ADDONS.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id)
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
                  isChecked
                    ? 'border-cyan/70 bg-cyan/5 text-white'
                    : 'border-white/10 bg-white/[0.02] text-text-secondary hover:border-white/20'
                }`}
                data-cursor="click"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-white">{addon.name}</span>
                    <span className="text-xs font-mono font-bold text-cyan whitespace-nowrap">+£{addon.price}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">{addon.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      isChecked ? 'border-cyan bg-cyan text-void' : 'border-white/20 bg-transparent'
                    }`}
                  >
                    {isChecked && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] font-mono tracking-wider">{isChecked ? 'INCLUDED' : 'SELECT'}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer / CTA Bar */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div>
          <span className="text-xs font-mono text-cyan">ESTIMATED LAUNCH:</span>
          <p className="text-sm font-medium text-white">
            {activeTier.timeline} · Fixed Price Agreement · Includes Full Post-Launch Handover
          </p>
        </div>
        <MagneticButton strength={15}>
          <Link
            to={`/contact?plan=${activeTier.id}&scope=${selectedAddons.join(',')}&total=${totalPrice}`}
            onClick={() => {
              trackCalculatorEngagement({
                type: 'scope_calculator',
                plan: activeTier.id,
                addons: selectedAddons,
                total: totalPrice,
              })
              trackCtaClick({
                text: `Lock In This Scope (£${totalPrice})`,
                destination: `/contact?plan=${activeTier.id}&scope=${selectedAddons.join(',')}&total=${totalPrice}`,
                section: 'scope_calculator',
              })
            }}
            className="inline-flex items-center gap-2 rounded-full bg-cyan px-8 py-3.5 text-sm font-semibold text-void shadow-[0_0_25px_rgba(0,198,255,0.4)] transition hover:brightness-110"
            data-cursor="click"
          >
            <span>Lock In This Scope (£{totalPrice})</span>
            <span>→</span>
          </Link>
        </MagneticButton>
      </div>
    </div>
  )
}
