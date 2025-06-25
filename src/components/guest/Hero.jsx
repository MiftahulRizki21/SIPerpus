import React from "react";
import { motion } from "framer-motion";
import libraryImg from "../../assets/SIPerpus.jpg"; // pastikan path benar

const Hero = () => {
  return (
    <motion.section
      className="min-h-screen bg-[#f0f8ff] flex items-center justify-between px-10 py-20 font-sans overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Kiri: Teks */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col justify-center space-y-7 pl-16 -mt-30"
        initial={{ x: -100, opacity: 0, scale: 0.95 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{
          delay: 0.4,
          duration: 1.2,
          ease: "easeOut",
          type: "spring",
          stiffness: 60,
        }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Read Once
        </motion.h1>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Remember Forever
        </motion.h1>

        <motion.p
          className="text-gray-700 text-xl font-semibold leading-relaxed pr-10"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 1 }}
        >
          Discover thousands of books, limitless knowledge, and inspiring stories
          that will shape your perspective and accompany your intellectual journey.
        </motion.p>

        <motion.button
          className="bg-[#579DA5] hover:bg-[#4a8a93] text-white py-4 px-9 rounded-md text-base font-semibold transition w-fit shadow-md tracking-wide"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
        >
          Explore Books Now
        </motion.button>
      </motion.div>

      {/* Kanan: Gambar */}
     <motion.div
  className="hidden md:flex justify-center items-end w-[40%]"
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    delay: 1,
    duration: 1.2,
    ease: "easeOut"
  }}
>
  <img
    src={libraryImg}
    alt="Library"
    className="h-[900px] w-[700px] object-cover rounded-[350px_350px_0_0] shadow-xl"
  />
</motion.div>
    </motion.section>
  );
};

export default Hero;
