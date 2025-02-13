import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router';
import { signUp } from '../services/authService';
import { UserContext } from '../contexts/UserContext';
import storelogo from '../assets/storelogo.png'; // Path to your store logo
import thriftbg from '../assets/thriftstore.jpg'; // Path to your background image

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const { username, email, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formData);
    try {
      const newUser = await signUp(formData);
      console.log(newUser);
      setUser(newUser);
      navigate('/home');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${thriftbg})` }} // Set the background image
    >
      {/* Store Logo in Top Left */}
      <div className="absolute top-5 left-5">
        <img src={storelogo} alt="Store Logo" className="h-12" /> {/* Adjust height as needed */}
      </div>

      {/* Sign Up Form */}
      <main className="bg-red-400 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md inner-shadow">
        <h1 className="text-4xl  mb-4 text-center font-irish font-bold">Sign Up</h1>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        <h2 className="text-center text-lg">Enter your correct details to get started</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username"
             className="block text-2xl font-medium text-gray-700 p-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 text-2xl">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" 
            className="block text-sm font-medium text-gray-700 text-2xl">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 text-2xl">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              placeholder="Confirm your password"
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isFormInvalid()}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUpForm;