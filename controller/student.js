const Department = require("../models/department")
const Student = require("../models/student")
const ErrorHandler = require("../services/ErrorHandler")
const bcrypt = require("bcrypt")
const sendJWT = require("../services/sendJWT")
const Course = require("../models/course")

//Login
exports.loginStudent= async(req,res,next)=>{
    try{
        const {email} = req.body
        const student = await Student.findOne({email})
        if(!student)
            return next(new ErrorHandler(404,"User not found"))
        
        const isVerified = await bcrypt.compare(req.body.password,student.password)
        if(!isVerified)
            return next(new ErrorHandler(400,"Invaild credentials"))
        sendJWT(student,201,res)
        
    }catch(err){
        console.log(err)
        next(new ErrorHandler())
    }
}

//Get student course
exports.getCourses = async(req,res,next)=>{
    try{
        const {semester} = req.params
        const student = await Student.findOne({email:req.user}).select("courses").populate("courses")
        res.status(200)
        .json({
            success:true,
            courses:student.courses
        })
        
    }catch(err){
        console.log(err)
        next(new ErrorHandler())
    }
}

//Get student exam details


