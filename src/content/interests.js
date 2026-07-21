// Interests — the personal side. This same list drives both the neon
// "signs" on the landing page hero and the detail sections on /interests.
// `color` must be one of: magenta | cyan | blue | amber | jade (see index.css).
// `buzz: true` gives a sign an occasional imperfect flicker instead of a
// steady glow — the design calls for only one or two signs to do this.
export const interests = [
  {
    id: 'golf',
    label: 'GOLF',
    color: 'jade',
    buzz: false,
    blurb:
      'TODO: a few sentences about your relationship with golf — how long, ' +
      'favourite courses, handicap, whatever you want people to know.',
  },
  {
    id: 'gaming',
    label: 'PC GAMING',
    color: 'cyan',
    buzz: true,
    blurb:
      'TODO: what you play, your setup/rig, competitive or casual, etc.',
  },
  {
    id: 'film',
    label: 'FILM',
    color: 'magenta',
    buzz: false,
    blurb: 'TODO: favourite films/directors, letterboxd link, etc.',
  },
  {
    id: 'markets',
    label: 'MARKETS',
    color: 'amber',
    buzz: false,
    blurb:
      'TODO: what draws you to markets outside of work — a strategy, a ' +
      'thesis you like, a book that shaped how you think about it.',
  },
]
