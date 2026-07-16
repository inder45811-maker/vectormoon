import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const services = [
  {
    title: 'Web Design',
    description: 'Custom websites that look premium and perform. No templates. No clutter.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="6" width="32" height="24" rx="4" stroke="#00C6FF" strokeWidth="1.5" fill="none"/>
        <line x1="4" y1="13" x2="36" y2="13" stroke="#00C6FF" strokeWidth="1" opacity="0.5"/>
        <circle cx="9" cy="9.5" r="1.5" fill="#00C6FF" opacity="0.7"/>
        <circle cx="14" cy="9.5" r="1.5" fill="#00C6FF" opacity="0.4"/>
        <rect x="10" y="17" width="20" height="3" rx="1" fill="#3D5AFE" opacity="0.5"/>
        <rect x="10" y="22" width="14" height="3" rx="1" fill="#3D5AFE" opacity="0.3"/>
        <line x1="12" y1="34" x2="28" y2="34" stroke="#00C6FF" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="30" x2="20" y2="34" stroke="#00C6FF" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'UI/UX',
    description: 'Interfaces that feel intuitive. Every click, scroll, and tap mapped for engagement.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="#00C6FF" strokeWidth="1.5" fill="none"/>
        <path d="M14 20C14 16.6863 16.6863 14 20 14" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="14" r="2.5" fill="#00C6FF"/>
        <circle cx="14" cy="20" r="2.5" fill="#7B61FF"/>
        <circle cx="20" cy="26" r="2.5" fill="#3D5AFE"/>
        <line x1="20" y1="14" x2="20" y2="26" stroke="#3D5AFE" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    title: 'Development',
    description: 'Fast, responsive, built to last. Clean code, mobile-first, SEO-optimized.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <text x="4" y="26" fontFamily="monospace" fontSize="14" fill="#00C6FF" fontWeight="bold">{'</>'}</text>
        <path d="M24 12L28 20L24 28" stroke="#3D5AFE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M36 12L32 20L36 28" stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Digital Solutions',
    description: 'Strategy beyond the screen. Brand identity, landing pages, growth systems.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="moonServiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C6FF"/>
            <stop offset="100%" stopColor="#7B61FF"/>
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="10" fill="url(#moonServiceGrad)" opacity="0.8"/>
        <circle cx="20" cy="20" r="14" stroke="#00C6FF" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3"/>
        <circle cx="30" cy="10" r="2" fill="#7B61FF"/>
        <circle cx="10" cy="30" r="2" fill="#3D5AFE"/>
        <line x1="22" y1="12" x2="28" y2="10" stroke="#7B61FF" strokeWidth="0.6" opacity="0.5"/>
        <line x1="18" y1="28" x2="12" y2="30" stroke="#3D5AFE" strokeWidth="0.6" opacity="0.5"/>
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative section-pad overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0B1020 0%, #132A5E 100%)' }}
    >
      {/* Background orb */}
      <div
        className="cosmic-orb"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0,198,255,0.08) 0%, transparent 70%)',
          top: '30%',
          left: '-15%',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.2em] uppercase text-cyan mb-4">
            What We Do
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em]">
            Design, build, launch — <span className="gradient-text">done.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary mt-4 max-w-[540px] mx-auto text-sm md:text-base">
            Web design and development for Coventry and West Midlands businesses that need a site built to get enquiries.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className="group relative p-8 rounded-2xl bg-[#132A5E] hover:bg-cosmos transition-all duration-300 cursor-default"
              style={{ boxShadow: '0 12px 48px rgba(222,225,249,0.04)' }}
              id={`service-${service.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 30px rgba(0,198,255,0.1), inset 0 0 1px rgba(0,198,255,0.15)' }}
              />
              <div className="relative z-10">
                <div className="mb-5 text-cyan">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
