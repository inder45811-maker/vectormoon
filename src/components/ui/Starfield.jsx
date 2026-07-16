import { useMemo } from 'react'

/** Deterministic star field — no random flicker between SSR/prerender */
export default function Starfield({ count = 60, className = '' }) {
  const stars = useMemo(() => {
    const out = []
    let seed = 42
    const rnd = () => {
      seed = (seed * 16807) % 2147483647
      return (seed - 1) / 2147483646
    }
    for (let i = 0; i < count; i++) {
      out.push({
        left: `${rnd() * 100}%`,
        top: `${rnd() * 100}%`,
        size: rnd() * 2 + 0.5,
        opacity: rnd() * 0.5 + 0.15,
        delay: rnd() * 4,
      })
    }
    return out
  }, [count])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star-dot absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
