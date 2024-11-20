const express = require("express");
const { registerTeacher, loginTeacher, enrollStudents, gradeStudents, 
        scheduleExam, uploadExamMarks, getCourses, editCourseStructure, calculateSA } = require("../controller/teacher");
const router = express.Router()
const upload = require("../middleware/multer")
const authenticate = require("../middleware/authGuard")

router.post("/register",registerTeacher)
router.post("/login",loginTeacher)

//Get teacher courses
router.get("/courses", authenticate, getCourses)

//Teacher can enroll students to course by uploading csv
router.post("/enroll/:course", upload.single("file"), enrollStudents)
//Teacher can edit course structure
router.put("/course/edit", editCourseStructure)
//Teacher can upload students mark
router.post("/course/marks", upload.single("file"), uploadExamMarks)
//Create route for exam scheduling.
router.post("/course/exam", scheduleExam)
//Find optimal SA value for certain subject
router.get("/course/sa", calculateSA)
//Grade student based on SA value
router.post("/course/grade", gradeStudents)

module.exports = router