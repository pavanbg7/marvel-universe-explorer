import { useEffect, useState } from 'react';
import { getByIds, IMAGE_BASE_URL } from '../api/tmdb';
import { MOVIES, SERIES, SPECIALS, LEGACY } from '../data/curatedIds';
import { Link } from 'react-router-dom';

function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const [filter, setFilter] = useState('all'); // all | movie | series | special | legacy

  useEffect(() => {
    async function fetchAll() {
      const [movies, series, specials, legacy] = await Promise.all([
        getByIds(MOVIES),
        getByIds(SERIES),
        getByIds(SPECIALS),
        getByIds(LEGACY),
      ]);

      const normalize = (list, category) =>
        list.map((item) => ({
          id: item.id,
          title: item.title || item.name, // movies use "title", tv uses "name"
          date: item.release_date || item.first_air_date,
          poster: item.poster_path,
          type: item.type,
          category, // 'movie' | 'series' | 'special' | 'legacy'
          era: item.era,
        }));

      const combined = [
        ...normalize(movies, 'movie'),
        ...normalize(series, 'series'),
        ...normalize(specials, 'special'),
        ...normalize(legacy, 'legacy'),
      ]
      .filter((item) => item.poster)
      .filter((item) => item.date && new Date(item.date) <= new Date()); // released only

      setAllProjects(combined);
    }

    fetchAll();
  }, []);

  const filteredProjects =
    filter === 'all'
      ? allProjects
      : allProjects.filter((p) => p.category === filter);

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>ALL PROJECTS</h1>
        <div className="filter-tabs">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'movie' ? 'active' : ''} onClick={() => setFilter('movie')}>Movies</button>
          <button className={filter === 'series' ? 'active' : ''} onClick={() => setFilter('series')}>Series</button>
          <button className={filter === 'special' ? 'active' : ''} onClick={() => setFilter('special')}>Specials</button>
          <button className={filter === 'legacy' ? 'active' : ''} onClick={() => setFilter('legacy')}>Legacy</button>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((item) => (
          <Link
            to={`/projects/${item.type}/${item.id}`}
            key={`${item.type}-${item.id}`}
            className="project-card"
          >
            <img src={`${IMAGE_BASE_URL}${item.poster}`} alt={item.title} />
            <div className="project-card-info">
              <h3>{item.title}</h3>
              <span>
                {item.category === 'legacy' && item.era ? item.era + ' • ' : ''}
                {item.date?.slice(0, 4)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Projects;