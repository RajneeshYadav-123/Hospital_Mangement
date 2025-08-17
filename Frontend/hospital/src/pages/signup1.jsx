import React from "react";
import Sign from "./sign";
import Otp from "./Otp";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Signup1 = () => {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl w-full"
      >
        <div className="lg:w-1/2 bg-white flex flex-col items-center justify-center p-4 space-y-72">
          <img
            src="https://imgcdn.stablediffusionweb.com/2024/10/18/43573d3a-c22e-4865-a407-f4c946bd40a2.jpg"
            alt="Doctor"
            className="max-h-96 w-auto object-contain rounded-lg"
          />
          <button
            onClick={() => navigate("/Login")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded shadow flex items-center gap-2"
          >
            ⬅ Go to Login
          </button>
        </div>

        <div className="lg:w-1/2 p-5 flex flex-col items-center justify-center space-y-4">
          <Otp />
          <Sign />
        </div>
      </motion.div>
    </div>
  );
};
