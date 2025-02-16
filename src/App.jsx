import React from "react";
import { useContext, useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import SignUpForm from "./components/SignUpForm";
import ProductIndex from "./components/ProductIndex";
import SignInForm from "./components/SignInForm";
import ShoppingCart from "./components/ShoppingCart";
import * as productService from "./services/productService";
import ProductDetails from "./components/ProductDetails";
import OrderHistory from "./components/OrderHistory";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmation from "./components/OrderConfirmation";

const App = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productsData = await productService.index();
        setProducts(productsData || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    if (user) {
      fetchAllProducts();
    } else {
      setIsLoading(false); 
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        {user ? (
          <>
            <Route
              path="/products"
              element={<ProductIndex products={products} />}
            />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" />} />
        )}
      </Routes>
    </>
  );
};

export default App;
