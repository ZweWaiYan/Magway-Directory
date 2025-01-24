import React, { useState } from "react";
import boy from "../../../assets/boy.png";
import { LogOut } from "lucide-react";
// import { Navigate, useNavigate } from "react-router-dom";
import Profile from "./Setting/profile";
import Account from "./Setting/Account";
import { div } from "framer-motion/client";
import axiosInstance from "../../AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
// import PostList from "./Posts/PostList";

const Setting = () => {
  const [selectedOption, setSelectedOption] = useState("Profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const res = await axiosInstance.get('http://localhost:3000/logout')
      console.log(res.status)
      if(res.status === 201){
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/");
        window.location.reload();
      }
    }catch(error){
      console.log(error)
      toast.error('An error occured.')
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Main Content */}
          <div className="flex-1 ">
            {/* Profile Picture Section */}
            <div className="flex items-center justify-start gap-5">
              <div className="flex flex-col items-center justify-center gap-3 w-1/2 bg-[#14637A] pt-4 rounded-lg pb-8 px-2">
                <h2 className="mb-2 text-2xl font-semibold text-white">
                  Profile picture
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative  h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                    <img
                      src={boy}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {selectedOption === "Profile" ? (
                    <div className="flex flex-col gap-2">
                      <button className="text-sm rounded bg-white text-[#14637A] font-bold p-2  hover:scale-105 duration-300 ease-in-out">
                        Change picture
                      </button>
                      <button className="text-sm  rounded  border-white border-2 font-bold p-2 text-white hover:scale-105 duration-300 ease-in-out ">
                        Delete picture
                      </button>
                    </div>
                  ) : (
                    <di className="flex flex-col gap-2 text-white">
                      <span className="text-xl">Koon</span>
                      <span>konn5343@gmail.com</span>
                    </di>
                  )}
                </div>
              </div>
              {/* Dropdown */}
              <div className="w-1/2 relative mb-6 flex flex-col items-center justify-center gap-3">
                <div className="w-full">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex w-full items-center justify-between rounded-md border border-gray-300 px-4 py-2"
                  >
                    <span className="first-of-type:visible">
                      {selectedOption}
                    </span>
                    <svg
                      className={`h-5 w-5 transform transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                      {["Profile", "Account"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedOption(option);
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Logout */}
                <div className="flex items-center justify-end gap-3">
                  <p className="text-stone-600">
                    If you finish your job, Just{" "}
                  </p>
                  <div className="text-right" />
                  <button
                    onClick={handleLogout}
                    className="w-24 mr-3 rounded  bg-teal-700 border border-teal-700  py-2 text-white hover:bg-teal-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Form */}

            {selectedOption === "Profile" ? <Profile /> : <Account />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;