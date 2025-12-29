import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBox, FaDollarSign, FaShoppingCart, FaUsers, FaComments } from "react-icons/fa";

export default function AdminDashboardPage() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    
    // Fetch total orders and revenue
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalOrders(res.data.length);
        const revenue = res.data.reduce((sum, order) => sum + order.orderedItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0), 0);
        setTotalRevenue(revenue);
      })
      .catch((err) => {
        toast.error("Failed to fetch orders. Please try again.");
      });

    // Fetch total products
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalProducts(res.data.length);
      })
      .catch((err) => {
        toast.error("Failed to fetch products. Please try again.");
      });

      axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/every", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalCustomers(res.data.length);
      })
      .catch((err) => {
        toast.error("Failed to fetch customers. Please try again.");
      });

      axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/contacts/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalComments(res.data.length);
      })
      .catch((err) => {
        toast.error("Failed to fetch comments. Please try again.");
      });
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-secondary text-white p-6 rounded-lg flex items-center shadow-md">
          <FaDollarSign className="text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="text-2xl">LKR {totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-secondary text-white p-6 rounded-lg flex items-center shadow-md">
          <FaBox className="text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Total Products</h2>
            <p className="text-2xl">{totalProducts}</p>
          </div>
        </div>
        <div className="bg-secondary text-white p-6 rounded-lg flex items-center shadow-md">
          <FaShoppingCart className="text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-2xl">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-secondary text-white p-6 rounded-lg flex items-center shadow-md">
          <FaUsers className="text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Total Customers</h2>
            <p className="text-2xl">{totalCustomers}</p>
          </div>
        </div>
        <div className="bg-secondary text-white p-6 rounded-lg flex items-center shadow-md">
          <FaComments className="text-4xl" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Total Comments</h2>
            <p className="text-2xl">{totalComments}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
