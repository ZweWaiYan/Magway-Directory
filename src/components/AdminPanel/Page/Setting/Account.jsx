import React from "react";

const Account = () => {
  return (
    <div className="mt-8">
      <div className="w-full">
        <div className="mb-4">
          <label className="mb-2 block">Personal information</label>
          <div className="flex rounded-md ">
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-4 py-2  focus:outline-none focus:ring-2 border-gradient-89aeb3 focus:ring-gradient-759599"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="mb-8"></div>
        <div className="mb-4">
          <label className="mb-2 block">Security</label>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Password - AjfjMiroieGliretoPif25"
              className="w-full rounded-md focus:outline-none focus:ring-2 border-gradient-89aeb3 focus:ring-gradient-759599 border border-gray-300 px-4 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;