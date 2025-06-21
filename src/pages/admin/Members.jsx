import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiFilter } from 'react-icons/fi'
import { useState } from 'react'

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2023-01-15', status: 'Aktif', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2023-02-20', status: 'Aktif', avatar: 'JS' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joinDate: '2023-03-10', status: 'Nonaktif', avatar: 'BJ' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', joinDate: '2023-04-05', status: 'Aktif', avatar: 'AW' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', joinDate: '2023-05-12', status: 'Nonaktif', avatar: 'CB' },
  ]

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
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
          <button className="flex items-center justify-center px-4 py-2 bg-[#579DA5] text-white rounded-lg hover:bg-[#47818A] transition-colors">
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
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#579DA5] uppercase tracking-wider">
                  Bergabung
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#579DA5] uppercase tracking-wider">
                  Status
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
                        {member.avatar}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[#2C3E50]">{member.name}</div>
                        <div className="text-sm text-[#579DA5]">ID: {member.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#579DA5]">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#579DA5]">
                    {new Date(member.joinDate).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${member.status === 'Aktif' 
                        ? 'bg-[#E8F5E9] text-[#67B3A0]' 
                        : 'bg-[#FFEBEE] text-[#EF5350]'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-[#579DA5] hover:text-[#47818A] mr-4 p-1 rounded hover:bg-[#E0F7FA]">
                      <FiEdit2 className="inline mr-1" /> Edit
                    </button>
                    <button className="text-[#EF5350] hover:text-[#D32F2F] p-1 rounded hover:bg-[#FFEBEE]">
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