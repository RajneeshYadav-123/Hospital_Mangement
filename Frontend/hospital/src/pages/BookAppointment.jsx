import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function BookAppointment() {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();

  const [form, setForm] = useState({ date: "", time: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date || !form.time) {
      setMessage("Please fill in both date and time");
      return;
    }

    try {
      const token = localStorage.getItem("Admin");
      if (!token) {
        setMessage("You must be logged in to book an appointment");
        return;
      }

      const { data } = await axios.post(
        `http://localhost:4000/api/v1/appointment/appointment/${id}`,
        {
          PatientId:token,
          date: form.date,
          time: form.time,
        },
      );

      setMessage(data.message);
      setForm({ date: "", time: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to create appointment"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 max-w-md mx-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
      >
        ⬅ Back to Home
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <label className="block">
          <span className="text-gray-700">Date</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Time</span>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
        >
          Book Appointment
        </button>

        {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
      </form>
    </div>
  );
}
