const express=require('express')

const router=express.Router();



const {getUploadedBill,Billmedincine}=require('../controllers/Billmedincie');
const {auth,isMedicalShopkeeper}=require('../middlewares/auth');


router.post('/bill',auth,isMedicalShopkeeper,Billmedincine);
router.get('/doctor',getUploadedBill);


module.exports=router;

