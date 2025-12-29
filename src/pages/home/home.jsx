import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { 
    FaFacebook, 
    FaWhatsapp, 
    FaInstagram, 
    FaEnvelope, 
    FaPhoneAlt, 
    FaMapMarkerAlt,
    FaStar,
    FaArrowRight
} from "react-icons/fa";
import ProductCard from "../../components/productCard";

export default function Home() {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
        fetchTestimonials();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) {
                console.warn("VITE_BACKEND_URL is not set");
                setLoading(false);
                return;
            }
            const response = await axios.get(backendUrl + '/api/products');
            // Get first 6 products as featured
            if (Array.isArray(response.data)) {
                setFeaturedProducts(response.data.slice(0, 6));
            } else {
                setFeaturedProducts([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error loading products:", error);
            setFeaturedProducts([]);
            setLoading(false);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            if (!backendUrl) {
                return;
            }
            const response = await axios.get(backendUrl + "/api/contacts/all");
            // Get latest 6 testimonials
            if (Array.isArray(response.data) && response.data.length > 0) {
                setTestimonials(response.data.slice(-6).reverse());
            } else {
                setTestimonials([]);
            }
        } catch (error) {
            console.error("Error loading testimonials:", error);
            setTestimonials([]);
        }
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (newsletterEmail) {
            toast.success("Thank you for subscribing to our newsletter!");
            setNewsletterEmail("");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-beauty-cream via-white to-beauty-cream">
            {/* Hero Section */}
            <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/background1.png')",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-beauty-dusty-rose/80 via-beauty-blush/70 to-beauty-peach/80"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Text Content */}
                        <div className="text-center md:text-left space-y-6 text-white">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-2xl">
                                Discover Your
                                <span className="block text-beauty-cream"> Natural Beauty</span>
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-xl mx-auto md:mx-0">
                                Where Radiance Meets Care and Beauty Blossoms Every Day
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                                <button 
                                    onClick={() => navigate("/products")}
                                    className="px-8 py-4 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush hover:from-beauty-blush hover:to-beauty-dusty-rose text-white font-semibold rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                                >
                                    Shop Now
                                    <FaArrowRight className="text-sm" />
                                </button>
                                <button 
                                    onClick={() => navigate("/about")}
                                    className="px-8 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold rounded-full border-2 border-white/50 shadow-lg transform transition-all duration-300 hover:scale-105"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="hidden md:flex justify-center items-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-beauty-lavender/30 rounded-full blur-3xl transform scale-150"></div>
                                <img 
                                    src="/head1.png" 
                                    alt="Crystal Beauty Care Products" 
                                    className="relative w-full max-w-md h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Featured Products
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover our handpicked selection of premium beauty products
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush mx-auto mt-4"></div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-full h-24 w-24 bg-gradient-to-tr from-beauty-dusty-rose to-beauty-blush opacity-30 blur-lg"></div>
                                <div className="animate-spin rounded-full h-24 w-24 border-[6px] border-gray-200 border-t-beauty-dusty-rose"></div>
                            </div>
                        </div>
                    ) : featuredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                            {featuredProducts.map((product) => {
                                if (!product || !product.productId) return null;
                                return (
                                    <div key={product.productId} className="transform transition-all duration-300 hover:scale-105">
                                        <ProductCard product={product} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-600">
                            <p>No featured products available at the moment.</p>
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate("/products")}
                            className="px-8 py-4 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush hover:from-beauty-blush hover:to-beauty-dusty-rose text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                        >
                            Explore All Products
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-beauty-cream to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Find the perfect products for your beauty routine
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: "Skincare", color: "from-beauty-peach to-beauty-blush", icon: "✨" },
                            { name: "Makeup", color: "from-beauty-lavender to-beauty-rose", icon: "💄" },
                            { name: "Hair Care", color: "from-beauty-mint to-beauty-sage", icon: "💇" },
                            { name: "Body Care", color: "from-beauty-cream to-beauty-peach", icon: "🌸" },
                        ].map((category, index) => (
                            <div
                                key={index}
                                onClick={() => navigate("/products")}
                                className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-2xl`}
                            >
                                <div className="text-5xl mb-4">{category.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            What Our Customers Say
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Real reviews from real customers who love our products
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush mx-auto mt-4"></div>
                    </div>

                    {testimonials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-beauty-cream to-white p-6 rounded-2xl shadow-lg border border-beauty-blush/20 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="flex items-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 mb-4 italic line-clamp-4">
                                        "{testimonial.comment}"
                                    </p>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush flex items-center justify-center text-white font-semibold mr-3">
                                            {testimonial.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{testimonial.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-600">
                            <p>No testimonials available yet. Be the first to review!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-beauty-dusty-rose via-beauty-blush to-beauty-peach">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Transform Your Beauty Routine?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join thousands of satisfied customers and discover your perfect beauty products today
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-10 py-5 bg-white text-beauty-dusty-rose font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl inline-flex items-center gap-2"
                    >
                        Start Shopping
                        <FaArrowRight />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-2xl font-bold mb-4 text-beauty-cream">Crystal Beauty Care</h3>
                            <p className="text-gray-400 mb-4">
                                Where Radiance Meets Care and Beauty Blossoms Every Day
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-beauty-dusty-rose rounded-full flex items-center justify-center transition-colors">
                                    <FaFacebook />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-beauty-dusty-rose rounded-full flex items-center justify-center transition-colors">
                                    <FaInstagram />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-beauty-dusty-rose rounded-full flex items-center justify-center transition-colors">
                                    <FaWhatsapp />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-gray-400 hover:text-beauty-cream transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/products" className="text-gray-400 hover:text-beauty-cream transition-colors">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-gray-400 hover:text-beauty-cream transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-400 hover:text-beauty-cream transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-center gap-2">
                                    <FaPhoneAlt className="text-beauty-cream" />
                                    <span>0761774000</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaEnvelope className="text-beauty-cream" />
                                    <span>kalanasandeep345@gmail.com</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <FaMapMarkerAlt className="text-beauty-cream mt-1" />
                                    <span>Colombo</span>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                            <p className="text-gray-400 mb-4 text-sm">
                                Subscribe to get updates on new products and exclusive offers
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                                <input
                                    type="email"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-beauty-cream transition-colors"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush hover:from-beauty-blush hover:to-beauty-dusty-rose rounded-lg font-semibold transition-all transform hover:scale-105"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                        <p>© 2025 Crystal Beauty Care. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
