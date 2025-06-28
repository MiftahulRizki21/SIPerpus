import React from 'react';
import Book1 from '../assets/book1.jpeg';
import Book2 from '../assets/book2.jpeg';
import Book3 from '../assets/book3.jpeg';
import Book4 from '../assets/Book4.jpeg';
import { motion } from 'framer-motion';

const featuredBooks = Array.from({ length: 8 }, (_, i) => {
  const imgs = [Book1, Book2, Book3, Book4];
  return imgs[i % 4];
});

const FeaturedBooks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
      {featuredBooks.map((img, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <img src={img} alt={`Book ${index + 1}`} className="w-full h-[450px] object-cover" />
          <div className="p-5">
            <p className="text-base text-teal-600 font-semibold mb-1">Category | Genre</p>
            <p className="text-gray-700 text-sm mb-2">Free Borrowing</p>
            <p className="text-gray-800 text-xs">⭐ 4.{(index % 6) + 4} · Readers' Choice</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedBooks;
