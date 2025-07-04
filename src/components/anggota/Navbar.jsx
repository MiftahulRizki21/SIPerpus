import React from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supaBase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/"); // redirect ke homepage setelah logout
    } else {
      console.error("Logout gagal:", error.message);
    }
  };

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
        <Link to="/anggota/beranda" className="hover:text-[#579DA5] transition">Home</Link>
        <Link to="/anggota/about" className="hover:text-[#579DA5] transition">About</Link>
        <Link to="/anggota/book" className="hover:text-[#579DA5] transition">Book</Link>
        <Link to="/anggota/event" className="hover:text-[#579DA5] transition">Event</Link>
        <Link to="/anggota/contact" className="hover:text-[#579DA5] transition">Contact</Link>
        <Link to="/anggota/donation" className="hover:text-[#579DA5] transition">Donation</Link>
        <Link to="/anggota/riwayat" className="hover:text-[#579DA5] transition">History</Link>
        <Link to="/anggota/upload" className="hover:text-[#579DA5] transition">Upload</Link>
        <Link to="/anggota/profile" className="hover:text-[#579DA5] transition">Profile</Link>
        <button
          onClick={handleLogout}
          className="hover:text-[#579DA5] transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
