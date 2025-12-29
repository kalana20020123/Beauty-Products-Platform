import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function AdminCommentPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/contacts/all");
      setComments(response.data);
    } catch (error) {
      toast.error("Failed to load comments.");
    }
  };

  const deleteComment = async (name) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contacts/${name}`);
      toast.success("Comment deleted successfully");
      setComments(comments.filter((com) => com.name !== name));
    } catch (error) {
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Comments</h1>
      </div>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Comment</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((com, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{com.name}</td>
                  <td className="px-6 py-4">{com.comment}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteComment(com.name)}
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
      )}
    </div>
  );
}
