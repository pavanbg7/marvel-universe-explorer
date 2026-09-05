import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const MARVEL_STUDIOS_ID = 420;
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


export async function getByIds(items) {
  const requests = items.map((item) =>
    tmdb.get(`/${item.type}/${item.id}`)
  );
  const responses = await Promise.all(requests);
  return responses.map((res, i) => ({
    ...res.data,
    type: items[i].type,
    era: items[i].era || null, // only Legacy items have this
  }));
}
// Get full details for ONE movie by its TMDB id
export async function getMovieDetails(id) {
  const response = await tmdb.get(`/movie/${id}`);
  return response.data;
}

// Get full details for ONE tv show by its TMDB id
export async function getShowDetails(id) {
  const response = await tmdb.get(`/tv/${id}`);
  return response.data;
}

// Works for both movies and shows — pass 'movie' or 'tv'
export async function getTrailer(id, type) {
  const response = await tmdb.get(`/${type}/${id}/videos`);
  const trailer = response.data.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  return trailer ? trailer.key : null;
}

export async function getWatchProviders(id, type, region = 'US') {
  const response = await tmdb.get(`/${type}/${id}/watch/providers`);
  return response.data.results[region] || null;
}

export async function getPerson(id) {
  const response = await tmdb.get(`/person/${id}`);
  return response.data;
}
export async function getCredits(id, type) {
  const response = await tmdb.get(`/${type}/${id}/credits`);
  return response.data.cast; // array of actual cast members with names + character names
}