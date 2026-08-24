import { Link, Navigate } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import DeviceFrame from '../components/ui/DeviceFrame'
import Testimonials from '../components/Testimonials'
import { projects } from '../data/projects'
import { plans } from '../data/pricing'
import { pageSeo, businessJsonLd } from '../data/seo'
import { getLocation, countyRegion } from '../data/locations'

export default function LocationPage({ slug }) {
  const loc = getLocation(slug)
  if (!loc) return <Navigate to="/" replace />

  const nearby = (loc.nearby || []).map((s) => getLocation(s)).filter(Boolean)

  const seo = pageSeo({
    title: loc.title,
    description: loc.description,
    path: `/web-design-${loc.slug}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: `Web Design ${loc.town}`,
          description: loc.description,
          provider: businessJsonLd,
          areaServed: [
            { '@type': 'City', name: loc.town },
            { '@type': 'AdministrativeArea', name: loc.county },
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
          mainEntity: loc.faqs.map((f) => ({
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
      <Seo {...seo} geoRegion={countyRegion(loc.county)} geoPlacename={loc.town} />
      <PageHero
        eyebrow={loc.eyebrow}
        title={loc.heroTitle}
        highlight={loc.highlight}
        subtitle={loc.subtitle}
        primaryCta={{ to: '/contact', label: `Book free ${loc.town} consult` }}
        secondaryCta={{ to: '/work', label: 'See local work' }}
        compact
      />

      <section className="section-pad pt-4" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[900px] px-5">
          <h2 className="text-2xl font-bold md:text-3xl">
            Why {loc.town} businesses choose <span className="gradient-text">VectorMoon</span>
          </h2>
          <div className="mt-6 space-y-4 text-text-secondary leading-relaxed text-[15px]">
            {loc.intro.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          {nearby.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Also serving nearby towns</h2>
              <div className="flex flex-wrap gap-3">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    to={`/web-design-${n.slug}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-text-secondary transition hover:border-cyan/40 hover:text-cyan"
                  >
                    Web Design {n.town}
                  </Link>
                ))}
              </div>
            </div>
          )}

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
            <h2 className="text-2xl font-bold mb-6">{loc.town} web design pricing</h2>
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
            <h2 className="text-2xl font-bold mb-6">FAQ — web design in {loc.town}</h2>
            <div className="space-y-4">
              {loc.faqs.map((f) => (
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

          <Testimonials />

          <div className="mt-16 rounded-2xl border border-cyan/25 bg-gradient-to-br from-cyan/10 to-purple/5 p-8 text-center">
            <h2 className="text-2xl font-bold">
              Serving {loc.town} &amp; {loc.county}
            </h2>
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
