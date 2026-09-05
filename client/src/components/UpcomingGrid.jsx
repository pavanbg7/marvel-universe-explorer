import { useEffect, useState } from 'react';
import { getByIds, IMAGE_BASE_URL } from '../api/tmdb';
import { MOVIES, SERIES } from '../data/curatedIds';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function UpcomingGrid() {
  const [confirmed, setConfirmed] = useState([]);
  const [announced, setAnnounced] = useState([]);

  useEffect(() => {
    async function fetchUpcoming() {
      const [movies, series] = await Promise.all([
        getByIds(MOVIES),
        getByIds(SERIES),
      ]);

      const normalize = (list) =>
        list.map((item) => ({
          id: item.id,
          title: item.title || item.name,
          date: item.release_date || item.first_air_date,
          poster: item.poster_path,
          type: item.type,
          status: item.status,
        }));

      const combined = [...normalize(movies), ...normalize(series)];
      const today = new Date();

      const withDate = combined
        .filter((item) => item.date && new Date(item.date) > today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const upcomingStatuses = ['Planned', 'In Production', 'Post Production', 'Rumored'];
      const withoutDate = combined.filter(
        (item) => !item.date && upcomingStatuses.includes(item.status)
      );

      setConfirmed(withDate.slice(0, 5));
      setAnnounced(withoutDate.slice(0, 8));
    }

    fetchUpcoming();
  }, []);

  return (
    <>
      {confirmed.length > 0 && (
        <section className="upcoming-section">
          <h2>UPCOMING PROJECTS</h2>
          <div className="bento-grid">
            {confirmed.map((item, index) => (
              <motion.div
                key={`${item.type}-${item.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`bento-item bento-item-${index}`}
              >
                <Link to={`/projects/${item.type}/${item.id}`}>
                  <img src={`${IMAGE_BASE_URL}${item.poster}`} alt={item.title} />
                  <div className="bento-info">
                    <h3>{item.title}</h3>
                    <span>{item.type === 'movie' ? 'Movie' : 'Series'} • {item.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {announced.length > 0 && (
        <section className="announced-section">
          <h2>IN DEVELOPMENT — TBA</h2>
          <div className="announced-grid">
            {announced.map((item) => (
              <div key={`${item.type}-${item.id}`} className="announced-card">
                {item.poster && (
                  <img src={`${IMAGE_BASE_URL}${item.poster}`} alt={item.title} />
                )}
                <div className="announced-info">
                  <h3>{item.title}</h3>
                  <span>{item.type === 'movie' ? 'Movie' : 'Series'} • Date TBA</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default UpcomingGrid;