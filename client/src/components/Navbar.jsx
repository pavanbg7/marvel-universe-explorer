import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      // Hide when scrolling down past 100px, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${hidden ? 'navbar-hidden' : ''}`}>
      <Link to="/" className="navbar-logo">MARVEL<span>VERSE</span></Link>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/heroes">Heroes</Link></li>
        <li><Link to="/timeline">Timeline</Link></li>
      </ul>

      <div className="navbar-auth">
        {user ? (
          <div className="navbar-user">
            <span>Hi, {user.username}</span>
            <button onClick={logout} className="btn-login">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="btn-login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;