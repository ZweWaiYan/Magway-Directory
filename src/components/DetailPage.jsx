import React, { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import pagoda1 from "../assets/pagoda/pagoda1.jpg";
import pagoda2 from "../assets/pagoda/pagoda2.jpg";
import pagoda3 from "../assets/pagoda/pagoda3.jpg";
import Review from "./Review";
import YouMayLike from "./YouMayLike";
import Footer from "./Footer";
import DetailMap from "./DetailMap";

import { IoLocation } from "react-icons/io5";

import noLike from "../assets/noLike.png";
import liked from "../assets/liked.png";
import { useLocation } from 'react-router-dom';

import { AllDemoDataFood, AllDemoDataHotal, AllDemoDataPagoda } from "../constants/index.jsx";

import { motion } from "framer-motion";

const dataByCategory = {
  Hotal: AllDemoDataHotal,
  Food: AllDemoDataFood,
  Pagoda: AllDemoDataPagoda,
};


const DetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const routeCategory = location.state;
  const Data = dataByCategory[routeCategory][id - 1];

  const [favorites, setFavorites] = useState([]);
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFavorite = (pagodaTitle) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(pagodaTitle)) {
        return prevFavorites.filter((title) => title !== pagodaTitle);
      } else {
        return [...prevFavorites, pagodaTitle];
      }
    });
  };

  if (!Data) {
    return <h2 className="text-center mt-10">Pagoda not found</h2>;
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
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0 }}
              className="text-4xl font-bold text-cyan-900 mb-6"
            >
              {Data.title}
            </motion.h1>
            {/* Rating Section */}
            <div              
              className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2 text-cyan-600">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 7.5l8.25-4.5 8.25 4.5M3.75 16.5l8.25 4.5 8.25-4.5M3.75 7.5v9m16.5-9v9M12 3v18"
                  />
                </svg> */}
                <IoLocation className="w-8 h-8" />
                <span className="cursor-default">{Data.location}</span>
              </div>
              <div
                className="text-white cursor-pointer bg-cyan-500 px-3 py-2 rounded-md"
                onClick={() => setShowModal(true)}
              >
                <span>⭐{Data.rating} </span>
              </div>
            </div>
            <div          
              className="flex cursor-default justify-end text-cyan-600 mt-4"
            >
              <span>{Data.view_count} views</span>
            </div>
            <p           
              className="text-gray-700 text-lg mt-6">{Data.description}</p>
            <button          
              className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 mt-6 rounded shadow-md hover:scale-105 transform transition-transform">
              See More ↓
            </button>
          </div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0 }}
            className="lg:w-1/2 relative flex justify-center"
          >
            {/* Pagoda Image with Tilt Effect */}
            <img
              src={Data.img}
              alt={Data.title}
              className="w-full max-w-md md:max-w-lg lg:max-w-none transform scale-100 hover:scale-105 transition-transform rounded-lg shadow-lg"
              style={{
                transform: "perspective(1000px) rotateY(-35deg)",
                transition: "transform 0.5s ease",
              }}
            />

            {/* Favorite Heart Button */}
            <div onClick={() => toggleFavorite(Data.title)} className="absolute top-0 right-7 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center">
              <img className="w-[20px] h-[20px]" src={favorites.includes(Data.title) ? liked : noLike} alt="" />
            </div>
          </motion.div>

        </div>
        <Review />
        <DetailMap />
        <YouMayLike />
      </div>

      {/* Footer */}
      <Footer />

      {/* Rating Modal */}
      {showModal && (
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
      )}
    </div>
  );
};

export default DetailPage;
