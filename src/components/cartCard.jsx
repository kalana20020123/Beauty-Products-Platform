import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem, addToCart } from "../utils/cartFunction";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartCard({ productId, qty, onItemDelete }) {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [quantity, setQuantity] = useState(parseInt(qty));

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      console.warn("VITE_BACKEND_URL is not set");
      return;
    }
    axios
      .get(backendUrl + "/api/products/" + productId)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
          setLoaded(true);
        } else {
          handleDelete();
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoaded(true);
      });
  }, [productId]);

  const handleDelete = () => {
    deleteItem(productId);
    onItemDelete();
  };

  if (!loaded) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const itemTotal = (product.lastPrice || 0) * quantity;
  const hasDiscount = product.price > product.lastPrice;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Product Image */}
        <Link to={`/productInfo/${productId}`} className="flex-shrink-0">
          <img
            src={product?.images?.[0] || "/placeholder.jpg"}
            className="w-full sm:w-32 h-32 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            alt={product.productName}
          />
        </Link>

        {/* Product Details */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <Link to={`/productInfo/${productId}`}>
              <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-beauty-dusty-rose transition-colors">
                {product.productName}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mb-2">ID: {productId}</p>
            
            <div className="flex items-center gap-3 mb-4">
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  LKR. {product.price.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-beauty-dusty-rose">
                LKR. {product.lastPrice.toFixed(2)}
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 font-medium">Quantity:</span>
              <div className="flex items-center gap-2 border-2 border-beauty-blush/30 rounded-lg">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      addToCart(productId, -1);
                      setQuantity(quantity - 1);
                      onItemDelete(); // Refresh cart to update totals
                    }
                  }}
                  className="p-2 hover:bg-beauty-cream transition-colors rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <FaMinus className="text-beauty-dusty-rose" />
                </button>
                <span className="px-4 py-2 font-semibold text-gray-800 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    addToCart(productId, 1);
                    setQuantity(quantity + 1);
                    onItemDelete(); // Refresh cart to update totals
                  }}
                  className="p-2 hover:bg-beauty-cream transition-colors rounded-r-lg"
                >
                  <FaPlus className="text-beauty-dusty-rose" />
                </button>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex sm:flex-col items-end sm:items-center gap-4">
            <div className="text-right sm:text-center">
              <p className="text-sm text-gray-600 mb-1">Item Total</p>
              <p className="text-2xl font-bold text-beauty-dusty-rose">
                LKR. {itemTotal.toFixed(2)}
              </p>
            </div>
            
            <button
              onClick={handleDelete}
              className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
              aria-label="Remove item"
            >
              <FaTrash className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
