// src/pages/Resources.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import BookPopup from "../components/BookPopup";
import { useState } from "react";

const Resources = ({ introFinished }) => {
  const [showBookPopup, setShowBookPopup] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Book Popup */}
      <BookPopup
        isOpen={showBookPopup}
        onClose={() => setShowBookPopup(false)}
      />

      <Link to="/">
        <h1
          className={`header-main font-extrabold relative top-3 left-1/2 -translate-x-1/2 text-3xl md:text-4xl xl:text-4xl z-20 text-white
          transition-all duration-700 ease-in-out
          ${introFinished ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          thefabgen
        </h1>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-left text-white px-2 md:mt-20 mt-15"
      >
        <h1 className="header-main text-5xl md:text-6xl xl:text-7xl font-bold mb-6">Resources</h1>
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto">
          This is your home base for staying connected, inspired, and supported.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="space-y-10 text-left max-w-3xl mx-auto text-lg md:text-xl text-white px-4"
      >
        <div>
          <p className="mb-2">❤️ <strong>The Book:</strong> <em>Fabulous AF: 9 Years of Potential</em></p>
          <p className="ml-6">
            This book explores the Fabs – those born between 1988 and 1997. It features reflections,
            real stories, and insight from a generation reshaping what's possible.
            <br />
            <button
              onClick={() => setShowBookPopup(true)}
              className="cursor-pointer inline-block mt-1 underline text-[#ffed8f] hover:text-[#e7e1ae] transition-colors duration-300"
            >
              → Coming soon, Be notified!
            </button>
          </p>
        </div>

        <div>
          <p className="mb-2">❤️ <strong>Our YouTube Channel</strong></p>
          <p className="ml-6">
            Short videos. Real voices. Brilliant ideas. Explore interviews, reflections, and messages from the Fabulous Generation.
            <br />
            <a
              href="https://youtube.com/@thefabgen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 underline text-[#ffed8f] hover:text-[#e7e1ae] transition-colors duration-300"
            >
              → youtube.com/@thefabgen
            </a>
          </p>
        </div>

        <div>
          <p className="mb-2">❤️ <strong>Fab Merch</strong></p>
          <p className="ml-6">
            Wear the message. Share the movement. Shop limited-edition designs created by and for the Fabulous Generation.
            <br />
            <a
              href="https://www.etsy.com/shop/OneZenStudio?section_id=47792784"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 underline text-[#ffed8f] hover:text-[#e7e1ae] transition-colors duration-300"
            >
              → Browse Our Merch
            </a>
          </p>
        </div>
      </motion.div>

      <div className="mt-10 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Resources;