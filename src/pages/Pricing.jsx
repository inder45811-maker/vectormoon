import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { plans } from '../data/pricing'
import { pageSeo } from '../data/seo'

export default function Pricing() {
  const seo = pageSeo({
    title: 'Website Design Pricing UK | From £799 — VectorMoon',
    description:
      'Transparent web design pricing: Starter £799, Business £1,499, E-Commerce from £2,999. Competitive for Coventry & UK small businesses. Free strategy call.',
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
          Hosting, domains, and retainers quoted separately. No forced monthly lock-in to launch.
        </p>
      </section>
    </>
  )
}
