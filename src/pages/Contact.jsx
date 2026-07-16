import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import ContactForm from '../components/ContactForm'
import { pageSeo, businessJsonLd } from '../data/seo'

export default function Contact() {
  const seo = pageSeo({
    title: 'Contact VectorMoon | Free Web Design Strategy Call — Coventry',
    description:
      'Book a free 15-minute web design strategy call with VectorMoon in Coventry. Email admin@vectormoon.co.uk or call 07341 555160.',
    path: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: businessJsonLd,
    },
  })

  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="Contact"
        title="Let's build"
        highlight="something sharp."
        subtitle="Free 15-minute call. Proposal within 24 hours. Coventry studio, UK-wide clients."
        compact
      />
      <section className="section-pad pt-2" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[1000px] px-5">
          <ContactForm />
        </div>
      </section>
    </>
  )
}
