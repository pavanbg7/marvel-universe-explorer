import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMovieDetails,
  getShowDetails,
  getTrailer,
  getWatchProviders,
  IMAGE_BASE_URL,
} from '../api/tmdb';

function ProjectDetail() {
  const { type, id } = useParams();

  const [project, setProject] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const details =
          type === 'movie'
            ? await getMovieDetails(id)
            : await getShowDetails(id);

        setProject(details);

        const trailer = await getTrailer(id, type);
        setTrailerKey(trailer);

        const watch = await getWatchProviders(id, type);
        setProviders(watch);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }

    fetchDetails();
    window.scrollTo(0, 0);
  }, [type, id]);

  if (!project) {
    return <div className="detail-loading">Loading...</div>;
  }

  const title = project.title || project.name;
  const overview = project.overview;
  const date = project.release_date || project.first_air_date;
  const backdrop = project.backdrop_path;
  const poster = project.poster_path;
  const isUpcoming = !date || new Date(date) > new Date();

  return (
    <div className="project-detail">
      <div
        className="detail-backdrop"
        style={{
          backgroundImage: backdrop
            ? `url(${IMAGE_BASE_URL}${backdrop})`
            : 'none',
        }}
      >
        <div className="detail-backdrop-overlay" />
      </div>

      <div className="detail-content">
        <img
          src={
            poster
              ? `${IMAGE_BASE_URL}${poster}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={title}
          className="detail-poster"
        />

        <div className="detail-info">
          <h1>{title}</h1>

          <p className="detail-date">
            {isUpcoming ? 'Coming ' : ''}
            {date || 'Release date TBA'}
          </p>

          <p className="detail-overview">
            {overview ||
              'Details for this project are still under wraps — check back closer to release for a full synopsis.'}
          </p>

          {trailerKey ? (
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              ▶ Watch Trailer
            </a>
          ) : (
            isUpcoming && (
              <p className="detail-note">Trailer not yet released.</p>
            )
          )}

          {providers?.flatrate && (
            <div className="detail-providers">
              <h3>Where to Watch</h3>

              <div className="provider-list">
                {providers.flatrate.map((provider) => (
                  <img
                    key={provider.provider_id}
                    src={`${IMAGE_BASE_URL}${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                  />
                ))}
              </div>
            </div>
          )}

          {type === 'tv' && project.seasons && (
            <div className="detail-seasons">
              <h3>Seasons</h3>

              <div className="season-list">
                {project.seasons
                  .filter((season) => season.season_number > 0)
                  .map((season) => (
                    <div key={season.id} className="season-card">
                      <img
                        src={
                          season.poster_path
                            ? `${IMAGE_BASE_URL}${season.poster_path}`
                            : poster
                            ? `${IMAGE_BASE_URL}${poster}`
                            : 'https://via.placeholder.com/500x750?text=No+Image'
                        }
                        alt={season.name}
                      />

                      <div className="season-card-info">
                        <h4>{season.name}</h4>

                        <span>
                          {season.episode_count} episodes •{' '}
                          {season.air_date
                            ? season.air_date.slice(0, 4)
                            : 'TBA'}
                        </span>

                        <p>
                          {season.overview ||
                            'No description available for this season yet.'}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;