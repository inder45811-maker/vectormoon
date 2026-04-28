import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0B1020' }}
    >
      {/* Cosmic orbs */}
      <div
        className="cosmic-orb"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(123,97,255,0.25) 0%, rgba(61,90,254,0.1) 40%, transparent 70%)',
          top: '10%',
          right: '-10%',
        }}
      />
      <div
        className="cosmic-orb"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,198,255,0.15) 0%, transparent 70%)',
          bottom: '20%',
          left: '-5%',
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[900px] mx-auto px-6 text-center"
      >
        {/* Pre-headline */}
        <motion.p
          variants={fadeUp}
          className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-cyan mb-6"
        >
          Web Design • UI/UX • Development • Digital Solutions
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-[-0.04em] mb-6"
        >
          Websites that orbit
          <br />
          <span className="gradient-text-purple">your vision</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-text-secondary max-w-[600px] mx-auto mb-10 leading-relaxed"
        >
          VectorMoon builds modern, high-converting websites for brands ready to
          stand out. Clean design. Fast delivery. Real results.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-cyan text-void font-semibold text-base hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-[var(--shadow-glow-cyan)]"
            id="hero-cta-primary"
          >
            Book a Free Call
          </a>
          <a
            href="#work"
            className="px-8 py-3.5 rounded-full border border-electric text-white font-medium text-base hover:bg-[rgba(61,90,254,0.1)] active:scale-[0.98] transition-all duration-200"
            id="hero-cta-secondary"
          >
            View Our Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-secondary tracking-widest uppercase">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 8L10 12L14 8" stroke="#8892B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
