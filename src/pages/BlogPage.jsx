import Footer from "../components/Footer";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdCategory } from "react-icons/md";
import { useBlogData } from "../components/BlogContext";

const BlogsPage = ({ introFinished }) => {

  const { data: blogs, error, loading } = useBlogData();

  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (blogs && blogs.data) {
        setFilteredBlogs(blogs.data);
        setIsLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [blogs]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-start relative overflow-x-hidden">
      <Link to="/">
        <h1
          className={`header-main font-extrabold relative top-3 left-1/2 -translate-x-1/2 text-3xl md:text-4xl z-20 text-white 
          transition-all duration-700 ease-in-out
          ${introFinished ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          thefabgen
        </h1>
      </Link>
      
      <div className="min-h-screen bg-black w-full">
        {/* Hero Header */}
        <div className="bg-black text-white py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Voices from the Fabs
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              Personal reflections
            </motion.p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <div className="animate-pulse">
                    <div className="bg-gray-800 h-48 w-full"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-800 rounded w-5/6 mb-2"></div>
                      <div className="h-4 bg-gray-800 rounded w-3/4 mb-6"></div>
                      <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">No Blogs Found</h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-6">
                It seems there are no blogs available at the moment. Please check back later.
              </p>
              <Link 
                to="/" 
                className="inline-block px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Return Home
              </Link>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.documentId} blog={blog} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const BlogCard = ({ blog }) => {
  const [hover, setHover] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-xl bg-white border-2 border-white"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/blog/${blog.documentId}`} className="block">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {blog.image?.url ? (
            <motion.img
              animate={{ scale: hover ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
              src={API_BASE_URL.includes("https") ? blog.image.url : `${API_BASE_URL}${blog.image.url}`}
              alt={blog.title}
            />
          ) : (
            <div className="bg-gray-100 w-full h-full flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          
          {/* Date Badge */}
          <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs md:text-sm">
            {new Date(blog.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <motion.h3 
            animate={{ color: hover ? '#555' : '#000' }}
            className="text-xl md:text-2xl font-bold mb-3 line-clamp-2"
          >
            {blog.title}
          </motion.h3>
          <p className="text-gray-600 mb-4 line-clamp-3 text-base md:text-lg">
            {blog.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-gray-200 pt-4 text-gray-800 font-medium text-sm">
            {/* Read more */}
            <div className="flex items-center">
              <span className="mr-2">Read more</span>
              <motion.svg
                animate={{ x: hover ? 5 : 0 }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </div>

            {/* Category */}
            <div className="flex items-center mt-3 sm:mt-0 sm:ml-auto text-gray-500">
              <MdCategory className="w-4 h-4 mr-1" />
              <span>{blog.category}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogsPage;