import Sidebar from "/src/components/admin/Sidebar.jsx";
import Header from "/src/components/admin/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();
  const isErrorPage = location.pathname.startsWith('/error-');

  return (
    <div className="bg-gray-100 min-h-screen flex"> 
      {!isErrorPage && (
        <div className="flex flex-row flex-1">
          <Sidebar/>
          <div className="flex-1 p-4">
            <Header/>
            <Outlet/>
          </div>
        </div>
      )}
      
      {isErrorPage && (
        <div className="flex-1">
          <Outlet/>
        </div>
      )}
    </div>  
  );
}