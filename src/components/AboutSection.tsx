import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';

export default function AboutSection() {
  const { profile } = usePortfolio();
  const hasYears = typeof profile.yearsOfExperience === 'number' && profile.yearsOfExperience > 0;

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-28 sm:px-8">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500"
      >
        About
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="hero-heading font-kanit text-3xl font-semibold sm:text-4xl md:text-5xl"
      >
        {hasYears
          ? `${profile.yearsOfExperience}Building software that solves real problems`
          : "Building software that solves real problems"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="wrap-normal mt-8 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg"
      >
        {profile.bio}
      </motion.p>
    </section>
  );
}
