import React, { useState } from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosInstance from "./AxiosInstance";
import { toast } from "react-toastify";

const InputForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      average_rating: 0,
      total_votes: 0,
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("link", data.link);
    formData.append("file", data.file[0]);
    try {
      const response = await axios.post('/api/admin/upload', formData, {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      toast.success('File uploaded successfully!');
      reset();
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
      toast.error('Failed to upload file. Please check your input and try again.');
    }
  };
  

  return (
    <main className="bg-gradient-89aeb3 flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <div className="my-auto  lg:my-10 xl:my-auto mx-auto w-full">
        <div className=" flex   items-center justify-center  h-full my-auto">
          <div className="w-full max-w-lg p-8 bg-white/90 backdrop-blur-md rounded-lg shadow-xl mx-10 md:mx-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Admin Update
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 ">
                {/* Name */}
                <div className="mb-4 col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register("title", { required: "Name is required" })}
                    className="w-full mt-2 p-3 border border-gradient-89aeb3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
                    placeholder="Image title"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div className="mb-4 col-span-1">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="w-full mt-2 p-3 border border-gradient-89aeb3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
                    placeholder="e.g., pagodas, foods, hotels)"
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Average Rating */}
                <div className="mb-4 col-span-1">
                  <label
                    htmlFor="average_rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Average Rating (1-5)
                  </label>
                  <input
                    type="number"
                    id="average_rating"
                    {...register("average_rating", {
                      required: "Average rating is required",
                      min: { value: 0, message: "Minimum rating is 0" },
                      max: { value: 5, message: "Maximum rating is 5" },
                    })}
                    className="w-full mt-2 p-3 border border-gradient-89aeb3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
                    placeholder="Enter a rating (1 to 5)"
                  />
                  {errors.average_rating && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.average_rating.message}
                    </p>
                  )}
                </div>

                {/* Total Votes */}
                <div className="mb-4 col-span-1">
                  <label
                    htmlFor="total_votes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Total Votes
                  </label>
                  <input
                    type="number"
                    id="total_votes"
                    {...register("total_votes", {
                      required: "Total votes are required",
                      min: { value: 0, message: "Votes cannot be negative" },
                    })}
                    className="w-full mt-2 p-3 border border-gradient-89aeb3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
                    placeholder="Enter total votes"
                  />
                  {errors.total_votes && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.total_votes.message}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="mb-4 col-span-1">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="w-full mt-2 p-3 border border-gradient-89aeb3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
                    placeholder="Location"
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Link */}
                <div className="mb-4 col-span-1">
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    link
                  </label>
                  <input
                    type="text"
                    id="link"
                    {...register("link", {
                      required: "link is required",
                    })}
                    className="w-full mt-2 p-3 border border-gradient-89aeb3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
                    placeholder="link"
                  />
                  {errors.link && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.link.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="file"
                    {...register("file", {
                      required: "Image upload is required",
                    })}
                    className="w-full mt-2 p-3 border border-gradient-89aeb3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
                  />
                  {errors.file && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.file.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4 col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                    className="w-full mt-2 p-3 border border-gradient-89aeb3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
                    placeholder="Enter a brief description"
                    rows="4"
                  ></textarea>
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-89aeb3 text-white p-3 rounded-lg font-medium hover:bg-gradient-759599 transition duration-200 shadow-lg mb-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InputForm;