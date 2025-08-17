const mongoose=require('mongoose');
const Patient = require('./Patient');

const DoctorSchema=new mongoose.Schema({
      name:{
        type:String,
        required:true,
      },
      specialization:{
        type:String,
        required:true,
      },
      timings:{
        type:String,
        required:true,
      },
      availableDays:[
      {
        type:String,
        required:true,
      }
      ],
      image_url:{
        type:String,
        required:true,
      },
      
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
      },
      

})



module.exports=mongoose.model("doctor",DoctorSchema);
