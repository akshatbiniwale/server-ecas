const jwt = require("jsonwebtoken")
const ErrorHandler = require("./ErrorHandler")

const sendJWT = (user,code,res,next)=>{
    try{
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"12h"})
        const cookieOptions = {
            httpOnly:true,
            expire: new Date(Date.now()+12*3600000)
        }
        res.cookie("token",token,cookieOptions)
        .status(code)
        .json({
            success:true,
            message:"Logged in",
            user
        })
    }catch(err){
        console.log(err)
        next(new ErrorHandler())
    }
}

module.exports = sendJWT