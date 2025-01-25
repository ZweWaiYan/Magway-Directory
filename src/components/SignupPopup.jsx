import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginPopup from './LoginPopup';

const SignupPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
    region: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleSignup = () => {
    if (
      !formData.email ||
      !formData.username ||
      !formData.password1 ||
      !formData.password2 ||
      !formData.region ||
      !formData.age
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.password1 !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      email: formData.email,
      username: formData.username,
      password1: formData.password1,
      password2: formData.password2,
      age: formData.age,
      region: formData.region,
    };

    axios
      .post("/api/signup", payload)
      .then(() => {
        toast.success("Signup successful!");
        setFormData({
          email: "",
          username: "",
          password1: "",
          password2: "",
          region: "",
          age: "",
        });
        onClose();
        //navigate('/'); // Optionally navigate to another page after success
      })
      .catch((err) => {
        console.error("Error during signup:", err);
        toast.error("Signup failed. Try again.");
      });
  };

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
          Sign Up
        </h2>

        {/* Sign-Up Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password1" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password1"
              name="password1"
              placeholder="Enter your password"
              value={formData.password1}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Confirm your password"
              value={formData.password2}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
            />
          </div>

          {/* Region Selection */}
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              Region
            </label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
            >
              <option value="">Select your region</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>

          {/* Age Radio Button */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Age Group</p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="age"
                  value="under_18"
                  checked={formData.age === "under_18"}
                  onChange={handleChange}
                  className="h-4 w-4 text-cyan-600 border-gray-300 focus:ring-cyan-600"
                />
                <span className="ml-2 text-sm text-gray-600">Under 18</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="age"
                  value="over_18"
                  checked={formData.age === "over_18"}
                  onChange={handleChange}
                  className="h-4 w-4 text-cyan-600 border-gray-300 focus:ring-cyan-600"
                />
                <span className="ml-2 text-sm text-gray-600">Over 18</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="age"
                  value="over_40"
                  checked={formData.age === "over_40"}
                  onChange={handleChange}
                  className="h-4 w-4 text-cyan-600 border-gray-300 focus:ring-cyan-600"
                />
                <span className="ml-2 text-sm text-gray-600">Over 40</span>
              </label>
            </div>
          </div>

          {/* Sign-Up Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 rounded-md shadow-md hover:scale-105 transform transition-transform"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <button onClick={onClose}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

SignupPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignupPopup;
