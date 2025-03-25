import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaUsers, 
  FaUserPlus, 
  FaUserEdit, 
  FaUserCog,
  FaUserShield,
  FaUserTimes,
  FaUserCheck,
  FaHome,
  FaCog,
  FaSignOutAlt,
  FaClipboardList
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  
  // User management menu items
  const menuItems = [
    { path: "/dashboard", icon: <FaHome size={18} />, label: "Dashboard" },
    { path: "/users", icon: <FaUsers size={18} />, label: "All Users" },
    { path: "/users/add", icon: <FaUserPlus size={18} />, label: "Add User" },
    { path: "/users/roles", icon: <FaUserShield size={18} />, label: "User Roles" },
    { path: "/users/permissions", icon: <FaUserCog size={18} />, label: "Permissions" },
    { path: "/users/active", icon: <FaUserCheck size={18} />, label: "Active Users" },
    { path: "/users/inactive", icon: <FaUserTimes size={18} />, label: "Inactive Users" },
    { path: "/users/logs", icon: <FaClipboardList size={18} />, label: "User Logs" },
    { path: "/settings", icon: <FaCog size={18} />, label: "Settings" },
  ];

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Logo Area */}
      <div className="flex items-center justify-center p-6 border-b border-blue-700">
        <div className="bg-white rounded-full h-12 w-12 flex items-center justify-center mr-3">
          <FaUserShield className="text-indigo-800 text-xl" />
        </div>
        <h2 className="text-xl font-bold text-white">User Management</h2>
      </div>

      {/* Admin Profile */}
      <div className="mt-6 flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
          <span className="text-indigo-800 font-bold text-xl">
            {localStorage.getItem("user") 
              ? (JSON.parse(localStorage.getItem("user")).name || "A").charAt(0)
              : "A"}
          </span>
        </div>
        <h3 className="mt-2 text-white font-medium">
          {localStorage.getItem("user") 
            ? JSON.parse(localStorage.getItem("user")).name || "Admin"
            : "Admin"}
        </h3>
        <p className="text-blue-200 text-sm">System Administrator</p>
      </div>

      {/* User Management Navigation */}
      <nav className="mt-8 flex-1">
        <div className="px-4 mb-2">
          <span className="text-xs uppercase text-blue-300 font-semibold tracking-wider">User Management</span>
        </div>
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${location.pathname === item.path 
                    ? "bg-blue-700 text-white"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"}`}
              >
                {item.icon}
                <span>{item.label}</span>
                {location.pathname === item.path && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto mb-6 px-4">
        <Link to="/login" className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-blue-100 hover:bg-red-700 hover:text-white">
          <FaSignOutAlt size={18} />
          <span>Logout</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="p-4 text-center border-t border-blue-700">
        <p className="text-blue-200 text-xs">© 2025 User Management System v1.0</p>
      </div>
    </div>
  );
};

export default Sidebar;