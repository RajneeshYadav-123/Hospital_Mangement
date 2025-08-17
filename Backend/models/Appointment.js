const mongoose=require('mongoose')
const Patient = require('./Patient')

const appointmentSchema=new mongoose.Schema({
    PatientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor"
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Completed","Cancelled"],
        
    }


    

    

    

})

module.exports=mongoose.model('appointment',appointmentSchema);