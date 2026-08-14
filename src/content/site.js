// Site-wide identity, nav, and social links.
// TODO: replace every placeholder value below with your real info.
export const site = {
  name: 'Discovering Anson',
  tagline: 'Building the best version of myself.',
  location: 'Toronto, Canada / Hong Kong',
  email: 'ansonpy.chan@mail.utoronto.ca',
  social: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/anson-chan-67b155291/' },
    { label: 'Email', href: 'mailto:ansonpy.chan@mail.utoronto.ca' },
  ],
}

// Order: Projects & Experiences, Interests, Mindset, Photo Gallery
// (per Anson's direct instruction, 2026-08-14 — was Mindset-first).
export const directory = [
  {
    id: 'projects',
    label: 'Projects & Experiences',
    href: '/projects',
    color: 'amber',
    floor: '01',
    description: 'Always Building.',
  },
  {
    id: 'interests',
    label: 'Interests',
    href: '/interests',
    color: 'rose',
    floor: '02',
    description: 'Is he fun?',
  },
  {
    id: 'mindset',
    label: 'Mindset',
    href: '/mindset',
    color: 'cyan',
    floor: '03',
    description: 'How I think\n\nThe values and philosophy that shape who I am.',
  },
  {
    id: 'gallery',
    label: 'Photo Gallery',
    href: '/gallery',
    color: 'jade',
    floor: '04',
    description: 'Photos from travel and life.',
  },
]
