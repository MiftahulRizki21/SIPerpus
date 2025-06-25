import React from 'react';
import bgPerpus from '../../assets/perpus1.jpeg';
import '../../assets/tailwind.css';
import { motion } from 'framer-motion';

const Donation = () => {
  return (
    <motion.div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-start pl-20 relative"
      style={{ backgroundImage: `url(${bgPerpus})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Kotak Hijau Kanan */}
      <motion.div
        className="absolute right-35 top-1/3 transform -translate-y-1/2 bg-green-800 text-white px-27 py-27 rounded-xl shadow-xl text-center"
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="text-lg mb-4">★★★★★ <span className="text-sm">(5)</span></div>
        <div className="text-7xl font-extrabold">357</div><br></br>
        <div className="mt-2 text-xl font-semibold tracking-wide">DONATION</div>
      </motion.div>

      {/* Form Donasi */}
      <motion.div
        className="px-16 py-21 rounded-xl shadow-lg w-4/4 max-w-6xl -mt-12"
        style={{ backgroundColor: '#F2FCFC' }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <motion.h1
          className="text-center text-5xl font-bold mb-10 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Give a donation!
        </motion.h1>
        <motion.form
          className="space-y-8"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.div className="flex flex-col md:flex-row gap-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="w-full">
              <label className="block mb-2 text-gray-700 font-semibold text-lg">First name</label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5] text-lg"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-700 font-semibold text-lg">Last name</label>
              <input
                type="text"
                className="w-full px-5 py-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5] text-lg"
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <label className="block mb-2 text-gray-700 font-semibold text-lg">Email</label>
            <input
              type="email"
              className="w-full px-5 py-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5] text-lg"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <label className="block mb-2 text-gray-700 font-semibold text-lg">Phone</label>
            <input
              type="tel"
              className="w-full px-5 py-3 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5] text-lg"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <button
              type="submit"
              className="w-full text-white py-4 text-xl rounded-md font-semibold transition duration-300"
              style={{ backgroundColor: '#579DA5' }}
            >
              Send
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Donation;
