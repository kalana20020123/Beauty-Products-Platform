import { useNavigate, Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import ProductIngredients from "../../components/productIngredients";
import ProductFeatures from "../../components/productFeatures";
import ProductPrecautions from "../../components/productPrecautions";
import ProductBenefits from "../../components/productBenefits";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div
            className="w-full h-full flex flex-col items-center overflow-y-scroll relative"
            style={{
                backgroundImage: "url('/background1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative w-full flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 py-12 space-y-8 sm:space-y-0">
                <div className="w-full sm:w-1/2 sm:pl-24 space-y-6 text-center sm:text-left">
                    <h1 className="text-4xl sm:text-5xl sm:text-6xl font-extrabold text-secondary leading-tight drop-shadow-lg">
                        Welcome to <br />
                        KSW Beauty Care
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-200 font-medium italic">
                        Where Radiance Meets Care and Beauty Blossoms Every Day
                    </p>
                    <div className="flex justify-center sm:justify-start">
                        <button 
                            onClick={() => navigate("/products")}
                            className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-white font-semibold p-3 rounded-lg shadow-sm transition-transform transform hover:scale-105"
                        >
                            Shop Now
                        </button>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 flex justify-center">
                    <img src="/head1.png" alt="KSW Beauty Care 1" className="relative w-3/4 sm:w-auto" />
                </div>
            </div>

            {/* Product Sections */}
            <ProductIngredients />
            <ProductFeatures />
            <ProductPrecautions />
            <ProductBenefits />

            {/* Footer */}
            <footer className="relative bg-secondary w-full py-8 mt-14 shadow-lg">
                <div className="w-11/12 sm:w-3/4 mx-auto flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-start gap-8">
                    <div className="flex flex-col items-center sm:items-start space-y-2">
                        <h4 className="text-2xl font-bold text-white text-center mb-4">Get in Touch</h4>
                        <a href="#" className="flex items-center space-x-2 text-gray-800 hover:text-gray-500 transition duration-300">
                            <FaWhatsapp className="text-2xl text-gray-600" />
                            <span>WhatsApp</span>
                        </a>
                        <a href="#" className="flex items-center space-x-2 text-gray-800 hover:text-gray-500 transition duration-300">
                            <FaFacebook className="text-2xl text-gray-600" />
                            <span>Facebook</span>
                        </a>
                    </div>

                    <div className="flex flex-col items-center sm:items-start space-y-2">
                        <h4 className="text-2xl font-bold text-white text-center mb-4">Explore More</h4>
                        <Link to="/about" className="text-gray-800 hover:text-gray-500 transition duration-300">About Us</Link>
                        <Link to="/contact" className="text-gray-800 hover:text-gray-500 transition duration-300">Contact Us</Link>
                    </div>

                    <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
                        <h4 className="text-2xl font-bold text-white text-center mb-4">Find Our Location</h4>
                        <div className="flex justify-center">
                            <iframe 
                                src="https://www.google.com/maps/embed?..." 
                                width="100%" 
                                height="250" 
                                allowFullScreen="" 
                                loading="lazy"
                                className="border-0 rounded-lg"
                            ></iframe>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6 text-gray-600 text-sm sm:text-base">
                    <p>© 2025 KSW Beauty Care. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
