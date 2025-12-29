import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../../components/productCard"

export default function ProductPage(){
  const [products,setProducts]=useState([])
  const [loadingStatus,setLoadingStatus]=useState('loading')//loaded, loading, error
  const [query, setQuery] = useState("")

  useEffect(
    ()=>{
      if(loadingStatus==="loading"){
        axios.get(import.meta.env.VITE_BACKEND_URL+'/api/products').then(

          (res)=>{
            console.log(res.data)
            setProducts(res.data)
            setLoadingStatus('loaded')
          })
          .catch((err)=>toast.error('Error loading products'));     
      }
    }, []);

    function search(e) {
      const query = e.target.value;
      setQuery(query);
      setLoadingStatus("loading");
      if (query == "") {
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
          .then((res) => {
            console.log(res.data);
            setProducts(res.data);
            setLoadingStatus("loaded");
          })
          .catch((err) => toast.error("Error loading products"));
      }else{
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/"+query)
          .then((res) => {
            console.log(res.data);
            setProducts(res.data);
            setLoadingStatus("loaded");
          })
          .catch((err) => toast.error("Error loading products"));
      }
    }
    return (
      <div
      className="w-full h-full pt-4 relative"
      style={{
          backgroundImage: "url('/background2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
      }}
  >
      <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute w-full flex justify-center px-4 sm:px-0">
              <input
                type="text"
                className="w-full sm:w-1/2 p-2 absolute z-50 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30 placeholder:text-gray-100 rounded-lg"
                placeholder="Search Products"
                onChange={search}
                value={query}
              />
            </div>
        {loadingStatus == "loaded" && (
          <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center pt-20 sm:pt-4 relative px-2 sm:px-0">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        )}
        {loadingStatus == "loading" && (
          <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full h-24 w-24 sm:h-32 sm:w-32 bg-gradient-to-tr from-accent to-secondary opacity-30 blur-lg"></div>
            <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-[6px] border-gray-300 border-t-accent border-t-8 shadow-lg"></div>
          </div>
        </div>        
        )} 
      </div>
  )
}
