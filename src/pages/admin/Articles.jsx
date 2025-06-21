import { useState } from 'react'
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiFileText,
  FiUser,
  FiCalendar,
  FiTag,
  FiCheckCircle,
  FiClock,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'

const Articles = () => {
  // Sample article data with more details
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Panduan Lengkap Belajar React',
      author: 'John Doe',
      category: 'Teknologi',
      date: '2023-05-10',
      status: 'Published',
      views: 1245,
      likes: 89,
      content: 'Artikel ini membahas dasar-dasar React untuk pemula...'
    },
    {
      id: 2,
      title: 'Sejarah Perkembangan JavaScript',
      author: 'Jane Smith',
      category: 'Teknologi',
      date: '2023-05-15',
      status: 'Draft',
      views: 0,
      likes: 0,
      content: 'Perjalanan JavaScript dari masa ke masa...'
    },
    {
      id: 3,
      title: 'Tips Menulis Artikel yang Menarik',
      author: 'Bob Johnson',
      category: 'Menulis',
      date: '2023-05-20',
      status: 'Published',
      views: 876,
      likes: 45,
      content: 'Teknik-teknik menulis artikel yang menarik pembaca...'
    },
    {
      id: 4,
      title: 'Pengenalan Machine Learning',
      author: 'Alice Brown',
      category: 'Data Science',
      date: '2023-05-25',
      status: 'Published',
      views: 1532,
      likes: 124,
      content: 'Dasar-dasar machine learning untuk pemula...'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const articlesPerPage = 5

  // Get all unique categories
  const categories = ['all', ...new Set(articles.map(article => article.category))]

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article =>
    (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || article.category === selectedCategory)
  )

  // Correct pagination logic
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  const deleteArticle = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      setArticles(articles.filter(article => article.id !== id))
    }
  }

  const viewArticleDetails = (article) => {
    alert(`Detail Artikel:\n\nJudul: ${article.title}\nPenulis: ${article.author}\nStatus: ${article.status}\nKategori: ${article.category}\nTanggal: ${article.date}\n\nDilihat: ${article.views}x\nSuka: ${article.likes}\n\nKonten:\n${article.content}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return { bg: 'bg-[#e6f7f9]', text: 'text-[#1a6d7a]', icon: <FiCheckCircle className="text-[#579DA5]" /> }
      case 'Draft': return { bg: 'bg-[#fff8e6]', text: 'text-[#8a6d3b]', icon: <FiClock className="text-[#ffc107]" /> }
      default: return { bg: 'bg-gray-50', text: 'text-gray-800', icon: null }
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[#e6f7f9] text-[#579DA5]">
            <FiFileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Artikel</h1>
            <p className="text-gray-500">Kelola artikel dan konten website</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari judul atau penulis..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Semua Kategori' : category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#4a8b92] transition-colors">
            <FiPlus className="mr-2" />
            Tambah Artikel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Artikel</p>
              <p className="text-2xl font-semibold text-gray-800">{articles.length}</p>
            </div>
            <div className="p-3 rounded-full bg-[#e6f7f9] text-[#579DA5]">
              <FiFileText size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Diterbitkan</p>
              <p className="text-2xl font-semibold text-[#1a6d7a]">
                {articles.filter(a => a.status === 'Published').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#e6f7f9] text-[#579DA5]">
              <FiCheckCircle size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Draft</p>
              <p className="text-2xl font-semibold text-[#8a6d3b]">
                {articles.filter(a => a.status === 'Draft').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#fff8e6] text-[#ffc107]">
              <FiClock size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Dilihat</p>
              <p className="text-2xl font-semibold text-[#6f42c1]">
                {articles.reduce((sum, article) => sum + article.views, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#f0e6ff] text-[#6f42c1]">
              <FiUser size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="text-sm text-gray-500">
            Menampilkan <span className="font-medium">1-{currentArticles.length}</span> dari <span className="font-medium">{filteredArticles.length}</span> artikel
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Urutkan:</span>
            <select className="text-sm border-0 focus:ring-[#579DA5] focus:border-[#579DA5]">
              <option>Terbaru</option>
              <option>Terlama</option>
              <option>Paling Banyak Dilihat</option>
              <option>Judul (A-Z)</option>
            </select>
          </div>
        </div>

        {currentArticles.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {currentArticles.map((article) => {
              const statusColor = getStatusColor(article.status)
              return (
                <div key={article.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{article.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FiUser className="mr-1" /> {article.author}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <FiTag className="mr-1" /> {article.category}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <FiCalendar className="mr-1" /> {article.date}
                        </span>
                        <span className="text-sm text-gray-500">
                          Dilihat: <span className="font-medium">{article.views}x</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColor.bg} ${statusColor.text}`}>
                        {statusColor.icon}
                        {article.status === 'Published' ? 'Diterbitkan' : 'Draft'}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewArticleDetails(article)}
                          className="p-2 text-gray-500 hover:text-[#579DA5] hover:bg-[#e6f7f9] rounded-full transition-colors"
                          title="Detail"
                        >
                          <FiFileText size={18} />
                        </button>
                        <button
                          className="p-2 text-gray-500 hover:text-[#579DA5] hover:bg-[#e6f7f9] rounded-full transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteArticle(article.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Hapus"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <FiFileText className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Tidak ada artikel yang ditemukan
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all'
                ? 'Coba ubah pencarian atau filter Anda'
                : 'Belum ada artikel yang terdaftar'}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="text-[#579DA5] hover:text-[#4a8b92] font-medium text-sm"
              >
                Reset pencarian
              </button>
            )}
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
  )
}

export default Articles