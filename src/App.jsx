import { useState,useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

import Header from './components/HEADER';
import Hero from './components/Hero';
import Spread from './components/Spread';
import Now_Time from './components/now-time';
import Blog from './components/Blog'; // This might become your "BlogList" for the home page
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useBlogData } from './components/BlogContext';
import SupportMission from './pages/SupportMission';

// --- New Page Components ---
// Create these files in a new 'pages' folder (e.g., src/pages/About.jsx)
import About from './pages/About';
import BlogPage from './pages/BlogPage'; // For the dedicated /blog route
import Contribute from './pages/Contribute';
import Resources from './pages/Resources';
import BlogContent from './pages/BlogContentPage';
import ContentSubmission from './pages/Submissions';
// A component to render your home page content with the scroll effects
function HomePage({ introFinished }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!introFinished) return;

    const handleScroll = () => {
      const vh = window.innerHeight;
      const currentScroll = window.scrollY;
      const maxTransitionScroll = 4 * vh;

      if (currentScroll >= maxTransitionScroll) {
        setActiveSection('footer');
        return;
      }

      // Check scroll
      if (currentScroll < vh) {
        setActiveSection('hero');
        setScrollProgress(currentScroll / vh);
      } else if (currentScroll < 2 * vh) {
        setActiveSection('now-time');
        setScrollProgress((currentScroll - vh) / vh);
      } else if (currentScroll < 3 * vh) {
        setActiveSection('spread');
        setScrollProgress((currentScroll - 2 * vh) / vh);
      } else {
        setActiveSection('blog');
        setScrollProgress((currentScroll - 3 * vh) / vh);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [introFinished]);

  return (
    <div className="w-full relative overflow-hidden">
      {!introFinished && <Header />}

      {/* PAGE HEADER LINK - Use Link from react-router-dom */}
      <Link to="/">
        <h1
          className={`header-main font-extrabold fixed top-3 left-1/2 -translate-x-1/2 text-3xl md:text-4xl xl:text-5xl z-50
            ${introFinished ? 'opacity-100 visible' : 'opacity-0 invisible transition-all duration-1500 ease-in-out'}
            ${activeSection === 'hero' || activeSection === 'spread' ? 'text-white' : 'text-black'}
            ${activeSection === 'blog' ? 'hidden md:block' : 'block'}`}
        >
          thefabgen
        </h1>
      </Link>

      {/* Hero Section */}
      <div className={`w-full h-screen ${activeSection === 'hero' ? 'fixed' : 'relative'} top-0 left-0 z-10`}>
        <Hero transitionProgress={activeSection === 'hero' ? scrollProgress : 1} />
      </div>

      {/* Now Time Section */}
      <div
        className={`w-full h-screen ${activeSection === 'now-time' ? 'fixed' : 'relative'} top-0 left-0 z-20`}
        style={{ marginTop: activeSection === 'hero' ? '100vh' : 0 }}
      >
        <Now_Time transitionProgress={activeSection === 'now-time' ? scrollProgress : 0} />
      </div>

      {/* Spread Section */}
      <div
        className={`w-full h-screen ${activeSection === 'spread' ? 'fixed' : 'relative'} top-0 left-0 z-30`}
        style={{ marginTop: activeSection === 'now-time' ? '100vh' : 0 }}
      >
        <Spread transitionProgress={activeSection === 'spread' ? scrollProgress : 0} />
      </div>

      {/* Blog Section (on home page) */}
      <div
        className={`w-full h-screen ${activeSection === 'blog' ? 'fixed' : 'relative'} top-0 left-0 z-40`}
        style={{ marginTop: activeSection === 'spread' ? '100vh' : 0 }}
      >
        <Blog transitionProgress={activeSection === 'blog' ? scrollProgress : 0}/>
      </div>

      {/* Footer - Normal scroll */}
      <div
        className=" relative z-40 bg-gray-800 flex items-center justify-center text-white"
        style={{ marginTop: activeSection === 'blog' ? '100vh' : 0 }}
      >
        <Footer />
      </div>
    </div>
  );
}

// Main App component with Router

// app.jsx
function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const location = useLocation();
  const initialPath = useRef(location.pathname);

  // Remove blocking conditionals here
  // const { loading, data, error } = useBlogData(); // Remove this

  useEffect(() => {
    const headerIntroTimeout = setTimeout(() => {
      setIntroFinished(true);
    }, 2500);
    return () => clearTimeout(headerIntroTimeout);
  }, []);

  const showHeader = !introFinished && location.pathname === initialPath.current;

  return (
    <div className="w-full min-h-screen">
      {showHeader && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage introFinished={introFinished} />} />
        <Route path="/about" element={<About introFinished={introFinished} />} />
        <Route path="/blog" element={<BlogPage introFinished={introFinished} />} />
        <Route path="/contribute" element={<Contribute introFinished={introFinished} />} />
        <Route path="/resources" element={<Resources introFinished={introFinished} />} />
        <Route path="/blog/:documentId" element={<BlogContent introFinished={introFinished}/>} />
        <Route path="/submission" element={<ContentSubmission introFinished={introFinished}/>} />
        <Route path="/support" element={<SupportMission introFinished={introFinished}/>} />
      </Routes>
    </div>
  );
}

// Wrap your App component with BrowserRouter in main.jsx or index.js
// If you are using Vite, it would be main.jsx
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}