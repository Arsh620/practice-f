import React from "react";
import Navbar from "./Navbar";
import { FaTruck, FaMapMarkedAlt, FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="text-center py-10 bg-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-3">Smart Vehicle Management System</h1>
        <p className="text-lg">Easily manage vehicles, trips, and maintenance from one place.</p>
        <Link to="/login" className="mt-5 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
          Get Started
        </Link>
      </div>

      {/* Features */}
      <div className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard icon={<FaTruck />} title="Vehicle Management" desc="Monitor all vehicles, documents, and their status." />
          <FeatureCard icon={<FaMapMarkedAlt />} title="Trip Tracking" desc="Track routes and trip activities easily." />
          <FeatureCard icon={<FaTools />} title="Maintenance Alerts" desc="Set maintenance schedules and stay updated." />
        </div>
      </div>

      {/* Additional Content */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">About This Platform</h3>
          <p className="text-gray-700 mb-4">
            VehicleTrack Pro is designed for businesses and individuals who want a smarter way to manage their transportation needs. Our platform simplifies logistics, tracking, and cost management.
          </p>

          <h3 className="text-xl font-semibold mt-10 mb-2">FAQs</h3>
          <p className="text-gray-600">Q: Is this system mobile-friendly?<br />A: Yes, it works smoothly on both desktop and mobile.</p>
          <p className="text-gray-600 mt-3">Q: Can I track fuel usage?<br />A: Absolutely! Fuel log and reports are built in.</p>

          <h3 className="text-xl font-semibold mt-10 mb-2">Contact Us</h3>
          <p className="text-gray-600">📧 support@vehicletrackpro.com<br />📞 +91 9876543210</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2025 VehicleTrack Pro. Built with ❤️ using React + Node.js</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center">
    <div className="text-4xl text-blue-600 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

export default Home;
