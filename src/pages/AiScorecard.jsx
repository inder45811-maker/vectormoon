import { useState } from 'react'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { pageSeo } from '../data/seo'

const BOOKING_URL = 'https://cal.com/vectormoon/chat'

const SCORED = ['admin_hours', 'out_of_hours', 'crm', 'data_entry', 'invoicing', 'reviews']

const LABELS = {
  admin_hours: 'Hours on repetitive admin',
  out_of_hours: 'Out-of-hours enquiries',
  crm: 'CRM use',
  data_entry: 'Manual data entry',
  invoicing: 'Invoicing',
  reviews: 'Review collection',
  staff: 'Staff count',
  revenue: 'Revenue band',
}

const QUESTIONS = [
  {
    name: 'admin_hours',
    title: '1. In a typical week, how many hours does your team spend on repetitive admin?',
    options: [
      { value: 'under5', points: 1, label: 'Under 5 hours' },
      { value: '5to15', points: 2, label: '5–15 hours' },
      { value: '15to30', points: 3, label: '15–30 hours' },
      { value: 'over30', points: 4, label: 'Over 30 hours' },
    ],
  },
  {
    name: 'out_of_hours',
    title: '2. How are enquiries handled outside working hours?',
    options: [
      { value: 'wait', points: 4, label: 'They wait until the next working day' },
      { value: 'ad_hoc', points: 3, label: 'Someone checks when they can' },
      { value: 'basic', points: 2, label: 'An answering service or a basic auto-reply' },
      { value: 'prompt', points: 1, label: 'They are handled promptly, including evenings and weekends' },
    ],
  },
  {
    name: 'crm',
    title: '3. How do you keep track of leads and clients?',
    options: [
      { value: 'none', points: 4, label: "We don't use a CRM" },
      { value: 'spreadsheet', points: 3, label: 'Spreadsheets or the inbox' },
      { value: 'inconsistent', points: 2, label: "We have a CRM, but it isn't used consistently" },
      { value: 'used', points: 1, label: 'We have a CRM the team actually uses' },
    ],
  },
  {
    name: 'data_entry',
    title: '4. How much data is still entered by hand?',
    hint: 'Invoices, job details, records and the like.',
    options: [
      { value: 'most', points: 4, label: 'Most of it is typed in by hand' },
      { value: 'mix', points: 2, label: 'A mix of manual and automatic' },
      { value: 'auto', points: 1, label: 'Most of it is already automatic' },
    ],
  },
  {
    name: 'invoicing',
    title: '5. How do you raise invoices?',
    options: [
      { value: 'manual', points: 4, label: 'Written or typed by hand each time' },
      { value: 'software', points: 2, label: 'Accounting software, with a fair amount of manual work' },
      { value: 'auto', points: 1, label: 'Mostly automatic once the job is done' },
    ],
  },
  {
    name: 'reviews',
    title: '6. How do you collect customer reviews?',
    options: [
      { value: 'rarely', points: 4, label: "We don't ask, or only when we remember" },
      { value: 'occasional', points: 2, label: 'The occasional email after a job' },
      { value: 'automatic', points: 1, label: 'A regular, automatic request' },
    ],
  },
  {
    name: 'staff',
    title: '7. How many people work in the business?',
    hint: 'Used to tailor the recommendations, not the score.',
    options: [
      { value: '1-10', points: 0, label: '1–10' },
      { value: '11-50', points: 0, label: '11–50' },
      { value: '51-200', points: 0, label: '51–200' },
      { value: '200+', points: 0, label: '200+' },
    ],
  },
  {
    name: 'revenue',
    title: '8. Rough annual revenue',
    hint: 'A band is enough. Used to tailor the recommendations, not the score.',
    options: [
      { value: 'under-1m', points: 0, label: 'Under £1m' },
      { value: '1-5m', points: 0, label: '£1m–£5m' },
      { value: '5-50m', points: 0, label: '£5m–£50m' },
      { value: '50-250m', points: 0, label: '£50m–£250m' },
      { value: 'over-250m', points: 0, label: 'Over £250m' },
    ],
  },
]

const RECIPES = [
  { key: 'out_of_hours', min: 3, title: 'Out-of-hours enquiries', body: 'An AI chat assistant or a proper auto-reply so leads get a useful response when your team is closed, with a clean hand-off the next morning.' },
  { key: 'crm', min: 3, title: 'Lead follow-up', body: 'Log enquiries automatically and chase the ones that go quiet, instead of leaving them in the inbox.' },
  { key: 'invoicing', min: 3, title: 'Invoicing', body: 'Cut the manual steps between “job done” and “invoice sent”, including reminders.' },
  { key: 'data_entry', min: 3, title: 'Data entry', body: 'Move recurring records — jobs, invoices, contacts — out of re-typing and into a single flow.' },
  { key: 'reviews', min: 3, title: 'Reviews', body: 'A simple automatic request after each completed job, so you are not relying on memory.' },
  { key: 'admin_hours', min: 3, title: 'Back-office admin', body: 'Map the repetitive tasks eating the most hours, then automate the top two first.' },
]

const FALLBACKS = [
  { title: 'A focused audit', body: 'A two-week, fixed-fee audit would rank the remaining work by hours and pounds saved, then give you a build plan.' },
  { title: 'Start with one workflow', body: 'Pick a single, visible process — usually enquiries or invoicing — and automate that before touching the rest.' },
  { title: 'Keep what already works', body: 'You already have some of this in place. An audit would find the gaps rather than replacing tools that the team uses.' },
]

function bandFor(score) {
  if (score >= 18) {
    return {
      name: 'High opportunity',
      copy: 'A lot of time is still going on manual work. Start with an audit of the top five automations, ranked by hours and pounds saved.',
    }
  }
  if (score >= 12) {
    return {
      name: 'Ready to automate',
      copy: 'There are clear, specific gaps. A fixed-fee audit would rank the work by hours and cost saved, then give you a build plan.',
    }
  }
  return {
    name: 'Systems in place',
    copy: 'You already have some of this working. An audit would find the remaining high-value gaps rather than starting from scratch.',
  }
}

function optionLabel(name, value) {
  const q = QUESTIONS.find((item) => item.name === name)
  return q?.options.find((o) => o.value === value)?.label ?? value
}

function optionPoints(name, value) {
  const q = QUESTIONS.find((item) => item.name === name)
  return q?.options.find((o) => o.value === value)?.points ?? 0
}

function recommendations(answers) {
  const ranked = SCORED
    .map((key) => ({ key, points: optionPoints(key, answers[key]) }))
    .sort((a, b) => b.points - a.points)

  const picks = []
  const used = {}
  ranked.forEach((item) => {
    if (picks.length >= 3) return
    const recipe = RECIPES.find((r) => r.key === item.key && item.points >= r.min)
    if (recipe) {
      picks.push(recipe)
      used[recipe.title] = true
    }
  })
  FALLBACKS.forEach((fb) => {
    if (picks.length >= 3 || used[fb.title]) return
    picks.push(fb)
    used[fb.title] = true
  })

  const staff = answers.staff
  const revenue = answers.revenue
  const larger =
    staff === '51-200' || staff === '200+' || revenue === '5-50m' || revenue === '50-250m' || revenue === 'over-250m'
  const smaller = staff === '1-10' || revenue === 'under-1m'
  if (picks[0] && larger) {
    picks[0] = {
      title: picks[0].title,
      body:
        picks[0].body +
        ' For a business of this size, the audit is the right first step: it ranks the work across teams, not just the website.',
    }
  } else if (picks[0] && smaller) {
    picks[0] = {
      title: picks[0].title,
      body:
        picks[0].body +
        ' For a smaller team, it is usually worth starting with one visible win — often enquiries or review requests — before a wider build.',
    }
  }
  return picks.slice(0, 3)
}

export default function AiScorecard() {
  const seo = pageSeo({
    title: 'AI Readiness Scorecard | VectorMoon',
    description:
      'A 90-second AI readiness scorecard for established businesses. Get a score, three practical recommendations, and a next step.',
    path: '/ai/scorecard',
  })

  const [answers, setAnswers] = useState({})
  const [error, setError] = useState(false)
  const [result, setResult] = useState(null)
  const [capture, setCapture] = useState({ name: '', email: '', company: '' })
  const [sent, setSent] = useState(false)

  const onSelect = (name, value) => {
    setAnswers((prev) => ({ ...prev, [name]: value }))
    setError(false)
  }

  const onScore = (e) => {
    e.preventDefault()
    const complete = QUESTIONS.every((q) => answers[q.name])
    if (!complete) {
      setError(true)
      return
    }
    const score = SCORED.reduce((sum, key) => sum + optionPoints(key, answers[key]), 0)
    const band = bandFor(score)
    const recs = recommendations(answers)
    setResult({ score, max: 24, band, recs, answers: { ...answers } })
    setSent(false)
    requestAnimationFrame(() => {
      document.getElementById('results')?.focus()
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const onCapture = (e) => {
    e.preventDefault()
    if (!result) return
    const name = capture.name.trim()
    const email = capture.email.trim()
    const company = capture.company.trim()
    if (!name || !email) return

    const lines = [
      'AI readiness scorecard results',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || '(not given)'}`,
      '',
      `Score: ${result.score}/${result.max} — ${result.band.name}`,
      result.band.copy,
      '',
      'Answers:',
      ...Object.keys(LABELS).map((key) => `- ${LABELS[key]}: ${optionLabel(key, result.answers[key])}`),
      '',
      'Recommendations:',
      ...result.recs.map((r, i) => `${i + 1}. ${r.title} — ${r.body}`),
    ]
    const subject = `AI scorecard — ${result.score}/24 — ${company || name}`
    const href = `mailto:indi@vectormoon.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setSent(true)
    window.location.href = href
  }

  return (
    <>
      <Seo {...seo} />
      <PageHero
        eyebrow="90-second scorecard"
        title="How ready is your business"
        highlight="for AI?"
        subtitle="Eight short questions. You get a score, three tailored recommendations, and the option to send the results to us. Nothing is stored on this page."
        secondaryCta={{ href: BOOKING_URL, label: 'Book an AI audit', external: true }}
        compact
      />

      <section className="section-pad pt-4" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[720px]">
          <form onSubmit={onScore} noValidate>
            {QUESTIONS.map((q) => (
              <fieldset key={q.name} className="mb-4 min-w-0 border-0 p-0">
                <legend className="sr-only">{q.title}</legend>
                <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-nebula/55 p-6">
                  <p className="font-display text-[1.05rem] font-bold leading-snug tracking-[-0.02em]">{q.title}</p>
                  {q.hint ? <p className="mt-1 text-xs text-text-secondary">{q.hint}</p> : null}
                  <div className="mt-4 flex flex-col gap-2">
                    {q.options.map((opt) => {
                      const id = `${q.name}-${opt.value}`
                      const checked = answers[q.name] === opt.value
                      return (
                        <label
                          key={opt.value}
                          htmlFor={id}
                          className={`flex min-h-11 min-w-0 cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 text-sm transition ${
                            checked
                              ? 'border-cyan bg-cyan/10 text-white'
                              : 'border-white/[0.08] bg-void/50 text-text-muted hover:border-cyan/35'
                          }`}
                        >
                          <input
                            id={id}
                            type="radio"
                            name={q.name}
                            value={opt.value}
                            checked={checked}
                            onChange={() => onSelect(q.name, opt.value)}
                            required={q.options[0].value === opt.value}
                            className="mt-0.5 h-[1.1rem] w-[1.1rem] shrink-0 accent-cyan"
                          />
                          <span className="break-words">{opt.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </fieldset>
            ))}

            {error ? (
              <p className="mb-4 text-sm text-[#ffb4b4]" role="alert">
                Please answer every question before seeing your score.
              </p>
            ) : null}

            <button
              type="submit"
              className="rounded-full bg-cyan px-8 py-3.5 text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110"
            >
              See my score
            </button>
          </form>

          {result ? (
            <section
              id="results"
              tabIndex={-1}
              aria-labelledby="results-title"
              className="mt-10 scroll-mt-28 rounded-2xl border border-cyan/35 bg-satellite p-8 outline-none md:p-10"
            >
              <h2 id="results-title" className="text-xl font-bold">
                Your result
              </h2>
              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <p className="text-4xl font-bold leading-none tracking-[-0.04em] gradient-text">
                  {result.score}/{result.max}
                </p>
                <p className="rounded-full border border-cyan/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan">
                  {result.band.name}
                </p>
              </div>
              <p className="mt-3 text-sm text-text-secondary">{result.band.copy}</p>

              <h3 className="mt-8 text-lg font-bold">Three places to start</h3>
              <ol className="mt-3 list-none space-y-4 p-0">
                {result.recs.map((r) => (
                  <li key={r.title} className="text-sm text-text-secondary">
                    <strong className="mb-1 block font-display font-bold text-white">{r.title}</strong>
                    {r.body}
                  </li>
                ))}
              </ol>

              {/* TODO: form backend (e.g. Formspree) needs Indi's approval before this can post instead of opening a mailto. */}
              <form onSubmit={onCapture} className="mt-8 border-t border-white/[0.08] pt-7">
                <h3 className="text-lg font-bold">Send these results to Vector Moon</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  We'll open an email to indi@vectormoon.co.uk with your answers and score already filled in. You review
                  it before it goes.
                </p>
                <div className="mt-5">
                  <label htmlFor="cap-name" className="block text-xs text-text-muted">
                    Your name
                  </label>
                  <input
                    id="cap-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={capture.name}
                    onChange={(e) => setCapture((c) => ({ ...c, name: e.target.value }))}
                    className="mt-1 w-full border-0 border-b border-outline bg-transparent py-3 text-base text-white outline-none focus:border-cyan"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="cap-email" className="block text-xs text-text-muted">
                    Email
                  </label>
                  <input
                    id="cap-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={capture.email}
                    onChange={(e) => setCapture((c) => ({ ...c, email: e.target.value }))}
                    className="mt-1 w-full border-0 border-b border-outline bg-transparent py-3 text-base text-white outline-none focus:border-cyan"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="cap-company" className="block text-xs text-text-muted">
                    Company <span className="font-normal text-text-secondary">(optional)</span>
                  </label>
                  <input
                    id="cap-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={capture.company}
                    onChange={(e) => setCapture((c) => ({ ...c, company: e.target.value }))}
                    className="mt-1 w-full border-0 border-b border-outline bg-transparent py-3 text-base text-white outline-none focus:border-cyan"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 rounded-full bg-cyan px-8 py-3.5 text-sm font-semibold text-void shadow-[var(--shadow-glow-cyan)] transition hover:brightness-110"
                >
                  Email my results
                </button>
                {sent ? (
                  <p className="mt-3 text-sm text-cyan-light">
                    Your email app should now be open with the results filled in. Send it when you're happy with it.
                  </p>
                ) : null}
              </form>
            </section>
          ) : null}
        </div>
      </section>
    </>
  )
}
