import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCredits, getMovieDetails, getShowDetails, IMAGE_BASE_URL } from '../api/tmdb';
import { MOVIES, SERIES, SPECIALS, LEGACY } from '../data/curatedIds';
import { HERO_IMAGES, NAME_ALIASES } from '../data/heroImages';

const ALL_CURATED = [...MOVIES, ...SERIES, ...SPECIALS, ...LEGACY];

function HeroDetail() {
  const { name } = useParams(); // matches the route param below
  const heroName = decodeURIComponent(name);

  const [actor, setActor] = useState(null);
  const [appearances, setAppearances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

  async function findHero() {
  setLoading(true);
  const found = [];
  const actorCounts = new Map();

  for (const item of ALL_CURATED) {
    try {
      const cast = await getCredits(item.id, item.type);

      const match = cast.find((person) => {
        if (!person.character) return false;
        const rawName = person.character.split('/')[0].trim();
        const resolvedName = NAME_ALIASES[rawName] || rawName;
        return resolvedName === heroName;
      });

      if (match) {
        if (!actorCounts.has(match.id)) {
          actorCounts.set(match.id, { name: match.name, photo: match.profile_path, count: 0 });
        }
        actorCounts.get(match.id).count++;

        const details =
          item.type === 'movie'
            ? await getMovieDetails(item.id)
            : await getShowDetails(item.id);

        const date = details.release_date || details.first_air_date;
        const isUpcoming = date && new Date(date) > new Date();

        found.push({
          id: item.id,
          type: item.type,
          title: details.title || details.name,
          poster: details.poster_path,
          isUpcoming,
          actorId: match.id, // tag which actor this appearance belongs to
        });
      }
    } catch {
      // skip
    }
  }

  let topActorId = null;
  let topActor = null;
  let maxCount = 0;
  actorCounts.forEach((info, id) => {
    if (info.count > maxCount) {
      maxCount = info.count;
      topActor = info;
      topActorId = id;
    }
  });

  // Only keep appearances that belong to the winning actor
  const filteredAppearances = found.filter((f) => f.actorId === topActorId);

  setActor(topActor);
  setAppearances(filteredAppearances);
  setLoading(false);
}
    findHero();
  }, [heroName]);

  const curatedImage = HERO_IMAGES[heroName];
  const displayImage =
    curatedImage || (actor?.photo ? `${IMAGE_BASE_URL}${actor.photo}` : null);

  if (loading) return <div className="detail-loading">Loading {heroName}...</div>;

  return (
    <div className="hero-detail">
      <div className="hero-detail-content">
        <img
          src={displayImage || 'https://via.placeholder.com/300x450'}
          alt={heroName}
          className="hero-detail-photo"
        />

        <div className="hero-detail-info">
          <h1>{heroName}</h1>
          {actor && <p className="hero-detail-realname">Played by {actor.name}</p>}

          <h3>Appears In</h3>
          <div className="hero-appearances-grid">
            {appearances.map((proj) => (
              <Link to={`/projects/${proj.type}/${proj.id}`} key={proj.id} className="mini-project-card">
                <div className="mini-poster-wrap">
                  <img
                   src={proj.poster ? `${IMAGE_BASE_URL}${proj.poster}` : 'https://via.placeholder.com/150x225'}
                   alt={proj.title}
                  />
                  {proj.isUpcoming && <span className="upcoming-badge">Upcoming</span>}
                </div>
                <span>{proj.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroDetail;