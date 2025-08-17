
require("dotenv").config() ;
const User = require("../models/User") ;


const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || 
      req.body?.token || 
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);
console.log("Cookies:", req.cookies);
console.log("Auth Header:", req.headers.authorization);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }


    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

  } catch (err) {
    console.error("Error in auth middleware:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during authentication",
    });
  }
};





exports.isAdmin = async (req , res , next) =>{
    console.log("IsAdmin me aa gye bhai")
    try{
        if(req.user.accountType !== "Admin") {
            console.log("Student nhi ho bhai")
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Admin only !!" ,
            }) ;
        }
        console.log("Admin verified chalo aage")
        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}





exports.isDoctor = async (req , res , next) =>{
    try{
        if(req.user.accountType !== "Doctor") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Doctor only !!" ,
            }) ;
        }

        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}





exports.isPatient = async (req , res , next) =>{
    try{
        if(req.user.accountType !== "Patient") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Patient  only !!" ,
            }) ;
        }

        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}



exports.isNurse = async (req , res , next) =>{
    try{
        if(req.user.accountType !== "Nurse") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Nurse  only !!" ,
            }) ;
        }

        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}




exports.isReception = async (req , res , next) =>{
    try{
        if(req.user.accountType !== "Reception") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Reception only !!" ,
            }) ;
        }

        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}



exports.isLabTechnician = async (req , res , next) =>{
    try{
        if(req.user.accountType !== "LabTechnician") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Lab-Technician only !!" ,
            }) ;
        }

        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}




exports.isMedicalShopkeeper = async (req , res , next) =>{
    try{
        if(req.user.accountType !== "MedicalShopkeeper") {
            return res.status(401).json({
                success : false ,
                message : "this is protected route for Medical-Shopkeeper only !!" ,
            }) ;
        }

        next() ;

    }
    catch(error){
        return res.status(401).json({
            success : false ,
            message : "User Role can not be verfied" ,
        }) ;
   }
}


