import React, { useEffect, useState } from 'react';
import '../../assets/tailwind.css';
import BannerImg from '../../assets/perpustakaan.jpeg';
import { supabase } from '../../services/supaBase';
import { Link } from 'react-router-dom';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const booksPerPage = 4;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('upload_status', 'approved');

      if (error) {
        console.error('Error fetching books:', error);
      } else {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const paginated = shuffled.slice((page - 1) * booksPerPage, page * booksPerPage);
        setBooks(paginated);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [page]);

  return (
    <div className="book-page bg-[#c7e2e5] min-h-screen">
      {/* Banner */}
      <div>
        <img src={BannerImg} alt="Library" className="w-full h-[450px] object-cover" />
      </div>

      {/* Featured Collection */}
      <div className="bg-[#eef7f7] px-6 md:px-28 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            <span className="text-teal-600">SIPerpus</span> Featured Collection
          </h2>
          <button
            onClick={() => window.location.href = '/anggota/books/all'}
            className="border border-red-500 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50"
          >
            View All
          </button>
        </div>

        <div className="text-gray-600 text-base font-semibold leading-relaxed mb-12">
          <p>A curated selection of our most borrowed and loved books. Borrow anytime for free,</p>
          <p>with optional donation to help us grow. Enjoy reading wherever you are, with collections from poetry to architecture.</p>
        </div>

        {/* Book Cards */}
        {loading ? (
          <p className="text-center text-gray-600">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-gray-600">Tidak ada buku yang tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
              >
                <img src={book.image_url} alt={book.title} className="w-full h-[450px] object-cover" />
                <div className="p-5">
                  <p className="text-base text-teal-600 font-semibold mb-2">{book.title}</p>
                  <Link
                    to={`/anggota/book/${book.id}`}
                    className="inline-block mt-2 px-4 py-2 bg-[#579DA5] text-white rounded hover:bg-[#478c94]"
                  >
                    Baca Buku
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
