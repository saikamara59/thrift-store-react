import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/fashionweek.gif"; // Import the image

const HomePage = () => {
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }} // Set the background image here
    >
      <div className="flex justify-between p-9 flex-grow bg-customYellow bg-opacity-50">
        <div className="flex flex-col shadow-inner w-1/2 p-6 bg-opacity-20 rounded-lg">
          <h1 className="text-5xl font-irish font-bold text-red-500">
            About
          </h1>
          <p className="text-left mt-4 font-irish font-bold text-2xl">
            A New York Thrift Store was started by a young developer by the name of Saidu Kamara in 2025. This store sells high-end fashion pieces and rare vintage items. We purchase rare items as well.
          </p>
        </div>
        <div className="flex flex-col items-end w-1/2 text-5xl shadow-inner p-6 bg-opacity-20 rounded-lg">
          <Link className="text-right mb-2 font-irish font-bold text-blue-300" to="/sign-in">
            Sign In
          </Link>
          <Link className="text-right font-irish p-6 font-bold text-blue-300" to="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
      <footer className="bg-customYellow text-center py-4 mt-auto">
        <p className="text-lg font-irish">
          &copy; 2025 A New York Thrift Store. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;



