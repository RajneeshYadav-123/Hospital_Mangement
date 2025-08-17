import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "user",
    otp: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}/api/v1/auth/signup`,
         formData,
       
      );
      setMessage(res.data.message || "Signup complete");
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-4 shadow rounded">
      <h1 className="text-lg font-bold mb-2">Signup</h1>
      <form onSubmit={handleSignup} className="space-y-3">
        <input
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="otp"
          placeholder="OTP"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="accountType"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          defaultValue="user"
        >
          <option value="user">User</option>
          <option value="Admin">Admin</option>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Receptionist">Receptionist</option>
          <option value="MedicalShopkeeper">MedicalShopkeeper</option>

        </select>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}




