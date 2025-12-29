import axios from "axios";
import { useEffect, useState } from "react";
import { deleteItem } from "../utils/cartFunction";
import { FaTrash } from "react-icons/fa";

export default function CartCard({ productId, qty, onItemDelete }) {
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const quantity = parseInt(qty);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
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
      });
  }, [productId]);

  const handleDelete = () => {
    deleteItem(productId);
    onItemDelete(); // Refresh cart
  };

  return (
    <>
      {!loaded ? (
        <tr>
          <td colSpan="7" className="text-center p-4">Loading...</td>
        </tr>
      ) : (
        <tr className="hover:bg-accent hover:text-white">
          <td className="p-2 border border-gray-200">
            <img
              src={product?.images?.[0] || "/placeholder.jpg"}
              className="w-[90px] h-[90px] object-cover mx-auto"
              alt="Product"
            />
          </td>
          <td className="text-center p-2 border border-gray-200">
            {product?.productName}
          </td>
          <td className="text-center p-2 border border-gray-200">{productId}</td>
          <td className="text-center p-2 border border-gray-200">
            <span className="w-12 text-center">{quantity}</span>
          </td>
          <td className="text-center p-2 border border-gray-200">
            LKR. {product?.lastPrice?.toFixed(2)}
          </td>
          <td className="text-center p-2 border border-gray-200">
            LKR. {(product?.lastPrice * quantity).toFixed(2)}
          </td>
          <td className="text-center p-2 border border-gray-200">
            <button onClick={handleDelete} className="text-red-600 hover:text-red-400">
              <FaTrash />
            </button>
          </td>
        </tr>
      )}
    </>
  );
}
