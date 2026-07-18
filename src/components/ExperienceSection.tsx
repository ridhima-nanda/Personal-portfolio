import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function ExperienceSection() {
  const { experience } = usePortfolio();

  if (experience.length === 0) return null;

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
        Experience
      </p>
      <h2 className="hero-heading mb-14 font-kanit text-3xl font-semibold sm:text-4xl">
        Where the last {experience.length > 1 ? `${experience.length} roles` : 'role'} happened
      </h2>

      <div className="divide-y divide-border-subtle border-t border-border-subtle">
        {experience.map((entry, index) => (
          <motion.div
            key={`${entry.company}-${entry.period}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="grid gap-4 py-10 sm:grid-cols-[3rem_1fr]"
          >
            <span className="font-mono text-sm text-neutral-600">{pad(index + 1)}</span>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-kanit text-xl font-medium text-neutral-100 sm:text-2xl">
                  {entry.role} &middot; <span className="text-neutral-400">{entry.company}</span>
                </h3>
                <span className="rounded-full border border-border-subtle px-3 py-1 font-mono text-xs text-neutral-400">
                  {entry.period}
                </span>
              </div>

              <p className="wrap-normal mt-3 text-sm text-neutral-500">{entry.location}</p>
              <p className="wrap-normal mt-4 max-w-2xl text-neutral-400">{entry.summary}</p>

              {entry.highlights.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {entry.highlights.slice(0, 3).map((highlight) => (
                    <li key={highlight} className="wrap-normal flex gap-3 text-sm text-neutral-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-magenta" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
