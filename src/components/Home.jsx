import '../styles/animation.css'

import FoodSlider from "./FoodSlider";
import Hotal from './Hotal';
import ContactUs from './ContactUs';
import Footer from './Footer';
import Pagoda from './Pagoda';
import Category from './Category';
import Navbar from './Navbar';

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {

  const location = useLocation();

  useEffect(() => {
    const scrollToSection = () => {
      const sectionId = location.state?.sectionId;
      if (sectionId) {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
          // Adjust the navbar height (if any fixed header or navbar)
          const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;

          // Calculate the exact scroll position
          const elementTop = sectionElement.getBoundingClientRect().top + window.scrollY;
          const scrollPosition = elementTop - navbarHeight;

          // Scroll smoothly to the position
          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        } else {
          console.warn(`Section with ID "${sectionId}" not found.`);
        }
      }
    };

    // Delay scrolling to ensure layout is fully rendered
    setTimeout(scrollToSection, 100); // Adjust timeout if necessary
  }, [location]);

  return (
    <>
      <main>
        <Navbar textColor="text-white" />

        <div className="w-full h-screen flex flex-col justify-center items-center gap-6">
          {/* Headline with Animation */}
          <h1 className="md:w-[550px] text-center font-georgia text-3xl sm:text-4xl lg:text-6xl text-cyan-100 mix-blend-difference animate-bounce-in">
            Welcome to <span className='bold text-cyan-300'>Magway</span> Directory
          </h1>

          {/* Subheading */}
          <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-neutral-200 animate-fade-in">
            Find the best places, services, and more in <span className='bold text-white'>Magway</span>
          </p>

          {/* Call-to-Action Button */}
          <button className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-2 px-5 text-lg md:text-xl rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300 animate-fade-in">
            Explore More
          </button>
        </div>
      </main >

      <section className='bg-gradient-to-b from-gradient-b0e0e6 via-gradient-9cc7cd to-gradient-759599 bg-opacity-70'>
        <Category />
        <Pagoda id="pagoda" />        
        <FoodSlider id="food" />
        <Hotal id="hotal" />
        <ContactUs id="contactUs" />
      </section>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
