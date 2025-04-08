import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import api from "../services/api";
import {
  FaUsers,
  FaUserPlus,
  FaUserCog,
  FaUserShield,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUser();
      if (Array.isArray(data.users)) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    try {
      await api.updateUserStatus({ id: userId, status: newStatus });
      fetchUsers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-72 bg-indigo-800 text-white z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 shadow-lg`}
      >
        <Sidebar />
      </div>

      {/* Toggle Button */}
      <button
        className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-md md:hidden ${sidebarOpen ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"
          }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Main Content */}
      <div className="md:ml-72 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaUsers />,
              label: "Total Users",
              count: users.length,
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: <FaUserShield />,
              label: "Active Users",
              count: users.filter((u) => u.status).length,
              color: "from-green-500 to-green-600",
            },
            {
              icon: <FaUserCog />,
              label: "Admins",
              count: users.filter((u) => u.role === "Admin").length,
              color: "from-yellow-500 to-yellow-600",
            },
            {
              icon: <FaUserPlus />,
              label: "Recent Edits",
              count: 7,
              color: "from-purple-500 to-purple-600",
            },
          ].map(({ icon, label, count, color }, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition`}
            >
              <div className={`p-4 text-white bg-gradient-to-r ${color} flex justify-between items-center`}>
                <div className="text-3xl">{icon}</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{label}</h3>
                <p className="text-2xl font-bold mt-2">{count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* User Management Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold">User Management</h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => navigate("/add-user")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                + Add User
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-t">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Mobile</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.mobile}</td>
                    <td className={`px-4 py-2 font-medium ${user.status ? "text-green-600" : "text-red-500"}`}>
                      {user.status ? "Active" : "Inactive"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleStatusToggle(user._id, user.status)}
                        className={`px-3 py-1 rounded-md text-white text-sm ${user.status ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                      >
                        {user.status ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
