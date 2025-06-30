import { useState, useEffect } from 'react'
import { 
  FiCheck, 
  FiX, 
  FiEye, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiFileText,
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiUser
} from 'react-icons/fi'
import { supabase } from "../../services/supaBase";

const ApprovePosts = () => {
  const [activeTab, setActiveTab] = useState('pending')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Fetch posts from Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('writings')
          .select(`
            id,
            title,
            content,
            category,
            status,
            word_count,
            read_time,
            created_at,
            updated_at,
            rejected_reason,
            user:user_id (id, name, avatar)
          `)
          .order('created_at', { ascending: false })

        if (error) throw error
        
        // Transform data to match our component structure
        const formattedData = data.map(post => ({
          id: post.id,
          title: post.title,
          author: post.user?.name || 'Unknown',
          authorAvatar: post.user?.avatar || post.user?.name?.charAt(0) || 'U',
          date: new Date(post.created_at).toISOString().split('T')[0],
          category: post.category,
          status: post.status,
          wordCount: post.word_count,
          readTime: post.read_time,
          content: post.content,
          lastEdited: new Date(post.updated_at).toISOString().split('T')[0],
          rejectedReason: post.rejected_reason
        }))
        
        setPosts(formattedData)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  // Available categories for filter
  const categories = ['all', ...new Set(posts.map(post => post.category))]

  // Filter posts based on active tab, search term and category
  const filteredPosts = posts.filter(post => 
    (activeTab === 'all' || post.status === activeTab) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     post.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || post.category === selectedCategory)
  )

  const handleStatusChange = async (postId, newStatus) => {
    try {
      const { error } = await supabase
        .from('writings')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString(),
          ...(newStatus === 'rejected' && { rejected_reason: 'Tidak sesuai pedoman' }),
          ...(newStatus === 'approved' && { approved_at: new Date().toISOString() })
        })
        .eq('id', postId)
      
      if (error) throw error
      
      // Update local state
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              status: newStatus,
              ...(newStatus === 'rejected' && { rejectedReason: 'Tidak sesuai pedoman' }),
              ...(newStatus === 'approved' && { approvedDate: new Date().toISOString().split('T')[0] })
            } 
          : post
      ))
      
      alert(`Status tulisan ID ${postId} berhasil diubah menjadi ${newStatus === 'approved' ? 'Disetujui' : 'Ditolak'}`)
    } catch (error) {
      console.error('Error updating post status:', error)
      alert('Gagal mengubah status tulisan')
    }
  }

  const viewPreview = (post) => {
    alert(`Preview Tulisan:\n\nJudul: ${post.title}\nPenulis: ${post.author}\nKategori: ${post.category}\n\n${post.content}`)
  }

  const viewDetails = (post) => {
    const details = {
      'Jumlah Kata': post.wordCount,
      'Waktu Baca': post.readTime,
      'Terakhir Diedit': post.lastEdited,
      ...(post.status === 'approved' && {
        'Tanggal Persetujuan': post.approvedDate || 'Tidak tersedia'
      }),
      ...(post.status === 'rejected' && {
        'Alasan Penolakan': post.rejectedReason || 'Tidak tersedia'
      })
    }
    
    alert(`Detail Tulisan:\n\n${Object.entries(details).map(([key, value]) => `${key}: ${value}`).join('\n')}`)
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#579DA5]"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">Moderasi Tulisan</h1>
          <p className="text-[#579DA5]">Kelola dan tinjau tulisan dari anggota</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#579DA5]" />
            </div>
            <input
              type="text"
              placeholder="Cari judul atau penulis..."
              className="pl-10 pr-4 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] w-full bg-[#F5FBFB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Semua Kategori' : category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-[#579DA5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-[#E0F2F1]">
        <nav className="flex flex-wrap gap-2 sm:gap-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'pending' ? 'border-[#F2C94C] text-[#F2C94C]' : 'border-transparent text-[#579DA5] hover:text-[#47818A] hover:border-[#E0F2F1]'}`}
          >
            <FiClock className="mr-2" />
            Menunggu <span className="ml-1 bg-[#FFF8E1] text-[#F2C94C] text-xs font-medium px-2 py-0.5 rounded-full">{posts.filter(p => p.status === 'pending').length}</span>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'approved' ? 'border-[#67B3A0] text-[#67B3A0]' : 'border-transparent text-[#579DA5] hover:text-[#47818A] hover:border-[#E0F2F1]'}`}
          >
            <FiCheckCircle className="mr-2" />
            Disetujui <span className="ml-1 bg-[#E8F5E9] text-[#67B3A0] text-xs font-medium px-2 py-0.5 rounded-full">{posts.filter(p => p.status === 'approved').length}</span>
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'rejected' ? 'border-[#EF5350] text-[#EF5350]' : 'border-transparent text-[#579DA5] hover:text-[#47818A] hover:border-[#E0F2F1]'}`}
          >
            <FiAlertCircle className="mr-2" />
            Ditolak <span className="ml-1 bg-[#FFEBEE] text-[#EF5350] text-xs font-medium px-2 py-0.5 rounded-full">{posts.filter(p => p.status === 'rejected').length}</span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-[#579DA5] text-[#579DA5]' : 'border-transparent text-[#579DA5] hover:text-[#47818A] hover:border-[#E0F2F1]'}`}
          >
            Semua <span className="ml-1 bg-[#E0F7FA] text-[#579DA5] text-xs font-medium px-2 py-0.5 rounded-full">{posts.length}</span>
          </button>
        </nav>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-[#E0F2F1] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#579DA5]">Total Tulisan</p>
              <p className="text-2xl font-semibold text-[#2C3E50]">{posts.length}</p>
            </div>
            <div className="p-3 rounded-full bg-[#E0F7FA] text-[#579DA5]">
              <FiFileText size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#E0F2F1] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#579DA5]">Menunggu Review</p>
              <p className="text-2xl font-semibold text-[#F2C94C]">{posts.filter(p => p.status === 'pending').length}</p>
            </div>
            <div className="p-3 rounded-full bg-[#FFF8E1] text-[#F2C94C]">
              <FiClock size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#E0F2F1] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#579DA5]">Rata-rata Waktu Baca</p>
              <p className="text-2xl font-semibold text-[#2C3E50]">
                {posts.length > 0 
                  ? `${Math.round(posts.reduce((sum, post) => sum + parseInt(post.readTime || '0'), 0) / posts.length)} min` 
                  : '0 min'}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#E0F7FA] text-[#579DA5]">
              <FiUser size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E0F2F1] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#E0F2F1]">
          <div className="text-sm text-[#579DA5]">
            Menampilkan <span className="font-medium">1-{filteredPosts.length}</span> dari <span className="font-medium">{filteredPosts.length}</span> tulisan
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#579DA5]">Urutkan:</span>
            <select className="text-sm border-0 focus:ring-[#579DA5] focus:border-[#579DA5] text-[#579DA5]">
              <option>Terbaru</option>
              <option>Terlama</option>
              <option>Judul (A-Z)</option>
              <option>Penulis (A-Z)</option>
            </select>
          </div>
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="divide-y divide-[#E0F2F1]">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-4 hover:bg-[#F5FBFB] transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E0F7FA] flex items-center justify-center text-[#579DA5] font-medium mt-1">
                        {post.authorAvatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-[#2C3E50]">{post.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm text-[#579DA5]">{post.author}</span>
                          <span className="text-xs text-[#E0F2F1]">•</span>
                          <span className="text-sm text-[#579DA5]">{post.date}</span>
                          <span className="text-xs text-[#E0F2F1]">•</span>
                          <span className="text-xs px-2 py-1 bg-[#E0F7FA] text-[#579DA5] rounded-full">
                            {post.category}
                          </span>
                          <span className="text-xs text-[#E0F2F1]">•</span>
                          <span className="text-xs text-[#579DA5]">{post.readTime || '0 min'} baca</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      post.status === 'approved' ? 'bg-[#E8F5E9] text-[#67B3A0]' :
                      post.status === 'rejected' ? 'bg-[#FFEBEE] text-[#EF5350]' :
                      'bg-[#FFF8E1] text-[#F2C94C]'
                    }`}>
                      {post.status === 'approved' ? 'Disetujui' : 
                       post.status === 'rejected' ? 'Ditolak' : 'Menunggu'}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => viewPreview(post)}
                        className="p-2 text-[#579DA5] hover:text-[#47818A] hover:bg-[#E0F7FA] rounded-full transition-colors"
                        title="Preview"
                      >
                        <FiEye size={18} />
                      </button>
                      <button 
                        onClick={() => viewDetails(post)}
                        className="p-2 text-[#579DA5] hover:text-[#47818A] hover:bg-[#E0F7FA] rounded-full transition-colors"
                        title="Detail"
                      >
                        <FiFileText size={18} />
                      </button>
                      {post.status !== 'approved' && (
                        <button 
                          onClick={() => handleStatusChange(post.id, 'approved')}
                          className="p-2 text-[#579DA5] hover:text-[#67B3A0] hover:bg-[#E8F5E9] rounded-full transition-colors"
                          title="Setujui"
                        >
                          <FiCheck size={18} />
                        </button>
                      )}
                      {post.status !== 'rejected' && (
                        <button 
                          onClick={() => handleStatusChange(post.id, 'rejected')}
                          className="p-2 text-[#579DA5] hover:text-[#EF5350] hover:bg-[#FFEBEE] rounded-full transition-colors"
                          title="Tolak"
                        >
                          <FiX size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto h-24 w-24 text-[#E0F2F1] mb-4">
              <FiFileText className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-[#2C3E50] mb-1">
              Tidak ada tulisan {activeTab === 'pending' ? 'yang menunggu persetujuan' : 
                              activeTab === 'approved' ? 'yang telah disetujui' : 
                              activeTab === 'rejected' ? 'yang ditolak' : ''}
            </h3>
            <p className="text-[#579DA5] mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Coba ubah pencarian atau filter Anda' 
                : 'Semua tulisan telah diproses'}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="text-[#579DA5] hover:text-[#47818A] font-medium text-sm"
              >
                Reset pencarian
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="px-6 py-4 border-t border-[#E0F2F1] flex items-center justify-between">
            <div className="text-sm text-[#579DA5]">
              Menampilkan <span className="font-medium">1-{filteredPosts.length}</span> dari <span className="font-medium">{filteredPosts.length}</span>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-[#E0F2F1] rounded-md text-sm font-medium text-[#579DA5] bg-white hover:bg-[#E0F7FA] disabled:opacity-50" disabled>
                Sebelumnya
              </button>
              <button className="px-3 py-1 border border-[#E0F2F1] rounded-md text-sm font-medium text-[#579DA5] bg-white hover:bg-[#E0F7FA]">
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApprovePosts