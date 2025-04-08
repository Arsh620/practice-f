import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars, FaTimes, FaUserPlus, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Import API functions

const UserForm = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "User",
        status: "Active"
    });

    const adminName = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).name || "Admin"
        : "Admin";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await api.register(formData); // API call
            if (response.status == true) {
                setMessage("Registration successful! 🎉");
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    role: "User",
                    status: "Active"
                });

                // Redirect after success (optional)
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            } else {
                setMessage("Error: " + (response.message || "Registration failed"));
            }
        } catch (error) {
            setMessage("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-blue-800 to-indigo-900 text-white z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-all duration-300 ease-in-out shadow-xl`}
            >
                <Sidebar />
            </div>

            <button
                className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-lg transition-all duration-300 ${sidebarOpen
                        ? "bg-white text-indigo-600"
                        : "bg-indigo-600 text-white"
                    } md:left-64 md:ml-4 md:top-4`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            <div className="md:ml-72 transition-all duration-300 ease-in-out">
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

                <div className="mx-6 my-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <form onSubmit={handleRegister}>
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
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mobile
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile || ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Allow only digits and limit to 10 characters
                                            if (/^\d{0,10}$/.test(value)) {
                                                handleChange(e);
                                            }
                                        }}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter mobile number"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter password"
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
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="User">User</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center"
                                    disabled={loading}
                                >
                                    <FaUserPlus className="mr-2" />
                                    {loading ? "Registering..." : "Add User"}
                                </button>
                            </div>

                            {message && (
                                <div className="mt-4 text-sm text-center text-green-600">
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
