import { NavLink } from 'react-router-dom'
import { site, directory } from '../content/site'

const activeGlow = {
  magenta: 'text-neon-magenta',
  cyan: 'text-neon-cyan',
  blue: 'text-neon-blue',
  amber: 'text-neon-amber',
  jade: 'text-neon-jade',
}

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night-950/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6"
      >
        <NavLink to="/" className="neon-cyan font-display text-sm tracking-wide sm:text-base">
          {site.name}
        </NavLink>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          {directory.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `rounded px-1 py-0.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
                    isActive ? activeGlow[item.color] : 'text-slate-300'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
