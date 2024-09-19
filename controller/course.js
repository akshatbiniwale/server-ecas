const Course = require("../models/course")
const ErrorHandler = require("../services/ErrorHandler")

//create course --Teacher
exports.createCourse = async(req,res,next)=>{
    try{
        

    }catch(err){
        next(new ErrorHandler())
    }
}