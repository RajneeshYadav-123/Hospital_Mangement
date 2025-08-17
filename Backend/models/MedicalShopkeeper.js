const mongoose=require('mongoose')

const medicinesSchema=new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'patient'
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctor",
    },
    Bill:{
        type:String,
        required:true,
    },

})

module.exports=mongoose.model("medicine",medicinesSchema);