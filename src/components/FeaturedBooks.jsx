import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/tailwind.css';
import { supabase } from '../services/supaBase';
import { Link } from 'react-router-dom';
const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('upload_status', 'approved')
        .limit(20);

      if (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      } else {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setBooks(shuffled.slice(0, 4));
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading books...</p>;
  }

  if (books.length === 0) {
    return <p className="text-center text-gray-600">Tidak ada buku yang tersedia.</p>;
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-4 gap-8"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {books.map((book) => (
        <motion.div
          key={book.id}
          className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
          variants={cardVariant}
        >
          <img src={book.image_url} alt={book.title} className="w-full h-[450px] object-cover" />
          <div className="p-5">
            <p className="text-base text-teal-600 font-semibold mb-1 truncate">{book.title}</p>
                  <Link
                    to={`/book/${book.id}`}
                    className="inline-block mt-2 px-4 py-2 bg-[#579DA5] text-white rounded hover:bg-[#478c94]"
                  >
                    Baca Buku
                  </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedBooks;
