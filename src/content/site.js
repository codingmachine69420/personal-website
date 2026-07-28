// Site-wide identity, nav, and social links.
// TODO: replace every placeholder value below with your real info.
export const site = {
  name: "Anson's World",
  tagline: 'Finance & markets by day, builder by night.',
  location: 'Toronto, Canada / Hong Kong',
  email: 'ansonpy.chan@mail.utoronto.ca',
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/anson-chan-67b155291/' },
    { label: 'Email', href: 'mailto:ansonpy.chan@mail.utoronto.ca' },
  ],
}

// Primary nav — three identity pages that absorb all content sections.
// Driven = Work & Experience. Curious = Writing + Gallery. Attitude = Projects.
export const directory = [
  {
    id: 'driven',
    label: 'Driven',
    href: '/driven',
    color: 'magenta',
    floor: '01',
    description: 'What pushes me forward — work, experience, and record.',
  },
  {
    id: 'curious',
    label: 'Curious',
    href: '/curious',
    color: 'cyan',
    floor: '02',
    description: 'What I explore — thoughts and ideas.',
  },
  {
    id: 'attitude',
    label: 'Attitude',
    href: '/attitude',
    color: 'amber',
    floor: '03',
    description: 'How I carry myself — philosophy and projects.',
  },
  {
    id: 'interests',
    label: 'Interests',
    href: '/interests',
    color: 'rose',
    floor: '04',
    description: 'Things I keep coming back to.',
  },
  {
    id: 'gallery',
    label: 'Photo Gallery',
    href: '/gallery',
    color: 'jade',
    floor: '05',
    description: 'Photos from travel and life.',
  },
]
