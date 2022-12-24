import React from "react";

const TransferBtn = ({ title, handleClick }) => {
  return (
    <button
      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-sky-600 via-pink-300 to-pink-700 group-hover:from-pink-200 group-hover:via-pink-300 group-hover:to-blue-200   focus:ring-4 focus:outline-none focus:ring-pink-200"
      onClick={handleClick}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75  bg-[#1F2937]  rounded-md group-hover:bg-opacity-0 hover:text-gray-900">
        {title}
      </span>
    </button>
  );
};

export default TransferBtn;
