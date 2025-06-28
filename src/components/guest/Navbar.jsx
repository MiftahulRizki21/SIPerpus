import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-[#ecf7f8] py-4 px-8 flex justify-between items-center shadow-sm font-sans">
      {/* Kiri - Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-extrabold text-gray-700 tracking-wide">
          <span className="text-gray-700">SI</span>
          <span className="text-[#579DA5]">Perpus</span>
        </h1>
      </div>

      {/* Kanan - Menu dan Ikon */}
      <div className="flex items-center gap-6">
        {/* Menu Link */}
        <div className="flex space-x-6 font-semibold text-gray-700 text-lg">
          <Link to="/" className="hover:text-[#579DA5] transition">Home</Link>
          <Link to="/about" className="hover:text-[#579DA5] transition">About</Link>
          <Link to="/book" className="hover:text-[#579DA5] transition">Book</Link>
          <Link to="/eventguest" className="hover:text-[#579DA5] transition">Events</Link>
          <Link to="/contact" className="hover:text-[#579DA5] transition">Contact</Link>
          <Link to="/donation" className="hover:text-[#579DA5] transition">Donation</Link>
          <Link to="/login" className="hover:text-[#579DA5] transition font-bold">Login</Link>
        </div>

        {/* Ikon Search dan Cart */}
        <div className="flex items-center space-x-3">
          <div className="relative bg-white p-2 rounded-full shadow hover:bg-[#f0f0f0] cursor-pointer">
            <FiSearch className="text-gray-600 text-xl" />
          </div>
          <div className="relative bg-white p-2 rounded-full shadow hover:bg-[#f0f0f0] cursor-pointer">
            <FiShoppingCart className="text-gray-600 text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              1
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
