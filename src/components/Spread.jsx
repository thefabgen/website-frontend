import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Spread = ({ transitionProgress }) => {
    const [translateMultiplier, setTranslateMultiplier] = useState(35); // Default for large screens
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setTranslateMultiplier(30);
        } else if (window.innerWidth < 768) {
          setTranslateMultiplier(28);
        } else {
          setTranslateMultiplier(20);
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
    <div className=" w-full h-screen bg-black flex items-center justify-center">
      <div
        className="text-center text-white px-6 transition-transform duration-75 ease-out"
        style={{ transform: `scale(${scale}) translateY(${translateY}em)` }}
      >
        <h1 className="header-main text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
          Spread the word
        </h1>
        <p className="text-2xl md:text-3xl lg:text-3xl mb-3 max-w-4xl mx-auto">
          The Fabulous Generation (b. 1988–1997) is different.
        </p>
        <p className="text-2xl md:text-3xl lg:text-3xl mb-3 max-w-3xl mx-auto">
          Curious. Awake. Unapologetically real.
        </p>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto">
          See it. Share it. Be part of it.
        </p>
        
        <Link to="/contribute">
          <button className="cursor-pointer bg-white text-black px-6 py-3 rounded-full text-lg md:text-xl font-semibold hover:bg-gray-200 transition">
            I’M A FAB & WANT TO BRING IT!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Spread;
