const express = require("express");

const {
	createDepartment,
	registerStudents,
	createCourse,
	generateTimetable,
	registerAutoRooms,
	registerManualRooms,
	getRooms,
	getCourses
} = require("../controller/admin");

const upload = require("../middleware/multer");
const router = express.Router();

router.post("/department", createDepartment);
router.post("/course", upload.single("file"), createCourse);

//Register students to portal using csv
router.post("/registerstudents", upload.single("file"), registerStudents);

//get courses
router.get("/courses", getCourses)

//Generating timetable
router.post("/timetable/create", generateTimetable)

// create rooms to portal using csv
router.post(
	"/settings/create-auto-rooms",
	upload.single("file"),
	registerAutoRooms
);
router.post("/settings/manual-auto-rooms", registerManualRooms);

//Get rooms
router.get("/rooms", getRooms);



module.exports = router;
