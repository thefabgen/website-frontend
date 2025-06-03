import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { motion, AnimatePresence } from 'framer-motion';
import { MdCategory } from "react-icons/md";
import { useBlogData } from './BlogContext';

const Blogs = ({ transitionProgress }) => {
  const { data: blogs, error, loading } = useBlogData();
  const [translateMultiplier, setTranslateMultiplier] = useState(30);
  const [translateScale, settranslateScaler] = useState(0.4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) {
        setTranslateMultiplier(32);
        settranslateScaler(0.8);
      } else if (window.innerWidth < 540) {
        setTranslateMultiplier(28);
        settranslateScaler(0.55);
      } else if (window.innerWidth < 768) {
        setTranslateMultiplier(30);
        settranslateScaler(0.45);
      } else if (window.innerWidth < 1380) {
        setTranslateMultiplier(15);
        settranslateScaler(0.7);
      } else {
        setTranslateMultiplier(25);
        settranslateScaler(0.4);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading){
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center text-black">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Voices from the Fabs</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Personal reflections
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-xl">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error){
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center text-black">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Voices from the Fabs</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Personal reflections
          </p>
          <p className="text-lg text-gray-500 mt-6">
            Internal Server Error, Couldn't load Blogs.
          </p>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs?.data?.filter(blog => blog.ShowThisBlogInHome === true) || [];
  const totalBlogs = filteredBlogs.length;

  const scale = 1 - transitionProgress * translateScale;
  const translateY = -transitionProgress * translateMultiplier;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalBlogs);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalBlogs) % totalBlogs);
  };

  const currentBlog = filteredBlogs[currentIndex];

  if (!currentBlog) return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center text-black">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Voices from the Fabs</h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          Personal reflections 
        </p>
        <p className="text-lg text-gray-500 mt-6">
          No blogs to display at the moment
        </p>
      </div>
    </div>
  );

  const formattedDate = new Date(currentBlog.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center text-black">
      <div
        className="w-full max-w-4xl px-4"
        style={{ transform: `scale(${scale}) translateY(${translateY}em)` }}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Voices from the Fabs</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Personal reflections
          </p>
        </div>
        
        <center>
          <Link to="/blog" className='cursor-pointer'>
            <button className="cursor-pointer mb-6 bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md sm:hidden">
              Explore All Our Blogs
            </button>
          </Link>
        </center>

        {/* Card Navigation Buttons */}
        <div className="flex justify-between items-center mb-6 px-2">
          <button
            onClick={handlePrev}
            className="text-xl p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            aria-label="Previous blog"
          >
            <GrCaretPrevious className="w-6 h-6" />
          </button>
          
          <Link to="/blog" className='cursor-pointer hidden sm:block'>
            <button className="cursor-pointer bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md flex items-center">
              <span>Explore All Our Blogs</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
          
          <button
            onClick={handleNext}
            className="text-xl p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            aria-label="Next blog"
          >
            <GrCaretNext className="w-6 h-6" />
          </button>
        </div>

        {/* Single Blog Card */}
        <Link to={`/blog/${currentBlog.documentId}`} className="block">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ 
                opacity: 0,
                x: direction === 1 ? 100 : direction === -1 ? -100 : 0
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ 
                opacity: 0,
                x: direction === 1 ? -100 : direction === -1 ? 100 : 0
              }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:h-72 relative">
                <div className="w-full sm:w-1/2 h-64 sm:h-full overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                    src={API_BASE_URL.includes("https") ? currentBlog.image.url : `${API_BASE_URL}${currentBlog.image.url}`}
                    alt={currentBlog.title}
                  />
                </div>
                
                <div className="p-6 sm:w-1/2 flex flex-col relative justify-center">
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    {formattedDate}
                  </div>
                  
                  <h3 className="font-bold text-3xl md:text-4xl mb-3 lg:mt-10 pr-10 md:pr-7 line-clamp-1 mt-10">{currentBlog.title}</h3>
                  <p className="text-gray-600 text-lg mb-4 flex-grow">{currentBlog.description}</p>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mt-auto">
                    <div className="flex items-center text-gray-700 group">
                      <span className="font-medium group-hover:text-black transition-colors">Read more</span>
                      <svg 
                        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>

                    <div className="flex items-center text-gray-500 mt-4 sm:mt-0 sm:ml-auto">
                      <MdCategory  className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium md:text-lg">{currentBlog.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
