const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

exports.Appointmentcreation = async (req, res) => {
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
      return res.status(400).json({
        success: false,
        message: "Doctor not found",
      });
    }

    let { user_id, date, time } = req.body;
    if (!user_id) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }
    user_id = user_id.trim();

    const appointment = await Appointment.create({
      user_id,
      doctorId: doctor._id,
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

exports.getAllappointments = async (req, res) => {
  try {
    const alldata = await Appointment.find({})
      .populate("doctorId")
      .populate("user_id"); 

    if (!alldata || alldata.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All appointments fetched",
      data: alldata,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({
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