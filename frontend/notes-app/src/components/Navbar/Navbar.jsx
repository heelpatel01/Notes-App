import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Navbar({ userInfo }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-gray-900 text-green-400 flex items-center justify-between px-6 py-2 drop-shadow-lg">
      <h2 className="text-xl font-mono font-semibold py-2">Notes</h2>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        className="bg-gray-800 border border-green-500 text-green-400 placeholder-green-600"
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
}

export default Navbar;
