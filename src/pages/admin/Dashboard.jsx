import Card from '/src/components/admin/Card'
import { 
  FiUsers, 
  FiBook, 
  FiFileText, 
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiPlus
} from 'react-icons/fi'

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2C3E50]">Dashboard</h1>
          <p className="text-[#579DA5]">Overview of your community</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          title="Total Members" 
          value="124" 
          change="+12 this month"
          icon={<FiUsers size={24} className="text-white" />} 
          color="bg-[#579DA5]" 
          gradient="from-[#579DA5] to-[#47818A]"
        />
        <Card 
          title="Total Books" 
          value="356" 
          change="+24 this month"
          icon={<FiBook size={24} className="text-white" />} 
          color="bg-[#67B3A0]" 
          gradient="from-[#67B3A0] to-[#579A8A]"
        />
        <Card 
          title="Pending Articles" 
          value="12" 
          change="+3 today"
          icon={<FiFileText size={24} className="text-white" />} 
          color="bg-[#F2C94C]" 
          gradient="from-[#F2C94C] to-[#E2B93B]"
        />
        <Card 
          title="Upcoming Events" 
          value="5" 
          change="2 happening today"
          icon={<FiCalendar size={24} className="text-white" />} 
          color="bg-[#9B51E0]" 
          gradient="from-[#9B51E0] to-[#8B40D0]"
        />
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E0F2F1] p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#2C3E50]">Recent Activity</h2>
          <button className="text-sm text-[#579DA5] hover:text-[#47818A] flex items-center">
            View all <FiChevronRight className="ml-1" />
          </button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start p-4 hover:bg-[#F5FBFB] rounded-lg transition-colors">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 
                ${item === 1 ? 'bg-[#E0F7FA] text-[#579DA5]' : 
                  item === 2 ? 'bg-[#EDE7F6] text-[#9B51E0]' : 
                  'bg-[#E8F5E9] text-[#67B3A0]'}`}>
                <span className="font-medium">U{item}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2C3E50]">
                  <span className="font-semibold">User {item}</span> submitted a new article
                </p>
                <p className="text-xs text-[#579DA5] mt-1 flex items-center">
                  <FiClock className="mr-1" /> 2 hours ago
                </p>
              </div>
              <button className="text-[#579DA5] hover:text-[#47818A]">
                <FiChevronRight />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E0F2F1] p-6">
          <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Community Growth</h2>
          <div className="h-64 bg-[#F5FBFB] rounded-lg flex items-center justify-center text-[#579DA5]">
            [Chart placeholder - would show member growth over time]
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E0F2F1] p-6">
          <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-[#E0F2F1] rounded-lg hover:border-[#579DA5] hover:bg-[#E0F7FA] transition-colors flex flex-col items-center">
              <FiUsers className="text-[#579DA5] mb-2" size={20} />
              <span className="text-sm font-medium">Add Member</span>
            </button>
            <button className="p-4 border border-[#E0F2F1] rounded-lg hover:border-[#67B3A0] hover:bg-[#E8F5E9] transition-colors flex flex-col items-center">
              <FiBook className="text-[#67B3A0] mb-2" size={20} />
              <span className="text-sm font-medium">Add Book</span>
            </button>
            <button className="p-4 border border-[#E0F2F1] rounded-lg hover:border-[#F2C94C] hover:bg-[#FFF8E1] transition-colors flex flex-col items-center">
              <FiFileText className="text-[#F2C94C] mb-2" size={20} />
              <span className="text-sm font-medium">Review Articles</span>
            </button>
            <button className="p-4 border border-[#E0F2F1] rounded-lg hover:border-[#9B51E0] hover:bg-[#F3E5F5] transition-colors flex flex-col items-center">
              <FiCalendar className="text-[#9B51E0] mb-2" size={20} />
              <span className="text-sm font-medium">Schedule Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard