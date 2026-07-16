import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { pageSeo, businessJsonLd } from '../data/seo'

const services = [
  {
    title: 'Custom web design',
    body: 'Premium visual systems tailored to your brand — not a theme with your logo stuck on. Layout, type, colour, and motion that feel intentional.',
  },
  {
    title: 'Multi-page website builds',
    body: 'Dedicated routes for services, pricing, work, and local landing pages so Google and AI search can index each intent separately.',
  },
  {
    title: 'Local SEO & GEO',
    body: 'Structured data, Coventry/West Midlands signals, FAQ schema, sitemaps, and content written so generative engines can cite accurate facts about your business.',
  },
  {
    title: 'E-commerce experiences',
    body: 'Product catalogues, trust sections, and mobile checkout paths for shops that need orders — not just traffic.',
  },
  {
    title: 'Performance engineering',
    body: 'Fast loads, clean markup, Core Web Vitals awareness. Beautiful is useless if it feels slow on a phone in Foleshill traffic.',
  },
  {
    title: 'Ongoing polish',
    body: 'Launch support, content tweaks, and optional retainers once the site is live and winning enquiries.',
  },
]

export default function Services() {
  const seo = pageSeo({
    title: 'Web Design & Development Services | VectorMoon Coventry',
    description:
      'Custom web design, multi-page SEO/GEO builds, e-commerce, and performance engineering for UK local businesses. Based in Coventry, serving the West Midlands.',
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Web design and development',
      provider: businessJsonLd,
      areaServed: 'Coventry, West Midlands, United Kingdom',
    },
  })

  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="Services"
        title="Everything between"
        highlight="brief and launch."
        subtitle="A focused studio stack for small businesses that need a serious site without enterprise theatre."
        primaryCta={{ to: '/contact', label: 'Discuss your project' }}
        secondaryCta={{ to: '/pricing', label: 'See pricing' }}
        compact
      />

      <section className="section-pad pt-4" style={{ background: '#0B1020' }}>
        <div className="mx-auto grid max-w-[1100px] gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-8"
            >
              <span className="text-xs font-mono text-cyan/70">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="mt-3 text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-[1100px] rounded-2xl border border-cyan/20 bg-cyan/5 p-8 text-center">
          <p className="text-lg font-semibold">Need a Coventry-focused local landing page?</p>
          <p className="mt-2 text-sm text-text-secondary">
            See our dedicated web design Coventry page built for local search &amp; AI answers.
          </p>
          <Link to="/web-design-coventry" className="mt-5 inline-block text-sm text-cyan hover:underline">
            Web design Coventry →
          </Link>
        </div>
      </section>
    </>
  )
}
