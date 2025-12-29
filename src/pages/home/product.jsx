import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../../components/productCard"
import { FaSearch } from "react-icons/fa"

export default function ProductPage(){
  const [products,setProducts]=useState([])
  const [loadingStatus,setLoadingStatus]=useState('loading')//loaded, loading, error
  const [query, setQuery] = useState("")

  useEffect(
    ()=>{
      if(loadingStatus==="loading"){
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) {
          console.warn("VITE_BACKEND_URL is not set");
          setLoadingStatus('loaded');
          return;
        }
        axios.get(backendUrl+'/api/products').then(
          (res)=>{
            console.log(res.data)
            if (Array.isArray(res.data)) {
              setProducts(res.data)
            } else {
              setProducts([])
            }
            setLoadingStatus('loaded')
          })
          .catch((err)=>{
            console.error("Error loading products:", err);
            toast.error('Error loading products');
            setProducts([]);
            setLoadingStatus('loaded');
          });     
      }
    }, []);

    function search(e) {
      const query = e.target.value;
      setQuery(query);
      setLoadingStatus("loading");
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        setLoadingStatus("loaded");
        return;
      }
      if (query == "") {
        axios
          .get(backendUrl + "/api/products")
          .then((res) => {
            console.log(res.data);
            if (Array.isArray(res.data)) {
              setProducts(res.data);
            } else {
              setProducts([]);
            }
            setLoadingStatus("loaded");
          })
          .catch((err) => {
            console.error("Error loading products:", err);
            toast.error("Error loading products");
            setProducts([]);
            setLoadingStatus("loaded");
          });
      }else{
        axios
          .get(backendUrl + "/api/products/search/"+query)
          .then((res) => {
            console.log(res.data);
            if (Array.isArray(res.data)) {
              setProducts(res.data);
            } else {
              setProducts([]);
            }
            setLoadingStatus("loaded");
          })
          .catch((err) => {
            console.error("Error searching products:", err);
            toast.error("Error searching products");
            setProducts([]);
            setLoadingStatus("loaded");
          });
      }
    }

    return (
      <div className="w-full min-h-screen bg-gradient-to-b from-beauty-cream via-white to-beauty-cream py-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Our Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of beauty products
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-beauty-dusty-rose to-beauty-blush mx-auto mt-4"></div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-beauty-dusty-rose text-xl" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-beauty-blush/30 rounded-full focus:outline-none focus:border-beauty-dusty-rose focus:ring-2 focus:ring-beauty-blush/20 shadow-lg text-gray-800 placeholder-gray-400 transition-all duration-300"
                placeholder="Search for products..."
                onChange={search}
                value={query}
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loadingStatus == "loaded" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                {products.map((product) => {
                  if (!product || !product.productId) return null;
                  return (
                    <div key={product.productId} className="transform transition-all duration-300 hover:scale-105">
                      <ProductCard product={product} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-block p-8 bg-white rounded-2xl shadow-lg">
                  <p className="text-xl text-gray-600 mb-2">No products found</p>
                  <p className="text-gray-500">Try adjusting your search terms</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loadingStatus == "loading" && (
          <div className="w-full min-h-[60vh] flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full h-24 w-24 sm:h-32 sm:w-32 bg-gradient-to-tr from-beauty-dusty-rose to-beauty-blush opacity-30 blur-lg"></div>
              <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-[6px] border-gray-200 border-t-beauty-dusty-rose border-t-8 shadow-lg"></div>
            </div>
          </div>
        )}
      </div>
    )
}
