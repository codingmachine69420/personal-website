import { projects } from '../content/projects'
import { CollageBanner } from '../components/CollageBanner'
import { ExpandableProfileCard } from '../components/ExpandableProfileCard'
import { PipelineTable } from '../components/PipelineTable'

// Pipeline stages, left to right — see content/projects.js for how each
// project's stageIndex was assigned.
const STAGES = ['Idea Generation', 'Developing', 'Testing', 'Live']

const BASE = import.meta.env.BASE_URL

// Real gallery photos, picked and hand-positioned (not cropped blind) so the
// actual subject stays visible in a mosaic tile. "On stage pic" gets the
// biggest top-row slot — it's thematically on-topic for this page (winning
// a case competition).
const collageTop = [
  { src: '/images/gallery/On stage pic.JPEG', alt: 'Winning first place at the STRIVE Junior Tier case competition', pos: 'center 34%', grow: 1.4 },
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
            {/* Headshot — click to expand into a full profile card with the resume + logos (see PRODUCT.md) */}
            <ExpandableProfileCard
              imageSrc={`${BASE}images/profile/headshot.jpg`}
              imageAlt="Anson Chan"
              title="Anson Chan"
              subtitle="My Resume"
              triggerSize={96}
              content={
                <>
                  <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.7, fontFamily: 'var(--font-reading)', marginBottom: 28 }}>
                    Work history, education &amp; skills — one page covering internships, projects, and everything in between.
                  </p>
                  <p className="label-caps" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>Where I've worked</p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 32 }}>
                    {employers.map((e) => (
                      <div key={e.name} style={{ background: '#fff', height: 40, padding: '0 12px', display: 'flex', alignItems: 'center' }}>
                        <img src={`${BASE}${e.src}`} alt={e.name} style={{ height: 24, width: 'auto', objectFit: 'contain', display: 'block' }} />
                      </div>
                    ))}
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
                      fontSize: '0.9375rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '16px 36px',
                      border: '2px solid var(--color-accent)',
                    }}
                  >
                    Open Resume →
                  </a>
                </>
              }
            />
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

      {/* ── Projects — pipeline view (replaces the old stacked-card list) ── */}
      <div style={{ background: 'var(--color-ink)', borderTop: '3px solid var(--color-accent)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 0 96px' }}>
          <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 8, padding: '0 clamp(16px, 3vw, 28px)' }}>Pipeline</p>
          <p style={{ color: 'var(--color-body-dark)', fontSize: '0.875rem', marginBottom: 40, padding: '0 clamp(16px, 3vw, 28px)', maxWidth: '60ch' }}>
            Where each project actually stands. Click a row to expand it.
          </p>
          <PipelineTable stages={STAGES} projects={projects} />
        </div>
      </div>
    </div>
  )
}
