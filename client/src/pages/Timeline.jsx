import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {getMovieDetails,getShowDetails,IMAGE_BASE_URL} from '../api/tmdb';
import { TIMELINE } from '../data/timeline';

function Timeline() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const CACHE_VERSION = `v-${JSON.stringify(TIMELINE).length}`;

  useEffect(() => {
    async function buildTimeline() {
      try {
        const cached = localStorage.getItem('timelineData');

        if (cached) {
          const parsed = JSON.parse(cached);

          if (parsed.version === CACHE_VERSION) {
            setEntries(parsed.data);
            setLoading(false);
            return;
          }
        }

        const results = await Promise.all(
          TIMELINE.map(async (entry) => {
            const details =
              entry.type === 'movie'
                ? await getMovieDetails(entry.tmdbId)
                : await getShowDetails(entry.tmdbId);

            const releaseDate = details.release_date || details.first_air_date;
            const isUpcoming = releaseDate && new Date(releaseDate) > new Date();

            return {
              id: entry.tmdbId,
              type: entry.type,
              timelineYear: entry.timelineYear,
              saga: entry.saga,
              phase: entry.phase,
              title: details.title || details.name,
              poster: details.poster_path,
              isUpcoming,
            };
          })
        );

        setEntries(results);

        localStorage.setItem(
          'timelineData',
          JSON.stringify({
            version: CACHE_VERSION,
            data: results,
          })
        );
        console.log('Sample entry:', results[results.length - 1]);
      } catch (error) {
        console.error('Failed to build MCU timeline:', error);
      } finally {
        setLoading(false);
      }
    }

    buildTimeline();
  }, []);

  const sagaOrder = [...new Set(entries.map((entry) => entry.saga))];

  return (
    <div className="timeline-page">
      <h1>THE MCU TIMELINE</h1>

      <p className="timeline-subtitle">
        In-universe chronological order — not release order
      </p>

      {loading ? (
        <p className="detail-note">Building timeline...</p>
      ) : (
        sagaOrder.map((saga) => {
          const sagaEntries = entries.filter(
            (entry) => entry.saga === saga
          );

          const phaseOrder = [
            ...new Set(sagaEntries.map((entry) => entry.phase)),
          ];

          return (
            <div key={saga} className="saga-block">
              <h2 className="saga-title">{saga}</h2>

              {phaseOrder.map((phase) => (
                <div key={phase} className="phase-block">
                  <h3 className="phase-title">{phase}</h3>

                  <div className="timeline-track">
                    {sagaEntries
                      .filter((entry) => entry.phase === phase)
                      .map((entry, index) => (
                      <motion.div
                        key={`${entry.type}-${entry.id}`}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                      >
                      <Link to={`/projects/${entry.type}/${entry.id}`} className="timeline-entry">
                        <span className="timeline-year">{entry.timelineYear}</span>
                        <div className="timeline-poster-wrap">
                          <img
                            src={entry.poster ? `${IMAGE_BASE_URL}${entry.poster}` : 'https://via.placeholder.com/150x225'}
                            alt={entry.title}
                          />
                          {entry.isUpcoming && <span className="upcoming-badge">Upcoming</span>}
                        </div>
                        <span className="timeline-entry-title">{entry.title}</span>
                      </Link>
                    </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Timeline;
