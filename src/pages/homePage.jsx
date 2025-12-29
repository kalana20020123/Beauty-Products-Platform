import { Route, Routes } from 'react-router-dom';
import Header from '../components/header';
import LoginPage from './loginPage';
import SignupPage from './signupPage';
import ProductOverview from './home/productOverview';
import Home from './home/home';
import ProductPage from './home/product';
import Cart from './home/cart';
import ShippingPage from './home/shipping';
import MyOrdersPage from './home/orders';
import ContactUs from './home/contactUs';
import AboutUs from './home/aboutUs';
import UserDetails from './home/userDetails';

export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <Header />
      <div className='w-full h-[calc(100vh-100px)] '>
        <Routes path="/*">
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<ProductPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/shipping" element={<ShippingPage/>}/>   
          <Route path="/orders" element={<MyOrdersPage/>}/>
          <Route path="/productInfo/:id" element={<ProductOverview/>} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/user" element={<UserDetails />} />
        </Routes>  
      </div>    
    </div>
  ); 
}