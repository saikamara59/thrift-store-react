import React from "react";
import { Link } from "react-router";
import image from "../assets/fashionweek.gif"; 

const HomePage = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }} 
    >
      <div className="flex flex-col md:flex-row justify-between p-4 md:p-9 flex-grow bg-customYellow bg-opacity-50">
       
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-opacity-20 rounded-lg shadow-inner mb-4 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-irish font-bold text-red-500">
            About
          </h1>
          <p className="text-left mt-4 md:mt-7 font-irish font-bold text-md md:text-md">
          Welcome to A New York Thrift Store, where fashion meets sustainability! Founded in 2025 by Saidu Kamara, our store was born out of a passion for unique, high-quality fashion and a commitment to reducing waste in the fashion industry. We believe that style shouldn't come at the expense of the planet, and that's why we're dedicated to offering a curated selection of vintage, pre-loved, and rare fashion pieces. We get rare timeless pieces from past decades that tell a story.
          </p>
        </div>

        <div className="w-full md:w-1/2 p-4 md:p-6 bg-opacity-20 rounded-lg shadow-inner flex flex-col items-end">
          <Link
            className="text-right mb-2 font-irish font-bold text-blue-300 text-2xl md:text-5xl"
            to="/sign-in"
          >
            Sign In
          </Link>
          <Link
            className="text-right font-irish font-bold text-blue-300 text-2xl md:text-5xl"
            to="/sign-up"
          >
            Sign Up
          </Link>
        </div>
      </div>

      <footer className="bg-customYellow text-center py-4 mt-auto">
        <p className="text-md md:text-lg font-irish">
          &copy; 2025 A New York Thrift Store. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;


