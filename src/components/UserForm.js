import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { 
    FaBars, 
    FaTimes, 
    FaUserPlus, 
    FaArrowLeft 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "User",
        status: "Active"
    });

    // Get admin name from localStorage
    const adminName = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).name || "Admin"
        : "Admin";

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally send the data to an API
        console.log("Form submitted:", formData);
        
        // Redirect back to dashboard
        navigate("/dashboard");
    };

    // Return to dashboard without saving
    const handleCancel = () => {
        navigate("/dashboard");
    };

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
                className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-blue-800 to-indigo-900 text-white z-50 transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 transition-all duration-300 ease-in-out shadow-xl`}
            >
                <Sidebar />
            </div>

            {/* Menu Button */}
            <button
                className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-lg transition-all duration-300 ${
                    sidebarOpen 
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
                            <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
                            <p className="text-gray-500">Welcome back, {adminName}</p>
                        </div>
                        <button
                            onClick={handleCancel}
                            className="mt-4 md:mt-0 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-md flex items-center"
                        >
                            <FaArrowLeft className="mr-2" /> Back to Dashboard
                        </button>
                    </div>
                </div>

                {/* User Form */}
                <div className="mx-6 my-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="User">User</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center"
                                >
                                    <FaUserPlus className="mr-2" /> Add User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;