const express = require("express");
const { registerStudent, loginStudent } = require("../controller/student");
const router = express.Router();

router.post("/register",registerStudent)
router.post("/login",loginStudent)

module.exports = router
