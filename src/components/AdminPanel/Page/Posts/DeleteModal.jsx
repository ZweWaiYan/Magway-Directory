import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteModal = ({ showModal, closeModal, post, onDelete }) => {
    const handleDelete = () => {
        onDelete(post.id);  // Use post ID for deletion
        closeModal();
        toast.success(`Post deleted: ${post.title}`, {
            position: "top-right",
            autoClose: 2000,
        });
    };

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white p-8 rounded-lg w-1/2 shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Delete Post</h2>
                        <p>Are you sure you want to delete "{post.title}"?</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded shadow-md"
                            >
                                Delete
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
export default DeleteModal;