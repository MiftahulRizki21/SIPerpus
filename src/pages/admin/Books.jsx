import { useState } from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiBookOpen,
  FiFilter,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiBook,
  FiUser,
  FiCalendar,
  FiCheckCircle,
  FiAlertCircle,
  FiMinusCircle
} from 'react-icons/fi';

const Books = () => {
  // Sample book data
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'Belajar React JS dari Dasar',
      author: 'John Doe',
      category: 'Pemrograman',
      year: 2023,
      isbn: '978-623-123-456-1',
      stock: 15,
      status: 'Available',
      cover: 'https://source.unsplash.com/random/200x300/?programming,book'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const booksPerPage = 5;

  // Filter books based on search and category
  const filteredBooks = books.filter(book => 
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.isbn.includes(searchTerm)) &&
    (selectedCategory === 'all' || book.category === selectedCategory)
  );

  // Pagination
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const deleteBook = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return { bg: 'bg-[#e6f7f9]', text: 'text-[#1a6d7a]', icon: <FiCheckCircle className="text-[#579DA5]" /> };
      case 'Limited': return { bg: 'bg-[#fff8e6]', text: 'text-[#8a6d3b]', icon: <FiAlertCircle className="text-[#ffc107]" /> };
      case 'Out of Stock': return { bg: 'bg-[#fde8e8]', text: 'text-[#a94442]', icon: <FiMinusCircle className="text-[#dc3545]" /> };
      default: return { bg: 'bg-gray-50', text: 'text-gray-800', icon: null };
    }
  };

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
              placeholder="Cari judul, penulis, atau ISBN..."
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
              const statusColor = getStatusColor(book.status);
              return (
                <div key={book.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="h-24 w-16 object-cover rounded-md shadow-sm border border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{book.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FiUser className="mr-1" /> {book.author}
                        </span>
                        <span className="text-sm text-gray-500">{book.category}</span>
                        <span className="text-sm text-gray-500">{book.year}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColor.bg} ${statusColor.text}`}>
                          {statusColor.icon}
                          {book.status === 'Available' ? 'Tersedia' : 
                           book.status === 'Limited' ? 'Terbatas' : 'Habis'}
                        </span>
                      </div>
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
              {searchTerm || selectedCategory !== 'all' 
                ? 'Coba ubah pencarian atau filter Anda' 
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