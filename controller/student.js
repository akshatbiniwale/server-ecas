const Department = require("../models/department")
const Student = require("../models/student")
const ErrorHandler = require("../services/ErrorHandler")
const bcrypt = require("bcrypt")
const sendJWT = require("../services/sendJWT")

//Register
exports.registerStudent = async(req,res,next)=>{
    try{
        /*
            Validate spit email
        */
        const department = await Department.findOne({name:req.body.department})
        const student = await Student.create({...req.body,department})
        sendJWT(student,200,res,next)
    }catch(err){
        console.log(err)
        next(new ErrorHandler())
    }
}

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