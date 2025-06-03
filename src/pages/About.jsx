// pages/About.jsx
import { useEffect, useState } from "react";
import AboutOne from "../components/about/About1";
import AboutFabMama from "../components/about/FabMama";
import AboutSky from "../components/about/Sky";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const About = ({introFinished}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about1");

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const currentScroll = window.scrollY;
      const maxScroll = 3 * vh;

      if (currentScroll >= maxScroll) {
        setActiveSection("end");
        return;
      }

      if (currentScroll < vh) {
        setActiveSection("about1");
        setScrollProgress(currentScroll / vh);
      } else if (currentScroll < 2 * vh) {
        setActiveSection("about2");
        setScrollProgress((currentScroll - vh) / vh);
      } else {
        setActiveSection("about3");
        setScrollProgress((currentScroll - 2 * vh) / vh);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full relative overflow-hidden bg-black text-white">
      <Link to="/">
        <h1
          className={`header-main font-extrabold fixed top-3 left-1/2 -translate-x-1/2 text-3xl md:text-4xl xl:text-5xl z-50
            ${introFinished ? 'opacity-100 visible' : 'opacity-0 invisible transition-all duration-1500 ease-in-out'}
            ${activeSection === 'about1' || activeSection === 'about3' ? 'text-white' : 'text-black'}`
          }
        >
          thefabgen
        </h1>
      </Link>
      {/* Section 1 */}
      <div
        className={`w-full h-screen ${activeSection === "about1" ? "fixed" : "relative"} top-0 left-0 z-10`}
      >
        <AboutOne transitionProgress={activeSection === "about1" ? scrollProgress : 1} />
      </div>

      {/* Section 2 */}
      <div
        className={`w-full h-screen ${activeSection === "about2" ? "fixed" : "relative"} top-0 left-0 z-20`}
        style={{ marginTop: activeSection === "about1" ? "100vh" : 0 }}
      >
        <AboutSky transitionProgress={activeSection === "about2" ? scrollProgress : 0} />
      </div>

      {/* Section 3 */}
      <div
        className={`w-full h-screen ${activeSection === "about3" ? "fixed" : "relative"} top-0 left-0 z-30`}
        style={{ marginTop: activeSection === "about2" ? "100vh" : 0 }}
      >
        <AboutFabMama transitionProgress={activeSection === "about3" ? scrollProgress : 0} />
      </div>

      {/* Optional End Section */}
      <div
        className="w-full relative z-40 bg-gray-900 flex items-center justify-center"
        style={{ marginTop: activeSection === "about3" ? "100vh" : 0 }}
      >
        <Footer></Footer>
      </div>
    </div>
  );
};

export default About;