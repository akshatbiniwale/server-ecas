const express = require("express");

const { createDepartment, registerStudents, createCourse, generateTimetable, getCourses } = require("../controller/admin");

const {
	createDepartment,
	registerStudents,
	createCourse,
	generateTimetable,
	registerAutoRooms,
	registerManualRooms,
} = require("../controller/admin");

const upload = require("../middleware/multer");
const router = express.Router();

router.post("/department", createDepartment);
router.post("/course", upload.single("file"), createCourse);

//Register students to portal using csv
router.post("/registerstudents", upload.single("file"), registerStudents);

//get courses
router.get("/courses", getCourses)


router.post("/timetable/create", generateTimetable)
// resgister rooms to portal using csv
router.post(
	"/settings/create-auto-rooms",
	upload.single("file"),
	registerAutoRooms
);
router.post("/settings/manual-auto-rooms", registerManualRooms);


router.post("/timetable/create", generateTimetable);

module.exports = router;
