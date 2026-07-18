import { Github, Instagram, Linkedin, Mail, Phone, Globe } from 'lucide-react';
import type { SocialLinksData } from '../types/portfolio';

interface SocialLinksProps {
  social: SocialLinksData;
  variant?: 'pill' | 'inline';
}

interface SocialEntry {
  key: keyof SocialLinksData;
  label: string;
  href: string;
  icon: React.ReactNode;
}

function buildHref(key: keyof SocialLinksData, value: string): string {
  if (key === 'email') return `mailto:${value}`;
  if (key === 'phone') return `tel:${value.replace(/\s+/g, '')}`;
  return value;
}

export default function SocialLinks({ social, variant = 'pill' }: SocialLinksProps) {
  const allEntries: SocialEntry[] = [
    { key: 'github', label: 'GitHub', href: social.github, icon: <Github size={16} strokeWidth={1.75} /> },
    { key: 'linkedin', label: 'LinkedIn', href: social.linkedin, icon: <Linkedin size={16} strokeWidth={1.75} /> },
    { key: 'instagram', label: 'Instagram', href: social.instagram, icon: <Instagram size={16} strokeWidth={1.75} /> },
    { key: 'website', label: 'Website', href: social.website, icon: <Globe size={16} strokeWidth={1.75} /> },
    { key: 'email', label: 'Email', href: social.email, icon: <Mail size={16} strokeWidth={1.75} /> },
    { key: 'phone', label: 'Phone', href: social.phone, icon: <Phone size={16} strokeWidth={1.75} /> },
  ];
  const entries = allEntries.filter((entry) => entry.href && entry.href.trim().length > 0);

  if (entries.length === 0) return null;

  if (variant === 'inline') {
    return (
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <a
            key={entry.key}
            href={buildHref(entry.key, entry.href)}
            target={entry.key === 'email' || entry.key === 'phone' ? undefined : '_blank'}
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-neutral-100"
          >
            {entry.icon}
            <span>{entry.label}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {entries.map((entry) => (
        <a
          key={entry.key}
          href={buildHref(entry.key, entry.href)}
          target={entry.key === 'email' || entry.key === 'phone' ? undefined : '_blank'}
          rel="noreferrer"
          aria-label={entry.label}
          className="group flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-2 text-sm text-neutral-300 transition-all hover:border-accent-magenta/50 hover:text-white"
        >
          <span className="text-neutral-400 transition-colors group-hover:text-accent-magenta">
            {entry.icon}
          </span>
          <span className="hidden sm:inline">{entry.label}</span>
        </a>
      ))}
    </div>
  );
}
