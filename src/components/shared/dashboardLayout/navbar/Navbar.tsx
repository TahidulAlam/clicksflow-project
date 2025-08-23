"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
interface NavbarProps {
  toggleSidebar: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLastPathName = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.length ? segments[segments.length - 1] : "Home";
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 rounded-lg relative border border-gray-300">
      {/* Left: Path Name */}
      <div className="text-gray-600 font-semibold capitalize text-sm">
        {getLastPathName()}
      </div>

      {/* Middle: Message */}
      <div className="text-gray-800 font-medium text-sm">Welcome!</div>
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <FiMenu className="text-xl text-blue-950" />
      </button>
      {/* Right: Dropdown Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
        >
          Profile
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
            <div className="px-4 py-3 border-b text-sm text-gray-800 flex items-center gap-2">
              <FaUser /> John Doe
            </div>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
              <FaBell /> Notifications
            </button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
