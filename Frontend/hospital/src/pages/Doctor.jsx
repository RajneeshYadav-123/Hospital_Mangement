import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DoctorManager() {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    timings: "",
    availableDays: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/doctor/doctor");
      setDoctors(data.data || []);
      setMessage("");
    } catch (err) {
      setMessage("Failed to fetch doctors");
    }
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("specialization", form.specialization);
    formData.append("timings", form.timings);
    formData.append("availableDays", form.availableDays);
    formData.append("imagefile", imageFile);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/doctor/doctor",
        formData
      );
      setMessage(data.message);
      setForm({ name: "", specialization: "", timings: "", availableDays: "" });
      setImageFile(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating doctor");
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/doctor/doctor/${id}`
      );
      setMessage(data.message);
      fetchDoctors();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error deleting doctor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded shadow flex items-center gap-2"
          >
            ⬅ Back to Home
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Doctor Manager
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Create Doctor
          </h2>
          <form onSubmit={handleCreateDoctor} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-3 rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Specialization"
              value={form.specialization}
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
              className="w-full border p-3 rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Timings"
              value={form.timings}
              onChange={(e) => setForm({ ...form, timings: e.target.value })}
              className="w-full border p-3 rounded focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Available Days"
              value={form.availableDays}
              onChange={(e) =>
                setForm({ ...form, availableDays: e.target.value })
              }
              className="w-full border p-3 rounded focus:ring focus:ring-blue-300"
            />

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Image
              </label>
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                📁 Choose Image
              </label>
              <input
                id="file-upload"
                type="file"
                name="file"
                accept="image/jpeg, image/png"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
              />
              {imageFile && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded shadow"
              >
                Add Doctor
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">All Doctors</h2>
            <button
              onClick={fetchDoctors}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
              Load Doctors
            </button>
          </div>

          {doctors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doc) => (
                <div
                  key={doc._id}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50 flex flex-col items-center text-center"
                >
                  <img
                    src={doc.image_url}
                    alt={doc.name}
                    className="w-24 h-24 object-cover rounded-full border mb-3"
                  />
                  <p className="text-lg font-bold">{doc.name}</p>
                  <p className="text-sm text-gray-600">{doc.specialization}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Timings:</strong> {doc.timings}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Available Days:</strong> {doc.availableDays}
                  </p>
                  <button
                    onClick={() => deleteDoctor(doc._id)}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No doctors loaded yet. Click "Load Doctors".</p>
          )}
        </div>

        {message && (
          <p className="text-center text-blue-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}


