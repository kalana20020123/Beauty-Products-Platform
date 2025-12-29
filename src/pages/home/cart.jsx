import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartFunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [labeledTotal, setLabeledTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []);

  async function fetchCartData() {
    setLoading(true);
    const updatedCart = loadCart() || [];
    setCart(updatedCart);

    if (updatedCart.length === 0) {
      setTotal(0);
      setLabeledTotal(0);
      setLoading(false);
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        console.warn("VITE_BACKEND_URL is not set");
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${backendUrl}/api/orders/quote`,
        { orderedItems: updatedCart }
      );

      if (response.data?.total != null) {
        setTotal(parseFloat(response.data.total) || 0);
        setLabeledTotal(parseFloat(response.data.labeledTotal) || 0);
      }
    } catch (error) {
      console.error("Error fetching cart total:", error);
      toast.error("Error calculating cart total");
    } finally {
      setLoading(false);
    }
  }

  function handleItemDelete() {
    fetchCartData();
    toast.success("Item removed from cart");
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-beauty-cream via-white to-beauty-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-beauty-dusty-rose to-beauty-blush rounded-full mb-6">
            <FaShoppingCart className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your items and proceed to checkout
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush mx-auto mt-4"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="absolute inset-0 rounded-full h-24 w-24 bg-gradient-to-tr from-beauty-dusty-rose to-beauty-blush opacity-30 blur-lg"></div>
              <div className="animate-spin rounded-full h-24 w-24 border-[6px] border-gray-200 border-t-beauty-dusty-rose border-t-8"></div>
            </div>
          </div>
        ) : cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartCard
                  key={item.productId}
                  productId={item.productId}
                  qty={item.qty}
                  onItemDelete={handleItemDelete}
                />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-800 font-semibold">LKR. {labeledTotal.toFixed(2)}</span>
                  </div>
                  
                  {labeledTotal > total && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-green-600 font-semibold">
                        - LKR. {(labeledTotal - total).toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t border-beauty-blush/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-beauty-dusty-rose">
                        LKR. {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/shipping", { state: { items: cart } })}
                  className="w-full bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush hover:from-beauty-blush hover:to-beauty-dusty-rose text-white font-semibold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <FaArrowRight />
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full mt-4 bg-white border-2 border-beauty-dusty-rose text-beauty-dusty-rose font-semibold py-4 rounded-xl hover:bg-beauty-cream transform transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-12 bg-white rounded-2xl shadow-xl">
              <div className="w-24 h-24 bg-beauty-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <FaShoppingCart className="text-beauty-dusty-rose text-5xl opacity-50" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty!</h2>
              <p className="text-gray-600 mb-8">Start adding products to your cart</p>
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-4 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush hover:from-beauty-blush hover:to-beauty-dusty-rose text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                Browse Products
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
