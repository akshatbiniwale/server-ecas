const express = require("express");
const {
	registerStudent,
	loginStudent,
	getCourses,
	createGradeCard,
} = require("../controllers/student");
const { authenticate } = require("../middleware/authGuard");
const router = express.Router();

router.post("/login", loginStudent);

//Get student course
router.get("/courses", authenticate, getCourses);

//Get grade card
router.get("/result", authenticate, createGradeCard);

module.exports = router;
