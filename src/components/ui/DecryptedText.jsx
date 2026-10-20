import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'

function shouldSkipScramble() {
  if (typeof window === 'undefined') return true
  if (window.__VM_PRERENDER__) return true
  if (navigator.webdriver) return true
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
  } catch {
    /* ignore */
  }
  return false
}

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
  const skip = shouldSkipScramble()
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(skip)

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

  const triggerAnimation = () => {
    if (skip || isScrambling) return
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
      } else {
        iteration++
        if (iteration >= maxIterations) {
          text.split('').forEach((_, i) => currentRevealed.add(i))
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

  useEffect(() => {
    if (skip) {
      setDisplayText(text)
      return
    }
    if (animateOn === 'view' && isInView && !hasAnimated) {
      triggerAnimation()
      setHasAnimated(true)
    }
  }, [isInView, animateOn, hasAnimated, skip, text])

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => {
        if (!skip && animateOn === 'hover') triggerAnimation()
      }}
      {...props}
    >
      {/* Crawlers / a11y always get the real string; visual scramble is aria-hidden while running */}
      <span className="sr-only">{text}</span>
      <span className={className} aria-hidden="true">
        {displayText}
      </span>
    </span>
  )
}
