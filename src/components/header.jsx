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
    <header className="bg-gradient-to-r from-beauty-dusty-rose via-beauty-blush to-beauty-peach w-full h-[100px] flex items-center shadow-xl px-4 sm:px-6 lg:px-12 relative z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="/logo1.png" className="cursor-pointer h-16 sm:h-20 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300" alt="Crystal Beauty Care Logo" />
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="text-white text-2xl ml-auto lg:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-6 ml-auto">
        <Link 
          to="/" 
          className="text-white font-semibold text-lg flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
        >
          <FaHome /> Home
        </Link>
        <Link 
          to="/products" 
          className="text-white font-semibold text-lg flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
        >
          <FaBox /> Products
        </Link>
        <Link 
          to="/about" 
          className="text-white font-semibold text-lg flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
        >
          <FaInfoCircle /> About Us
        </Link>
        <Link 
          to="/contact" 
          className="text-white font-semibold text-lg flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
        >
          <FaPhone /> Contact Us
        </Link>
        <Link 
          to="/cart" 
          className="text-white font-semibold text-lg flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105 relative"
        >
          <FaShoppingCart /> Cart
        </Link>

        {isLoggedIn ? (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="text-white font-semibold text-lg flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              <FaUserCircle className="text-xl" /> Profile
            </button>
            {showProfileDropdown && (
              <div
                className="absolute right-0 mt-2 bg-white shadow-2xl rounded-2xl p-2 w-56 z-50 border border-beauty-blush/20 backdrop-blur-md"
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <button 
                  onClick={() => { navigate("/user"); setShowProfileDropdown(false); }} 
                  className="flex items-center gap-3 text-gray-800 font-semibold hover:bg-beauty-cream p-3 rounded-xl w-full text-left transition-colors"
                >
                  <FaUser className="text-beauty-dusty-rose" /> My Account
                </button>
                <button 
                  onClick={() => { navigate("/orders"); setShowProfileDropdown(false); }} 
                  className="flex items-center gap-3 text-gray-800 font-semibold hover:bg-beauty-cream p-3 rounded-xl w-full text-left transition-colors"
                >
                  <FaShoppingBag className="text-beauty-dusty-rose" /> My Orders
                </button>
                <div className="border-t border-beauty-blush/20 my-1"></div>
                <button 
                  onClick={() => { handleLogout(); setShowProfileDropdown(false); }} 
                  className="flex items-center gap-3 text-red-600 font-semibold hover:bg-red-50 p-3 rounded-xl w-full text-left transition-colors"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link 
              to="/login" 
              className="text-white font-semibold text-lg flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
            >
              <FaSignInAlt /> Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-white text-beauty-dusty-rose font-semibold text-lg flex items-center gap-2 px-6 py-2 rounded-full hover:bg-beauty-cream transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <FaUserPlus /> Signup
            </Link>
          </>
        )}
      </nav>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="absolute top-[100px] left-0 w-full bg-gradient-to-b from-beauty-dusty-rose to-beauty-blush flex flex-col gap-2 p-6 lg:hidden z-50 shadow-2xl">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-white text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
          >
            <FaHome /> Home
          </Link>
          <Link 
            to="/products" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-white text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
          >
            <FaBox /> Products
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-white text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
          >
            <FaInfoCircle /> About Us
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-white text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
          >
            <FaPhone /> Contact Us
          </Link>
          <Link 
            to="/cart" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-white text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
          >
            <FaShoppingCart /> Cart
          </Link>

          {isLoggedIn ? (
            <>
              <div className="border-t border-white/30 my-2"></div>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate("/user"); }} 
                className="text-white text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors text-left"
              >
                <FaUser /> My Account
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); navigate("/orders"); }} 
                className="text-white text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors text-left"
              >
                <FaShoppingBag /> My Orders
              </button>
              <button 
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }} 
                className="text-red-100 text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors text-left"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <div className="border-t border-white/30 my-2"></div>
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-white text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                <FaSignInAlt /> Login
              </Link>
              <Link 
                to="/signup" 
                onClick={() => setMobileMenuOpen(false)} 
                className="bg-white text-beauty-dusty-rose text-lg font-semibold flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-beauty-cream transition-colors text-center justify-center shadow-lg"
              >
                <FaUserPlus /> Signup
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
