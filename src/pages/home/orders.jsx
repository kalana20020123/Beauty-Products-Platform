import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch orders. Please try again.");
        setLoading(false);
      });
  }, []);

  const calculateTotal = (orderedItems) => {
    return orderedItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center p-4 relative"
      style={{
        backgroundImage: 'url("/background4.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="w-full flex flex-col items-center relative z-10">
        <h1 className="text-2xl sm:text-3xl text-secondary font-bold mb-4">My Orders</h1>
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              {/* Outer Glow Effect */}
              <div className="absolute inset-0 rounded-full h-24 w-24 sm:h-32 sm:w-32 bg-gradient-to-tr from-accent to-secondary opacity-30 blur-lg"></div>

              {/* Spinner */}
              <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-[6px] border-gray-300 border-t-accent border-t-8 shadow-lg"></div>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-white">No orders found.</p>
        ) : (
          <div className="w-full sm:w-4/5 lg:w-1/2 bg-white shadow-lg rounded-lg relative overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-lg overflow-hidden text-sm sm:text-base">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-4 sm:px-6 py-3">Order ID</th>
                  <th className="px-4 sm:px-6 py-3">Status</th>
                  <th className="px-4 sm:px-6 py-3">Date</th>
                  <th className="px-4 sm:px-6 py-3">Total</th>
                  <th className="px-4 sm:px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-100 transition-all bg-white">
                    <td className="px-4 sm:px-6 py-4">{order.orderId}</td>
                    <td className="px-4 sm:px-6 py-4">{order.status}</td>
                    <td className="px-4 sm:px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-4 sm:px-6 py-4">
                      LKR {calculateTotal(order.orderedItems).toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-4 flex gap-2">
                      <a
                        className="text-green-600 hover:text-green-400 focus:outline-none cursor-pointer"
                        onClick={() => handleViewDetails(order)}
                      >
                        <FaEye />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-primary w-full max-w-4xl p-4 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-md sm:text-lg font-bold mb-4 text-secondary">Order Details</h2>
              <p>
                <span className="font-semibold">Order ID:</span> {selectedOrder.orderId}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {selectedOrder.status}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {new Date(selectedOrder.date).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Name:</span> {selectedOrder.name}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {selectedOrder.address}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {selectedOrder.phone}
              </p>
              <p>
                <span className="font-semibold">Notes:</span> {selectedOrder.notes || "None"}
              </p>
              <h3 className="text-sm sm:text-md font-bold mt-4 text-secondary">Ordered Items:</h3>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                {selectedOrder.orderedItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-md"
                    style={{ backgroundColor: "#FDDC5C" }}
                  >
                    <p>
                      <span className="font-semibold">Name:</span> {item.name}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> LKR {item.price.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-semibold">Quantity:</span> {item.quantity}
                    </p>
                    <p>
                      <span className="font-semibold">Subtotal:</span> LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 mt-1 rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="text-white px-4 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 mt-4 shadow-md transition-transform transform hover:scale-105 font-semibold"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
