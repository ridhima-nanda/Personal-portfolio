import { usePortfolio } from '../hooks/usePortfolio';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const { projects } = usePortfolio();

  const ordered = [...projects].sort((a, b) => Number(b.highlight) - Number(a.highlight));

  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
        Projects
      </p>
      <h2 className="hero-heading mb-14 font-kanit text-3xl font-semibold sm:text-4xl">
        A few things I&apos;ve built
      </h2>

      <div className="space-y-8">
        {ordered.map((project, index) => (
          <div
            key={project.id}
            className="sticky"
            style={{ top: `${5 + index * 1.25}rem`, zIndex: index + 1 }}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
