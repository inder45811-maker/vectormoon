import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import DeviceFrame from '../components/ui/DeviceFrame'
import OrbitRing from '../components/ui/OrbitRing'
import { projects } from '../data/projects'
import { plans } from '../data/pricing'
import { businessJsonLd, pageSeo } from '../data/seo'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home() {
  const seo = pageSeo({
    title: 'VectorMoon | High-End Web Design Coventry & West Midlands',
    description:
      'VectorMoon is a Coventry web design studio building modern, high-converting websites for UK local businesses. Real client work. Packages from £799. Free strategy call.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        businessJsonLd,
        {
          '@type': 'WebSite',
          '@id': 'https://www.vectormoon.co.uk/#website',
          url: 'https://www.vectormoon.co.uk/',
          name: 'VectorMoon',
          publisher: { '@id': 'https://www.vectormoon.co.uk/#business' },
        },
      ],
    },
  })

  return (
    <>
      <Seo {...seo} />

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden flex items-center">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 75% 20%, rgba(123,97,255,0.22), transparent 50%), radial-gradient(ellipse 50% 40% at 15% 80%, rgba(0,198,255,0.12), transparent 50%), #0B1020',
          }}
        />
        <div className="pointer-events-none absolute right-[-8%] top-[8%] opacity-50 md:opacity-70">
          <OrbitRing size={640} className="orbit-spin-slow" />
        </div>
        <div className="mesh-grid absolute inset-0 opacity-[0.12]" aria-hidden />

        <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-12 px-5 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-28">
          <div>
            <motion.p
              custom={0}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-cyan"
            >
              Coventry · West Midlands · UK
            </motion.p>
            <motion.h1
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[3.75rem]"
            >
              Websites engineered
              <br />
              to <span className="gradient-text-purple">win work</span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-[520px] text-base leading-relaxed text-text-secondary md:text-lg"
            >
              High-end custom sites for local businesses — detailers, shops, studios, trades.
              Built for Google, AI search, and humans who book.
            </motion.p>
            <motion.div
              custom={3}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/contact"
                className="rounded-full bg-cyan px-8 py-3.5 text-center text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110"
              >
                Book a Free Call
              </Link>
              <Link
                to="/work"
                className="rounded-full border border-electric/50 px-8 py-3.5 text-center text-sm font-medium text-white transition hover:bg-electric/10"
              >
                View Real Work
              </Link>
            </motion.div>
            <motion.div
              custom={4}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.16em] text-text-secondary"
            >
              <span>From £799</span>
              <span className="text-white/20">|</span>
              <span>~2 week delivery</span>
              <span className="text-white/20">|</span>
              <span>3 live client sites</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-cyan/20 via-electric/10 to-purple/20 blur-2xl" />
            <DeviceFrame
              src={projects[0].image}
              alt="Ramz DETAILZ — live client site"
              className="relative rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute -bottom-4 -left-2 hidden rounded-xl border border-white/10 bg-nebula/90 px-4 py-3 text-xs text-text-secondary backdrop-blur md:block">
              <span className="text-cyan">●</span> Live client · Coventry detailing
            </div>
          </motion.div>
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="section-pad relative" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">Selected work</p>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Real clients. <span className="gradient-text">Live URLs.</span>
              </h2>
            </div>
            <Link to="/work" className="text-sm text-cyan hover:underline">
              Full portfolio →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {projects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/work/${p.slug}`} className="group block no-underline">
                  <DeviceFrame src={p.image} alt={p.title} />
                  <div className="mt-4">
                    <span className="text-xs uppercase tracking-wider text-cyan">{p.tag}</span>
                    <h3 className="mt-1 text-lg font-bold text-white group-hover:text-cyan transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary line-clamp-2">{p.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section
        className="section-pad relative"
        style={{ background: 'linear-gradient(180deg, #0B1020 0%, #10182e 100%)' }}
      >
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">What we do</p>
          <h2 className="mb-12 max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
            Design systems. Fast builds. <span className="gradient-text">Local growth.</span>
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Web Design', d: 'Custom interfaces that feel expensive without agency overhead.' },
              { t: 'Development', d: 'Mobile-first, fast, SEO-ready code that holds up under traffic.' },
              { t: 'Local SEO / GEO', d: 'Multi-page structure, schema, and content AI systems can cite.' },
              { t: 'E-Commerce', d: 'Stores that sell — products, trust, checkout that works on mobile.' },
            ].map((s) => (
              <div
                key={s.t}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition hover:border-cyan/30 hover:bg-white/[0.05]"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-cyan to-purple" />
                <h3 className="mb-2 text-lg font-bold">{s.t}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/services" className="text-sm text-cyan hover:underline">
              Explore services →
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="section-pad relative" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[1280px] text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">Investment</p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Coventry-competitive. <span className="gradient-text">No bloat.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-lg text-text-secondary text-sm md:text-base">
            Transparent packages between cheap template mills and £5k+ agencies.
          </p>
          <div className="grid gap-5 md:grid-cols-3 text-left">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-7 ${
                  plan.highlighted
                    ? 'border-cyan/40 bg-satellite shadow-[0_0_40px_rgba(0,198,255,0.12)]'
                    : 'border-white/10 bg-nebula/80'
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-3 inline-block rounded-full bg-cyan px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-void">
                    Recommended
                  </span>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="mt-1 text-3xl font-bold gradient-text">{plan.price}</p>
                <p className="mt-2 text-xs text-text-secondary">{plan.blurb}</p>
              </div>
            ))}
          </div>
          <Link
            to="/pricing"
            className="mt-10 inline-flex rounded-full border border-electric/50 px-8 py-3 text-sm font-medium text-white transition hover:bg-electric/10"
          >
            Full pricing details
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden px-5 py-24 text-center"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(61,90,254,0.25), transparent), #0B1020',
        }}
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
          Ready to <span className="gradient-text-purple">launch?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-text-secondary">
          Free 15-minute call. Proposal within 24 hours. Coventry &amp; UK-wide.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex rounded-full bg-cyan px-10 py-3.5 text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110"
        >
          Book Your Free Call
        </Link>
      </section>
    </>
  )
}
