import { Menu, X, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { navItems } from "../constants";
import logo from "../assets/logo.webp";
import LoginPopup from "./LoginPopup";
import Aos from "aos";
import "aos/dist/aos.css";

import boy from '../assets/boy.png'

import { useNavigate, useLocation } from 'react-router-dom';

import HeroImage from "../assets/HeroImage.jpg";

import { FaUserCircle } from "react-icons/fa";

//Icons
import { FaHouseUser } from "react-icons/fa";
import { FaPlaceOfWorship } from "react-icons/fa6";
import { IoFastFoodSharp } from "react-icons/io5";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";

// Importing images directly
import pagoda2 from "../assets/pagoda/pagoda1.jpg";
import hotel1 from "../assets/hotal/hotal1.jpg";
import food2 from "../assets/food/Yoeshin.jpeg";
import hotel4 from "../assets/hotal/hotal4.jpg";

const nearbyPlaces = [
  { id: 1, name: "Mya tha lon", image: pagoda2 },
  { id: 2, name: "Royal Palce Hotel", image: hotel1 },
  { id: 3, name: "Yoshin Restaurant", image: food2 },
  { id: 4, name: "Nan Htike Thu", image: hotel4 },
];


const Navbar = ({ textColor }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const heroImage = {
    backgroundImage: `url(${HeroImage})`,
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [mobileMenuHeading, setmobileMenuHeading] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState(nearbyPlaces);

  const searchBoxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSearchSuggestions(false); // Close suggestions if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNavbar = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileSearchOpen(false);
  };

  const toggleSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    setMobileMenuOpen(false);
  };

  const openLoginPopup = () => setLoginPopupOpen(true);
  const closeLoginPopup = () => setLoginPopupOpen(false);

  const handleSearchFocus = () => {
    setSearchSuggestions(true);
  };

  const handleSearchInput = (e) => {
    const query = e.target.value.toLowerCase(); // Convert query to lowercase
    setSearchText(e.target.value); // Keep the original value for display
    setFilteredPlaces(
      nearbyPlaces.filter((place) =>
        place.name.toLowerCase().includes(query) // Convert place name to lowercase for comparison
      )
    );
  };

  const handleNavigation = (sectionId) => {    
    if (location.pathname !== "/") {
      navigate("/home", { state: { sectionId } });
    } else {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Section with ID "${sectionId}" not found.`);
      }
    }
  };

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleSuggestionClick = (place) => {
    setSearchText(place.name);
    setSearchSuggestions(false); // Close suggestions dropdown
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 py-3 border-b border-neutral-700/80">
        <div className="container mx-auto relative text-sm">
          <div className="flex justify-between px-3 items-center">
            {/* Logo Section */}
            {!mobileSearchOpen && (
              <div data-aos="fade-right" className="flex items-center flex-shrink-0">
                <img className="h-10 w-10 mr-2" src={logo} alt="logo" />
                <span
                  className={`text-xl tracking-tight ${textColor}`}>Directory</span>
              </div>
            )}

            {/* Mobile Search */}
            {/* {mobileSearchOpen && (
              <div className="flex flex-grow">
                <div className="relative flex-grow" ref={searchBoxRef}>
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchInput}
                    onFocus={handleSearchFocus}
                    placeholder="Search nearby places..."
                    className="flex-grow bg-cyan-800 text-white py-2 px-3 rounded-md focus:outline-none"
                  />
                  {searchSuggestions && (
                    <div className="absolute bg-white shadow-lg rounded-md mt-2 w-full z-10">
                      {filteredPlaces.map((place) => (
                        <div
                          key={place.id}
                          onClick={() => handleSuggestionClick(place)}
                          className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                        >
                          <img
                            src={place.image}
                            alt={place.name}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                          <span className="text-sm text-gray-700">{place.name}</span>
                        </div>
                      ))}
                      {filteredPlaces.length === 0 && (
                        <div className="p-3 text-gray-500">No results found</div>
                      )}
                    </div>
                  )}
                </div>
                <button onClick={toggleSearch} className="ml-2 text-white">
                  <X />
                </button>
              </div>
            )} */}
            {/* Desktop Menu */}
            <ul className="hidden lg:flex mr-12 space-x-12">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  {index === 1 ? (
                    <div
                      onClick={() => handleNavigation(item.sublinks[index].link)}>
                      <div className={`hover:underline ${textColor} hover:text-cyan-600 transition duration-300 ease-in-out cursor-pointer`}>
                        {item.label}
                      </div>
                      {item.submenu && (
                        <div>
                          <div className="absolute hidden group-hover:block hover:block">
                            <div className="py-3">
                              <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                            </div>
                            <div className="bg-white p-3.5 rounded">
                              {
                                item.sublinks.map((subitem, index) => (
                                  <div key={index} >
                                    <li>
                                      <div
                                        onClick={() => { document.getElementById(subitem.link).scrollIntoView({ behavior: 'smooth' }) }}
                                        className="hover:underline p-2 text-black hover:text-cyan-600 transition duration-300 ease-in-out cursor-pointer">
                                        {subitem.name}
                                      </div>
                                    </li>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => handleNavigation(item.href)}>
                      <div className={`hover:underline ${textColor} hover:text-cyan-600 transition duration-300 ease-in-out cursor-pointer`}>
                        {item.label}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Desktop Search */}
            <div className="hidden lg:flex justify-center items-center space-x-4">
              {/* <div className="relative" ref={searchBoxRef}>
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearchInput}
                  onFocus={handleSearchFocus}
                  placeholder="Search nearby places..."
                  className="bg-cyan-800 text-white py-2 px-3 rounded-md focus:outline-none"
                />
                {searchSuggestions && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 w-full z-10">
                    {filteredPlaces.map((place) => (
                      <div
                        key={place.id}
                        onClick={() => handleSuggestionClick(place)}
                        className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                      >
                        <img
                          src={place.image}
                          alt={place.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <span className="text-sm text-gray-700">{place.name}</span>
                      </div>
                    ))}
                    {filteredPlaces.length === 0 && (
                      <div className="p-3 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
                <button className="absolute right-2 top-2 text-white">
                  <Search />
                </button>
              </div> */}
              {isLoggedIn ? (               
                 <img onClick={openLoginPopup} className='w-10 g-8 rounded-full border-2' src={boy} alt='' />
              ) :
                (
                  <button
                    onClick={openLoginPopup}
                    className="bg-gradient-to-r from-cyan-600 to-cyan-800 py-2 px-3 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300 text-white"
                  >
                    Login
                  </button>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* <button onClick={toggleSearch} className={`${textColor}`}>
                <Search />
              </button> */}
              <button onClick={toggleNavbar} className={`${textColor}`}>
                {mobileMenuOpen ? <X /> : <Menu />}   {/* What is "<X />" ? just use react-icons or something LOL :) */}
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed bg-gradient-to-r mt-5 w-full right-0 from-cyan-800 to-cyan-900 p-8 flex flex-col justify-between items-center lg:hidden">
              <ul className="space-y-6 group">
                {navItems.map((item, index) => (
                  <li key={index} className="relative flex justify-between group">
                    {index === 1 ? (
                      <div
                        onClick={() => mobileMenuHeading !== item.label ? setmobileMenuHeading(item.label) : setmobileMenuHeading('')} >
                        <div className="flex justify-between">
                          <div className={`pr-3 hover:underline ${textColor} hover:text-cyan-600 transition duration-300 ease-in-out cursor-pointer`}>
                            {item.label}
                          </div>

                          <span className="mt-1">
                            {mobileMenuHeading === item.label ? <SlArrowUp className={`size-3 ${textColor}`} /> : <SlArrowDown className={`size-3 ${textColor}`} />}
                          </span>
                        </div>

                        <div className={`${mobileMenuHeading === item.label ? 'md:hidden' : 'hidden'}`}>
                          {item.sublinks.map((slinks, index) => (
                            <div key={index}
                              onClick={() => {
                                handleNavigation(slinks.link);
                                setMobileMenuOpen(false);
                              }}
                              className={`pl-3 pt-5 ${textColor} cursor-po inter hover:text-cyan-600`}
                            >
                              {`- ${slinks.name}`}
                            </div>
                          ))}
                        </div>


                      </div>
                    ) : (
                      <div
                        onClick={() => { handleNavigation(item.href); setMobileMenuOpen(false); }} >
                        <div className={`hover:underline ${textColor} hover:text-cyan-600 transition duration-300 ease-in-out cursor-pointer`}>
                          {item.label}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {isLoggedIn ? (
                 <img onClick={openLoginPopup} className='mt-7 w-10 g-8 rounded-full border-2' src={boy} alt='' />
              ) :
                (
                  <button
                    onClick={openLoginPopup}
                    className="bg-gradient-to-r from-cyan-600 to-cyan-800 py-2 px-3 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300 text-white"
                  >
                    Login
                  </button>
                )}
            </div>
          )}
        </div>
      </nav>

      {/* Login Popup */}
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />
    </div>
  );
};

export default Navbar;
