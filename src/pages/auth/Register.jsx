import React from 'react';
import bgPerpus from '../../assets/perpus1.jpeg'; // gambar HD
import '../../assets/tailwind.css';

const Register = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgPerpus})` }}
    >
      <div className="bg-white/50 backdrop-blur-md p-20 rounded-xl shadow-lg w-full max-w-7xl">
        <h1 className="text-center text-4xl font-bold mb-8 text-gray-800">
          <span className="text-gray-800">SI</span>
          <span className="font-bold" style={{ color: '#579DA5' }}>Perpus</span>
        </h1>
        <form className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">First name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">Last name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-3 rounded-md font-semibold transition duration-300"
            style={{ backgroundColor: '#579DA5' }}
          >
            Register
          </button>
        </form> {/* ✅ Tag form ditutup di sini */}
      </div>
    </div>
  );
};

export default Register;
