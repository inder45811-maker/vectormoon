import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({
  children,
  className = '',
  maxTilt = 10,
  glare = true,
  perspective = 1000,
}) {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt])

  const glareX = useTransform(smoothMouseX, [0, 1], ['0%', '100%'])
  const glareY = useTransform(smoothMouseY, [0, 1], ['0%', '100%'])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full w-full transition-shadow duration-300"
      >
        {children}

        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] overflow-hidden transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.35 : 0,
            }}
          >
            <motion.div
              className="absolute -inset-[50%] h-[200%] w-[200%]"
              style={{
                left: glareX,
                top: glareY,
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(circle 350px at center, rgba(0, 198, 255, 0.4), rgba(123, 97, 255, 0.15) 30%, transparent 70%)',
                mixBlendMode: 'screen',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
