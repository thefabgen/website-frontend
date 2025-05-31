import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { MdCategory } from 'react-icons/md';
import { useBlogData } from '../components/BlogContext';

const BlogContent = ({ }) => {
  const { data: blogs, error, loading_api } = useBlogData();
  const { documentId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      if (blogs?.data) {
        const foundBlog = blogs.data.find(blog => String(blog.documentId) === documentId);
        setBlog(foundBlog);
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [documentId, blogs]);

  if (loading || loading_api) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-white border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-white text-xl">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog || error) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          The blog you're looking for doesn't exist or may have been removed.
        </p>
        <Link 
          to="/blog" 
          className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
          Browse All Blogs
        </Link>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white"
    >
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog List
        </Link>
      </div>

      {/* Blog Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {blog.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            {blog.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-400">
            <span>{formattedDate}</span>
            <span className="hidden sm:block">•</span>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{blog.time_to_read} min read</span>
            </div>
            <span className="hidden sm:block">•</span>

            <div className="flex items-center">
              <MdCategory className="w-5 h-5 mr-2"/>
              <span>{blog.category}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-5xl mx-auto px-4 mb-12"
      >
        {blog.image?.url ? (
        <img
          src={API_BASE_URL.includes("https") ? blog.image.url : `${API_BASE_URL}${blog.image.url}`}
          alt={blog.title}
          className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-xl bg-white"
        />
        ) : (
          <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-full h-[300px] md:h-[400px] flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </motion.div>

      {/* Blog Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-5xl mx-auto px-4 pb-16 text-left"
      >
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-dark.min.css" 
        />
    <div className="markdown-body p-4 bg-gray-800 rounded-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {blog.content}
      </ReactMarkdown>
    </div>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default BlogContent;