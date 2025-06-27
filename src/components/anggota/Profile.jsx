import React from "react";
import '../../assets/tailwind.css';
import bgPerpus from '../../assets/perpus1.jpeg';

const Profile = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${bgPerpus})` }}
    >
      <div className="bg-white/50 backdrop-blur-md p-12 md:p-20 rounded-xl shadow-lg w-full max-w-4xl">

        <h2 className="text-center text-4xl font-bold mb-8 text-gray-800">
          Informasi <span style={{ color: '#579DA5' }}>Profile</span>
        </h2>

        <form className="space-y-6">

          {/* Row 1: Nama dan Email */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">Nama</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/70 focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/70 focus:outline-none"
              />
            </div>
          </div>

          {/* Jenis Anggota */}
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Jenis Anggota</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/70 focus:outline-none"
            />
          </div>

          {/* Login Terakhir */}
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Login Terakhir</label>
            <textarea

              className="w-full px-4 py-2 rounded-md border border-gray-400 bg-white/70 focus:outline-none whitespace-pre-line"
            />
          </div>

          {/* Button */}
          <button
            type="button"
            className="w-full text-white py-3 rounded-md font-semibold transition duration-300"
            style={{ backgroundColor: '#579DA5' }}
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
