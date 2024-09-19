const Course = require("../models/course")
const Department = require("../models/department")
const Student = require("../models/student")
const ErrorHandler = require("../services/ErrorHandler")
const readCSV = require("../services/readCSV")

//Create department
exports.createDepartment = async(req,res,next)=>{
    try{
        const department = await Department.create(req.body)

        res.status(200).json({
            success:true
        })
    }catch(err){
        next(new ErrorHandler())
    }
}

//Create course
exports.createCourse = async (req,res,next)=>{
    try{
        const department = await Department.findOne({name:req.body.department}).select("_id")
        const course = await Course.create({...req.body,department})
        res.status(201)
        .json({
            success:true,
            course
        })
    }catch(err){
        next(new Error())
    }
}


//Register Students using uploaded csv
exports.registerStudents = async (req,res,next)=>{
    try{
        const data = await readCSV(req.file.path)
        const departments = await Department.find({}).select("_id name")
        data.forEach(student=>{
            student.department = departments.find(dept=>dept.name===student.department)._id
        })
        const students = await Student.insertMany(data) 
        res.status(201).json({
            success:true,
            data
        })
    }catch(err){
        next(new Error(500,err.message))
    }
}





