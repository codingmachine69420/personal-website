// Interests — hobbies, passions, and ongoing lists.

// 2026-08-30: Research Papers promoted from this hub's second article to
// its own main page — see content/papers.js and pages/ResearchPapers.jsx,
// now routed at /papers and listed in content/site.js's directory. Cinema
// is the only article left here (001).
//
// 2026-08-29: retired the original "Papers I've Read" framing (title +
// scope footnote) per Anson's direct instruction — backlogged in
// PRODUCT.md, not deleted as an idea. The two original entries (Mesfin
// 2026, Novy-Marx & Velikov 2016) and their cover images were removed at
// the same time — the source PDFs still live in the repo's top-level
// "Research Papers" folder if ever needed again.

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
