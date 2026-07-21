import { useMemo } from 'react'
import { mulberry32 } from './random'

const WINDOW_COLORS = ['#ffcf7a', '#8fe9ff', '#ffe3b0']

// Lays out a row of neon line-art building silhouettes with softly
// twinkling windows. Purely deterministic per `seed` so the skyline doesn't
// reshuffle itself on unrelated re-renders (scroll, hover, etc).
export function Buildings({ seed, count, baseY, bandHeight, stroke, className = '' }) {
  const buildings = useMemo(() => {
    const rand = mulberry32(seed)
    const list = []
    let x = -20
    for (let i = 0; i < count; i += 1) {
      const width = 40 + rand() * 70
      const height = bandHeight * (0.25 + rand() * 0.75)
      list.push({ x, width, height, id: i })
      x += width + 6 + rand() * 18
    }
    return list
  }, [seed, count, bandHeight])

  const totalWidth = buildings.length
    ? buildings[buildings.length - 1].x + buildings[buildings.length - 1].width + 20
    : 0

  return (
    <g className={className}>
      {buildings.map((b) => {
        const y = baseY - b.height
        return (
          <g key={b.id}>
            <rect
              x={b.x}
              y={y}
              width={b.width}
              height={b.height}
              fill="rgba(6, 10, 24, 0.55)"
              stroke={stroke}
              strokeOpacity={0.55}
              strokeWidth={1.25}
            />
            <Windows x={b.x} y={y} width={b.width} height={b.height} seedBase={seed + b.id * 97} />
          </g>
        )
      })}
      <rect x={-20} y={baseY} width={totalWidth} height={2} fill={stroke} opacity={0.25} />
    </g>
  )
}

function Windows({ x, y, width, height, seedBase }) {
  const windows = useMemo(() => {
    const rand = mulberry32(seedBase)
    const cols = Math.max(1, Math.floor(width / 12))
    const rows = Math.max(1, Math.floor(height / 16))
    const items = []
    for (let c = 0; c < cols; c += 1) {
      for (let r = 0; r < rows; r += 1) {
        if (rand() > 0.6) continue // roughly 40% of windows are lit
        items.push({
          x: x + 4 + c * 12,
          y: y + 6 + r * 16,
          color: WINDOW_COLORS[Math.floor(rand() * WINDOW_COLORS.length)],
          delay: rand() * 5,
          duration: 2.5 + rand() * 3,
          min: 0.25 + rand() * 0.2,
        })
      }
    }
    return items
  }, [seedBase, x, y, width, height])

  return (
    <>
      {windows.map((w, i) => (
        <rect
          key={i}
          x={w.x}
          y={w.y}
          width={3.5}
          height={5}
          fill={w.color}
          className="animate-twinkle"
          style={{
            animationDelay: `${w.delay}s`,
            animationDuration: `${w.duration}s`,
            '--twinkle-min': w.min,
            '--twinkle-max': 1,
          }}
        />
      ))}
    </>
  )
}
