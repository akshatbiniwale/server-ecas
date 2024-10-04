const path = require("path")

const Course = require("../models/course")
const Department = require("../models/department")
const Student = require("../models/student")
const ErrorHandler = require("../services/ErrorHandler")
const jsonToCsv = require("../services/jsonToCsv")
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

//Create course and assign teachers using csv(to be added)
exports.createCourse = async (req,res,next)=>{
    try{
        /*
            Read csv to extract teacher details of the course to be created
         */
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

//Generate timetable 
exports.generateTimetable = async(req,res,next)=>{
    try{
        const {semester,courses} = req.body
        const students = await Student.find({semester,status:"active"})
                        .select("uid courses")
                        .populate({
                            path: "courses",
                            select: "_id name"
                        })
        //Finding out the courses taken by the students
        /*
            studentData format ---->
            {
                uid: Student's UID Number,
                course1: true,
                course2: true,
                ....
            }
            this format will be helpful when saving the studentData in a csv.
        */               
        const studentsData = students.map((student)=>{
            const data = {}
            data['uid'] = student.uid
            const coursesTaken = student.courses.filter(course=>courses.includes(course._id.toString()))
                                                .map(course=>course.name)
            coursesTaken.forEach(course=>data[course]=true)
            return data
        })
        //Converting json data to csv format and saving it in file
        await jsonToCsv(path.join(__dirname,"..","uploads"),"courses_taken.csv",studentsData)
        /*
            Send above file to python server to generate timetable.
            Response will a file containing generated timetable
        */
        res.status(200)
        .json({
            success:true
        })
    }catch(err){
        next(new ErrorHandler(500,err.message))
    }
}





