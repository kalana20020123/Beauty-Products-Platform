import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaWhatsapp, FaInstagram, FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
import CommentSlideshow from "../../components/commentSlideshow";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", comment: "" });
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const commentRef = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        return;
      }
      const response = await axios.get(backendUrl + "/api/contacts/all");
      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      setComments([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        toast.error("Backend URL not configured");
        setLoading(false);
        return;
      }
      const response = await axios.post(backendUrl + "/api/contacts/submit", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message || "Thank you for your message!");
      setComments([...comments, formData]);
      setFormData({ name: "", comment: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-beauty-cream via-white to-beauty-cream py-12">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush mx-auto mt-4"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <a href="tel:0761774000" className="text-gray-600 hover:text-beauty-dusty-rose transition-colors">
                      0761774000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <a href="mailto:kalanasandeep345@gmail.com" className="text-gray-600 hover:text-beauty-dusty-rose transition-colors break-all">
                      kalanasandeep345@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                    <p className="text-gray-600">
                      Colombo
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-beauty-blush/20">
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, commentRef)}
                  placeholder="Enter your name"
                  className="w-full p-4 border-2 border-beauty-blush/30 rounded-xl focus:outline-none focus:border-beauty-dusty-rose focus:ring-2 focus:ring-beauty-blush/20 transition-all text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  ref={commentRef}
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Enter your message..."
                  className="w-full p-4 border-2 border-beauty-blush/30 rounded-xl focus:outline-none focus:border-beauty-dusty-rose focus:ring-2 focus:ring-beauty-blush/20 transition-all text-gray-800 placeholder-gray-400 resize-none"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush hover:from-beauty-blush hover:to-beauty-dusty-rose text-white font-semibold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Customer Reviews Section */}
        {comments.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                What Our Customers Say
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush mx-auto"></div>
            </div>
            <CommentSlideshow comments={comments} />
          </div>
        )}
      </div>
    </div>
  );
}
