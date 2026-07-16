import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Real client projects from VectorMoon work (GitHub / live deploys).
const projects = [
  {
    title: 'Ramz DETAILZ',
    description:
      'Car detailing & mobile valeting site for a Coventry business — packages, pricing, and enquiry-focused layout built to convert local leads.',
    tag: 'Local Service',
    location: 'Coventry',
    url: 'https://inder45811-maker.github.io/Ramz_detailz/',
    accent: 'from-cyan/40 via-electric/20 to-void',
    monogram: 'RD',
  },
  {
    title: 'Punjabi Number Plates',
    description:
      'Full e-commerce experience for road-legal & show plates — product styles, trust signals, and a shop flow ready for real orders.',
    tag: 'E-Commerce',
    location: 'UK',
    url: 'https://www.punjabinumberplates.co.uk/',
    accent: 'from-electric/40 via-purple/20 to-void',
    monogram: 'PN',
  },
  {
    title: 'Making Marks Tattoo Co',
    description:
      'Multi-page studio site for a black & grey tattoo shop in Leamington Spa — artists, aftercare, FAQ, and visit pages with strong local SEO structure.',
    tag: 'Multi-page',
    location: 'Leamington Spa',
    url: 'https://inder45811-maker.github.io/tattoostudio/',
    accent: 'from-purple/40 via-cyan/15 to-void',
    monogram: 'MM',
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
            Real clients. <span className="gradient-text">Live sites.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary mt-4 max-w-[560px] mx-auto text-sm md:text-base">
            Recent VectorMoon projects for local service businesses across Coventry and the West Midlands.
          </motion.p>
        </motion.div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group min-w-[300px] md:min-w-0 snap-center flex flex-col rounded-2xl overflow-hidden cursor-pointer no-underline"
              style={{ background: '#161b2b' }}
              id={`portfolio-${project.title.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className={`relative h-56 md:h-64 overflow-hidden border-b border-[rgba(255,255,255,0.05)] bg-gradient-to-br ${project.accent}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white tracking-tight">{project.monogram}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs text-white/70 tracking-wide uppercase">{project.location}</span>
                  <span className="text-xs text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                    View live →
                  </span>
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
