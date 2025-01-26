import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import AllDataDropdown from "./AllDataDropdown";
import AllDataCard from "./AllDataCard";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import star from "../assets/star.png";
import noLike from "../assets/noLike.png";
import liked from "../assets/liked.png";
import { FaEye } from "react-icons/fa";
import axiosInstance from "./AxiosInstance";

const AllData = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSearch, setSelectedSearch] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const navigate = useNavigate();
    const location = useLocation();
    const routeCategory = location.state;

    useEffect(() => {
        window.scrollTo(0, 0);
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                setLoading(true);
                const endpoint = selectedSearch
                    ? `/api/search`
                    : `/api/categories/${routeCategory || "Pagodas"}`;
                const params = selectedSearch ? { keyword: selectedSearch } : {};
                const response = await axios.get(endpoint, {
                    params,
                    signal: controller.signal,
                });
                setData(response.data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching data: ", err);
                    toast.error("Failed to fetch data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => controller.abort();
    }, [routeCategory, selectedSearch]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axiosInstance.get('/api/fav');
                const favoriteIds = response.data.map(fav => fav.post_id);
                setFavorites(favoriteIds);
            } catch (error) {
                toast.error('Couldn\'t fetch favorite details');
            }
        }
        const token = localStorage.getItem('token');
        if (token) fetchFavorites();
    }, []);

    const handleCardClick = (id, category) => {
        if (id && category) {
            navigate(`/${category.toLowerCase()}/${id}`, { state: selectedCategory || routeCategory });
        } else {
            console.error("Invalid ID");
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setLoading(true);
        navigate(`/allData`, { state: category });
    };

    const handleSearchChange = async (value) => {
        setSelectedSearch(value);
        try {
            const response = await axios.get(`/api/search`, {
                params: { keyword: value },
            });
            setData(response.data);
        } catch (err) {
            console.error("Search error:", err);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            handlePageClick(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            handlePageClick(currentPage + 1);
        }
    };

    const filteredData = data.filter(
        (item) =>
            item.title.toLowerCase().includes(selectedSearch.toLowerCase()) ||
            item.description.toLowerCase().includes(selectedSearch.toLowerCase())
    );

    // Pagination calculations
    const totalPages = Math.ceil(filteredData.length / 10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);


    return (
        <div className="shadow-2xl bg-gradient-to-b from-cyan-100 to-cyan-100 min-h-screen">
            <Navbar isAllDataPage={true} />
            <div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 pt-5 mb-20">
                    <div className="mx-3 max-h-fit lg:relative z-30">
                        <SearchBar onSearchSubmit={handleSearchChange} />
                    </div>
                    <div className="mx-3 max-h-fit absolute md:relative lg:relative mt-20 md:mt-0 lg:mt-0 z-20">
                        {loading ? (
                            <div className="flex justify-center items-center h-[50px]">
                                <p className="text-md font-medium">Loading...</p>
                            </div>
                        ) : (
                            <AllDataDropdown
                                onCategoryChange={handleCategoryChange}
                                selectedCategory={selectedCategory || routeCategory}
                            />
                        )}
                    </div>

                    <div className="absolute top-32 md:top-20 lg:top-20 left-1/2 -translate-x-1/2 z-10">
                        <div className="flex justify-center items-center space-x-2 mt-4">
                            {/* Previous Button */}
                            <button
                                onClick={handlePrevClick}
                                className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-cyan-600 text-white"
                                    }`}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    className={`px-4 py-2 rounded ${currentPage === page
                                        ? "bg-cyan-600 text-white"
                                        : "bg-gray-200 hover:bg-cyan-500 hover:text-white"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next Button */}
                            <button
                                onClick={handleNextClick}
                                className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-cyan-600 text-white"
                                    }`}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>


                    {/* Display search results */}
                    <motion.div
                        className="bg-gradient-to-b from-cyan-100 to-cyan-300 min-h-screen absolute grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-5 w-full px-5 mt-48 md:mt-36 lg:mt-36 z-10 pb-10"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <div
                                    onClick={() => handleCardClick(item.id, item.category || routeCategory)}
                                    key={index}
                                    className="relative w-auto h-[250px] shadow-md rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    <div className="relative w-full h-full">
                                        <img
                                            src={item.image_path}
                                            alt={item.title}
                                            className="object-cover w-full h-full rounded-lg hover:opacity-90 transition-opacity duration-300"
                                        />
                                        <div className="cursor-default absolute top-4 right-4 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                            <img
                                                className="w-[20px] h-[20px]"
                                                src={favorites.includes(item.id) ? liked : noLike}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 w-full bg-white h-[70px] p-4 shadow-lg rounded-lg flex items-center hover:bg-gray-100 transition-colors duration-300">
                                        <div className="grid grid-cols-1 w-full">
                                            <h1 className="font-bold text-[13px]">{item.title}</h1>
                                            <div className="mt-2 flex flex-row justify-between">
                                                <div className="flex flex-row">
                                                    <FaEye className="mt-0.5 mr-1" />
                                                    <p>{item.view_count}</p>
                                                </div>
                                                <div className="flex flex-row">
                                                    <img
                                                        src={star}
                                                        className="w-[15px] h-[15px] mt-0.5 mr-1"
                                                    />
                                                    <p>{item.average_rating}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full">No results found.</p>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AllData;