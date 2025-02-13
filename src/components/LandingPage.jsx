import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/jokermovie.gif"; // Ensure the path is correct

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // Redirect to the home page after 5 seconds
    }, 20000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  console.log(logo); // Debug: Check if the GIF path is correct

  return (
    <section
  className="flex items-center justify-center h-screen bg-cover bg-center relative saturate-50 sepia-0"
  style={{ backgroundImage: `url(${logo})` }} // Set image as background
>
  {/* Semi-transparent overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Content */}
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