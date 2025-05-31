import { useEffect, useState } from "react";

const AboutSky = ({ transitionProgress }) => {
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
        settranslateScaler(0.45);
      } else setTranslateMultiplier(28);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = 1 - transitionProgress * translateScale;
  const translateY = -transitionProgress * translateMultiplier;

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center px-6">
      <div
        className="text-black text-left transition-transform duration-75 ease-out max-w-5xl"
        style={{ transform: `scale(${scale}) translateY(${translateY}em)` }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
          The <span className="text-[#d8bd38]">1988–1997</span> Sky
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl mb-4 leading-relaxed">
          Within certain times between 1988 and 1997, a rare triple conjunction took place between Saturn, Uranus and Neptune. This only happens every 171 years.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl mb-4 leading-relaxed">
          Under this sky, a powerful group of people were born. They are highly intuitive, visionary, and gifted in technology and systems thinking.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl mb-4 leading-relaxed">
          We call them <span className="font-semibold text-[#d8bd38]">The Fabulous Generation</span>.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed">
          This generation carries a different kind of vibe. One wired for connection, creativity, and conscious disruption.
        </p>
      </div>
    </div>
  );
};

export default AboutSky;
