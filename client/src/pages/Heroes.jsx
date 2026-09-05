import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCredits, IMAGE_BASE_URL } from '../api/tmdb';
import { MOVIES, SERIES, SPECIALS, LEGACY } from '../data/curatedIds';
import { HERO_IMAGES, NAME_ALIASES } from '../data/heroImages';
import { motion } from 'framer-motion';

function Heroes() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const CACHE_VERSION = `v-${JSON.stringify(HERO_IMAGES).length}-${JSON.stringify(NAME_ALIASES).length}`;

  useEffect(() => {
    async function buildRoster() {
      const cached = localStorage.getItem('heroRoster');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.version === CACHE_VERSION) {
          setHeroes(parsed.data);
          setLoading(false);
          return;
        }
      }

      const peopleMap = new Map();
      const allProjects = [...MOVIES, ...SERIES, ...SPECIALS, ...LEGACY];

      for (const item of allProjects) {
        try {
          const cast = await getCredits(item.id, item.type);
          cast.slice(0, 8).forEach((person) => {
            if (!person.character) return;
            const rawName = person.character.split('/')[0].trim();
            const heroName = NAME_ALIASES[rawName] || rawName;

            if (!(heroName in HERO_IMAGES)) return;
            if (peopleMap.has(heroName)) return;

            peopleMap.set(heroName, {
              name: heroName,
              actor: person.name,
              personId: person.id,
              actorPhoto: person.profile_path,
            });
          });
        } catch {
          // skip
        }
      }

      const orderedNames = Object.keys(HERO_IMAGES);
      const roster = orderedNames
        .filter((name) => peopleMap.has(name))
        .map((name) => {
          const person = peopleMap.get(name);
          const curatedImage = HERO_IMAGES[name];
          const image = curatedImage || (
            person.actorPhoto ? `${IMAGE_BASE_URL}${person.actorPhoto}` : null
          );
          return { ...person, image };
        })
        .filter((h) => h.image);

      setHeroes(roster);
      setLoading(false);

      localStorage.setItem(
        'heroRoster',
        JSON.stringify({ version: CACHE_VERSION, data: roster })
      );
    }

    buildRoster();
  }, []);

  return (
    <div className="heroes-page">
      <h1>HEROES</h1>
      {loading ? (
        <p className="detail-note">Building roster...</p>
      ) : (
        <div className="heroes-grid">
          {heroes.map((hero, index) => (
            <motion.div
              key={hero.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
            >
              <Link to={`/heroes/${encodeURIComponent(hero.name)}`} className="hero-card">
                <img src={hero.image} alt={hero.name} />
                <div className="hero-card-info">
                  <h3>{hero.name}</h3>
                  <span>{hero.actor}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Heroes;