import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { pageSeo } from '../data/seo'
import { openConsentSettings } from '../utils/consent'

const H2 = ({ children }) => <h2 className="mt-12 mb-3 text-xl font-bold text-white">{children}</h2>
const P = ({ children }) => <p className="mb-4 text-sm leading-relaxed text-text-secondary">{children}</p>
const UL = ({ children }) => (
  <ul className="mb-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">{children}</ul>
)
const A = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan underline">
    {children}
  </a>
)

export default function Privacy() {
  const seo = pageSeo({
    title: 'Privacy & Cookie Policy | VectorMoon',
    description:
      'How VectorMoon handles enquiries and which third-party services the site uses: Google Analytics 4, Google Ads, Tidio live chat and FormSubmit.',
    path: '/privacy-policy/',
  })

  return (
    <>
      <Seo {...seo} />
      <PageHero eyebrow="Privacy" title="Privacy &" highlight="cookie policy." subtitle="Effective date: 20 October 2026" compact />
      <section className="section-pad pt-2" style={{ background: '#0B1020' }}>
        <article className="mx-auto max-w-[760px] px-5">
          <P>
            This policy explains what personal data VectorMoon collects when you visit{' '}
            <strong className="text-white">vectormoon.co.uk</strong> or send us an enquiry, which services process it,
            and the choices you have. We follow the UK GDPR, the Data Protection Act 2018 and the Privacy and
            Electronic Communications Regulations (PECR).
          </P>

          <H2>1. Who we are</H2>
          <P>
            VectorMoon is a web design studio based in Coventry, West Midlands, working with businesses across the UK.
            We are the controller for the personal data described here. Contact:{' '}
            <a href="mailto:indi@vectormoon.co.uk" className="text-cyan underline">indi@vectormoon.co.uk</a> ·{' '}
            <a href="tel:07341555160" className="text-cyan underline">07341 555160</a>.
          </P>

          <H2>2. Enquiries (contact form, email, phone)</H2>
          <P>
            When you use the enquiry form we receive your name, email address and message, plus anything you choose to
            add: phone number, current website and the package you&apos;re interested in. We use it only to reply,
            prepare a proposal and, if you go ahead, deliver the project. Lawful basis: steps taken at your request
            before entering into a contract, and our legitimate interest in answering enquiries.
          </P>
          <P>
            The form is delivered by <strong className="text-white">FormSubmit</strong> (formsubmit.co), a
            third-party form-to-email service. Your submission passes through FormSubmit&apos;s servers before it
            reaches our inbox. See <A href="https://formsubmit.co/privacy.html">FormSubmit&apos;s privacy policy</A>.
            Our email is hosted by Google Workspace.
          </P>

          <H2>3. Cookies and similar technologies</H2>
          <P>
            Nothing non-essential loads until you choose. On your first visit we ask whether you accept cookies for
            the services below. Your choice is saved in your browser&apos;s local storage (key{' '}
            <code className="text-white/80">vm-consent-v1</code>). That is the only thing stored before you accept.
            You can change your mind at any time:{' '}
            <button type="button" onClick={openConsentSettings} className="text-cyan underline">
              open cookie settings
            </button>
            .
          </P>
          <UL>
            <li>
              <strong className="text-white">Google Analytics 4</strong> (Google, measurement ID G-66ZRT7NPNW), only if
              you accept. It records the pages you view, how you arrived (e.g. a search or a link in an email), device
              and browser type, approximate location (derived from your IP address, which GA4 does not store), and
              actions such as sending the enquiry form or tapping our phone number or email address. Cookies:{' '}
              <code className="text-white/80">_ga</code> and <code className="text-white/80">_ga_*</code>, up to 2
              years. Purpose: understanding which pages bring enquiries.
            </li>
            <li>
              <strong className="text-white">Google Ads conversion measurement</strong>, only if you accept. It runs
              through the same Google tag and tells us whether visits from our Google ads lead to enquiries. Cookies
              such as <code className="text-white/80">_gcl_au</code> (around 90 days). We use Google Consent Mode v2,
              so if you reject, Google tags are not loaded at all.
            </li>
            <li>
              <strong className="text-white">Tidio live chat</strong> (Tidio LLC). It is only loaded if you click
              &ldquo;Chat&rdquo; and either accepted cookies or confirm you&apos;re happy for chat to load. Tidio then
              processes the messages you type, any name or email you give, your IP address and device information, and
              stores identifiers in cookies/local storage to keep the conversation going. See{' '}
              <A href="https://www.tidio.com/privacy-policy/">Tidio&apos;s privacy policy</A>.
            </li>
          </UL>
          <P>
            Google&apos;s use of data is described at{' '}
            <A href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites that use its services</A>.
          </P>

          <H2>4. Other services that see technical data</H2>
          <UL>
            <li>
              <strong className="text-white">Hosting:</strong> the site is hosted on GitHub Pages (GitHub, Inc.), which
              processes IP addresses in server logs to deliver and secure the site.
            </li>
          </UL>

          <H2>5. Sharing and international transfers</H2>
          <P>
            We don&apos;t sell personal data and we don&apos;t send marketing emails unless you ask us to stay in touch.
            The providers above act as processors or independent controllers for their own services. Some of them
            (Google, GitHub, Tidio, FormSubmit) may process data outside the UK. Where they do, they rely on UK
            adequacy regulations (including the UK–US data bridge where the provider is certified) or the UK
            International Data Transfer Addendum / standard contractual clauses. We may also share data with our
            accountant or legal advisers where the law requires it.
          </P>

          <H2>6. How long we keep data</H2>
          <UL>
            <li>Enquiries that don&apos;t become projects: up to 24 months, then deleted.</li>
            <li>Client project and billing records: 6 years, for UK tax and accounting rules.</li>
            <li>Google Analytics data: retained for the period set in our GA4 account (maximum 14 months for event-level data).</li>
          </UL>

          <H2>7. Your rights</H2>
          <P>
            You can ask for a copy of your data, or ask us to correct it, delete it, restrict or object to its use, or
            move it to another provider. Where we rely on consent (analytics, ads, chat) you can withdraw it at any time
            in cookie settings. Email{' '}
            <a href="mailto:indi@vectormoon.co.uk" className="text-cyan underline">indi@vectormoon.co.uk</a> and
            we&apos;ll respond within one month. If you&apos;re unhappy with our response you can complain to the{' '}
            <A href="https://ico.org.uk/make-a-complaint/">Information Commissioner&apos;s Office (ICO)</A>.
          </P>

          <H2>8. Security</H2>
          <P>
            The site is served over HTTPS. Access to our email and business accounts is restricted and protected with
            strong authentication.
          </P>

          <H2>9. Changes</H2>
          <P>
            If we change how we use data (for example, adding or removing a service above), we&apos;ll update this
            page and its effective date.
          </P>

          <p className="mt-12 text-sm">
            <Link to="/contact/" className="text-cyan underline">
              Contact us
            </Link>
          </p>
        </article>
      </section>
    </>
  )
}
