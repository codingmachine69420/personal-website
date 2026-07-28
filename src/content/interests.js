// Interests — hobbies, passions, and ongoing lists.

export const cinema = {
  // Teaser shown on the /interests hub
  teaser: 'Film is one of the few art forms that gets to deploy everything at once — light, score, silence, a held glance. The best ones don\'t leave when the credits roll. I\'ve been keeping a proper watchlist.',

  // Full intro shown on the /interests/cinema page
  intro: `Film is one of the few art forms where the artist gets to use everything at once. Cinematography, score, performance, the pacing of a cut, the weight of silence. A novel gives you the words. A painting gives you the moment. Film gives you both, plus the thirty seconds before something happens where you don't realise you've already stopped breathing.

The best ones don't leave you when the credits roll — they stay in the room with you for days. Mine, in no particular order: La La Land, for everything it says about ambition and the cost of getting what you want. Interstellar, for making the universe feel personal in a way that still unsettles me. Top Gun: Maverick, for proving that craft and spectacle are not opposites — and that a sequel can be better than the original if someone actually cares about making it good.

This is the year I'm being more deliberate about the canon.`,

  // 2026 watchlist
  // poster: TMDB CDN — https://image.tmdb.org/t/p/w300/{path}
  // Leave poster: null if unknown; image hides gracefully via onError
  watchlist: [
    { title: 'Grave of Fireflies',          watched: false, rating: null,  poster: null },
    { title: 'Arrival',                     watched: true,  rating: 3.5,   poster: 'https://image.tmdb.org/t/p/w300/uam1jFBKLzFJXHOCmKoat1CRxIV.jpg' },
    { title: 'The Godfather Part II',       watched: true,  rating: 4.5,   poster: 'https://image.tmdb.org/t/p/w300/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg' },
    { title: 'The Shawshank Redemption',    watched: false, rating: null,  poster: null },
    { title: 'Grown Ups',                   watched: false, rating: null,  poster: null },
    { title: 'Fight Club',                  watched: true,  rating: 2,     poster: 'https://image.tmdb.org/t/p/w300/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg' },
    { title: 'Good Will Hunting',           watched: true,  rating: 4.8,   poster: 'https://image.tmdb.org/t/p/w300/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg' },
    { title: 'Judas and the Black Messiah', watched: true,  rating: 3.5,   poster: 'https://image.tmdb.org/t/p/w300/nnZfMAvU4e55zHGAlmriMyAHpqQ.jpg' },
    { title: 'After Sun',                   watched: false, rating: null,  poster: null },
    { title: 'Life of Pi',                  watched: false, rating: null,  poster: null },
    { title: 'The Tudors',                  watched: false, rating: null,  poster: null },
    { title: 'Heat',                        watched: true,  rating: 3.75,  poster: 'https://image.tmdb.org/t/p/w300/zRbZ3D2pRFu2V1ooOfJAr9n0L3l.jpg' },
    { title: 'Killers of the Flower Moon',  watched: false, rating: null,  poster: null },
    { title: 'Dead Poets Society',          watched: false, rating: null,  poster: null },
    { title: 'Goodfellas',                  watched: false, rating: null,  poster: null },
    { title: 'Citizen Kane',                watched: false, rating: null,  poster: null },
    { title: 'Apocalypse Now',              watched: false, rating: null,  poster: null },
    { title: 'Dunkirk',                     watched: true,  rating: 3,     poster: 'https://image.tmdb.org/t/p/w300/ebSnOniPdj3BO7kLohNKCqGRaZS.jpg' },
    { title: 'Memento',                     watched: false, rating: null,  poster: null },
    { title: 'The Prestige',               watched: false, rating: null,  poster: null },
    { title: 'Lawrence of Arabia',          watched: false, rating: null,  poster: null },
    { title: 'Forrest Gump',               watched: false, rating: null,  poster: null },
    { title: 'The Sixth Sense',             watched: false, rating: null,  poster: null },
    { title: 'Se7en',                       watched: false, rating: null,  poster: null },
    { title: 'Casino',                      watched: true,  rating: 3.2,   poster: 'https://image.tmdb.org/t/p/w300/9l5TOFM7CFzL5TFuFsIqO9nMzlR.jpg' },
    { title: 'The Odyssey',                 watched: true,  rating: 4.8,   poster: null },
    { title: 'Pulp Fiction',                watched: false, rating: null,  poster: null },
    { title: 'Argo',                        watched: true,  rating: null,  poster: 'https://image.tmdb.org/t/p/w300/aTt56GsyClhANxTZR8uqXurVUg.jpg' },
  ],
}
