const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
     firstname:{
        type:String,
        required:true,
     },
     lastname:{
        type:String,
        required:true,
     },
     age:{
       type:String,
       required:true
     },
     email:{
        type:String,
        required:true,
     },
     password:{
        type:String,
        required:true,
     },
     accountType:{
        type:String,
        enum:["Admin","Doctor","Patient","Nurse","Receptionist","LabTechnician","MedicalShopkeeper"],
        required:true,
     }
})







module.exports=mongoose.model("user",userSchema);



