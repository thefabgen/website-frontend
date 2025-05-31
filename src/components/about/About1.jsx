// components/about/AboutOne.jsx
import { useEffect, useState } from "react";

const AboutOne = ({ transitionProgress }) => {
  const [translateMultiplier, setTranslateMultiplier] = useState(30);
  const [translateScale, settranslateScaler] = useState(0.4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {setTranslateMultiplier(24); settranslateScaler(0.6)}
      else if (window.innerWidth < 540) {setTranslateMultiplier(28); settranslateScaler(0.55)}
      else if (window.innerWidth < 768){ setTranslateMultiplier(35);settranslateScaler(0.35)}
      else if (window.innerWidth < 1380){ setTranslateMultiplier(20);settranslateScaler(0.5)}
      else setTranslateMultiplier(28);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = 1 - transitionProgress * translateScale;
  const translateY = -transitionProgress * translateMultiplier;

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div
        className="text-white text-left px-6 transition-transform duration-75 ease-out max-w-5xl"
        style={{ transform: `scale(${scale}) translateY(${translateY}em)` }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-extrabold mb-8 leading-tight">
          About <span className="text-[#ffed8f]">thefabgen</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-2 leading-relaxed">
          The Fabulous Generation, those born between 1988 and 1997, came of age in a world in transition.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mb-2 leading-relaxed">
          Raised with the internet and shaped by global change, you don’t just follow systems. You question them. Rebuild them.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mb-2 leading-relaxed">
          <span className=" font-black">thefabgen</span> is a platform to honor that brilliance and spotlight Fabs’ voices, vision, and ideas.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mb-2 leading-relaxed">
          Through writings, videos, an upcoming book, and other creative projects, we celebrate a generation wired for depth, truth, and conscious disruption.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
          This is your space to be seen, heard, and reflected back in your full power.
        </p>
      </div>
    </div>
  );
};

export default AboutOne;
