import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState({ type: 'default', text: '' })
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for buttery trailing motion
  const springConfig = { damping: 24, stiffness: 260, mass: 0.4 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const onMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)

      // Detect cursor context from data attribute or element class
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const type = target.getAttribute('data-cursor')
        const text = target.getAttribute('data-cursor-text') || ''
        setCursorState({ type, text })
      } else if (e.target.closest('a, button, input, textarea')) {
        setCursorState({ type: 'hover', text: '' })
      } else {
        setCursorState({ type: 'default', text: '' })
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible, mouseX, mouseY])

  if (!isVisible) return null

  const isText = cursorState.text !== ''
  const isHover = cursorState.type === 'hover'

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden" aria-hidden="true">
      {/* Precision Core Dot */}
      <motion.div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_10px_#00c6ff]"
        style={{ left: mouseX, top: mouseY }}
        animate={{
          scale: isText ? 0 : isHover ? 1.5 : 1,
          opacity: isText ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Elastic Lens Ring / Pill */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-cyan/40 bg-void/30 backdrop-blur-[3px] text-[10px] font-mono font-semibold tracking-wider text-cyan shadow-[0_0_20px_rgba(0,198,255,0.2)]"
        style={{ left: smoothX, top: smoothY }}
        animate={{
          width: isText ? 'auto' : isHover ? 44 : 28,
          height: isText ? 28 : isHover ? 44 : 28,
          paddingLeft: isText ? 14 : 0,
          paddingRight: isText ? 14 : 0,
          borderColor: isText ? 'rgba(0, 198, 255, 0.8)' : isHover ? 'rgba(0, 198, 255, 0.6)' : 'rgba(0, 198, 255, 0.3)',
          backgroundColor: isText ? 'rgba(7, 11, 22, 0.85)' : 'rgba(11, 16, 32, 0.25)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {isText && <span className="whitespace-nowrap uppercase">{cursorState.text}</span>}
      </motion.div>
    </div>
  )
}
