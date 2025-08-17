import React, { useState } from "react";

export default function Logout() {
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_API}/api/v1/auth/logout`, {
        method: "POST",
        
      });
      const data = await res.json();
      setMessage(data.message || "Logged out");
    } catch {
      setMessage("Logout failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-4 shadow rounded">
      <h1 className="text-lg font-bold mb-2">Logout</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
