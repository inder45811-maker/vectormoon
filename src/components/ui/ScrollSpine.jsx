import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

export default function ScrollSpine() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Height progress for satellite positioning
  const satelliteTop = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      className="pointer-events-none fixed bottom-12 left-4 top-28 z-20 hidden w-6 flex-col items-center xl:flex"
      aria-hidden="true"
    >
      {/* Background Track */}
      <div className="relative h-full w-[2px] rounded-full bg-white/5">
        {/* Active glowing progress bar */}
        <motion.div
          className="absolute left-0 top-0 w-full rounded-full bg-gradient-to-b from-cyan via-electric to-purple shadow-[0_0_12px_rgba(0,198,255,0.6)]"
          style={{ height: satelliteTop }}
        />

        {/* Orbiting Satellite Node */}
        <motion.div
          className="absolute -left-[5px] -translate-y-1/2"
          style={{ top: satelliteTop }}
        >
          <div className="relative flex h-3 w-3 items-center justify-center">
            {/* Pulsing ring */}
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            {/* Core glowing orb */}
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_#00c6ff]" />
          </div>
        </motion.div>

        {/* Section Waypoints */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => (
          <div
            key={idx}
            className="absolute -left-[2px] h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-white/20 bg-void"
            style={{ top: `${pct * 100}%` }}
          />
        ))}
      </div>
    </div>
  )
}
