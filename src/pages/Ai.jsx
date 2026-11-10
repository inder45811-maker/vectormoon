import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { pageSeo, businessJsonLd } from '../data/seo'

const AUDIT_MAILTO = 'mailto:indi@vectormoon.co.uk?subject=AI%20audit'

const offers = [
  {
    title: 'AI website chat assistant',
    body: 'A chat on your site that answers common questions and captures the enquiry, including after hours. Your team picks up a clear summary, not a messy transcript.',
  },
  {
    title: 'Enquiry auto-reply and lead follow-up',
    body: 'An immediate, useful reply when someone gets in touch, and a follow-up if they go quiet. Nothing sits in the inbox until Monday.',
  },
  {
    title: 'Booking and quote automation',
    body: 'Take the back-and-forth out of scheduling and quotes. Customers get a clear next step; your team stops typing the same replies.',
  },
  {
    title: 'Review requests',
    body: 'A short, automatic request after a completed job, sent at the right time. No more relying on someone to remember to ask.',
  },
  {
    title: 'Back-office admin automation',
    body: 'Invoices, data entry and routine reports. We look at the work your team retypes every week and remove the manual steps.',
  },
]

const steps = [
  {
    title: 'Scorecard',
    body: 'About 90 seconds. A first look at where time is going, and three practical starting points.',
  },
  {
    title: 'Audit',
    body: 'Two weeks, fixed fee from £1,500. A ranked report and a build plan you can act on.',
  },
  {
    title: 'Build',
    body: 'We implement the automations you choose, one at a time, against the plan in the report.',
  },
]

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="mt-0.5 shrink-0" fill="none" aria-hidden>
      <path d="M3 8l3.5 3.5L13 4.5" stroke="#00C6FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Ai() {
  const seo = pageSeo({
    title: 'AI Automation for Businesses | VectorMoon',
    description:
      'AI automation for established businesses: chat, enquiry follow-up, booking, reviews and back-office admin. Fixed-fee AI audit from £1,500.',
    path: '/ai',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI automation for businesses',
      serviceType: 'AI automation and process audit',
      provider: businessJsonLd,
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      offers: {
        '@type': 'Offer',
        name: 'Fixed-fee AI Audit',
        description:
          'Two-week audit: a report of the top five automations ranked by hours and pounds saved, plus a build plan.',
        priceCurrency: 'GBP',
        price: '1500',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 1500,
          priceCurrency: 'GBP',
        },
      },
    },
  })

  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="AI automation"
        title="AI automation"
        highlight="for businesses."
        subtitle="We find the repetitive work in your business and automate it. It starts with a fixed-fee audit, then the builds that save the most time and money."
        primaryCta={{ href: AUDIT_MAILTO, label: 'Book an AI audit', external: true }}
        secondaryCta={{ to: '/ai/scorecard/', label: 'Take the 90-second scorecard' }}
        compact
      />

      <section className="section-pad pt-4" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">What we automate</h2>
          <p className="mx-auto mt-4 mb-10 max-w-xl text-center text-sm text-text-secondary md:text-base">
            Practical additions to the way you already work. Each one is scoped after the audit, so you only pay for
            what is worth building.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            {offers.map((s, i) => (
              <article
                key={s.title}
                className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.04] to-transparent p-8"
              >
                <span className="text-xs font-mono text-cyan/70">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{s.body}</p>
              </article>
            ))}
          </div>

          <section
            className="relative mt-16 rounded-2xl border border-cyan/40 bg-satellite p-8 shadow-[0_0_50px_rgba(0,198,255,0.12)] md:p-12"
            aria-labelledby="audit-title"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">Fixed-fee AI Audit</p>
            <h2 id="audit-title" className="text-3xl font-bold tracking-tight md:text-4xl">
              Two weeks. A clear plan.
            </h2>
            <p className="mt-5 text-4xl font-bold gradient-text md:text-5xl">
              From £1,500
              <span className="ml-2 text-sm font-medium text-text-secondary">· 2 weeks</span>
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">
              You get a written report of the top five automations in your business, ranked by hours and pounds saved,
              plus a build plan for each. No long discovery and no vague strategy deck.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'A short kick-off to map how work actually gets done',
                'Top 5 automations, ranked by hours and £ saved',
                'A build plan for each, with a clear scope and price',
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-text-secondary">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* TODO: replace this mailto with a Cal.com booking link once Indi has approved an account. */}
              <a
                href={AUDIT_MAILTO}
                className="rounded-full bg-cyan px-8 py-3.5 text-center text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110"
              >
                Book an AI audit
              </a>
              <Link
                to="/ai/scorecard/"
                className="rounded-full border border-electric/60 px-8 py-3.5 text-center text-sm font-medium text-white transition hover:bg-electric/10"
              >
                Take the 90-second scorecard first
              </Link>
            </div>
            <p className="mt-5 text-xs text-text-secondary">
              The audit fee is fixed. Builds are quoted separately once you have the report, and you choose what to go
              ahead with.
            </p>
          </section>

          <section className="mt-20" aria-labelledby="steps-title">
            <h2 id="steps-title" className="text-center text-3xl font-bold tracking-tight md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 mb-10 max-w-xl text-center text-sm text-text-secondary">
              Three steps. You can stop after the scorecard or after the audit.
            </p>
            <ol className="grid list-none gap-5 p-0 md:grid-cols-3">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-white/[0.07] bg-nebula/50 p-6"
                >
                  <span className="text-xs font-mono text-cyan/70">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </>
  )
}
