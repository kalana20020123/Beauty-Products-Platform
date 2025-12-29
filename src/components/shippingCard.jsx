import axios from "axios"
import { useEffect, useState } from "react"
import { deleteItem } from "../utils/cartFunction"

export default function ShippingCard(props){
    
  const productId = props.productId
  const qty = props.qty
  
  const [product, setProduct] = useState(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((response) => {
          if (response.data != null) {
            setProduct(response.data);
            console.log(response.data , "product");
            setLoaded(true);
          } else {
            deleteItem(productId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  
  return (
    <>
      {!loaded ? (
        <tr>loading</tr>
      ) : (
        <tr className="hover:bg-accent hover:text-white">
          <td className="p-2 border border-gray-200">
            <img
              src={product?.images[0]}
              className="w-[90px] h-[90px] object-cover mx-auto"
            />
          </td>
          <td className="text-center p-2 border border-gray-200">{product?.productName}</td>
          <td className="text-center p-2 border border-gray-200">{productId}</td>
          <td className="text-center p-2 border border-gray-200">{qty}</td>
          <td className="text-center p-2 border border-gray-200">LKR. {product?.lastPrice.toFixed(2)}</td>
          <td className="text-center p-2 border border-gray-200">
            {(product?.lastPrice * qty).toFixed(2)}
          </td>
        </tr>
      )}
    </>
  );
}