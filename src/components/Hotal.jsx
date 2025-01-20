import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Slide, Fade } from "react-awesome-reveal"

import Aos from "aos";
import "aos/dist/aos.css";

const Hotal = () => {
  const [hotelImages, setHotelImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    Aos.init({ duration: 2000 });

    const fetchHotelImages = async () => {
      try {
        const response = await fetch('/api/category/hotels');
        const data = await response.json();
        setHotelImages(data);
      } catch (error) {
        console.error("Error fetching hotel images:", error);
      }
    };

    fetchHotelImages();
  }, []);

  const handleSeeMore = () => {
    navigate('/allData', { state: "hotels"  });
  };

  return (
    <div id='hotal' className="max-w-[1400px] m-auto lg:pt-10 pt-10 pd-10 lg:px-16 px-4 grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
      {/* Left Side (Images) */}

      <div data-aos="fade-right" className="grid grid-cols-2 grid-rows-6 col-span-2 h-auto lg:h-[80vh] gap-2 order-2 lg:order-1 overflow-hidden">
        {
          hotelImages.map(({ id, image_path, title }) => (
            <div key={id} className={`p-2 ${id === 1 || id === 4 ? 'row-span-3' : 'row-span-2'}`}>
              <div className="text-white shadow-md rounded-lg overflow-hidden relative group h-full">
                <img src={image_path} alt={title} className="object-cover w-full h-full rounded-lg" />
                {/* Overlay section */}
                <div className="absolute left-0 top-[-100%] opacity-0 group-hover:opacity-100 group-hover:top-[0] p-4 w-full h-full bg-black/60 group-hover:backdrop-blur-sm duration-500">
                  <div className="space-y-4">
                    <Slide cascade>
                      <h1 className='text-2xl sm:text-0x1 font-bold'>{title}</h1>
                      <div damping={0.05}>
                        <button
                          onClick={() => navigate(`/hotels/${id}`, { state: "hotels" })}
                          className='border border-white px-4 py-2 rounded-lg hover:bg-black/20 duration-300'>
                          View
                        </button>
                      </div>
                    </Slide>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>


      {/* Right Side (Title and Button) */}
      <div data-aos="fade-left" className="flex flex-col justify-center items-center text-center order-1 lg:order-2">
        <h3 className="text-2xl lg:text-3xl font-georgia text-black font-bold mb-4">Choose your favorite place!</h3>
        <div className="mt-4">
          <button
            onClick={() => navigate('/allData', { state: "hotels" })}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 rounded-md shadow-md hover:scale-105 transform transition-transform">See More</button>
        </div>
      </div>
    </div >


  )
}

export default Hotal;