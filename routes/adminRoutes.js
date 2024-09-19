const express = require("express");
const { createDepartment, registerStudents, createCourse } = require("../controller/admin");
const upload = require("../middleware/multer");
const router = express.Router();

router.post("/department", createDepartment)
router.post("/course", createCourse)

router.post("/registerstudents", upload.single("file") ,registerStudents)

module.exports = router
