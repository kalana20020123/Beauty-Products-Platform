import axios from 'axios';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { BsGoogle } from 'react-icons/bs';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import { clearCart } from '../utils/cartFunction';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef(null);

  function handleKeyDown(event, nextInputRef) {
    if (event.key === 'Enter') {
      nextInputRef?.current?.focus();
    }
  }

  function login() {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      toast.error('Backend URL not configured');
      setLoading(false);
      return;
    }

    axios.post(backendUrl + "/api/users/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data.user == null) {
        toast.error(res.data.message);
        setLoading(false);
        return;
      }
      toast.success('Login successful!');

      // Clear cart when a new user logs in
      clearCart();

      localStorage.setItem('token', res.data.token);
      if (res.data.user.type === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      toast.error('Login failed. Please try again.');
      setLoading(false);
    });
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        toast.error('Backend URL not configured');
        return;
      }
      axios.post(backendUrl + "/api/users/googleLogin", {
        token: res.access_token
      })
      .then((response) => {
        if (response.data.message === "User logged in") {
          // Clear cart when a new user logs in via Google
          clearCart();
          
          localStorage.setItem("token", response.data.token);
          toast.success("Login via Google successful!");

          if (response.data.user.type === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        } else {
          toast.error("Login failed. Please sign up first.");
        }
      })
      .catch((error) => {
        console.error("Google login error:", error);
        toast.error("An error occurred during Google login.");
      });
    }
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center py-12 px-4" style={{ minHeight: '100vh', width: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full mb-6">
            <FaLock className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); login(); }}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-500" />
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  onKeyDown={(e) => handleKeyDown(e, passwordInputRef)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800 placeholder-gray-400"
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') login();
                  }}
                  ref={passwordInputRef}
                  className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-pink-200 transition-all text-gray-800 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <button
              onClick={login}
              type="button"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
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
              onClick={() => googleLogin()} 
              type="button" 
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-rose-500 text-rose-500 font-semibold py-4 rounded-xl hover:bg-amber-50 transform transition-all duration-300 hover:scale-105 shadow-md"
            >
              <BsGoogle className="text-xl" />
              Continue with Google
            </button>

            <div className="text-center pt-4">
              <span className="text-sm text-gray-600">Don't have an account?</span>
              <Link
                to="/signup"
                className="ml-2 text-rose-500 hover:text-pink-500 font-semibold transition-colors"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
