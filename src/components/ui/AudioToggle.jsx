import { useState } from 'react'
import { toggleAudio, isAudioActive } from '../../utils/audio'

export default function AudioToggle({ className = '' }) {
  const [active, setActive] = useState(() => isAudioActive())

  const handleClick = () => {
    const newState = toggleAudio()
    setActive(newState)
  }

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-mono tracking-wider transition-all duration-300 hover:border-cyan/50 hover:bg-white/[0.08] ${
        active ? 'text-cyan border-cyan/40 bg-cyan/5' : 'text-text-secondary'
      } ${className}`}
      title={active ? 'Mute space audio' : 'Enable ambient space audio'}
      data-cursor="click"
    >
      <span className="flex items-center gap-0.5 h-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-0.5 rounded-full transition-all duration-300 ${
              active
                ? 'bg-cyan animate-[pulse_0.8s_ease-in-out_infinite]'
                : 'h-1.5 bg-text-secondary/50'
            }`}
            style={{
              height: active ? `${[8, 12, 6][i]}px` : '6px',
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </span>
      <span className="hidden sm:inline uppercase">{active ? 'SOUND ON' : 'AUDIO OFF'}</span>
    </button>
  )
}
