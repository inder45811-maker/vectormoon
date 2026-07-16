import { Link, useParams, Navigate } from 'react-router-dom'
import Seo from '../components/Seo'
import DeviceFrame from '../components/ui/DeviceFrame'
import { getProject, projects } from '../data/projects'
import { pageSeo } from '../data/seo'

export default function WorkDetail() {
  const { slug } = useParams()
  const p = getProject(slug)
  if (!p) return <Navigate to="/work" replace />

  const seo = pageSeo({
    title: `${p.title} — Client Project | VectorMoon`,
    description: p.description,
    path: `/work/${p.slug}`,
    type: 'article',
    image: `https://www.vectormoon.co.uk${p.image}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: p.title,
      description: p.description,
      url: `https://www.vectormoon.co.uk/work/${p.slug}`,
      creator: { '@type': 'Organization', name: 'VectorMoon' },
      about: p.industry,
    },
  })

  const others = projects.filter((x) => x.slug !== p.slug)

  return (
    <>
      <Seo {...seo} />
      <article className="pt-32 pb-24" style={{ background: '#0B1020' }}>
        <div className="mx-auto max-w-[1000px] px-5 lg:px-8">
          <Link to="/work" className="text-sm text-cyan hover:underline">
            ← All work
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan">{p.tag}</span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-text-secondary">{p.location}</span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-text-secondary">{p.industry}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary">{p.tagline}</p>

          <div className="mt-12">
            <DeviceFrame src={p.image} alt={`${p.title} desktop screenshot`} />
          </div>

          {p.imageMobile && (
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-[280px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-2xl">
                <div className="flex justify-center border-b border-white/5 py-2">
                  <div className="h-1.5 w-16 rounded-full bg-white/15" />
                </div>
                <img src={p.imageMobile} alt={`${p.title} mobile`} className="w-full object-cover object-top" loading="lazy" />
              </div>
            </div>
          )}

          <div className="prose-invert mt-14 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold mb-3">The brief</h2>
              <p className="text-text-secondary leading-relaxed text-sm">{p.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3">What we delivered</h2>
              <ul className="space-y-2">
                {p.results.map((r) => (
                  <li key={r} className="flex gap-2 text-sm text-text-secondary">
                    <span className="text-cyan">▹</span> {r}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-text-secondary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cyan px-7 py-3 text-sm font-semibold text-void"
            >
              Visit live site ↗
            </a>
            <Link
              to="/contact"
              className="rounded-full border border-white/15 px-7 py-3 text-sm text-white hover:border-cyan/40"
            >
              Start a similar project
            </Link>
          </div>

          <div className="mt-20 border-t border-white/10 pt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan mb-6">More work</p>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.map((o) => (
                <Link key={o.slug} to={`/work/${o.slug}`} className="group no-underline">
                  <DeviceFrame src={o.image} alt={o.title} />
                  <p className="mt-3 font-semibold text-white group-hover:text-cyan">{o.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
