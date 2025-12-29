import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function CommentSlideshow({ comments }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (comments.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % comments.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [comments]);

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-beauty-cream to-white rounded-2xl shadow-xl p-8 sm:p-12">
        <div className="text-center mb-6">
          <FaQuoteLeft className="text-beauty-dusty-rose text-4xl mx-auto mb-4 opacity-50" />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-lg mx-1" />
              ))}
            </div>
            <p className="text-lg sm:text-xl text-gray-700 mb-6 italic leading-relaxed">
              "{comments[index].comment}"
            </p>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush flex items-center justify-center text-white font-bold text-lg mr-3">
                {comments[index].name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">{comments[index].name}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        {comments.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {comments.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-beauty-dusty-rose w-8"
                    : "bg-beauty-blush/50 hover:bg-beauty-blush"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
