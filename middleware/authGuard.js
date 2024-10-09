const jwt = require("jsonwebtoken")
const ErrorHandler = require("../services/ErrorHandler")

const authenticate = (req,res,next)=>{
    try{
        if(Object.keys(req.cookies).includes('token')===false)
            return next(new ErrorHandler(401, "Please login"))
        const token = req.cookies.token
        const {id} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = id
        next()
    }catch(err){
        next(new ErrorHandler())
    }
}


module.exports = authenticate