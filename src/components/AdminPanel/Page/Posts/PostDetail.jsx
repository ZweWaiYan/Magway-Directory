import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "./DeleteModal"; // Import the DeleteModal component
import { FaArrowLeftLong } from "react-icons/fa6";
import axiosInstance from "../../../AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostDetail = () => {
  const { category, id } = useParams();
  const [post, setPost] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/category/${category}/${id}`);
        setPost(response.data);
      } catch (err) {
        toast.error('An error occured');
      }
    };
    if (category && id) {
      fetchPostDetail();
    }
  }, [category, id]);

  // Function to handle post deletion
  const handleDelete = async (postId) => {
    try {
      await axiosInstance.get(`/api/admin/delete/${postId}`);
      toast.success("Deleted successfully");
      window.location.href = "/dashboard/posts";
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const { title, description, image_path, created_at, link, location } = post;

  return (
    <div className="m-5 md:px-10 md:mt-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg md:pt-14 px-6 md:px-14  rounded-lg overflow-hidden">
        <Link
          to="/dashboard/posts"
          className="text-[#14637A] hover:scale-105 duration-300 ease-in-out  font-bold rounded-md shadow-sm"
        >
          <FaArrowLeftLong className="shadow-lg rounded-full size-8 md:size-12  p-2 md:p-3" />
        </Link>

        <div>
          <div className="flex flex-col lg:flex-row mt-4 py-2 gap-10 lg:gap-5">
            <div>
              <div className="">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800">{title}</h1>
                <p className="text-sm  text-gray-500 mt-2">
                  {created_at ? new Date(created_at).toISOString().split('T')[0] : 'N/A'}
                </p>
                <p className="text-gray-700 text-sm md:text-base mt-4">{description}</p>
              </div>
            </div>

            <img
              src={image_path}
              alt={title}
              style={{
                transform: "perspective(1000px) rotateY(35deg)",
                transition: "transform 0.5s ease",
              }}
              className="h-full md:h-64 w-full lg:w-[350px] object-cover text-center rounded-md"
            />
          </div>
          <div className="flex items-center justify-end md:gap-1 py-5">
            <button
              onClick={() => setShowDeleteModal(true)} // Open the delete modal
              className="text-red-600 hover:scale-105 duration-300 ease-in-out font-bold rounded-md"
            >
              <AiOutlineDelete className="shadow-lg rounded-full size-8 md:size-12 p-2 md:p-3" />
            </button>
            <Link
              to={`/dashboard/edit-post/${id}`}
              state={{ post, category }}
              className="text-[#14637A] hover:scale-105 duration-300 ease-in-out font-bold rounded-md"
            >
              <HiOutlinePencil className="shadow-lg rounded-full size-8 md:size-12 p-2 md:p-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Render the DeleteModal */}
      <DeleteModal
        showModal={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        post={post}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PostDetail;
