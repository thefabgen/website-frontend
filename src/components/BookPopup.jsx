// src/components/BookPopup.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const BookPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const formData = new FormData();
      formData.append("EMAIL", email);
      formData.append("tags", "4474408");

      await fetch(
        "https://thefabgen.us4.list-manage.com/subscribe/post?u=ead7fd9c1fb50dfea37c96061&id=3993a95998&f_id=00066ae3f0",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      setSubmitStatus("success");
      setSubmitMessage("You're subscribed! We'll notify you when the book is available.");
      setEmail("");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Subscription failed. Please try again.");
    } finally {
      setIsLoading(false);

      setTimeout(() => {
        setSubmitStatus(null);
        setSubmitMessage("");
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <FiX size={24} />
        </button>

        <div className="space-y-5">
          <h3 className="text-2xl font-bold text-[#ffed8f]">Coming Soon!</h3>

          <p className="text-gray-300">
            <em>Fabulous AF: 9 Years of Potential</em> is coming soon.
            Be the first to know when it's available.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ffed8f]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-[#ffed8f] text-black hover:bg-[#e7d77a]'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : "Notify Me"}
            </button>

            {submitStatus && (
              <div className={`text-center py-2 px-4 rounded-lg ${
                submitStatus === 'success'
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-red-900/30 text-red-400'
              }`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookPopup;