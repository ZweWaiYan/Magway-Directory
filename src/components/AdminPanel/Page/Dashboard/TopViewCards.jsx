import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../AxiosInstance';

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

import eye from '../../../../assets/eye.png';
import star from '../../../../assets/star.png';

const TopViewCards = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [topPosts, setTopPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataByCategory = {
        0: { title: "Pagodas", endpoint: "Pagodas" },
        1: { title: "Foods", endpoint: "Foods" },
        2: { title: "Hotels", endpoint: "Hotels" },
    };

    useEffect(() => {
        const fetchTopPosts = async () => {
            setLoading(true);
            try {
                const category = dataByCategory[selectedCategory].endpoint;
                const response = await axiosInstance.get(`/api/topviews/${category}`);
                setTopPosts(response.data);
            } catch (error) {
                console.error("Error fetching top posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopPosts();
    }, [selectedCategory]);

    const handleNextSlide = () => {
        if (selectedCategory < 2) {
            setSelectedCategory(selectedCategory + 1);
        }
    };

    const handlePreviousSlide = () => {
        if (selectedCategory > 0) {
            setSelectedCategory(selectedCategory - 1);
        }
    };

    const filteredData = dataByCategory[selectedCategory];

    return (
        <div className='flex flex-col rounded-lg border shadow-md w-80 p-5'>
            <div className='mb-5 border-b border-gray-200 dark:border-gray-700 font-bold text-xl flex justify-between'>
                <p>{filteredData.title} Top 5 Views</p>
                <div className='flex pb-2'>
                    <div
                        onClick={handlePreviousSlide}
                        className={`w-fit h-fit mr-1 text-2xl rounded-full p-2 ${selectedCategory === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-black text-white cursor-pointer'}`}
                    >
                        <BsChevronCompactLeft size={13} />
                    </div>
                    <div
                        onClick={handleNextSlide}
                        className={`w-fit h-fit mr-1 text-2xl rounded-full p-2 ${selectedCategory === 2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-black text-white cursor-pointer'}`}
                    >
                        <BsChevronCompactRight size={13} />
                    </div>
                </div>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {topPosts.slice(0, 5).map((item, index) => {
                        return (
                            <div key={index} className='grid grid-cols-2 mb-5 items-center'>
                                <img className='ml-5 w-[120px] rounded-lg' src={item.image_path} alt='' />
                                <div className='pl-5'>
                                    <p>{item.title}</p>
                                    <div className='flex'>
                                        <img className='w-fit size-5 mr-1' src={eye} alt='' />
                                        <p className='w-fit'>{item.view_count}</p>
                                    </div>
                                    <div className='flex'>
                                        <img className='w-fit size-5 mr-1' src={star} alt='' />
                                        <p className='w-fit'>{item.average_rating}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TopViewCards;
