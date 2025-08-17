const express=require('express')

const router=express.Router();



const {Doctorji,getAllDoctors,deletedoctorId,dataOfDoctor}=require('../controllers/Doctor');
const {auth,isAdmin}=require('../middlewares/auth');


router.post('/doctor',Doctorji);
router.get('/doctor',getAllDoctors);
router.delete('/doctor/:id',deletedoctorId);
router.get('/doctor/:id',dataOfDoctor);



module.exports=router;

