import { Buildings } from './Buildings'

const BASE_Y = 380

// Stylized neon line-art skyline across Victoria Harbour: ICC (Kowloon
// side, tapered top) and IFC (Hong Kong Island side, spired top) as the two
// landmark towers, with a scattered mid-rise skyline filling in around them.
export function HongKongSkyline({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 400"
      className={className}
      role="img"
      aria-label="Animated neon line-art illustration of the Hong Kong skyline across Victoria Harbour at night"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <filter id="hk-tube-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <Buildings seed={11} count={16} baseY={BASE_Y} bandHeight={140} stroke="#4d7dff" />
      <Buildings seed={42} count={10} baseY={BASE_Y} bandHeight={220} stroke="#2de3ff" />

      {/* ICC — tapered rectangular tower, Kowloon side. Kept off to one
          side (not dead center) so it never crosses the hero headline. */}
      <g filter="url(#hk-tube-glow)">
        <polygon
          points="150,150 210,150 225,100 200,80 160,80 135,100"
          fill="rgba(6,10,24,0.6)"
          stroke="#ff2ec4"
          strokeWidth={1.5}
        />
        <rect x={150} y={150} width={60} height={230} fill="rgba(6,10,24,0.6)" stroke="#ff2ec4" strokeWidth={1.5} />
        <circle cx={180} cy={80} r={3} fill="#ff2ec4" className="animate-twinkle" style={{ animationDuration: '2.2s' }} />
      </g>

      {/* IFC — spired tower, Hong Kong Island side. */}
      <g filter="url(#hk-tube-glow)">
        <polygon points="990,120 1020,70 1050,120" fill="rgba(6,10,24,0.6)" stroke="#2de3ff" strokeWidth={1.5} />
        <rect x={990} y={120} width={60} height={260} fill="rgba(6,10,24,0.6)" stroke="#2de3ff" strokeWidth={1.5} />
        <circle cx={1020} cy={70} r={3} fill="#2de3ff" className="animate-twinkle" style={{ animationDuration: '1.8s' }} />
      </g>

      <Buildings seed={7} count={14} baseY={BASE_Y} bandHeight={110} stroke="#ffb037" />
    </svg>
  )
}
