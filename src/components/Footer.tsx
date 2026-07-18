import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import SocialLinks from './SocialLinks';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
];

export default function Footer() {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const email = profile.social.email;

  async function handleCopy() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <footer id="contact" className="border-t border-border-subtle bg-base">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <p className="hero-heading font-kanit text-2xl font-semibold">{profile.name}</p>
            <p className="mt-2 text-sm text-neutral-400">{profile.specialization}</p>
            <p className="mt-1 text-sm text-neutral-500">{profile.location}</p>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              Navigate
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-neutral-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
              Reach out
            </p>

            {email && (
              <button
                type="button"
                onClick={handleCopy}
                className="mb-3 flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-neutral-100"
              >
                <span>{email}</span>
                {copied ? (
                  <Check size={14} className="text-accent-magenta" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            )}

            {profile.social.phone && (
              <a
                href={`tel:${profile.social.phone.replace(/\s+/g, '')}`}
                className="mb-4 block text-sm text-neutral-400 transition-colors hover:text-neutral-100"
              >
                {profile.social.phone}
              </a>
            )}

            <SocialLinks social={profile.social} variant="inline" />
          </div>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-neutral-600 sm:flex-row sm:px-8">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Built with React, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
