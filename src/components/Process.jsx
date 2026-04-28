import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const steps = [
  { num: '01', title: 'Discovery', desc: '15-minute call. We learn your goals, audience, and what makes you different.' },
  { num: '02', title: 'Design', desc: 'Custom mockup in 3-4 days. Two rounds of revisions included.' },
  { num: '03', title: 'Build', desc: 'Develop, test, optimize. Mobile, tablet, desktop — perfect everywhere.' },
  { num: '04', title: 'Launch', desc: 'Site goes live. Handover + 30 days of support.' },
]

export default function Process() {
  const lineRef = useRef(null)
  const isInView = useInView(lineRef, { once: true, margin: '-100px' })

  return (
    <section id="process" className="relative section-pad overflow-hidden" style={{ background: '#0B1020' }}>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.2em] uppercase text-cyan mb-4">
            How It Works
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em]">
            From idea to live in <span className="gradient-text">two weeks</span>
          </motion.h2>
        </motion.div>

        {/* Desktop: horizontal with connecting line */}
        <div ref={lineRef} className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="h-full origin-left"
              style={{ background: 'linear-gradient(90deg, #00C6FF, #3D5AFE, #7B61FF, #00C6FF)' }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                className="text-center relative"
                id={`process-step-${step.num}`}
              >
                {/* Number circle */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-cyan flex items-center justify-center relative z-10 bg-void">
                  <span className="text-2xl font-bold text-cyan">{step.num}</span>
                </div>
                {/* Vertical line (mobile only) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden w-[2px] h-8 mx-auto bg-gradient-to-b from-cyan to-electric opacity-30" />
                )}
                <h3 className="text-lg font-bold text-white mb-2 mt-2 md:mt-0">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-[250px] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
