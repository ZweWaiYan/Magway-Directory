import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Aos from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';

const FoodSlider = () => {
  const [positionIndex, setPositionIndex] = useState([1, 2, 3, 4, 5]);
  const [isPaused, setIsPaused] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const fetchFoodItems = async () => {
    try {
      const category = 'Foods';
      const response = await axios.get(`/api/category/${category}`);
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const autoplay = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [isPaused, positionIndex]);

  const handleNext = () => {
    setPositionIndex((prevIndexes) => {
      return prevIndexes.map((prevIndex) => (prevIndex + 1) % 5);
    });
  };

  const handlePrevious = () => {
    setPositionIndex((prevIndexes) => {
      return prevIndexes.map((prevIndex) => (prevIndex - 1 + 5) % 5);
    });
  };

  const position = ['center', 'left1', 'left', 'right', 'right1'];

  const imageVariantsMobile = {
    center: { x: '0%', scale: 1, zIndex: 5 },
    left1: { x: '-30%', scale: 0.7, zIndex: 2 },
    left: { x: '-45%', scale: 0.5, zIndex: 1 },
    right: { x: '45%', scale: 0.5, zIndex: 1 },
    right1: { x: '30%', scale: 0.7, zIndex: 2 },
  };

  const imageVariantsWeb = {
    center: { x: '0%', scale: 1, zIndex: 5 },
    left1: { x: '-50%', scale: 0.7, zIndex: 2 },
    left: { x: '-90%', scale: 0.5, zIndex: 1 },
    right: { x: '90%', scale: 0.5, zIndex: 1 },
    right1: { x: '50%', scale: 0.7, zIndex: 2 },
  };

  return (
    <div id="food" className="max-w-[1400px] m-auto lg:pt-22 lg:mb-24 mb-44 pb-20 lg:px-16 px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen overflow-hidden">
      {/* Title and See More Button Section */}
      <div data-aos="fade-left" className="flex flex-col justify-center text-center order-1 lg:order-1">
        <h3 className="text-2xl text-black font-bold mb-4">Choose your favorite food!</h3>
        <button
          onClick={() => navigate('/allData', { state: "Foods" })}
          className="w-full bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 rounded-md shadow-md hover:scale-105 transform transition-transform mt-4"
        >
          See More
        </button>
      </div>

      {/* Image Section */}
      <div data-aos="fade-right" className="flex items-center flex-col justify-center order-2 lg:order-2 relative w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
          <button
            onClick={handlePrevious}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <BsChevronCompactLeft size={30} />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
          <button
            onClick={handleNext}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <BsChevronCompactRight size={30} />
          </button>
        </div>
        {foodItems.map(({ id, title, image_path, description, average_rating }) => (
          <motion.div
            key={id}
            className="absolute w-[250px]"
            initial="center"
            animate={position[positionIndex[id % positionIndex.length]]}
            variants={typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches
              ? imageVariantsMobile
              : imageVariantsWeb}
            transition={{ duration: 0.5 }}
            onPointerEnter={() => setIsPaused(true)}
            onPointerLeave={() => setIsPaused(false)}
          >
            <div className="text-white shadow-md rounded-lg overflow-hidden relative group h-full">
              <motion.img
                src={image_path}
                alt={title}
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute left-0 top-[-100%] opacity-0 group-hover:opacity-100 group-hover:top-0 p-4 w-full h-full bg-black/60 group-hover:backdrop-blur-sm duration-500">
                <div className="space-y-4 flex flex-col justify-center items-center h-full">
                  <h1 className="text-lg font-bold">{title}</h1>
                  <button
                    className="border border-white px-4 py-2 rounded-lg hover:bg-black/20 duration-300"
                    onClick={() => navigate(`/Foods/${id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoodSlider;
