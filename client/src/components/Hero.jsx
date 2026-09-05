import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>ENTER THE MARVEL UNIVERSE</h1>
        <p>Every movie. Every series. Every hero. One universe.</p>
        <div className="hero-buttons">
          <Link to="/projects" className="btn-primary">Explore Projects</Link>
          <Link to="/timeline" className="btn-secondary">View Timeline</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;