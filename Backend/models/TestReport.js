const mongoose=require('mongoose')

const TestSchema=new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"patient"
    },
    image_url:{
        type:String,
        required:true,
    },
    Date:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model("Test",TestSchema);