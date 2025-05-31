import React from 'react';
import ReactDOM from 'react-dom/client';
import WrappedApp from './App.jsx'; // Import the WrappedApp
import './index.css'; // Your global CSS/Tailwind imports
import { BlogProvider } from './components/BlogContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BlogProvider>
    <WrappedApp />
  </BlogProvider>
  </React.StrictMode>,
);