import { PageHeader } from '../components/PageHeader'
import { projects } from '../content/projects'

export function Projects() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="03 — Directory"
        title="Projects"
        color="blue"
        description="Trading dashboards, bots, and tools I've built."
      />

      <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-night-900/50 transition-shadow hover:shadow-[0_0_30px_rgba(77,125,255,0.25)]"
          >
            <img
              src={project.image}
              alt={`Placeholder screenshot for the ${project.name} project`}
              className="h-40 w-full border-b border-white/10 object-cover"
            />
            <div className="flex flex-1 flex-col p-5">
              <h2 className="neon-blue font-display text-lg">{project.name}</h2>
              <p className="mt-2 flex-1 text-slate-300">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-slate-400">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-4 text-sm">
                {project.demoUrl ? (
                  <a href={project.demoUrl} className="neon-blue" target="_blank" rel="noreferrer">
                    Live demo
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a href={project.repoUrl} className="text-slate-400 hover:text-white" target="_blank" rel="noreferrer">
                    Source
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
