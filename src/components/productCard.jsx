import { Link } from "react-router-dom";
import { addToCart } from "../utils/cartFunction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Helper function to get country flag emoji
function getCountryFlag(country) {
  const flags = {
    'Canada': '🇨🇦',
    'USA': '🇺🇸',
    'Korea': '🇰🇷',
    'South Korea': '🇰🇷',
    'France': '🇫🇷',
    'UK': '🇬🇧',
    'United Kingdom': '🇬🇧',
  };
  return flags[country] || '🌍';
}

// Helper function to calculate discount percentage
function calculateDiscount(originalPrice, currentPrice) {
  if (originalPrice > currentPrice) {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }
  return 0;
}

// Helper function to calculate installment amount
function calculateInstallment(price, installments = 5) {
  return (price / installments).toFixed(2);
}

export default function ProductCard(props) {
  const navigate = useNavigate();
  const product = props.product;
  
  // Safety check - return null if product is not available
  if (!product || !product.productId) {
    return null;
  }
  
  // Extract brand from product name or use product.brand if available
  const brand = product.brand || (product.productName ? product.productName.split(' ')[0] : '');
  
  // Check if product is sold out (assuming stock or quantity field)
  const isSoldOut = product.stock === 0 || product.quantity === 0 || product.isSoldOut === true;
  
  // Get country (default to empty if not provided)
  const country = product.country || product.countryOfOrigin || '';
  
  // Get prices with defaults
  const originalPrice = product.price || 0;
  const currentPrice = product.lastPrice || product.price || 0;
  
  // Calculate discount
  const discount = calculateDiscount(originalPrice, currentPrice);
  
  // Calculate installment
  const installmentAmount = calculateInstallment(currentPrice);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSoldOut) {
      toast.error("This product is sold out");
      return;
    }
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to log in to add items to the cart.");
      navigate("/login");
      return;
    }
    
    addToCart(product.productId, 1);
    toast.success("Product added to cart");
  };

  return (
    <div className="w-full max-w-[280px] bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="flex flex-col h-full">
        <Link to={`/productInfo/${product.productId}`} className="flex flex-col flex-grow">
          {/* Image Container with Badges */}
          <div className="relative w-full h-[200px] bg-gray-100">
            <img
              src={product.images?.[0] || product.images || '/placeholder.png'}
              alt={product.productName || 'Product'}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.target.src = '/placeholder.png';
              }}
            />
          
            {/* Discount Badge */}
            {discount > 0 && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discount}% off
              </div>
            )}
            
            {/* Sold Out Badge */}
            {isSoldOut && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Sold out
              </div>
            )}
          </div>
        
          {/* Product Info */}
          <div className="p-4 flex flex-col flex-grow">
            {/* Brand */}
            <p className="text-sm text-gray-600 mb-1 font-medium">
              {brand}
            </p>
            
            {/* Product Name */}
            <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
              {product.productName}
            </h3>
            
            {/* Price */}
            <div className="mb-2">
              {originalPrice > currentPrice && (
                <span className="text-sm text-gray-500 line-through mr-2">
                  Rs {originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-lg font-bold text-gray-900">
                Rs {currentPrice.toFixed(2)}
              </span>
            </div>
            
            {/* Country Flag */}
            {country && (
              <div className="flex items-center gap-1 mb-2 text-xs text-gray-600">
                <span className="text-base">{getCountryFlag(country)}</span>
                <span>Made in {country}</span>
              </div>
            )}
            
            {/* Payment Option */}
            <p className="text-xs text-gray-600 mb-3">
              or pay in 5 x Rs {installmentAmount} with KOKO
            </p>
          </div>
        </Link>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={`mt-auto w-full py-2 px-4 rounded-md font-semibold text-sm transition-all duration-200 ${
            isSoldOut
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
          }`}
        >
          {isSoldOut ? 'Sold Out' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
}
