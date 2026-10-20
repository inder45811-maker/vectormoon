import { useEffect, useRef, useState } from 'react'

/**
 * Renders the real value immediately (so prerendered HTML and first paint never
 * show £0), then animates smoothly whenever `to` changes afterwards.
 */
export default function Counter({ to, duration = 0.8, prefix = '', suffix = '', className = '', format = false }) {
  const target = typeof to === 'number' ? to : parseFloat(String(to).replace(/[^0-9.]/g, '')) || 0
  const [value, setValue] = useState(target)
  const prev = useRef(target)

  useEffect(() => {
    const start = prev.current
    prev.current = target
    if (start === target) return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return undefined
    }
    let startTime = null
    let rafId
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / (duration * 1000), 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(start + (target - start) * ease))
      if (p < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration])

  return (
    <span className={className}>
      {prefix}
      {format ? value.toLocaleString('en-GB') : value}
      {suffix}
    </span>
  )
}
