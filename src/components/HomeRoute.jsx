import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Home";
import DetailPage from "./DetailPage";
import HeroImage from "../assets/HeroImage.jpg";
import AllData from "./AllData";
import PagodaDetail from "./PagodaDetail";
import FoodDetail from "./FoodDetail";
import HotelDetail from "./HotelDetail";
import Navbar from './Navbar';

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
        {/* Overlay for opacity */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

        {/* Content above the background */}
        <div className="relative z-8">        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<DetailPage />} />
            <Route path="/Pagodas/:id" element={<PagodaDetail />} />
            <Route path="/Foods/:id" element={<FoodDetail />} />
            <Route path="/Hotels/:id" element={<HotelDetail />} />
            <Route path="/allData" element={<AllData />} />
          </Routes>
        </div>
      </main>

      {/* ToastContainer for global notifications */}
      <ToastContainer />
    </Router>
  );
};

export default App;
