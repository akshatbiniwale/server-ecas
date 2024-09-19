const express = require("express");
const { registerTeacher, loginTeacher, enrollStudents } = require("../controller/teacher");
const router = express.Router()
const upload = require("../middleware/multer")

router.post("/register",registerTeacher)
router.post("/login",loginTeacher)
//Teacher can enroll students to course by uploading csv
router.post("/enroll/:course", upload.single("file"), enrollStudents)
//Create route for exam scheduling.



module.exports = router