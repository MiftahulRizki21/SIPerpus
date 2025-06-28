// components/Articles.jsx
import { useState, useEffect } from 'react'
import { supabase } from "../../services/supaBase";
import {
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiFileText,
  FiUser,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi'

const Articles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 5

  // Fetch articles dari Supabase
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('writings')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setArticles(data || [])
      } catch (err) {
        setError(err.message)
        console.error('Error fetching articles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // Delete article dari Supabase
  const deleteArticle = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      try {
        const { error } = await supabase
          .from('writings')
          .delete()
          .eq('id', id)

        if (error) throw error
        // Update state setelah delete
        setArticles(articles.filter(article => article.id !== id))
      } catch (err) {
        setError(err.message)
        console.error('Error deleting article:', err)
      }
    }
  }

  const viewArticleDetails = (article) => {
    alert(`Detail Artikel:\n\nJudul: ${article.title}\nID Pengguna: ${article.user_id}\nStatus: ${article.status}\nTanggal Dibuat: ${formatDate(article.created_at)}\n\nKonten:\n${article.content}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return { bg: 'bg-[#e6f7f9]', text: 'text-[#1a6d7a]', icon: <FiCheckCircle className="text-[#579DA5]" /> }
      case 'Draft': return { bg: 'bg-[#fff8e6]', text: 'text-[#8a6d3b]', icon: <FiClock className="text-[#ffc107]" /> }
      default: return { bg: 'bg-gray-50', text: 'text-gray-800', icon: null }
    }
  }

  // Filter articles berdasarkan pencarian
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  if (loading) return (
    <div className="p-6 flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#579DA5]"></div>
    </div>
  )

  if (error) return (
    <div className="p-6 text-red-600">
      Error: {error}
    </div>
  )

  return (
    <div className="p-6">
      {/* Header dan Search */}
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
              placeholder="Cari judul atau konten..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <button 
            className="flex items-center justify-center px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#4a8b92] transition-colors"
            onClick={() => alert('Fitur tambah artikel akan dibuka')}
          >
            <FiPlus className="mr-2" />
            Tambah Artikel
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      </div>

      {/* Articles List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="text-sm text-gray-500">
            Menampilkan <span className="font-medium">1-{currentArticles.length}</span> dari <span className="font-medium">{filteredArticles.length}</span> artikel
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Urutkan:</span>
            <select 
              className="text-sm border-0 focus:ring-[#579DA5] focus:border-[#579DA5]"
              onChange={async (e) => {
                const order = e.target.value === 'Terlama' ? { ascending: true } : { ascending: false }
                try {
                  setLoading(true)
                  const { data, error } = await supabase
                    .from('writings')
                    .select('*')
                    .order('created_at', order)

                  if (error) throw error
                  setArticles(data || [])
                } catch (err) {
                  setError(err.message)
                } finally {
                  setLoading(false)
                }
              }}
            >
              <option>Terbaru</option>
              <option>Terlama</option>
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
                          <FiUser className="mr-1" /> User ID: {article.user_id}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <FiCalendar className="mr-1" /> {formatDate(article.created_at)}
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
                          onClick={() => alert(`Edit artikel ${article.id} akan dibuka`)}
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
              {searchTerm ? 'Tidak ada artikel yang ditemukan' : 'Belum ada artikel yang terdaftar'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm
                ? 'Coba ubah pencarian Anda'
                : 'Klik tombol "Tambah Artikel" untuk membuat artikel baru'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
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