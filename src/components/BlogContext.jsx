// blogcontext.jsx
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // useEffect(() => {
  //   if (hasFetched.current) return;
  //   hasFetched.current = true;

  //   const fetchBlogs = async () => {
  //     try {
  //       // Add timeout to prevent hanging indefinitely
  //       const controller = new AbortController();
  //       const timeoutId = setTimeout(() => controller.abort(), 30000);
        
  //       const res = await fetch(`${API_BASE_URL}/api/blogs?populate[0]=image`, {
  //         signal: controller.signal
  //       });
        
  //       clearTimeout(timeoutId);
        
  //       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
  //       const json = await res.json();
  //       setData(json);
  //       console.log("called once")
  //     } catch (err) {
  //       setError(err.message || "Failed to load blogs");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlogs();
  //   }, []);

  useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/blogs?populate[0]=image`);

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json = await res.json();
      setData(json);
      console.log("called once");
    } catch (err) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  fetchBlogs();
}, []);


  return (
    <BlogContext.Provider value={{ data, error, loading }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogData = () => useContext(BlogContext);