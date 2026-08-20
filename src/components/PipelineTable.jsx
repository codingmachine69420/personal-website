import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CarouselNavigator } from './CarouselNavigator'

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

// `staticLabel`: on mobile there's no cursor to hover with — CursorTooltip
// would just never appear — so the row's current stage is printed as a
// permanent caption under the bar instead of waiting on a hover event that
// touch input can't produce. Desktop keeps the hover tooltip only, since a
// second always-on label there would be redundant clutter alongside it.
function StageBar({ stageCount, reachedIndex, stageLabel, staticLabel }) {
  const [hoverPos, setHoverPos] = useState(null)
  const [width, setWidth] = useState(0)
  const rafRef = useRef(null)

  return (
    <div>
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
          {/* Fills in from the left on first reveal — the bar IS the pipeline
              metaphor, so it should visibly progress rather than appear
              already-finished. scaleX (not width) keeps this transform-only. */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ gridColumn: `1 / ${reachedIndex + 2}`, background: 'var(--color-accent)', transformOrigin: 'left' }}
          />
        </div>
        <CursorTooltip pos={hoverPos} containerWidth={width}>{stageLabel}</CursorTooltip>
      </div>
      {staticLabel && (
        <p className="label-caps" style={{ color: 'var(--color-accent)', fontSize: '0.75rem', marginTop: 8 }}>
          Currently: {stageLabel}
        </p>
      )}
    </div>
  )
}

// Fullscreen enlarge on click — same backdrop/close conventions as
// Gallery's lightbox (GalleryLightbox in pages/Gallery.jsx): near-black
// scrim, ✕ button, Escape to close, body scroll locked while open. Closes
// on a click anywhere except the image itself — the stopPropagation lives
// on the image's own wrapper, not a padded content box around it, so
// "click outside the picture" is exactly what closes it, per Anson's ask.
// When the project has more than one screenshot, the same CarouselNavigator
// used in Gallery's lightbox appears below the image so you can flip
// through that project's own screenshots without closing — scoped to
// `images` (this project's array only), never spilling into another row's
// pictures. A single-image project renders no nav at all, unchanged from
// before.
function ImageLightbox({ images, index, projectName, isDemo, onNavigate, onJump, onClose }) {
  const closeBtnRef = useRef(null)
  const prevBtnRef = useRef(null)
  const nextBtnRef = useRef(null)
  const multi = images.length > 1
  const src = `${BASE}${images[index].replace(/^\//, '')}`
  const alt = `${projectName} screenshot ${index + 1}`

  useEffect(() => { closeBtnRef.current?.focus() }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape to close, arrow keys to navigate (multi-image only), Tab trapped
  // between whichever controls exist (close, plus prev/next when multi) —
  // same pattern as GalleryLightbox in pages/Gallery.jsx.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (multi) {
        if (e.key === 'ArrowLeft') { onNavigate(-1); return }
        if (e.key === 'ArrowRight') { onNavigate(1); return }
      }
      if (e.key !== 'Tab') return
      const nodes = [closeBtnRef.current, prevBtnRef.current, nextBtnRef.current].filter(Boolean)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onNavigate, multi])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.93)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 40px)',
      }}
    >
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'fixed', top: 'clamp(12px, 3vw, 28px)', right: 'clamp(12px, 3vw, 28px)',
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
          cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1,
          minWidth: 44, minHeight: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1001,
        }}
      >
        ✕
      </button>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', display: 'inline-flex', maxWidth: '90vw', maxHeight: multi ? '75vh' : '85vh' }}
      >
        <img
          src={src}
          alt={alt}
          style={{ maxHeight: multi ? '75vh' : '85vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }}
        />
        {isDemo && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', top: 10, left: 10,
              background: 'var(--color-black, #000)', color: 'var(--color-accent)',
              border: '1px solid var(--color-accent)',
              padding: '3px 8px', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-meta)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Demo — not the live site
          </div>
        )}
      </motion.div>
      {multi && (
        <div onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', bottom: 'clamp(16px, 4vw, 40px)', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <CarouselNavigator
            total={images.length}
            index={index}
            onNavigate={onNavigate}
            onJump={onJump}
            prevRef={prevBtnRef}
            nextRef={nextBtnRef}
            itemLabel="screenshot"
          />
        </div>
      )}
    </motion.div>
  )
}

// Same carousel behavior as the plain-list page had (prev/next + dot
// indicators) — just laid out to sit in the pipeline row's right-hand
// image column instead of full-width above the text. Clicking the image
// itself opens the ImageLightbox above; the thumbnail and lightbox share
// the same `idx` state, so closing the lightbox leaves the thumbnail on
// whichever screenshot you last viewed.
function Carousel({ project }) {
  const [idx, setIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const images = project.images ?? []
  const multi = images.length > 1
  const src = `${BASE}${images[idx].replace(/^\//, '')}`
  const alt = `${project.name} screenshot ${idx + 1}`

  const navigate = (dir) => setIdx((i) => (i + dir + images.length) % images.length)
  const jump = (i) => setIdx(i)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 220, background: '#0d0d0d' }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onClick={() => setLightboxOpen(true)}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', cursor: 'zoom-in' }}
      />
      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            images={images}
            index={idx}
            projectName={project.name}
            isDemo={project.imagesAreDemo}
            onNavigate={navigate}
            onJump={jump}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
      {project.imagesAreDemo && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 10, left: 10, zIndex: 4,
            background: 'var(--color-black, #000)', color: 'var(--color-accent)',
            border: '1px solid var(--color-accent)',
            padding: '3px 8px', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-meta)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Demo — not the live site
        </div>
      )}
      {multi && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1) }}
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
            onClick={(e) => { e.stopPropagation(); navigate(1) }}
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
                onClick={(e) => { e.stopPropagation(); jump(i) }}
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

function PipelineRow({ project, stages, isFirst, open, onToggle }) {
  const images = project.images ?? []
  const isIdeaStage = project.stageIndex === 0
  // Idea-stage rows read muted grey while collapsed — a visual cue that
  // nothing's been built yet. Opening the row lifts it to full brightness,
  // same as every other stage, since by then you're actually reading it.
  const nameColor = isIdeaStage && !open ? 'rgba(255,255,255,0.45)' : '#fff'
  const summaryColor = isIdeaStage && !open ? 'rgba(255,255,255,0.28)' : 'var(--color-body-dark)'

  return (
    <div style={{ borderTop: isFirst ? 'none' : '1px solid rgba(255,255,255,0.08)' }}>
      {/* ── Desktop row: icon | name+summary | stage bar, three grid columns
          side by side. The stage bar's `minmax(320px, 1fr)` column alone
          needs ~500px+ to lay out without squeezing, so this variant is
          desktop-only (className, not a breakpoint-aware inline style —
          `display: 'grid'` never lives in this element's own style object,
          so the Tailwind `hidden` class isn't fighting an inline override
          the way it would if both declared `display`). ── */}
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="hidden md:grid"
        style={{
          width: '100%',
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

      {/* ── Mobile row: name+toggle on one line, full-width stage bar below
          it with a permanent "Currently: X" caption (see StageBar's
          `staticLabel` — the desktop hover tooltip can't fire without a
          cursor, so touch gets the same information as fixed text instead
          of losing it). Rethought for the narrow context rather than the
          desktop grid scaled down, per adapt.md. ── */}
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="block md:hidden"
        style={{
          width: '100%',
          padding: 'clamp(16px, 4vw, 20px)',
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
          <span style={{ minWidth: 0 }}>
            <span style={{ display: 'block', color: nameColor, fontFamily: 'var(--font-meta)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: 4, transition: 'color 0.2s' }}>
              {project.name}
            </span>
            <span style={{ display: 'block', color: summaryColor, fontSize: '0.75rem', lineHeight: 1.4, transition: 'color 0.2s' }}>
              {project.pipelineSummary}
            </span>
          </span>
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
        </div>
        <StageBar stageCount={stages.length} reachedIndex={project.stageIndex} stageLabel={stages[project.stageIndex]} staticLabel />
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
            <div
              // Left padding aligns the text block under the row's name
              // column on desktop (icon column width + its gap) — that
              // alignment target doesn't exist on the mobile row (no icon
              // column there), so mobile just uses the same inset as the
              // row's own horizontal padding instead of inheriting an offset
              // that would eat width for no reason on a narrow screen.
              className="pl-[clamp(16px,3vw,28px)] md:pl-[calc(32px+clamp(16px,2.5vw,36px))]"
              style={{
                paddingTop: 0, paddingRight: 'clamp(16px, 3vw, 28px)', paddingBottom: 'clamp(28px, 4vw, 40px)',
                display: 'flex', gap: 'clamp(24px, 4vw, 40px)', flexWrap: 'wrap', alignItems: 'flex-start',
              }}
            >
              {/* Text — left */}
              <div style={{ flex: '1 1 320px', minWidth: 0 }}>
                {/* Desktop-only: mobile's collapsed row already states this
                    via StageBar's `staticLabel`, right above this same
                    panel — repeating it here would just be the same line
                    twice in one view. */}
                <p className="label-caps hidden md:block" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
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
                  <p style={{ color: 'var(--color-body-dark)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: project.testingCriteria ? 16 : 20 }}>
                    <strong style={{ color: '#fff' }}>{project.strategyNote.label} </strong>
                    {project.strategyNote.text}
                  </p>
                )}
                {project.testingCriteria && (
                  <div style={{ marginBottom: 20 }}>
                    <p className="label-caps" style={{ color: '#fff', fontSize: '0.8125rem', marginBottom: 10 }}>
                      {project.testingCriteria.label}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {project.testingCriteria.items.map((item) => (
                        <div key={item.criterion} style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', fontSize: '0.875rem', lineHeight: 1.5 }}>
                          <span className="label-caps" style={{ color: '#fff', fontSize: '0.75rem', flexShrink: 0 }}>{item.criterion}</span>
                          <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-meta)', fontSize: '0.75rem', flexShrink: 0 }}>{item.threshold}</span>
                          <span style={{ color: 'var(--color-body-dark)' }}>— {item.why}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
  // Rows always order by stage, furthest-along first — Live, then Testing,
  // then Developing, then Idea Generation last — per Anson's direct
  // instruction (2026-08-15). Sort here rather than relying on
  // content/projects.js's array order, since Array.prototype.sort is
  // stable: ties (same stageIndex) keep their original relative order,
  // and no one has to remember to hand-reorder the content file whenever
  // a project's stage changes.
  const sortedProjects = [...projects].sort((a, b) => b.stageIndex - a.stageIndex)

  // Only one row open at a time — per Anson's direct instruction
  // (2026-08-16). A single "which project is open" value, not a per-row
  // boolean: opening a new row implicitly closes whichever was open.
  const [openProject, setOpenProject] = useState(null)

  return (
    <div>
      {/* Header row (desktop): Program label lined up with the same 4
          stage columns every row's bar spans. Same overflow problem as the
          row itself below ~500px, so desktop-only; the per-column labels
          would also just repeat what each row already states via
          StageBar's mobile `staticLabel`. */}
      <div className="hidden md:grid" style={{
        gridTemplateColumns: '32px minmax(150px, 220px) minmax(320px, 1fr)',
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

      {/* Header row (mobile): same two facts — the column is "Program",
          the stages run left to right — as one line of running text
          instead of a 4-way grid that has no room to breathe at this
          width. */}
      <div className="block md:hidden" style={{
        padding: '0 clamp(16px, 4vw, 20px) 14px', borderBottom: '2px solid var(--color-accent)',
      }}>
        <p className="label-caps" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Program</p>
        <p className="label-caps" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', lineHeight: 1.5 }}>
          {stages.join(' → ')}
        </p>
      </div>

      {sortedProjects.map((project, i) => (
        <PipelineRow
          key={project.name}
          project={project}
          stages={stages}
          isFirst={i === 0}
          open={openProject === project.name}
          onToggle={() => setOpenProject((cur) => (cur === project.name ? null : project.name))}
        />
      ))}
    </div>
  )
}
