import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiFileText, 
  FiBook, 
  FiEdit, 
  FiUser, 
  FiCalendar,
  FiSettings,
  FiPieChart,
  FiBarChart2,
  FiServer
} from 'react-icons/fi'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { path: "/admin", icon: <FiHome />, text: "Dashboard" },
    { path: "/admin/members", icon: <FiUsers />, text: "Kelola Anggota" },
    { path: "/admin/Approves", icon: <FiFileText />, text: "Kelola Persetujuan" },
    { path: "/admin/books", icon: <FiBook />, text: "Kelola Buku" },
    { path: "/admin/profile", icon: <FiUser />, text: "Profil" },
  ]

  return (
    <div className={`fixed md:relative z-20 inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out bg-[#579DA5] w-64 flex flex-col h-full`}>
      <div className="flex items-center justify-center h-16 px-4 border-b border-[#47818A]">
        <h1 className="text-xl font-bold text-white">SIPerpus Admin</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            if (item.type === "divider") {
              return (
                <li key={index} className="pt-4">
                  <p className="text-xs font-semibold text-[#E0F7FA] uppercase tracking-wider px-3">
                    {item.text}
                  </p>
                </li>
              )
            }
            
            return (
              <li key={index}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg transition-all duration-200 ${isActive ? 'bg-[#47818A] text-white shadow-md' : 'text-[#E0F7FA] hover:bg-[#47818A] hover:text-white'}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.text}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-[#47818A]">
        <div className="text-xs text-[#E0F7FA]">© {new Date().getFullYear()} SIPerpus</div>
      </div>
    </div>
  )
}

export default Sidebar