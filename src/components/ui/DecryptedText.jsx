import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

export default function DecryptedText({
  text,
  speed = 30,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  animateOn = 'view',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
    : CHARACTERS.split('')

  const shuffleText = (originalText, currentRevealed) => {
    return originalText
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' '
        if (currentRevealed.has(i)) return originalText[i]
        return availableChars[Math.floor(Math.random() * availableChars.length)]
      })
      .join('')
  }

  useEffect(() => {
    if (animateOn === 'view' && isInView && !hasAnimated) {
      triggerAnimation()
      setHasAnimated(true)
    }
  }, [isInView, animateOn, hasAnimated])

  const triggerAnimation = () => {
    if (isScrambling) return
    setIsScrambling(true)

    let iteration = 0
    const currentRevealed = new Set()

    const interval = setInterval(() => {
      if (sequential) {
        if (revealDirection === 'end') {
          currentRevealed.add(text.length - 1 - currentRevealed.size)
        } else {
          currentRevealed.add(currentRevealed.size)
        }
        setRevealedIndices(new Set(currentRevealed))
      } else {
        iteration++
        if (iteration >= maxIterations) {
          text.split('').forEach((_, i) => currentRevealed.add(i))
          setRevealedIndices(new Set(currentRevealed))
        }
      }

      setDisplayText(shuffleText(text, currentRevealed))

      if (currentRevealed.size >= text.length) {
        clearInterval(interval)
        setIsScrambling(false)
        setDisplayText(text)
      }
    }, speed)
  }

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => {
        if (animateOn === 'hover') triggerAnimation()
      }}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </span>
  )
}
