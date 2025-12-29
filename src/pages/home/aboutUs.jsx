export default function AboutUs() {
  return (
    <div
      className="w-full min-h-screen flex flex-col items-center relative"
      style={{
        backgroundImage: 'url("/background2.png")', // Ensure this file is in the 'public' folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 mt-6 px-4 sm:px-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-secondary mb-4">
          Our Commitment to Beauty and Confidence
        </h3>
        <p className="text-base sm:text-lg text-gray-200 text-center mb-6">
          At Beauty Care, we believe that everyone deserves to feel confident and beautiful in their own skin. Our mission is to provide <br className="hidden sm:block" />
          high-quality beauty products. We also offer a range of services designed to help you enhance your natural beauty.
        </p>
        <div className="container mx-auto px-0 sm:px-4">
          {/* Our Vision */}
          <div className="flex flex-col items-center bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 p-6 sm:p-8 rounded-lg shadow-lg mb-8 w-full sm:w-[40rem] mx-auto">
            <img
              src="/logo3.png"
              className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full mb-6"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Our Vision</h3>
            <p className="text-center text-gray-700 text-sm sm:text-base">
              To empower individuals by providing personalized beauty solutions and creating an inclusive environment where everyone can thrive.
            </p>
          </div>

          {/* Our Products */}
          <div className="flex flex-col items-center bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 p-6 sm:p-8 rounded-lg shadow-lg mb-8 w-full sm:w-[40rem] mx-auto">
            <img
              src="/logo4.png"
              className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-full mb-6"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2">Our Products</h3>
            <p className="text-center text-gray-700 text-sm sm:text-base">
              We offer a wide range of top-tier beauty products crafted with care and designed to suit every skin type and need.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 px-2 sm:px-0">
            <h3 className="text-xl sm:text-2xl font-semibold text-secondary mb-4">
              Join Us in Your Beauty Journey
            </h3>
            <p className="text-base sm:text-lg text-gray-200 mb-6">
              Whether you're looking for the perfect skincare routine or want to treat yourself to luxurious <br className="hidden sm:block" />
              beauty products, we are here to guide and inspire you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
