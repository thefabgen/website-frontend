// src/pages/ContentSubmission.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MDEditor from "@uiw/react-md-editor";
import { 
  FiUpload, 
  FiArrowLeft, 
  FiVideo, 
  FiType, 
  FiUser,
  FiCalendar,
  FiGlobe,
  FiMail,
  FiMessageSquare,
  FiInstagram,
  FiCheckSquare,
  FiExternalLink
} from "react-icons/fi";
import ReCAPTCHA from "react-google-recaptcha";
import Toast from "../components/Toast";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const ContentSubmission = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthYear: "",
    country: "",
    email: "",
    source: "",
    social: "",
    title: "",
    videoFile: null,
    textContent: "",
    agreeTerms: false,
    firstNameOnly: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const fileInputRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Add timeout to toast
  useEffect(() => {
    let timer;
    if (toast.show) {
      timer = setTimeout(() => {
        setToast({...toast, show: false});
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [toast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setFormData(prev => ({ ...prev, videoFile: file }));
    } else {
      showToast("Please upload a valid video file", "error");
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const subscribeToMailchimp = async (email,strapi="testlink.com") => {
    const formData = new FormData();
    formData.append("EMAIL", email);
    // formData.append("MMERGE1", strapi);
    formData.append("MMERGE7", strapi);
    // formData.append("tags","14035488")
    formData.append("tags","4474407")

    try {
      await fetch(
        // "https://test.us10.list-manage.com/subscribe/post?u=a64da97ea7d5767a1e6f9818b&id=f5a50b6a3a&f_id=008e8de3f0",
        "https://thefabgen.us4.list-manage.com/subscribe/post?u=ead7fd9c1fb50dfea37c96061&id=3993a95998&f_id=00076ae3f0",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );
    } catch (error) {
      console.error("Mailchimp subscription error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'birthYear', 
      'country', 'email', 'source', 'agreeTerms'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    
    // Validate at least one submission type
    if (!formData.videoFile && !formData.textContent.trim()) {
      showToast("Please provide either a video or written content", "error");
      return;
    }
    
    // Validate recaptcha
    if (!recaptchaToken) {
      showToast("Please complete the CAPTCHA verification", "error");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Add to Mailchimp
      
      let videoUrl = null;

      // Video upload logic if video exists
      if (formData.videoFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("files", formData.videoFile, formData.videoFile.name);

        const uploadResponse = await fetch(`${API_BASE_URL}/api/upload`, {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error?.message || "Video upload failed");
        }

        if (uploadResult && uploadResult.length > 0 && uploadResult[0].url) {
          videoUrl = uploadResult[0].url;
        }
      }

      // Prepare contribution data
      const contributionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthYear: formData.birthYear,
        country: formData.country,
        email: formData.email,
        source: formData.source,
        social: formData.social,
        title: formData.title,
        firstNameOnly: formData.firstNameOnly,
        // Include text if provided
        ...(formData.textContent.trim() && { text: formData.textContent }),
        // Include video URL if provided
        ...(videoUrl && { video_url: videoUrl }),
      };

      // Submit contribution
      const response = await fetch(`${API_BASE_URL}/api/contributions`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
          // "Recaptcha-Token": recaptchaToken
        },
        body: JSON.stringify({ data: contributionData })
      });
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error?.message || "Submission failed");
      }
      const data = await response.json();
      console.log(data)
      await subscribeToMailchimp(formData.email, `https://growing-egg-699bc403ad.strapiapp.com/admin/content-manager/collection-types/api::contribution.contribution/${data.data.documentId}?status=published`);


      showToast("Thank you for your submission!", "success");
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        birthYear: "",
        country: "",
        email: "",
        source: "",
        social: "",
        title: "",
        videoFile: null,
        textContent: "",
        agreeTerms: false,
        firstNameOnly: false
      });
      setRecaptchaToken(null);
    } catch (error) {
      showToast(error.message || "Submission failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate birth years from 1988 to 1997
  const birthYears = Array.from({ length: 10 }, (_, i) => 1988 + i);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center text-white relative overflow-x-hidden">
      <Link to="/" className="group">
        <motion.h1 className="header-main font-extrabold relative top-3 left-1/2 -translate-x-1/2 text-3xl md:text-4xl z-20 text-white">
          thefabgen
        </motion.h1>
      </Link>

      <div className="w-full max-w-4xl px-4 py-8">
        <Link 
          to="/contribute" 
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to Contribute
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Share Your Voice</h2>
          <p className="text-gray-400 mb-8">
            Submit your contribution! You can provide a video, story or both.
          </p>

          {toast.show && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
            />
          )}

          <div className="mb-8 text-left">
            <p className="mb-4">
              Thank you for your interest in being featured on @thefabgen. If you were born between 1988 and 1997 and have a personal reflection or video you'd like to share, we’d love to hear from you.
            </p>
            
            <p className="mb-4">
              We’re especially interested in your unique voice and lived experience related to:
              division & unity, technology, art, science, women empowerment, or spirituality. Please submit one piece at a time.
            </p>
            
            <p className="font-medium mb-2">Tone & Vibe We’re Looking For:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Natural. Unscripted. Soulful.</li>
              <li>Not generic. Share something real. What are you seeing, experiencing, or learning?</li>
            </ul>
            
            <p>
              Whether poetic, reflective, or raw, your authentic voice is what matters most.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className=" text-lg mb-2 flex items-center">
                  <FiUser className="mr-2" /> First Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your first name"
                  required
                />
              </div>
              
              <div>
                <label className=" text-lg mb-2 flex items-center">
                  <FiUser className="mr-2" /> Last Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your last name"
                  required
                />
              </div>
              
              <div>
                <label className=" text-lg mb-2 flex items-center">
                  <FiCalendar className="mr-2" /> Birth Year <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  <option value="">Select your birth year</option>
                  {birthYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className=" text-lg mb-2 flex items-center">
                  <FiGlobe className="mr-2" /> Country <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Your country"
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-lg mb-2 flex items-center">
                  <FiMail className="mr-2" /> Email <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className=" text-lg mb-2 flex items-center text-left md:text-center">
                  <FiMessageSquare className="mr-2" /> How did you hear about thefabgen? <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Friend">Friend</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className=" text-lg mb-2 flex items-center">
                  <FiInstagram className="mr-2" /> Social Handles
                </label>
                <input
                  type="text"
                  name="social"
                  value={formData.social}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="@yourhandle (optional)"
                />
              </div>
            </div>

            {/* Submission Content */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className=" text-lg mb-2 flex items-center">
                  <FiType className="mr-2" /> Title of Your Reflection
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Title for your submission (optional)"
                />
              </div>
              
              {/* Video Upload */}
              <div>
                <label className=" text-lg mb-2 flex items-center">
                  <FiVideo className="mr-2" /> Upload Video (1-3 mins)
                </label>
                <div 
                  className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FiUpload className="text-3xl mx-auto text-gray-500 mb-3" />
                  <p className="text-gray-400 mb-2">
                    {formData.videoFile ? formData.videoFile.name : "Click to select a video file"}
                  </p>
                  <p className="text-sm text-gray-500">
                    MP4, MOV, AVI (Max 100MB) - Optional
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                  />
                </div>
              </div>
              
              {/* Markdown Editor */}
              <div>
                <label className=" text-lg mb-2 flex items-center text-left md:text-center">
                  <FiType className="mr-2" /> Your Written Reflection (300-1,500 words)
                </label>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <MDEditor
                    value={formData.textContent}
                    onChange={(value) => setFormData(prev => ({ ...prev, textContent: value }))}
                    height={300}
                    preview="edit"
                    className="text-white"
                    data-color-mode="dark"
                    placeholder="Share your thoughts, experiences, or reflections (optional)"
                  />
                  <div className="mt-2 text-sm text-gray-400 px-3 pb-2">
                    <p>Supports Markdown formatting</p>
                    <p>Word count: {formData.textContent.split(/\s+/).filter(Boolean).length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 mr-3 w-5 h-5 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                  required
                />
                <label htmlFor="agreeTerms" className="text-gray-300 text-left md:text-center">
                  I agree to the <button 
                    type="button" 
                    className="text-yellow-400 hover:underline text-left md:text-center"
                    onClick={() => setShowTermsModal(true)}
                  >
                    Contributor Release Terms <FiExternalLink className="inline ml-1" />
                  </button> <span className="text-red-500">*</span>
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="firstNameOnly"
                  id="firstNameOnly"
                  checked={formData.firstNameOnly}
                  onChange={handleChange}
                  className="mt-1 mr-3 w-5 h-5 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500"
                />
                <label htmlFor="firstNameOnly" className="text-gray-300 text-left md:text-center">
                  I prefer to be credited by first name only
                </label>
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="py-4">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={token => setRecaptchaToken(token)}
                onExpired={() => setRecaptchaToken(null)}
                theme="dark"
                size="normal"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-bold transition-colors cursor-pointer ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "border-2 border-yellow-500 bg-gray-800 hover:bg-gray-900 text-white"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Contribution"}
            </button>
          </form>
        </motion.div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Your voice matters. Thank you so much for contributing.</p>
        </div>
      </div>

      <Footer className="mt-auto" />

      {/* Terms Modal */}
      <Modal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)}>
        <div className="bg-gray-900 text-white rounded-lg p-6 max-w-3xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-2xl font-bold mb-4">thefabgen: CONTRIBUTOR RELEASE AGREEMENT</h3>
          
          <div className="space-y-4 text-left">
            <p>
              By checking box, you confirm that:
            </p>
            
            <p>
              <strong>1.</strong> You grant permission for your submitted content (written, spoken, visual, or recorded) to be published and shared across platforms associated with thefabgen, including but not limited to books, social media, blog posts, newsletters, and promotional materials.
            </p>
            
            <p>
              <strong>2.</strong> You allow your name, birth year, country, and social media handles (if provided) to appear alongside your contribution. If you prefer to use only your first name, please indicate in the appropriate field.
            </p>
            
            <p>
              <strong>3.</strong> You understand your contribution(s) may be edited for clarity, format, or tone, but your voice and message will be preserved with the utmost care..
            </p>
            <p>
              <strong>4.</strong> You confirm that your submission is your original work, not created by AI,  and that you have the right to share it.
            </p>
            
            <p>
              <strong>5.</strong> You understand that your contribution is considered final and that you release thefabgen from any future claims related to its use.
            </p>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowTermsModal(false)}
              className="px-6 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContentSubmission;