const express=require('express');
const router=express.Router();

const {Appointmentcreation,getAllappointments,getSingleDoctor}=require('../controllers/Appointment');
const {auth,isPatient}=require('../middlewares/auth');


router.post('/appointment/:id',Appointmentcreation);
router.get('/appoint',getAllappointments);
router.get("/doctor/:doctorId", getSingleDoctor);



module.exports=router;






