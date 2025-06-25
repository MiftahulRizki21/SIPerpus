import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/anggota/Navbar';
import { AnimatePresence, motion } from 'framer-motion';

const AnggotaLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      {/* Navbar tetap di atas */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Transisi konten halaman */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative z-0"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnggotaLayout;