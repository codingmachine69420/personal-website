export const posts = [
  {
    slug: 'on-impeccable',
    title: 'On Impeccable',
    date: '2026-07-22',
    tags: ['notes'],
    excerpt:
      'What it actually is, when it helps, and why you should build the thing first before installing it.',
    body: [
      'No — we\'re not using it. Everything in that prompt I wrote by hand: the colors, the fonts, the sizes, the rules about frames and panels. Nothing came from Impeccable.',
      'What it actually is, plainly. It\'s not a website you browse for designs. There\'s nothing to look at there. It\'s a set of written instructions that sits in your project folder, and Claude Code reads them before it does design work. Think of it as hiring a picky art director who reviews everything Claude Code makes. The art director doesn\'t hand you designs — they tell your builder "that heading\'s too small, those two things don\'t line up, that grey text is unreadable."',
      'So the answer to "are there similar designs on there" is no. It has no designs. Your NatGeo screenshot is your reference — that part\'s already handled.',
      'Where it would actually help you. Two places.',
      'The first is memory. You changed direction once already — neon, then editorial. If you come back in three weeks and ask Claude Code to add a page, it won\'t remember any of this. Impeccable writes your direction into a file that gets read every single time. The decisions stick.',
      'The second is the gaps. My prompt covers the big visual moves — the frames, the panels, the headings. It doesn\'t cover the hundred small things: spacing between paragraphs, what a link looks like when you hover it, how a button looks when it\'s disabled. Claude Code will fill those in with its defaults, and its defaults are where sites start looking generic. That\'s the exact stuff Impeccable is built to catch.',
      'My honest suggestion on timing: don\'t install it yet. You\'ve got a lot in the air — first deploy, first git workflow, a big redesign prompt. Build the thing first with the prompt as written. Get it on screen.',
      'Then install Impeccable and run /impeccable audit on what you built. It\'ll tell you what looks off without changing anything. That\'s a much better moment for it — you\'ll have something real to critique, and you\'ll be able to judge whether its advice actually improves your site or just makes it blander.',
      'Go build it. Come back when it\'s on screen and we\'ll look at what it got wrong.',
    ],
  },
]
