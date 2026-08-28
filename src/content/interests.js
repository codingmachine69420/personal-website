// Interests — hobbies, passions, and ongoing lists.

// Research papers — reading them as a way to improve my personal skills.
// Each: { title, link, why, cover }.
//   - link: URL to the paper (arXiv, journal, PDF, etc.) — or a local path
//     under /public if the paper has no canonical external URL yet;
//     ResearchPapers.jsx tells the two apart and prefixes local paths
//     with BASE_URL automatically.
//   - cover: path under /public/images/papers/ if a cover image exists
//     (extracted from the PDF's first page) — leave null otherwise, same
//     convention as cinema's poster: null.
//
// 2026-08-29: retired the original "Papers I've Read" framing (title +
// scope footnote) per Anson's direct instruction — backlogged in
// PRODUCT.md, not deleted as an idea. Section is now "Research Papers"
// on the Interests hub, second article (numbered 002; Cinema is 001).
// The two original entries (Mesfin 2026, Novy-Marx & Velikov 2016) and
// their cover images were removed at the same time — the source PDFs
// still live in the repo's top-level "Research Papers" folder if ever
// needed again.
export const papers = {
  teaser: `Reading research papers as a way to improve my personal skills.`,
  list: [
    {
      title: 'Timing the Market: A Skewed Perspective',
      // Local PDF (no canonical external URL) — see /public/images/papers.
      link: '/images/papers/Timing the Market -  A Skewed Perspective.pdf',
      // Claude-drafted "why", not Anson's own words — flagged per
      // CLAUDE.md content rules, same treatment as Compersion and Solace
      // and the P&L Tracker in content/projects.js. Anson should rewrite
      // this in his own voice.
      why: "I want to understand how return skewness changes the case for trying to time the market at all — not just whether timing works, but what it costs when it doesn't.",
      cover: null,
    },
  ],
}

export const cinema = {
  // Teaser shown on the /interests hub
  teaser: `I believe movies are a way for modern day artists to express their artform — combining storytelling and visually stunning screens. I think more after a movie than I ever do normally. I gain a sense of motivation or a sudden urge to be great after a movie, a sense of sadness and regret, or a wave of reminiscence. Movies are a very important part of my life. My top 3 of all time, in no particular order: Top Gun, La La Land, Interstellar.`,

  // 2026 watchlist
  // poster: verified TMDB URL — leave null for ones fetched live via VITE_TMDB_TOKEN
  watchlist: [
    { title: 'Grave of Fireflies',          watched: false, rating: null,  poster: null },
    { title: 'Arrival',                     watched: true,  rating: 3.5,   poster: null },
    { title: 'The Godfather Part II',       watched: true,  rating: 4.5,   poster: 'https://image.tmdb.org/t/p/w300/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg' },
    { title: 'The Godfather',               watched: true,  rating: 4.65,  poster: null },
    { title: 'The Shawshank Redemption',    watched: false, rating: null,  poster: null },
    { title: 'Grown Ups',                   watched: false, rating: null,  poster: null },
    { title: 'Fight Club',                  watched: true,  rating: 2,     poster: 'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg' },
    { title: 'Good Will Hunting',           watched: true,  rating: 4.8,   poster: 'https://image.tmdb.org/t/p/w300/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg' },
    { title: 'Judas and the Black Messiah', watched: true,  rating: 3.5,   poster: null },
    { title: 'After Sun',                   watched: false, rating: null,  poster: null },
    { title: 'Life of Pi',                  watched: false, rating: null,  poster: null },
    { title: 'The Tudors',                  watched: false, rating: null,  poster: null },
    { title: 'Heat',                        watched: true,  rating: 3.75,  poster: null },
    { title: 'Killers of the Flower Moon',  watched: false, rating: null,  poster: null },
    { title: 'Dead Poets Society',          watched: false, rating: null,  poster: null },
    { title: 'Goodfellas',                  watched: false, rating: null,  poster: null },
    { title: 'Citizen Kane',                watched: false, rating: null,  poster: null },
    { title: 'Apocalypse Now',              watched: false, rating: null,  poster: null },
    { title: 'Dunkirk',                     watched: true,  rating: 3,     poster: null },
    { title: 'Memento',                     watched: false, rating: null,  poster: null },
    { title: 'The Prestige',                watched: false, rating: null,  poster: null },
    { title: 'Lawrence of Arabia',          watched: false, rating: null,  poster: null },
    { title: 'Forrest Gump',               watched: false, rating: null,  poster: null },
    { title: 'The Sixth Sense',             watched: false, rating: null,  poster: null },
    { title: 'Se7en',                       watched: false, rating: null,  poster: null },
    { title: 'Casino',                      watched: true,  rating: 3.2,   poster: null },
    { title: 'The Odyssey',                 watched: true,  rating: 4.8,   poster: null },
    { title: 'Pulp Fiction',                watched: false, rating: null,  poster: null },
    { title: 'Argo',                        watched: true,  rating: 3.65,  poster: null },
    { title: 'The Backrooms',               watched: true,  rating: 3,     poster: null },
    { title: "If I Had Legs I'd Kick You",  watched: true,  rating: 3.8,   poster: null },
  ],
}
