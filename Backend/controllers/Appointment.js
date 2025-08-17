const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

exports.Appointmentcreation = async (req, res) => {
  const id = req.params.id;  
  console.log("sjkdfhjskdhfka", id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Doctor ID",
    });
  }

  try {
    const doctor = await Doctor.findById(id); 
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor not found",
      });
    }

    
    let { PatientId, date, time } = req.body;
    if (!PatientId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    const appointment = await Appointment.create({
      PatientId,
      doctorId: id,
      time,
      date
    });

    return res.status(201).json({
      success: true,
      message: "Appointment successfully created",
      data: appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

// controllers/appointmentController.js

exports.getAllappointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






exports.getSingleDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Doctor ID",
    });
  }

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Doctor details fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

