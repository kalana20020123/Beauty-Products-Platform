import axios from 'axios';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { BsGoogle } from 'react-icons/bs';
import { clearCart } from '../utils/cartFunction';  // Import clearCart function

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);

  function handleKeyDown(event, nextInputRef) {
    if (event.key === 'Enter') {
      nextInputRef?.current?.focus();
    }
  }

  function login() {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      if (res.data.user == null) {
        toast.error(res.data.message);
        return;
      }
      toast.success('Login successfully!');

      // Clear cart when a new user logs in
      clearCart();

      localStorage.setItem('token', res.data.token);
      if (res.data.user.type === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    });
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/googleLogin", {
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
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-0"
      style={{
        backgroundImage: 'url("/background5.png")', // Ensure this file is in the 'public' folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative w-full max-w-[450px] p-6 sm:p-8 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-secondary text-center mb-6">Welcome Back</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              onKeyDown={(e) => handleKeyDown(e, passwordInputRef)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
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
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>
          <button
            onClick={login}
            type="button"
            className="w-full px-4 py-2 font-semibold text-white bg-secondary rounded-lg hover:bg-accent bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 p-3 mt-4 shadow-md transition-transform transform hover:scale-105"
          >
            Login
          </button>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-700">Don’t have an account?</span>
            <Link
              to="/signup"
              className="ml-1 text-secondary hover:text-accent font-semibold transition-all duration-200"
            >
              Register
            </Link>
          </div>

          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-600 font-medium">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button 
            onClick={() => googleLogin()} 
            type="button" 
            className="w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-secondary rounded-lg hover:bg-accent bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 p-3 mt-4 shadow-md transition-transform transform hover:scale-105"
          >
            <BsGoogle className="text-lg" />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}
