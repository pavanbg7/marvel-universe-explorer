// Manually curated TMDB IDs for every section of the site.
// WHY curated instead of auto-fetched: TMDB's company/network tagging
// includes documentaries, promotional shorts, and unrelated content
// that we don't want on a real project catalog. Since the MCU catalog
// is finite and rarely changes, maintaining an explicit list is more
// accurate than any filter combination.
//
// Each entry is { id, type } so we know which TMDB endpoint to fetch
// from ('movie' or 'tv') when we look up full details.

export const MOVIES = [
  { id: 1726, type: 'movie' },   // Iron Man
  { id: 1724, type: 'movie' },   // The Incredible Hulk
  { id: 10138, type: 'movie' },  // Iron Man 2
  { id: 10195, type: 'movie' },  // Thor
  { id: 1771, type: 'movie' },   // Captain America: The First Avenger
  { id: 24428, type: 'movie' },  // The Avengers
  { id: 68721, type: 'movie' },  // Iron Man 3
  { id: 76338, type: 'movie' },  // Thor: The Dark World
  { id: 100402, type: 'movie' }, // Captain America: The Winter Soldier
  { id: 118340, type: 'movie' }, // Guardians of the Galaxy
  { id: 99861, type: 'movie' },  // Avengers: Age of Ultron
  { id: 102899, type: 'movie' }, // Ant-Man
  { id: 271110, type: 'movie' }, // Captain America: Civil War
  { id: 284052, type: 'movie' }, // Doctor Strange
  { id: 283995, type: 'movie' }, // Guardians of the Galaxy Vol. 2
  { id: 315635, type: 'movie' }, // Spider-Man: Homecoming
  { id: 284053, type: 'movie' }, // Thor: Ragnarok
  { id: 284054, type: 'movie' }, // Black Panther
  { id: 299536, type: 'movie' }, // Avengers: Infinity War
  { id: 363088, type: 'movie' }, // Ant-Man and the Wasp
  { id: 299537, type: 'movie' }, // Captain Marvel
  { id: 299534, type: 'movie' }, // Avengers: Endgame
  { id: 429617, type: 'movie' }, // Spider-Man: Far From Home
  { id: 497698, type: 'movie' }, // Black Widow
  { id: 566525, type: 'movie' }, // Shang-Chi and the Legend of the Ten Rings
  { id: 524434, type: 'movie' }, // Eternals
  { id: 634649, type: 'movie' }, // Spider-Man: No Way Home
  { id: 453395, type: 'movie' }, // Doctor Strange in the Multiverse of Madness
  { id: 616037, type: 'movie' }, // Thor: Love and Thunder
  { id: 505642, type: 'movie' }, // Black Panther: Wakanda Forever
  { id: 640146, type: 'movie' }, // Ant-Man and the Wasp: Quantumania
  { id: 447365, type: 'movie' }, // Guardians of the Galaxy Vol. 3
  { id: 609681, type: 'movie' }, // The Marvels
  { id: 533535, type: 'movie' }, // Deadpool & Wolverine
  { id: 822119, type: 'movie' }, // Captain America: Brave New World
  { id: 986056, type: 'movie' }, // Thunderbolts*
  { id: 617126, type: 'movie' }, // The Fantastic Four: First Steps
  { id: 969681, type: 'movie' }, // Spider-Man: Brand New Day 
  { id: 1003596, type: 'movie' }, // Avengers: Doomsday (upcoming)
  { id: 1003598, type: 'movie' }, // Avengers: Secret Wars (upcoming)
];

export const SERIES = [
  { id: 85271, type: 'tv' },  // WandaVision
  { id: 88396, type: 'tv' },  // The Falcon and the Winter Soldier
  { id: 84958, type: 'tv' },  // Loki
  { id: 91363, type: 'tv' },  // What If...?
  { id: 88329, type: 'tv' },  // Hawkeye
  { id: 92749, type: 'tv' },  // Moon Knight
  { id: 92782, type: 'tv' },  // Ms. Marvel
  { id: 92783, type: 'tv' },  // She-Hulk: Attorney at Law
  { id: 114472, type: 'tv' }, // Secret Invasion
  { id: 122226, type: 'tv' }, // Echo
  { id: 138501, type: 'tv' }, // Agatha All Along
  { id: 202555, type: 'tv' }, // Daredevil: Born Again
  { id: 114471, type: 'tv' }, // Ironheart
  { id: 138502, type: 'tv' }, // X-Men '97
  { id: 138503, type: 'tv' }, // Your Friendly Neighborhood Spider-Man
  { id: 213375, type: 'tv' }, // Visionquest
];

export const SPECIALS = [
  { id: 1439930, type: 'movie' }, // The Punisher: One Last Kill
  { id: 894205, type: 'movie' },  // Werewolf by Night
  { id: 774752, type: 'movie' },  // The Guardians of the Galaxy Holiday Special
  { id: 232125, type: 'tv' },     // I Am Groot
];

// LEGACY: kept as ONE section on the site, grouped here by era just for
// readability in this file — the "era" field lets the UI show a subheader
// (e.g. "X-Men Era", "Sony Spider-Man Era") without needing separate
// top-level categories/routes.
export const LEGACY = [
  // --- X-Men Era (Fox) ---
  { id: 36657, type: 'movie', era: 'X-Men Era' },   // X-Men
  { id: 36668, type: 'movie', era: 'X-Men Era' },   // X-Men: The Last Stand
  { id: 2080, type: 'movie', era: 'X-Men Era' },    // X-Men Origins: Wolverine
  { id: 691677, type: 'movie', era: 'X-Men Era' },  // X-Men: First Class
  { id: 76170, type: 'movie', era: 'X-Men Era' },   // The Wolverine
  { id: 127585, type: 'movie', era: 'X-Men Era' },  // X-Men: Days of Future Past
  { id: 293660, type: 'movie', era: 'X-Men Era' },  // Deadpool
  { id: 246655, type: 'movie', era: 'X-Men Era' },  // X-Men: Apocalypse
  { id: 263115, type: 'movie', era: 'X-Men Era' },  // Logan
  { id: 383498, type: 'movie', era: 'X-Men Era' },  // Deadpool 2
  { id: 320288, type: 'movie', era: 'X-Men Era' },  // Dark Phoenix
  { id: 340102, type: 'movie', era: 'X-Men Era' },  // The New Mutants

  // --- Sony Spider-Man Era ---
  { id: 557, type: 'movie', era: 'Sony Spider-Man Era' },     // Spider-Man
  { id: 558, type: 'movie', era: 'Sony Spider-Man Era' },     // Spider-Man 2
  { id: 559, type: 'movie', era: 'Sony Spider-Man Era' },     // Spider-Man 3
  { id: 1930, type: 'movie', era: 'Sony Spider-Man Era' },    // The Amazing Spider-Man
  { id: 102382, type: 'movie', era: 'Sony Spider-Man Era' },  // The Amazing Spider-Man 2
  { id: 324857, type: 'movie', era: 'Sony Spider-Man Era' },  // Spider-Man: Into the Spider-Verse
  { id: 569094, type: 'movie', era: 'Sony Spider-Man Era' },  // Spider-Man: Across the Spider-Verse
  { id: 335983, type: 'movie', era: 'Sony Spider-Man Era' },  // Venom
  { id: 580489, type: 'movie', era: 'Sony Spider-Man Era' },  // Venom: Let There Be Carnage
  { id: 912649, type: 'movie', era: 'Sony Spider-Man Era' },  // Venom: The Last Dance
  { id: 526896, type: 'movie', era: 'Sony Spider-Man Era' },  // Morbius
  { id: 634492, type: 'movie', era: 'Sony Spider-Man Era' },  // Madame Web
  { id: 539972, type: 'movie', era: 'Sony Spider-Man Era' },  // Kraven the Hunter

  // --- Fantastic Four Era (pre-MCU) ---
  { id: 9738, type: 'movie', era: 'Fantastic Four Era' },   // Fantastic Four (2005)
  { id: 1979, type: 'movie', era: 'Fantastic Four Era' },   // Fantastic Four: Rise of the Silver Surfer
  { id: 166424, type: 'movie', era: 'Fantastic Four Era' }, // Fantastic Four (2015)

  // --- Netflix Era ---
  { id: 61889, type: 'tv', era: 'Netflix Era' },  // Daredevil
  { id: 38472, type: 'tv', era: 'Netflix Era' },  // Jessica Jones
  { id: 62126, type: 'tv', era: 'Netflix Era' },  // Luke Cage
  { id: 62127, type: 'tv', era: 'Netflix Era' },  // Iron Fist
  { id: 62285, type: 'tv', era: 'Netflix Era' },  // The Defenders
  { id: 67178, type: 'tv', era: 'Netflix Era' },  // The Punisher

  
];
export const KNOWN_TITLES = [
  'Iron Man', 'The Incredible Hulk', 'Iron Man 2', 'Thor',
  'Captain America: The First Avenger', 'The Avengers', 'Iron Man 3',
  'Thor: The Dark World', 'Captain America: The Winter Soldier',
  'Guardians of the Galaxy', 'Avengers: Age of Ultron', 'Ant-Man',
  'Captain America: Civil War', 'Doctor Strange',
  'Guardians of the Galaxy Vol. 2', 'Spider-Man: Homecoming',
  'Thor: Ragnarok', 'Black Panther', 'Avengers: Infinity War',
  'Ant-Man and the Wasp', 'Captain Marvel', 'Avengers: Endgame',
  'Spider-Man: Far From Home', 'Black Widow',
  'Shang-Chi and the Legend of the Ten Rings', 'Eternals',
  'Spider-Man: No Way Home', 'Doctor Strange in the Multiverse of Madness',
  'Thor: Love and Thunder', 'Black Panther: Wakanda Forever',
  'Ant-Man and the Wasp: Quantumania', 'Guardians of the Galaxy Vol. 3',
  'The Marvels', 'Deadpool & Wolverine', 'Captain America: Brave New World',
  'Thunderbolts', 'The Fantastic Four: First Steps', 'Avengers: Doomsday',
  'Avengers: Secret Wars', 'Spider-Man: Brand New Day',
  'WandaVision', 'The Falcon and the Winter Soldier', 'Loki',
  'What If', 'Hawkeye', 'Moon Knight', 'Ms. Marvel',
  'She-Hulk', 'Secret Invasion', 'Echo', 'Agatha All Along',
  'Daredevil: Born Again', 'Ironheart', "X-Men '97",
  'Your Friendly Neighborhood Spider-Man', 'VisionQuest',
];