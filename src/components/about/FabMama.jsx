import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AboutFabMama = ({ transitionProgress }) => {
  const [translateMultiplier, setTranslateMultiplier] = useState(30);
  const [translateScale, settranslateScaler] = useState(0.4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setTranslateMultiplier(24);
        settranslateScaler(0.6);
      } else if (window.innerWidth < 540) {
        setTranslateMultiplier(28);
        settranslateScaler(0.55);
      } else if (window.innerWidth < 768) {
        setTranslateMultiplier(35);
        settranslateScaler(0.35);
      } else if (window.innerWidth < 1380) {
        setTranslateMultiplier(16);
        settranslateScaler(0.8);
      } else setTranslateMultiplier(25);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = 1 - transitionProgress * translateScale;
  const translateY = -transitionProgress * translateMultiplier;

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center px-6">
      <div
        className="text-white text-left transition-transform duration-75 ease-out max-w-4xl"
        style={{ transform: `scale(${scale}) translateY(${translateY}em)` }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
          Behind the Scenes 
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed">
          Hi, I’m AnneMarie. I created thefabgen as a platform for The Fabulous Generation (b. 1988–1997).
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed">
          It was born from a deep sense that something meaningful is unfolding in your generation.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl mb-4 leading-relaxed">
          thefabgen is here to amplify your voices and remind you that the way you move through the world matters.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed mt-6">
            Love,<br />
            AnneMarie<br />
            "The Fab Mama"<br />
            Founder,&nbsp;
            <Link to="/" className="underline hover:text-[#ece6af] transition-colors duration-200">thefabgen</Link>
            &nbsp;&amp;&nbsp;
            <a
            href="http://hackingsimplicity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#ece6af] transition-colors duration-200"
            >
            hackingsimplicity.com
            </a>
        </p>
      </div>
    </div>
  );
};

export default AboutFabMama;
