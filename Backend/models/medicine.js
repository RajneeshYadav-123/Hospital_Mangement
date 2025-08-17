const mongoose=require('mongoose')

const medicineSchema=new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient",
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor",
    },
    date:{
        type:String,
        required:true,
    },
    medicines:[
       {
         type:String,
        required:true
       }
    ]
})