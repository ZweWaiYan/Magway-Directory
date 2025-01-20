import { ImageIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axiosInstance from "../../../AxiosInstance";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostUploadForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    //console.log("Data", data)
  
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("date", data.date);
    formData.append("link", data.link);
    formData.append("location", data.location);
    formData.append("file", data.file[0]);

    console.log(data)
  
    try {
      const response = await axiosInstance.post('/api/admin/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status === 200 ){
        toast.success(response.data.message);
        reset();
        setImagePreview(null);
      }

    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
      toast.error('Failed to upload file. Please check your input and try again.');
    }
  };
  
  const handleCancel = () => {
    reset();
    setImagePreview(null);
  };

  return (
    <div className="w-full lg:w-3/4 pb-8 px-6 lg:px-16 bg-white rounded-lg shadow-lg">
      <Link
        to="/posts"
        className="text-[#14637A] hover:scale-105 duration-300 ease-in-out font-bold rounded-md shadow-sm"
      >
        <FaArrowLeftLong className="shadow-lg rounded-full size-8 md:size-12 p-2 md:p-3" />
      </Link>
      <h2 className="md:text-3xl text-xl lg:text-4xl font-extrabold mb-8 text-center text-[#14637A]">
        Create Post
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-start justify-center gap-8"
      >
        {/* Upload Image */}
        <div className="w-full md:w-1/2 h-full space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mx-auto max-h-64 object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-44 lg:h-64">
                <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500">Click to upload image</p>
              </div>
            )}
            <div className="flex mt-4 md:flex-row gap-2 lg:gap-3 md:items-center justify-center">
            <input
              type="file"
              {...register("file", {
                required: "Image is required",
                onChange: (e) => handleImagePreview(e),
              })}
              className="hidden"
              id="image-upload"
            />
              <label
                htmlFor="image-upload"
                className="inline-block md:px-2 md:py-1 px-4 py-2 bg-[#14637A] text-white rounded-md cursor-pointer hover:scale-105 ease-in-out duration-300 transition-colors"
              >
                Select Image
              </label>
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file.message}</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gradient-759599"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          {/* Date */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gradient-759599"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gradient-759599"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Foods">Foods</option>
              <option value="Hotels">Hotels</option>
              <option value="Pagodas">Pagodas</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
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
              className="w-full mt-2 p-3 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
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
              className="w-full mt-2 p-3 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gradient-759599"
              placeholder="link"
            />
            {errors.link && (
              <p className="text-sm text-red-500 mt-1">{errors.link.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gradient-759599"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg bg-[#14637A] hover:scale-105 duration-300 ease-in-out"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostUploadForm;