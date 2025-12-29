import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaInfoCircle, FaPhone, FaShoppingCart, FaSignInAlt, FaUserPlus, FaUserCircle, FaUser, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    toast.success("Logged out successfully!");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-secondary w-full h-[100px] flex items-center shadow-lg px-6 lg:px-12 relative">
      <img src="/logo1.png" className="cursor-pointer h-full rounded-full" alt="Logo" />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="text-white text-2xl ml-auto lg:hidden"
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-20 ml-auto">
        <Link to="/" className="text-white font-bold text-xl flex items-center gap-2 hover:border-b-4 hover:border-b-white transition-all duration-200">
          <FaHome /> Home
        </Link>
        <Link to="/products" className="text-white font-bold text-xl flex items-center gap-2 hover:border-b-4 hover:border-b-white transition-all duration-200">
          <FaBox /> Products
        </Link>
        <Link to="/about" className="text-white font-bold text-xl flex items-center gap-2 hover:border-b-4 hover:border-b-white transition-all duration-200">
          <FaInfoCircle /> About Us
        </Link>
        <Link to="/contact" className="text-white font-bold text-xl flex items-center gap-2 hover:border-b-4 hover:border-b-white transition-all duration-200">
          <FaPhone /> Contact Us
        </Link>
        <Link to="/cart" className="text-white font-bold text-xl flex items-center gap-2 hover:border-b-4 hover:border-b-white transition-all duration-200">
          <FaShoppingCart /> Cart
        </Link>

        {isLoggedIn ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="text-white font-bold text-xl flex items-center gap-2 hover:border-b-4 hover:border-b-white transition-all duration-200"
            >
              <FaUserCircle /> Profile
            </button>
            {showProfileDropdown && (
              <div
                className="absolute right-0 mt-2 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 shadow-md rounded-lg p-2 w-48 z-50"
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <button onClick={() => navigate("/user")} className="flex items-center gap-2 text-white font-bold hover:bg-secondary p-2 rounded-md w-full text-left">
                  <FaUser /> My Account
                </button>
                <button onClick={() => navigate("/orders")} className="flex items-center gap-2 text-white font-bold hover:bg-secondary p-2 rounded-md w-full text-left">
                  <FaShoppingBag /> My Orders
                </button>
                <button onClick={handleLogout} className="flex items-center gap-2 text-white font-bold hover:bg-secondary p-2 rounded-md w-full text-left">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="text-white font-bold text-xl flex items-center gap-2 hover:border-b-4 hover:border-b-white transition-all duration-200">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/signup" className="text-white font-bold text-xl flex items-center gap-2 hover:border-b-4 hover:border-b-white transition-all duration-200">
              <FaUserPlus /> Signup
            </Link>
          </>
        )}
      </nav>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="absolute top-[100px] left-0 w-full bg-secondary flex flex-col gap-4 p-6 lg:hidden z-50">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg flex items-center gap-2">
            <FaHome /> Home
          </Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg flex items-center gap-2">
            <FaBox /> Products
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg flex items-center gap-2">
            <FaInfoCircle /> About Us
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg flex items-center gap-2">
            <FaPhone /> Contact Us
          </Link>
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg flex items-center gap-2">
            <FaShoppingCart /> Cart
          </Link>

          {isLoggedIn ? (
            <>
              <button onClick={() => { setMobileMenuOpen(false); navigate("/user"); }} className="text-white text-lg flex items-center gap-2">
                <FaUser /> My Account
              </button>
              <button onClick={() => { setMobileMenuOpen(false); navigate("/orders"); }} className="text-white text-lg flex items-center gap-2">
                <FaShoppingBag /> My Orders
              </button>
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="text-white text-lg flex items-center gap-2">
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg flex items-center gap-2">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg flex items-center gap-2">
                <FaUserPlus /> Signup
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
