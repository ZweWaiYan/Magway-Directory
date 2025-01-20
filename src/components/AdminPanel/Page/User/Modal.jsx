import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ showModal, closeModal, user, onSave, tableData }) => {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});

    // Update fields when user prop changes
    useEffect(() => {
        if (user) {
            setFields({
                name: user.username,
                email:user.email,
                role: user.role,
            });
        } else {
            setFields({
                name: "",
                email: "",
                password: "",
                role: "",
            });
        }
    }, [user]);

    // Validate form
    const validate = () => {
        const newErrors = {};
        const fieldRules = {
            name: "Name is required!",
            role: "Role is required!",
        };

        if (!user) {
            fieldRules.email = "Email is required!";
            fieldRules.password = "Password is required!";
        }

        Object.keys(fields).forEach((field) => {
            if (!fields[field]) {
                newErrors[field] = fieldRules[field];
            }
        });

        // TODO: Check for duplicate name (this is only for demo when there is no database)
        /*
        const existingEmail = tableData.find((u) => u.email === fields.email);
        if (existingEmail) {
            newErrors.email = "Email already exists!";
        }*/

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle dynamic input changes
    const handleChange = (field, value) => {
        setFields({ ...fields, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: "" });
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        if (validate()) {
            onSave(fields);
            resetInput();
            closeModal();
            toast.success(`${user ? "User updated" : "User added"}: ${fields.name}`, {
                position: "top-right",
                autoClose: 2000,
            });
        } else {
            toast.error("Please fix the errors in the form.", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };

    const handleCancel = () => {
        resetInput();
        closeModal();
    };

    const resetInput = () => {
        setFields(user ? {
            name: user.name,
            email: user.email,
            role: user.role
        } : {
            name: "",
            email: "",
            password: "",
            role: ""
        });
        setErrors({});
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
                        <h2 className="text-2xl font-bold mb-4">{user ? "Edit" : "Add"} User</h2>
                        <div>
                        {["name", "email", "role", ...(user ? [] : ["password"])].map((field) => (
                                <div key={field} className="mb-4">
                                    {field === "role" ? (
                                        <select
                                            value={fields[field] || ""}
                                            onChange={(e) => handleChange(field, e.target.value)}
                                            className={`w-full p-2 border rounded-sm ${errors[field] ? "border-red-500" : ""}`}
                                        >
                                            {user ? "" : <option value="">Select a role</option>}
                                            <option value="Admin">Admin</option>
                                            <option value="Editor">Editor</option>
                                            <option value="User">User</option>
                                        </select>
                                    ) : (
                                        <input
                                            type={field === "password" ? "password" : "text"}
                                            value={fields[field] || ""}
                                            onChange={(e) => handleChange(field, e.target.value)}
                                            className={`w-full p-2 border rounded-sm ${errors[field] ? "border-red-500" : ""}`}
                                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        />
                                    )}
                                    {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-400 text-white rounded"
                            >
                                Cancel
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded shadow-md"
                            >
                                Save
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
