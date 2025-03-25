import React from "react";
import Navbar from "./Navbar";
import { FaRocket, FaCogs, FaUsers, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Navbar (Same as Dashboard) */}
      <Navbar />

      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden py-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto p-6 text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-4">Welcome to Our Platform</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Your one-stop solution for managing users, tracking sales, and achieving your business goals.
          </p>
          <Link
            to="/login"
            className="mt-4 inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition shadow-lg group"
          >
            Get Started 
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Feature Cards with Images */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-red-100 flex items-center justify-center">
              <img src="/api/placeholder/400/300" alt="Fast performance" className="max-h-48" />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <FaRocket className="text-red-500 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">Fast Performance</h3>
              </div>
              <p className="text-gray-600">Experience lightning-fast speed with our optimized platform. Process data quickly and efficiently.</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-green-100 flex items-center justify-center">
              <img src="/api/placeholder/400/300" alt="Easy to use" className="max-h-48" />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <FaCogs className="text-green-500 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">Easy to Use</h3>
              </div>
              <p className="text-gray-600">A user-friendly interface designed for everyone, from beginners to advanced users.</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-yellow-100 flex items-center justify-center">
              <img src="/api/placeholder/400/300" alt="Community support" className="max-h-48" />
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <FaUsers className="text-yellow-500 text-2xl" />
                <h3 className="text-xl font-bold text-gray-800">Community Support</h3>
              </div>
              <p className="text-gray-600">24/7 support from our dedicated team and a thriving community of users.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
              <img src="/api/placeholder/300/300" alt="Happy customer" className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-xl" />
            </div>
            <div className="md:w-2/3 md:pl-12">
              <h3 className="text-3xl font-bold mb-4">"This platform has transformed our business operations!"</h3>
              <p className="text-xl mb-4">Our team's productivity has increased by 40% since we started using this platform. The interface is intuitive and the features are exactly what we needed.</p>
              <p className="font-bold text-blue-200">- Jane Smith, CEO of TechCorp</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto my-16 p-8 bg-white shadow-lg rounded-xl text-center max-w-4xl">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h3>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sign up now and start using our platform to boost productivity and drive your business forward.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Sign Up Free
          </Link>
          <Link
            to="/demo"
            className="px-8 py-4 bg-gray-200 text-gray-800 rounded-lg text-lg font-semibold hover:bg-gray-300 transition shadow-md"
          >
            Request Demo
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2025 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;