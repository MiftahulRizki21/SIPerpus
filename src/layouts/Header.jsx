import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <div className="text-xl font-bold text-blue-600 flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <span className="text-2xl">SI</span><span className="text-gray-800">Perpus</span>
      </div>
      <nav className="space-x-6 text-gray-600">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">About</a>
        <a href="#" className="hover:text-blue-500">Book</a>
        <a href="#" className="hover:text-blue-500">Contact</a>
        <a href="#" className="hover:text-blue-500">Donation</a>
        <a href="#" className="hover:text-blue-500">Login</a>
        <span className="ml-4">🔍 🛒<sup className="text-red-500">●</sup></span>
      </nav>
    </header>
  );
};

export default Header;