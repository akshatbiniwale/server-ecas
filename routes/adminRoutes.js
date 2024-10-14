const express = require("express");
const { createDepartment, registerStudents, createCourse, generateTimetable, getCourses } = require("../controller/admin");
const upload = require("../middleware/multer");
const router = express.Router();

router.post("/department", createDepartment)
router.post("/course", upload.single("file"),createCourse)

//Register students to portal using csv
router.post("/registerstudents", upload.single("file") ,registerStudents)

//get courses
router.get("/courses", getCourses)


router.post("/timetable/create", generateTimetable)

module.exports = router
