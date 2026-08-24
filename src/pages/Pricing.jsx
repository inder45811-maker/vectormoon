import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { plans, carePlans, careDisclosure } from '../data/pricing'
import { pageSeo } from '../data/seo'

export default function Pricing() {
  const seo = pageSeo({
    title: 'Website Design Pricing UK | From £799 — VectorMoon',
    description:
      'Transparent web design pricing: Core Build £799, Growth Engine £1,499, Enterprise Scale from £2,999. Competitive for Coventry & UK small businesses. Free strategy call.',
    path: '/pricing',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'VectorMoon Website Packages',
      description: 'Custom website design packages for UK small businesses',
      brand: { '@type': 'Brand', name: 'VectorMoon' },
      offers: plans.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        description: p.blurb,
        priceCurrency: 'GBP',
        price: p.price.replace(/[£+,]/g, '').replace(/\+.*/, ''),
        availability: 'https://schema.org/InStock',
      })),
    },
  })

  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="Pricing"
        title="Clear packages."
        highlight="Serious craft."
        subtitle="Priced to beat agency bloat while staying above commodity template sites common in Coventry."
        compact
      />

      <section className="section-pad pt-4" style={{ background: '#0B1020' }}>
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? 'border-cyan/40 bg-satellite shadow-[0_0_50px_rgba(0,198,255,0.12)]'
                  : 'border-white/10 bg-nebula/70'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-void">
                  Recommended
                </span>
              )}
              <h2 className="text-lg font-bold">{plan.name}</h2>
              <p className="mt-1 text-xs text-text-secondary">{plan.blurb}</p>
              <p className="mt-5 text-4xl font-bold gradient-text">
                {plan.price}
                <span className="ml-1 text-sm font-medium text-text-secondary">{plan.period}</span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-text-secondary">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="mt-0.5 shrink-0" fill="none">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="#00C6FF" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition ${
                  plan.highlighted
                    ? 'bg-cyan text-void shadow-[var(--shadow-glow-cyan)]'
                    : 'border border-electric/50 text-white hover:bg-electric/10'
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-text-secondary">
          {careDisclosure}
        </p>
      </section>

      <section className="section-pad pt-4" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">Care plans</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Keep it working <span className="gradient-text">after launch</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-text-secondary md:text-base">
              Rankings, reviews and content are the parts that keep paying off long after the build —
              a VectorMoon care plan handles the upkeep so you don&apos;t have to. From £99/mo, cancel
              anytime. Growth Engine includes your first 3 months of SEO.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {carePlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  plan.highlighted
                    ? 'border-cyan/40 bg-satellite shadow-[0_0_50px_rgba(0,198,255,0.12)]'
                    : 'border-white/10 bg-nebula/70'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-void">
                    Most popular
                  </span>
                )}
                <span className="mb-3 inline-block w-fit rounded-full border border-white/10 px-3 py-0.5 text-[11px] text-text-secondary">
                  {plan.for}
                </span>
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="mt-1 text-xs text-text-secondary">{plan.blurb}</p>
                <p className="mt-5 text-4xl font-bold gradient-text">
                  {plan.price}
                  <span className="ml-1 text-sm font-medium text-text-secondary">{plan.period}</span>
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-text-secondary">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="mt-0.5 shrink-0" fill="none">
                        <path d="M3 8l3.5 3.5L13 4.5" stroke="#00C6FF" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? 'bg-cyan text-void shadow-[var(--shadow-glow-cyan)]'
                      : 'border border-electric/50 text-white hover:bg-electric/10'
                  }`}
                >
                  Talk to us
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
