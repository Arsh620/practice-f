import React, { useState } from "react";
import Sidebar from "./Sidebar";
import api from "../services/api"; // Import API functions
import { 
    FaBars, 
    FaTimes, 
    FaSave, 
    FaImage,
    FaUpload
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  // Import Toastify styles

const HomeDataForm = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

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

    // Handle image selection
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const submitData = new FormData();
        submitData.append("title", formData.title);
        submitData.append("description", formData.description);
    
        if (selectedFile) {
            submitData.append("image", selectedFile);
        }
    
        try {
            const result = await api.addHomeContents(submitData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            if (result.status) {
                toast.success("✅ Data saved successfully!");
                setTimeout(() => navigate("/dashboard"), 2000); // Navigate after showing success toast
            } else {
                toast.error(`❌ Error: ${result.message}`);
            }
        } catch (error) {
            console.error("Error saving data:", error);
            toast.error("❌ An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar />
            
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-blue-800 to-indigo-900 text-white z-50 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 transition-all duration-300 ease-in-out shadow-xl`}>
                <Sidebar />
            </div>

            {/* Menu Button */}
            <button
                className={`fixed top-4 left-4 z-50 p-2 rounded-full shadow-lg transition-all duration-300 ${
                    sidebarOpen ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"
                } md:left-64 md:ml-4 md:top-4`}
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Main Content */}
            <div className="md:ml-72 transition-all duration-300 ease-in-out">
                {/* Header */}
                <div className="bg-white shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800">Update Home Page Content</h2>
                    <p className="text-gray-500">Welcome back, {adminName}</p>
                </div>

                {/* Home Page Form */}
                <div className="mx-6 my-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Text Content Section */}
                                <div className="md:col-span-1 space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Text Content</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter page title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter page description"
                                        ></textarea>
                                    </div>
                                </div>
                                
                                {/* Image Upload Section */}
                                <div className="md:col-span-1 flex flex-col">
                                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Banner Image</h3>
                                    <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mt-4">
                                        {imagePreview ? (
                                            <div className="relative w-full">
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Preview" 
                                                    className="max-h-64 mx-auto rounded-lg shadow-md object-contain"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImagePreview(null);
                                                        setSelectedFile(null);
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <FaTimes size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <FaImage className="text-gray-400 text-5xl mb-4" />
                                                <p className="text-gray-500 text-center mb-4">
                                                    Drag and drop an image here or click to browse
                                                </p>
                                            </>
                                        )}
                                        
                                        <label className="cursor-pointer bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-100 flex items-center">
                                            <FaUpload className="mr-2" />
                                            {imagePreview ? "Change Image" : "Upload Image"}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center"
                                >
                                    <FaSave className="mr-2" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDataForm;
