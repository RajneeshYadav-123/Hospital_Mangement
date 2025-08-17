import React, { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/changePassword",
        { oldPassword, newPassword, confirmNewPassword },
      
      );
      setMessage(data.message || "Password updated");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Password change failed"
      );
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-4 shadow rounded">
      <h1 className="text-lg font-bold mb-2">Change Password</h1>
      <form onSubmit={handleChangePassword} className="space-y-3">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

