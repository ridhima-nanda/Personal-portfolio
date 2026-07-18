import { ExternalLink } from 'lucide-react';
import type { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const hasLink = project.link && project.link.trim().length > 0;
  const hasImage = project.image && project.image.trim().length > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card">
      <div className="relative h-56 w-full overflow-hidden sm:h-64">
        {hasImage ? (
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0C0C0C]">
            <span className="hero-heading font-kanit text-3xl font-semibold sm:text-4xl">
              {project.title}
            </span>
          </div>
        )}
        {project.highlight && (
          <span className="accent-gradient absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-black">
            Featured
          </span>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="font-mono text-xs text-neutral-600">{pad(index + 1)}</span>
            <h3 className="mt-1 font-kanit text-2xl font-medium text-neutral-100">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-500">{project.subtitle}</p>
          </div>
          <span className="rounded-full border border-border-subtle px-3 py-1 font-mono text-xs text-neutral-400">
            {project.year}
          </span>
        </div>

        <p className="wrap-normal mt-4 max-w-2xl text-neutral-400">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-subtle px-3 py-1 text-xs text-neutral-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">{project.role}</p>
          {hasLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="accent-gradient flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black transition-transform hover:scale-105"
            >
              Live project
              <ExternalLink size={14} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
