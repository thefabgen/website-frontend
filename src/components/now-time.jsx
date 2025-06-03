import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Now_Time = ({ transitionProgress }) => {
  const [translateMultiplier, setTranslateMultiplier] = useState(35); // Default for large screens

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTranslateMultiplier(30);
      } else if (window.innerWidth < 768) {
        setTranslateMultiplier(28);
      } else {
        setTranslateMultiplier(18);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scale = 1 - transitionProgress * 0.48;
  const translateY = -transitionProgress * translateMultiplier;

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div
        className="text-center text-black px-6 transition-transform duration-75 ease-out"
        style={{ transform: `scale(${scale}) translateY(${translateY}em)` }}
      >
        <h1 className="header-main text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
          Now is your time
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-4 max-w-3xl mx-auto">
          You hold keys to unlock fresh ideas in science, art, tech, and spirituality.
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto">
          <b>thefabgen</b> is a creative platform for those born between 1988 and 1997 to be heard.
        </p>

        <Link to="/contribute">
          <button className="cursor-pointer bg-black text-white px-6 py-3 rounded-full text-lg md:text-xl hover:bg-gray-800 transition">
            I’M A FAB & WANT TO CONTRIBUTE!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Now_Time;
