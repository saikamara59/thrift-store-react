import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/jokermovie.gif"; // Ensure the path is correct

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); 
    }, 20000); 
    return () => clearTimeout(timer); 
  }, [navigate]);
  console.log(logo); 
  return (
    <section
  className="flex items-center justify-center h-screen bg-cover bg-center relative saturate-50 sepia-0"
  style={{ backgroundImage: `url(${logo})` }} // Set image as background
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="relative z-10 text-center bg-black bg-opacity-50 p-10 rounded-lg backdrop-blur-sm">
  <h1 className="text-6xl font-['Italiana'] text-[#ffffff] mb-4 font-stretch-extra-expanded ">
   A New York Thrift Store
</h1>
    <p className="text-4xl font-['Italiana'] text-[#ffffff] mb-4">
      Discover New York fashion and unique products.
    </p>
    <a
      href="/home"
      className="text-3xl font-['Italiana'] text-[#ffffff] mb-4"
    >
      Enter Store
    </a>
  </div>
</section>
  );
};

export default LandingPage;