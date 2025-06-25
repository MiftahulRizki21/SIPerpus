import React from 'react'; 
import '../../assets/tailwind.css';
import BannerImg from '../../assets/perpustakaan.jpeg';
import { Link } from 'react-router-dom';
import FeaturedBooks from '../../components/FeaturedBooks';
import { motion } from 'framer-motion';

const Book = () => {
  return (
    <div className="book-page bg-[#c7e2e5] min-h-screen">
      
      {/* Banner Image with animation + text overlay */}
      <motion.div
        className="relative w-full h-[450px] overflow-hidden"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <img
          src={BannerImg}
          alt="Library"
          className="w-full h-full object-cover"
        />
        <motion.h2
          className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Book
        </motion.h2>
      </motion.div>

      {/* Content Section */}
      <div className="bg-[#eef7f7] px-6 md:px-28 py-10">
        
        {/* Heading with fade & slide */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800">
            <span className="text-teal-600">SIPerpus</span> Featured Collection
          </h2>
          <Link
            to="/books/all"
            className="border border-red-500 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50"
          >
            View All
          </Link>
        </motion.div>

        {/* Description Text */}
        <motion.div
          className="text-gray-600 text-base font-semibold leading-relaxed mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p>A curated selection of our most borrowed and loved books. Borrow anytime for free,</p>
          <p>with optional donation to help us grow. Enjoy reading wherever you are, with collections from poetry to architecture.</p>
        </motion.div>

        {/* Featured Books with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }}
        >
          <FeaturedBooks />
        </motion.div>
      </div>
    </div>
  );
};

export default Book;
