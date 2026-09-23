import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toggleAudio, isAudioActive, playHapticClick } from '../../utils/audio'

export default function AgencyHud() {
  const [time, setTime] = useState('')
  const [audioActive, setAudioActive] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  // Real-time UK Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTime(timeStr)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return

      if (e.key === 'm' || e.key === 'M') {
        const active = toggleAudio()
        setAudioActive(active)
      } else if (e.key === 'o' || e.key === 'O') {
        const stage = document.getElementById('orbit-stage')
        if (stage) {
          stage.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (e.key === 'c' || e.key === 'C') {
        const calc = document.getElementById('scope-calculator')
        if (calc) {
          calc.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleToggleSound = () => {
    playHapticClick()
    const active = toggleAudio()
    setAudioActive(active)
  }

  return (
    <aside
      aria-label="Agency Telemetry Status HUD"
      className="fixed bottom-4 right-4 z-40 hidden sm:block font-mono text-[10px]"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-nebula/90 px-3.5 py-2 text-white shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {/* Live System Indicator */}
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/70">60 FPS</span>
        </div>

        {/* London / Coventry Clock */}
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-3 text-text-secondary">
          <span className="text-cyan font-semibold">UK:</span>
          <span>{time || '21:54:00'} GMT</span>
        </div>

        {/* Soundscape Status & Toggle */}
        <button
          type="button"
          onClick={handleToggleSound}
          className="flex items-center gap-1.5 text-text-secondary hover:text-white transition"
          title="Toggle ambient spatial soundscape (or press 'M')"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              audioActive ? 'bg-cyan animate-pulse' : 'bg-white/30'
            }`}
          />
          <span>AUDIO: {audioActive ? 'ON' : 'OFF'}</span>
          <span className="rounded bg-white/10 px-1 py-0.5 text-[9px] text-white/50">M</span>
        </button>

        {/* Keyboard Quick Navigation */}
        <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-3 text-white/40">
          <span>SHORTCUTS:</span>
          <button
            type="button"
            onClick={() => document.getElementById('orbit-stage')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-cyan transition"
            title="Scroll to 3D Orbit stage"
          >
            [O] ORBIT
          </button>
          <button
            type="button"
            onClick={() => document.getElementById('scope-calculator')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:text-cyan transition"
            title="Scroll to Scope Calculator"
          >
            [C] SCOPE
          </button>
        </div>
      </div>
    </aside>
  )
}
