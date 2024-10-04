const express = require("express");
const { registerStudent, loginStudent, getCourses } = require("../controller/student");
const authenticate = require("../middleware/authGuard");
const router = express.Router();

router.post("/login",loginStudent)

//Get student course
router.get("/courses", authenticate, getCourses)

module.exports = router
