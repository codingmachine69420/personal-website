// width/height are each photo's real pixel dimensions, used to reserve
// aspect-ratio space in the masonry grid so images don't jump as they load.
//
// Captions/alt below were resynced 2026-08-16 after Anson renamed every file
// in public/images/gallery/ to be used as the caption — `caption`/`alt` now
// equal the new filename verbatim (minus extension), matching this site's
// existing convention. See his typo/placement flags relayed alongside this
// change (in the PR/commit description, not here) rather than silently
// "fixed" in this file.
export const photosByYear = [
  {
    year: 2019,
    photos: [
      { src: '/images/gallery/Middle School In Hong Kong (~2019).jpeg', alt: 'Middle School In Hong Kong (~2019)', caption: 'Middle School In Hong Kong (~2019)', width: 1080, height: 793 },
    ],
  },
  {
    year: 2020,
    photos: [
      { src: '/images/gallery/The boys.jpeg', alt: 'The boys', caption: 'The boys', width: 970, height: 739 },
      { src: '/images/gallery/Back in Hong Kong at my old school.jpeg', alt: 'Back in Hong Kong at my old school', caption: 'Back in Hong Kong at my old school', width: 900, height: 1600 },
      { src: '/images/gallery/Tiananmen Square in Beijing, China.jpeg', alt: 'Tiananmen Square in Beijing, China', caption: 'Tiananmen Square in Beijing, China', width: 900, height: 1600 },
    ],
  },
  {
    year: 2021,
    photos: [
      { src: '/images/gallery/High School in Victoria, BC.jpeg', alt: 'High School in Victoria, BC', caption: 'High School in Victoria, BC', width: 750, height: 500 },
      { src: '/images/gallery/Beautiful hike in Victoria, BC.jpeg', alt: 'Beautiful hike in Victoria, BC', caption: 'Beautiful hike in Victoria, BC', width: 1600, height: 1200 },
      { src: '/images/gallery/Hike during our Senior Skip day back in high school in Victoria.jpeg', alt: 'Hike during our Senior Skip day back in high school in Victoria', caption: 'Hike during our Senior Skip day back in high school in Victoria', width: 1600, height: 1200 },
    ],
  },
  {
    year: 2022,
    photos: [
      { src: '/images/gallery/Formal Dinner in High School.jpeg', alt: 'Formal Dinner in High School', caption: 'Formal Dinner in High School', width: 1600, height: 1200 },
    ],
  },
  {
    year: 2023,
    photos: [
      { src: '/images/gallery/Graduation!.jpeg', alt: 'Graduation!', caption: 'Graduation!', width: 1200, height: 1600 },
      { src: '/images/gallery/Joining my friends in their high school graduation dinner in Hong Kong.jpeg', alt: 'Joining my friends in their high school graduation dinner in Hong Kong', caption: 'Joining my friends in their high school graduation dinner in Hong Kong', width: 1600, height: 1600 },
      { src: '/images/gallery/Tokyo, Japan with Parents.jpeg', alt: 'Tokyo, Japan with Parents', caption: 'Tokyo, Japan with Parents', width: 1200, height: 1600 },
      { src: '/images/gallery/Backstreet in Nara , Japan.jpeg', alt: 'Backstreet in Nara , Japan', caption: 'Backstreet in Nara , Japan', width: 1200, height: 1600 },
      { src: '/images/gallery/First trip to Enagland!.jpeg', alt: 'First trip to Enagland!', caption: 'First trip to Enagland!', width: 1600, height: 1200 },
      { src: '/images/gallery/Emirates Stadium in London - the best club in the world.jpeg', alt: 'Emirates Stadium in London - the best club in the world', caption: 'Emirates Stadium in London - the best club in the world', width: 1600, height: 1200 },
      { src: '/images/gallery/Santiago Bernabeu.jpeg', alt: 'Santiago Bernabeu', caption: 'Santiago Bernabeu', width: 1200, height: 1600 },
    ],
  },
  {
    year: 2024,
    photos: [
      { src: '/images/gallery/Family Trip in Korea.jpeg', alt: 'Family Trip in Korea', caption: 'Family Trip in Korea', width: 1200, height: 1600 },
      { src: '/images/gallery/Vietnam with a friend we met.jpeg', alt: 'Vietnam with a friend we met', caption: 'Vietnam with a friend we met', width: 1600, height: 1200 },
      { src: '/images/gallery/A Second time around in London.jpeg', alt: 'A Second time around in London', caption: 'A Second time around in London', width: 1200, height: 1599 },
      { src: '/images/gallery/Prague during Christmas.jpeg', alt: 'Prague during Christmas', caption: 'Prague during Christmas', width: 1108, height: 1600 },
      { src: '/images/gallery/Quick Trip to Vancouver (UBC) in the Autumn.jpeg', alt: 'Quick Trip to Vancouver (UBC) in the Autumn', caption: 'Quick Trip to Vancouver (UBC) in the Autumn', width: 1200, height: 1600 },
      { src: '/images/gallery/Toronto Island!.jpeg', alt: 'Toronto Island!', caption: 'Toronto Island!', width: 1200, height: 1600 },
      // Not renamed by Anson (still its old kebab-case filename) — left on
      // its existing hand-set caption rather than reverting to the raw
      // "toronto-island-ducks" slug. Flagged separately for him to confirm.
      { src: '/images/gallery/toronto-island-ducks.jpeg', alt: 'Mallard ducks on Toronto Island — CN Tower in the background', caption: 'Toronto Island', width: 1500, height: 2000 },
      { src: '/images/gallery/My First Case Competition.JPEG', alt: 'My First Case Competition', caption: 'My First Case Competition', width: 2320, height: 1537 },
    ],
  },
  {
    year: 2026,
    photos: [
      { src: '/images/gallery/Atop of a mountain right next to the Acropolis in Athens, Greece.jpeg', alt: 'Atop of a mountain right next to the Acropolis in Athens, Greece', caption: 'Atop of a mountain right next to the Acropolis in Athens, Greece', width: 1200, height: 1600 },
      { src: '/images/gallery/Parthenon in Athens.jpeg', alt: 'Parthenon in Athens', caption: 'Parthenon in Athens', width: 900, height: 1600 },
      { src: '/images/gallery/in Santorini.jpeg', alt: 'in Santorini', caption: 'in Santorini', width: 1200, height: 1600 },
      { src: '/images/gallery/Spain 2026 Summer.jpeg', alt: 'Spain 2026 Summer', caption: 'Spain 2026 Summer', width: 1200, height: 1600 },
      { src: '/images/gallery/In the Streets in Santorini.jpeg', alt: 'In the Streets in Santorini', caption: 'In the Streets in Santorini', width: 1500, height: 2000 },
      { src: '/images/gallery/Dusk in Hong Kong.jpeg', alt: 'Dusk in Hong Kong', caption: 'Dusk in Hong Kong', width: 1500, height: 2000 },
      { src: '/images/gallery/This is just a cool picture I took in Madrid.jpeg', alt: 'This is just a cool picture I took in Madrid', caption: 'This is just a cool picture I took in Madrid', width: 1500, height: 2000 },
      { src: '/images/gallery/Royal Palace in Madrid.jpeg', alt: 'Royal Palace in Madrid', caption: 'Royal Palace in Madrid', width: 1500, height: 2000 },

      // ── Newly added (2026-08-09) — captions/placement are a first pass,
      // Anson to correct titles, locations and years as needed. ──
      { src: '/images/gallery/Disneyland in the Rain.jpeg', alt: 'Disneyland in the Rain', caption: 'Disneyland in the Rain', width: 3024, height: 4032 },
      { src: '/images/gallery/Game of Pool In Ho Chi Minh City, Vietnam.jpeg', alt: 'Game of Pool In Ho Chi Minh City, Vietnam', caption: 'Game of Pool In Ho Chi Minh City, Vietnam', width: 1576, height: 2100 },
      { src: '/images/gallery/Pickup Basketball in Toronto.jpeg', alt: 'Pickup Basketball in Toronto', caption: 'Pickup Basketball in Toronto', width: 1080, height: 1620 },
      { src: '/images/gallery/A quick trip to UBC in Vancouver for Halloween.jpeg', alt: 'A quick trip to UBC in Vancouver for Halloween', caption: 'A quick trip to UBC in Vancouver for Halloween', width: 3025, height: 4538 },
      { src: '/images/gallery/With the Boys.jpeg', alt: 'With the Boys', caption: 'With the Boys', width: 4032, height: 3024 },
      { src: '/images/gallery/Night on the Boat.jpeg', alt: 'Night on the Boat', caption: 'Night on the Boat', width: 3024, height: 4032 },
      { src: '/images/gallery/Dinner in Athens.jpeg', alt: 'Dinner in Athens', caption: 'Dinner in Athens', width: 1536, height: 2048 },
      { src: '/images/gallery/Reunion with the boys in Chinatown in London.jpeg', alt: 'Reunion with the boys in Chinatown in London', caption: 'Reunion with the boys in Chinatown in London', width: 3024, height: 4032 },
      { src: '/images/gallery/Bookstore in Madrid.jpeg', alt: 'Bookstore in Madrid', caption: 'Bookstore in Madrid', width: 1535, height: 2302 },
      { src: '/images/gallery/Hiking with Friends in Hong Kong.jpeg', alt: 'Hiking with Friends in Hong Kong', caption: 'Hiking with Friends in Hong Kong', width: 3024, height: 4032 },
    ],
  },
]
