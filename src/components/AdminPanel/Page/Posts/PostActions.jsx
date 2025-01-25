import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const PostActions = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-start md:items-end justify-between p-4 rounded-lg ">
      {/* Search Bar */}
      <div className="flex items-center border-2 border-[#14637A] rounded-md  w-full max-w-md relative">
        <input
          type="text"
          placeholder="Search All..."
          className="w-full md:p-3 border-none focus:outline-none focus:ring-0  rounded-md"
        />
        <IoSearch className="h-6 w-6 text-gray-500 mr-2 absolute right-0" />
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
