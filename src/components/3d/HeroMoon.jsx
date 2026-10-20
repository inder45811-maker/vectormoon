import { lazy, Suspense, useEffect, useState } from 'react'

// three.js (~500 KB unminified) lives in its own chunk and is only fetched on
// large, mouse-driven screens after the page has finished loading. Phones,
// tablets, reduced-motion users and the prerenderer get a static image, so
// the hero text paints immediately and the moon never traps touch scrolling.
const VectorMoonCanvas = lazy(() => import('./VectorMoonCanvas'))

function shouldLoad3D() {
  if (typeof window === 'undefined' || window.__VM_PRERENDER__) return false
  const mq = (q) => window.matchMedia?.(q).matches
  if (mq('(prefers-reduced-motion: reduce)')) return false
  if (!mq('(min-width: 1024px) and (hover: hover) and (pointer: fine)')) return false
  if (navigator.connection?.saveData) return false
  return true
}

function StaticMoon({ className = '' }) {
  return (
    <div className={`relative flex w-full items-center justify-center ${className}`}>
      <img
        src="/textures/moon-static.webp"
        alt=""
        aria-hidden="true"
        width="640"
        height="640"
        decoding="async"
        className="h-full w-auto max-w-full object-contain drop-shadow-[0_0_60px_rgba(0,198,255,0.18)]"
      />
    </div>
  )
}

export default function HeroMoon() {
  const [use3D, setUse3D] = useState(false)

  useEffect(() => {
    if (!shouldLoad3D()) return undefined
    let idleId
    let timer
    const start = () => {
      const run = () => setUse3D(true)
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(run, { timeout: 2500 })
      else timer = setTimeout(run, 1200)
    }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    return () => {
      window.removeEventListener('load', start)
      if (idleId) window.cancelIdleCallback?.(idleId)
      clearTimeout(timer)
    }
  }, [])

  if (!use3D) {
    return <StaticMoon className="h-[260px] sm:h-[360px] lg:h-[600px]" />
  }

  return (
    <Suspense fallback={<StaticMoon className="h-[260px] sm:h-[360px] lg:h-[600px]" />}>
      <VectorMoonCanvas className="w-full" />
    </Suspense>
  )
}
