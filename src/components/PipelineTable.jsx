import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

// Bespoke "development pipeline" table (biotech-style: rows = programs,
// columns = stages, a bar shows how far each program has progressed, "+"
// expands row detail). Checked both Watermelon UI's and Motion Primitives'
// registries first — neither ships this shape, nor a cursor-following
// tooltip (Watermelon's tooltip-* components all anchor to their trigger
// element via Radix positioning, not the live pointer position). Built from
// the pieces that exist: Watermelon's collapsible/expand-details pattern
// for the "+" row expand, reskinned onto this site's tokens. The stage bar
// and its cursor-tracking tooltip are hand-built — no pulled progress
// component spans an arbitrary subset of external category columns, and
// no pulled tooltip tracks the raw cursor instead of its trigger.

// Small floating label that tracks the mouse within its own container.
// Clamped so it can't run past the container's left/right edges.
function CursorTooltip({ pos, containerWidth, children }) {
  if (!pos) return null
  const clampedX = Math.max(28, Math.min(containerWidth - 28, pos.x))
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', left: clampedX, top: pos.y - 38,
        transform: 'translateX(-50%)', zIndex: 5, pointerEvents: 'none',
        background: 'var(--color-black, #000)', color: '#fff', border: '1px solid var(--color-accent)',
        padding: '5px 10px', whiteSpace: 'nowrap',
        fontFamily: 'var(--font-meta)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em',
      }}
    >
      {children}
    </div>
  )
}

function StageBar({ stageCount, reachedIndex, stageLabel }) {
  const [hoverPos, setHoverPos] = useState(null)
  const [width, setWidth] = useState(0)
  const rafRef = useRef(null)

  return (
    <div
      style={{ position: 'relative', height: 32 }}
      onMouseMove={(e) => {
        // Throttle to one position update per paint instead of per raw
        // mousemove event — same visible cursor-tracking, fewer re-renders.
        if (rafRef.current) return
        const { clientX, clientY, currentTarget } = e
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null
          const rect = currentTarget.getBoundingClientRect()
          setWidth(rect.width)
          setHoverPos({ x: clientX - rect.left, y: clientY - rect.top })
        })
      }}
      onMouseLeave={() => setHoverPos(null)}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: `repeat(${stageCount}, 1fr)`, gap: 3 }} aria-hidden="true">
        {Array.from({ length: stageCount }).map((_, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.06)' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: `repeat(${stageCount}, 1fr)`, gap: 3 }}>
        <div style={{ gridColumn: `1 / ${reachedIndex + 2}`, background: 'var(--color-accent)' }} />
      </div>
      <CursorTooltip pos={hoverPos} containerWidth={width}>{stageLabel}</CursorTooltip>
    </div>
  )
}

// Same carousel behavior as the plain-list page had (prev/next + dot
// indicators) — just laid out to sit in the pipeline row's right-hand
// image column instead of full-width above the text.
function Carousel({ project }) {
  const [idx, setIdx] = useState(0)
  const images = project.images ?? []
  const multi = images.length > 1

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 220, background: '#0d0d0d' }}>
      <img
        src={`${BASE}${images[idx].replace(/^\//, '')}`}
        alt={`${project.name} screenshot ${idx + 1}`}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
      {multi && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length) }}
            aria-label="Previous screenshot"
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 40,
              background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
              cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(217,162,27,0.8)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)' }}
          >&lt;</button>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length) }}
            aria-label="Next screenshot"
            style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 40,
              background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
              cursor: 'pointer', fontSize: '1.1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(217,162,27,0.8)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)' }}
          >&gt;</button>
          <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                aria-label={`Screenshot ${i + 1}`}
                style={{
                  width: 7, height: 7, padding: 0, border: 'none', cursor: 'pointer',
                  background: i === idx ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function PipelineRow({ project, stages, isFirst }) {
  const [open, setOpen] = useState(false)
  const images = project.images ?? []
  const isIdeaStage = project.stageIndex === 0
  // Idea-stage rows read muted grey while collapsed — a visual cue that
  // nothing's been built yet. Opening the row lifts it to full brightness,
  // same as every other stage, since by then you're actually reading it.
  const nameColor = isIdeaStage && !open ? 'rgba(255,255,255,0.45)' : '#fff'
  const summaryColor = isIdeaStage && !open ? 'rgba(255,255,255,0.28)' : 'var(--color-body-dark)'

  return (
    <div style={{ borderTop: isFirst ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          display: 'grid', width: '100%',
          gridTemplateColumns: '32px minmax(150px, 220px) minmax(320px, 1fr)',
          gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center',
          padding: 'clamp(18px, 2.5vw, 24px) clamp(16px, 3vw, 28px)',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 28, height: 28, flexShrink: 0,
            background: 'var(--color-accent)', color: 'var(--color-black, #000)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '1.05rem', lineHeight: 1,
          }}
        >
          {open ? '−' : '+'}
        </span>
        <span>
          <span style={{ display: 'block', color: nameColor, fontFamily: 'var(--font-meta)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: 4, transition: 'color 0.2s' }}>
            {project.name}
          </span>
          <span style={{ display: 'block', color: summaryColor, fontSize: '0.75rem', lineHeight: 1.4, transition: 'color 0.2s' }}>
            {project.pipelineSummary}
          </span>
        </span>
        <StageBar stageCount={stages.length} reachedIndex={project.stageIndex} stageLabel={stages[project.stageIndex]} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 clamp(16px, 3vw, 28px) clamp(28px, 4vw, 40px) calc(32px + clamp(16px, 2.5vw, 36px))',
              display: 'flex', gap: 'clamp(24px, 4vw, 40px)', flexWrap: 'wrap', alignItems: 'flex-start',
            }}>
              {/* Text — left */}
              <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                <p className="label-caps" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
                  Currently: {stages[project.stageIndex]}
                </p>
                {project.status && (
                  <p className="label-caps" style={{ color: 'var(--color-accent)', fontSize: '0.75rem', border: '1px solid var(--color-accent)', display: 'inline-block', padding: '4px 10px', marginBottom: 16 }}>
                    {project.status}
                  </p>
                )}
                <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: project.strategyNote ? 16 : 20 }}>
                  {project.description}
                </p>
                {project.strategyNote && (
                  <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: 20 }}>
                    <strong style={{ color: '#fff' }}>{project.strategyNote.label} </strong>
                    {project.strategyNote.text}
                  </p>
                )}
                {project.stack.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'detailsPdf' in project ? 20 : 0 }}>
                    {project.stack.map((t) => (
                      <span key={t} className="label-caps" style={{ fontSize: '0.75rem', color: 'var(--color-body-dark)', border: '1px solid rgba(255,255,255,0.12)', padding: '3px 8px' }}>{t}</span>
                    ))}
                  </div>
                )}
                {'detailsPdf' in project && (
                  project.detailsPdf ? (
                    <a
                      href={project.detailsPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="label-caps"
                      style={{ display: 'inline-block', color: 'var(--color-black, #000)', background: 'var(--color-accent)', padding: '10px 20px', textDecoration: 'none' }}
                    >
                      For more details, click here →
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="label-caps"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 20px', cursor: 'not-allowed' }}
                    >
                      For more details, click here <span style={{ fontSize: '0.75rem' }}>(coming soon)</span>
                    </span>
                  )
                )}
              </div>

              {/* Screenshot(s) — right */}
              {images.length > 0 && (
                <div style={{ flex: '1 1 280px', maxWidth: 420, minWidth: 220 }}>
                  <Carousel project={project} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PipelineTable({ stages, projects }) {
  return (
    <div>
      {/* Header row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '32px minmax(150px, 220px) minmax(320px, 1fr)',
        gap: 'clamp(16px, 2.5vw, 36px)', alignItems: 'center',
        padding: '0 clamp(16px, 3vw, 28px) 16px', borderBottom: '2px solid var(--color-accent)',
      }}>
        <div />
        <p className="label-caps" style={{ color: 'rgba(255,255,255,0.5)' }}>Program</p>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stages.length}, 1fr)`, gap: 3 }}>
          {stages.map((s) => (
            <p key={s} className="label-caps" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontSize: '0.75rem' }}>
              {s}
            </p>
          ))}
        </div>
      </div>

      {projects.map((project, i) => (
        <PipelineRow key={project.name} project={project} stages={stages} isFirst={i === 0} />
      ))}
    </div>
  )
}
