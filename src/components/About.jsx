import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '2-Week', label: 'Delivery' },
  { value: '100%', label: 'Client Satisfaction' },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B1020 0%, #132A5E 100%)' }}
    >
      <div className="cosmic-orb" style={{
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0,198,255,0.1) 0%, transparent 70%)',
        bottom: '10%', right: '-10%',
      }}/>

      <div className="relative z-10 max-w-[900px] mx-auto">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.2em] uppercase text-cyan mb-4">
            About
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em] mb-8">
            Small studio. <span className="gradient-text">Big impact.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[700px] mb-16">
            VectorMoon is a web design studio built for the modern era. We work with small businesses, startups, and creators who need a website that works as hard as they do. No bloated agencies. No offshore teams. Just focused design, clear communication, and results you can measure.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="text-center p-6 rounded-2xl bg-[rgba(22,27,43,0.6)] backdrop-blur-sm"
              id={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-text-secondary text-sm font-medium tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
