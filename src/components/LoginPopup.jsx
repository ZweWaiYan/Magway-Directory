import { X } from "lucide-react";
import { useState } from 'react';
import PropTypes from 'prop-types';
import SignupPopup from './SignupPopup';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "./AxiosInstance";
import axios from "axios";

import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const LoginPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isSignupPopUpOpen, setSignupPopUpOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openSignupPopup = () => setSignupPopUpOpen(true);
  const closeSignupPopup = () => setSignupPopUpOpen(false);

  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:3000/login", { email, password });
      if (res.data.status === "Success" && res.data.token) {
        toast.success("Login successful!");
        localStorage.setItem("token", res.data.token);
        window.location.href = '/'
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // Handle Signup
  const handleSignup = () => {
    navigate("/signup");
  };

  // Handle Logout
  const handleLogout = async () => {
    try{
      const res = await axiosInstance.get('http://localhost:3000/logout')
      if(res.status === 201){
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/");
      }
    }catch(error){
      toast.error('An error occured.')
    }
  };

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <div className="fixed inset-0 z-50 py-5 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
        >
          <X />
        </button>

        {/* Popup Title */}
        <h2 className="text-xl font-semibold text-center mb-4 text-cyan-800">
          {isLoggedIn ? "Logout" : "Login"}
        </h2>

        {/* Login/Logout Form */}
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-600"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember Me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-cyan-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 rounded-md shadow-md hover:scale-105 transform transition-transform"
            >
              Login
            </button>
          </form>
        ) : (
          <div>
            <p className="text-center text-gray-700 mb-4">You are logged in!</p>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-4 rounded-md shadow-md hover:scale-105 transform transition-transform"
            >
              Logout
            </button>
          </div>
        )}

        {/* Footer */}
        {!isLoggedIn && (
          <p className="text-sm text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <button onClick={openSignupPopup} className="text-cyan-600 hover:underline">
              SignUp
            </button>
          </p>
        )}
      </div>

      <SignupPopup isOpen={isSignupPopUpOpen} onClose={closeSignupPopup} />
    </div>
  );
};

LoginPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginPopup;