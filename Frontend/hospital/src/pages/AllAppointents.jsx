import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_PUBLIC_API}/api/v1/doctor/doctor`);
      console.log(data);
      setDoctors(data.data || []);
      setMessage("");
    } catch (err) {
      setMessage("Failed to fetch doctors");
    }
  };

const handleClick = (id) => {
    navigate(`/BookAppointment/${id}`);
}

  useEffect(() => {
    fetchDoctors();
  }, []);


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
          All Doctors
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
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
                    onClick={() => handleClick(doc._id)}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No doctors found.</p>
          )}
        </div>

        {message && (
          <p className="text-center text-red-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}


