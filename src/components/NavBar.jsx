import storelogo from '../assets/storelogo.png';
import { CiShoppingCart } from "react-icons/ci";
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import React from 'react';
import { FaSignOutAlt } from "react-icons/fa";

const NavBar = () => {
  // Access user and setUser from the UserContext
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
    navigate('/home');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white relative opacity-80">
      <div className="absolute left-4 top-4">
        <img src={storelogo} alt="Store Logo" className="h-11" />
      </div>

   
      <ul className="flex space-x-6 items-center justify-center flex-grow"> 
        {user ? (
          <>
            <li>Welcome, {user.username}</li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">
                <CiShoppingCart className="text-2xl" /> 
              </Link>
            </li>
            <li>
              <Link to="/home" onClick={handleSignOut}>
                <FaSignOutAlt className='text-2xl' />
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