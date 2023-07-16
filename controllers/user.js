
import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendcookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req,res)=>{

}


export const register = async (req,res,next)=>{
    try {
        const {name,email,password} = req.body;

    let user = await User.findOne({email});
    if(user){
        return next(new ErrorHandler("user already exist",409))
    }
    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create ({
        name,
        email,
        password:hashedPassword})

    sendcookie(user,res,"Registered Successfully",201);
    } catch (error) {
        next(error)
    }
    
}


export const login = async(req,res,next) =>{

    try {
        const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Username",400))
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return next(new ErrorHandler("Invalid Password",401))
    }

    sendcookie(user,res,`WElcome back, ${user.name}`,200)
    } catch (error) {
        next(error)
    }

}

export const getMyProfile =  (req,res)=>{
   const id = "myid";

   
   
   res.status(200).json({
    success:true,
    message:"aloafkm",
    user:req.user,
   })
}

export const logout = (req,res) =>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" :"none",
        secure:process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
        success:true,
        message:"logout successful"
    })
}
