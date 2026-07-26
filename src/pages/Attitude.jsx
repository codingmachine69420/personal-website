import { EditorialPage } from '../components/EditorialPage'
import { page } from '../content/attitude'
import { projects } from '../content/projects'

export function Attitude() {
  return (
    <div>
      <EditorialPage {...page} />

      {/* ── Projects ── */}
      <div style={{ background: 'var(--color-paper)', borderTop: '3px solid var(--color-accent)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 48px) 96px' }}>
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 32 }}>Projects</p>

          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {projects.map((project) => (
              <article
                key={project.name}
                style={{ background: 'var(--color-ink)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
                  alt={`Screenshot for the ${project.name} project`}
                  style={{ height: 160, width: '100%', objectFit: 'cover', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 24 }}>
                  <h2 className="font-editorial" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: 8 }}>
                    {project.name}
                  </h2>
                  <p style={{ color: 'var(--color-body-dark)', fontSize: 15, lineHeight: 1.65, flex: 1 }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0' }}>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="label-caps"
                        style={{ fontSize: '0.75rem', color: 'var(--color-body-dark)', border: '1px solid rgba(255,255,255,0.12)', padding: '3px 8px' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 20 }}>
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="label-caps"
                        style={{ color: 'var(--color-accent)', fontSize: '0.75rem', textDecoration: 'none' }}
                        target="_blank" rel="noreferrer">Live demo</a>
                    )}
                    {project.repoUrl && (
                      <a href={project.repoUrl} className="label-caps"
                        style={{ color: 'var(--color-body-dark)', fontSize: '0.75rem', textDecoration: 'none' }}
                        target="_blank" rel="noreferrer">Source</a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
