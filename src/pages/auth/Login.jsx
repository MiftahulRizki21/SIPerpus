import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgPerpus from '../../assets/perpus1.jpeg';
import '../../assets/tailwind.css';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/anggota/beranda");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
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
          onSubmit={handleLogin}
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            variants={fadeInUp}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
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
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ delay: 0.5, duration: 0.7 }}>
            <label className="block mb-1 text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </motion.div>

          <motion.div variants={fadeInUp} transition={{ delay: 0.6, duration: 0.7 }}>
            <label className="block mb-1 text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full text-white py-3 rounded-md font-semibold transition duration-300"
            style={{ backgroundColor: '#579DA5' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            Sign In
          </motion.button>
        </motion.form>

        <motion.p
          className="text-center mt-6 text-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Don’t have an account?{' '}
          <Link to="/register" className="hover:underline" style={{ color: '#579DA5' }}>
            Register here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
