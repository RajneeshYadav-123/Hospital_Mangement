const Patient = require('../models/Patient');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

exports.Patientdatacreation = async (req, res) => {
    try {
        const { Fullname, age, disease, medicinewroteByDoctor,test } = req.body;


        const datacreation = await Patient.create({
            Fullname,
            age,
            disease,
            medicinewroteByDoctor,
            test
        });

        return res.status(200).json({
            success: true,
            message: "The Patient creation is successfully created",
            data: datacreation
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};





