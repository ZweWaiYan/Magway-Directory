import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import pagoda1 from "../assets/pagoda/pagoda1.jpg";
import pagoda2 from "../assets/pagoda/pagoda2.jpg";
import pagoda3 from "../assets/pagoda/pagoda3.jpg";
import ReviewsSection from "./Review";
import YouMayLike from "./YouMayLike";
import Footer from "./Footer";
import DetailMap from "./DetailMap";
import { toast } from "react-toastify";
import axiosInstance from "./AxiosInstance";

import { IoLocation } from "react-icons/io5";

import noLike from "../assets/noLike.png";
import liked from "../assets/liked.png";

import { motion } from "framer-motion";

const FoodDetail = () => {
  const { category, id } = useParams();
  const [food, setFood] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);


  // Scroll to the top when the component loads
  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`/api/category/Foods/${id}`);
        setFood(response.data);
      } catch (err) {
        console.error("Error fetching food details:", err);
      }
    };
    fetchFoodDetails();
    window.scroll(0, 0);
  }, [category, id]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/api/fav');
        const favoriteIds = response.data.map(fav => fav.post_id);
        setFavorites(favoriteIds);
      } catch (error) {
        toast.error('Favorite fetch error');
      }
    }
    const token = localStorage.getItem('token');
    if (token) fetchFavorites();
  }, []);

  // Toggle favorite function
  const toggleFavorite = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to add to Your favourites.");
        return;
      }
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(id)) {
          return prevFavorites.filter((title) => title !== id);
        } else {
          return [...prevFavorites, id];
        }
      });
      const response = await axiosInstance.post('/api/fav', { 'post_id': id });
      toast.success(response.data.message);
    } catch (err) {
      toast.error("An error occured. Please try again later.")
      console.error('Failed to set Favorite : ', err.message)
    }
  };


  if (!food) {
    return <h2 className="text-center mt-10">Food not found</h2>;
  }

  return (
    <div className="bg-gradient-to-b from-cyan-100 to-cyan-300 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="max-w-5xl mx-auto p-4 mt-8">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-10">
          {/* Pagoda Info */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-cyan-900 mb-6">
              {food.title}
            </h1>
            {/* Rating Section */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2 text-cyan-600">
                <IoLocation className="w-8 h-8" />
                <span>{food.location}</span>
              </div>
              <div
                className="text-white cursor-pointer bg-cyan-500 px-4 py-2 rounded-md"
              >
                <span>⭐{food.average_rating} </span>
              </div>
            </div>
            <div className="flex justify-end text-cyan-600 mt-4">
              <span>{food.view_count} views</span>
            </div>
            <p className="text-gray-700 text-lg mt-6">{food.description}</p>
            <button className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 mt-6 rounded shadow-md hover:scale-105 transform transition-transform">
              See More ↓
            </button>
          </div>
          <div className="lg:w-1/2 relative">
            {/* Pagoda Image with Tilt Effect */}
            <img
              src={food.image_path}
              alt={food.name}
              className="w-full transform scale-100 hover:scale-105 transition-transform rounded-lg shadow-lg"
              style={{
                transform: "perspective(1000px) rotateY(-35deg)",
                transition: "transform 0.5s ease",
              }}
            />

            {/* Favorite Heart Button */}
            <div onClick={() => toggleFavorite(food.id)} className="absolute top-0 right-7 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center">
              <img className="w-[20px] h-[20px]" src={favorites.includes(food.id) ? liked : noLike} alt="" />
            </div>
          </div>
        </div>
        <ReviewsSection categoryID={id} />
        <DetailMap link={food.link} />
        <YouMayLike category='Foods' favorites={favorites} />
      </div>

      {/* Footer */}
      <Footer />
      {/* Rating Modal */}

      {/*showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">Rate this Pagoda</h3>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setRating(star)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= rating ? "yellow" : "gray"}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="bg-cyan-600 text-white py-2 px-4 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )*/}
    </div>

  );
};

export default FoodDetail;
