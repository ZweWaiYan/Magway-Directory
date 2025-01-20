import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import pagoda1 from '../assets/pagoda/pagoda1.jpg'
import pagoda2 from '../assets/pagoda/pagoda2.jpg'
import pagoda3 from '../assets/pagoda/pagoda3.jpg'
import pagoda4 from '../assets/pagoda/pagoda4.jpg'
import pagoda5 from '../assets/pagoda/pagoda5.jpg'

import { Slide, Fade } from "react-awesome-reveal"

import Aos from "aos";
import "aos/dist/aos.css";

// const pagodaImg = [
//   {
//     id: 1,
//     img: pagoda1,
//     title: 'Image1',
//   },
//   {
//     id: 2,
//     img: pagoda2,
//     title: 'Image2',
//   },
//   {
//     id: 3,
//     img: pagoda3,
//     title: 'Image3',
//   },
// ];
/*
const pagodaDemoData = [
  {
    id: 1,
    title: "Mya Tha Lon Pagoda",
    description:
      "According to legend, the pagoda was initially built by a wealthy man called U Baw Gyaw and his wife. It was raised from its original height of 55.5 feet (16.9 m) to a height of 87 feet (27 m) by King Saw Lu (1077-1084) of Bagan. The pagoda faced a huge earthquake in 1847 and it was rebuilt by the mayor of Magway, Min Din Min Hla Kyaw Gaung to the present height of approximately 104 feet (32 m). It is famous because The Bed of Buddha is placed inside it.",
    img: pagoda1,
    location: "Magway",
    rating: 5.0,
    views: 188,
  },
  {
    id: 2,
    title: "Pagoda 2",
    description: "This is Pagoda 2.",
    img: pagoda2,
    location: "Location 2",
    rating: 4.8,
    views: 120,
  },
  {
    id: 3,
    title: "Pagoda 3",
    description: "This is Pagoda 3.",
    img: pagoda3,
    location: "Location 3",
    rating: 4.5,
    views: 95,
  },
];*/

const Pagoda = () => {
  const [pagodaImages, setPagodaImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });

    const fetchPagodaImages = async () => {
      try {
        const response = await fetch('/api/category/Pagodas');
        if (response.ok) {
          const data = await response.json();
          setPagodaImages(data.length ? data : []);
        } else {
          console.error("Failed to fetch pagoda images.");
        }
      } catch (error) {
        console.error("Error fetching pagoda images:", error);
      }
    };

    fetchPagodaImages();
  }, []);

  return (
    <div id='pagoda' className=" max-w-[1400px] m-auto pt-12 pb-16 lg:pl-16 lg:pr-4 px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-hidden">
      {/* Left Side (Images) */}
      <div data-aos="fade-right" className="grid grid-cols-2 grid-rows-2 col-span-1 h-auto lg:h-[80vh] gap-2 order-2 lg:order-1 overflow-hidden">
        {pagodaImages.slice(0, 3).map(({ id, image_path, title }) => (
          <div key={id} className={`p-2 ${id === 1 ? 'col-span-2' : 'col-span-1'}`}>
            <div className="text-white shadow-md rounded-lg overflow-hidden relative group h-full">
              <img
                src={image_path} 
                alt={title} 
                className="object-cover w-full h-full rounded-lg" />
              <div className="absolute left-0 top-0 opacity-0 group-hover:opacity-100 p-4 w-full h-full bg-black/60 group-hover:backdrop-blur-sm duration-500 transform translate-y-[-100%] group-hover:translate-y-0">
                <div className="space-y-4">
                  <Slide cascade>
                    <h1 className='text-2xl sm:text-0x1 font-bold'>{title}</h1>
                    <div damping={0.05}>
                      <button className='border border-white px-4 py-2 rounded-lg hover:bg-black/20 duration-300'
                        //onClick={() => navigate(`/details/${id}`, { state: "Pagoda" })}>
                        onClick={() => navigate(`/Pagodas/${id}`, { state: "Pagodas" })}>
                        View
                      </button>
                    </div>
                  </Slide>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side (Title and Button) */}
      <div data-aos="fade-left" className="flex flex-col justify-center items-center text-center order-1 lg:order-2">
        <h3 className="text-2xl lg:text-3xl text-black font-georgia  mix-blend-difference font-bold mb-4">Choose your favorite place!</h3>
        <div className="mt-4">
          <button
            onClick={() => navigate('/allData', { state: "Pagodas" })}
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-4 rounded-md shadow-md hover:scale-105 transform transition-transform">See More</button>
        </div>
      </div>
    </div>

  )
}

export default Pagoda;