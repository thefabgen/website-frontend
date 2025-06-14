// src/pages/SupportMission.jsx
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Link, useLocation  } from "react-router-dom";
import { FiArrowUpRight,FiArrowLeft, FiHeart, FiDollarSign, FiUser, FiMail, FiX } from "react-icons/fi";
import { useRef, useState } from "react";

const SupportMission = () => {
  const footerRef = useRef(null);
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText('0xb06E341cBE4e26391e2F0625F31E5A0b35eF20a9');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const location = useLocation();
  const from = location.state?.from || '/';

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center text-white relative overflow-x-hidden">
      {/* Crypto Modal */}
      {showCryptoModal && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    onClick={() => setShowCryptoModal(false)}
  >
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gray-900 text-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={() => setShowCryptoModal(false)}
      >
        <FiX size={24} />
      </button>

      <h3 className="text-2xl font-bold mb-4 md:text-3xl flex text-left gap-2 ">
        🌐 Support the Mission with Crypto
      </h3>

      <div className="space-y-4 text-left md:text-xl">
        <p>
          If you'd like to support <strong>thefabgen</strong> using cryptocurrency, you can send
          directly to the wallet address below. Every contribution helps amplify real voices
          and build something meaningful.
        </p>

        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-1 md:text-xl">Wallet Address (Ethereum):</p>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <code className="text-[#ffed8f] break-all text-sm md:text-xl">
              0xb06E341cBE4e26391e2F0625F31E5A0b35eF20a9
            </code>
            <button
              onClick={copyAddress}
              className={`px-3 py-2 rounded-lg min-w-[100px] ${
                copied
                  ? 'bg-green-500 text-black'
                  : 'bg-[#ffed8f] text-black hover:bg-[#e7d77a]'
              } transition-colors`}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-400 md:text-xl">
          This wallet accepts ETH and ERC-20 tokens.
        </p>

        <p className="pt-4 border-t border-gray-800 text-[#ffed8f] text-left md:text-xl">
          Thank you for believing in the mission.
        </p>
      </div>
    </motion.div>
  </motion.div>
)}


      <Link to="/" className="group">
        <motion.h1
          className="header-main font-extrabold relative top-3 left-1/2 -translate-x-1/2 text-3xl md:text-4xl z-20 text-white"
        >
          thefabgen
        </motion.h1>
      </Link>

      <div className="w-full max-w-4xl px-4 py-6 md:py-10">
        <Link
          to={from}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Support the Mission</h1>
          <h2 className="text-xl md:text-2xl text-[#ffed8f]">Help Amplify Voices. Fuel the Movement.</h2>
        </motion.div>

        <div className="space-y-8 text-lg text-left">
          <p>
            thefabgen was created to spotlight a special generation whose voices need to be heard. Born between 1988 and 1997, the Fabulous Generation is full of deep thinkers, visionaries, creators, and disruptors. Their insights matter and can potentially change the world.
          </p>

          <p>
            Every story you read, every video you watch, every piece of content on thefabgen has been created with love, purpose, and a shoestring budget.
          </p>

          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FiHeart className="mr-2 text-red-400" /> Your support helps us:
            </h3>
            <ul className="list-disc pl-6 space-y-3 text-left">
              <li>Commission more personal reflections from global Fabs</li>
              <li>Produce original videos and content rooted in lived experience</li>
              <li>Pay creatives, writers, translators, and editors fairly</li>
              <li>Host and maintain this platform for a wider reach</li>
              <li>Continue amplifying voices that bring light to the world</li>
            </ul>
          </div>

          <p>
            Whether it's $10 or $3M, your contribution goes toward keeping thefabgen alive and expanding.
          </p>

          <p className="text-xl font-bold text-center italic">
            It's not just a donation. It's support for what matters.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="https://account.venmo.com/u/thefabgen"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-teal-500 text-teal-500 py-4 px-6 rounded-lg text-center hover:bg-teal-500 hover:text-black transition-colors flex items-center justify-center"
          >
            <FiDollarSign className="mr-2" /> Venmo <FiArrowUpRight className="ml-2" />
          </a>
          <button
            onClick={() => setShowCryptoModal(true)}
            className="border-2 border-purple-500 text-purple-500 py-4 px-6 rounded-lg text-center hover:bg-purple-500 hover:text-black transition-colors flex items-center justify-center"
          >
            <FiDollarSign className="mr-2" /> Crypto
          </button>
          <a
            href="https://docs.google.com/forms/d/1xIMJn05HW676DBzJ4yJiXGAosKnYTUh_V8a7LUAiwQI/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-blue-500 text-blue-500 py-4 px-6 rounded-lg text-center hover:bg-blue-500 hover:text-black transition-colors flex items-center justify-center"
          >
            <FiDollarSign className="mr-2" /> Other Options <FiArrowUpRight className="ml-2" />
          </a>
        </div>

        <div className="mt-16 bg-gray-900/50 border border-gray-700 rounded-xl p-5 md:p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Prefer to sponsor a specific story or project?
          </h3>
          <p className="text-center">
            We'd love to hear from you.{" "}
            <a
            href="https://docs.google.com/forms/d/1xIMJn05HW676DBzJ4yJiXGAosKnYTUh_V8a7LUAiwQI/viewform?edit_requested=true"
            target="_blank"
            rel="noreferrer"
              className="cursor-pointer underline text-[#ffed8f] hover:text-[#e7e1ae] transition-colors"
            >
              Contact us
            </a>{" "}
            for custom collaborations or larger gifts.
          </p>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl mb-6">
            Thank you for believing in this work! Thank you for seeing the brilliance in this generation!!
          </p>
          <p className="text-lg">
            With Gratitude,<br />
            <span className="font-bold">AnneMarie</span><br />
            The Fab Mama
          </p>
        </div>
      </div>

      <div ref={footerRef} className="w-full">
        <Footer className="mt-auto" />
      </div>
    </div>
  );
};

export default SupportMission;