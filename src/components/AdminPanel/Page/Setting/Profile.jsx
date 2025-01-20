import React from 'react'

const Profile = () => {
  return (
    <div className="flex flex-col items-end space-y-6">
    <div className="text-right w-full ">
      <button className="w-24 mr-3 rounded  bg-teal-700 border border-teal-700  py-2 text-white hover:bg-teal-800">
        edit
      </button>
      <button className="w-24 rounded border border-teal-700  py-2 text-teal-700 hover:bg-teal-50">
        save
      </button>
    </div>
    <div className="w-full">
      <div className="mb-4">
        <label className="mb-2 block">Profile name</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Profile name"
            className="w-full rounded-md focus:outline-none focus:ring-2 border-gradient-89aeb3 focus:ring-gradient-759599   border border-gray-300 px-4 py-2 "
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block">Username</label>
        <div className="flex rounded-md ">
          <input
            type="email"
            className="w-full rounded-md border border-gray-300 px-4 py-2  focus:outline-none focus:ring-2 border-gradient-89aeb3 focus:ring-gradient-759599"
            placeholder="username"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block">About me</label>
        <textarea
          placeholder="Write something about yourself"
          rows={4}
          className="w-full rounded-md border border-gray-300 px-4 py-2  focus:outline-none focus:ring-2 border-gradient-89aeb3 focus:ring-gradient-759599"
        />
      </div>
    </div>
  </div>
  )
}

export default Profile