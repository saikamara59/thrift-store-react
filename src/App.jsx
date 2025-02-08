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
      {/* Conditionally render NavBar only if user is logged in */}
      {user && <NavBar />}

      <Routes>
        {/* Public routes (always available) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />

        {/* Protected routes (only for logged-in users) */}
        {user && (
          <>
            <Route path="/products" element={<ProductIndex products={products} />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
// import React, { useContext, useState, useEffect } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { UserContext } from "./contexts/UserContext";
// import LandingPage from "./components/LandingPage";
// import HomePage from "./components/HomePage";
// import SignUpForm from "./components/SignUpForm";
// import ProductIndex from "./components/ProductIndex";
// import SignInForm from "./components/SignInForm";
// import * as productService from "./services/productService";

// const App = () => {
//   const { user } = useContext(UserContext);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       const productsData = await productService.index();
//       setProducts(productsData);
//       console.log("productsData:", productsData); // Debugging
//     };
//     if (user) fetchAllProducts();
//   }, [user]);

//   return (
//     <Routes>
//       {/* Always accessible routes */}
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/sign-in" element={<SignInForm />} />
//       <Route path="/sign-up" element={<SignUpForm />} />

//       {/* Protected routes (only accessible when user is authenticated) */}
//       {user ? (
//         <>
//           <Route path="/products" element={<ProductIndex products={products} />} />
//           <Route path="/home" element={<HomePage />} />
//         </>
//       ) : (
//         // Redirect unauthenticated users to the landing page
//         <Route path="*" element={<Navigate to="/home" />} />
//       )}
//     </Routes>
//   );
// };

// export default App;