import { Buildings } from './Buildings'

const BASE_Y = 380

// Stylized neon line-art skyline built around the CN Tower: a thin shaft,
// a widened observation-pod band, then a narrower mast up to the antenna
// tip, with a slow blinking aircraft-warning light — surrounded by a
// scattered mid-rise skyline.
export function TorontoSkyline({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      className={className}
      role="img"
      aria-label="Animated neon line-art illustration of the Toronto skyline with the CN Tower at night"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <filter id="to-tube-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <Buildings seed={23} count={16} baseY={BASE_Y} bandHeight={130} stroke="#4d7dff" />
      <Buildings seed={58} count={11} baseY={BASE_Y} bandHeight={190} stroke="#33ffb0" />

      {/* CN Tower — made larger and shifted left so it reads clearly */}
      <g filter="url(#to-tube-glow)" stroke="#4d7dff" strokeWidth={2} fill="rgba(6,10,24,0.6)">
        <rect x={920} y={60} width={32} height={320} />
        <ellipse cx={936} cy={80} rx={50} ry={22} />
        <rect x={930} y={10} width={12} height={55} />
        <circle cx={936} cy={6} r={4} fill="#4d7dff" className="animate-twinkle" style={{ animationDuration: '2.6s' }} />
      </g>

      <Buildings seed={91} count={14} baseY={BASE_Y} bandHeight={100} stroke="#ffb037" />
    </svg>
  )
}
