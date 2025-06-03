import { useState, useEffect } from 'react';

const Hero = ({ transitionProgress }) => {
  const [translateMultiplier, setTranslateMultiplier] = useState(35); // Default for large screens

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTranslateMultiplier(28);
      } else if (window.innerWidth < 768) {
        setTranslateMultiplier(25);
      } else {
        setTranslateMultiplier(23);
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scale = 1 - transitionProgress * 0.4;
  const translateY = -transitionProgress * translateMultiplier;

  return (
    <div className="header-main h-screen overflow-y-scroll scroll-smooth bg-black">
      <section
        className="relative h-screen pt-13 pb-16 md:pt-40 md:pb-24 snap-start flex items-center justify-center"
        style={{
          transform: `scale(${scale}) translateY(${translateY}em)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
          <h1 className="text-7xl mb-20 sm:text-6xl md:text-9xl lg:text-10xl font-extrabold leading-tight text-white">
            HEY FABS!
          </h1>
          <p className="text-3xl md:text-4xl lg:text-5xl text-white mt-15">
            You're here on earth to do BIG things.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
