import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import m2 from "../assets/m2.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          <a href="/" className="flex items-center space-x-2">
            <img
              src={m2}
              alt="Logo"
              className="w-12 h-12 rounded-lg object-cover"
            />
            {/* <span className="font-bold text-xl text-blue-600">MediCare</span> */}
          </a>

          <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
            <a href="/AllAppointment" className="hover:text-blue-600">All Appointment</a>
            {/* <a href="/TestReport" className="hover:text-blue-600">Test Report</a> */}
            <a href="/MediciWroteByDoctor" className="hover:text-blue-600">Recommend Medicine</a>
            {/* <a href="/Appointment" className="hover:text-blue-600">Appointment</a> */}
            {/* <a href="/Bill" className="hover:text-blue-600">Bill</a>   */}
            <a href="/BillPayment" className="hover:text-blue-600">Payment Receipt</a>
            <a href="/profile" className="hover:text-blue-600">Patient Profile</a>
            <a href="/AllAppointments" className="hover:text-blue-600">My Appointments</a>
            <a href="/Doctor" className="hover:text-blue-600">Doctor</a>
            <a href="/Signup1" className="hover:text-blue-600">Signup</a>
            <a href="/Login" className="hover:text-blue-600">Login</a>
            <a href="/Logout" className="hover:text-blue-600">Logout</a>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-2 py-4 px-6 text-gray-700 font-medium">
            <a href="/AllAppointment" className="hover:text-blue-600">All Appointment</a>
            <a href="/TestReport" className="hover:text-blue-600">Test Report</a>
            <a href="/MediciWroteByDoctor" className="hover:text-blue-600">Recommend Medicine</a>
            <a href="/Appointment" className="hover:text-blue-600">Appointment</a>
            <a href="/Bill" className="hover:text-blue-600">Bill</a>
            <a href="/BillPayment" className="hover:text-blue-600">Payment Receipt</a>
            <a href="/profile" className="hover:text-blue-600">Patient Profile</a>
            <a href="/Signup1" className="hover:text-blue-600">Signup</a>
            <a href="/Login" className="hover:text-blue-600">Login</a>
            <a href="/Logout" className="hover:text-blue-600">Logout</a>
            <a href="/Doctor" className="hover:text-blue-600">Doctor</a>
            <a href="/AllAppointments" className="hover:text-blue-600">AllAppointments</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
