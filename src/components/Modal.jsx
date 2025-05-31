// src/components/Modal.jsx
import { useEffect } from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, children }) => {
  // Close modal when pressing escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute -top-10 -right-2 text-white hover:text-gray-300 z-10"
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;