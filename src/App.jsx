import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import ProductIndex from "./components/ProductIndex";
import SignInForm from "./components/SignInForm";
import ShoppingCart from "./components/ShoppingCart";
import * as productService from "./services/productService";
import ProductDetails from "./components/ProductDetails";
import OrderHistory from './components/OrderHistory';
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmation from "./components/OrderConfirmation";
import { CartProvider } from "./contexts/CartContext";

const App = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productsData = await productService.index();
        setProducts(productsData || []);
        console.log("productsData:", productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user) fetchAllProducts();
  }, [user]);

  return (
    <>
     
      {user && <NavBar />}

      <Routes>
      
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        {user && (
          <>
            <Route path="/products" element={<ProductIndex products={products} />} />

            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/order-history" element={<OrderHistory />} />
          
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </>
          
        )}
      </Routes>
    </>
  );
};

export default App;
