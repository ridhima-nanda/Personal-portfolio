import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export default function SkillsSection() {
  const { skills } = usePortfolio();

  if (skills.categories.length === 0) return null;

  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
        Skills
      </p>
      <h2 className="hero-heading mb-12 font-kanit text-3xl font-semibold sm:text-4xl">
        What I reach for
      </h2>

      <div className="grid gap-8 sm:grid-cols-2">
        {skills.categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-subtle bg-card px-4 py-2 text-sm text-neutral-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
