const Department = require("../models/department")
const Student = require("../models/student")
const ErrorHandler = require("../services/ErrorHandler")
const bcrypt = require("bcrypt")
const sendJWT = require("../services/sendJWT")
const Course = require("../models/course")
const Grade = require("../models/grade")

//Login
exports.loginStudent= async(req,res,next)=>{
    try{
        const {email} = req.body
        const student = await Student.findOne({email})
        if(!student)
            return next(new ErrorHandler(404,"User not found"))
        
        // const isVerified = await bcrypt.compare(req.body.password,student.password)
        if(student.password!=req.body.password)
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
        const {semester} = req.query
        console.log(semester)
        const student = await Student.findById(req.user)
                                     .select("courses")
                                     .populate({
                                        path:"courses",
                                        match:{semester:semester}
                                     })
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

//Get grade card 
exports.createGradeCard = async(req,res,next)=>{
    try{
        const studentId = req.user
        const student = await Student.findById(studentId)
                                     .select("semester courses") 
        //Filtering current semster courses                                        
        await student.populate({
            path:"courses",
            select:"_id name credit code",
            match:{semester:student.semester}
        })
        const courseIds = student.courses.map(course=>course._id)
        //Finding grade in current courses
        const courseGrades = await Grade.find({student:studentId,course:{$in:courseIds}})
        /*
            Implementation of generating grade card
        */
       res.status(200).json({
        sucess:true
       })
    }catch(err){
        next(new ErrorHandler(501,err))
    }
}

//Apply for Re-Exam
exports.applyForReExam = async(req,res,next)=>{
    try{
        
        /*
            Implementation of payment gateway using Razorpay or Stripe
        */
    }catch(err){
        next(new ErrorHandler(501, err))
    }
}
