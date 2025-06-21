import { useState } from 'react'
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiCheckCircle, 
  FiAlertCircle,
  FiCalendar,
  FiKey,
  FiSave,
  FiLoader,
  FiSettings,
  FiCreditCard,
  FiBell
} from 'react-icons/fi'

const Profile = () => {
  const [user, setUser] = useState({
    id: 1,
    name: 'Admin Perpus',
    email: 'admin@perpustakaan.com',
    role: 'Administrator',
    avatar: 'AP',
    joinDate: '15 Januari 2023',
    lastLogin: 'Hari ini, 14:30',
    membership: 'Premium'
  })

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    confirmPassword: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [activeTab, setActiveTab] = useState('profile')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setUser(prev => ({ ...prev, ...formData }))
    setMessage({ text: 'Profil berhasil diperbarui!', type: 'success' })
    setIsLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <div className="flex flex-col items-center py-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#579DA5] to-[#4a8b92] text-white text-3xl font-bold flex items-center justify-center mb-4">
                {user.avatar}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center">{user.name}</h2>
              <p className="text-sm text-[#579DA5] bg-[#e6f7f9] px-3 py-1 rounded-full mt-2">
                {user.role}
              </p>
            </div>
          </div>

          <nav className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === 'profile' 
                      ? 'bg-[#e6f7f9] text-[#579DA5]' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiUser className="mr-3 text-lg" />
                  Profil Saya
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === 'security' 
                      ? 'bg-[#e6f7f9] text-[#579DA5]' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiLock className="mr-3 text-lg" />
                  Keamanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                    activeTab === 'notifications' 
                      ? 'bg-[#e6f7f9] text-[#579DA5]' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <FiBell className="mr-3 text-lg" />
                  Notifikasi
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Pengaturan Akun</h1>
            <p className="text-gray-500">Kelola informasi profil dan preferensi akun Anda</p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl flex items-start ${
              message.type === 'error' 
                ? 'bg-red-50 text-red-700 border border-red-100' 
                : 'bg-[#e6f7f9] text-[#1a6d7a] border border-[#c1e7eb]'
            }`}>
              {message.type === 'error' ? (
                <FiAlertCircle className="mt-0.5 mr-3 flex-shrink-0 text-lg" />
              ) : (
                <FiCheckCircle className="mt-0.5 mr-3 flex-shrink-0 text-lg text-[#579DA5]" />
              )}
              <div className="text-sm">{message.text}</div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Informasi Profil</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        placeholder="Masukkan email"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center px-5 py-2.5 rounded-lg text-white font-medium ${
                      isLoading ? 'bg-[#7ab2b8]' : 'bg-[#579DA5] hover:bg-[#4a8b92]'
                    } transition-colors`}
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Simpan Perubahan
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Keamanan Akun</h2>
                <p className="text-sm text-gray-500 mt-1">Kelola kata sandi dan keamanan akun Anda</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi Baru</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiKey className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        placeholder="Minimal 8 karakter"
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Gunakan kombinasi huruf, angka, dan simbol</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Kata Sandi</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiKey className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        placeholder="Ketik ulang kata sandi"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center px-5 py-2.5 rounded-lg text-white font-medium ${
                      isLoading ? 'bg-[#7ab2b8]' : 'bg-[#579DA5] hover:bg-[#4a8b92]'
                    } transition-colors`}
                  >
                    {isLoading ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Memperbarui...
                      </>
                    ) : (
                      <>
                        <FiLock className="mr-2" />
                        Perbarui Kata Sandi
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Account Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail Akun</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">ID Anggota</p>
                  <p className="font-medium">PU-{user.id.toString().padStart(4, '0')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status Keanggotaan</p>
                  <p className="font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#579DA5] mr-2"></span>
                    {user.membership}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bergabung Pada</p>
                  <p className="font-medium flex items-center">
                    <FiCalendar className="mr-2 text-gray-400" />
                    {user.joinDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terakhir</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Login Terakhir</p>
                  <p className="font-medium">{user.lastLogin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Perangkat</p>
                  <p className="font-medium">Chrome, Windows 10</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <p className="font-medium">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile