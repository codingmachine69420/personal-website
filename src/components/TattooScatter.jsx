// Decorative background layer for the Interests page — small tattoo-flash
// style line-art icons scattered behind the content, referencing a flash-
// sheet look. Purely decorative: absolutely positioned, pointer-events
// disabled, so it never competes with real content or hurts legibility.
// Sharp corners (miter joins, square caps, no rounding) on purpose — matches
// the site's "no border-radius anywhere" hard-edge rule instead of reading
// as a soft/rounded sticker set.

const STROKE = { stroke: 'currentColor', strokeWidth: 1.8, strokeLinejoin: 'miter', strokeLinecap: 'square' }

function BasketballIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <g {...STROKE}>
        <circle cx="24" cy="24" r="18" />
        <path d="M24 6 V42" />
        <path d="M6 24 H42" />
        <path d="M9.5 11 Q22 24 9.5 37" />
        <path d="M38.5 11 Q26 24 38.5 37" />
      </g>
    </svg>
  )
}

function RunningShoeIcon(props) {
  return (
    <svg viewBox="0 0 64 40" fill="none" {...props}>
      <g {...STROKE}>
        <path d="M4 30 C4 24 8 20 14 18 L28 10 C33 7 39 7 43 10 L54 17 C59 19 61 23 61 28 L61 32 C61 34 59 36 57 36 L8 36 C6 36 4 34 4 32 Z" />
        <path d="M14 18 L20 24 M22 15 L27 21 M30 12 L35 19 M38 10 L43 17" />
        <path d="M4 30 L61 30" />
      </g>
    </svg>
  )
}

// Two beamed eighth notes — orchestra / viola
function MusicNoteIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <g {...STROKE}>
        <circle cx="14" cy="36" r="5" />
        <circle cx="32" cy="32" r="5" />
        <path d="M19 36 V12 L37 8 V32" />
        <path d="M19 15 L37 11" />
      </g>
    </svg>
  )
}

function LaptopIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <g {...STROKE}>
        <rect x="9" y="9" width="30" height="19" />
        <path d="M3 35 H45 L40 28 H8 Z" />
      </g>
    </svg>
  )
}

// Simplified top-down airplane silhouette
function PlaneIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <path {...STROKE} d="M24 3 L27 18 L45 27 L45 31 L27 26 L26 38 L32 42 L32 45 L24 43 L16 45 L16 42 L22 38 L21 26 L3 31 L3 27 L21 18 Z" />
    </svg>
  )
}

// Sailboat — hull, mast, sail
function BoatIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <g {...STROKE}>
        <path d="M5 34 H43 L36 45 L12 45 Z" />
        <path d="M24 34 V5 L39 20 Z" />
      </g>
    </svg>
  )
}

// Two jagged summit peaks — climbing
function MountainIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <g {...STROKE}>
        <path d="M3 40 L18 14 L26 27 L32 16 L45 40 Z" />
        <path d="M13 40 L18 14 L23 40" />
      </g>
    </svg>
  )
}

// Hiking boot, side profile
function BootIcon(props) {
  return (
    <svg viewBox="0 0 48 32" fill="none" {...props}>
      <g {...STROKE}>
        <path d="M8 3 V15 L4 21 C4 25 8 27 12 27 L40 27 C43 27 44 25 44 23 C44 20 41 18 37 17 L26 15 L26 3 Z" />
        <path d="M8 7 H26 M8 11 H26" />
        <path d="M4 21 H44" />
      </g>
    </svg>
  )
}

// top/left as % of the scatter layer, size in px, rotate in deg.
// Two colors only — accent ochre and near-black ink (the site's existing
// 5-token palette, no new hex added). Opacity raised from the first pass
// per feedback ("more contrast against white") — these read as a bold
// mark now, not a faint watermark.
const PLACEMENTS = [
  { Icon: BasketballIcon,  top: '2%',  left: '8%',  size: 56, rotate: 14,  color: 'var(--color-ink)',    opacity: 0.5 },
  { Icon: PlaneIcon,       top: '4%',  left: '55%', size: 42, rotate: -18, color: 'var(--color-accent)', opacity: 0.55 },
  { Icon: MusicNoteIcon,   top: '6%',  left: '92%', size: 48, rotate: 10,  color: 'var(--color-ink)',    opacity: 0.48 },
  { Icon: BoatIcon,        top: '16%', left: '30%', size: 50, rotate: -8,  color: 'var(--color-accent)', opacity: 0.5 },
  { Icon: MountainIcon,    top: '20%', left: '82%', size: 46, rotate: 6,   color: 'var(--color-ink)',    opacity: 0.5 },
  { Icon: RunningShoeIcon, top: '28%', left: '4%',  size: 62, rotate: -10, color: 'var(--color-accent)', opacity: 0.52 },
  { Icon: LaptopIcon,      top: '34%', left: '62%', size: 44, rotate: 12,  color: 'var(--color-ink)',    opacity: 0.46 },
  { Icon: BootIcon,        top: '44%', left: '90%', size: 52, rotate: -16, color: 'var(--color-accent)', opacity: 0.5 },
  { Icon: BasketballIcon,  top: '48%', left: '20%', size: 38, rotate: -22, color: 'var(--color-accent)', opacity: 0.48 },
  { Icon: MusicNoteIcon,   top: '56%', left: '48%', size: 40, rotate: -8,  color: 'var(--color-ink)',    opacity: 0.45 },
  { Icon: MountainIcon,    top: '60%', left: '6%',  size: 44, rotate: 18,  color: 'var(--color-accent)', opacity: 0.5 },
  { Icon: PlaneIcon,       top: '64%', left: '85%', size: 36, rotate: 24,  color: 'var(--color-ink)',    opacity: 0.5 },
  { Icon: BoatIcon,        top: '72%', left: '58%', size: 40, rotate: 14,  color: 'var(--color-ink)',    opacity: 0.46 },
  { Icon: RunningShoeIcon, top: '78%', left: '14%', size: 50, rotate: 8,   color: 'var(--color-ink)',    opacity: 0.5 },
  { Icon: LaptopIcon,      top: '84%', left: '78%', size: 40, rotate: -10, color: 'var(--color-accent)', opacity: 0.52 },
  { Icon: BootIcon,        top: '90%', left: '15%', size: 46, rotate: 20,  color: 'var(--color-ink)',    opacity: 0.48 },
  { Icon: BasketballIcon,  top: '94%', left: '68%', size: 34, rotate: -14, color: 'var(--color-accent)', opacity: 0.5 },
]

export function TattooScatter() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      {PLACEMENTS.map(({ Icon, top, left, size, rotate, color, opacity }, i) => (
        <Icon
          key={i}
          width={size}
          height={size}
          style={{
            position: 'absolute',
            top, left,
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            color,
            opacity,
          }}
        />
      ))}
    </div>
  )
}
