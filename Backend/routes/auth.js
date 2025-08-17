const express=require('express');
const router=express.Router();

const {sendOTP,signup,login,changePassword,logout}=require('../controllers/Auth');

router.post('/sendOTP',sendOTP);
router.post('/signup',signup);
router.post('/login',login);
router.post('/changePassword',changePassword);
router.post('/logout',logout);



module.exports=router;

