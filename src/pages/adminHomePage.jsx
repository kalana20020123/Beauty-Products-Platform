import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaHome, FaChartLine, FaBox, FaShoppingBag, FaUsers, FaComments, FaStar } from "react-icons/fa";
import AdminHome from "./admin/adminHome";
import AdminProductsPage from "./admin/adminProductsPage";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProductForm";
import AdminOrdersPage from "./admin/adminOrderPage";
import AdminDashboardPage from "./admin/adminDashboardPage";
import AdminCustomersPage from "./admin/adminCustomersPage";
import AdminCommentPage from "./admin/adminCommentPage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminHomePage() {
    const [user,setUser] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {      
      navigate("/login")
      return;
    }
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res)=>{
        console.log(res.data)
        if(res.data.type!="admin"){
          toast.error("Unauthorized access")
          navigate("/login")
        }else{
          setUser(res.data)
        }
      }).catch((err)=>{
        console.error(err)
        toast.error("Failed to fetch user data")
        navigate("/login")
      })
    
  },[])
    return (
        <div className="w-full h-screen flex">

            {/* Sidebar */}
            <div className="w-[20%] h-screen bg-secondary flex flex-col items-center py-8 space-y-6 shadow-lg">
                <h1 className="text-white text-2xl font-bold">Admin Panel</h1>

                <Link 
                    className="flex flex-row items-center text-white space-x-3 px-4 py-2 hover:bg-accent rounded-lg w-[80%] transition ease-in-out duration-200" 
                    to="/admin"
                >
                    <FaHome size={20} />
                    <span className="text-lg">Home</span>
                </Link>

                <Link 
                    className="flex flex-row items-center text-white space-x-3 px-4 py-2 hover:bg-accent rounded-lg w-[80%] transition ease-in-out duration-200" 
                    to="/admin/dashboard"
                >
                    <FaChartLine size={20} />
                    <span className="text-lg">Dashboard</span>
                </Link>

                <Link 
                    className="flex flex-row items-center text-white space-x-3 px-4 py-2 hover:bg-accent rounded-lg w-[80%] transition ease-in-out duration-200" 
                    to="/admin/products"
                >
                    <FaBox size={20} />
                    <span className="text-lg">Products</span>
                </Link>

                <Link 
                    className="flex flex-row items-center text-white space-x-3 px-4 py-2 hover:bg-accent rounded-lg w-[80%] transition ease-in-out duration-200" 
                    to="/admin/orders"
                >
                    <FaShoppingBag size={20} />
                    <span className="text-lg">Orders</span>
                </Link>

                <Link 
                    className="flex flex-row items-center text-white space-x-3 px-4 py-2 hover:bg-accent rounded-lg w-[80%] transition ease-in-out duration-200" 
                    to="/admin/customers"
                >
                    <FaUsers size={20} />
                    <span className="text-lg">Customers</span>
                </Link>

                <Link 
                    className="flex flex-row items-center text-white space-x-3 px-4 py-2 hover:bg-accent rounded-lg w-[80%] transition ease-in-out duration-200" 
                    to="/admin/comments"
                >
                    <FaComments size={20} />
                    <span className="text-lg">Comments</span>
                </Link>
                <Link 
                    className="flex flex-row items-center text-white space-x-3 px-4 py-2 hover:bg-accent rounded-lg w-[80%] transition ease-in-out duration-200" 
                    to="/"    
                >
                    <FaStar size={20} />
                    <span className="text-lg">Customer View</span>
                </Link>
            </div>

            {/* Main Content */}
            <div className="w-[80%] h-screen bg-primary p-6 overflow-auto">
                <div className="p-6 rounded-lg shadow-inner bg-secondary backdrop-filter backdrop-blur-lg bg-opacity-30">
                {user!=null&&<Routes>
                        <Route path="/" element={<AdminHome/>} />
                        <Route path="/dashboard" element={<AdminDashboardPage/>} />
                        <Route path="/products" element={<AdminProductsPage />} />
                        <Route path="/products/addProduct" element={<AddProductForm />} />
                        <Route path="/products/editProduct" element={<EditProductForm/>} />
                        <Route path="/orders" element={<AdminOrdersPage/>} />
                        <Route path="/customers" element={<AdminCustomersPage/>} />
                        <Route path="/comments" element={<AdminCommentPage/>} />
                        <Route path="/*" element={<h1 className="text-xl font-medium text-red-500">404 - Page Not Found</h1>} />
                        </Routes>}
                        {
          user==null&&<div className="w-full h-full flex justify-center items-center">
            {/* animating loading page */}
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-accent"></div>
          </div>
        }
                </div>
            </div>

        </div>
    );
}
