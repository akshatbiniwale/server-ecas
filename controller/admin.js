const path = require("path")
const axios = require("axios")
const FormData = require('form-data')
const fs = require("fs")
const Course = require("../models/course")
const Department = require("../models/department")
const Student = require("../models/student")
const Teacher = require("../models/teacher")
const ErrorHandler = require("../services/ErrorHandler")
const jsonToCsv = require("../services/jsonToCsv")
const readCSV = require("../services/readCSV")


exports.register = async(req,res,next)=>{

}



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
        const courseDetails = req.body
        /*
            Read csv to extract teacher details of the course to be created
        */
        const teachers = await readCSV(req.file.path)
        const teacherEmailIds = teachers.map(teacher=>teacher.email)
        const teacherIds = await Teacher.find({email:{$in:teacherEmailIds}})
        const department = await Department.findOne({name:req.body.department}).select("_id")
        const course = await Course.create({...courseDetails,
                                    name:courseDetails.course_name,
                                    code:courseDetails.course_code,
                                    department,
                                    faculty:teacherIds
                                })
        res.status(201)
        .json({
            success:true,
            course
        })
    }catch(err){
        console.log(err.message)
        next(new Error())
    }
}


//Register Students using uploaded csv
exports.registerStudents = async (req,res,next)=>{
    try{
        const defaultPassword = req.body.password
        const data = await readCSV(req.file.path)
        const departments = await Department.find({}).select("_id name")
        data.forEach(student=>{
            student.password = defaultPassword
            student.department = departments.find(dept=>dept.name===student.department)._id
        })
        console.log(data)
        const students = await Student.insertMany(data) 
        res.status(201).json({
            success:true,
            data
        })
    }catch(err){
        console.log(err.message)
        next(new Error(501,err.message))
    }
}


//Get courses according to year and semester
exports.getCourses = async(req,res,next)=>{
    try{
        const {year, semester} = req.query
        const semesterNumber = 2*year-(semester.toLowerCase()==="odd")

        // Get the date 6 months ago
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const courses = await Course.find({
                                    semester:semesterNumber,
                                    createdAt: {
                                        $gte:sixMonthsAgo
                                    }
                                })
                                .select("_id name category department")
                                .populate({
                                    path:"department",
                                    select:"name"
                                })

        const departments = await Department.find({})
        const categories = await Course.distinct("category")

        //Classifying courses according to department and category
        const classifiedCourses = {}
		categories.forEach(category=>classifiedCourses[category] = category === 'Core' ? {} : [])

		departments.forEach(department=>classifiedCourses['Core'][department.name]=[])

        courses.forEach(course=>{
			const category = course.category
			const department = course.department.name
			if(category==='Core') 
				classifiedCourses[category][department].push(course)
			else
				classifiedCourses[category].push(course)
		})


        res.status(200).json({
            success:true,
            courses:classifiedCourses
        })


    }catch(err){
        console.log(err.message)
        next(new Error(500, err.message))
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
        const FILEPATH = path.join(__dirname,"..","uploads","courses_taken.csv")
        await jsonToCsv(FILEPATH,studentsData)
        /*
            Send above file to python server to generate timetable.
            Response will a file containing generated timetable
        */
        const file = fs.createReadStream(FILEPATH)
        const formData = new FormData()
        formData.append("file", file)
        const data = await axios.post("http://127.0.0.1:8000/generate_timetable",
                                    formData,{
                                        headers:{...formData.getHeaders()}
                                    })
        res.status(200)
        .json({
            success:true
        })
    }catch(err){
        next(new ErrorHandler(500,err.message))
    }
}






