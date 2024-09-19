const Teacher = require("../models/teacher")
const Department = require("../models/department")
const ErrorHandler = require("../services/ErrorHandler")
const sendJWT = require("../services/sendJWT")
const bcrypt = require("bcrypt")
const readCSV = require("../services/readCSV")
const Student = require("../models/student")
const Exam = require("../models/exam")

//Register
exports.registerTeacher = async(req,res,next)=>{
    try{
        /*
            Verify teacher using fid
        */
        //finding department
        const department = await Department.findOne({name:req.body.department})
        const teacher = await Teacher.create({...req.body,department})
        sendJWT(teacher,201,res,next) 
    }catch(err){
        console.log(err)
        next(new ErrorHandler())
    }
}

//Login
exports.loginTeacher = async(req,res,next)=>{
    try{
        const {email,password} = req.body
        const teacher = await Teacher.findOne({email})
        if(!teacher)
            return next(new ErrorHandler(400,"User does not exist"))
        const isVerified = await bcrypt.compare(password,teacher.password)
        if(!isVerified)
            return next(new ErrorHandler(401,"Invalid credentials"))
        sendJWT(teacher,200,res,next)
    }catch(err){
        next(new ErrorHandler())
    }
}


//Enrolling students to course using csv
exports.enrollStudents = async(req,res,next)=>{
    try{
        const courseId = req.params.course
        const data = await readCSV(req.file.path)
        const uids = data.map(details=>details.uid)
        //Inserting course id to each student's courses field
        const promises = uids.map(uid=>Student.findOneAndUpdate({uid}, {$push:{courses:courseId}}))
        //awaiting for all promises to finish
        await Promise.all(promises)
        res.status(200).json({
            success:true
        })
    }catch(err){
        next(new ErrorHandler())
    }
}

//Scheduling exams (ISE,MSE,ESE)
//For MSE and ESE teachers are supposed to enter the date provided to them after generating timetable.
exports.scheduleExam = async (req,res,next)=>{
    try{    
        const courseId = req.params.course
        const exam = await Exam.create({...req.body,course:courseId})
        /*
            Implement send notification to students feature
        */
        res.status(201).json({
            success:true,
            exam
        })
    }catch(err){    
        next(new ErrorHandler())
    }
}


//Grade students using csv uploaded by teacher
exports.gradeStudents = async (req,res,next)=>{
    try{
        const courseId = req.params.course
        const examId = req.params.examId
        //read csv data
        const data = await readCSV(req.file.path)
    }catch(err){
        next(new ErrorHandler())
    }
}



