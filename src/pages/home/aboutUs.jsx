import { Link } from "react-router-dom";
import { FaHeart, FaLeaf, FaAward, FaUsers, FaArrowRight } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-beauty-cream via-white to-beauty-cream">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-beauty-dusty-rose via-beauty-blush to-beauty-peach">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            About Crystal Beauty Care
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-light max-w-3xl mx-auto">
            Where Radiance Meets Care and Beauty Blossoms Every Day
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Commitment to Beauty
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush mx-auto mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed text-center">
                At Crystal Beauty Care, we believe that everyone deserves to feel confident and beautiful in their own skin. 
                Our mission is to provide high-quality beauty products that enhance your natural beauty while caring for your skin. 
                We offer a range of services and products designed to help you look and feel your best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-beauty-cream to-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full mb-6 mx-auto">
                <FaHeart className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">Our Vision</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                To empower individuals by providing personalized beauty solutions and creating an inclusive environment 
                where everyone can thrive and feel confident in their own unique beauty.
              </p>
            </div>

            {/* Products Card */}
            <div className="bg-gradient-to-br from-beauty-peach to-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full mb-6 mx-auto">
                <FaLeaf className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">Our Products</h3>
              <p className="text-gray-700 text-center leading-relaxed">
                We offer a wide range of top-tier beauty products crafted with care and designed to suit every skin type and need. 
                Each product is carefully selected to ensure quality and effectiveness.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-beauty-lavender to-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105">
              <FaAward className="text-beauty-dusty-rose text-4xl mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Quality First</h4>
              <p className="text-gray-600">Premium products you can trust</p>
            </div>
            <div className="bg-gradient-to-br from-beauty-mint to-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105">
              <FaUsers className="text-beauty-dusty-rose text-4xl mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Customer Focus</h4>
              <p className="text-gray-600">Your satisfaction is our priority</p>
            </div>
            <div className="bg-gradient-to-br from-beauty-peach to-white rounded-xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1">
              <FaHeart className="text-beauty-dusty-rose text-4xl mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">Natural Beauty</h4>
              <p className="text-gray-600">Enhancing your natural glow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Showcase */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-beauty-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105">
              <img
                src="/logo3.png"
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full mb-6 mx-auto shadow-lg"
                alt="Crystal Beauty Care Logo"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                We source only the finest ingredients and products to ensure your beauty routine is nothing but the best.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105">
              <img
                src="/logo4.png"
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full mb-6 mx-auto shadow-lg"
                alt="Crystal Beauty Care Logo"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Care</h3>
              <p className="text-gray-600">
                Our team is dedicated to helping you find the perfect products for your unique beauty needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Join Us in Your Beauty Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking for the perfect skincare routine or want to treat yourself to luxurious beauty products, 
            we are here to guide and inspire you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush hover:from-beauty-blush hover:to-beauty-dusty-rose text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Explore Products
              <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white border-2 border-beauty-dusty-rose text-beauty-dusty-rose font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-beauty-cream inline-flex items-center justify-center gap-2"
            >
              Get in Touch
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
