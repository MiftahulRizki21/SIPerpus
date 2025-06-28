import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiFilter, FiX, FiSave } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { supabase } from "../../services/supaBase";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState(null)
  const [formData, setFormData] = useState({
    full_name: '',
    role: '',
    gender: '',
    birthdate: '',
    address: '',
    phone_number: ''
  })

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      setMembers(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredMembers = members.filter(member =>
    member.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.phone_number && member.phone_number.includes(searchTerm))
  )

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddMember = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([formData])
        .select()
      
      if (error) throw error
      
      setMembers([data[0], ...members])
      setIsAddModalOpen(false)
      setFormData({
        full_name: '',
        role: '',
        gender: '',
        birthdate: '',
        address: '',
        phone_number: ''
      })
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditMember = async (e) => {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(formData)
        .eq('id', currentMember.id)
      
      if (error) throw error
      
      setMembers(members.map(member => 
        member.id === currentMember.id ? { ...member, ...formData } : member
      ))
      setIsEditModalOpen(false)
      setCurrentMember(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus anggota ini?')) return
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setMembers(members.filter(member => member.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const openEditModal = (member) => {
    setCurrentMember(member)
    setFormData({
      full_name: member.full_name,
      role: member.role,
      gender: member.gender,
      birthdate: member.birthdate,
      address: member.address,
      phone_number: member.phone_number
    })
    setIsEditModalOpen(true)
  }

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>

  return (
    <div className="p-6">
      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-[#2C3E50]">Tambah Anggota Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                  required
                >
                  <option value="">Pilih Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Alamat</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Nomor Telepon</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-[#2C3E50] hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#47818A]"
                >
                  <FiSave className="inline mr-1" /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {isEditModalOpen && currentMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-[#2C3E50]">Edit Anggota</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={20} />
              </button>
            </div>
            <form onSubmit={handleEditMember} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                  required
                >
                  <option value="">Pilih Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Alamat</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2C3E50] mb-1">Nomor Telepon</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5]"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-[#2C3E50] hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#47818A]"
                >
                  <FiSave className="inline mr-1" /> Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C3E50]">Kelola Anggota</h1>
          <p className="text-[#579DA5]">Daftar seluruh anggota komunitas</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#579DA5]" />
            </div>
            <input
              type="text"
              placeholder="Cari anggota..."
              className="pl-10 pr-4 py-2 border border-[#E0F2F1] rounded-lg focus:ring-[#579DA5] focus:border-[#579DA5] w-full bg-[#F5FBFB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="flex items-center justify-center px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#47818A] transition-colors"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FiPlus className="mr-2" />
            Tambah Anggota
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#E0F2F1] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#E0F2F1]">
          <div className="flex items-center space-x-2">
            <FiFilter className="text-[#579DA5]" />
            <span className="text-sm text-[#579DA5]">Filter: </span>
            <button className="text-sm px-3 py-1 bg-[#E0F7FA] text-[#579DA5] rounded-full">Semua</button>
            <button className="text-sm px-3 py-1 hover:bg-[#E0F7FA] text-[#579DA5] rounded-full">Aktif</button>
            <button className="text-sm px-3 py-1 hover:bg-[#E0F7FA] text-[#579DA5] rounded-full">Nonaktif</button>
          </div>
          <div className="text-sm text-[#579DA5]">
            {filteredMembers.length} dari {members.length} anggota
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E0F2F1]">
            <thead className="bg-[#F5FBFB]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#579DA5] uppercase tracking-wider">
                  Anggota
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#579DA5] uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#579DA5] uppercase tracking-wider">
                  Bergabung
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#579DA5] uppercase tracking-wider">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#579DA5] uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E0F2F1]">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-[#F5FBFB] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E0F7FA] flex items-center justify-center text-[#579DA5] font-medium">
                        {member.full_name?.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#2C3E50]">{member.full_name}</div>
                        <div className="text-sm text-[#579DA5]">ID: {member.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#579DA5]">
                    {member.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#579DA5]">
                    {new Date(member.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#579DA5]">
                    {member.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-[#579DA5] hover:text-[#47818A] mr-4 p-1 rounded hover:bg-[#E0F7FA]"
                      onClick={() => openEditModal(member)}
                    >
                      <FiEdit2 className="inline mr-1" /> Edit
                    </button>
                    <button 
                      className="text-[#EF5350] hover:text-[#D32F2F] p-1 rounded hover:bg-[#FFEBEE]"
                      onClick={() => handleDelete(member.id)}
                    >
                      <FiTrash2 className="inline mr-1" /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#579DA5] mb-2">Tidak ada anggota yang ditemukan</div>
            <button 
              className="text-[#579DA5] hover:text-[#47818A] font-medium"
              onClick={() => setSearchTerm('')}
            >
              Reset pencarian
            </button>
          </div>
        )}
        
        <div className="px-6 py-4 border-t border-[#E0F2F1] flex items-center justify-between">
          <div className="text-sm text-[#579DA5]">
            Menampilkan <span className="font-medium">1-{filteredMembers.length}</span> dari <span className="font-medium">{filteredMembers.length}</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-[#E0F2F1] rounded-md text-sm font-medium text-[#579DA5] bg-white hover:bg-[#E0F7FA]">
              Sebelumnya
            </button>
            <button className="px-3 py-1 border border-[#E0F2F1] rounded-md text-sm font-medium text-[#579DA5] bg-white hover:bg-[#E0F7FA]">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Members