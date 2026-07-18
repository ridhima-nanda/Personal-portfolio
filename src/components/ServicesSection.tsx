import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function ServicesSection() {
  const { services } = usePortfolio();

  if (services.length === 0) return null;

  return (
    <section id="services" className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
        Services
      </p>
      <h2 className="hero-heading mb-14 font-kanit text-3xl font-semibold sm:text-4xl">
        Where I'm most useful
      </h2>

      <div className="divide-y divide-border-subtle border-t border-border-subtle">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="grid gap-4 py-8 sm:grid-cols-[3rem_1fr]"
          >
            <span className="font-mono text-sm text-neutral-600">{pad(index + 1)}</span>
            <div>
              <h3 className="font-kanit text-xl font-medium text-neutral-100">{service.name}</h3>
              <p className="wrap-normal mt-2 max-w-2xl text-neutral-400">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
