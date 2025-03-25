import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import {
    FaUsers,
    FaUserPlus,
    FaUserEdit,
    FaUserCog,
    FaSearch,
    FaBars,
    FaTimes,
    FaUserShield,
    FaImage
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Sample user data - in a real app, this would come from an API
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Editor", status: "Inactive" },
        { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "User", status: "Active" },
    ]);

    // Get admin name from localStorage
    const adminName = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).name || "Admin"
        : "Admin";

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-blue-800 to-indigo-900 text-white z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-all duration-300 ease-in-out shadow-xl`}
            >
                <Sidebar />
            </div>

            {/* Menu Button - Adjusted for all screen sizes */}
            <button
                className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-lg transition-all duration-300 ${sidebarOpen
                    ? "bg-white text-indigo-600"
                    : "bg-indigo-600 text-white"
                    } md:left-64 md:ml-4 md:top-4`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Main Content */}
            <div className="md:ml-72 transition-all duration-300 ease-in-out">
                {/* Header */}
                <div className="bg-white shadow-md p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                            <p className="text-gray-500">Welcome back, {adminName}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-4 md:mt-0 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* User Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4">
                            <FaUsers className="text-white text-3xl" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800">Total Users</h3>
                            <p className="text-3xl font-semibold text-blue-500 mt-2">{users.length}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="bg-gradient-to-r from-green-400 to-green-500 p-4">
                            <FaUserShield className="text-white text-3xl" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800">Active Users</h3>
                            <p className="text-3xl font-semibold text-green-500 mt-2">
                                {users.filter(user => user.status === "Active").length}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
                            <FaUserCog className="text-white text-3xl" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800">Admins</h3>
                            <p className="text-3xl font-semibold text-yellow-500 mt-2">
                                {users.filter(user => user.role === "Admin").length}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                        <div className="bg-gradient-to-r from-purple-400 to-purple-500 p-4">
                            <FaUserEdit className="text-white text-3xl" />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800">Recent Edits</h3>
                            <p className="text-3xl font-semibold text-purple-500 mt-2">7</p>
                        </div>
                    </div>
                </div>

                {/* User Management Tools */}
                <div className="mx-6 mb-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">User Management</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                </div>
                                <button
                                    onClick={() => navigate("/add-user")}
                                    className="bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center justify-center hover:bg-blue-700 transition-colors"
                                >
                                    <FaUserPlus className="mr-2" /> Add User
                                </button>
                                <button
                                    onClick={() => navigate("/home-content")}
                                    className="bg-green-600 text-white rounded-lg px-4 py-2 flex items-center justify-center hover:bg-green-700 transition-colors ml-2"
                                >
                                    <FaImage className="mr-2" /> Update Home Content
                                </button>
                            </div>
                        </div>

                        {/* User Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">ID</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Role</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                        <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-800">{user.id}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">{user.email}</td>
                                            <td className="py-3 px-4 text-sm text-gray-800">
                                                <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'Admin' ? 'bg-yellow-100 text-yellow-800' :
                                                    user.role === 'Editor' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-800">
                                                <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-800">
                                                <div className="flex space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <FaUserEdit size={16} />
                                                    </button>
                                                    <button className="text-red-600 hover:text-red-800">
                                                        <FaTimes size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6">
                            <p className="text-sm text-gray-600">Showing {filteredUsers.length} of {users.length} users</p>
                            <div className="flex space-x-1">
                                <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">Previous</button>
                                <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                                <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">2</button>
                                <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">3</button>
                                <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;