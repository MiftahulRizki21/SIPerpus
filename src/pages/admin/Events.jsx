import { useState } from 'react'
import { 
  FiSearch, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiCalendar,
  FiClock, 
  FiMapPin,
  FiUsers,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle
} from 'react-icons/fi'
import { format, parseISO, isBefore, isAfter } from 'date-fns'

const Events = () => {
  // Enhanced event data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Workshop Pengembangan Web Modern',
      description: 'Pelajari teknik terbaru dalam pengembangan web dengan framework modern',
      date: '2023-06-15',
      time: '09:00 - 12:00',
      location: 'Ruang Seminar A, Gedung Teknik',
      category: 'Workshop',
      status: 'Upcoming',
      participants: 45,
      maxParticipants: 60,
      image: 'https://source.unsplash.com/random/400x200/?workshop'
    },
    {
      id: 2,
      title: 'Seminar Kecerdasan Buatan',
      description: 'Diskusi tentang perkembangan terbaru di bidang AI dan machine learning',
      date: '2023-06-20',
      time: '13:00 - 15:30',
      location: 'Auditorium Pusat',
      category: 'Seminar',
      status: 'Upcoming',
      participants: 120,
      maxParticipants: 150,
      image: 'https://source.unsplash.com/random/400x200/?seminar'
    },
    {
      id: 3,
      title: 'Pelatihan Dasar-Dasar React',
      description: 'Pelatihan intensif untuk pemula yang ingin mempelajari React',
      date: '2023-05-30',
      time: '10:00 - 16:00',
      location: 'Lab Komputer 3',
      category: 'Pelatihan',
      status: 'Completed',
      participants: 25,
      maxParticipants: 30,
      image: 'https://source.unsplash.com/random/400x200/?training'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const eventsPerPage = 5

  // Update event status based on current date
  const updatedEvents = events.map(event => {
    const eventDate = parseISO(event.date)
    const now = new Date()
    
    let status = event.status
    if (isBefore(eventDate, now)) {
      status = 'Completed'
    } else if (isAfter(eventDate, now)) {
      status = 'Upcoming'
    }

    return { ...event, status }
  })

  // Get all unique categories
  const categories = ['all', ...new Set(events.map(event => event.category))]

  // Filter events
  const filteredEvents = updatedEvents.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = 
      filterStatus === 'all' || 
      event.status.toLowerCase() === filterStatus.toLowerCase()
    
    const matchesCategory =
      filterCategory === 'all' ||
      event.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)

  // Delete event
  const deleteEvent = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus event ini?')) {
      setEvents(events.filter(event => event.id !== id))
    }
  }

  // Status styling
  const getStatusColor = (status) => {
    switch(status) {
      case 'Upcoming': 
        return { 
          bg: 'bg-[#e6f7f9]', 
          text: 'text-[#1a6d7a]',
          icon: <FiCalendar className="text-[#579DA5]" />
        }
      case 'Ongoing': 
        return { 
          bg: 'bg-[#fff8e6]', 
          text: 'text-[#8a6d3b]',
          icon: <FiAlertTriangle className="text-[#ffc107]" />
        }
      case 'Completed': 
        return { 
          bg: 'bg-[#e6f9f0]', 
          text: 'text-[#1a7a4a]',
          icon: <FiCheckCircle className="text-[#28a745]" />
        }
      case 'Cancelled': 
        return { 
          bg: 'bg-[#fde8e8]', 
          text: 'text-[#a94442]',
          icon: <FiXCircle className="text-[#dc3545]" />
        }
      default: 
        return { 
          bg: 'bg-gray-50', 
          text: 'text-gray-800',
          icon: null
        }
    }
  }

  // Format date
  const formatDate = (dateString) => {
    return format(parseISO(dateString), 'EEEE, dd MMMM yyyy')
  }

  // View event details
  const viewEventDetails = (event) => {
    alert(`Detail Event:\n\nJudul: ${event.title}\nDeskripsi: ${event.description}\nTanggal: ${formatDate(event.date)}\nWaktu: ${event.time}\nLokasi: ${event.location}\nKategori: ${event.category}\nStatus: ${event.status}\nPeserta: ${event.participants}/${event.maxParticipants}`)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[#e6f7f9] text-[#579DA5]">
            <FiCalendar size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Event</h1>
            <p className="text-gray-500">Kelola acara dan kegiatan perpustakaan</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari event..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#4a8b92] transition-colors">
            <FiPlus className="mr-2" />
            Tambah Event
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Event</p>
              <p className="text-2xl font-semibold text-gray-800">{events.length}</p>
            </div>
            <div className="p-3 rounded-full bg-[#e6f7f9] text-[#579DA5]">
              <FiCalendar size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Mendatang</p>
              <p className="text-2xl font-semibold text-[#579DA5]">
                {updatedEvents.filter(e => e.status === 'Upcoming').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#e6f7f9] text-[#579DA5]">
              <FiClock size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Selesai</p>
              <p className="text-2xl font-semibold text-[#28a745]">
                {updatedEvents.filter(e => e.status === 'Completed').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#e6f9f0] text-[#28a745]">
              <FiCheckCircle size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Peserta</p>
              <p className="text-2xl font-semibold text-[#6f42c1]">
                {events.reduce((sum, event) => sum + event.participants, 0)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#f0e6ff] text-[#6f42c1]">
              <FiUsers size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <span className="text-sm text-gray-500">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-[#579DA5] focus:border-[#579DA5]"
            >
              <option value="all">Semua Status</option>
              <option value="upcoming">Mendatang</option>
              <option value="ongoing">Berlangsung</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-[#579DA5] focus:border-[#579DA5]"
            >
              <option value="all">Semua Kategori</option>
              {categories.filter(c => c !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="text-sm text-gray-500">
            Menampilkan <span className="font-medium">1-{currentEvents.length}</span> dari <span className="font-medium">{filteredEvents.length}</span> event
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Urutkan:</span>
            <select className="text-sm border-0 focus:ring-[#579DA5] focus:border-[#579DA5]">
              <option>Terbaru</option>
              <option>Terlama</option>
              <option>Paling Banyak Peserta</option>
              <option>Judul (A-Z)</option>
            </select>
          </div>
        </div>
        
        {currentEvents.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {currentEvents.map((event) => {
              const statusColor = getStatusColor(event.status)
              return (
                <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 w-full md:w-48 h-32 overflow-hidden rounded-lg">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="text-lg font-medium text-gray-800">{event.title}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColor.bg} ${statusColor.text}`}>
                          {statusColor.icon}
                          {event.status === 'Upcoming' ? 'Mendatang' : 
                           event.status === 'Completed' ? 'Selesai' : 
                           event.status === 'Cancelled' ? 'Dibatalkan' : 'Berlangsung'}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiCalendar className="mr-2 text-gray-400" />
                          {formatDate(event.date)}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiClock className="mr-2 text-gray-400" />
                          {event.time}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiMapPin className="mr-2 text-gray-400" />
                          {event.location}
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">{event.participants}</span>/{event.maxParticipants} peserta
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => viewEventDetails(event)}
                            className="text-sm px-3 py-1 bg-[#e6f7f9] text-[#579DA5] rounded-lg hover:bg-[#d1edf1]"
                          >
                            Detail
                          </button>
                          <button 
                            className="text-sm px-3 py-1 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                          >
                            <FiEdit2 className="inline mr-1" /> Edit
                          </button>
                          <button 
                            onClick={() => deleteEvent(event.id)}
                            className="text-sm px-3 py-1 bg-[#fde8e8] text-[#dc3545] rounded-lg hover:bg-[#fcd5d5]"
                          >
                            <FiTrash2 className="inline mr-1" /> Hapus
                          </button>
                        </div>
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
              <FiCalendar className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Tidak ada event yang ditemukan
            </h3>
            <p className="text-gray-500">
              {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                ? 'Coba ubah pencarian atau filter Anda'
                : 'Belum ada event yang terdaftar'}
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
  )
}

export default Events