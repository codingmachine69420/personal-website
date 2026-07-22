// Site-wide identity, nav, and social links.
// TODO: replace every placeholder value below with your real info.
export const site = {
  name: "Anson's World",
  tagline: 'Finance & markets by day, builder by night.',
  location: 'Toronto, Canada / Hong Kong',
  email: 'you@example.com',
  social: [
    { label: 'GitHub', href: 'https://github.com/your-handle' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' },
    { label: 'Email', href: 'mailto:you@example.com' },
  ],
}

// The building-directory nav board on the landing page, and the top nav bar.
// `color` must be one of: magenta | cyan | blue | amber | jade (see index.css).
export const directory = [
  {
    id: 'work',
    label: 'Work & Experience',
    href: '/work',
    color: 'magenta',
    floor: '01',
    description: 'Finance & co-op background, resume.',
  },
  {
    id: 'writing',
    label: 'Writing & Ideas',
    href: '/writing',
    color: 'cyan',
    floor: '02',
    description: 'Market writeups, notes, and thoughts.',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    color: 'blue',
    floor: '03',
    description: 'Trading dashboards, bots, and tools.',
  },
  {
    id: 'gallery',
    label: 'Gallery',
    href: '/gallery',
    color: 'amber',
    floor: '04',
    description: 'Photos from travel and elsewhere.',
  },
  {
    id: 'interests',
    label: 'Interests',
    href: '/interests',
    color: 'jade',
    floor: '05',
    description: 'Golf, PC gaming, film, markets.',
  },
]
