export const HERO_IMAGES = {
  // --- Original Avengers ---
  'Iron Man': "https://i.pinimg.com/736x/bb/45/23/bb45232dbef503677820ceebdba63af7.jpg",
  'Captain America': "https://i.pinimg.com/736x/77/36/2a/77362a09c856ca74609018ed40630b92.jpg",
  'Thor': "https://i.pinimg.com/736x/49/a1/50/49a1501915ff2d596488009878ea5df4.jpg",
  'Hulk': "https://i.pinimg.com/736x/a8/77/51/a87751cf784ab01ad86bba0a12596218.jpg",
  'Black Widow': "https://i.pinimg.com/1200x/46/32/f4/4632f4eba97278cd53db909fd0e4b36f.jpg",
  'Hawkeye': "https://i.pinimg.com/736x/78/2c/6c/782c6c1a84aefa278a52fe2713b97a82.jpg",

  // --- Core expanded Avengers / Phase 3+ leads ---
  'Spider-Man': "https://i.pinimg.com/736x/e9/32/04/e932044eb04a53b2216e8b5889db5e76.jpg",
  'Black Panther': "https://i.pinimg.com/1200x/32/bd/6b/32bd6b78daba76a217703b2d4cb6c8c2.jpg",
  'Doctor Strange': "https://i.pinimg.com/1200x/84/08/01/8408018505bb35406b2bd7256cdf63e9.jpg",
  'Captain Marvel': "https://i.pinimg.com/1200x/e6/90/23/e69023fe0370d4fca637c798033017ae.jpg",
  'Scarlet Witch': "https://i.pinimg.com/736x/1b/12/42/1b1242cefb515e33dbdee24b35d376a0.jpg",
  'Vision': "https://i.pinimg.com/736x/56/f4/9b/56f49bafd79b6afd1c50c4b7018b5be6.jpg",
  'Bucky Barnes': "https://i.pinimg.com/736x/fe/31/89/fe318901082f1cf0cf243be79abfbabf.jpg",
  'Falcon': "https://i.pinimg.com/736x/d0/99/56/d0995663146894c463026cf27ad6da2e.jpg",
  'Ant-Man': "https://i.pinimg.com/1200x/d2/e7/f7/d2e7f7393d412639df7a7f69e11740ef.jpg",
  'Hope Van Dyne': "https://i.pinimg.com/736x/fc/89/7e/fc897e38a40cbd0c2fd207d03bf34d2f.jpg",

  // --- Guardians of the Galaxy ---
  'Star-Lord': "https://i.pinimg.com/736x/62/12/ad/6212ade0095608e769948d3d344f7fcb.jpg",
  'Gamora': "https://i.pinimg.com/736x/db/cb/0c/dbcb0c688fd5d984371547978bd75bd4.jpg",
  'Rocket': "https://i.pinimg.com/736x/6f/67/7c/6f677cf54f95c3686003eefd046c0fd9.jpg",
  'Groot': "https://i.pinimg.com/736x/9d/33/67/9d336779363e86410fc4ede8b52b0df7.jpg",
  'Drax': "https://i.pinimg.com/736x/ae/33/0a/ae330a75561071016878920902ba9796.jpg",
  'Mantis': "https://i.pinimg.com/736x/c5/70/21/c57021b1cae14493f26397ef53c3a216.jpg",
  'Nebula': "https://i.pinimg.com/736x/c4/84/6a/c4846a293fb62781d16e7f6076ff53fc.jpg",

  // --- Disney+ / Phase 4-5 leads ---
  'Moon Knight': "https://i.pinimg.com/736x/ec/03/f7/ec03f78263f6c02d048a2da6bec5efaf.jpg",
  'Ms. Marvel': "https://i.pinimg.com/1200x/06/9e/fe/069efee45779e514f1ff75e0474a6b13.jpg",
  'Kate Bishop': "https://i.pinimg.com/736x/a7/c6/b3/a7c6b3a648d483c61d29a14f71cbe560.jpg",
  'Yelena Belova': "https://i.pinimg.com/736x/d2/9d/37/d29d378e2d804be54a437bccdbc046ff.jpg",

  // --- Wakanda ---
  'Shuri': "https://i.pinimg.com/1200x/fc/c6/6a/fcc66ad2ef5f6e7aa9aec8a28ce23e1b.jpg",
  'Valkyrie': "https://i.pinimg.com/736x/51/39/8f/51398feafb803d95677a2a3fe692d946.jpg",

  // --- Eternals ---
  'Sersi': "https://i.pinimg.com/736x/ae/01/f5/ae01f59d8a331a804bdaf3c92cd3ae2c.jpg",
  'America Chavez': "https://i.pinimg.com/736x/34/7f/d8/347fd8f9c8b00da363a60d195efcce78.jpg",

  // --- X-Men / Legacy ---
  'Wolverine': "https://i.pinimg.com/1200x/46/44/4d/46444d56b06ac39be38dd5884b9c6733.jpg",
  'Shang-Chi': "https://i.pinimg.com/736x/8c/89/79/8c8979ea3e14630e72f08d7d100c0fe6.jpg",

  // --- Netflix / street-level heroes ---
  'Daredevil': "https://i.pinimg.com/736x/b8/ac/64/b8ac64ce14b95fd3ae1f25513ae35472.jpg",
  'Jessica Jones': "https://i.pinimg.com/736x/1b/f6/44/1bf644207954cbf5c0ee7769805236b7.jpg",
  'Luke Cage': "https://i.pinimg.com/1200x/ab/24/f5/ab24f59e5c15d52927be67b83391d1d4.jpg",
  'Iron Fist': "https://i.pinimg.com/736x/9e/0e/f3/9e0ef39b80f1c4b4f3b9e86eaa674224.jpg",

};

// Maps the RAW character names TMDB returns (e.g. "Tony Stark",
// "Steve Rogers") to the cleaner HERO_IMAGES keys above (e.g. "Iron Man",
// "Captain America"). WHY this second layer: TMDB's `character` field
// uses real names, but HERO_IMAGES uses the superhero name — this bridges
// the two without duplicating every entry twice.
export const NAME_ALIASES = {
  'Tony Stark': 'Iron Man',
  'Steve Rogers': 'Captain America',
  'Natasha Romanoff': 'Black Widow',
  'James Buchanan \'Bucky\' Barnes': 'Bucky Barnes',
  'Carol Danvers': 'Captain Marvel',
  'Stephen Strange': 'Doctor Strange',
  'Matt Murdock':'Daredevil',
  'Carl Lucas':'Luke Cage',
  'Shaun': 'Shang-Chi',
  'Jessica Jones':'Jessica Jones',
  'Sam Wilson': 'Falcon',
  'Clint Barton': 'Hawkeye',
  'Hope van Dyne': 'Hope Van Dyne',
  'Bruce Banner': 'Hulk',
  'Jennifer Walters': 'She-Hulk',
  'Marc Spector': 'Moon Knight',
  'Peter Quill': 'Star-Lord',
  'Groot':'Groot',
  'Drax':'Drax',
  'Wanda Maximoff': 'Scarlet Witch',
  'Scott Lang': 'Ant-Man',
  'Peter Parker': 'Spider-Man',
  'Logan': 'Wolverine',
  'Kamala Khan': 'Ms. Marvel',
  'T\'Challa': 'Black Panther',
  'Danny Rand': 'Iron Fist',
};