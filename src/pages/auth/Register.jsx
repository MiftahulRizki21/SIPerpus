import React from 'react';
import bgPerpus from '../../assets/perpus1.jpeg';
import '../../assets/tailwind.css';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const Register = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center pt-10 md:pt-16"
      style={{ backgroundImage: `url(${bgPerpus})` }}
    >
      <motion.div
        className="bg-white/50 backdrop-blur-md p-20 rounded-xl shadow-lg w-full max-w-7xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-center text-4xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="text-gray-800">SI</span>
          <span className="font-bold" style={{ color: '#579DA5' }}>Perpus</span>
        </motion.h1>

        <motion.form
          className="space-y-6"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {/* First Name + Last Name */}
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            variants={fadeInUp}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">First name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">Last name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </motion.div>

          {/* Gender + Birthdate */}
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            variants={fadeInUp}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="w-full flex flex-col justify-stretch">
              <label className="block mb-1 text-gray-700 font-semibold">Gender</label>
              <select
                className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400"
                style={{ height: "47px" }}
              >
                <option value="">Select gender</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">Birthdate</label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </motion.div>

          {/* Address + Phone & Email */}
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            variants={fadeInUp}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="w-full md:w-1/2">
              <label className="block mb-1 text-gray-700 font-semibold">Address</label>
              <textarea
                className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400 h-[140px]"
              ></textarea>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Password + Confirm Password */}
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            variants={fadeInUp}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-gray-700 font-semibold">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-white rounded-md border border-gray-400 shadow-[0_2px_6px_rgba(156,163,175,0.5)] focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </motion.div>

          {/* Button */}
          <motion.button
            type="submit"
            className="w-full text-white py-3 rounded-md font-semibold transition duration-300"
            style={{ backgroundColor: '#579DA5' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Register
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
