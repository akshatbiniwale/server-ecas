const express = require("express");
const { createDepartment, registerStudents, createCourse, generateTimetable } = require("../controller/admin");
const upload = require("../middleware/multer");
const router = express.Router();

router.post("/department", createDepartment)
router.post("/course", createCourse)

//Register students to portal using csv
router.post("/registerstudents", upload.single("file") ,registerStudents)

router.post("/timetable/create", generateTimetable)

module.exports = router
