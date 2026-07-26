import { useState } from 'react'
import { EditorialPage } from '../components/EditorialPage'
import { page } from '../content/attitude'
import { projects } from '../content/projects'

const BASE = import.meta.env.BASE_URL

function ProjectCard({ project }) {
  const [idx, setIdx] = useState(0)
  const images = project.images ?? []
  const multi = images.length > 1

  const prev = (e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length) }
  const next = (e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length) }

  return (
    <article style={{ background: 'var(--color-ink)', display: 'flex', flexDirection: 'column', flex: '1 1 0', minWidth: 0 }}>

      {/* Image + carousel arrows */}
      <div style={{ position: 'relative', height: 200, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img
          src={`${BASE}${images[idx].replace(/^\//, '')}`}
          alt={`${project.name} screenshot ${idx + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Dot indicator */}
        {multi && (
          <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {images.map((_, i) => (
              <span key={i} style={{ width: 6, height: 6, background: i === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.35)', display: 'block' }} />
            ))}
          </div>
        )}

        {/* Left arrow */}
        {multi && (
          <button
            onClick={prev}
            aria-label="Previous screenshot"
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 44,
              background: 'rgba(0,0,0,0.45)', border: 'none', color: '#fff',
              cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,162,27,0.75)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
          >
            &lt;
          </button>
        )}

        {/* Right arrow */}
        {multi && (
          <button
            onClick={next}
            aria-label="Next screenshot"
            style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 44,
              background: 'rgba(0,0,0,0.45)', border: 'none', color: '#fff',
              cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,162,27,0.75)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.45)'}
          >
            &gt;
          </button>
        )}
      </div>

      {/* Card body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 24 }}>
        <h2 className="font-editorial" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: 8 }}>
          {project.name}
        </h2>
        <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.65, flex: 1 }}>
          {project.description}
        </p>
        {project.stack.length > 0 && (
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
        )}
        {(project.demoUrl || project.repoUrl) && (
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
        )}
      </div>
    </article>
  )
}

export function Attitude() {
  return (
    <div>
      <EditorialPage {...page} />

      {/* ── Projects ── */}
      <div style={{ background: 'var(--color-paper)', borderTop: '3px solid var(--color-accent)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 48px) 96px' }}>
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 20 }}>Projects</p>
          <p style={{ color: 'var(--color-body-light)', fontSize: '1.0625rem', lineHeight: 1.65, maxWidth: '60ch', marginBottom: 48 }}>
            It is with this type of curiosity and attitude to grow and develop as a person that I have and continue to operate on the following projects.
          </p>

          {/* Three projects side by side — stack to column on mobile */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'stretch', flexWrap: 'wrap' }}>
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
