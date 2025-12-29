import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function AdminCustomersPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/every", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleDeleteUser = async (email) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/users/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After successful deletion, filter out the deleted user from the state
      setUserData(userData.filter((user) => user.email !== email));
      toast.success("Customer deleted successfully");
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData || userData.length === 0) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Customers</h1>
      </div>

      <div className="bg-white shadow-lg rounded-lg">
        <table className="w-full text-left border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="px-6 py-3">Profile Picture</th>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">User Type</th>
              <th className="px-6 py-3">Account Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="px-6 py-4">
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto"
                  />
                </td>
                <td className="px-6 py-4">{`${user.firstName} ${user.lastName}`}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.type}</td>
                <td className="px-6 py-4">{user.isBlocked ? "Blocked" : "Active"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteUser(user.email)}
                    className="text-red-600 hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
