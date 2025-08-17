const mongoose=require('mongoose');
   
const patientSchema=new mongoose.Schema({
   fullname:{
      type:String,
      required:true,
    },


    age:{
       type:String,
       required:true, 
    },

    disease:{
        type:String,
        required:true,
    },


    test:{
        type:String,
        
    },


    testreport_url:{
        type:String,
        required:true,
    },


    medicinewroteByDoctor:{
        type:String,
        required:true,
    },


    BillAndPayment:{
        type:String,
        required:true,
    },
    appointment:[{
        type:String,
        required:true,
    }
    ],
    date:{
        type:String,
        required:true,
    },
    
    bill_url:{
        type:String,
        required:true,
      },


})



module.exports=mongoose.model("patient",patientSchema);
