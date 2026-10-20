import Seo from '../components/Seo'
import ContactForm from '../components/ContactForm'
import { pageSeo, businessJsonLd } from '../data/seo'

const EMAIL = 'indi@vectormoon.co.uk'
const PHONE = '07341555160'
const PHONE_DISPLAY = '07341 555160'

export default function Contact() {
  const seo = pageSeo({
    title: 'Contact VectorMoon | Free Web Design Strategy Call — Coventry',
    description:
      'Book a free 15-minute web design strategy call with VectorMoon in Coventry. Email indi@vectormoon.co.uk or call 07341 555160.',
    path: '/contact/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: businessJsonLd,
    },
  })

  return (
    <>
      <Seo {...seo} />
      {/* Form first: on a phone it starts within the first screen */}
      <section
        className="relative pt-24 pb-16 md:pt-32"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 0%, rgba(61,90,254,0.18), transparent 55%), #0B1020' }}
      >
        <div className="mx-auto grid max-w-[1100px] gap-10 px-5 lg:grid-cols-[1.25fr_1fr]">
          <div id="enquiry" className="scroll-mt-24">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan">Contact</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Tell us about your <span className="gradient-text-purple">project.</span>
            </h1>
            <p className="mt-3 mb-5 text-sm text-text-secondary md:text-base">
              Free 15-minute call. Proposal within 24 hours. Prefer to talk?{' '}
              <a href={`tel:${PHONE}`} className="text-cyan underline">Call {PHONE_DISPLAY}</a>.
            </p>
            <ContactForm />
          </div>

          <aside className="space-y-4 text-sm lg:pt-24">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white hover:border-cyan/40"
            >
              <span className="text-cyan text-lg">☎</span>
              <span>
                <span className="block text-xs uppercase tracking-[0.15em] text-text-secondary">Call</span>
                {PHONE_DISPLAY}
              </span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white hover:border-cyan/40"
            >
              <span className="text-cyan text-lg">✉</span>
              <span>
                <span className="block text-xs uppercase tracking-[0.15em] text-text-secondary">Email</span>
                {EMAIL}
              </span>
            </a>
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-text-secondary">
              <span className="text-cyan mr-2">◎</span>
              Coventry, West Midlands · working with businesses UK-wide
            </p>
          </aside>
        </div>
      </section>
    </>
  )
}
