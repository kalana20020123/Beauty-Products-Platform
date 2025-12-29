import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import CommentSlideshow from "../../components/commentSlideshow";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", comment: "" });
  const [comments, setComments] = useState([]);

  const nameRef = useRef(null);
  const commentRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/contacts/all");
      setComments(response.data);
    } catch (error) {
      toast.error("Failed to load comments.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/contacts/submit", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message);
      setComments([...comments, formData]);
      setFormData({ name: "", comment: "" });
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center relative px-4 sm:px-6 md:px-10"
      style={{
        backgroundImage: 'url("/background2.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contact Info */}
      <div className="relative mt-6 text-gray-100 space-y-5 text-base sm:text-lg p-2 sm:p-4 w-full max-w-xl">
        <h3 className="text-xl sm:text-2xl font-semibold text-secondary mb-4 text-center">Reach Out to Us</h3>
        <div className="flex items-center space-x-3">
          <FaPhoneAlt className="text-secondary" />
          <span>0771670585</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaEnvelope className="text-secondary" />
          <span>kasunsagara689@gmail.com</span>
        </div>
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-secondary" />
          <span>74 A, Ridivita, Hiramadagama, Kahawaththa</span>
        </div>
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-2 hover:text-accent transition duration-300">
            <FaWhatsapp className="text-secondary" />
            <span>WhatsApp</span>
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-2 hover:text-accent transition duration-300">
            <FaFacebook className="text-secondary" />
            <span>Facebook</span>
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <h3 className="relative text-xl sm:text-2xl font-semibold text-secondary mb-4 p-2 sm:p-4 text-center">We’d Love to Hear from You</h3>
      <div className="relative bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-lg rounded-2xl p-4 sm:p-8 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, commentRef)}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Comment</label>
            <textarea
              ref={commentRef}
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Enter your comment"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm sm:text-base"
              rows="2"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded-lg text-base sm:text-lg font-semibold hover:bg-accent transition duration-300 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 p-3 mt-4 shadow-md transform hover:scale-105"
          >
            Send Comment
          </button>
        </form>
      </div>

      <CommentSlideshow comments={comments} />
    </div>
  );
}
