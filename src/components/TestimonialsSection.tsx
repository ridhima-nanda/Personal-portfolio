import { Quote } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

export default function TestimonialsSection() {
  const { testimonials } = usePortfolio();

  if (testimonials.length === 0) return null;

  // Duplicate the list once so the marquee track is exactly 200% wide —
  // translateX(-50%) then lands back on an identical frame, no visible seam.
  const looped = [...testimonials, ...testimonials];

  return (
    <section className="border-y border-border-subtle bg-surface py-24">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
          Testimonials
        </p>
        <h2 className="hero-heading mb-14 font-kanit text-3xl font-semibold sm:text-4xl">
          What it&apos;s like to work with me
        </h2>
      </div>

      <div className="marquee-track flex w-max gap-6 px-6 sm:px-8">
        {looped.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="w-[320px] shrink-0 rounded-2xl border border-border-subtle bg-card p-6 sm:w-[360px]"
          >
            <Quote size={22} className="mb-4 text-neutral-700" strokeWidth={1.75} />
            <p className="wrap-normal text-sm italic leading-relaxed text-neutral-300">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-black"
                style={{ backgroundColor: testimonial.avatarColor }}
              >
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-200">
                  {testimonial.name}
                </p>
                <p className="text-xs text-neutral-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
