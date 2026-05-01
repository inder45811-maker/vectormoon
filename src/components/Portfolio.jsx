import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

import lunaCoffeeImg from '../assets/luna-coffee.jpg'
import summitFitnessImg from '../assets/summit-fitness.jpg'
import meridianLawImg from '../assets/meridian-law.jpg'

const projects = [
  {
    title: 'Luna Coffee',
    description: 'Brand identity + e-commerce for an independent coffee roaster. 40% increase in online orders.',
    tag: 'E-Commerce',
    image: lunaCoffeeImg,
  },
  {
    title: 'Summit Fitness',
    description: 'Membership platform for a boutique gym. 200+ new signups in month one.',
    tag: 'Web App',
    image: summitFitnessImg,
  },
  {
    title: 'Meridian Law',
    description: 'Professional services site. Clean, trustworthy, built to convert consultations.',
    tag: 'Web Design',
    image: meridianLawImg,
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
              <div className="relative h-56 md:h-64 overflow-hidden border-b border-[rgba(255,255,255,0.05)]">
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
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
