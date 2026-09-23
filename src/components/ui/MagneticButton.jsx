import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { playHapticClick } from '../../utils/audio'

export default function MagneticButton({
  children,
  className = '',
  strength = 20,
  ...props
}) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 180, mass: 0.2 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)

    x.set(deltaX * strength)
    y.set(deltaY * strength)
  }

  const handleMouseEnter = () => {
    playHapticClick()
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
      data-cursor="magnetic"
      {...props}
    >
      {children}
    </motion.div>
  )
}
