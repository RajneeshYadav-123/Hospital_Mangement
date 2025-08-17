import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API}/api/v1/auth/login`, {
        email, password 
      });
      const data = await res.json();
      setMessage(data.message || "Login successful");
    } catch {
      setMessage("Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-4 shadow rounded mt-10">
      <h1 className="text-lg font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Back to Home
          </button>
        </div>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}


