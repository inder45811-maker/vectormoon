import { useState, useId } from 'react'
import { plans } from '../../data/pricing'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Counter from './Counter'
import MagneticButton from './MagneticButton'
import { playHapticClick, playChime } from '../../utils/audio'

export default function RoiCalculator() {
  const visitorsId = useId()
  const ticketId = useId()
  const convId = useId()
  const liftId = useId()

  const [visitors, setVisitors] = useState(2500)
  const [ticket, setTicket] = useState(280)
  const [currConv, setCurrConv] = useState(1.2) // 1.2%
  // Your own what-if assumption, not a promise or an average from our clients.
  const [liftPct, setLiftPct] = useState(20)

  const handleVisitorsChange = (e) => {
    setVisitors(Number(e.target.value))
    playHapticClick()
  }

  const handleTicketChange = (e) => {
    setTicket(Number(e.target.value))
    playHapticClick()
  }

  const handleConvChange = (e) => {
    setCurrConv(Number(e.target.value))
    playHapticClick()
  }

  // Calculations
  const baseMonthlyOrders = Math.round(visitors * (currConv / 100))
  const baseMonthlyRevenue = baseMonthlyOrders * ticket

  // What-if only: the improvement is chosen by the visitor, not claimed by us.
  const newConv = currConv * (1 + liftPct / 100)
  const newMonthlyOrders = Math.round(visitors * (newConv / 100))
  const newMonthlyRevenue = newMonthlyOrders * ticket

  const monthlyLift = Math.max(0, newMonthlyRevenue - baseMonthlyRevenue)
  const annualLift = monthlyLift * 12

  // Payback based on the Growth package price shown on the pricing page
  const growthPlan = plans.find((p) => p.highlighted) || plans[0]
  const estimatedPackageCost = Number(String(growthPlan.price).replace(/[^0-9]/g, '')) || 0
  const paybackDays = monthlyLift > 0 ? Math.round((estimatedPackageCost / monthlyLift) * 30) : null

  return (
    <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl border border-white/10 bg-nebula/60 p-6 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              What-if Revenue Calculator
            </span>
          </div>
          <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-white">
            What would more enquiries <span className="gradient-text">be worth to you?</span>
          </h3>
          <p className="mt-1 text-xs md:text-sm text-text-secondary">
            Plug in your own numbers and your own assumption. This is an illustration, not a forecast or a guarantee.
          </p>
        </div>

        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs text-emerald-400 self-start md:self-auto">
          ILLUSTRATION ONLY
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
        {/* Sliders Input Panel */}
        <div className="space-y-6">
          {/* Slider 1: Monthly Visitors */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor={visitorsId} className="text-text-secondary uppercase tracking-wider">
                Monthly Website Visitors:
              </label>
              <span className="text-lg font-bold text-white font-mono">
                {visitors.toLocaleString()} <span className="text-xs text-cyan">visits</span>
              </span>
            </div>
            <input
              id={visitorsId}
              type="range"
              min="500"
              max="25000"
              step="250"
              value={visitors}
              onChange={handleVisitorsChange}
              className="mt-2 w-full accent-[#00C6FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/30">
              <span>500</span>
              <span>12,500</span>
              <span>25,000+</span>
            </div>
          </div>

          {/* Slider 2: Average Customer Value */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor={ticketId} className="text-text-secondary uppercase tracking-wider">
                Average Customer / Order Value:
              </label>
              <span className="text-lg font-bold text-white font-mono">
                £{ticket.toLocaleString()} <span className="text-xs text-cyan">avg ticket</span>
              </span>
            </div>
            <input
              id={ticketId}
              type="range"
              min="50"
              max="2500"
              step="25"
              value={ticket}
              onChange={handleTicketChange}
              className="mt-2 w-full accent-[#00C6FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/30">
              <span>£50</span>
              <span>£1,250</span>
              <span>£2,500+</span>
            </div>
          </div>

          {/* Slider 3: Current Conversion Rate */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor={convId} className="text-text-secondary uppercase tracking-wider">
                Current Estimated Conversion Rate:
              </label>
              <span className="text-lg font-bold text-white font-mono">
                {currConv.toFixed(1)}% <span className="text-xs text-cyan">baseline</span>
              </span>
            </div>
            <input
              id={convId}
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={currConv}
              onChange={handleConvChange}
              className="mt-2 w-full accent-[#00C6FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/30">
              <span>0.5% (Low)</span>
              <span>2.5% (Average)</span>
              <span>5.0% (High)</span>
            </div>
          </div>

          {/* Slider 4: What-if improvement (visitor's assumption) */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <label htmlFor={liftId} className="text-text-secondary uppercase tracking-wider">
                What if enquiries improved by:
              </label>
              <span className="text-lg font-bold text-white font-mono">
                {liftPct}% <span className="text-xs text-cyan">your assumption</span>
              </span>
            </div>
            <input
              id={liftId}
              type="range"
              min="5"
              max="100"
              step="5"
              value={liftPct}
              onChange={(e) => {
                setLiftPct(Number(e.target.value))
                playHapticClick()
              }}
              className="mt-2 w-full accent-[#00C6FF] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/30">
              <span>5%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Dynamic Projection Results Card */}
        <div className="relative rounded-2xl border border-cyan/30 bg-white/[0.03] p-7 md:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,198,255,0.1)]">
          <div className="font-mono text-xs uppercase tracking-widest text-cyan">
            IF YOUR ASSUMPTION HELD:
          </div>

          <div className="mt-4">
            <span className="text-xs text-text-secondary">Extra revenue per month:</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl md:text-5xl font-bold font-mono text-white tracking-tight">
                +£{monthlyLift.toLocaleString()}
              </span>
              <span className="font-mono text-xs text-emerald-400">/ MONTH</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-xs font-mono">
            <div>
              <span className="text-text-secondary">ANNUAL GAIN:</span>
              <div className="text-xl font-bold text-white mt-1">
                +£{annualLift.toLocaleString()}
              </div>
            </div>

            <div>
              <span className="text-text-secondary">PAYS BACK A {growthPlan.price} BUILD IN:</span>
              <div className="text-xl font-bold text-cyan mt-1">
                {paybackDays === null ? '—' : `~${paybackDays} days`}
              </div>
            </div>
          </div>

          <p className="mt-5 text-[11px] text-text-secondary leading-relaxed">
            Simple arithmetic on the numbers above: visitors × conversion rate × customer value, before and after your chosen improvement. Real results depend on your market, offer and traffic.
          </p>

          <div className="mt-6">
            <MagneticButton strength={15}>
              <Link
                to="/contact/"
                className="block w-full text-center rounded-full bg-cyan px-7 py-3.5 text-xs font-semibold text-void shadow-[0_0_25px_rgba(0,198,255,0.5)] transition hover:brightness-110"
              >
                Talk it through on a free call →
              </Link>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  )
}
