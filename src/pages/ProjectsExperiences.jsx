import { useState } from 'react'
import { projects } from '../content/projects'
import { CollageBanner } from '../components/CollageBanner'

const BASE = import.meta.env.BASE_URL

// Real gallery photos, picked and hand-positioned (not cropped blind) so the
// actual subject stays visible in a mosaic tile. "On stage pic" gets the
// biggest top-row slot — it's thematically on-topic for this page (winning
// a case competition).
const collageTop = [
  { src: '/images/gallery/On stage pic.JPEG', alt: 'Winning first place at the STRIVE Junior Tier case competition', pos: 'center 40%', grow: 1.4 },
  { src: '/images/gallery/Graduation!.jpeg', alt: 'Graduation', pos: 'center 43%', grow: 1 },
]
const collageBottom = [
  { src: '/images/gallery/Korea.jpeg', alt: 'Seoul with my mom', pos: 'center 55%', grow: 0.9 },
  { src: '/images/gallery/Formal Dinner in High School.jpeg', alt: 'Formal dinner in high school', pos: 'center 45%', grow: 1.1 },
  { src: '/images/gallery/The boys.jpeg', alt: 'The boys, school days', pos: 'center 60%', grow: 0.8 },
]

// Employers named on the resume, logo files supplied by Anson under
// public/images/logos/. Allay LLP has no logo on hand yet — add an entry
// here once one exists.
const employers = [
  { name: 'RBC', src: 'images/logos/RBC.webp' },
  { name: 'Odysseus Capital Asia', src: 'images/logos/ody.jpg' },
  { name: 'PwC', src: 'images/logos/PwC.webp' },
]

function ImageCarousel({ project }) {
  const [idx, setIdx] = useState(0)
  const images = project.images ?? []
  const multi = images.length > 1

  return (
    <div style={{ position: 'relative', background: '#0d0d0d' }}>
      <img
        src={`${BASE}${images[idx].replace(/^\//, '')}`}
        alt={`${project.name} screenshot ${idx + 1}`}
        style={{ width: '100%', maxHeight: '55vh', objectFit: 'contain', display: 'block' }}
      />
      {multi && (
        <button
          onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
          aria-label="Previous"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 48,
            background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
            cursor: 'pointer', fontSize: '1.25rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,162,27,0.8)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
        >&lt;</button>
      )}
      {multi && (
        <button
          onClick={() => setIdx((i) => (i + 1) % images.length)}
          aria-label="Next"
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 48,
            background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
            cursor: 'pointer', fontSize: '1.25rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,162,27,0.8)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
        >&gt;</button>
      )}
      {multi && (
        <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Screenshot ${i + 1}`}
              style={{ width: 8, height: 8, padding: 0, border: 'none', cursor: 'pointer',
                background: i === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)',
                transition: 'background 0.2s' }} />
          ))}
        </div>
      )}
    </div>
  )
}

function SideCarousel({ project }) {
  const [idx, setIdx] = useState(0)
  const images = project.images ?? []
  const multi = images.length > 1

  return (
    <div style={{ position: 'relative', flex: '0 0 320px', height: 'clamp(360px, 70vw, 560px)', background: '#0d0d0d' }}>
      <img
        src={`${BASE}${images[idx].replace(/^\//, '')}`}
        alt={`${project.name} screenshot ${idx + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
      {multi && (
        <button onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)} aria-label="Previous"
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, background: 'rgba(0,0,0,0.5)',
            border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,162,27,0.8)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>&lt;</button>
      )}
      {multi && (
        <button onClick={() => setIdx((i) => (i + 1) % images.length)} aria-label="Next"
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, background: 'rgba(0,0,0,0.5)',
            border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(217,162,27,0.8)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>&gt;</button>
      )}
      {multi && (
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Screenshot ${i + 1}`}
              style={{ width: 7, height: 7, padding: 0, border: 'none', cursor: 'pointer',
                background: i === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const isSide = project.layout === 'side'
  const divider = { borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)', paddingTop: index === 0 ? 0 : 72, marginBottom: 72 }

  return (
    <article style={divider}>
      {isSide ? (
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <SideCarousel project={project} />
          <div style={{ flex: 1, minWidth: 260, paddingTop: 8 }}>
            <h2 className="font-editorial" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: 16 }}>
              {project.name}
            </h2>
            {project.status && (
              <p className="label-caps" style={{ color: 'var(--color-accent)', fontSize: '0.6875rem', border: '1px solid var(--color-accent)', display: 'inline-block', padding: '4px 10px', marginBottom: 16 }}>
                {project.status}
              </p>
            )}
            <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: 24 }}>
              {project.description}
            </p>
            {project.stack.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                {project.stack.map((t) => (
                  <span key={t} className="label-caps"
                    style={{ fontSize: '0.75rem', color: 'var(--color-body-dark)', border: '1px solid rgba(255,255,255,0.12)', padding: '3px 8px' }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <ImageCarousel project={project} />
          <div style={{ paddingTop: 28 }}>
            <h2 className="font-editorial" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: 16 }}>
              {project.name}
            </h2>
            {project.status && (
              <p className="label-caps" style={{ color: 'var(--color-accent)', fontSize: '0.6875rem', border: '1px solid var(--color-accent)', display: 'inline-block', padding: '4px 10px', marginBottom: 16 }}>
                {project.status}
              </p>
            )}
            <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: '68ch', marginBottom: 24 }}>
              {project.description}
            </p>
            {project.stack.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {project.stack.map((t) => (
                  <span key={t} className="label-caps"
                    style={{ fontSize: '0.75rem', color: 'var(--color-body-dark)', border: '1px solid rgba(255,255,255,0.12)', padding: '3px 8px' }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </article>
  )
}

export function ProjectsExperiences() {
  return (
    <div>
      {/* ── Photo collage banner ── */}
      <div style={{ background: 'var(--color-ink)' }}>
        <CollageBanner title="Projects & Experiences" topPhotos={collageTop} bottomPhotos={collageBottom} />

        {/* Resume strip */}
        <div style={{
          borderTop: '3px solid var(--color-accent)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          padding: 'clamp(24px, 4vw, 40px) clamp(20px, 5vw, 48px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            {/* Headshot */}
            <div style={{ width: 76, height: 76, flexShrink: 0, border: '2px solid var(--color-accent)', overflow: 'hidden' }}>
              <img
                src={`${BASE}images/profile/headshot.jpg`}
                alt="Anson Chan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 10 }}>
                My Resume
              </p>
              <p style={{ color: '#fff', fontFamily: 'var(--font-meta)', fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', fontWeight: 600, marginBottom: 6 }}>
                Work history, education &amp; skills
              </p>
              <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9rem', fontFamily: 'var(--font-reading)', maxWidth: '44ch', marginBottom: 12 }}>
                One page covering internships, projects, and everything in between.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                {employers.map((e) => (
                  <div key={e.name} style={{ background: '#fff', height: 40, padding: '0 12px', display: 'flex', alignItems: 'center' }}>
                    <img src={`${BASE}${e.src}`} alt={e.name} style={{ height: 24, width: 'auto', objectFit: 'contain', display: 'block' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <a
            href={`${BASE}resume.pdf`}
            target="_blank"
            rel="noreferrer"
            className="resume-cta"
            style={{
              display: 'inline-block',
              background: 'var(--color-accent)',
              color: '#000',
              textDecoration: 'none',
              fontFamily: 'var(--font-meta)',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '18px 40px',
              border: '2px solid var(--color-accent)',
              whiteSpace: 'nowrap',
            }}
          >
            Open Resume →
          </a>
        </div>
      </div>

      {/* ── Projects ── */}
      <div style={{ background: 'var(--color-ink)', borderTop: '3px solid var(--color-accent)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 48px) 96px' }}>
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 48 }}>Projects</p>
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
