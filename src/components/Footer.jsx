import { SocialIcon } from 'react-social-icons'
import Container from './Container';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useMailchimpSubscribe } from "../hooks/useMailChimpSubscribe";
import Toast from "./Toast";
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState("");
  const { subscribe, status, message } = useMailchimpSubscribe();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    subscribe(email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white py-8 w-full ">
      {status && <Toast message={message} type={status} />} 
      <Container>
        <div className="flex flex-col space-y-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-amber-300 bg-clip-text text-transparent">
              thefabgen
            </div>
            
            <div className="flex space-x-4">
              <SocialIcon 
                network='youtube'
                href="https://www.youtube.com/@thefabgen" 
                className="!h-8 !w-8 transition hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              />
              <SocialIcon 
                network="instagram"
                href="https://www.instagram.com/thefabgen" 
                className="!h-8 !w-8 transition hover:opacity-80"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>
          
          <div className="h-px w-full bg-gray-600" />
          
          {/* Mailchimp Form */}
          <div className={`max-w-xl mx-auto w-full ${location.pathname == "/contribute" || location.pathname == "/submission"?'hidden':'block'}`}>
            <form onSubmit={handleSubmit} className={`space-y-2`}>
              <label htmlFor="email" className="block text-center text-sm font-medium text-gray-200">
                Make your inbox more exciting
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-lg ring-2 ring-yellow-200 outline-none text-white"
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
          
          <div className={`h-px w-full bg-gray-600 ${location.pathname == "/contribute" || location.pathname == "/submission"?'hidden':'block'}`} />
          
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-base">
              <Link to="/" className="hover:text-gray-300 transition-colors">HOME</Link>
              <Link to="/about" className="hover:text-gray-300 transition-colors">ABOUT</Link>
              <Link to="/resources" className="hover:text-gray-300 transition-colors">RESOURCES</Link>
              <Link to="/contribute" className="hover:text-gray-300 transition-colors">CONTRIBUTE</Link>
              <Link to="/blog" className="hover:text-gray-300 transition-colors">BLOG</Link>
              <Link to="/support" className="hover:text-gray-300 transition-colors">SUPPORT THE MISSION</Link>
            </div>
            
            <div className="text-sm text-gray-400 mt-2 md:mt-0">
              © {new Date().getFullYear()} thefabgen. All rights reserved.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;