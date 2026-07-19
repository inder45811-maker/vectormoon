import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import DeviceFrame from '../components/ui/DeviceFrame'
import { projects } from '../data/projects'
import { plans } from '../data/pricing'
import { pageSeo, businessJsonLd } from '../data/seo'

const faqs = [
  {
    q: 'How much does web design cost in Coventry?',
    a: 'VectorMoon packages start at £799 for a single-page launch site, £1,499 for a multi-page business website, and from £2,999 for e-commerce. Local brochure competitors often price £699–£999; we sit just above that with higher-end custom design and multi-page SEO structure.',
  },
  {
    q: 'Do you only work with Coventry businesses?',
    a: 'We are based in Coventry and specialise in West Midlands local businesses, but we work UK-wide. Local SEO and Google Business guidance are strongest when you serve a clear service area.',
  },
  {
    q: 'Why multi-page instead of one long scroll?',
    a: 'Separate pages give each search intent its own title, meta description, URL, and schema — critical for Google rankings and for AI tools that answer “web designer Coventry” or “website cost UK”.',
  },
  {
    q: 'How long until my site launches?',
    a: 'Most Starter and Business projects launch in about one to two weeks once content and feedback are ready.',
  },
]

export default function WebDesignCoventry() {
  const seo = pageSeo({
    title: 'Web Design Coventry | Local Website Designer — VectorMoon',
    description:
      'Looking for web design in Coventry? VectorMoon builds modern, SEO & GEO-ready websites for local businesses. Packages from £799. Free 15-minute strategy call.',
    path: '/web-design-coventry',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: 'Web Design Coventry',
          description:
            'Custom website design and development for businesses in Coventry and the West Midlands.',
          provider: businessJsonLd,
          areaServed: [
            { '@type': 'City', name: 'Coventry' },
            { '@type': 'AdministrativeArea', name: 'West Midlands' },
          ],
          offers: plans.map((p) => ({
            '@type': 'Offer',
            name: p.name,
            price: p.price.replace(/[£+,]/g, '').split('–')[0],
            priceCurrency: 'GBP',
          })),
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    },
  })

  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="Web design Coventry"
        title="Your local website studio"
        highlight="in Coventry."
        subtitle="Modern multi-page sites for Coventry and West Midlands businesses — built to rank, convert, and look expensive."
        primaryCta={{ to: '/contact', label: 'Book free Coventry consult' }}
        secondaryCta={{ to: '/work', label: 'See local work' }}
        compact
      />

      <section className="section-pad pt-4" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold md:text-3xl">
            Why Coventry businesses choose <span className="gradient-text">VectorMoon</span>
          </h2>
          <div className="mt-6 space-y-4 text-text-secondary leading-relaxed text-[15px]">
            <p>
              A strong website is the shopfront customers check before they call. VectorMoon is a Coventry-based
              studio building custom sites for service businesses — detailing, retail, studios, trades — with
              clear pricing, real portfolio proof, and technical SEO that goes beyond a single scrolling page.
            </p>
            <p>
              Local competitors often sell WordPress brochure packages from around £699–£999. We compete on value
              with modern design, multi-page architecture for SEO and GEO (AI search), and packages from £799 that
              still leave room for craft — not template lock-in.
            </p>
          </div>

          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-6">Local work nearby</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.slice(0, 2).map((p) => (
                <Link key={p.slug} to={`/work/${p.slug}`} className="group no-underline">
                  <DeviceFrame src={p.image} alt={p.title} />
                  <p className="mt-3 font-semibold text-white group-hover:text-cyan">
                    {p.title} · {p.location}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Coventry web design pricing</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {plans.map((p) => (
                <div key={p.name} className="rounded-xl border border-white/10 bg-nebula/60 p-5">
                  <p className="text-sm text-text-secondary">{p.name}</p>
                  <p className="text-2xl font-bold gradient-text mt-1">{p.price}</p>
                </div>
              ))}
            </div>
            <Link to="/pricing" className="mt-4 inline-block text-sm text-cyan hover:underline">
              Full package details →
            </Link>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">FAQ — web design in Coventry</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 open:border-cyan/30"
                >
                  <summary className="cursor-pointer list-none font-semibold text-white marker:content-none">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-cyan/25 bg-gradient-to-br from-cyan/10 to-purple/5 p-8 text-center">
            <h2 className="text-2xl font-bold">Serving Coventry &amp; the West Midlands</h2>
            <p className="mt-3 text-sm text-text-secondary max-w-md mx-auto">
              Email{' '}
              <a className="text-cyan" href="mailto:indi@vectormoon.co.uk">
                indi@vectormoon.co.uk
              </a>{' '}
              · Call{' '}
              <a className="text-cyan" href="tel:07341555160">
                07341 555160
              </a>
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex rounded-full bg-cyan px-8 py-3 text-sm font-semibold text-void"
            >
              Book free strategy call
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
