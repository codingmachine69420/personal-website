import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Adapted from Watermelon UI's "expandable-profile-card" registry component
// (registry.watermelon.sh/r/expandable-profile-card.json) — same shared-
// layoutId morph from a small trigger photo into a full split-panel popup,
// reskinned off Tailwind's default/shadcn classes onto this site's tokens
// and inline-style convention. Sized down for a headshot-in-a-strip trigger
// instead of the original's big profile tile.
export function ExpandableProfileCard({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  triggerSize = 76,
  content,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const layoutId = `profile-card-${title}`
  const closeBtnRef = useRef(null)

  useEffect(() => { if (isOpen) closeBtnRef.current?.focus() }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  return (
    <>
      <motion.button
        layoutId={layoutId}
        onClick={() => setIsOpen(true)}
        aria-label={`Open profile: ${title}`}
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
        style={{
          width: triggerSize, height: triggerSize, flexShrink: 0,
          border: '2px solid var(--color-accent)', overflow: 'hidden',
          padding: 0, cursor: 'pointer', background: 'none', display: 'block',
        }}
      >
        <motion.img
          layoutId={`profile-image-${layoutId}`}
          src={imageSrc}
          alt=""
          aria-hidden="true"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 4vw, 40px)' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)' }}
            />
            <motion.div
              layoutId={layoutId}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              style={{
                position: 'relative', width: '100%', maxWidth: 760, maxHeight: '85vh',
                background: 'var(--color-ink)', border: '3px solid var(--color-accent)',
                overflow: 'hidden', zIndex: 1,
                display: 'flex', flexDirection: 'column',
              }}
              className="md:flex-row"
            >
              <button
                ref={closeBtnRef}
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 16, right: 16, zIndex: 2,
                  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.25)',
                  color: '#fff', cursor: 'pointer', fontSize: '1.1rem',
                }}
              >
                ✕
              </button>

              <motion.div
                layoutId={`profile-image-${layoutId}`}
                style={{ position: 'relative', flexShrink: 0, height: 200, overflow: 'hidden' }}
                className="md:h-auto md:w-[38%]"
              >
                <img src={imageSrc} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </motion.div>

              <div style={{ padding: 'clamp(24px, 4vw, 40px)', overflowY: 'auto', flex: 1 }}>
                <p className="label-caps" style={{ color: 'var(--color-accent)', marginBottom: 8 }}>{subtitle}</p>
                <h3 className="font-editorial" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#fff', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                  {title}
                </h3>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                >
                  {content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
