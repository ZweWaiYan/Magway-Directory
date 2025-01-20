import star from "../assets/star.png";
import noLike from "../assets/noLike.png";
import liked from "../assets/liked.png";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { FaEye } from "react-icons/fa";

const AllDataCard = ({ id, img, title, viewers, rate, favourite }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/${category}/${id}`);
    };

    return (        
        <div key={id} className="relative w-auto h-[200px] shadow-md rounded-lg" onClick={handleClick}>
            <div className="relative w-full h-full">
                {/* Image */}
                <img src={img} alt="" className="object-cover w-full h-full rounded-lg" />

                {/* Like */}
                <div
                    className="absolute top-4 right-4 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img className="w-[20px] h-[20px]" src={favourite ? liked : noLike} alt="" />
                </div>
            </div>

            {/* White Box */}
            <div className="absolute bottom-0 left-2 right-2 bg-white h-[70px]  p-4 shadow-lg rounded-lg flex items-center">
                <div className="flex flex-col w-full">
                    <h1 className="font-bold text-1xl">{title}</h1>

                    <div className="mt-3 flex flex-row justify-between">
                        {/* Views */}
                        <div className="flex flex-row">
                            <FaEye className="mt-0.5 mr-1" />
                            <p>{viewers}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex flex-row">
                            <img src={star} className="w-[15px] h-[15px] mt-0.5 mr-1" />
                            <p>{rate}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllDataCard;