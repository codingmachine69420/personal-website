import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { directory } from '../content/site'

export function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'var(--color-black, #000)', height: 60 }}
      className="sticky top-0 z-50 flex items-center"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-6"
      >
        {/* Wordmark — Cormorant Garamond, masthead style */}
        <NavLink
          to="/"
          style={{
            fontFamily: 'var(--font-wordmark)',
            fontSize: 17,
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#fff',
            textDecoration: 'none',
            lineHeight: 1,
          }}
        >
          Anson Chan
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center" style={{ gap: 32 }}>
          {directory.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  [
                    'label-caps text-white transition-opacity hover:opacity-70 relative pb-2',
                    isActive ? 'nav-active' : '',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px]"
          style={{ minWidth: 44, minHeight: 44, padding: '0 10px' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="block h-[2px] w-6 bg-white transition-transform duration-200"
            style={{ transform: open ? 'translateY(7px) rotate(45deg)' : '' }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-opacity duration-200"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-transform duration-200"
            style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : '' }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-[60px] left-0 w-full md:hidden"
          style={{ background: 'var(--color-black, #000)' }}
        >
          <ul className="flex flex-col px-6 py-4" style={{ gap: 24 }}>
            {directory.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  className="label-caps text-white block"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.header>
  )
}
