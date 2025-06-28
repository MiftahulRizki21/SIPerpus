import { useState, useEffect } from 'react'
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
  FiBell,
  FiPhone
} from 'react-icons/fi'
import { supabase } from "../../services/supaBase";

const Profile = () => {
  const [user, setUser] = useState({
    id: '',
    full_name: '',
    role: '',
    gender: '',
    birthdate: '',
    address: '',
    phone_number: '',
    created_at: ''
  })

  const [formData, setFormData] = useState({
    full_name: '',
    gender: '',
    birthdate: '',
    address: '',
    phone_number: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [activeTab, setActiveTab] = useState('profile')

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        
        // Get current authenticated user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
        
        if (authError) throw authError
        if (!authUser) throw new Error('User not authenticated')

        // Fetch user profile from user_profiles table
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (profileError) throw profileError

        setUser(profileData)
        setFormData({
          full_name: profileData.full_name,
          gender: profileData.gender,
          birthdate: profileData.birthdate,
          address: profileData.address,
          phone_number: profileData.phone_number
        })

      } catch (error) {
        console.error('Error fetching user data:', error)
        setMessage({ 
          text: 'Gagal memuat data profil', 
          type: 'error' 
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Update user profile in Supabase
      const { data, error } = await supabase
        .from('user_profiles')
        .update(formData)
        .eq('id', user.id)
        .select()

      if (error) throw error

      setUser(prev => ({ ...prev, ...data[0] }))
      setMessage({ 
        text: 'Profil berhasil diperbarui!', 
        type: 'success' 
      })

    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ 
        text: 'Gagal memperbarui profil', 
        type: 'error' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Password dan konfirmasi password tidak sama')
      }

      // Update password in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      })

      if (error) throw error

      setMessage({ 
        text: 'Password berhasil diperbarui!', 
        type: 'success' 
      })
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }))

    } catch (error) {
      console.error('Error updating password:', error)
      setMessage({ 
        text: error.message || 'Gagal memperbarui password', 
        type: 'error' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <div className="flex flex-col items-center py-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#579DA5] to-[#4a8b92] text-white text-3xl font-bold flex items-center justify-center mb-4">
                {user.full_name ? user.full_name.charAt(0) : 'A'}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center">{user.full_name || 'Loading...'}</h2>
              <p className="text-sm text-[#579DA5] bg-[#e6f7f9] px-3 py-1 rounded-full mt-2 capitalize">
                {user.role || 'admin'}
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
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="male">Laki-laki</option>
                      <option value="female">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiCalendar className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        placeholder="Masukkan nomor telepon"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                      rows="3"
                      placeholder="Masukkan alamat lengkap"
                      required
                    />
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
              
              <form onSubmit={handlePasswordUpdate} className="p-6">
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
                        value={formData.password || ''}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        placeholder="Minimal 8 karakter"
                        required
                        minLength="8"
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
                        value={formData.confirmPassword || ''}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#579DA5] focus:border-[#579DA5]"
                        placeholder="Ketik ulang kata sandi"
                        required
                        minLength="8"
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
                  <p className="text-sm text-gray-500">ID Pengguna</p>
                  <p className="font-medium">{user.id || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium capitalize">{user.role || 'admin'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bergabung Pada</p>
                  <p className="font-medium flex items-center">
                    <FiCalendar className="mr-2 text-gray-400" />
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : '-'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Pribadi</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Jenis Kelamin</p>
                  <p className="font-medium capitalize">
                    {user.gender === 'male' ? 'Laki-laki' : 
                     user.gender === 'female' ? 'Perempuan' : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Lahir</p>
                  <p className="font-medium">
                    {user.birthdate ? new Date(user.birthdate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nomor Telepon</p>
                  <p className="font-medium">{user.phone_number || '-'}</p>
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