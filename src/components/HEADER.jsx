import { useEffect, useState } from "react";
import starsImg from "../assets/stars2.png"; // Adjust this to your actual relative path

const Header = () => {
  const [animateHeaderOut, setAnimateHeaderOut] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animateImageScale, setAnimateImageScale] = useState(false);

  useEffect(() => {
    // This effect handles the main header exit animation
    const headerOutTimeout = setTimeout(() => {
      setAnimateHeaderOut(true);
    }, 1500);

    return () => clearTimeout(headerOutTimeout);
  }, []);

  useEffect(() => {
    if (imageLoaded) {
      // Once the image is loaded, start the scaling animation after a short delay
      const imageScaleTimeout = setTimeout(() => {
        setAnimateImageScale(true);
      }, 100); // Small delay after image loads before scaling starts
      return () => clearTimeout(imageScaleTimeout);
    }
  }, [imageLoaded]); // Depend on imageLoaded state

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden bg-black z-50">
      <section
        className={`w-full h-screen flex flex-col items-center justify-center transition-transform duration-3400 ease-in-out bg-black ${
          animateHeaderOut ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <img
          src={starsImg}
          alt="stars"
          onLoad={handleImageLoad} // Call handler when image loads
          className={`
            w-[180px] h-[200px] mt-10
            transform transition-all duration-[1000ms] ease-out
            ${imageLoaded ? "opacity-100 bg-white" : "opacity-0"} // Hide until loaded
            ${animateImageScale ? "scale-110" : "scale-100"} // Apply scale animation
          `}
        />

        <h1 className="header-main 2xl:mt-40 2xl:text-[17em] lg:mt-30 lg:text-[13em] text-extrabold md:mt-50 mt-100 text-[5em] md:text-[10em] text-center text-white">
          thefabgen
        </h1>
      </section>
    </div>
  );
};

export default Header;