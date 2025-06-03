import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiX, FiCopy, FiCheck } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const Spread = ({ transitionProgress }) => {
  const tweetText =
    "thefabgen is where the voices of the Fabulous Generation (b. 1988–1997) speak. Come see what they're building. @thefabgen";

  const [translateMultiplier, setTranslateMultiplier] = useState(35);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTranslateMultiplier(25);
      } else if (window.innerWidth < 768) {
        setTranslateMultiplier(28);
      } else {
        setTranslateMultiplier(20);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tweetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const scale = 1 - transitionProgress * 0.48;
  const translateY = -transitionProgress * translateMultiplier;

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center relative">
      {/* Share Popup */}
      {showSharePopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowSharePopup(false)}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setShowSharePopup(false)}
            >
              <FiX size={24} />
            </button>

            <div className="space-y-5">
              <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
                📣 Share This
              </h3>

              <p className="text-xl text-[#ffed8f] italic">Tag a Fab. Start a ripple.</p>

              <div className="space-y-4">
                <button
                  onClick={shareOnTwitter}
                  className="w-full flex items-center justify-center gap-2 bg-[#1DA1F2] py-3 rounded-lg font-medium hover:bg-[#1a91da] transition-colors"
                >
                  Share on <FaXTwitter size={20} />
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 bg-gray-800 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors text-white"
                >
                  {copied ? (
                    <>
                      <FiCheck className="text-green-400" size={20} /> Copied!
                    </>
                  ) : (
                    <>
                      <FiCopy size={20} /> Copy Text
                    </>
                  )}
                </button>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-lg mt-4">
                <p className="text-sm text-gray-400 mb-2">Suggested Tweet:</p>
                <p className="text-gray-300 italic">
                  "thefabgen is where the voices of the Fabulous Generation (b. 1988–1997) speak. Come see what
                  they're building. @thefabgen"
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

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
        <p className="text-2xl md:text-3xl lg:text-3xl mb-3 max-w-3xl mx-auto">Curious. Awake. Unapologetically real.</p>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto">See it. Share it. Be part of it.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/contribute">
            <button className="cursor-pointer bg-white text-black px-6 py-3 rounded-full text-lg md:text-xl font-semibold hover:bg-gray-200 transition">
              I'M A FAB & WANT TO CONTRIBUTE!
            </button>
          </Link>

          <button
            onClick={() => setShowSharePopup(true)}
            className="cursor-pointer bg-transparent border-2 border-white text-white px-6 py-3 rounded-full text-lg md:text-xl font-semibold hover:bg-white/10 transition"
          >
            SHARE ON SOCIAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Spread;
