const mongoose=require('mongoose');
const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const otpGenerator=require('otp-generator');
const OTP=require('../models/OTP');
const otpTemplate=require('../mail/templates/mailverifaiction');
const mailSender=require('../utils/mailsender');
require("dotenv").config() ; 



const sendOTP=async (req,res)=>{
    try{
      const {email}=req.body;

      const checkUserPresent=await User.findOne({email});

      if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User is already registered",
        })
      }

      var otp=otpGenerator.generate(6,{
         upperCaseAlphabets:false,
         lowerCaseAlphabets:false,
         speciChars:false,
      });

      console.log("otp",otp);
      const result = await OTP.findOne({otp:otp})
      
        while(result){
            otp= otpGenerator(6,{
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false , 
            specialChars : false ,
         });

        result = await OTP.findOne({otp: otp}) ;


         }


         const otpPayload = {email , otp } ;
         const otpBody  =await OTP.create(otpPayload) ;
         console.log(otpBody) ;


         await mailSender(
                  email,
                 "Hospiatal registration - Email Verification" ,
                  otpTemplate(otp) 
          );




         res.status(200).json({
            success: true ,
            message : "OTP sent Successfully",
            otp ,
         })

        
        }
        catch(error){

            console.log(error) ;
            return res.status(500).json({
                success : false ,
                message : "can not send otp",
            })
    }
    
}


const signup=async(req,res)=>{
    try{
     const {firstname,lastname,age,email,password,confirmPassword,accountType}=req.body;
      if(!firstname || !lastname || !age || !email || !password || !confirmPassword || !accountType){
          return res.status(400).json({
            success:false,
            message:"All fields are required",
          })
      }

      if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"password and confirmPassword are not matched"
        })
      }

      const userexist=await User.findOne({email});
      if(userexist){
        return res.status(400).json({
            success:false,
            message:"User is already Resigtered",
        })
      }

    const recentOtp = await OTP.find({ email });
    const latestOtp = recentOtp[recentOtp.length - 1];
    if (latestOtp.otp !== req.body.otp) {
  return res.status(400).json({ success: false, message: "Invalid OTP" });


}

      const hashedPassword=await bcrypt.hash(password,10);

      const user=await User.create({
          firstname,
          lastname,
          age,
          email,
          password:hashedPassword,
          accountType,

      });

        console.log("5th")
        return res.status(200).json({
        success : true ,
        message :'User is Registered ',
        user ,
     });
    
    }

     catch(error){
        console.log(error) ; 
        return res.status(500).json({
            success : false ,
            message : "User cannot be registered  !!!  please try again " ,
        }) ;

    }
}


const login=async (req,res)=>{
    try{
     const {email,password}=req.body;
     if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
     } 
     
     const user=await User.findOne({email});
     if(!user){
        return res.status(400).json({
            success:false,
            message:"NO Account found . Please Create a New Account"
        })
     } 

    if(await bcrypt.compare(password,user.password)){
        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType,
        }

        const token= jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        user.token = token ;
        user.password = undefined ;

        const options={
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true ,
	            secure: true  ,      
               sameSite: "None", 
        }
          res.cookie("token" , token  , options).status(200).json({
                success : true ,
                token , 
                user ,
                message : "Logged In Successfully !!" ,
            }) ;
    }


      else{
            return res.status(401).json({
                success : false ,
                message : "Password not Matched" ,
            }) ;

        }
    }
    catch(error){
        console.log(error) ;
        return res.status(500).json({
            success : true ,
            message : "Login Failure ...try Again !!"
        }); 

    }
}


const changePassword=async(req,res)=>{
    try{
     const userDetails=await User.findById(req.user.id);
     const {oldPassword,newPassword,confirmNewPassword}=req.body;

     const isPasswordMatch=await bcrypt.compare(
        oldPassword,
        userDetails.password
     )

     if(!isPasswordMatch){
        return res.status(401).json({
            success:false,
            message:"The password is incorrect"
        })
     }

     
     if(newPassword!==confirmNewPassword){
        return res.status(400).json({
            success:false,
            message:"The password and confirm password does not match"
        })
     }

     const encryptedPassword=await bcrypt.hash(newPassword,10);
     const updatedUserDetails=await User.findByIdAndUpdate(
        req.user.id,
        {password:encryptedPassword},
        {new:true}
     );

       try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}


     return  res.status(200).json({
        success:true,
        message:"Password updated successfully",
     })
    }
    catch(error){
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }

}


const logout=async(req,res)=>{
    try{
     const userExist=await findById(req.user.id);
     if(!userExist){
        return res.status(400).json({
            success:false,
            message:"User is not registerd "
        })
     }   
     res.clearCookie("token");

     return res.status(200).json({
        success:true,
        message:"User successfully logout"
     })

    }
      catch(error){
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}

module.exports = {
    sendOTP,
    signup,
    login,
    changePassword,
    logout,

};





