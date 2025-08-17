const Patient=require('../models/Patient');
const cloudinary = require('cloudinary').v2;
const User=require('../models/User');




function isfiletypesupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}



async function uploadfilecloudinary(file, folder,quality) {
    const options = { folder };
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options)

}

exports.TestReport=async(req,res)=>{
  try{
    console.log("form data:",req.body);
    console.log("file uploaded",req.files);

    if(!req.files || !req.files.imagefile){
      return res.status(400).json({
        success:false,
        message:"No file uploaded",
      });
    }

    const uploadedFile=req.files.imagefile;
    const supportedFiles=["pdf","doc","docx","ppt","pptx","txt","zip"];
    const filetype=uploadedFile.name.split('.').pop().toLowerCase();

    if(!isfiletypesupported(filetype,supportedFiles)){
      return res.status(400).json({
        success:false,
        message:"File format not supported",
      });
    }

    const response=await uploadfilecloudinary(uploadedFile,"uploadnew");

    if(req.user.accountType!=='LabTechnician'){
      return res.status(403).json({
        success:false,
        message:"Only lab technician can upload test reports",
      });
    }

    const createTest=await Patient.create({
      testreport_url:response.secure_url,
    });

    return res.status(200).json({
      success:true,
      message:"Test report successfully uploaded",
      data:createTest
    });
  }
  catch(error){
    console.log(error);
    return res.status(400).json({
      success:false,
      message:error.message,
    });
  }
};



exports.getUploadedTestReports = async (req, res) => {
  try {
    const reports = await Patient.find({
      testreport_url: { $exists: true, $ne: "" }
    }).select("testreport_url");


    return res.status(200).json({
      success: true,
      message: "Uploaded test reports fetched successfully",
      data: reports
    });

  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



