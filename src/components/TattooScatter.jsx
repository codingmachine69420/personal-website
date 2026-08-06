// Decorative background layer for the Interests page — small tattoo-flash
// style line-art icons (flower, basketball, running shoe) scattered behind
// the content, referencing a flash-sheet look. Purely decorative: absolutely
// positioned, pointer-events disabled, low opacity so it never competes with
// real content or hurts legibility.
//
// "Running shoe" is standing in for Anson's Marathon Training interest —
// flag if you meant Viola/Orchestra or something else instead, it's a
// one-line swap.

function FlowerIcon(props) {
  const petals = [0, 60, 120, 180, 240, 300]
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {petals.map((a) => (
          <ellipse key={a} cx="24" cy="11" rx="5" ry="10" transform={`rotate(${a} 24 24)`} />
        ))}
        <circle cx="24" cy="24" r="3.5" />
      </g>
    </svg>
  )
}

function BasketballIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...props}>
      <g stroke="currentColor" strokeWidth="1.6">
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
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M4 30 C4 24 8 20 14 18 L28 10 C33 7 39 7 43 10 L54 17 C59 19 61 23 61 28 L61 32 C61 34 59 36 57 36 L8 36 C6 36 4 34 4 32 Z" />
        <path d="M14 18 L20 24 M22 15 L27 21 M30 12 L35 19 M38 10 L43 17" />
        <path d="M4 30 L61 30" />
      </g>
    </svg>
  )
}

// top/left as % of the scatter layer, size in px, rotate in deg.
// color alternates between the accent ochre and near-black ink, per
// "black and dark orange" — reusing the site's existing --color-accent
// rather than introducing a new off-palette hex (see CLAUDE.md's 5-token
// color rule). Say if you want a distinct, deeper orange instead.
const PLACEMENTS = [
  { Icon: FlowerIcon,      top: '3%',  left: '3%',  size: 58, rotate: -14, color: 'var(--color-accent)' },
  { Icon: BasketballIcon,  top: '8%',  left: '90%', size: 62, rotate: 16,  color: 'var(--color-ink)' },
  { Icon: FlowerIcon,      top: '20%', left: '85%', size: 38, rotate: 24,  color: 'var(--color-ink)' },
  { Icon: RunningShoeIcon, top: '26%', left: '5%',  size: 66, rotate: -8,  color: 'var(--color-accent)' },
  { Icon: BasketballIcon,  top: '48%', left: '92%', size: 46, rotate: -20, color: 'var(--color-accent)' },
  { Icon: RunningShoeIcon, top: '58%', left: '4%',  size: 56, rotate: 18,  color: 'var(--color-ink)' },
  { Icon: FlowerIcon,      top: '68%', left: '88%', size: 42, rotate: -26, color: 'var(--color-ink)' },
  { Icon: BasketballIcon,  top: '80%', left: '8%',  size: 36, rotate: 10,  color: 'var(--color-accent)' },
  { Icon: FlowerIcon,      top: '88%', left: '80%', size: 48, rotate: -15, color: 'var(--color-accent)' },
]

export function TattooScatter() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      {PLACEMENTS.map(({ Icon, top, left, size, rotate, color }, i) => (
        <Icon
          key={i}
          width={size}
          height={size}
          style={{
            position: 'absolute',
            top, left,
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            color,
            opacity: 0.22,
          }}
        />
      ))}
    </div>
  )
}
