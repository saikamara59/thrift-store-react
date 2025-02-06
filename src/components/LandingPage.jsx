import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/jokermovie.gif"; // Ensure the path is correct

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // Redirect to the home page after 5 seconds
    }, 10000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  console.log(logo); // Debug: Check if the GIF path is correct

  return (
    <section
      className="flex items-center justify-center h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${logo})`, border: "2px solid red" }} // Debug border
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center bg-black bg-opacity-50 p-10 rounded-lg">
        <img
          src={logo}
          alt="Warner Bros Logo"
          className="w-36 mx-auto mb-6" // Adjust logo size and spacing
        />
        <h1 className="text-5xl font-bold text-white mb-4">
          New York Thrift Store
        </h1>
        <p className="text-xl text-white mb-8">
          Discover amazing deals and unique products.
        </p>
        <a
          href="/home"
          className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-orange-600 transition-colors"
        >
          Enter Store
        </a>
      </div>
    </section>
  );
};

export default LandingPage;