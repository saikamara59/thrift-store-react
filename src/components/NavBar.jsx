import storelogo from "../assets/storelogo.png";
import vintage from "../assets/vintage.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContext";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaStore } from "react-icons/fa";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/home");
  };

  return (
    <nav
      className="flex items-center justify-between p-4 text-white relative text-lg"
      style={{
        backgroundImage: `url(${vintage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.9,
      }}
    >
      <div className="absolute left-4 top-4">
        <img src={storelogo} alt="Store Logo" className="h-11" />
      </div>

      <ul className="flex space-x-6 items-center justify-center flex-grow">
        {user ? (
          <>
            <li className="text-md text-black font-semibold">Welcome, {user.username}</li>
            <li>
              <Link to="/products">
                <FaStore className="text-3xl" />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <FaShoppingCart className="text-3xl" />
              </Link>
            </li>
            <li>
              <Link to="/home" onClick={handleSignOut}>
                <FaSignOutAlt className="text-3xl" />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
