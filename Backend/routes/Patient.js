const express=require('express');

const router=express.Router();


const {Patientdatacreation}=require('../controllers/Patient');
const {auth,isDoctor}=require('../middlewares/auth');

router.post('/Patient',auth,isDoctor,Patientdatacreation);
router.get('/Patient',Patientdatacreation);

module.exports=router;

