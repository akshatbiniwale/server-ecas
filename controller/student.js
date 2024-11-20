const Department = require("../models/department")
const Student = require("../models/student")
const ErrorHandler = require("../services/ErrorHandler")
const bcrypt = require("bcrypt")
const sendJWT = require("../services/sendJWT")
const Course = require("../models/course")
const Grade = require("../models/grade")
const { getGradePoint, calculateSGPA, calculateTotal } = require("../services/helper")

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
        const {semester, year} = req.query
        const semesterNumber = 2*year-(semester.toLowerCase()==="odd")
        const studentId = req.user
        const student = await Student.findById(studentId)
                                     .populate({
                                        path:"courses",
                                        select:"_id",
                                        match:{semester:semesterNumber}
                                    })
        //Getting Ids of courses taken by student for given semester
        const courseIds = student.courses.map(course=>course._id)
        //Finding Grades for each course
        const courseGrades = await Grade.find({
                                student:studentId,
                                course:{
                                    $in:courseIds
                                }
                            }).populate({
                                path:"course",
                                select:"-faculty"
                            })
        //Combining grades and other information
        const data = {}
        data["courses"] = courseGrades.map(courseGrade=>{
            return {
                name:courseGrade.course.name,
                code:courseGrade.course.code,
                credits:courseGrade.course.credits,
                grade:courseGrade.grade,
                creditsEarned: (courseGrade.grade === "FF" ? 0 : courseGrade.course.credits),
                gradePoint: getGradePoint(courseGrade.grade)
            }
        })
        if(student.gpa.some(x=>x.semester===semesterNumber) === false){
            console.log(data["courses"])
            student.gpa.push({
                semester:semesterNumber,
                sgpa: calculateSGPA(data["courses"])
            })
            await student.save()
        }
        data["gpa"] = student.gpa 
        data["total"] = calculateTotal(data["courses"])
        data["studentDetails"] = {
            name:student.name,
            uid:student.uid,
            year:year,
            semester:semester
        }
        //Add if student passed or failed
        res.status(200).json({
            sucess:true,
            res:data
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
