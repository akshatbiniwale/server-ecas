const jwt = require("jsonwebtoken")
const ErrorHandler = require("../services/ErrorHandler")

const authenticate = (req,res,next)=>{
    try{
        if(Object.keys(req.cookies).includes('token')===false)
            return next(new ErrorHandler(401, "Please login"))
        const token = req.cookies.token
        const {email} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = email
        next()
    }catch(err){
        next(new ErrorHandler())
    }
}


module.exports = authenticate