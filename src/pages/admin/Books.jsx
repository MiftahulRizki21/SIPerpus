import { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiBook,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiMinusCircle
} from 'react-icons/fi';
import { supabase } from "../../services/supaBase";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Fetch books from Supabase
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase
          .from('books')
          .select('*')
          .order('title', { ascending: true });

        if (error) throw error;
        setBooks(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on search
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.kbn.includes(searchTerm) ||
    book.publisher?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Delete book from Supabase
  const deleteBook = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      try {
        const { error } = await supabase
          .from('books')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setBooks(books.filter(book => book.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const getStatusColor = (available_copies) => {
    if (available_copies > 10) {
      return { bg: 'bg-[#e6f7f9]', text: 'text-[#1a6d7a]', icon: <FiCheckCircle className="text-[#579DA5]" />, label: 'Tersedia' };
    } else if (available_copies > 0) {
      return { bg: 'bg-[#fff8e6]', text: 'text-[#8a6d3b]', icon: <FiAlertCircle className="text-[#ffc107]" />, label: 'Terbatas' };
    } else {
      return { bg: 'bg-[#fde8e8]', text: 'text-[#a94442]', icon: <FiMinusCircle className="text-[#dc3545]" />, label: 'Habis' };
    }
  };

  const getUploadStatusColor = (status) => {
    switch(status) {
      case 'completed': return { bg: 'bg-green-50', text: 'text-green-800', label: 'Selesai' };
      case 'processing': return { bg: 'bg-blue-50', text: 'text-blue-800', label: 'Proses' };
      case 'failed': return { bg: 'bg-red-50', text: 'text-red-800', label: 'Gagal' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-800', label: 'Unknown' };
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#579DA5]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded-lg">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[#e6f7f9] text-[#579DA5]">
            <FiBookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Buku</h1>
            <p className="text-gray-500">Kelola koleksi buku perpustakaan</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari judul, penulis, kbn, atau penerbit..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#4a8b92] transition-colors">
            <FiPlus className="mr-2" />
            Tambah Buku
          </button>
        </div>
      </div>

      {/* Book List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {currentBooks.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {currentBooks.map((book) => {
              const availability = getStatusColor(book.available_copies);
              const uploadStatus = getUploadStatusColor(book.upload_status);
              return (
                <div key={book.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-16 flex items-center justify-center bg-gray-100 rounded-md shadow-sm border border-gray-200">
                      <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{book.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FiUser className="mr-1" /> {book.author}
                        </span>
                        {book.publisher && (
                          <span className="text-sm text-gray-500">{book.publisher}</span>
                        )}
                        {book.year && (
                          <span className="text-sm text-gray-500">{book.year}</span>
                        )}
                        <span className="text-sm text-gray-500">{book.kbn}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${availability.bg} ${availability.text}`}>
                          {availability.icon}
                          {availability.label} ({book.available_copies})
                        </span>
                        {book.upload_status && (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${uploadStatus.bg} ${uploadStatus.text}`}>
                            {uploadStatus.label}
                          </span>
                        )}
                      </div>
                      {book.description && (
                        <p className="text-sm text-gray-500 mt-2 line-clamp-1">{book.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-[#579DA5] hover:bg-[#e6f7f9] rounded-full transition-colors">
                        <FiEdit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteBook(book.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <FiBookOpen className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Tidak ada buku yang ditemukan
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? 'Coba ubah pencarian Anda' 
                : 'Belum ada buku yang terdaftar'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center"
            >
              <FiChevronLeft className="mr-1" /> Sebelumnya
            </button>
            <div className="text-sm text-gray-500">
              Halaman {currentPage} dari {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center"
            >
              Selanjutnya <FiChevronRight className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;