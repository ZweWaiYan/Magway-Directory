import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import axiosInstance from "./AxiosInstance";
import noLike from "../assets/noLike.png";
import liked from "../assets/liked.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const YouMayLike = ({category, favorites}) => {
  const [items, setItems] = useState([]); 
  //const [favorites, setFavorites] = useState([]);
  console.log(favorites)
  const navigate = useNavigate();

  const handleViewClick = (id, category) =>{
    if (id && category) {
      navigate(`/${category.toLowerCase()}/${id}`, { state: category });
    } else {
        console.error("Invalid ID");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await axios.get(`/api/categories/${category}`);


        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]);


  /*const toggleFavorite = async (title) => {
    try {
      await axiosInstance.post("/api/user/favorites", { title });

      setFavorites((prevFavorites) =>
        prevFavorites.includes(title)
          ? prevFavorites.filter((fav) => fav !== title)
          : [...prevFavorites, title]
      );
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };*/

  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-2xl font-bold mb-4">You May Like</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden relative"
          >
            <img
              src={item.image_path}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

              <div
                onClick={() => toggleFavorite(item.title)}
                className="absolute top-4 right-4 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center"
              >
                <img className="w-[20px] h-[20px]" src={favorites.includes(item.id) ? liked : noLike} alt="" />
              </div>

              <button
              onClick={() => handleViewClick(item.id, item.category || category)} 
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 rounded-md shadow-md hover:scale-105 transform transition-transform">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default YouMayLike;
