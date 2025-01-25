/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DetailPage from "./components/DetailPage";
import HeroImage from "./assets/HeroImage.jpg";
import AllData from "./components/AllData";
import PagodaDetail from "./components/PagodaDetail";
import FoodDetail from "./components/FoodDetail";
import HotelDetail from "./components/HotelDetail";
import InputForm from "./components/Image_upload";
//import AdminLayout from "./components/AdminPanel/Adminroute";

import Navbar from './components/Navbar';

const App = () => {
  const heroImage = {
    backgroundImage: `url(${HeroImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Router>

      <main
        className="relative w-full h-[115vh]"
        style={heroImage}
        aria-label="Hero section with a scenic background"
      >
        {/* Overlay for opacity }
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        {/* Content above the background }
        <div className="relative z-8">        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<DetailPage />} />
            <Route path="/Pagodas/:id" element={<PagodaDetail />} />
            <Route path="/Foods/:id" element={<FoodDetail />} />
            <Route path="/Hotels/:id" element={<HotelDetail />} />
            <Route path="/allData" element={<AllData />} />
            <Route path="/adminUpload" element={<InputForm />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;*/

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./components/AdminPanel/AdminRoute";
import HomeRoute from "./components/HomeRoute";
import { jwtDecode } from "jwt-decode";
import SessionTimeoutModal from "./components/AdminPanel/Page/User/SessionTimeoutModal";
import { Navigate } from "react-router-dom";

const App = () => {
  const [role, setRole] = useState(null);
  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp && decoded.exp < currentTime) {
          setShowSessionModal(true);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token. Please log in again.");
      }
    }
  }, []);


  const handleCloseModal = () => {
    setShowSessionModal(false);
    window.location.href = '/';
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <SessionTimeoutModal
        showModal={showSessionModal}
        closeModal={handleCloseModal}
      />
      {(() => {
        if (role === "Admin" && location.pathname === "/dashboard") {
          return <AdminLayout />;
        } else {
          return <HomeRoute />
        }
      })()}
    </>
  );
}

export default App;


//0 is Admin
//1 is user*/
