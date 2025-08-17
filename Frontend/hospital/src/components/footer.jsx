import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-xl font-bold mb-4">Healthy Hospital</h3>
          <p>Bhadsor (Near GIDA), Gorakhpur, Uttar Pradesh, 273008, India</p>
          <p className="mt-2">Phone: +91 12345 67890</p>
          <p>Email: info@healthyhospital.com</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Services</li>
            <li>Doctors</li>
            <li>Appointments</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>Emergency Care</li>
            <li>Lab Services</li>
            <li>Pharmacy</li>
            <li>Telemedicine</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <FaFacebookF className="hover:text-yellow-400 cursor-pointer" />
            <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-yellow-400 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
          </div>
          <h4 className="font-semibold mb-2">Subscribe to Updates</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>
      </div>

      <div className="mt-8 border-t border-blue-700 pt-4 text-center text-gray-300 text-sm">
        © 2025 Healthy Hospital | Privacy Policy | Terms of Use
      </div>
    </footer>
  );
}


