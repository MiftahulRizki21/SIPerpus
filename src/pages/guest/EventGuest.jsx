// File: EventGuest.jsx
import React from 'react';
import perpusImage from '../../assets/perpus1.jpeg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Variants untuk animasi besar dan kartu kecil
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const EventGuest = () => {
  const navigate = useNavigate();

  const smallCards = Array(6).fill({
    image: perpusImage,
    title: 'Judul berita buku menarik dan mendalam untuk dibaca semua kalangan',
    category: 'Megapolitan',
    date: '28 Juni 2025',
  });

  return (
    <div className="eventguest min-h-screen bg-[#f8fafc]">
      {/* Banner */}
      <div className="relative">
        <motion.img
          src={perpusImage}
          alt="Banner"
          className="w-full h-[480px] object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <motion.h1
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Event
        </motion.h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-10">
        {/* Card Besar */}
        <motion.div
          variants={headlineVariants}
          initial="hidden"
          animate="show"
          className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-[500px] w-full"
        >
          <img src={perpusImage} alt="Headline" className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-white text-blue-700 font-bold px-3 py-1 text-xs rounded-full shadow">
            Headline
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <h2 className="text-white text-xl lg:text-2xl font-bold leading-snug">
              Pendakian Gunung Buku Kembali Dibuka, Pembaca Antusias Menyambut!
            </h2>
          </div>
        </motion.div>

        {/* Kartu Kecil dengan efek muncul satu per satu */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {smallCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/event/${idx}`)}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden h-[250px]"
            >
              <img src={card.image} alt={`card-${idx}`} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{card.category}</p>
                <p className="text-xs text-gray-500">{card.date}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EventGuest;
