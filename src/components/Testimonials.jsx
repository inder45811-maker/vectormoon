import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'

function Stars({ count }) {
  if (!count) return null
  return (
    <div className="mb-3 flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? 'text-cyan' : 'text-white/15'}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  // No real quotes yet → render nothing. Never ship placeholder proof.
  if (!testimonials.length) return null

  return (
    <section className="section-pad relative" style={{ background: '#0B1020' }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-cyan">
            Client words
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What local businesses <span className="gradient-text">say</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm"
            >
              <Stars count={t.rating} />
              <blockquote className="flex-1 text-[15px] leading-relaxed text-text-secondary">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan/30 to-purple/30 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{t.name}</span>
                  {t.role && (
                    <span className="block text-xs text-text-secondary">{t.role}</span>
                  )}
                </span>
              </figcaption>
              {t.result && (
                <p className="mt-5 rounded-xl border border-cyan/20 bg-cyan/[0.06] px-4 py-2 text-sm font-semibold text-cyan">
                  {t.result}
                </p>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
