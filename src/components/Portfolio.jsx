import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const projects = [
  {
    title: 'Luna Coffee',
    description: 'Brand identity + e-commerce for an independent coffee roaster. 40% increase in online orders.',
    tag: 'E-Commerce',
    gradient: 'linear-gradient(135deg, #0B1020 0%, #132A5E 30%, #00C6FF 100%)',
  },
  {
    title: 'Summit Fitness',
    description: 'Membership platform for a boutique gym. 200+ new signups in month one.',
    tag: 'Web App',
    gradient: 'linear-gradient(135deg, #132A5E 0%, #3D5AFE 50%, #7B61FF 100%)',
  },
  {
    title: 'Meridian Law',
    description: 'Professional services site. Clean, trustworthy, built to convert consultations.',
    tag: 'Web Design',
    gradient: 'linear-gradient(135deg, #0B1020 0%, #7B61FF 50%, #00C6FF 100%)',
  },
]

export default function Portfolio() {
  return (
    <section id="work" className="relative section-pad overflow-hidden" style={{ background: '#0B1020' }}>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.2em] uppercase text-cyan mb-4">
            Selected Work
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em]">
            Results that <span className="gradient-text">speak</span>
          </motion.h2>
        </motion.div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group min-w-[300px] md:min-w-0 snap-center flex flex-col rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: '#161b2b' }}
              id={`portfolio-${project.title.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: project.gradient }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="0.5"/>
                    <circle cx="60" cy="60" r="55" stroke="white" strokeWidth="0.3" strokeDasharray="4 4"/>
                    <circle cx="60" cy="60" r="10" fill="white" opacity="0.3"/>
                  </svg>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-medium text-cyan bg-[rgba(0,198,255,0.1)] mb-3">
                  {project.tag}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
