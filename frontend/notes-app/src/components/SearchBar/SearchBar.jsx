import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className="w-80 flex items-center px-4 bg-gray-800 rounded-md border border-green-600">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-2 outline-none text-green-400 placeholder-green-500"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          className="text-xl text-green-400 cursor-pointer hover:text-green-300 mr-3"
          onClick={onClearSearch}
        />
      )}
      <FaMagnifyingGlass
        className="text-green-400 cursor-pointer hover:text-green-300"
        onClick={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
