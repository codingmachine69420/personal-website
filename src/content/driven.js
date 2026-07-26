// Content for the Driven page.
// Add blocks below — paste text to Claude Code and it will fill them in.
//
// Block types:
//   { type: 'text',    content: 'Your paragraph.' }
//   { type: 'heading', content: 'A section title' }
//   { type: 'image',   src: '/images/gallery/example.jpg', alt: 'Description', caption: 'Optional' }
//   { type: 'link',    href: 'https://...', label: 'Link title', description: 'What it is.' }

export const page = {
  title: 'DRIVEN',
  label: '01 — DRIVEN',
  photos: [
    { src: 'images/gallery/hiking-hong-kong.jpeg',     alt: 'Hiking in Hong Kong — arms raised over a green coastal bay' },
    { src: 'images/gallery/Graduation!.jpeg',           alt: 'Graduation day' },
    { src: 'images/gallery/toronto-island-ducks.jpeg', alt: 'Mallard ducks on Toronto Island — CN Tower in the background' },
  ],
  blocks: [
    { type: 'heading', content: 'What drives me in life?' },
    { type: 'text', content: 'The will to improve. We all start life as a blank page.' },
    { type: 'text', content: 'I have no regrets in life, because I am driven to use each failure and mold it into something greater.' },
  ],
}
