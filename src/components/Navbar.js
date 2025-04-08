import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">🚗 VehicleTrack Pro</h1>
        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition duration-200">Home</Link>
          <Link to="/register" className="hover:text-blue-600 transition duration-200">Register</Link>
          <Link to="/login" className="hover:text-blue-600 transition duration-200">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
