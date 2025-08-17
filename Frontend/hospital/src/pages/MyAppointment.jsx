import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API}/api/v1/appointment/appoint`
        );

        const appts = data.appointments || [];

        // fetch doctor details for each appointment
        const updatedAppointments = await Promise.all(
          appts.map(async (appt) => {
            try {
              const doctorRes = await axios.get(
                `${import.meta.env.VITE_PUBLIC_API}/api/v1/doctor/doctor/${appt.doctorId}`
              );
              return {
                ...appt,
                doctorData: doctorRes.data.data,
              };
            } catch (error) {
              return { ...appt, doctorData: null };
            }
          })
        );

        setAppointments(updatedAppointments);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to fetch appointments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 max-w-7xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
      >
        ⬅ Back to Home
      </button>

      <h1 className="text-2xl font-bold mb-6 text-center">All Appointments</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : message ? (
        <p className="text-center text-red-600">{message}</p>
      ) : appointments.length === 0 ? (
        <p className="text-center">No appointments found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow rounded">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Patient ID</th>
                <th className="border px-4 py-2">Doctor Image</th>
                <th className="border px-4 py-2">Doctor Name</th>
                <th className="border px-4 py-2">Specialization</th>
                <th className="border px-4 py-2">Timings</th>
                <th className="border px-4 py-2">Available Days</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={appt._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{appt.PatientId}</td>
                  {appt.doctorData ? (
                    <>
                      <td className="border px-4 py-2 text-center">
                        {appt.doctorData.image_url ? (
                          <img
                            src={appt.doctorData.image_url}
                            alt={appt.doctorData.name}
                            className="w-16 h-16 object-cover rounded-full mx-auto"
                          />
                        ) : (
                          <span className="text-gray-500">No Image</span>
                        )}
                      </td>
                      <td className="border px-4 py-2">{appt.doctorData.name}</td>
                      <td className="border px-4 py-2">{appt.doctorData.specialization}</td>
                      <td className="border px-4 py-2">{appt.doctorData.timings}</td>
                      <td className="border px-4 py-2">{appt.doctorData.availableDays}</td>
                    </>
                  ) : (
                    <td colSpan="5" className="border px-4 py-2 text-red-600">
                      Doctor data not found
                    </td>
                  )}
                  <td className="border px-4 py-2">{appt.date}</td>
                  <td className="border px-4 py-2">{appt.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
