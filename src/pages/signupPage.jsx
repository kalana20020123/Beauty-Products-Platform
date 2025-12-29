import axios from 'axios';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { BsGoogle } from 'react-icons/bs';
import { FaUser, FaEnvelope, FaLock, FaImage, FaArrowRight } from 'react-icons/fa';
import uploadMediaToSupabase from '../utils/mediaUpload';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profilePicture: '',
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const profilePictureRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleKeyDown(event, nextInputRef) {
    if (event.key === 'Enter') {
      nextInputRef?.current?.focus();
    }
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadedUrl = await uploadMediaToSupabase(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: uploadedUrl,
      }));
      toast.success('Profile picture uploaded!');
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  function signup() {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      toast.error('Backend URL not configured');
      setLoading(false);
      return;
    }

    axios
      .post(backendUrl + "/api/users", {
        ...formData,
        profilePicture: formData.profilePicture
          ? formData.profilePicture
          : "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg",
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message);
          setLoading(false);
          return;
        }
        toast.success("Account created successfully!");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.error("Signup error:", err);
        toast.error("Something went wrong! Please try again.");
        setLoading(false);
      });
  }

  const googleSignup = useGoogleLogin({
    onSuccess: (res) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        toast.error('Backend URL not configured');
        return;
      }
      axios
        .post(backendUrl + "/api/users/google", {
          token: res.access_token
        })
        .then((response) => {
          if (response.data.message === "User created") {
            toast.success("Your account has been created! Please log in with Google.");
            window.location.href = response.data.redirect;
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Google signup error:", error);
          toast.error("Google signup failed. Please try again.");
        });
    }
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center py-12 px-4" style={{ minHeight: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full mb-6">
            <FaUser className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join us and start your beauty journey
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); signup(); }}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-500" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-500" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    onKeyDown={(e) => handleKeyDown(e, emailRef)}
                    ref={lastNameRef}
                    className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800 placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                  ref={emailRef}
                  className="w-full pl-12 pr-4 py-4 border-2 border-beauty-blush/30 rounded-xl focus:outline-none focus:border-beauty-dusty-rose focus:ring-2 focus:ring-beauty-blush/20 transition-all text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  onKeyDown={(e) => handleKeyDown(e, profilePictureRef)}
                  ref={passwordRef}
                  className="w-full pl-12 pr-4 py-4 border-2 border-beauty-blush/30 rounded-xl focus:outline-none focus:border-beauty-dusty-rose focus:ring-2 focus:ring-beauty-blush/20 transition-all text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="profilePicture" className="block text-sm font-semibold text-gray-700 mb-2">
                Profile Picture (Optional)
              </label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-500" />
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={profilePictureRef}
                  className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-rose-500 hover:file:bg-pink-50"
                />
                {uploading && (
                  <p className="text-sm text-rose-500 mt-2">Uploading...</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={signup}
              disabled={loading || uploading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight />
                </>
              )}
            </button>

            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-pink-200"></div>
              <span className="mx-4 text-gray-500 font-medium text-sm">OR</span>
              <div className="flex-grow border-t border-pink-200"></div>
            </div>

            <button 
              onClick={() => googleSignup()} 
              type="button" 
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-rose-500 text-rose-500 font-semibold py-4 rounded-xl hover:bg-amber-50 transform transition-all duration-300 hover:scale-105 shadow-md"
            >
              <BsGoogle className="text-xl" />
              Sign up with Google
            </button>

            <div className="text-center pt-4">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link 
                to="/login" 
                className="ml-2 text-rose-500 hover:text-pink-500 font-semibold transition-colors"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
