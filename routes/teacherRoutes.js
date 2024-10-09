const express = require("express");
const { registerTeacher, loginTeacher, enrollStudents, gradeStudents, scheduleExam, uploadExamMarks } = require("../controller/teacher");
const router = express.Router()
const upload = require("../middleware/multer")

router.post("/register",registerTeacher)
router.post("/login",loginTeacher)
//Teacher can enroll students to course by uploading csv
router.post("/enroll/:course", upload.single("file"), enrollStudents)
//Teacher can upload students mark
router.post("/exam/:exam", upload.single("file"), uploadExamMarks)
//Create route for exam scheduling.
router.post("/schedule/:course", scheduleExam)


module.exports = router