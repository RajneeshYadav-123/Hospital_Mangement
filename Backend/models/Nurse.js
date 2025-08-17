const mongoose=require('mongoose')

const nurseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    instructionByDoctor:{
        type:String,
        required:true,
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor'
    },

})

module.exports=mongoose.model('nurse',nurseSchema)