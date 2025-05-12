const express = require("express");
const {
	registerTeacher,
	loginTeacher,
	enrollStudents,
	gradeStudents,
	scheduleExam,
	uploadExamMarks,
	getCourses,
	editCourseStructure,
	calculateSA,
} = require("../controllers/teacher");
const router = express.Router();
const upload = require("../middleware/multer");
const { authenticate } = require("../middleware/authGuard");

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);

router.get("/courses", authenticate, getCourses);

router.post("/enroll/:course", upload.single("file"), enrollStudents);
router.put("/course/edit", editCourseStructure);

router.post("/course/marks", upload.single("file"), uploadExamMarks);

router.post("/course/exam", scheduleExam);

router.get("/course/sa", calculateSA);

router.post("/course/grade", gradeStudents);

module.exports = router;
