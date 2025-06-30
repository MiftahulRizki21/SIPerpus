import { useState, useEffect } from 'react';
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
} from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { supabase } from "../../services/supaBase";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    start_time: '',
    end_time: '',
    status: 'pending',
    image_url: ''
  });
  const eventsPerPage = 5;

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('start_time', { ascending: false });

        if (error) throw error;
        
        if (!data || data.length === 0) {
          setEvents([]);
          return;
        }

        const transformedEvents = data.map(event => ({
          id: event.id,
          title: event.title || 'Event Tanpa Judul',
          description: event.description || 'Tidak ada deskripsi',
          location: event.location || 'Lokasi belum ditentukan',
          start_time: event.start_time || new Date().toISOString(),
          end_time: event.end_time || new Date(Date.now() + 2*60*60*1000).toISOString(),
          created_by: event.created_by || 'admin',
          status: event.status || 'pending',
          image_url: event.image_url || getEventImage(event.title),
          date: event.start_time ? event.start_time.split('T')[0] : format(new Date(), 'yyyy-MM-dd'),
          time: event.start_time && event.end_time 
            ? `${format(parseISO(event.start_time), 'HH:mm')} - ${format(parseISO(event.end_time), 'HH:mm')}`
            : '00:00 - 00:00',
          participants: 0,
          maxParticipants: 50
        }));

        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error.message);
        alert('Gagal memuat data event. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Helper function to get event image
  const getEventImage = (title) => {
    if (!title) return 'https://source.unsplash.com/random/400x200/?event';
    
    const keywords = ['workshop', 'seminar', 'training', 'conference', 'meeting'];
    const match = keywords.find(keyword => title.toLowerCase().includes(keyword));
    return `https://source.unsplash.com/random/400x200/?${match || 'event'}`;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle date/time changes
  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: new Date(value).toISOString()
    }));
  };

  // Submit new event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Basic validation
      if (!newEvent.title || !newEvent.start_time || !newEvent.end_time) {
        throw new Error('Judul, waktu mulai, dan waktu selesai harus diisi');
      }

      const { data, error } = await supabase
        .from('events')
        .insert([{
          title: newEvent.title,
          description: newEvent.description,
          location: newEvent.location,
          start_time: newEvent.start_time,
          end_time: newEvent.end_time,
          status: newEvent.status,
          image_url: newEvent.image_url || getEventImage(newEvent.title),
          created_by: 'admin'
        }])
        .select();

      if (error) throw error;

      // Add the new event to state
      const createdEvent = data[0];
      setEvents(prev => [
        {
          ...createdEvent,
          date: createdEvent.start_time.split('T')[0],
          time: `${format(parseISO(createdEvent.start_time), 'HH:mm')} - ${format(parseISO(createdEvent.end_time), 'HH:mm')}`,
          participants: 0,
          maxParticipants: 50
        },
        ...prev
      ]);

      // Close modal and reset form
      setIsModalOpen(false);
      setNewEvent({
        title: '',
        description: '',
        location: '',
        start_time: '',
        end_time: '',
        status: 'pending',
        image_url: ''
      });

    } catch (error) {
      console.error('Error creating event:', error.message);
      alert(`Gagal membuat event: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update event status
  const updateEventStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setEvents(events.map(event => 
        event.id === id ? { ...event, status } : event
      ));
    } catch (error) {
      console.error('Error updating event status:', error.message);
      alert('Gagal memperbarui status event');
    }
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    if (!event) return false;
    
    const matchesSearch = 
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      event.status?.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Delete event
  const deleteEvent = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus event ini?')) {
      try {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setEvents(events.filter(event => event.id !== id));
      } catch (error) {
        console.error('Error deleting event:', error.message);
        alert('Gagal menghapus event');
      }
    }
  };

  // Status styling
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'approved': 
        return { 
          bg: 'bg-[#e6f9f0]', 
          text: 'text-[#1a7a4a]',
          icon: <FiCheckCircle className="text-[#28a745]" />
        };
      case 'pending': 
        return { 
          bg: 'bg-[#fff8e6]', 
          text: 'text-[#8a6d3b]',
          icon: <FiAlertTriangle className="text-[#ffc107]" />
        };
      case 'rejected': 
        return { 
          bg: 'bg-[#fde8e8]', 
          text: 'text-[#a94442]',
          icon: <FiXCircle className="text-[#dc3545]" />
        };
      default: 
        return { 
          bg: 'bg-gray-50', 
          text: 'text-gray-800',
          icon: null
        };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'EEEE, dd MMMM yyyy');
    } catch {
      return 'Tanggal tidak valid';
    }
  };

  if (loading && !isModalOpen) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#579DA5]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[#e6f7f9] text-[#579DA5]">
            <FiCalendar size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kelola Persetujuan</h1>
            <p className="text-gray-500">Kelola permintaan persetujuan upload</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari persetujuan..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#4a8b92] transition-colors"
          >
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
              <p className="text-sm font-medium text-gray-500">Total Persetujuan</p>
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
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-semibold text-[#28a745]">
                {events.filter(e => e.status === 'approved').length}
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
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-semibold text-[#ffc107]">
                {events.filter(e => e.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#fff8e6] text-[#ffc107]">
              <FiAlertTriangle size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-semibold text-[#dc3545]">
                {events.filter(e => e.status === 'rejected').length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-[#fde8e8] text-[#dc3545]">
              <FiXCircle size={20} />
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
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
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
              <option>Judul (A-Z)</option>
            </select>
          </div>
        </div>
        
        {currentEvents.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {currentEvents.map((event) => {
              const statusColor = getStatusColor(event.status);
              return (
                <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0 w-full md:w-48 h-32 overflow-hidden rounded-lg">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h3 className="text-lg font-medium text-gray-800">{event.title}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColor.bg} ${statusColor.text}`}>
                          {statusColor.icon}
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                      
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiCalendar className="mr-2 text-gray-400" />
                          {formatDate(event.start_time)}
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
                          {event.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => updateEventStatus(event.id, 'approved')}
                                className="text-sm px-3 py-1 bg-[#e6f9f0] text-[#1a7a4a] rounded-lg hover:bg-[#d4f3e3] flex items-center"
                              >
                                <FiCheckCircle className="mr-1" /> Approve
                              </button>
                              <button 
                                onClick={() => updateEventStatus(event.id, 'rejected')}
                                className="text-sm px-3 py-1 bg-[#fde8e8] text-[#a94442] rounded-lg hover:bg-[#fcd5d5] flex items-center"
                              >
                                <FiXCircle className="mr-1" /> Reject
                              </button>
                            </>
                          )}
                          <button 
                            className="text-sm px-3 py-1 bg-[#e6f7f9] text-[#579DA5] rounded-lg hover:bg-[#d1edf1]"
                          >
                            Detail
                          </button>
                          <button 
                            onClick={() => deleteEvent(event.id)}
                            className="text-sm px-3 py-1 bg-[#fde8e8] text-[#dc3545] rounded-lg hover:bg-[#fcd5d5] flex items-center"
                          >
                            <FiTrash2 className="mr-1" /> Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
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
              {searchTerm || filterStatus !== 'all'
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

      {/* Add Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Tambah Event Baru</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiXCircle size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Event*</label>
                    <input
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#579DA5] focus:border-[#579DA5]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={newEvent.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#579DA5] focus:border-[#579DA5]"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#579DA5] focus:border-[#579DA5]"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                    <input
                      type="text"
                      name="location"
                      value={newEvent.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#579DA5] focus:border-[#579DA5]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                    <input
                      type="text"
                      name="image_url"
                      value={newEvent.image_url}
                      onChange={handleInputChange}
                      placeholder="Biarkan kosong untuk gambar acak"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#579DA5] focus:border-[#579DA5]"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Mulai*</label>
                    <input
                      type="datetime-local"
                      name="start_time"
                      onChange={handleDateTimeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#579DA5] focus:border-[#579DA5]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Waktu Selesai*</label>
                    <input
                      type="datetime-local"
                      name="end_time"
                      onChange={handleDateTimeChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#579DA5] focus:border-[#579DA5]"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#579DA5] text-white rounded-md hover:bg-[#4a8b92]"
                    disabled={loading}
                  >
                    {loading ? 'Menyimpan...' : 'Simpan Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;