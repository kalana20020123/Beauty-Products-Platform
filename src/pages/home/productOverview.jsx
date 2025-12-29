import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imgeSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // not-found, found
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        if (res.data == null) {
          setStatus("not-found");
        } else {
          setProduct(res.data);
          setStatus("found");
        }
      });
  }, []);

  function onAddtoCartClick() {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

    if (!token) {
      toast.error("You need to log in to add items to the cart.");
      navigate("/login");
      return;
    }

    addToCart(product.productId, 1, token); // Ensure your function accepts a token
    toast.success(product.productId + " added to cart");
  }

  function onBuyNowClick() {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    if (!token) {
      toast.error("You need to log in to make a purchase.");
      navigate("/login"); // Redirect to login page
      return;
    }

    navigate("/shipping", {
      state: {
        items: [
          {
            productId: product.productId,
            qty: 1,
          },
        ],
      },
    });
  }

  return (
    <div
      className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center relative p-4"
      style={{
        backgroundImage: "url('/background2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="max-w-5xl w-full rounded-lg shadow-lg bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 relative z-10 p-4 sm:p-6">
        {status === "loading" && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Outer Glow Effect */}
              <div className="absolute inset-0 rounded-full h-32 w-32 bg-gradient-to-tr from-accent to-secondary opacity-30 blur-lg"></div>

              {/* Spinner */}
              <div className="animate-spin rounded-full h-32 w-32 border-[6px] border-gray-300 border-t-accent border-t-8 shadow-lg"></div>
            </div>
          </div>
        )}
        {status === "not-found" && (
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-6">Product not found</p>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-secondary hover:bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-all bg-gradient-to-r from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 p-3 mt-4 shadow-md transform hover:scale-105"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
        {status === "found" && (
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 p-4">
            <div className="w-full md:w-[37%]">
              <ImageSlider images={product.images} />
            </div>
            <div className="w-full md:w-[63%]">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {product.productName}
              </h1>
              <h1 className="text-xl md:text-3xl font-bold text-gray-600 mb-6">
                {product.altNames.join(" | ")}
              </h1>
              <p className="text-lg md:text-xl text-black mb-6">
                {product.price > product.lastPrice && (
                  <span className="line-through text-gray-700 mr-2">
                    LKR. {product.price}
                  </span>
                )}
                <span className="text-gray-200">LKR. {product.lastPrice}</span>
              </p>
              <p className="text-base md:text-lg text-gray-700 line-clamp-3">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={onAddtoCartClick}
                  className="bg-secondary hover:bg-accent text-white font-semibold p-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 shadow-md transition-transform transform hover:scale-105"
                >
                  Add to cart
                </button>
                <button
                  onClick={onBuyNowClick}
                  className="bg-secondary hover:bg-accent text-white font-semibold p-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 shadow-md transition-transform transform hover:scale-105"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
