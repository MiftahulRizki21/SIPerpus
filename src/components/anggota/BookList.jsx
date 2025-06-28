import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../../assets/tailwind.css';
import { supabase } from '../../services/supaBase';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

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
        setFilteredBooks([]);
      } else {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setBooks(shuffled);
        setFilteredBooks(shuffled);
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

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

  return (
    <div className="bg-[#eef7f7] min-h-screen px-6 md:px-20 py-10">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        📚 View All Books in <span className="text-[#579DA5]">SIPerpus</span>
      </motion.h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Cari judul buku..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#579DA5]"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-center text-gray-600">Tidak ada buku yang tersedia.</p>
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 overflow-hidden"
              variants={cardVariant}
            >
              <img src={book.image_url} alt={book.title} className="w-full h-40 object-cover" />
              <div className="p-3">
                <p className="font-semibold text-sm text-gray-800 truncate">{book.title}</p>
                <Link
                  to={`/anggota/book/${book.id}`}
                  className="inline-block mt-2 px-4 py-2 bg-[#579DA5] text-white rounded hover:bg-[#478c94]"
                >
                  Baca Buku
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookList;
