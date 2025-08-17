const express=require('express')

const router=express();

const {TestReport,getUploadedTestReports}=require('../controllers/Test');
const {auth,isLabTechnician,}=require('../middlewares/auth');

router.post('/test/:id',auth,isLabTechnician,TestReport);
router.get('/test/lab',auth,getUploadedTestReports);



module.exports=router;