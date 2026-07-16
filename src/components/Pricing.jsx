import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Competitive vs Coventry market (local brochure sites often £699–£999;
// commodity packages from ~£249). Premium modern build sits between budget
// WordPress mills and £3k–£10k agency quotes.
const plans = [
  {
    name: 'Starter',
    price: '£799',
    blurb: 'Perfect for getting online fast',
    features: [
      'Single-page / landing site',
      'Mobile-first custom design',
      'Contact form + click-to-call',
      'Basic on-page SEO',
      '2 revisions',
      '~1 week delivery',
    ],
    highlighted: false,
  },
  {
    name: 'Business',
    price: '£1,499',
    blurb: 'Most popular for local businesses',
    features: [
      'Up to 5 custom pages',
      'Modern UI + brand-matched layout',
      'SEO foundation (titles, meta, schema)',
      'Google Business profile guidance',
      '3 revisions',
      '~2 week delivery',
    ],
    highlighted: true,
  },
  {
    name: 'E-Commerce',
    price: '£2,999+',
    blurb: 'Sell products online with confidence',
    features: [
      'Full online store setup',
      'Payments & product catalogue',
      'Mobile checkout optimisation',
      'SEO + trust sections',
      'Custom timeline',
      'Priority support',
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative section-pad overflow-hidden" style={{ background: '#0B1020' }}>
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-xs font-medium tracking-[0.2em] uppercase text-cyan mb-4">
            Investment
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.02em]">
            Coventry-competitive. <span className="gradient-text">No agency bloat.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-text-secondary mt-4 max-w-[560px] mx-auto text-sm md:text-base">
            Transparent one-off project pricing — designed to beat bloated agency quotes while delivering modern custom design, not a cheap template.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-satellite'
                  : 'bg-nebula'
              }`}
              style={plan.highlighted ? {
                boxShadow: '0 0 30px rgba(0,198,255,0.15), inset 0 0 1px rgba(0,198,255,0.3)',
              } : {}}
              id={`pricing-${plan.name.toLowerCase()}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan text-void text-xs font-bold tracking-wide">
                  RECOMMENDED
                </div>
              )}

              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-text-secondary mb-4">{plan.blurb}</p>
              <div className="text-4xl font-bold gradient-text mb-6">
                {plan.price}
                {plan.price !== '£2,999+' && (
                  <span className="text-sm font-medium text-text-secondary ml-1">one-off</span>
                )}
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-text-secondary">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                      <path d="M3 8L6.5 11.5L13 4.5" stroke="#00C6FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-cyan text-void hover:brightness-110 shadow-[var(--shadow-glow-cyan)]'
                    : 'border border-electric text-white hover:bg-[rgba(61,90,254,0.1)]'
                } active:scale-[0.98]`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-text-secondary text-sm mt-8 max-w-[640px] mx-auto"
        >
          Every project starts with a free 15-minute strategy call. Hosting, domain, and ongoing care can be quoted separately — no lock-in monthly contracts required to launch.
        </motion.p>
      </div>
    </section>
  )
}
