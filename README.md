# MarvelVerse

A full-stack MCU catalog and fan hub built with React and Express — browse every Marvel movie and series, explore an in-universe chronological timeline, discover the heroes behind the masks, and create an account to personalize your experience.

**Live Demo:** https://marvel-universe-explorer-phi.vercel.app/

> Fan-made project for educational and portfolio purposes only. Not affiliated with, endorsed by, or sponsored by Marvel Studios or The Walt Disney Company. Movie and show data provided by [TMDB](https://www.themoviedb.org).

---

## Features

- **Projects Catalog** — every MCU movie and Disney+ series, filterable by type, with a dedicated Specials and Legacy (pre-MCU Marvel: X-Men, Sony Spider-Man, Fantastic Four, Netflix series) section
- **Project Detail Pages** — trailers, overview, "where to watch" providers, and season-by-season breakdowns for series
- **Timeline** — the MCU in true in-universe chronological order, grouped by Saga and Phase, distinct from real-world release order
- **Heroes** — a curated character roster built dynamically from real cast data, with actor/character cross-referencing and filmography
- **Authentication** — secure signup/login with bcrypt password hashing and server-side session management
- **Upcoming Projects** — a live-updating section for confirmed and rumored future releases, clearly separated from the main released catalog

## Tech Stack

**Frontend:** React (Vite), React Router, Framer Motion, Axios, Context API
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose, bcrypt, express-session
**External API:** [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)

## Architecture Notes

- **Curated data layer:** TMDB's automatic discovery/filtering (by company, network, or keyword) proved unreliable for precisely scoping "real MCU content" — the project instead uses a hand-verified allow-list of TMDB IDs (`curatedIds.js`), which is more accurate and requires only occasional manual updates as new projects are announced.
- **Normalized content model:** Movies and TV shows return differently-shaped data from TMDB (`title` vs `name`, `release_date` vs `first_air_date`) — both are normalized into one consistent internal shape before rendering.
- **Client-side caching:** Heroes and Timeline pages compute their data from many parallel API calls on first load; results are cached in `localStorage` with a content-based auto-invalidating version key, so repeat visits are near-instant without needing manual cache-busting.
- **Separated auth concerns:** passwords are hashed via a Mongoose pre-save hook (never touched directly in route logic), and login state is synced between client and server via a `/api/me` session-check endpoint on app load.

## Local Setup

### Prerequisites
- Node.js (v18+)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Backend
```bash
cd server
npm install
```
Create `server/.env`:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
SESSION_SECRET=any_random_string
```
```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
```
Create `client/.env`:
```
VITE_TMDB_API_KEY=your_tmdb_api_key
```
```bash
npm run dev
```

The app runs at `http://localhost:5173`, proxying API requests to the backend at `http://localhost:5000`.

## Project Structure

```
marvel_site/
├── server/          # Express API, MongoDB models, auth routes
└── client/          # React (Vite) frontend
    └── src/
        ├── api/       # TMDB API client functions
        ├── data/      # Curated MCU datasets (projects, heroes, timeline)
        ├── components/
        ├── pages/
        └── context/   # Auth state management
```

## Known Limitations

- Hero-to-character name matching relies on TMDB's cast credit text, which is occasionally inconsistent across projects — a small number of aliases may need manual correction over time.
- Character imagery uses actor headshots (via TMDB) rather than in-costume art, since no reliable free API provides MCU-specific character stills at scale.
