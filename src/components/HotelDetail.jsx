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
import axiosInstance from "./AxiosInstance";
import { toast } from "react-toastify";

const HotelDetail = () => {
    const { category, id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [rating, setRating] = useState(0);
    const [showModal, setShowModal] = useState(false);


  // Scroll to the top when the component loads
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try{
        const response = await axios.get(`/api/category/hotels/${id}`);
        setHotel(response.data);
      }catch(err){
        console.error("Error fetching hotel details:", err);
      }
    };
    fetchHotelDetails();
    window.scrollTo(0, 0);
  }, [category, id]);

  useEffect(() => {
    const fetchFavorites = async() =>{
      try{
        const response = await axiosInstance.get('/api/fav');
        const favoriteIds = response.data.map(fav => fav.post_id);
        setFavorites(favoriteIds);
      }catch(error){
        toast.error('Favorite fetch error')
      }
    }
    const token = localStorage.getItem('token');
    if(token) fetchFavorites();
  }, []);

  // Toggle favorite function
  const toggleFavorite = async(id) => {
    try{
      const token = localStorage.getItem('token');
      if(!token){
        toast.error('Please login to add to your favorites');
        return;
      }
      setFavorites((prevFavorites)=>{
        if(prevFavorites.includes(id)){
          return prevFavorites.filter((favoriteId) => favoriteId !== id);
        }else{
          return [...prevFavorites,id];
        }
      });
      const response = await axiosInstance.post('/api/fav',{'post_id':id});
      toast.success(response.data.message);
    }catch(error){
      toast.error('An error occured. Please try again later.');
    }
  };

  if (!hotel) {
    return <h2 className="text-center mt-10">Hotel not found</h2>;
  }

  return (
    <div className="bg-gradient-to-b from-cyan-100 to-cyan-300 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="max-w-5xl mx-auto p-4 mt-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Pagoda Info */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-cyan-900 mb-6">
              {hotel.title}
            </h1>
            {/* Rating Section */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2 text-cyan-600">
                <svg
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
                </svg>
                <span>{hotel.location}</span>
              </div>
              <div
                className="text-white cursor-pointer bg-cyan-500 px-4 rounded-md"
              >
                <span>⭐{hotel.average_rating} </span>
              </div>
            </div>
            <div className="flex justify-end text-cyan-600 mt-4">
              <span>{hotel.view_count} views</span>
            </div>
            <p className="text-gray-700 text-lg mt-6">{hotel.description}</p>
            <button className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 mt-6 rounded shadow-md hover:scale-105 transform transition-transform">
              See More ↓
            </button>
          </div>
          <div className="lg:w-1/2 relative">
            {/* Pagoda Image with Tilt Effect */}
            <img
              src={hotel.image_path}
              alt={hotel.name}
              className="w-full transform scale-100 hover:scale-105 transition-transform rounded-lg shadow-lg"
              style={{
                transform: "perspective(1000px) rotateY(-35deg)",
                transition: "transform 0.5s ease", 
              }}
            />

            {/* Favorite Heart Button */}
            <button
              onClick={() => toggleFavorite(hotel.id)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={favorites.includes(hotel.id) ? "pink" : "white"}
                stroke="currentColor"
                strokeWidth="2"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.5 5 20 6.5 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </button>
          </div>
        </div>
        <ReviewsSection categoryID={id}/>
        <DetailMap link={hotel.link}/>
        <YouMayLike category='Hotels' favorites={favorites}/>
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

export default HotelDetail;
