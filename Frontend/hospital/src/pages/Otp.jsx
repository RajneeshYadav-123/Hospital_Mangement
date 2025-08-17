import React, { useState } from "react";
import axios from "axios";

export default function SendOtp() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/sendOTP",
        { email },
       
      );
      setMessage(res.data.message || "OTP sent");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 shadow rounded">
      <h1 className="text-lg font-bold mb-2">Send OTP</h1>
      <form onSubmit={handleSendOtp} className="space-y-3">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send OTP
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}


