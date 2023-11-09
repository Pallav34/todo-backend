import jwt from "jsonwebtoken"
export const sendcookie = (user,res,message,statusCode=200) =>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

    res.status(statusCode).cookie("token",token,{
        httpOnly: true,
        maxAge: 10 * 24 * 60 * 60 * 1000,  //10 days
        //for deployment if backend and frontend are diff. then cookies will not go basically
        sameSite: process.env.NODE_ENV === "Development" ? "lax" :"none",
        secure:process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success:true,
        message: message
    })
}