import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState({ status: "", notes: "" });
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
    setDetailModalVisible(true);
  };
  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setUpdateData({ status: order.status, notes: order.notes || "" });
    setUpdateModalVisible(true);
  };
  const closeModals = () => {
    setSelectedOrder(null);
    setUpdateModalVisible(false);
    setDetailModalVisible(false);
  };
  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${selectedOrder.orderId}`,
        { status: updateData.status, notes: updateData.notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Order updated successfully.");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === selectedOrder.orderId
              ? { ...order, status: updateData.status, notes: updateData.notes }
              : order
          )
        );
        closeModals();
      })
      .catch((err) => {
        toast.error("Failed to update order. Please try again.");
      });
  };
  return (
    <div className="p-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Orders</h1>
      </div>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className={`hover:bg-gray-100 transition-all ${
                order.orderId % 2 === 0 ? "bg-white" : "bg-white"
              }`}>
                <td className="px-6 py-4">{order.orderId}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-6 py-4">LKR {calculateTotal(order.orderedItems).toFixed(2)}</td>
                <td className="px-6 py-4 flex gap-2">
                  <a
                    className="text-green-600 hover:text-green-400 focus:outline-none cursor-pointer"
                    onClick={() => handleViewDetails(order)}
                  >
                    <FaEye />
                  </a>
                  <a
                    className="text-blue-600 hover:text-blue-400 focus:outline-none cursor-pointer"
                    onClick={() => handleUpdateOrder(order)}
                  >
                    <FaPencil />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {/* Detail Modal */}
      {detailModalVisible && selectedOrder && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-primary w-full max-w-4xl p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-secondary">Order Details</h2>
      <p>
        <span className="font-semibold">Order ID:</span> {selectedOrder.orderId}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {selectedOrder.status}
      </p>
      <p>
        <span className="font-semibold">Date:</span>{" "}
        {new Date(selectedOrder.date).toLocaleString()}
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
      <h3 className="text-md font-bold mt-4 text-secondary">Ordered Items:</h3>
      <div className="mt-2 grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
        {selectedOrder.orderedItems.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-md"
            style={{
              backgroundColor: "#FDDC5C",
              height: "auto", // Allow for flexible height based on content
            }}
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
              <span className="font-semibold">Subtotal:</span>{" "}
              LKR {(item.price * item.quantity).toFixed(2)}
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
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
          onClick={closeModals}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      {/* Update Modal */}
      {updateModalVisible && selectedOrder && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-primary w-full max-w-4xl p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-secondary">Update Order</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary">Status</label>
            <select
              value={updateData.status}
              onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="preparing">Preparing</option>
              <option value="cancelled">Cancelled</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
              <option value="pended">Pended</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary">Notes</label>
            <textarea
              value={updateData.notes}
              onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-300"
              onClick={closeModals}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}