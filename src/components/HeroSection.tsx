import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Download, Mail, ChevronDown } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  }),
};

export default function HeroSection() {
  const { profile, skills } = usePortfolio();

  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Cursor glow/dot/ring are scoped to this section only (see .hero-cursor-zone
  // in index.css) — the rest of the site keeps the normal system cursor.
  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
    }
    if (dotRef.current) {
      dotRef.current.style.left = `${x}px`;
      dotRef.current.style.top = `${y}px`;
    }
    if (ringRef.current) {
      ringRef.current.style.left = `${x}px`;
      ringRef.current.style.top = `${y}px`;
    }
  }

  function handleMouseLeave() {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }

  // Tech ticker pulls straight from skills.categories — no separate list to maintain.
  const tickerItems = Array.from(new Set(skills.categories.flatMap((c) => c.items)));
  const loopedTicker = [...tickerItems, ...tickerItems];

  const hasResume = profile.resumeUrl && profile.resumeUrl.trim().length > 0;

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-cursor-zone relative flex min-h-screen flex-col items-center overflow-hidden px-6 pt-28 text-center"
    >
      <div aria-hidden className="hero-grid-bg" />
      <div aria-hidden className="hero-noise-bg" />
      <div aria-hidden className="hero-glow hero-glow-1" />
      <div aria-hidden className="hero-glow hero-glow-2" />
      <div ref={glowRef} aria-hidden className="hero-mouse-glow" />
      <div ref={dotRef} aria-hidden className="hero-cursor-dot" />
      <div ref={ringRef} aria-hidden className="hero-cursor-ring" />

      <div className="relative z-[3] flex w-full max-w-2xl flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.05}
          variants={fadeUp}
          className="relative mb-6 h-28 w-28 animate-[spin_6s_linear_infinite] rounded-full p-[2px] sm:h-32 sm:w-32"
          style={{ background: 'conic-gradient(from 0deg, #8B5CF6, #D946EF, #F97316, #8B5CF6)' }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-card p-[3px]">
            <div
              className="h-full w-full overflow-hidden rounded-full bg-base [&>svg]:h-full [&>svg]:w-full"
              style={{ animation: 'spin 6s linear infinite reverse' }}
              dangerouslySetInnerHTML={{ __html: profile.avatarSvg }}
            />
          </div>
        </motion.div>

        {profile.availabilityBadge && (
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.1}
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/[0.02] px-3.5 py-1.5 text-[12.5px] text-neutral-400"
          >
            <span
              className="h-[7px] w-[7px] rounded-full bg-[#22c55e]"
              style={{ boxShadow: '0 0 0 3px rgba(34,197,94,.18)' }}
            />
            {profile.availabilityBadge}
          </motion.div>
        )}

        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.16}
          variants={fadeUp}
          className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500"
        >
          {profile.role} &middot; {profile.location}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0.22}
          variants={fadeUp}
          className="whitespace-nowrap font-kanit font-semibold leading-[1.05] text-neutral-100"
          style={{ fontSize: 'clamp(3rem, 13vw, 14rem)' }}
        >
          Hi, I&apos;m <span className="hero-grad-text">{profile.shortName}</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          custom={0.32}
          variants={fadeUp}
          className="wrap-normal mt-6 max-w-xl text-balance text-base text-neutral-400 sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        {tickerItems.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={fadeUp}
            className="mt-8 w-full max-w-xl overflow-hidden border-y border-border-subtle py-3"
            style={{
              WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
              maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
            }}
          >
            <div className="marquee-track flex w-max gap-8 font-mono text-xs text-neutral-500">
              {loopedTicker.map((item, index) => (
                <span key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap">
                  {item}
                  <span className="h-[5px] w-[5px] rounded-full bg-neutral-700" />
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.48}
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="accent-gradient flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition-transform hover:scale-105"
          >
            <Rocket size={16} strokeWidth={2} />
            View Projects
          </a>
          <a
            href={hasResume ? profile.resumeUrl : '#'}
            target={hasResume ? '_blank' : undefined}
            rel={hasResume ? 'noreferrer' : undefined}
            className="flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-200 transition-colors hover:border-neutral-500"
          >
            <Download size={16} strokeWidth={2} />
            Download Resume
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={0.56}
          variants={fadeUp}
          className="mt-6"
        >
          {/* Single contact entry point — every reach-out method (email, phone,
              social) lives together in the footer; this just scrolls there. */}
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full border border-border-subtle bg-card px-5 py-2.5 text-sm text-neutral-300 transition-all hover:border-accent-magenta/50 hover:text-white"
          >
            <Mail size={15} strokeWidth={2} />
            Get in Touch
          </a>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          aria-label="Scroll to About section"
          className="mt-10 flex flex-col items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-neutral-600"
        >
          Scroll
          <ChevronDown size={14} className="animate-bounce" />
        </motion.a>
      </div>

      
    </section>
  );
}
