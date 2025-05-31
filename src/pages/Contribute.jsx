import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FiVideo, FiPenTool, FiShare2, FiDollarSign , FiUserCheck } from "react-icons/fi";
import { FcCollaboration } from "react-icons/fc";
import { useState } from "react";
import { useMailchimpSubscribe } from "../hooks/useMailChimpSubscribe";
import Toast from "../components/Toast";


const Contribute = ({ introFinished }) => {
  const contributionMethods = [
    {
      icon: <FiPenTool />,
      title: "Share Your Voice",
      content: "Write a personal reflection for our blog or upcoming books. It can be what you see about the world, a shift you've experienced, or something meaningful to you.",
      color: "text-purple-400",
      link: "/submission"  // Added link property
    },
    {
      icon: <FiVideo />,
      title: "Submit a Video",
      content: "Record a short video (1–3 minutes) sharing something that matters to you—what you're questioning, creating, learning, or becoming.",
      color: "text-blue-400",
      link: "/submission"  // Added link property
    },
    {
      icon: <FiDollarSign />,
      title: "Support the Mission",
      content: "This is an independent project with no outside funding. If you want to help keep it alive and expanding, click here to make a donation.",
      color: "text-green-400",
      link: "/support"  // Added link property
    },
    {
      icon: <FiUserCheck />,
      title: "Mentor Moments",
      content: "Offer a short piece of advice, a lesson learned, or something you wish someone told you earlier. Your words could guide someone else.",
      color: "text-lime-500",
      link: "/submission"  // Added link property
    },
    {
      icon: <FiShare2 />,
      title: "Spread the Word",
      content: "Follow us on Instagram and YouTube @thefabgen, and tag a friend who's part of this generation. The ripple effect is real.",
      color: "text-pink-400",
      social: [
        { name: "Instagram", link: "https://www.instagram.com/thefabgen" },
        { name: "YouTube", link: "https://www.youtube.com/@thefabgen" }
      ]
    },
    {
      icon: <FcCollaboration />,
      title: "Future Collabs",
      content: "We're dreaming up workshops and creative collaborations. If you're a Fab working on something aligned—art, tech, science, storytelling—reach out.",
      color: "text-yellow-400"
    }
  ];
    const [email, setEmail] = useState("");
  const { subscribe, status, message } = useMailchimpSubscribe();

  const handleSubmit = (e) => {
    e.preventDefault();
    subscribe(email);
    setEmail("");
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center text-white relative overflow-x-hidden">
      <Link to="/" className="group">
        <motion.h1
          className={`header-main font-extrabold relative top-3 left-1/2 -translate-x-1/2 text-3xl md:text-4xl z-20 text-white 
          transition-all duration-700 ease-in-out
          ${introFinished ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          thefabgen
        </motion.h1>
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center px-4 mt-12 md:mt-20"
      >
        <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto leading-relaxed">
          <span className="text-[#ffed8f]">thefabgen</span> isn’t just a platform. It’s a living archive of voices, visions, and values from a generation wired for change.
        </p>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-blue-200">
          Here are a few ways to get involved
        </p>
      </motion.section>

      <div className="w-full max-w-6xl px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 justify-items-center">
        {contributionMethods.map((method, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.2 }}
            className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 
              border border-white group relative ${index < 4 ? 'cursor-pointer' : ''}`}
          >
            {/* Wrap card content in Link for first 4 cards */}
            {index < 4 ? (
              <Link to={method.link} className="absolute inset-0 z-10" aria-label={method.title} />
            ) : null}
            
            <div className={`text-4xl mb-4 ${method.color} transition-colors`}>
              {method.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{method.title}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">{method.content}</p>

            {method.social && (
              <div className="mt-4 space-y-2">
                {method.social.map((platform, i) => (
                  <div key={i} className="flex justify-center">
                    <a
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="text-sm">{platform.name}</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16 px-4 w-full max-w-6xl"
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:items-center">
          {/* Contribute Button Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Contribute?</h2>
            <p className="text-xl mb-6 max-w-xl mx-auto">
              Complete this Google Form to let us know how you would like to contribute.
            </p>
            <div className="flex justify-center">
              <Link to="/submission"
                className="flex items-center px-8 py-4 rounded-full bg-gray-400 text-black font-bold
                  transition-colors hover:bg-gray-300"
              >
                <FiPenTool className="mr-2" /> Contribute
              </Link>
            </div>
          </div>

          <div className="hidden lg:block h-64 w-px bg-gray-600 mt-12 mx-4"></div>
          
          <div className="w-full h-px bg-gray-600 my-4 lg:hidden"></div>

          {/* Email Subscription Section */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            {status && (
              <div className="mb-6">
                <Toast message={message} type={status} />
              </div>
            )}
            
            <h2 className="text-3xl md:text-4xl mb-8">Sign up for the latest news</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="contribute-email" className="block text-center text-lg font-medium text-gray-200">
                Make your inbox more interesting by hearing what the Fabs are up to.
              </label>
              <p className="text-center text-md text-gray-400 mt-2">
                No spam ever.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="contribute-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-lg ring-2 ring-yellow-200 outline-none bg-gray-800 text-white"
                  placeholder="Your email address"
                  required
                />
                <button
                  type="submit"
                  className="cursor-pointer px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:opacity-90 transition duration-200 whitespace-nowrap"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>

      <Footer className="mt-auto" />
    </div>
  );
};

export default Contribute;