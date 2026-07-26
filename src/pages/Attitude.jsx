import { useState } from 'react'
import { EditorialPage } from '../components/EditorialPage'
import { page } from '../content/attitude'
import { projects } from '../content/projects'

const BASE = import.meta.env.BASE_URL

function ProjectCard({ project, index }) {
  const [idx, setIdx] = useState(0)
  const images = project.images ?? []
  const multi = images.length > 1

  return (
    <article style={{
      borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
      paddingTop: index === 0 ? 0 : 72,
    }}>

      {/* Full-width image carousel */}
      <div style={{ position: 'relative', background: '#0d0d0d' }}>
        <img
          src={`${BASE}${images[idx].replace(/^\//, '')}`}
          alt={`${project.name} screenshot ${idx + 1}`}
          style={{
            width: '100%',
            maxHeight: '60vh',
            objectFit: 'contain',
            display: 'block',
          }}
        />

        {/* Left arrow */}
        {multi && (
          <button
            onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            aria-label="Previous screenshot"
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 56,
              background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
              cursor: 'pointer', fontSize: '1.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,162,27,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          >
            &lt;
          </button>
        )}

        {/* Right arrow */}
        {multi && (
          <button
            onClick={() => setIdx((i) => (i + 1) % images.length)}
            aria-label="Next screenshot"
            style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 56,
              background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
              cursor: 'pointer', fontSize: '1.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,162,27,0.8)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          >
            &gt;
          </button>
        )}

        {/* Dot indicators */}
        {multi && (
          <div style={{
            position: 'absolute', bottom: 14, left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: 8,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                style={{
                  width: 8, height: 8, padding: 0, border: 'none', cursor: 'pointer',
                  background: i === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full-width text block */}
      <div style={{ paddingTop: 32, paddingBottom: 56 }}>
        <h2
          className="font-editorial"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-ink)', marginBottom: 16 }}
        >
          {project.name}
        </h2>

        <p style={{
          color: 'var(--color-body-light)',
          fontSize: '1.0625rem', lineHeight: 1.7,
          maxWidth: '72ch', marginBottom: 24,
        }}>
          {project.description}
        </p>

        {project.stack.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="label-caps"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-body-light)',
                  border: '1px solid rgba(28,28,28,0.25)',
                  padding: '4px 10px',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {(project.demoUrl || project.repoUrl) && (
          <div style={{ display: 'flex', gap: 20 }}>
            {project.demoUrl && (
              <a href={project.demoUrl} className="cta-link"
                style={{ textDecoration: 'none' }}
                target="_blank" rel="noreferrer">Live demo</a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} className="label-caps"
                style={{ color: 'var(--color-body-light)', fontSize: '0.75rem', textDecoration: 'none', paddingTop: 14 }}
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
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 48px) 96px' }}>

          <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 20 }}>Projects</p>
          <p style={{
            color: 'var(--color-body-light)', fontSize: '1.0625rem',
            lineHeight: 1.65, maxWidth: '60ch', marginBottom: 64,
          }}>
            It is with this type of curiosity and attitude to grow and develop as a person that I have and continue to operate on the following projects.
          </p>

          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
