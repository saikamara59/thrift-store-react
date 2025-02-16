import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import logo from "../assets/jokermovie.gif";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 20000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section
      className="flex items-center justify-center h-screen bg-cover bg-center relative saturate-50 sepia-0"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-25"></div>
      <div className="relative z-10 text-center bg-black bg-opacity-60 p-6 md:p-10 rounded-lg backdrop-blur-sm">
        <h1 className="text-4xl md:text-6xl font-['Italiana'] text-white mb-4">
          A New York Thrift Store
        </h1>
        <p className="text-xl md:text-3xl font-['Italiana'] text-white mb-6">
          Discover New York fashion and unique products.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="text-lg md:text-xl text-white px-4 py-2 border border-transparent rounded hover:bg-white hover:text-black transition"
        >
          Enter Store
        </button>
      </div>
    </section>
  );
};

export default LandingPage;

