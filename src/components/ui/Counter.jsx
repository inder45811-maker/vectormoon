import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function Counter({
  from = 0,
  to,
  duration = 1.6,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const target = typeof to === 'number' ? to : parseFloat(to.toString().replace(/[^0-9.]/g, '')) || 0
    const start = from

    function step(timestamp) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (target - start) * ease)
      setValue(current)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    const rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
