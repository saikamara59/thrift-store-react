import  { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { UserContext } from '../contexts/UserContext';
import React from 'react'

const NavBar = () => {
  // Access user and setUser from the UserContext
  const { user, setUser } = useContext(UserContext);
  // const {user} = useContext(UserContext);
  const navigate = useNavigate();
  // Handle sign-out
  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
    navigate('/home');
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li>
          
          </li>
          <li><Link to="/products">Products</Link></li>
          <li> <Link to="/cart">View Cart</Link></li>  
          <Link to="/home" onClick={handleSignOut}>
              Sign Out
            </Link>
        </ul>
        
      ) : (
        <ul>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;