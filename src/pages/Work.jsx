import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import DeviceFrame from '../components/ui/DeviceFrame'
import { projects } from '../data/projects'
import { pageSeo } from '../data/seo'

export default function Work() {
  const seo = pageSeo({
    title: 'Portfolio & Client Work | VectorMoon Coventry',
    description:
      'Live websites built by VectorMoon: Ramz DETAILZ (Coventry), Punjabi Number Plates (e-commerce), and Making Marks Tattoo Co (Leamington Spa).',
    path: '/work',
    image: 'https://www.vectormoon.co.uk/portfolio/punjabi-number-plates-desktop.png',
  })

  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="Portfolio"
        title="Work that ships"
        highlight="and sells."
        subtitle="Real businesses. Live URLs. Screenshots captured from production sites — not mockups."
        compact
      />

      <section className="section-pad pt-8" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[1280px] space-y-20">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <DeviceFrame src={p.image} alt={`${p.title} website screenshot`} />
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">{p.tag}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-text-secondary">{p.location}</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">{p.title}</h2>
                <p className="mt-2 text-lg text-text-secondary">{p.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{p.description}</p>
                <ul className="mt-6 space-y-2">
                  {p.results.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-text-secondary">
                      <span className="text-cyan">▹</span> {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={`/work/${p.slug}`}
                    className="rounded-full bg-cyan px-6 py-2.5 text-sm font-semibold text-void"
                  >
                    Case study
                  </Link>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-white hover:border-cyan/40"
                  >
                    Visit live site ↗
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}
