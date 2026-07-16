import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import OrbitRing from './OrbitRing'

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  primaryCta,
  secondaryCta,
  compact = false,
}) {
  return (
    <section
      className={`relative overflow-hidden ${compact ? 'pt-32 pb-16' : 'pt-36 pb-24 md:pt-44 md:pb-32'}`}
      style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 0%, rgba(61,90,254,0.18), transparent 55%), #0B1020' }}
    >
      <div className="pointer-events-none absolute -right-20 top-10 opacity-40 md:opacity-60">
        <OrbitRing size={560} className="orbit-spin-slow" />
      </div>
      <div
        className="cosmic-orb"
        style={{
          width: 420,
          height: 420,
          background: 'radial-gradient(circle, rgba(0,198,255,0.18), transparent 70%)',
          left: '-8%',
          bottom: '10%',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[900px] px-5 text-center lg:px-8">
        {eyebrow && (
          <motion.p
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-cyan"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl"
        >
          {title}{' '}
          {highlight && <span className="gradient-text-purple">{highlight}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-[560px] text-base leading-relaxed text-text-secondary md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        {(primaryCta || secondaryCta) && (
          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {primaryCta && (
              <Link
                to={primaryCta.to}
                className="rounded-full bg-cyan px-8 py-3.5 text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                to={secondaryCta.to}
                className="rounded-full border border-electric/60 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-electric/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
