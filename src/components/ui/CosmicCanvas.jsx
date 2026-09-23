import { useEffect, useRef } from 'react'

export default function CosmicCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initParticles()
    }

    const handleMouseMove = (e) => {
      mouse.vx = e.clientX - mouse.lastX
      mouse.vy = e.clientY - mouse.lastY
      mouse.lastX = mouse.x = e.clientX
      mouse.lastY = mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    const particleCount = Math.min(Math.floor((width * height) / 12000), 120)
    let particles = []

    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        const layer = Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          originX: Math.random() * width,
          originY: Math.random() * height,
          size: layer === 1 ? Math.random() * 1.2 + 0.5 : layer === 2 ? Math.random() * 2 + 1 : Math.random() * 3 + 1.5,
          color:
            Math.random() > 0.4
              ? 'rgba(255, 255, 255, '
              : Math.random() > 0.5
              ? 'rgba(0, 198, 255, '
              : 'rgba(123, 97, 255, ',
          alpha: Math.random() * 0.6 + 0.2,
          speedX: (Math.random() - 0.5) * 0.25 * layer,
          speedY: (Math.random() - 0.5) * 0.25 * layer,
          layer,
          pulse: Math.random() * Math.PI * 2,
        })
      }
    }

    initParticles()

    let lastTime = performance.now()

    function render(currentTime) {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1)
      lastTime = currentTime

      ctx.clearRect(0, 0, width, height)

      // Slow mouse velocity decay
      mouse.vx *= 0.92
      mouse.vy *= 0.92

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Drift
        p.x += p.speedX
        p.y += p.speedY

        // Wrap edges
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Gravitational lens deflection near cursor
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 140

        let renderX = p.x
        let renderY = p.y

        if (dist < maxDist && dist > 1) {
          const force = (1 - dist / maxDist) * (p.layer === 3 ? 24 : 12)
          renderX -= (dx / dist) * force
          renderY -= (dy / dist) * force
        }

        // Star twinkle
        p.pulse += dt * (0.8 + p.layer * 0.4)
        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulse) * 0.25)

        ctx.fillStyle = `${p.color}${currentAlpha})`
        ctx.beginPath()
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Subtle glow for large foreground stars
        if (p.layer === 3 && currentAlpha > 0.4) {
          ctx.fillStyle = `${p.color}${currentAlpha * 0.25})`
          ctx.beginPath()
          ctx.arc(renderX, renderY, p.size * 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
