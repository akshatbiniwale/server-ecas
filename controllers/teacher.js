const Teacher = require("../models/teacher")
const Department = require("../models/department")
const ErrorHandler = require("../services/ErrorHandler")
const sendJWT = require("../services/sendJWT")
const bcrypt = require("bcrypt")
const readCSV = require("../services/readCSV")
const Student = require("../models/student")
const Exam = require("../models/exam")
const Mark = require("../models/mark")
const Course = require("../models/course")
const axios = require("axios")
const FormData = require("form-data")
const getGradeRanges = require("../services/getGradeRanges")
const Grade = require("../models/grade")
const { getGrade } = require("../services/helper")

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

//Get teacher courses
exports.getCourses = async(req,res,next)=>{
    try{
        const teacherId = req.user
        const year = req.query?.year || null
        const semester = req.query?.semester || null
        let data = await Teacher.findById(teacherId)
                        .select("courses")
        if(year && semester){
            const semesterNumber = 2*year-(semester.toLowerCase()==="odd")
            data = await data.populate({
                path:"courses",
                select:"-faculty",
                match:{semester:semesterNumber}
            })
        }else{
            data = await data.populate({
                path:"courses",
                select:"-faculty"
            })
        }
        res.status(200).json({
            success:true,
            courses : data.courses
        })

    }catch(err){
        next(new ErrorHandler())
    }

} 

//../teacher/course/edit --PUT
//Allow teachers to set weightage for ise,mse and ese.
exports.editCourseStructure = async(req,res,next)=>{
    try{
        const {courseStructure, courseId} = req.body
        await Course.findByIdAndUpdate(courseId, {
            theory:{
                ...courseStructure
            }
        })
        res.status(200).json({
            success:true
        })
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

//..teacher/course/exam --POST
//Scheduling exams (ISE)
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

//..teacher/course/exam --POST
//Updating marks of students using csv uploaded by teacher (This csv contains all marks of all exams i.e ISE,MSE,ESE)
exports.uploadExamMarks = async (req,res,next)=>{
    try{
        const {courseId} = req.body
        //read csv data
        const data = await readCSV(req.file.path)
        const promises = data.map(async(details)=>{
         
            const {uid,ise1,ise2,mse,ese} = details
            const studentId = await Student.findOne({uid}).select("_id")
            return await Mark.create({
                student:studentId._id,
                course:courseId,
                ise1,
                ise2,
                mse,
                ese
            })
        })
        await Promise.all(promises)
        res.status(201).json({
            success:true
        })
    }catch(err){
        console.log(err)
        next(new ErrorHandler())
    }
}

//Grade students --GET (Provide optimal SA value to teacher)
exports.calculateSA = async(req,res,next)=>{
    try{
       
        const {course} = req.query 
        const courseDetails = await Course.findById(course)  //To extract weightage details
        const marks = await Mark.find({course}).select("ese")
        const finalMarks = marks.map(x=>x.ese)
        /*
            Add procedure for calculating final marks i.e ise+mse+ese according to weightage
        */
        const formData = new FormData()
        formData.append("Marks", JSON.stringify(finalMarks))
        const {data} = await axios.post("http://127.0.0.1:8000/calculate_sa",
                                    formData,
                                    {
                                        headers:{...formData.getHeaders()}
                                    })
        res.status(200).json({
            success:true,
            data:data["res"]
        })
    }catch(err){
        // console.log(err)
        next(new ErrorHandler())
    }
}

//Grade students --POST (Mark using selected SA value)
exports.gradeStudents = async(req,res,next)=>{
    try{
        const {course, sa, span} = req.body
        const marks = await Mark.find({course})
        /*
            Add procedure for calculating final marks i.e ise+mse+ese according to weightage
        */
        const finalMarks = marks.map(x=>x.ese)
        finalMarks.sort((a,b)=>a-b)
        const mid = Math.floor(finalMarks.length / 2)
        let median;
        if (finalMarks.length % 2 === 0) 
            median = (finalMarks[mid - 1] + finalMarks[mid]) / 2;
        else 
            median = finalMarks[mid];
    
        const gradeRanges = getGradeRanges(sa,span,median)
        // //Assign grade to students for given course
        const promises = marks.map(async (markDetails,index)=>{
            const grade = getGrade(finalMarks[index], gradeRanges)
            const status = grade === "FF" ? "Fail" : "Pass"
            return await Grade.create({
                student: markDetails.student,
                course: course,
                saValue:sa,
                score:finalMarks[index],
                grade:grade,
                status: status
            })
        })
        await Promise.all(promises)
        res.status(201)
        .json({
            success:true
        })
    }catch(err){
        console.log(err)
        next(new ErrorHandler())
    }
}


