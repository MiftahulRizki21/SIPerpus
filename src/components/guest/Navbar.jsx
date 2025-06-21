import React from "react";
import logo from "../../assets/logo.png"; // path diperbaiki
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#ecf7f8] py-4 px-8 flex justify-between items-center shadow-sm font-sans">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-extrabold text-gray-700 tracking-wide">
          <span className="text-gray-700">SI</span>
          <span className="text-[#579DA5]">Perpus</span>
        </h1>
      </div>
      <div className="space-x-6 font-semibold text-gray-700 text-lg">
        <Link to="/" className="hover:text-[#579DA5] transition">Home</Link>
        <Link to="/about" className="hover:text-[#579DA5] transition">About</Link>
        <Link to="/book" className="hover:text-[#579DA5] transition">Book</Link>
        <Link to="/contact" className="hover:text-[#579DA5] transition">Contact</Link>
        <Link to="/donation" className="hover:text-[#579DA5] transition">Donation</Link>
        <Link to="/login" className="hover:text-[#579DA5] transition font-bold">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
