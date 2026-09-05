import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Heroes from './pages/Heroes';
import HeroDetail from './pages/HeroDetail';
import Timeline from './pages/Timeline';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './components/Navbar.css';
import './components/Hero.css';
import './components/UpcomingGrid.css';
import './pages/Projects.css';
import './pages/ProjectDetail.css';
import './pages/Heroes.css';
import './pages/HeroDetail.css';
import './pages/Timeline.css';
import './pages/Auth.css';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/projects/:type/:id" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
        <Route path="/heroes" element={<PageWrapper><Heroes /></PageWrapper>} />
        <Route path="/heroes/:name" element={<PageWrapper><HeroDetail /></PageWrapper>} />
        <Route path="/timeline" element={<PageWrapper><Timeline /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;