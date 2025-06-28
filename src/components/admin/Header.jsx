import { FiMenu, FiBell, FiSearch, FiUser, FiSettings, FiHelpCircle } from 'react-icons/fi'

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-[#579DA5] text-white h-16 flex items-center px-4 md:px-6 shadow-sm sticky top-0 z-10">
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="mr-4 text-white hover:text-[#E0F7FA] md:hidden transition-colors duration-200"
      >
        <FiMenu size={20} />
      </button>
      
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-[#E0F7FA]" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-[#47818A] rounded-md leading-5 bg-white placeholder-[#8FB5BA] focus:outline-none focus:ring-2 focus:ring-[#E0F7FA] focus:border-[#E0F7FA] sm:text-sm transition-all duration-200"
          placeholder="Search..."
        />
      </div>
      
      <div className="ml-4 flex items-center space-x-4">

        
        <div className="ml-2 flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#47818A] flex items-center justify-center text-white font-medium shadow-sm">
            <FiUser size={16} />
          </div>
          <span className="ml-2 text-sm font-medium text-white hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  )
}
export default Header