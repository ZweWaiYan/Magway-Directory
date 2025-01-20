import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from "react-toastify";

const ReviewsSection = ({ categoryID }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/${categoryID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setReviews(response.data || []);
          setAverageRating(
            response.data.reduce((acc, review) => acc + review.rating, 0) /
              response.data.length
          );
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [categoryID]);

  // Handle review submission
  const handleSubmitReview = async () => {
    if (token && rating === 0 || !reviewContent.trim()) {
      toast.error("Please provide both stars rating and review content.");
      //return;
    }

    const newReview = {
      place_id: categoryID,
      rating,
      review: reviewContent,
      created_at: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem("token");

      if(!token){
        toast.error("Please login to submit a review");
        //window.location.reload();
        return;
      }

      const response = await axios.post(`/api/reviews`, newReview, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const savedReview = response.data;

      setReviews([savedReview, ...reviews]);
      setRating(0);
      setReviewContent("");

      toast.success("Review submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Calculate the star ratings breakdown
  const ratingBreakdown = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const dateRange = `Jan ${currentYear} to Dec ${currentYear}`;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-cyan-800">Reviews</h2>

        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Write your point of view"
            className="border rounded-full px-4 py-2 w-full sm:w-3/4 md:w-1/2 focus:ring focus:ring-cyan-300"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-cyan-600 text-white rounded-full px-4 py-2 shadow-md hover:bg-cyan-700"
          >
            ➤ Submit and Rate
          </button>
        </div>
      </div>

      {/* Rating Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-bold mb-4">Rate this Pagoda</h3>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setRating(star)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= rating ? "yellow" : "gray"}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="bg-cyan-600 text-white py-2 px-4 rounded-full mr-2"
            >
              Close
            </button>
            <button
              onClick={handleSubmitReview}
              className="bg-cyan-800 text-white py-2 px-4 rounded-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        className="mt-8 bg-cyan-100 rounded-lg p-6"
      >
        <div className="grid gap-6 lg:grid-cols-3 text-center lg:text-left">
          {/* Total Reviews */}
          <div>
            <h1 className="text-2xl font-bold text-cyan-900 mb-4">Total Reviews</h1>
            <div className="text-3xl font-bold text-cyan-800">
              {reviews.length} <span className="text-green-500">↑</span>
            </div>
          </div>

          {/* Average Rating */}
          <div>
            <h1 className="text-2xl font-bold text-cyan-900">Average Rating</h1>
            <div className="text-3xl font-bold text-cyan-800">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 justify-center">
              {[...Array(5)].map((_, i) => {
                const diff = averageRating - i;
                return (
                  <span key={i}>
                    {diff >= 1 ? (
                      <span className="text-yellow-400">★</span>
                    ) : diff > 0 ? (
                      <span className="text-yellow-400">⯨</span>
                    ) : (
                      <span className="text-gray-300">☆</span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Reviews Breakdown */}
          <div className="text-sm text-gray-700 space-y-1">
            <h1 className="text-2xl font-bold text-cyan-900">{dateRange}</h1>
            <div className="space-y-1">
              {Array.from({ length: 5 }, (_, i) => {
                const starRating = 5 - i;
                return (
                  <p key={starRating}>
                    {`⭐⭐⭐⭐⭐`.slice(0, starRating)} {ratingBreakdown[starRating] || 0}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reviews List */}
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 1 }}
        className="mt-8 space-y-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row gap-4"
          >
            <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
              {review.username ? review.username[0] : "?"}
            </div>
            <div className="w-full">
              <div className="flex flex-col sm:flex-row justify-between">
                <h3 className="font-semibold text-cyan-800">{review.username}</h3>
                <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
              </div>
              <div className="flex gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < review.rating ? (
                      <span className="text-yellow-400">★</span>
                    ) : (
                      <span className="text-gray-300">☆</span>
                    )}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* See More Button */}
      <div className="mt-8 text-center">
        <button className="bg-cyan-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transform transition-transform">
          See More ↓
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
