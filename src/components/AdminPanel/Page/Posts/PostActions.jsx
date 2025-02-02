import React, { useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa6";
import { HiCheck } from "react-icons/hi"

import { FaHouseUser } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";


import fourGrid from "../../../../assets/fourGrid.png";
import fiveGrid from "../../../../assets/fiveGrid.png";

const PostActions = ({changeGridView, handleGrid}) => {

  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  //View or Rage
  const [viewOrRange, setViewOrRange] = useState([
    { id: 1, name: "View" }, { id: 2, name: "Range" },
  ]);
  const [selectedViewOrRange, setSelectedViewOrRange] = useState(1);
  const handleViewOrRange = (id) => {
    setSelectedViewOrRange(id);
  }

  //last Date
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDate = (date) => {
    setSelectedDate(date);
  }

  //View
  const [view, setView] = useState([
    { id: 1, name: "most" }, { id: 2, name: "less" },
  ]);
  const [selectedView, setSelectedView] = useState(null);
  const handleView = (id) => {
    setSelectedView(id);
  }

  //Location
  const [location, setLocation] = useState([
    { id: 1, name: "Location 1" }, { id: 2, name: "Location 2" }, { id: 3, name: "Location 3" },
  ]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleLocation = (id) => {
    setSelectedLocation(id);
  }

  //Post Rating
  const [rating, setRating] = useState([
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
  ]);
  const [selectedRating, setSelectedRating] = useState(null);
  const handleRating = (id) => {
    setSelectedRating(id);
  }

  //Categories  
  const categories = [
    { id: "pagoda", name: "Pagoda", icon: FaHouseUser },
    { id: "hotal", name: "Hotal", icon: FaPlaceOfWorship },
    { id: "food", name: "Food", icon: IoFastFoodSharp },
  ]
  const [selectedCategories, setSelectedCategories] = useState(["pagoda"])

  const handleCategories = (option) => {
    setSelectedCategories((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option) // Remove if already selected
        : [...prev, option] // Add if not selected
    );
  };

  //filter func
  const filter = () => {
    console.log("selectedDate ", selectedDate);
    console.log("selectedLocation ", selectedLocation);
    console.log("selectedView ", selectedView);
    console.log("selectedRating ", selectedRating);
    console.log("selected ", selectedCategories);
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-end justify-between p-4 rounded-lg ">
      <div className="flex justify-between">
        {/* Search Bar */}
        <div className="flex items-center border-2 border-[#14637A] rounded-md  w-full max-w-md relative">
          <input
            type="text"
            placeholder="Search All..."
            className="w-full pl-3 border-none focus:outline-none focus:ring-0  rounded-md"
          />
          <IoSearch className="h-6 w-6 text-gray-500 mr-2 absolute right-0" />
        </div>

        <div className="relative flex items-center">
          {/* Filter Button */}
          <FaFilter
            onClick={() => setOpenFilterMenu(!openFilterMenu)}
            className="h-6 w-6 text-gray-500 ml-4 my-4 cursor-pointer"
          />

          {/* Filter Tooltip */}
          {openFilterMenu && (
            <div className="absolute left-0 top-12 -translate-x-1/2 w-auto p-4 bg-white shadow-md rounded-md z-10">

              <div className="flex w-[200px] justify-evenly rounded-md bg-gray-100 text-gray-600 mt-2">
                {viewOrRange.map(({ id, name }) => (
                  <div key={id} onClick={() => handleViewOrRange(id)} className={`p-2 w-full flex justify-center rounded-md cursor-pointer
                    ${selectedViewOrRange === id ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    {name}
                  </div>
                ))}
              </div>

              {selectedViewOrRange === 1 && (
                <>
                  <div className="text-sm font-semibold mt-5">Latest upload Date</div>
                  <input onChange={(e) => handleDate(e.target.value)} type="date" className="w-full mt-2 p-2 border rounded " />

                  <div className="text-sm font-semibold mt-5">Most/Less views</div>
                  <select onClick={(e) => handleView(e.target.value)} className="w-full mt-2 p-2 border rounded">
                    {view.map(({ id, name }) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>

                  <div className="text-sm font-semibold mt-5">Locations</div>
                  <select onClick={(e) => handleLocation(e.target.value)} className="w-full mt-2 p-2 border rounded">
                    {location.map(({ id, name }) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>

                  <div className="text-sm font-semibold mt-5">Post Rating</div>
                  <div className="flex w-[200px] mt-2 justify-between">
                    {rating.map(({ id }) => (
                      <div key={id} onClick={() => handleRating(id)} className={`p-2 w-full flex justify-center rounded-md cursor-pointer
                    ${selectedRating === id ? "bg-black text-white" : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        {id}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm font-semibold mt-5">Categories</div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {categories.map(({ id, name, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => handleCategories(id)}
                        className={`flex items-center px-3 py-1.5 rounded-full text-sm transition-colors
                  ${selectedCategories.includes(id) ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"}`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {name}
                      </button>
                    ))}
                  </div>
                </>
              )}

              <button onClick={filter} className="text-white bg-[#14637A] p-3 w-full rounded-md mt-4">Filter</button>

            </div>
          )}
        </div>

        <div>
          <img onClick={() => handleGrid()} className="h-6 w-6 ml-5 my-4 cursor-pointer" src={ changeGridView ? fourGrid : fiveGrid } alt="" />
        </div>
      </div>

      {/* Create Post Button */}
      <Link
        to="/dashboard/create-post"
        className="flex items-center text-white bg-[#14637A] hover:scale-105 duration-300 ease-in-out  font-bold px-2 md:px-4 py-2 rounded-md shadow-sm md:ml-4"
      >
        <MdAdd className="size-6 md:size-9 md:mr-2 " />
        Create Post
      </Link>
    </div>
  );
};

export default PostActions;
