const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
	maxMarks: {
		type: Number,
		required: [true, "Max marks required"],
	},
	gradeScored: {
		type: String,
		required: [true, "Grade Scored required"],
		minLength: [2, "Invalid Grade Scored"],
	},
	studentUID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: [true, "Student UID Required"],
	},
	examId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Exam",
		required: [true, "Exam ID Required"],
	},
	marksScored: {
		type: Number,
		required: [true, "Mark scored required"],
	},
	status: {
		type: String,
		required: [true, "Status required"],
		minLength: [4, "Invalid Status"],
	},
});

const Grade = mongoose.model("Grade", gradeSchema);

module.exports = Grade;
