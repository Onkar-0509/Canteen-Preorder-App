import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/storeContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { canteenName } = useContext(StoreContext);


   const name = localStorage.getItem('canteenName');
  const handleLogout = () => {
    localStorage.removeItem("canteenToken");
    
    navigate("/login");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar flex justify-between items-center py-3 px-4 md:px-10 lg:px-16 bg-white shadow-md relative">
      {/* Logo */}
      <p className="text-[#ff2e4aeb] italic text-[44px] max-[700px]:text-[37px] max-[500px]:text-[32px] max-[400px]:text-[27px] font-bold">
        EasyServe 
      </p>

      {/* Profile Section */}
      <div className="flex items-center gap-4 relative">
        {/* Profile Image with Dropdown */}
        <div className="relative">
          <img
            onClick={toggleDropdown}
            className="w-10 md:w-12 lg:w-14 rounded-full border-2 border-gray-300 cursor-pointer hover:border-[#ff2e4aeb] transition-all"
            src={assets.profile_image}
            alt="Profile"
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-35 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <p className="font-medium text-[15px]">{canteenName || name || "Canteen"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#fff4f2] hover:text-[#ff2e4aeb] transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </nav>
  );
};

export default Navbar;
