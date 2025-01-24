import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import axiosInstance from "../../AxiosInstance";

import DeleteModal from "./User/DeleteModal";
import Modal from "./User/Modal";

  const Users = () => {

    const [tableData, setTableData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [deleteCurrentUser, setDeleteCurrentUser] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
      fetchUsers();
    },[]);

    const fetchUsers = async() =>{
      try{
        const response = await axiosInstance.get('/api/users');
        setTableData(response.data);
        
      }catch(error){
          toast.error("Failed to fetch users.");
      }
    }

  const handlePageClick = (page) => {
    setCurrentPage(page);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1);
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1);
    }
  };

  // Filtered data based on search and role
  const filteredData = tableData.filter((user) => {
    const matchesSearch = user.username && user.username.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    return matchesSearch && matchesRole;
  });

  // Pagination calculations
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / 10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleCreate = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const user = tableData.find((row) => row.id === id);
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const user = tableData.find((row) => row.id === id);
    setDeleteCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleSave = async (updatedFields) => {
    try {
      if(currentUser){
        await axiosInstance.post(`/api/editUser`, {
          ...updatedFields,
          id: currentUser.id,
          username: currentUser.username
        });
        setTableData((prev) =>
          prev.map((item) =>
            item.id === currentUser.id ? { ...item, ...updatedFields } : item
          )
        );
        toast.success("User updated successfully.");
      }else {
        const userToCreate = { ...updatedFields, username: updatedFields.name };
        const response = await axiosInstance.post(`/api/createUser`, userToCreate);
        const createdUser = response.data;
        setTableData((prev) => [
          ...prev,
          {
            ...updatedFields,
            id: createdUser.id,
            username: updatedFields.name
          }
        ]);
        toast.success("User created successfully.");
      }
    } catch (error) {
      toast.error("Failed to update user.");
    }
    setShowModal(false);
  };

  const doDelete = async () => {
    try{
      await axiosInstance.delete(`/api/deleteUser/${deleteCurrentUser.id}`);
      setTableData((prev) =>
        prev.filter((item) => item.id !== deleteCurrentUser.id)
      );
      toast.success("User deleted successfully");
    }catch(error){
      toast.error("Failed to delete user.")
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between pb-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 pr-3">
          <input
            type="text"
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1) }}
            className="w-full p-2 border rounded-md"
            placeholder="Search..."
          />
          <select
            value={selectedRole}
            onChange={(e) => { setSelectedRole(e.target.value); setCurrentPage(1) }}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="max-h-[50px] flex justify-end pr-5">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
          >
            Create
          </button>
        </div>
      </div>
      <table className="min-w-full table-fixed border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="w-1/4 px-4 py-2 border text-lg  text-center bg-gray-100">Name</th>
            <th className="w-1/4 px-4 py-2 border text-lg  text-center bg-gray-100">Email</th>
            <th className="w-1/4 px-4 py-2 border text-lg text-center bg-gray-100">Role</th>
            <th className="w-1/4 px-4 py-2 border text-lg  text-center bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <tr key={user.id} className="h-12">
                <td className="px-4 py-2 border text-center">{user.username}</td>
                <td className="px-4 py-2 border text-center">{user.email}</td>
                <td className="px-4 py-2 border text-center">{user.role}</td>
                <td className="px-4 py-2 border text-center">
                  <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
                    <button
                      className="px-4 py-2 w-[75px] bg-green-500 text-white hover:bg-green-400 rounded"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 w-[75px] bg-red-500 text-white hover:bg-red-400 rounded"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="h-12">
              <td
                colSpan="3"
                className="px-4 py-2 border text-center text-gray-500"
              >
                No matching users found.
              </td>
            </tr>
          )}
        </tbody>

      </table>


      <div className="flex justify-center items-center mt-6 space-x-2">
        {/* Previous Button */}
        <button
          onClick={handlePrevClick}
          className={`px-4 py-2 rounded-lg transition duration-300 ${currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-300"
            }`}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 rounded-lg transition duration-300 ${currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-white"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNextClick}
          className={`px-4 py-2 rounded-lg transition duration-300 ${currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-300"
            }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>



      <Modal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        user={currentUser}
        onSave={handleSave}
        // TODO: Check for duplicate name (this is only for demo when there is no database)
        tableData={tableData}
      />

      {
        deleteCurrentUser && (
          <DeleteModal
            showModal={showDeleteModal}
            closeModal={() => setShowDeleteModal(false)}
            user={deleteCurrentUser}
            onDelete={doDelete}
          />
        )
      }

      {/* Toast Container */}
      <ToastContainer />
    </div >
  );
};

export default Users;