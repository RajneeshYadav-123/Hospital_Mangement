const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');
const cloudinary = require('cloudinary').v2;
const User = require('../models/User'); 

function isfiletypesupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadfilecloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}



const Doctorji = async (req, res) => {
    try {
        console.log("Form data:", req.body);
        console.log("File uploaded:", req.files);

        const { name, specialization, timings, availableDays } = req.body;
        const uploadedImage = req.files.imagefile;
        console.log(uploadedImage);

        if (!name || !specialization || !timings || !availableDays) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const supportedFiles = ["jpeg", "jpg", "png"];
        const filetype = uploadedImage.name.split('.').pop().toLowerCase();
        if (!isfiletypesupported(filetype, supportedFiles)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        const response = await uploadfilecloudinary(uploadedImage, "uploadnew");
        console.log(response);

        const checkIsAdmin = await User.findOne({ accountType: 'Admin' });

        if (!checkIsAdmin) {
            return res.status(403).json({
                success: false,
                message: "Only admin can create doctor records"
            });
        }

        const doctorcreation = await Doctor.create({
            name,
            specialization,
            timings,
            availableDays,
            image_url: response.secure_url
        });

        return res.status(200).json({
            success: true,
            message: "Doctor created successfully",
            data: doctorcreation,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};



const deletedoctorId = async (req, res) => {
    try {
        const doctorId = req.params.id;

        const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

        if (!deletedDoctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        
        if (!doctors.length) {
            return res.status(404).json({
                success: false,
                message: "No doctors found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            data: doctors,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const dataOfDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Doctor ID",
            });
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor fetched successfully",
            data: doctor,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    Doctorji,
    deletedoctorId,
    getAllDoctors,
    dataOfDoctor
};



